"""Build public/data/red_digitos.json for the "una red que lee dígitos" exercise of
session 1 (the deep-learning layer, on the 1989 Bell Labs task).

A small neural network (784 -> 64 -> 10, ReLU, softmax) trained on MNIST, the
handwritten-digit set from LeCun, Cortes and Burges. The browser runs the forward
pass itself (src/engine/digitos.ts); nothing leaves the page.

Mouse and finger strokes are not scanned pen strokes, so the training set gets two
augmented copies (small rotation, scale and shift, sometimes a thicker stroke).
The page centres the drawing the same way MNIST was built (20x20 box, centre of
mass at the middle of 28x28), which matters more than the augmentation.

Weights ship as int8 with one scale per layer, base64 in the JSON. Twenty test
digits (two per class) ride along: the page shows them as "what it learned from"
and src/engine/digitos.test.ts checks the network still reads them.

Usage: uv run --with numpy --with scikit-learn --with scipy python scripts/build_mnist.py
"""

import base64
import gzip
import os
import sys
import urllib.request

import numpy as np
from scipy import ndimage
from sklearn.neural_network import MLPClassifier

sys.path.insert(0, os.path.dirname(__file__))
from _meta import write_json

HERE = os.path.dirname(__file__)
CACHE = os.path.join(HERE, '_cache', 'mnist')
OUT = os.path.join(HERE, '..', 'public', 'data', 'red_digitos.json')

# Same files torchvision downloads; the original yann.lecun.com links are gone.
MIRROR = 'https://ossci-datasets.s3.amazonaws.com/mnist/'
FILES = {
    'x_train': 'train-images-idx3-ubyte.gz',
    'y_train': 'train-labels-idx1-ubyte.gz',
    'x_test': 't10k-images-idx3-ubyte.gz',
    'y_test': 't10k-labels-idx1-ubyte.gz',
}
HIDDEN = 64
SEED = 1989
COPIES = 2  # augmented copies of the training set


def load(name):
    path = os.path.join(CACHE, FILES[name])
    if not os.path.exists(path):
        os.makedirs(CACHE, exist_ok=True)
        print(f'  downloading {FILES[name]}')
        urllib.request.urlretrieve(MIRROR + FILES[name], path)
    with gzip.open(path, 'rb') as f:
        raw = f.read()
    if name.startswith('x'):
        return np.frombuffer(raw, np.uint8, offset=16).reshape(-1, 28, 28)
    return np.frombuffer(raw, np.uint8, offset=8)


def recentre(img):
    """Put the centre of mass at (14, 14), as MNIST itself does."""
    if img.sum() == 0:
        return img
    cy, cx = ndimage.center_of_mass(img)
    return ndimage.shift(img, (14 - cy, 14 - cx), order=1, mode='constant')


def augment(x, rng):
    out = np.empty_like(x, dtype=np.float32)
    for i, img in enumerate(x.astype(np.float32)):
        ang = rng.uniform(-12, 12)
        esc = rng.uniform(0.85, 1.1)
        rot = ndimage.rotate(img, ang, reshape=False, order=1)
        z = ndimage.zoom(rot, esc, order=1)
        # crop or pad back to 28x28 around the centre
        canvas = np.zeros((28, 28), np.float32)
        h = z.shape[0]
        if h >= 28:
            o = (h - 28) // 2
            canvas = z[o:o + 28, o:o + 28]
        else:
            o = (28 - h) // 2
            canvas[o:o + h, o:o + h] = z
        if rng.random() < 0.35:
            canvas = ndimage.grey_dilation(canvas, size=(2, 2))
        canvas = recentre(canvas)
        canvas = ndimage.shift(canvas, rng.uniform(-1.5, 1.5, size=2), order=1)
        out[i] = np.clip(canvas, 0, 255)
    return out


def quantize(w):
    scale = float(np.abs(w).max() / 127)
    q = np.clip(np.round(w / scale), -127, 127).astype(np.int8)
    return base64.b64encode(q.tobytes()).decode('ascii'), scale


def main():
    rng = np.random.default_rng(SEED)
    x_train, y_train = load('x_train'), load('y_train')
    x_test, y_test = load('x_test'), load('y_test')

    print(f'augmenting {COPIES} x {len(x_train)} digits')
    xs = [x_train.astype(np.float32)] + [augment(x_train, rng) for _ in range(COPIES)]
    X = np.concatenate(xs).reshape(-1, 784) / 255
    Y = np.concatenate([y_train] * (COPIES + 1))

    red = MLPClassifier(
        hidden_layer_sizes=(HIDDEN,),
        activation='relu',
        alpha=1e-4,
        batch_size=256,
        learning_rate_init=1e-3,
        max_iter=25,
        early_stopping=True,
        n_iter_no_change=4,
        random_state=SEED,
        verbose=True,
    )
    red.fit(X, Y)

    X_test = x_test.reshape(-1, 784) / 255
    acc = red.score(X_test, y_test)

    w1, w2 = red.coefs_
    b1, b2 = red.intercepts_
    w1_b64, s1 = quantize(w1)
    w2_b64, s2 = quantize(w2)

    # accuracy of the int8 network, which is what the browser actually runs
    dq1 = np.frombuffer(base64.b64decode(w1_b64), np.int8).reshape(w1.shape) * s1
    dq2 = np.frombuffer(base64.b64decode(w2_b64), np.int8).reshape(w2.shape) * s2
    h = np.maximum(X_test @ dq1 + b1, 0)
    acc_q = float(((h @ dq2 + b2).argmax(1) == y_test).mean())
    print(f'test accuracy: float {acc:.4f}, int8 {acc_q:.4f}')

    muestras = []
    for d in range(10):
        for i in np.flatnonzero(y_test == d)[:2]:
            muestras.append({
                'digito': int(d),
                'pixeles': base64.b64encode(x_test[i].tobytes()).decode('ascii'),
            })

    data = {
        'entrada': 784,
        'oculta': HIDDEN,
        'salida': 10,
        'w1': w1_b64,
        'w1_escala': s1,
        'b1': [round(float(v), 6) for v in b1],
        'w2': w2_b64,
        'w2_escala': s2,
        'b2': [round(float(v), 6) for v in b2],
        'exactitud_test': round(acc_q, 4),
        'n_entrenamiento': int(len(x_train)),
        'n_test': int(len(x_test)),
        'muestras': muestras,
    }
    write_json(
        OUT,
        data,
        source='MNIST (Yann LeCun, Corinna Cortes y Christopher Burges), CC BY-SA 3.0',
        source_date='1998',
    )
    print(f'wrote {OUT} ({os.path.getsize(OUT) / 1024:.0f} KB)')


if __name__ == '__main__':
    main()
