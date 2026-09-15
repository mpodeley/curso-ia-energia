---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Día 3**'
footer: 'mpodeley.github.io/curso-ia-energia'
---

<!-- _class: portada -->

# Tu conocimiento y agentes

Día 3 de 4 · 4 h en vivo · **PCR · CGC · Tecpetrol · Andes Petroleum**

<!--
0:00 · portada mientras entra la gente
Ventanas de hoy: A este deck, C el sitio en el día 3, D NotebookLM con la
cuenta del curso, E la terminal del agente (la que esté ensayada). Sin pulsos
hoy: lo que se comparte va por el chat.
Antes de clase: los tres documentos del cuaderno bajados y listos para subir
(reglamento de operaciones de Ecuador, reporte de sustentabilidad de PCR, Ley
17.319 de InfoLEG) más dos reportes diarios de la ARCH de ayer; el cuaderno se
arma en vivo pero los archivos no se buscan en vivo. La terminal del agente
probada sobre los CSV del Capítulo IV, los mismos del ejercicio de la página.
Martín: cronómetro en cero, chat abierto, y el archivo de preguntas de la
ronda listo para compartir pantalla cuando toque.
-->

---

<!-- _class: seccion -->

## Apertura y repaso de la tarea

Bloque 1 de 10 · **15 min**

<!--
0:00 · arranca el bloque, termina 0:15
-->

---

<!-- _class: agenda -->

## Hoy

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| Apertura y repaso de la tarea | 15 min | Las ventanas del día y una ronda: la mejor de tus tres preguntas |
| Por qué no sabe lo tuyo | 15 min | El hueco, las dos formas de cerrarlo, y qué significa "parecido" para un modelo |
| Buscar por significado | 15 min | Las dos búsquedas del ejercicio, y el prompt aumentado que se le manda al modelo |
| NotebookLM en vivo: el cuaderno del rubro | 32 min | Reglamento, reporte y ley interrogados con sus preguntas, mirando siempre los fragmentos |
| Tu cuaderno: un documento público de tu empresa | 25 min | Cada uno arma el suyo y le hace sus tres preguntas; ronda de qué salió |
| Pausa | 10 min | |
| El loop del agente | 20 min | La traza del ejercicio paso a paso, y después en vivo sobre el Capítulo IV |
| Sus tareas | 30 min | Las cadenas de pasos de cada uno: qué delegarían hoy y qué no |
| Dónde se rompe, dónde mejora | 20 min | Contexto, leer contra tocar, memoria en archivos, la frontera que sube |
| Pausa | 10 min | |
| Taller: el caso de tu empresa, en una página | 36 min | Dolor, datos, sensibilidad, verificabilidad, primer paso; por empresa |
| Cierre y tarea | 12 min | Lo que se llevan, y pulir la página del caso para mañana |

<!--
2 min · acumulado 0:02
La misma tabla está en la página del día 3.
Bajada del día: el modelo no leyó lo de ustedes, y en la primera mitad se
arregla eso. En la segunda, el modelo deja de responder y trabaja. Y al
final cada empresa escribe su caso, que mañana se critica al lado del caso
del curso.
-->

---

## Al final del día van a poder

- Entender la intuición de **RAG**: buscar, traer, responder con cita
- Armar un **cuaderno gratuito** con documentos del rubro y uno de su empresa
- Ver el **loop** de un agente: pensar, ejecutar, mirar el resultado, repetir
- Escribir en una página el **caso de su empresa**: dolor, datos, sensibilidad, verificabilidad

<!--
1 min · acumulado 0:03
Cuatro cosas, dos por mitad. La cuarta es el cambio de género: el curso pasa
de entender a construir, y lo que escriban hoy es lo que mañana se pone al
lado del screening de waterflooding.
-->

---

<!-- _class: panel -->

## Entrá al sitio, como ayer

`mpodeley.github.io/curso-ia-energia`

Hoy usamos la página del día 3. Tené a mano tus **tres preguntas** de la tarea: se usan tal cual
las escribiste, dos veces.

<!--
2 min · acumulado 0:05
El PIN de siempre. Plan del día en una frase: primero entender cómo busca,
después preguntarle de verdad a un cuaderno, y después de la pausa ver
trabajar a un agente y escribir el caso de cada empresa.
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

Bloque 2 de 10 · **15 min**

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
Conectar con la mecánica del día 1 sin reabrirla: inventa lo que no sabe,
y lo que no sabe es exactamente lo de ustedes. El reglamento de Ecuador
quizás lo leyó; el procedimiento interno de su campo, seguro que no.
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

Bloque 3 de 10 · **15 min**

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

Bloque 4 de 10 · **32 min**

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

Bloque 5 de 10 · **25 min**

<!--
1:17 · arranca el bloque, termina 1:42
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

Catorce minutos. Armá tu cuaderno y hacele tus tres preguntas. Lo que trabe, al chat con Martín.

<!--
14 min · acumulado 1:36
Trabajo individual, con la cámara del instructor apagada si ayuda a que
trabajen. Matías circula por el chat también, pero el que responde es Martín.
Martín: cronómetro a la vista, aviso a los 7 y a los 12 minutos. Las trabas
típicas: cuenta corporativa bloqueada (que usen la personal), PDF pesado que
no termina de procesar (que peguen la dirección de la página en vez de
subir), y el que no encuentra un documento público (mandarle el reporte
de la ARCH del día 2).
Plan B si el sitio de NotebookLM no abre desde alguna red: esa persona
sigue en el cuaderno del rubro de la ventana D, con sus preguntas, en voz
alta.
-->

---

## Ronda: qué contestó y de dónde lo sacó

Por nombre, una línea: la respuesta que salió **bien citada** y la que salió **mal o no
estaba**. Sin decir la pregunta si la pregunta dice algo de tu trabajo.

<!--
6 min · acumulado 1:42
Un minuto por persona. Lo que se busca es el patrón: las que salieron bien
suelen ser las que tienen una cifra o un párrafo entero en el documento;
las que salieron mal, las que pedían algo que la empresa nunca escribió, o
lo escribió en otro documento.
Cerrar con la frase del bloque anterior: detectar lo que no está escrito
ya vale la herramienta.
Cierre del bloque 5.
-->

---

<!-- _class: seccion -->

## Pausa · 10 min

Volvemos a las **1:52**

<!--
10 min · acumulado 1:52
Martín: cronómetro de diez minutos en pantalla. Mientras tanto, revisar en
el archivo cuántas cadenas de pasos de la tarea del día 2 quedaron sin
contar (el bloque "Sus tareas" las usa) y avisar por privado a los que no
entregaron el cuaderno que no pasa nada: lo terminan después.
Matías: abrir la ventana E con la terminal del agente y los CSV a la vista.
-->

---

<!-- _class: seccion -->

## El loop del agente

Bloque 6 de 10 · **20 min**

<!--
1:52 · arranca el bloque, termina 2:12
-->

---

## Un modelo metido en un loop, con permiso para ejecutar

El mismo modelo del día 1, con dos agregados: puede **ejecutar** una herramienta y puede
**mirar lo que salió**.

Un chatbot que se equivoca no se entera nunca. Un agente recibe el error de vuelta.

<!--
3 min · acumulado 1:55
Gancho rápido: pedirle a un chatbot que cuente las palabras de un texto
falla porque ve tokens, no palabras. El agente lo resuelve porque ejecuta
un conteo de verdad en vez de predecirlo. Mostrarlo en la ventana E: es un
comando de una línea.
-->

---

<!-- _class: panel -->

## El loop por dentro, paso a paso

Abrí el ejercicio de la página: una corrida real, congelada en diez pasos. Prestá atención al
**tercero y al cuarto**.

<!--
9 min · acumulado 2:04
Ventana C, ejercicio "El loop por dentro". Recorrerla juntos, paso a paso,
leyendo qué herramienta llama y qué vuelve. Los datos son los del Capítulo
IV de ayer.
El corazón es el paso 3: filtra por AGUARAGUE sin diéresis y le vuelven cero
filas. Detenerse ahí y preguntar a la sala qué haría un chatbot con eso.
Después el paso 4: no insiste, no inventa; lista los valores que existen,
encuentra la diéresis, corrige y sigue. Cero filas no es un fracaso, es
información, y el agente la usa porque VE el resultado.
El cierre del recorrido: la respuesta final llega con dos advertencias
autoimpuestas. Eso también es el loop mirándose a sí mismo.
-->

---

<!-- _class: panel -->

## Ahora en vivo, sin red

El mismo loop, corriendo de verdad sobre los datos de producción. Miren **qué herramienta
llama** en cada vuelta y qué hace cuando algo **no vuelve como esperaba**.

<!--
8 min · acumulado 2:12
Ventana E, la terminal del agente. Demo abierta, sin guion: pedirle algo real
sobre los CSV del Capítulo IV (una declinación, un ranking, un gráfico) y
narrar el loop mientras corre: qué pidió, qué volvió, qué decidió con eso.
Si aparece un tropiezo (grafía, columna, unidad), es el momento bueno: es la
traza de recién pasando en vivo.
Plan B si la terminal falla: la traza ya hizo el trabajo pedagógico; se
sigue sin drama y el agente reaparece mañana con el caso.
Cierre del bloque 6.
-->

---

<!-- _class: seccion -->

## Sus tareas

Bloque 7 de 10 · **30 min**

<!--
2:12 · arranca el bloque, termina 2:42
-->

---

<!-- _class: panel -->

## Sus cadenas de pasos

Ronda por nombre: una tarea tuya que hoy te lleva **varios pasos con herramientas distintas**.
La recorremos tramo por tramo con una sola pregunta: ¿esto lo **delego hoy**, o todavía no?

<!--
20 min · acumulado 2:32
Tres minutos por persona, con nombre. Nadie la trajo escrita (no era tarea):
un minuto para que cada uno anote tres o cuatro pasos de una tarea real
chica, con la consigna del analista nuevo del día 2, y después la ronda.
Marcar cada tramo en tres montones: delegable hoy, todavía no, nunca sin
revisión.
Martín: anota los montones en el archivo a la vista, y aparte los tramos
con consecuencias (mandar, cargar, aprobar): son el material del bloque 8.
La regla del chat sigue: la tarea sí, el sistema y el dato de la empresa no.
-->

---

## El patrón que apareció

Lo delegable hoy es **digital, acotado y verificable**: el resultado se comprueba rápido.

Lo que no: criterio, ambigüedad, y consecuencias que no vuelven como mensaje de error.

<!--
10 min · acumulado 2:42
Sintetizar con sus ejemplos, nombrando de quién es cada tramo. La
característica común de lo delegable es que el error se ve mirando la
salida: si comprobar cuesta más que hacer, no se delega.
Cierre del bloque 7.
-->

---

<!-- _class: seccion -->

## Dónde se rompe, dónde mejora

Bloque 8 de 10 · **20 min**

<!--
2:42 · arranca el bloque, termina 3:02
-->

---

## El contexto crece en cada vuelta

Cada paso suma texto a la ventana: más lento, más caro, más fácil perder el objetivo.

Una tarea de veinte pasos no es dos veces una de diez: es **bastante peor**.

<!--
4 min · acumulado 2:46
El contador de contexto del ejercicio muestra esto paso a paso. Es la
ventana del día 1 otra vez: lo que se cae del escritorio, ahora en medio
del trabajo. De acá sale el "acotado" del patrón de recién.
-->

---

## Leer no es lo mismo que tocar

Todo lo que hizo el agente hoy es **reversible**: leyó archivos y guardó un gráfico.

Cuando la herramienta manda un correo, escribe en un sistema o mueve una válvula, el error ya
**no vuelve como mensaje**: queda hecho.

<!--
5 min · acumulado 2:51
Ejemplos del rubro sin dramatizar, y con los tramos que Martín apartó en la
ronda: una nominación, una orden de trabajo, un sistema de control. El loop
deja de funcionar porque el paso equivocado no se corrige mirando la salida.
La regla que mañana se vuelve protocolo: herramientas de escritura, persona
antes del acto.
-->

---

## Lo que aprende no vive en el modelo: vive en archivos

La sesión se apaga y el modelo no retiene nada. Lo que queda, queda en **archivos**: las
instrucciones del proyecto, las habilidades empaquetadas (skills), las conexiones a
herramientas (MCP).

Cambiás de modelo mañana y esos archivos siguen valiendo.

<!--
4 min · acumulado 2:55
El punto práctico: lo que le enseñás a un agente se escribe, no se conversa.
El archivo de instrucciones del proyecto (CLAUDE.md, AGENTS.md o parecido)
es la biblioteca de prompts de ayer, versión agente.
Skills: procedimientos empaquetados que carga cuando los necesita. MCP, el
protocolo de contexto de modelo: plomería estándar para conectarle
herramientas, no una capacidad nueva. El callout de la página lo dice en dos
líneas.
-->

---

## La frontera se corre sola

METR mide el **largo de tarea** que un agente completa solo: viene duplicándose cada **siete
meses**, de tareas de segundos a tareas de horas.

Lo que hoy se rompe a los veinte pasos es lo que más rápido está mejorando.

<!--
5 min · acumulado 3:00
Mostrar el gráfico de METR en vivo: el link está en los recursos de la
página. Leerlo con la letra chica a la vista: es al 50% de éxito y en tareas
de software; una curva no es una promesa.
La lectura honesta para ellos: lo que hoy no delegás porque es largo,
reevalualo en seis meses. La regla de verificar no cambia con el largo. La
contracara está en los recursos: la charla de Barry Zhang, no armes un
agente para todo.
-->

---

<!-- _class: cita -->

## Delegá lo que podés **corregir mirando el resultado**

<!--
2 min · acumulado 3:02
La frase del bloque, y la vara para las cadenas de recién.
Nota de régimen: si el día viene corto de tiempo, se comprime este bloque
(la página lo cubre entero); el taller no se toca.
Cierre del bloque 8.
-->

---

<!-- _class: seccion -->

## Pausa · 10 min

Volvemos a las **3:12**

<!--
10 min · acumulado 3:12
Martín: cronómetro de diez minutos en pantalla, y en el chat el link a la
plantilla del taller (sección "Taller: el caso de tu empresa" de la página)
para que la abran antes de volver.
Matías: preparar las salas: PCR juntos, Andes juntos, CGC y Tecpetrol solos.
Si la plataforma no tiene salas, el taller se hace en la sala principal con
micrófonos cerrados y el chat privado entre los pares.
-->

---

<!-- _class: seccion -->

## Taller: el caso de tu empresa, en una página

Bloque 9 de 10 · **36 min**

<!--
3:12 · arranca el bloque, termina 3:48
-->

---

## La plantilla, cinco preguntas

- **Dolor**: qué tarea, cuán seguido, quién la sufre
- **Datos**: dónde viven, en qué formato, quién los tiene
- **Sensibilidad**: qué puede salir de la empresa y qué no
- **Verificabilidad**: cómo sabrían que el resultado está bien
- **Primer paso**: qué probarían el lunes

<!--
6 min · acumulado 3:18
Leer la plantilla con un ejemplo que no sea de nadie: el reporte diario de
la ARCH a tabla, que hicieron ayer. Dolor: todos los días, el analista, media
hora. Datos: un PDF público. Sensibilidad: ninguna. Verificabilidad: contra
el PDF, número por número. Primer paso: cinco reportes seguidos y una serie
de pozos cerrados por corte de agua.
Los criterios vienen de la lista corta con la que la primera edición eligió
su caso: frecuencia del dolor, datos accesibles y no sensibles, resultado
verificable. Los tres o no hay caso. Y ser brutal con el lunes: un paso, no
un plan.
-->

---

<!-- _class: panel -->

## A escribir, por empresa

Dieciocho minutos. PCR y Andes en pareja; CGC y Tecpetrol solos, y valen igual. Una página,
una línea o dos por pregunta.

<!--
18 min · acumulado 3:36
Salas por empresa. Matías pasa por cada una a mitad de tiempo con una sola
pregunta: ¿cómo sabrían que está bien? Es la fila que siempre queda floja.
Martín: cronómetro a la vista, aviso a los 9 y a los 15 minutos, y en el
chat de cada sala la plantilla pegada. El que está solo trabaja igual: la
página es suya, y mañana la lee él.
Recordar antes de abrir las salas: el documento es de ustedes; por el chat
general va después solo la fila del dolor y la del primer paso.
-->

---

## Ronda: el dolor y el primer paso

Por empresa, dos líneas al chat y en voz alta: **qué duele** y **qué probarían el lunes**. El
resto queda en su página, y mañana se critica con el protocolo de verificación.

<!--
12 min · acumulado 3:48
Tres minutos por empresa. Escuchar buscando lo mismo en los cuatro: ¿el
dato existe y puede salir, o tiene análogo público? ¿el resultado se
comprueba en menos de lo que tarda hacerlo a mano? Decirlo como pregunta,
no como veredicto: el veredicto es mañana, con el protocolo.
Martín: anota las cuatro filas de dolor y primer paso en el archivo; son la
lista que mañana se proyecta al lado del screening.
Cierre del bloque 9.
-->

---

<!-- _class: seccion -->

## Cierre y tarea

Bloque 10 de 10 · **12 min**

<!--
3:48 · arranca el bloque, termina 4:00
-->

---

<!-- _class: acentos -->

## Para llevarse

- RAG es responder **con el libro abierto**: la cita no verifica, abrir la cita verifica
- Un agente es un modelo en un **loop** con herramientas: trabaja porque ve sus errores
- Delegá lo **digital, acotado y verificable**; lo irreversible, nunca sin persona
- Un cuaderno con un documento público **ya te dice qué falta documentar**

<!--
4 min · acumulado 3:52
Cuatro prácticas, en palabras simples. Y la quinta sin decirla: cada empresa
ya tiene su caso escrito, y mañana se lo mira con las mismas reglas que al
del curso.
-->

---

## Tarea para mañana

Pulí la **página del caso** de tu empresa: releé las cinco filas y completá la que quedó floja.
Casi siempre es la de **verificabilidad**. Cinco minutos.

<!--
3 min · acumulado 3:55
Cinco minutos, como siempre. El que está solo la pule solo; los de a dos, se
la mandan entre ellos. Mañana se leen los cuatro casos al lado del caso
prearmado del curso, con el mismo protocolo.
Plan B si pocos la pulen: la página tal como quedó hoy sirve igual; el
protocolo de mañana se aplica sobre lo que haya.
-->

---

## Mañana: riesgos, el caso y el horizonte

- Un **protocolo de verificación** según el costo del error, y una política de uso en una página
- El caso del curso en vivo: **screening de waterflooding** sobre el Capítulo IV
- La crítica: el caso del curso y **los cuatro de ustedes**, con las mismas reglas

<!--
3 min · acumulado 3:58
Mañana las piezas sueltas se vuelven política, el caso prearmado se recorre
de punta a punta con el agente, y sus cuatro páginas se critican al lado.
Los ejercicios y el quiz quedan en la página, como siempre.
-->

---

<!-- _class: portada -->

# Nos vemos mañana

El quiz y los tres ejercicios quedan en la página · **mpodeley.github.io/curso-ia-energia**

<!--
2 min · acumulado 4:00
Dejar proyectada mientras se despiden.
Después de clase: guardar el archivo de la ronda (preguntas, montones, y las
cuatro filas de dolor y primer paso) y pasarlo al deck del día 4; probar la
terminal del agente sobre el caso de waterflooding una vez más.
-->
