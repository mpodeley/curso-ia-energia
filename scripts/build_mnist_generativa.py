"""Build public/data/red_generativa.json for "la red al revés" in session 1: a network
that gets a digit and draws a new one.

A conditional variational autoencoder (CVAE) trained on the same MNIST digits as
build_mnist.py. During training an encoder squeezes each digit into two numbers
of "style" (slant, width, stroke) and a decoder learns to redraw the digit from
those two numbers plus its label. Only the decoder ships: the browser picks a
label, draws two random style numbers from a normal distribution with a seeded
RNG and runs 12 -> 256 -> 784 (ReLU, sigmoid). Different numbers, different
handwriting of the same digit.

Weights ship as int8 with one scale per layer, base64 in the JSON, like
red_digitos.json.

Usage (CPU wheel of torch, ~200 MB the first time):
  uv run --with numpy --with torch --index-url https://download.pytorch.org/whl/cpu \
      --extra-index-url https://pypi.org/simple python scripts/build_mnist_generativa.py
"""

import base64
import gzip
import os
import sys
import urllib.request

import numpy as np
import torch
from torch import nn

sys.path.insert(0, os.path.dirname(__file__))
from _meta import write_json

HERE = os.path.dirname(__file__)
CACHE = os.path.join(HERE, '_cache', 'mnist')
OUT = os.path.join(HERE, '..', 'public', 'data', 'red_generativa.json')
MIRROR = 'https://ossci-datasets.s3.amazonaws.com/mnist/'

Z = 2        # style numbers: two, so a page could also lay them out on a plane
OCULTA = 256
EPOCAS = 30
SEED = 1989


def load(fname, offset):
    path = os.path.join(CACHE, fname)
    if not os.path.exists(path):
        os.makedirs(CACHE, exist_ok=True)
        urllib.request.urlretrieve(MIRROR + fname, path)
    with gzip.open(path, 'rb') as f:
        return np.frombuffer(f.read(), np.uint8, offset=offset)


class CVAE(nn.Module):
    def __init__(self):
        super().__init__()
        self.enc = nn.Sequential(nn.Linear(784 + 10, 512), nn.ReLU(), nn.Linear(512, OCULTA), nn.ReLU())
        self.mu = nn.Linear(OCULTA, Z)
        self.logvar = nn.Linear(OCULTA, Z)
        self.dec1 = nn.Linear(Z + 10, OCULTA)
        self.dec2 = nn.Linear(OCULTA, 784)

    def decode(self, z, y):
        return torch.sigmoid(self.dec2(torch.relu(self.dec1(torch.cat([z, y], 1)))))

    def forward(self, x, y):
        h = self.enc(torch.cat([x, y], 1))
        mu, logvar = self.mu(h), self.logvar(h)
        z = mu + torch.randn_like(mu) * torch.exp(0.5 * logvar)
        return self.decode(z, y), mu, logvar


def quantize(w):
    scale = float(np.abs(w).max() / 127)
    q = np.clip(np.round(w / scale), -127, 127).astype(np.int8)
    return base64.b64encode(q.tobytes()).decode('ascii'), scale


def main():
    torch.manual_seed(SEED)
    x = torch.tensor(load('train-images-idx3-ubyte.gz', 16).reshape(-1, 784) / 255, dtype=torch.float32)
    y = torch.nn.functional.one_hot(torch.tensor(load('train-labels-idx1-ubyte.gz', 8).astype(np.int64)), 10).float()

    m = CVAE()
    opt = torch.optim.Adam(m.parameters(), lr=1e-3)
    for epoca in range(EPOCAS):
        perm = torch.randperm(len(x))
        total = 0.0
        for i in range(0, len(x), 128):
            idx = perm[i:i + 128]
            rec, mu, logvar = m(x[idx], y[idx])
            bce = nn.functional.binary_cross_entropy(rec, x[idx], reduction='sum')
            kl = -0.5 * torch.sum(1 + logvar - mu.pow(2) - logvar.exp())
            loss = bce + kl
            opt.zero_grad()
            loss.backward()
            opt.step()
            total += loss.item()
        print(f'epoch {epoca + 1:2d}  loss/digit {total / len(x):.1f}')

    # Sanity check the shipped decoder with the classifier the page already has:
    # generated digits should be read as the digit that was asked for.
    import json
    red = json.load(open(os.path.join(HERE, '..', 'public', 'data', 'red_digitos.json')))['data']
    w1 = np.frombuffer(base64.b64decode(red['w1']), np.int8).reshape(784, red['oculta']) * red['w1_escala']
    w2 = np.frombuffer(base64.b64decode(red['w2']), np.int8).reshape(red['oculta'], 10) * red['w2_escala']

    d1w = m.dec1.weight.detach().numpy().T  # (Z + 10, OCULTA)
    d2w = m.dec2.weight.detach().numpy().T  # (OCULTA, 784)
    d1b = m.dec1.bias.detach().numpy()
    d2b = m.dec2.bias.detach().numpy()
    d1_b64, s1 = quantize(d1w)
    d2_b64, s2 = quantize(d2w)
    q1 = np.frombuffer(base64.b64decode(d1_b64), np.int8).reshape(d1w.shape) * s1
    q2 = np.frombuffer(base64.b64decode(d2_b64), np.int8).reshape(d2w.shape) * s2

    rng = np.random.default_rng(SEED)
    bien = 0
    n = 0
    for d in range(10):
        z = rng.standard_normal((50, Z))
        onehot = np.zeros((50, 10))
        onehot[:, d] = 1
        img = 1 / (1 + np.exp(-(np.maximum(np.hstack([z, onehot]) @ q1 + d1b, 0) @ q2 + d2b)))
        pred = (np.maximum(img @ w1 + np.array(red['b1']), 0) @ w2 + np.array(red['b2'])).argmax(1)
        bien += int((pred == d).sum())
        n += 50
    print(f'generated digits read back as the requested digit: {bien}/{n}')

    write_json(
        OUT,
        {
            'estilo': Z,
            'oculta': OCULTA,
            'salida': 784,
            'w1': d1_b64,
            'w1_escala': s1,
            'b1': [round(float(v), 6) for v in d1b],
            'w2': d2_b64,
            'w2_escala': s2,
            'b2': [round(float(v), 6) for v in d2b],
            'leidos_por_la_clasificadora': round(bien / n, 4),
        },
        source='MNIST (Yann LeCun, Corinna Cortes y Christopher Burges), CC BY-SA 3.0',
        source_date='1998',
    )
    print(f'wrote {OUT} ({os.path.getsize(OUT) / 1024:.0f} KB)')


if __name__ == '__main__':
    main()
