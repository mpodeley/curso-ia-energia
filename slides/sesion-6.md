---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 6**'
footer: 'mpodeley.github.io/curso-ia-energia'
---

<!-- _class: portada -->

# Agentes y el caso de tu empresa

Sesión 6 de 8 · día 3 · 2 h en vivo · **PCR · CGC · Tecpetrol · Andes Petroleum**

<!--
0:00 · portada mientras vuelven de la pausa
Ventanas de esta sesión: A este deck, C el sitio en la sesión 6, E la
terminal del agente (la que esté ensayada), probada sobre los CSV del
Capítulo IV, los mismos del ejercicio de la página. D NotebookLM queda
abierta por si alguien pregunta por su cuaderno.
Martín: cronómetro en cero, chat abierto, y el archivo de la ronda abierto
en una hoja nueva para las cadenas de pasos y las filas de cada caso.
-->

---

<!-- _class: seccion -->

## El loop del agente

Bloque 1 de 5 · **20 min**

<!--
0:00 · arranca el bloque, termina 0:20
-->

---

<!-- _class: agenda -->

## Esta sesión

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| El loop del agente | 20 min | Dónde quedamos antes de la pausa, la traza del ejercicio paso a paso, y después en vivo sobre el Capítulo IV |
| Sus tareas | 30 min | Las cadenas de pasos de cada uno: qué delegarían hoy y qué no |
| Dónde se rompe, dónde mejora | 15 min | Contexto, leer contra tocar, memoria en archivos, la frontera que sube |
| Pausa | 10 min | |
| Taller: el caso de tu empresa, en una página | 36 min | Dolor, datos, sensibilidad, verificabilidad, primer paso; por empresa |
| Cierre y tarea | 9 min | Lo que se llevan, y pulir la página del caso para mañana |

<!--
2 min · acumulado 0:02
La misma tabla está en la página de la sesión 6.
Retomar en una frase: antes de la pausa el modelo respondía con el libro
abierto; ahora trabaja por su cuenta, con herramientas. Y al final cada empresa escribe
su caso, que mañana se critica al lado del caso del curso.
-->

---

## Al final de esta sesión van a poder

- Ver el **loop** de un agente: pensar, ejecutar, mirar el resultado, repetir
- Separar lo que se **delega hoy** de lo que todavía no
- Escribir en una página el **caso de su empresa**: dolor, datos, sensibilidad, verificabilidad

<!--
1 min · acumulado 0:03
Tres cosas. La tercera es distinta de las otras dos: cada empresa escribe algo
propio, y eso mañana se pone al lado del screening de waterflooding.
Martín: avisar por el chat que la página de la sesión 6 ya está abierta en
el sitio, para el que siga en la de la sesión 5.
-->

---

## Un modelo metido en un loop, con permiso para ejecutar

El mismo modelo de la sesión 2, con dos agregados: puede **ejecutar** una herramienta y puede
**mirar lo que salió**.

Un chatbot que se equivoca no se entera nunca. Un agente recibe el error de vuelta.

<!--
3 min · acumulado 0:06
Gancho rápido: pedirle a un chatbot que cuente las palabras de un texto
falla porque el modelo lee tokens (sesión 2). El agente lo resuelve
corriendo un conteo de verdad. Mostrarlo en la ventana E: es un
comando de una línea.
-->

---

<!-- _class: panel -->

## El loop por dentro, paso a paso

Abrí el ejercicio de la página: una corrida real, congelada en diez pasos. Prestá atención al
**tercero y al cuarto**.

<!--
8 min · acumulado 0:14
Ventana C, ejercicio "El loop por dentro". Recorrerla juntos, paso a paso,
leyendo qué herramienta llama y qué vuelve. Los datos son los del Capítulo
IV de ayer.
El corazón es el paso 3: filtra por AGUARAGUE sin diéresis y le vuelven cero
filas. Detenerse ahí y preguntar a la sala qué haría un chatbot con eso.
Después el paso 4: lista los valores que existen, encuentra la diéresis,
corrige y sigue, sin inventar nada. Las cero filas le sirven de información,
y el agente las usa porque VE el resultado.
El cierre del recorrido: la respuesta final llega con dos advertencias
autoimpuestas. También eso sale del loop: el agente revisa lo que hizo antes
de responder.
-->

---

<!-- _class: panel -->

## Ahora en vivo, sin red

El mismo loop, corriendo de verdad sobre los datos de producción. Miren **qué herramienta
llama** en cada vuelta y qué hace cuando algo **no vuelve como esperaba**.

<!--
6 min · acumulado 0:20
Ventana E, la terminal del agente. Demo abierta, sin guion: pedirle algo real
sobre los CSV del Capítulo IV (una declinación, un ranking, un gráfico) y
narrar el loop mientras corre: qué pidió, qué volvió, qué decidió con eso.
Si aparece un tropiezo (grafía, columna, unidad), es el momento bueno: es la
traza de recién pasando en vivo.
Plan B si la terminal falla: la traza ya hizo el trabajo pedagógico; se
sigue sin drama y el agente reaparece mañana con el caso.
Cierre del bloque 1.
-->

---

<!-- _class: seccion -->

## Sus tareas

Bloque 2 de 5 · **30 min**

<!--
0:20 · arranca el bloque, termina 0:50
-->

---

<!-- _class: panel -->

## Sus cadenas de pasos

Ronda por nombre: una tarea tuya que hoy te lleva **varios pasos con herramientas distintas**.
La recorremos tramo por tramo con una sola pregunta: ¿esto lo **delego hoy**, o todavía no?

<!--
20 min · acumulado 0:40
Tres minutos por persona, con nombre. Nadie la trajo escrita (no era tarea):
un minuto para que cada uno anote tres o cuatro pasos de una tarea real
chica, con la consigna del analista nuevo de la sesión 3, y después la
ronda.
Marcar cada tramo en tres montones: delegable hoy, todavía no, nunca sin
revisión.
Martín: anota los montones en el archivo a la vista, y aparte los tramos
con consecuencias (mandar, cargar, aprobar): son el material del bloque 3.
La regla del chat sigue: la tarea sí, el sistema y el dato de la empresa no.
-->

---

## El patrón que apareció

Lo delegable hoy es **digital, acotado y verificable**: el resultado se comprueba rápido.

Todavía no: lo que pide criterio, lo ambiguo y lo que tiene consecuencias que no vuelven como
mensaje de error.

<!--
10 min · acumulado 0:50
Sintetizar con sus ejemplos, nombrando de quién es cada tramo. La
característica común de lo delegable es que el error se ve mirando la
salida: si comprobar cuesta más que hacer, no se delega.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## Dónde se rompe, dónde mejora

Bloque 3 de 5 · **15 min**

<!--
0:50 · arranca el bloque, termina 1:05
-->

---

## El contexto crece en cada vuelta

Cada paso suma texto a la ventana: más lento, más caro, más fácil perder el objetivo.

Una tarea de veinte pasos sale **bastante peor** que dos de diez.

<!--
3 min · acumulado 0:53
El contador de contexto del ejercicio muestra esto paso a paso. Es la
ventana de la sesión 2 otra vez: lo que se cae del escritorio, ahora en
medio del trabajo. De acá sale el "acotado" del patrón de recién.
-->

---

## Cuando el agente pasa de leer a actuar

Todo lo que hizo el agente hoy es **reversible**: leyó archivos y guardó un gráfico.

Cuando la herramienta manda un correo, escribe en un sistema o mueve una válvula, el error **queda
hecho** y ya no hay salida que mirar para corregirlo.

<!--
4 min · acumulado 0:57
Ejemplos del rubro sin dramatizar, y con los tramos que Martín apartó en la
ronda: una nominación, una orden de trabajo, un sistema de control. El loop
deja de funcionar porque el paso equivocado no se corrige mirando la salida.
La regla que mañana se vuelve protocolo: herramientas de escritura, persona
antes del acto.
-->

---

## Lo que aprende un agente vive en archivos

La sesión se apaga y el modelo no retiene nada. Lo que queda se guarda en **archivos**: las
instrucciones del proyecto, las habilidades empaquetadas (skills), las conexiones a
herramientas (MCP).

Cambiás de modelo mañana y esos archivos siguen valiendo.

<!--
3 min · acumulado 1:00
El punto práctico: a un agente se le enseña por escrito.
El archivo de instrucciones del proyecto (CLAUDE.md, AGENTS.md o parecido)
es la biblioteca de prompts de ayer, versión agente.
Skills: procedimientos empaquetados que carga cuando los necesita. MCP, el
protocolo de contexto de modelo: plomería estándar para conectarle
herramientas; lo que el agente puede hacer no cambia. El callout de la página lo dice en dos
líneas.
-->

---

## La frontera se corre sola

METR mide el **largo de tarea** que un agente completa solo: viene duplicándose cada **siete
meses**, de tareas de segundos a tareas de horas.

Lo que hoy se rompe a los veinte pasos es lo que más rápido está mejorando.

<!--
4 min · acumulado 1:04
Mostrar el gráfico de METR en vivo: el link está en los recursos de la
página. Leerlo con la letra chica a la vista: es al 50% de éxito y en tareas
de software, y describe lo que pasó hasta ahora.
La lectura honesta para ellos: lo que hoy no delegás porque es largo,
reevalualo en seis meses. La regla de verificar no cambia con el largo. La
contracara está en los recursos: la charla de Barry Zhang, no armes un
agente para todo.
-->

---

<!-- _class: cita -->

## Delegá lo que podés **corregir mirando el resultado**

<!--
1 min · acumulado 1:05
La frase del bloque, y la vara para las cadenas de recién.
Nota de régimen: si la sesión viene corta de tiempo, se comprime este bloque
(la página lo cubre entero); el taller no se toca.
Cierre del bloque 3.
-->

---

<!-- _class: seccion -->

## Pausa · 10 min

Volvemos a las **1:15**

<!--
10 min · acumulado 1:15
Martín: cronómetro de diez minutos en pantalla, y en el chat el link a la
plantilla del taller (sección "Taller: el caso de tu empresa" de la página
de la sesión 6) para que la abran antes de volver.
Matías: preparar las salas: PCR juntos, Andes juntos, CGC y Tecpetrol solos.
Si la plataforma no tiene salas, el taller se hace en la sala principal con
micrófonos cerrados y el chat privado entre los pares.
-->

---

<!-- _class: seccion -->

## Taller: el caso de tu empresa, en una página

Bloque 4 de 5 · **36 min**

<!--
1:15 · arranca el bloque, termina 1:51
-->

---

## La plantilla, cinco preguntas

- **Dolor**: qué tarea, cuán seguido, quién la sufre
- **Datos**: dónde viven, en qué formato, quién los tiene
- **Sensibilidad**: qué puede salir de la empresa y qué no
- **Verificabilidad**: cómo sabrían que el resultado está bien
- **Primer paso**: qué probarían el lunes

<!--
6 min · acumulado 1:21
Leer la plantilla con un ejemplo que no sea de nadie: el reporte diario de
la ARCH a tabla, que hicieron ayer. Dolor: todos los días, el analista, media
hora. Datos: un PDF público. Sensibilidad: ninguna. Verificabilidad: contra
el PDF, número por número. Primer paso: cinco reportes seguidos y una serie
de pozos cerrados por corte de agua.
Los criterios vienen de la lista corta con la que la primera edición eligió
su caso: frecuencia del dolor, datos accesibles y no sensibles, resultado
verificable. Tienen que estar los tres. Y ser exigente con el lunes: alcanza
con un solo paso concreto.
-->

---

<!-- _class: panel -->

## A escribir, por empresa

Dieciocho minutos. PCR y Andes en pareja; CGC y Tecpetrol solos, y valen igual. Una página,
una línea o dos por pregunta.

<!--
18 min · acumulado 1:39
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
12 min · acumulado 1:51
Tres minutos por empresa. Escuchar buscando lo mismo en los cuatro: ¿el
dato existe y puede salir, o tiene análogo público? ¿el resultado se
comprueba en menos de lo que tarda hacerlo a mano? Decirlo como pregunta;
el veredicto queda para mañana, con el protocolo.
Martín: anota las cuatro filas de dolor y primer paso en el archivo; son la
lista que mañana se proyecta al lado del screening.
Cierre del bloque 4.
-->

---

<!-- _class: seccion -->

## Cierre y tarea

Bloque 5 de 5 · **9 min**

<!--
1:51 · arranca el bloque, termina 2:00
-->

---

<!-- _class: acentos -->

## Para llevarse

- Un agente es un modelo en un **loop** con herramientas: trabaja porque ve sus errores
- Delegá lo **digital, acotado y verificable**; lo irreversible, nunca sin persona
- Lo que le enseñás a un agente **se escribe en archivos**, y sobrevive al cambio de modelo

<!--
3 min · acumulado 1:54
Tres prácticas, en palabras simples, que se suman a las tres de la sesión 5.
Y una más sin decirla: cada empresa ya tiene su caso escrito, y mañana se lo
mira con las mismas reglas que al del curso.
-->

---

## Tarea para mañana

Pulí la **página del caso** de tu empresa: releé las cinco filas y completá la que quedó floja.
Casi siempre es la de **verificabilidad**. Cinco minutos.

<!--
3 min · acumulado 1:57
Cinco minutos, como siempre. El que está solo la pule solo; los de a dos, se
la mandan entre ellos. Mañana se leen los cuatro casos al lado del caso
prearmado del curso, con el mismo protocolo.
Plan B si pocos la pulen: la página tal como quedó hoy sirve igual; el
protocolo de mañana se aplica sobre lo que haya.
-->

---

## Mañana: sesiones 7 y 8

- Un **protocolo de verificación** según el costo del error, y una política de uso en una página
- El caso del curso en vivo: **screening de waterflooding** sobre el Capítulo IV
- La crítica: el caso del curso y **los cuatro de ustedes**, con las mismas reglas

<!--
2 min · acumulado 1:59
Mañana las piezas sueltas se vuelven política (sesión 7), el caso prearmado
se recorre de punta a punta con el agente, y sus cuatro páginas se critican
al lado (sesión 8). Los ejercicios y el quiz quedan en la página, como
siempre.
-->

---

<!-- _class: portada -->

# Nos vemos mañana

El quiz y la traza del agente quedan en la página · **mpodeley.github.io/curso-ia-energia**

<!--
1 min · acumulado 2:00
Dejar proyectada mientras se despiden.
Después de clase: guardar el archivo de la ronda (preguntas de la sesión 5,
montones, y las cuatro filas de dolor y primer paso) y pasarlo al deck de la
sesión 8; probar la terminal del agente sobre el caso de waterflooding una
vez más.
-->
