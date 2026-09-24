---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 5**'
footer: 'mpodeley.github.io/curso-ia-energia'
---

<!-- _class: portada -->

# Tu conocimiento: RAG y NotebookLM

Sesión 5 de 8 · día 3 · 2 h en vivo · **PCR · CGC · Tecpetrol · Andes Petroleum**

<!--
0:00 · portada mientras entra la gente
Ventanas de esta sesión: A este deck, C el sitio en la sesión 5, D NotebookLM
con la cuenta del curso. La E (la terminal del agente) se abre en la pausa,
para la sesión 6. Sin pulsos hoy: lo que se comparte va por el chat.
Antes de clase: los tres documentos del cuaderno bajados y listos para subir
(reglamento de operaciones de Ecuador, reporte de sustentabilidad de PCR, Ley
17.319 de InfoLEG) más dos reportes diarios de la ARCH de ayer; el cuaderno se
arma en vivo pero los archivos no se buscan en vivo. La terminal del agente
probada sobre los CSV del Capítulo IV, los mismos del ejercicio de la página
de la sesión 6.
Martín: cronómetro en cero, chat abierto, y el archivo de preguntas de la
ronda listo para compartir pantalla cuando toque.
-->

---

<!-- _class: seccion -->

## Apertura y repaso de la tarea

Bloque 1 de 6 · **15 min**

<!--
0:00 · arranca el bloque, termina 0:15
-->

---

<!-- _class: agenda -->

## Esta sesión

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| Apertura y repaso de la tarea | 15 min | Las ventanas de la sesión y una ronda: la mejor de tus tres preguntas |
| Por qué no sabe lo tuyo | 15 min | El hueco, las dos formas de cerrarlo, y qué significa "parecido" para un modelo |
| Buscar por significado | 15 min | Las dos búsquedas del ejercicio, y el prompt aumentado que se le manda al modelo |
| NotebookLM en vivo: el cuaderno del rubro | 32 min | Reglamento, reporte y ley interrogados con sus preguntas, mirando siempre los fragmentos |
| Tu cuaderno: un documento público de tu empresa | 28 min | Cada uno arma el suyo y le hace sus tres preguntas; ronda de qué salió |
| Cierre | 5 min | Lo que se llevan de la búsqueda, y qué viene después de la pausa |
| Pausa | 10 min | A las 12:00 de Argentina (10:00 de Ecuador y Colombia) sigue la sesión 6 |

<!--
2 min · acumulado 0:02
La misma tabla está en la página de la sesión 5.
Bajada del día: el modelo no leyó lo de ustedes, y en esta sesión se arregla
eso. En la sesión 6, después de la pausa, el modelo deja de responder y
trabaja. Y al final cada empresa escribe su caso, que mañana se critica al
lado del caso del curso.
-->

---

## Al final de esta sesión van a poder

- Entender la intuición de **RAG**: buscar, traer, responder con cita
- Armar un **cuaderno gratuito** con documentos del rubro y uno de su empresa
- Abrir cada cita y juzgar si el fragmento **responde la pregunta** o solo queda cerca

<!--
1 min · acumulado 0:03
Tres cosas. La tercera es la regla del curso con traje nuevo: la cita no
verifica, abrir la cita verifica. Las otras dos del día (el loop del agente y
el caso de cada empresa) son de la sesión 6.
-->

---

<!-- _class: panel -->

## Entrá al sitio, como ayer

`mpodeley.github.io/curso-ia-energia`

Hoy usamos la página de la sesión 5. Tené a mano tus **tres preguntas** de la tarea: se usan tal
cual las escribiste, dos veces.

<!--
2 min · acumulado 0:05
El PIN de siempre. Plan de la sesión en una frase: primero entender cómo
busca, después preguntarle de verdad a un cuaderno del rubro y a uno propio.
Después de la pausa, en la sesión 6, ver trabajar a un agente y escribir el
caso de cada empresa.
Martín: confirmar por el chat que los seis entraron; el que no, ayuda por
privado mientras arranca la ronda.
-->

---

## Las tres preguntas de cada uno

Una ronda: tu mejor pregunta a un documento de tu empresa, **sin decir cuál es el documento**.
Las anotamos: son el cuestionario del cuaderno de hoy.

<!--
10 min · acumulado 0:15
Ronda directa con nombre, la mejor de las tres por persona, y de paso una
línea sobre el prompt antes y después de ayer si alguien lo trajo. Seis
personas, un minuto y medio cada una.
Martín: anota las preguntas en el archivo a la vista; ese es el guion del
bloque de NotebookLM. Marca las dos o tres más concretas (equipo, número,
procedimiento): esas van primero.
La regla del chat, dicha una vez: la pregunta sí, el documento y el dato de
la empresa no. Hay cuatro empresas competidoras en la sala.
Plan B si pocos la hicieron: dos minutos para escribir UNA pregunta con la
consigna "lo que le preguntarías a tus manuales si contestaran". Con seis
personas salen seis preguntas igual.
Cierre del bloque 1.
-->

---

<!-- _class: seccion -->

## Por qué no sabe lo tuyo

Bloque 2 de 6 · **15 min**

<!--
0:15 · arranca el bloque, termina 0:30
-->

---

## El modelo no leyó tus documentos

Leyó una fracción enorme de internet. **No leyó tu manual de operaciones**, ni tus normas, ni el
informe que escribió tu compañero el mes pasado.

Preguntarle sobre eso es pedirle la continuación más plausible. Ya sabemos cómo termina: una
respuesta inventada, con tono seguro.

<!--
5 min · acumulado 0:20
Conectar con la mecánica de la sesión 2 sin reabrirla: inventa lo que no
sabe, y lo que no sabe es exactamente lo de ustedes. El reglamento de
Ecuador quizás lo leyó; el procedimiento interno de su campo, seguro que no.
-->

---

## Dos formas de cerrar el hueco

**Reentrenar** el modelo con tus documentos: caro, lento, casi siempre innecesario.

**Traerle el documento**: buscar los fragmentos que responden la pregunta y pegarlos arriba de
la pregunta. El modelo responde con el libro abierto.

<!--
4 min · acumulado 0:24
La segunda es la que usa todo el mundo y la que vemos hoy. El nombre técnico
es generación aumentada por recuperación (RAG), y una vez que la ven
funcionar deja de parecer sofisticada: es un buscador más un pegado.
Para buscar el fragmento correcto hace falta buscar por significado, y para
eso hay que poder medir "parecido". Eso es lo que sigue.
-->

---

<!-- _class: panel -->

## Qué significa "parecido" para un modelo

Abrí el **mapa de significados** en la página. Clickeá términos y mirá qué le queda cerca.
Buscá la familia de jerga: "burro", "araña", "pescado", "camisa".

<!--
6 min · acumulado 0:30
Ventana C, ejercicio "El mapa de significados". Cada texto convertido en una
lista de números; textos parecidos, listas parecidas; el mapa es esa lista
proyectada a un plano.
El golpe está en la jerga: el modelo aprendió "burro" y "araña" del lenguaje
corriente, así que las ubica con los objetos cotidianos y no con el
equipamiento del yacimiento. Ahí se ve, de un vistazo, qué no sabe de tu
trabajo. Dejar que lo encuentren ellos clickeando; pedir por el chat una
palabra de jerga de cada país que el mapa no tenga.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## Buscar por significado

Bloque 3 de 6 · **15 min**

<!--
0:30 · arranca el bloque, termina 0:45
-->

---

<!-- _class: panel -->

## Dos formas de buscar, mismo manual

El segundo ejercicio: un manual interno que ningún modelo pudo haber leído. Probá las
preguntas que **no comparten ninguna palabra** con su respuesta.

<!--
8 min · acumulado 0:38
Ventana C, ejercicio "Buscar en tus documentos". El corpus es inventado a
propósito: un documento público real podría haber estado en el entrenamiento
y la demo no probaría nada.
Las dos preguntas estrella: la de evitar que alguien arranque el equipo
mientras lo reparás (la responde "bloqueo y etiquetado") y la de cuidarse los
oídos ("protección auditiva"). El buscador de palabras no tiene con qué; el
de significado las encuentra. Esa es toda la diferencia.
Martín: que comparen los dos modos en su pantalla y canten por el chat qué
pregunta rompió al buscador de palabras.
-->

---

## El prompt aumentado

Mirá el bloque del final del ejercicio: **lo que efectivamente se le manda al modelo**. Los
fragmentos encontrados, pegados arriba de tu pregunta. No hay nada más que eso.

<!--
4 min · acumulado 0:42
Desmitificar del todo: el botón "Copiar prompt aumentado" muestra que RAG es
un prompt largo con los fragmentos adelante. Toda la sofisticación está en
encontrar el fragmento correcto; el resto es el mismo chatbot de siempre.
-->

---

<!-- _class: cita -->

## RAG es responder **con el libro abierto**

<!--
3 min · acumulado 0:45
La frase del bloque. Y la letra chica que abre el bloque siguiente: con el
libro abierto igual hay que mirar qué página trajo.
Cierre del bloque 3.
-->

---

<!-- _class: seccion -->

## NotebookLM en vivo: el cuaderno del rubro

Bloque 4 de 6 · **32 min**

<!--
0:45 · arranca el bloque, termina 1:17
-->

---

<!-- _class: panel -->

## Armamos el cuaderno

NotebookLM, con la cuenta gratuita. Tres documentos públicos, uno por país y uno de la sala:

- El **Reglamento de Operaciones Hidrocarburíferas** de Ecuador (2021, 191 artículos)
- El **Reporte de Sustentabilidad 2024** de PCR
- La **Ley 17.319** de hidrocarburos, texto actualizado de InfoLEG

Y los reportes diarios de la **ARCH** de ayer.

<!--
6 min · acumulado 0:51
Ventana D. Subir los cuatro y narrar lo que hace: los procesa, arma las
fuentes, ofrece resumen. Decir por qué estos: el reglamento es el pariente
real del manual inventado; el reporte es una empresa de la sala contada por
sí misma, y es público; la ley es el marco bajo el que CGC y Tecpetrol
reportan al Capítulo IV. Los reportes de la ARCH son los de ayer: lo que
sacaron a mano, hoy lo pregunta el cuaderno.
Decir en voz alta el mapeo: esto es el mismo circuito del ejercicio anterior,
con interfaz. Buscar por significado + libro abierto + cita.
Recordar la regla: acá también, nada confidencial en la cuenta gratuita. Para
documentos internos existen las versiones corporativas (mañana).
-->

---

<!-- _class: panel -->

## Lo interrogamos con sus preguntas

Las preguntas de la ronda, tal cual las escribieron. Miren dos cosas: la respuesta, y **los
fragmentos que cita**. Y una tercera: **de cuál de los cuatro documentos** sacó cada cosa.

<!--
16 min · acumulado 1:07
El corazón del bloque. Ir por la lista de preguntas de la ronda, por nombre:
"la de Fulano". Antes de cada respuesta, predecir rápido: ¿está esto en
alguno de los cuatro documentos? ¿En cuál?
Arrancar con las tres de la página si las de la ronda son muy de empresa:
abandono de un pozo (reglamento, Art. 53), producción de PCR en Ecuador
(reporte), duración y prórroga de una concesión (ley, ojo que la original y
las reformas dicen cosas distintas).
Por cada respuesta, abrir la cita y leer el fragmento en voz alta: ¿de verdad
responde la pregunta, o quedó cerca del tema nada más?
Si una pregunta no aplica a los documentos subidos, mejor: es el ensayo
perfecto para el límite que viene en la slide siguiente.
Martín: va tachando en el archivo las preguntas ya hechas y anota al lado
"bien citada", "cerca" o "no estaba".
-->

---

## Cuando la cita miente

Si el buscador trae el **fragmento equivocado**, la respuesta viene mal, y viene **con una cita
al lado**, que es peor.

Por eso la regla es mirar los fragmentos, no solo la respuesta. Una herramienta que no te los
muestra no te da verificabilidad: te da la **apariencia** de verificabilidad.

<!--
7 min · acumulado 1:14
Provocarlo en vivo: hacer una pregunta cuya respuesta NO está en los
documentos, o una ambigua que pesque un fragmento vecino. Con cuatro fuentes
es fácil: preguntar por regalías y ver si contesta con la ley argentina
cuando la pregunta era por Ecuador. Mostrar cómo la respuesta sale igual de
prolija.
La regla operativa: la cita no es la verificación; abrir la cita es la
verificación. Es la regla del curso entero con traje nuevo.
-->

---

## El segundo límite, más aburrido

Si la respuesta **no está en los documentos**, no hay recuperación que la traiga.

La herramienta no sabe lo que tu empresa nunca escribió.

<!--
3 min · acumulado 1:17
El límite frecuente de verdad: la mitad de las preguntas interesantes no
tienen respuesta escrita en ningún lado. Detectar ESO ya vale la
herramienta: te dice qué falta documentar. Y es el puente al bloque que
sigue: ahora cada uno con un documento propio.
Cierre del bloque 4.
-->

---

<!-- _class: seccion -->

## Tu cuaderno: un documento público de tu empresa

Bloque 5 de 6 · **28 min**

<!--
1:17 · arranca el bloque, termina 1:45
-->

---

## Cuatro pasos, en la página

1. NotebookLM con una cuenta **personal** de Google, y **Crear cuaderno**
2. Una fuente: un documento **público** de tu empresa (memoria, reporte, nota de prensa)
3. Tus **tres preguntas** de la tarea, una por vez; por cada respuesta, abrí la cita
4. Anotá una que salió bien citada y una que salió mal o no estaba

<!--
5 min · acumulado 1:22
Leer los pasos y señalar la lista de candidatos por empresa que está en la
página (PCR y Tecpetrol tienen reporte de sustentabilidad; CGC, la sección de
inversores; Andes, la nota de prensa del contrato de Tarapoa o un reporte de
la ARCH). Cuenta personal: en varias empresas la corporativa tiene NotebookLM
bloqueado, y lo sabemos hoy, no mañana.
La regla, otra vez y corta: público sí, interno no, y las preguntas no se
comparten en el chat. Se comparte cómo le fue.
-->

---

<!-- _class: panel -->

## Manos a la obra

Quince minutos. Armá tu cuaderno y hacele tus tres preguntas. Lo que trabe, al chat con Martín.

<!--
15 min · acumulado 1:37
Trabajo individual, con la cámara del instructor apagada si ayuda a que
trabajen. Matías circula por el chat también, pero el que responde es Martín.
Martín: cronómetro a la vista, aviso a los 8 y a los 13 minutos. Las trabas
típicas: cuenta corporativa bloqueada (que usen la personal), PDF pesado que
no termina de procesar (que peguen la dirección de la página en vez de
subir), y el que no encuentra un documento público (mandarle el reporte
de la ARCH de la sesión 4).
Plan B si el sitio de NotebookLM no abre desde alguna red: esa persona
sigue en el cuaderno del rubro de la ventana D, con sus preguntas, en voz
alta.
-->

---

## Ronda: qué contestó y de dónde lo sacó

Por nombre, una línea: la respuesta que salió **bien citada** y la que salió **mal o no
estaba**. Sin decir la pregunta si la pregunta dice algo de tu trabajo.

<!--
8 min · acumulado 1:45
Un minuto largo por persona. Lo que se busca es el patrón: las que salieron
bien suelen ser las que tienen una cifra o un párrafo entero en el
documento; las que salieron mal, las que pedían algo que la empresa nunca
escribió, o lo escribió en otro documento.
Cerrar con la frase del bloque anterior: detectar lo que no está escrito
ya vale la herramienta.
Cierre del bloque 5.
-->

---

<!-- _class: seccion -->

## Cierre

Bloque 6 de 6 · **5 min**

<!--
1:45 · arranca el bloque, termina 1:50
-->

---

<!-- _class: acentos -->

## Para llevarse

- RAG es responder **con el libro abierto**: la cita no verifica, abrir la cita verifica
- La jerga de tu oficio **no está en internet**: el modelo la lee en el documento que le das
- Un cuaderno con un documento público **ya te dice qué falta documentar**

<!--
3 min · acumulado 1:48
Tres prácticas de la búsqueda, en palabras simples. El quiz de la sesión 5
queda en la página, junto con los dos ejercicios.
-->

---

## Después de la pausa: sesión 6

- El mismo modelo, metido en un **loop** con herramientas: deja de responder y trabaja
- Sus tareas de varios pasos: qué se **delega hoy** y qué todavía no
- El **caso de tu empresa**, escrito en una página, para criticarlo mañana

<!--
2 min · acumulado 1:50
Adelanto en una frase por punto, sin abrir nada. La sesión 6 tiene su propio
deck y su propia página en el sitio.
-->

---

<!-- _class: seccion -->

## Pausa · 10 min

A las **12:00** de Argentina (10:00 de Ecuador y Colombia) sigue la **sesión 6**, con su propio
deck

<!--
10 min · acumulado 2:00
Martín: cronómetro de diez minutos en pantalla. Mientras tanto, avisar por
privado a los que no terminaron el cuaderno que no pasa nada: lo terminan
después.
Matías: cerrar este deck y abrir el de la sesión 6; abrir la ventana E con la
terminal del agente y los CSV a la vista.
-->
