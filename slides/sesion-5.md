---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 5**'
footer: 'mpodeley.github.io/curso-energia-ypfb'
---

<!-- _class: portada -->

# Tu conocimiento + LLMs: RAG y NotebookLM

Sesión 5 de 8 · 2 h en vivo · **YPFB Andina**

<!--
0:00 · portada mientras entra la gente
Ventanas de hoy: A este deck, C el sitio en la sesión 5, D NotebookLM con la
cuenta del curso. Sin pulsos hoy; el voto del caso va por el chat.
Antes de clase: dos o tres documentos públicos del rubro bajados y listos para
subir (una norma, un manual público, un boletín); el cuaderno se arma en vivo
pero los archivos no se buscan en vivo. Y la SHORTLIST del caso real armada:
dos o tres candidatos salidos de la encuesta y de las tareas de estos días,
con una línea de alcance y datos para cada uno.
-->

---

## Hoy

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| Apertura y entrada al sitio | 5 min | El PIN de siempre y las ventanas del día |
| Repaso de la tarea | 8 min | Las tres preguntas de cada uno; armamos la lista para interrogar el cuaderno |
| Por qué no sabe lo tuyo | 15 min | El hueco, las dos formas de cerrarlo, y qué significa "parecido" para un modelo |
| Buscar por significado | 15 min | Las dos búsquedas del ejercicio, y el prompt aumentado que se le manda al modelo |
| NotebookLM en vivo | 32 min | Un cuaderno real interrogado con sus preguntas, mirando siempre los fragmentos |
| Elección del caso real | 35 min | La lista corta que dejó el relevamiento, discusión de alcance y datos, y voto |
| Cierre y tarea | 10 min | Las cuatro maneras de fallar, completas, y la tarea |

<!--
2 min · acumulado 0:02
La misma tabla está en la página de la sesión 5.
Bajada del día: el modelo no leyó lo de ustedes, y hoy se arregla eso. Y a la
segunda mitad la venían alimentando sin saberlo desde la sesión 1: hoy se
elige el caso real.
-->

---

## Al final de esta sesión van a poder

- Entender la intuición de **RAG**: buscar, traer, responder con cita
- Armar un **notebook gratuito** con documentos técnicos propios
- Elegir entre todos el **caso real** que se construye para la sesión 8

<!--
1 min · acumulado 0:03
Hoy cae la última de las cuatro maneras de fallar, y el curso pasa de
entender a construir: lo que se vote hoy es lo que se presenta terminado en
la sesión 8.
-->

---

<!-- _class: panel -->

## Entrá al sitio, como ayer

`mpodeley.github.io/curso-energia-ypfb`

Hoy usamos la página de la sesión 5. Tené a mano tus **tres preguntas** de la tarea: se usan
tal cual las escribiste.

<!--
2 min · acumulado 0:05
El PIN de siempre. Avisar el plan del día en una frase: primero entender cómo
busca, después preguntarle de verdad a un cuaderno, y al final elegir el caso.
-->

---

<!-- _class: seccion -->

## Repaso de la tarea

Bloque 1 de 6 · **8 min**

<!--
Arranca 0:05, termina 0:13
-->

---

## Las tres preguntas de cada uno

Una ronda: tu mejor pregunta a ese conjunto de documentos. Las anotamos: son el cuestionario
del cuaderno de hoy.

<!--
8 min · acumulado 0:13
Ronda directa con nombre, la mejor de las tres por persona. Anotarlas en un
archivo a la vista: ese es el guion del bloque de NotebookLM.
Plan B si pocos la hicieron: dos minutos para escribir UNA pregunta con la
consigna "lo que le preguntarías a tus manuales si contestaran". Con diez
personas salen diez preguntas igual.
Marcar las dos o tres más concretas (equipo, número, procedimiento): esas van
primero en el cuaderno.
-->

---

<!-- _class: seccion -->

## Por qué no sabe lo tuyo

Bloque 2 de 6 · **15 min**

<!--
Arranca 0:13, termina 0:28
-->

---

## El modelo no leyó tus documentos

Leyó una fracción enorme de internet. **No leyó tu manual de operaciones**, ni tus normas, ni el
informe que escribió tu compañero el mes pasado.

Preguntarle sobre eso es pedirle la continuación más plausible. Ya sabemos cómo termina: una
respuesta inventada, con tono seguro.

<!--
5 min · acumulado 0:18
Conectar con la mecánica de la sesión 2 sin reabrirla: esto es "está seguro y
equivocado", la única manera de fallar que faltaba ver. Sale de lo que
aprendió y de lo que no, y lo que no aprendió es exactamente lo de ustedes.
-->

---

## Dos formas de cerrar el hueco

**Reentrenar** el modelo con tus documentos: caro, lento, casi siempre innecesario.

**Traerle el documento**: buscar los fragmentos que responden la pregunta y pegarlos arriba de
la pregunta. El modelo responde con el libro abierto.

<!--
4 min · acumulado 0:22
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
6 min · acumulado 0:28
Ventana C, ejercicio "El mapa de significados". Cada texto convertido en una
lista de números; textos parecidos, listas parecidas; el mapa es esa lista
proyectada a un plano.
El golpe está en la jerga: el modelo aprendió "burro" y "araña" del lenguaje
corriente, así que las ubica con los objetos cotidianos y no con el
equipamiento del yacimiento. Ahí se ve, de un vistazo, qué no sabe de tu
trabajo. Dejar que lo encuentren ellos clickeando.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## Buscar por significado

Bloque 3 de 6 · **15 min**

<!--
Arranca 0:28, termina 0:43
-->

---

<!-- _class: panel -->

## Dos formas de buscar, mismo manual

El segundo ejercicio: un manual interno que ningún modelo pudo haber leído. Probá las
preguntas que **no comparten ninguna palabra** con su respuesta.

<!--
8 min · acumulado 0:36
Ventana C, ejercicio "Buscar en tus documentos". El corpus es inventado a
propósito: un documento público real podría haber estado en el entrenamiento
y la demo no probaría nada.
Las dos preguntas estrella: la de evitar que alguien arranque el equipo
mientras lo reparás (la responde "bloqueo y etiquetado") y la de cuidarse los
oídos ("protección auditiva"). El buscador de palabras no tiene con qué; el
de significado las encuentra. Esa es toda la diferencia.
Que comparen los dos modos en su pantalla y canten por el chat qué pregunta
rompió al buscador de palabras.
-->

---

## El prompt aumentado

Mirá el bloque del final del ejercicio: **lo que efectivamente se le manda al modelo**. Los
fragmentos encontrados, pegados arriba de tu pregunta. No hay nada más que eso.

<!--
4 min · acumulado 0:40
Desmitificar del todo: el botón "Copiar prompt aumentado" muestra que RAG es
un prompt largo con los fragmentos adelante. Toda la sofisticación está en
encontrar el fragmento correcto; el resto es el mismo chatbot de siempre.
-->

---

<!-- _class: cita -->

## RAG es responder **con el libro abierto**

<!--
3 min · acumulado 0:43
La frase del bloque. Y la letra chica que abre el bloque siguiente: con el
libro abierto igual hay que mirar qué página trajo.
Cierre del bloque 3.
-->

---

<!-- _class: seccion -->

## NotebookLM en vivo

Bloque 4 de 6 · **32 min**

<!--
Arranca 0:43, termina 1:15
-->

---

<!-- _class: panel -->

## Armamos el cuaderno

NotebookLM, con la cuenta gratuita: subimos dos o tres documentos técnicos públicos y queda
listo para preguntar. Sin programar nada.

<!--
6 min · acumulado 0:49
Ventana D. Subir los documentos preparados (norma, manual público, boletín) y
narrar lo que hace: los procesa, arma las fuentes, ofrece resumen.
Decir en voz alta el mapeo: esto es el mismo circuito del ejercicio anterior,
con interfaz. Buscar por significado + libro abierto + cita.
Recordar la regla: acá también, nada confidencial en la cuenta gratuita. Para
documentos internos existen las versiones corporativas (sesión 7).
-->

---

<!-- _class: panel -->

## Lo interrogamos con sus preguntas

Las preguntas de la ronda, tal cual las escribieron. Miren dos cosas: la respuesta, y **los
fragmentos que cita**.

<!--
16 min · acumulado 1:05
El corazón del bloque. Ir por la lista de preguntas de la ronda, por nombre:
"la de Fulano". Antes de cada respuesta, predecir rápido: ¿está esto en los
documentos que subimos?
Por cada respuesta, abrir la cita y leer el fragmento en voz alta: ¿de verdad
responde la pregunta, o quedó cerca del tema nada más?
Si una pregunta no aplica a los documentos subidos, mejor: es el ensayo
perfecto para el límite que viene en la slide siguiente.
-->

---

## Cuando la cita miente

Si el buscador trae el **fragmento equivocado**, la respuesta viene mal, y viene **con una cita
al lado**, que es peor.

Por eso la regla es mirar los fragmentos, no solo la respuesta. Una herramienta que no te los
muestra no te da verificabilidad: te da la **apariencia** de verificabilidad.

<!--
7 min · acumulado 1:12
Provocarlo en vivo: hacer una pregunta cuya respuesta NO está en los
documentos, o una ambigua que pesque un fragmento vecino. Mostrar cómo la
respuesta sale igual de prolija.
La regla operativa: la cita no es la verificación; abrir la cita es la
verificación. Es la regla del curso entero con traje nuevo.
-->

---

## El segundo límite, más aburrido

Si la respuesta **no está en los documentos**, no hay recuperación que la traiga.

La herramienta no sabe lo que tu empresa nunca escribió.

<!--
3 min · acumulado 1:15
El límite frecuente de verdad: la mitad de las preguntas interesantes no
tienen respuesta escrita en ningún lado. Detectar ESO ya vale la
herramienta: te dice qué falta documentar.
Cierre del bloque 4.
-->

---

<!-- _class: seccion -->

## Elección del caso real

Bloque 5 de 6 · **35 min**

<!--
Arranca 1:15, termina 1:50
-->

---

## El relevamiento vuelve

Desde la sesión 1 venimos juntando: la encuesta, las tareas repetitivas, los prompts del
taller, las preguntas de hoy.

De ahí sale una **lista corta de casos candidatos**. Hoy se elige uno, y se construye completo
para la sesión 8.

<!--
8 min · acumulado 1:23
Contar el criterio con el que se armó la shortlist: frecuencia del dolor,
datos disponibles y no sensibles, resultado verificable. Los tres tienen que
estar; un caso doloroso sin datos accesibles no se puede construir en tres
días.
Recordar el plan B honesto: si los datos internos no pueden compartirse, el
caso se arma con datos públicos análogos replicando el flujo. Está previsto
desde el diseño.
-->

---

<!-- _class: panel -->

## Los candidatos

Dos o tres casos, con su alcance y sus datos. Los presento uno por uno; anoten preguntas.

<!--
12 min · acumulado 1:35
Presentar la shortlist preparada antes de clase (está en las notas, no en el
deck: sale del relevamiento de ESTA cohorte). Por candidato: qué dolor
resuelve, de quién es, qué datos necesita, qué se vería en la sesión 8.
Nombrar a los dueños del dolor: "esto salió de la encuesta de Fulana y de la
tarea de Mengano". El caso elegido va a necesitar de ellos esta semana.
-->

---

## Alcance y datos, sin romanticismo

Por candidato: ¿el dato existe, está accesible y **puede salir de la red interna**? ¿Quién lo
consigue, y para cuándo?

<!--
7 min · acumulado 1:42
La discusión que evita elegir un caso imposible. Ser brutal con los plazos:
el caso se construye entre mañana y la sesión 8, o sea en dos o tres días.
Si un candidato depende de un dato que hay que pedir a otra gerencia, no
llega: decirlo ahora es un favor, no una descortesía.
-->

---

<!-- _class: panel -->

## El voto

Por el chat: tu candidato y **una línea de por qué**. Gana la mayoría; el porqué queda anotado
para la sesión 8.

<!--
8 min · acumulado 1:50
Voto por el chat, todos a la vez para que nadie vote mirando al resto (el
sesgo de anclaje de los pulsos, mismo principio). Contar en voz alta.
Si empata, desempata el criterio de datos: gana el caso con los datos más a
mano. Anunciar el ganador y el paso siguiente: mañana empiezo a construirlo,
y a los dueños del dolor les voy a escribir hoy mismo.
Cierre del bloque 5.
-->

---

<!-- _class: seccion -->

## Cierre y tarea

Bloque 6 de 6 · **10 min**

<!--
Arranca 1:50, termina 2:00
-->

---

<!-- _class: acentos -->

## Las cuatro, completas

- **Inventa lo que no sabe**: sesión 2, por diseño
- **Se olvida de lo que le dijiste**: sesión 2, por diseño
- **No hace lo que le pediste**: sesión 3, y el control estaba en la orden
- **Está seguro y equivocado**: hoy, y el arreglo es traerle el documento

<!--
3 min · acumulado 1:53
La hoja de ruta de la sesión 1, completa. Ya vieron las cuatro maneras de
fallar y un arreglo o una defensa para cada una.
Lo que falta no es teoría: la sesión 7 las junta en una tabla con el arreglo
de cada una y salen con un protocolo. Antes, mañana, una pregunta más
divertida: ¿y si en vez de responder, trabaja?
-->

---

## Tarea para la sesión 6

Pensá una tarea tuya que hoy te lleva **varios pasos con herramientas distintas**: buscar un
dato, pasarlo a una planilla, calcular algo, escribir un resumen.

Anotá los pasos **en orden**, como si se los explicaras a alguien que recién entra. Cinco
minutos.

<!--
3 min · acumulado 1:56
Mañana vemos qué parte de esa cadena puede hacer un agente hoy y cuál no, con
sus cadenas como material. La consigna del analista nuevo vuelve a servir: si
no podés escribir los pasos, un agente tampoco puede seguirlos.
-->

---

## La sesión 6: agentes

- El **loop**: pensar, usar una herramienta, leer el resultado, repetir
- Un agente real trabajando sobre **datos de producción**, de punta a punta
- Qué conviene **delegar hoy**, y qué todavía no

<!--
3 min · acumulado 1:59
Mañana el modelo deja de solo responder: trabaja en pasos, con herramientas.
Y falla distinto, que es lo interesante.
Los ejercicios y el quiz quedan en la página, como siempre.
-->

---

<!-- _class: portada -->

# Nos vemos mañana

El quiz y los dos ejercicios quedan en la página · **mpodeley.github.io/curso-energia-ypfb**

<!--
1 min · acumulado 2:00
Dejar proyectada mientras se despiden.
Después de clase: escribirles a los dueños del caso elegido para coordinar
los datos, y arrancar la construcción. El reloj del caso corre desde hoy.
-->
