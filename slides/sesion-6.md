---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 6**'
footer: 'mpodeley.github.io/curso-ia-energia'
---

<!-- _class: portada -->

# Un agente arma el tablero de un campo

Sesión 6 de 8 · día 3: agentes · 2 h en vivo · **PCR · CGC · Tecpetrol · Andes Petroleum**

<!--
0:00 · portada mientras vuelven de la pausa
Ventanas de esta sesión: A este deck; C el sitio en la página de la sesión
6; E la terminal en ~/volve-agente-vivo, con la carpeta lista y el agente
SIN lanzar; F la salida de scripts/volve_checks.py (la hoja de respuestas),
fuera de la pantalla compartida; G el tablero del ensayo de ayer,
~/volve-agente-ensayo/salida/tablero_volve.html, abierto en el navegador:
es el plan B; D Claude con la ejecución de código activada, para la parte
de ellos.
Todo se deja listo antes de la sesión 5: la pausa dura diez minutos. La
receta está en docs/edicion-2026-09/volve-agente/README.md.
Letra de la terminal grande y tema claro.
Apoyo: cronómetro en cero, chat abierto, el link al zip del paquete
liviano listo para pegar, y su documento con lo que cada uno dijo el lunes
en la ronda de relevamiento, para el taller.
-->

---

<!-- _class: seccion -->

## El dataset, en cinco minutos

Bloque 1 de 5 · **8 min**

<!--
0 min · acumulado 0:00
Arranca 0:00, termina 0:08.
-->

---

<!-- _class: agenda -->

## Esta sesión

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| El dataset, en cinco minutos | 8 min | Qué es Volve, qué archivos trae, la licencia, y la pregunta del día: ¿qué hay acá, y cuadra? |
| La herramienta, armada por un agente en vivo | 40 min | Claude Code sobre una carpeta preparada arma un tablero HTML de un solo archivo: inventario, mapa, producción por pozo con la conciliación contra Sodir, visor de LAS y cruce de nombres; la sala propone chequeos por el chat |
| Pausa | 10 min | |
| Tu versión, con un agente gratuito | 30 min | El paquete liviano en Claude gratuito (código y un artifact) o en Arena, modo agente: la ficha del pozo F-12 o un visor de su LAS, y dos chequeos (el GR relleno, F-11 contra F-11 B) |
| Taller: el caso de tu empresa, en una página | 25 min | Dolor, datos, sensibilidad, verificabilidad y primer paso, por empresa, desde el problema que cada uno nombró el lunes |
| Cierre y tarea | 7 min | Tres prácticas y pulir la página del caso para mañana |

<!--
2 min · acumulado 0:02
La misma tabla está en la página de la sesión 6.
Retomar en una frase: antes de la pausa vieron cómo usa herramientas un
agente, qué es el arnés y qué es un CLI. Ahora uno trabaja en serio sobre
un conjunto de datos entero, y después de la pausa cada uno arma su
versión con una herramienta gratuita.
La pausa de esta sesión va en el medio, cerca de las 12:50.
-->

---

## Al final de esta sesión van a poder

- Leer lo que hace un **agente de terminal** y decir qué chequear antes de creerle
- Pedirle a un agente gratuito una herramienta sobre datos de pozo, y **verificarla**
- Escribir en una página el **caso de su empresa**

<!--
1 min · acumulado 0:03
La primera se hace mirando; la segunda, manejando; la tercera, escribiendo.
Apoyo: pegar en el chat el link a la página de la sesión 6.
-->

---

## Volve: un campo entero, liberado

Mar del Norte noruego. Equinor lo produjo de **2008 a 2016** y en 2018 liberó todo: unos
**40,000 archivos**.

Producción por pozo, mapas y perfiles de pozo en un mismo campo, con licencia abierta.

<!--
2 min · acumulado 0:05
Equinor lo presentó como la liberación de datos más completa de la
plataforma continental noruega: producción, perfiles, sísmica, informes.
La licencia (Equinor Open Data Licence) permite usar, adaptar y compartir
con crédito a Equinor y a los ex socios, y prohíbe vender. El crédito está
en la página y en el README del paquete.
El acceso oficial hoy pide una cuenta de Databricks. El curso bajó diez
archivos de copias públicas en GitHub, fijadas a una versión, ayer; nada
depende de internet en vivo.
Por qué un campo noruego: ahí están juntos, y públicos, la producción por
pozo, el mapa y los perfiles. Ningún archivo es de una empresa de la sala.
-->

---

## Diez archivos, cinco formatos

| Qué | Formato |
| --- | --- |
| Producción diaria y mensual de 7 pozos | Excel del operador |
| 409 topes de formación de 35 pozos | Texto de ancho fijo |
| El tope del reservorio, 184,066 puntos | CSV |
| Trayectoria de F-12 | Texto |
| Perfiles de F-12, F-11 B y F-14 | LAS |
| Pozos y producción del campo | CSV de Sodir, el registro oficial noruego |

<!--
2 min · acumulado 0:07
CSV: valores separados por comas. LAS: Log ASCII Standard, el formato de
texto de los perfiles de pozo. Sodir: Norwegian Offshore Directorate, que
publica las FactPages con la producción oficial de cada campo.
El reservorio es la Formación Hugin. Tres siglas que van a ver en todos
lados: MD, profundidad medida a lo largo del pozo; TVDSS, profundidad
vertical bajo el nivel del mar; Sm3, metro cúbico estándar.
El paquete completo pesa 16.1 MB; el liviano de ellos, 2.5 MB, está en la
página.
-->

---

<!-- _class: cita -->

## ¿Qué hay acá, **y cuadra**?

<!--
1 min · acumulado 0:08
La pregunta del día, y la primera que conviene hacerle a cualquier conjunto
de datos que llega de otra gerencia, de un socio o de un contratista.
Cierre del bloque 1.
-->

---

<!-- _class: seccion -->

## La herramienta, armada por un agente en vivo

Bloque 2 de 5 · **40 min**

<!--
0 min · acumulado 0:08
Arranca 0:08, termina 0:48.
-->

---

## La carpeta

```
volve-agente-vivo/
├── CLAUDE.md               las instrucciones del proyecto
├── PEDIDO.md               el pedido, en cinco pasos
├── .claude/settings.json   los permisos
├── datos/                  los diez archivos, 16.1 MB
└── salida/                 vacía: ahí escribe el agente
```

<!--
2 min · acumulado 0:10
Ventana E: ls -la y ls datos/*, que se vea que salida/ está vacía. Copiada
ayer del caché: el agente no baja nada.
El agente es Claude Code, el mismo de la sesión 5, con la cuenta paga, en
esta computadora.
El pedido, en voz alta: el inventario, la producción por pozo contra
Sodir, el mapa, el visor de perfiles de F-12, los nombres, siete chequeos y
un informe de una página. Todo en un solo archivo HTML que se abre sin red.
El archivo de instrucciones lo vemos mientras el agente lo lee: en los
ensayos en seco, la corrida llevó de 13 a 18 minutos, y no sobra tiempo.
-->

---

## Los permisos

- **Sin preguntar**: leer, correr Python, escribir en `salida/`
- **Prohibido**: internet, borrar archivos, tocar `datos/`
- **Todo lo demás**: se detiene y pregunta

<!--
1 min · acumulado 0:11
Ventana E: .claude/settings.json, diez líneas. Todo lo permitido se
deshace: si sale mal, se vacía salida/ y se repite.
-->

---

<!-- _class: panel -->

## Arranca

`claude --model opus "$(cat PEDIDO.md)"`

Miren **qué herramienta llama** en cada vuelta y qué hace cuando algo **no sale**.

<!--
1 min · acumulado 0:12
Ventana E, desde ~/volve-agente-vivo. La primera vez aparece el diálogo de
confianza de la carpeta: leerlo en voz alta y aceptar. El pedido queda
escrito arriba en la terminal.
Si pide un permiso, contestar en voz alta y decir por qué.
Apoyo: abre en el chat la consigna "¿qué chequearías antes de creerle?".
-->

---

## El archivo de instrucciones

Lo que **ya se sabe** va como regla: signos, unidades, datum, nombres.

Lo que **no se sabe** va como chequeo: una pregunta que se contesta con un número.

<!--
4 min · acumulado 0:16
Mientras el agente lee CLAUDE.md y mira los datos, abrirlo en otra
pestaña de la terminal (o en el editor) y recorrer los títulos. Parar en
tres lugares:
1. El diccionario de un archivo difícil, el de los topes: texto de ancho
   fijo, celdas vacías, un bloque por pozo.
2. Las trampas conocidas: la profundidad bajo el mar es negativa en los
   topes y positiva en la grilla; las coordenadas están en ED50 y un mapa
   web se correría más de cien metros; el mismo pozo tiene cinco nombres;
   pandas convierte el "NULL" del Excel en cero si no se le avisa.
3. Los siete chequeos: preguntas sin la respuesta al lado. Ese es el
   material para comparar después con la hoja de respuestas.
El punto: a un agente se le enseña por escrito, y se le pregunta con
número lo que no sabemos.
Volver a la ventana E cuando el agente empiece a escribir el programa.
-->

---

<!-- _class: panel -->

## Mientras trabaja

Lee, corre, mira, corrige.

Tu parte, por el chat: **¿qué chequearías antes de creerle?**

<!--
19 min · acumulado 0:35
Narrar sin tapar al agente. Lo que conviene señalar cuando pase:
- La primera mirada: abre el Excel, cuenta filas y hojas antes de
  calcular. El .dat de los topes le cuesta: es texto de ancho fijo.
- El primer error, que casi siempre llega: el "NULL" del Excel, un corte
  del .dat que se corre, rótulos que se enciman en el visor. Leer el error
  en voz alta y ver qué hace con él.
- La conciliación: cuando imprima la suma de los pozos contra Sodir.
- El GR de F-12: cuando encuentre el tramo constante.
No corregirlo a mano ni sumarle pedidos mientras corre.
Apoyo: junta los chequeos del chat en tres montones (un total contra la
fuente, un pozo, una profundidad) y lee los dos mejores al terminar, con el
nombre de quién los propuso.
Plan B por tiempos: si a 0:32 no terminó el visor de perfiles (paso 4), se
narra hasta 0:35 y se pasa a la ventana G, el tablero del ensayo de ayer
(misma carpeta, mismo pedido). El agente en vivo termina solo y se mira en
la pausa.
Plan B si falla: un error que repite tres veces, o se cuelga, se dice en
voz alta (es parte de lo que se enseña) y se pasa a G. Sin red, el agente
no arranca: G directo. Si no hay ensayo, el paquete liviano de la página y
la hoja de respuestas en F alcanzan para recorrer los chequeos.
-->

---

## El tablero, sección por sección

Inventario · producción contra Sodir · mapa del tope de Hugin · perfiles de F-12 · nombres ·
chequeos

Un solo archivo HTML: se abre con **doble clic y sin red**.

<!--
5 min · acumulado 0:40
Abrir salida/tablero_volve.html en el navegador (o el de G). Recorrer:
- Inventario: diez archivos, qué es cada uno.
- Producción: F-12 y F-14 dan el 85% del petróleo. La conciliación, año
  por año.
- Mapa: el tope de Hugin con los siete puntos de entrada. Preguntar dónde
  está F-11: el tablero lo tiene que haber puesto en F-11 B.
- Perfiles: el tramo sombreado del GR.
- Nombres: cinco formas de escribir F-12.
Si una sección falta o salió fea, decirlo: la corrida es de verdad.
-->

---

## Los chequeos, contra la referencia

| Chequeo | Referencia |
| --- | --- |
| Pozos contra Sodir | 10.04 contra 10.17 millones de Sm³: **−1.3%** |
| F-11 | La producción es de **F-11 B**; F-11 es de observación |
| F-14 | 39.3% del petróleo, y un solo perfil: la permeabilidad |
| GR de F-12 | 100.669 API constante desde 3,509 m; el pozo termina a 3,520 |
| Hoja diaria | 20 filas de más de 24 h, el último domingo de octubre |

<!--
6 min · acumulado 0:46
Ventana E con salida/chequeos.csv, y F al costado (sin compartir).
Si un número difiere, no se discute cuál está bien: se busca por qué, con
un conteo.
Detalles para decir:
- La conciliación: los pozos suman menos todos los años, y más que nunca
  en 2016 (−4.1%). El agua cuadra a −0.2%. El gas no se compara: Sodir
  publica el vendido (0.81 miles de millones de Sm3) y el operador el
  producido (1.48).
- F-11: Sodir lo lista como observación, y en los topes no pasa del fondo
  marino. F-11 B se terminó el 15 de junio de 2013; el primer petróleo es
  de julio.
- GR: 4,448 muestras, 667 m debajo del fondo según Sodir. Densidad,
  neutrón y resistividades terminan entre 3,505 y 3,508 m.
- La boca de F-12: el encabezado del perfil la corre 8.5 m al norte.
- F-5 es inyector y figura 144 días de 2016 como productor.
Si el chat propuso alguno de estos, decir el nombre de quién.
-->

---

<!-- _class: cita -->

## Un número del tablero **se rastrea hasta el archivo**

<!--
2 min · acumulado 0:48
La frase del bloque. Pedir uno en vivo si sobra un minuto: "¿de qué
archivo y qué filas sale el 45.6% de F-12?". El agente lo contesta sin
tocar nada.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## Pausa · 10 min

Volvemos a las **12:58** (10:58 en Ecuador y Colombia)

<!--
10 min · acumulado 0:58
Apoyo: cronómetro de diez minutos en pantalla, y en el chat el link al
zip del paquete liviano, con la consigna "bajalo y descomprimilo antes de
volver".
Si el agente en vivo quedó corriendo, mirar cómo terminó.
Abrir la ventana D (Claude) con la página de la sesión en la sección "Tu
versión".
-->

---

<!-- _class: seccion -->

## Tu versión, con un agente gratuito

Bloque 3 de 5 · **30 min**

<!--
0 min · acumulado 0:58
Arranca 0:58, termina 1:28.
-->

---

## Qué subir y dónde

- **Claude**, con la ejecución de código: corre Python y muestra el resultado como un
  **artifact**
- **Arena, modo agente**: una computadora descartable. No acepta `.las` ni `.zip`: subí la copia
  `_las.txt`

Los prompts están en la página, en la sección "Tu versión".

<!--
3 min · acumulado 1:01
Claude es la que ya tienen andando desde el martes. Arena es la
alternativa si Claude se queda sin cuota. En Arena lo que escriben puede
compartirse con los proveedores: acá va porque es dato público.
Dos tareas, elegir una: la ficha del pozo F-12 (cuatro archivos) o el
visor del perfil de F-12 (uno solo). Los de a dos pueden repartirse: uno
cada tarea.
Apoyo: pegar en el chat el link a la sección "Tu versión" de la página.
-->

---

<!-- _class: panel -->

## La ficha o el visor

Doce minutos. Pegá el prompt de la página, mirá qué hace, y **no lo corrijas** hasta que termine.

<!--
12 min · acumulado 1:13
Ventana D: hacer la ficha en vivo en paralelo, con la cuenta gratuita si
se puede, para mostrar el artifact a los cinco minutos.
Lo que suele pasar: el LAS lo lee bien; los topes los lee mal si el CSV
tiene celdas vacías; el artifact sale con los datos embebidos. Si el
artifact no aparece, pedir el HTML como archivo para bajar.
Apoyo: pasar lista por el chat privado a los 5 minutos: ¿quién tiene algo
en pantalla? El que se trabó, por Arena o mirando nuestra pantalla.
Plan B si Claude pide esperar por cuota: Arena, modo agente, con los
archivos sueltos y la copia _las.txt. Si las dos fallan, siguen en nuestra
pantalla y hacen los chequeos a mano con el CSV de topes y el de Sodir.
-->

---

## Dos chequeos

**a)** ¿Hay un tramo largo del perfil donde una curva repite el mismo valor? ¿Dónde empieza,
contra la profundidad final de Sodir?

**b)** ¿Qué dice Sodir de 15/9-F-11 y de sus otras ramas? ¿Quién produjo ese petróleo?

<!--
8 min · acumulado 1:21
El prompt de los dos chequeos está en la página, para pegar en la misma
conversación. Para el b hacen falta sodir_volve_pozos.csv y
topes_formacion.csv.
Las respuestas, en la página plegadas:
a) GR 100.669 API desde 3,509.0 m hasta el final del recorte (598
   muestras); Sodir da 3,520 m; densidad, neutrón y resistividades terminan antes de 3,508.
b) F-11 y F-11 A son de observación; F-11 B es de producción, terminado
   el 15 de junio de 2013; es la que cruza el tope de Hugin.
-->

---

## Ronda: qué entregó tu agente

Una línea cada uno: **qué armó**, y si se equivocó, **en qué**.

<!--
7 min · acumulado 1:28
Un minuto por persona, por nombre. Buscar lo mismo en todos: ¿el GR
relleno lo vio solo, o recién cuando se lo preguntaron? ¿Leyó F-11 como
un pozo sin reservorio, o fue a buscar la rama?
Si un número no coincide con la página, rastrearlo en voz alta hasta el
archivo y la fila.
Apoyo: anotar qué herramienta usó cada uno y si llegó a los dos chequeos.
Cierre del bloque 3.
-->

---

<!-- _class: seccion -->

## Taller: el caso de tu empresa, en una página

Bloque 4 de 5 · **25 min**

<!--
0 min · acumulado 1:28
Arranca 1:28, termina 1:53.
-->

---

## La plantilla, con el tablero de hoy como ejemplo

| Pregunta | El tablero de hoy |
| --- | --- |
| Dolor | Recibir datos de otra área y saber qué hay y si cuadran |
| Datos | Planilla, topes, grilla, perfiles LAS y el registro oficial |
| Sensibilidad | Ninguna; con datos propios, el agente corre adentro |
| Verificabilidad | La producción oficial y siete chequeos con número |
| Primer paso | Una carpeta y un archivo de instrucciones |

<!--
4 min · acumulado 1:32
La plantilla completa, con la columna "qué tiene que decir", está en la
página. Recorrerla rápido con el ejemplo de hoy.
Los tres criterios con los que la primera edición eligió su caso: dolor
frecuente, datos accesibles y no sensibles, resultado verificable. Tienen
que estar los tres.
Si el caso pasa la crítica de mañana, esta página es casi el archivo de
instrucciones de su proyecto.
-->

---

<!-- _class: panel -->

## A escribir, por empresa

Trece minutos. PCR y Andes en pareja; CGC y Tecpetrol solos. Arranca del problema que nombraste
el lunes.

<!--
13 min · acumulado 1:45
Apoyo, antes de abrir las salas: lee de su documento lo que cada uno dijo
el lunes a "el problema que probarías primero", una línea por persona, con
nombre. La página arranca de ahí, o dice por qué cambió.
Apoyo: cronómetro a la vista, aviso a los 7 y a los 11 minutos, y la
plantilla pegada en el chat de cada sala.
Pasar por cada sala a mitad de tiempo con una sola pregunta: ¿cómo sabrían
que está bien? Es la fila que siempre queda floja.
Si la plataforma no tiene salas: sala principal con micrófonos cerrados y
chat privado entre los pares.
-->

---

## Ronda: el dolor y el primer paso

Por empresa, dos líneas al chat y en voz alta: **qué duele** y **qué probarían el lunes**.

<!--
8 min · acumulado 1:53
Dos minutos por empresa. Escuchar buscando lo mismo en las cuatro: ¿el
dato existe y puede salir, o tiene un análogo público? ¿El resultado se
comprueba en menos de lo que tarda hacerlo a mano? Decirlo como pregunta;
el veredicto queda para mañana, con el protocolo.
Apoyo: anota las cuatro filas de dolor y primer paso; mañana se proyectan
en la sesión 8.
Cierre del bloque 4.
-->

---

<!-- _class: seccion -->

## Cierre y tarea

Bloque 5 de 5 · **7 min**

<!--
0 min · acumulado 1:53
Arranca 1:53, termina 2:00.
-->

---

<!-- _class: acentos -->

## Para llevarse

- Antes de analizar datos ajenos, pedí el **inventario y el cruce** contra la fuente oficial
- Lo que sabés va **como regla**; lo que no, como chequeo con número
- Un tablero prolijo se verifica igual: **un número, hasta el archivo**

<!--
3 min · acumulado 1:56
Tres prácticas, en palabras simples. Se suman a las de la sesión 5.
-->

---

## Tarea para mañana

Pulí la **página del caso** de tu empresa: releé las cinco filas y completá la que quedó floja.
Casi siempre es la de **verificabilidad**. Cinco minutos.

<!--
2 min · acumulado 1:58
El que está solo la pule solo; los de a dos se la mandan entre ellos.
Plan B si pocos la pulen: la página como quedó hoy sirve igual, y si
alguien no llegó a escribir nada, la ronda de hoy alcanza para empezar.
-->

---

## Mañana: sesiones 7 y 8

- Un **protocolo de verificación** según el costo del error, y dónde un agente no entra
- El caso prearmado del curso, **criticado** con ese protocolo
- Sus **cuatro casos**, con las mismas reglas

<!--
1 min · acumulado 1:59
Mañana las piezas sueltas se vuelven reglas (sesión 7), y el caso del
curso y las cuatro páginas pasan por esas reglas (sesión 8). El quiz queda
en la página, como siempre.
-->

---

<!-- _class: portada -->

# Nos vemos mañana

El quiz y el paquete de Volve quedan en la página · **mpodeley.github.io/curso-ia-energia**

<!--
1 min · acumulado 2:00
Dejar proyectada mientras se despiden.
Después de clase: guardar ~/volve-agente-vivo/salida/ fuera del repo, y
las cuatro filas de dolor y primer paso para la sesión 8.
-->
