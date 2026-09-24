---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 2**'
footer: 'mpodeley.github.io/curso-ia-energia'
---

<!-- _class: portada -->

# Cómo funciona un LLM

Sesión 2 de 8 · día 1 · 2 h en vivo · **PCR · CGC · Tecpetrol · Andes Petroleum**

<!--
0:00 · portada mientras vuelven de la pausa
Este deck se abrió en la ventana A durante la pausa; las otras tres ventanas
siguen como estaban: el panel (B), el sitio del curso (C) y el chatbot (D).
Martín: confirmar en el chat que volvieron los seis; a las 12:01 arrancamos
con los que estén.
-->

---

<!-- _class: seccion -->

## Tokens y predicción

Bloque 1 de 4 · **38 min**

<!--
0 min · acumulado 0:00
Arranca 0:00, termina 0:38. Incluye los dos minutos de agenda y objetivos.
Bajada de la sesión: en la sesión 1 vimos QUÉ hace; ahora levantamos el capó
un rato, lo justo. Cada pieza termina en algo que van a hacer distinto mañana
en el trabajo.
-->

---

<!-- _class: agenda -->

## Esta sesión

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| Tokens y predicción | 38 min | Los dos primeros laboratorios de la página, y un modelo real abierto en el navegador |
| Contexto y entrenamiento | 25 min | La ventana de contexto en vivo con el tercer laboratorio, y cómo se entrena en dos etapas |
| Pausa | 10 min | Dejá el chatbot abierto: lo usás al volver |
| Alucinaciones en vivo | 35 min | Lo hacemos alucinar: primero el instructor, después cada uno con una pregunta de su especialidad |
| Cierre: las cuatro maneras de fallar, takeaways, tarea | 12 min | La hoja de ruta del curso, tres prácticas para mañana y la tarea de cinco minutos |

<!--
1 min · acumulado 0:01
La misma tabla está en la página de la sesión 2. Pedir que pasen a esa
página: los tres laboratorios de esta sesión están ahí, y el PIN ya quedó
guardado en el navegador.
Martín: el cronómetro vuelve a cero; el mismo aviso por el chat privado si un
bloque se pasa cinco minutos.
-->

---

## Al final de esta sesión van a poder

- Entender qué es un **token**, cómo el modelo predice el siguiente y qué controla la temperatura
- Ver qué entra en la **ventana de contexto**, qué se cae, y cómo se entrena el modelo
- Derivar de esa mecánica **por qué alucina**

<!--
1 min · acumulado 0:02
El primero y el último son una cadena, no una lista de curiosidades: si
entienden el token entienden la predicción, y si entienden la predicción la
alucinación deja de ser un misterio y pasa a ser una consecuencia.
-->

---

## El modelo no lee palabras: lee **tokens**

Antes de procesar nada, parte el texto en pedazos. Pueden ser palabras enteras, sílabas o
letras sueltas.

Lo frecuente en internet entra como un solo token. Lo técnico, y casi todo el español, se parte
en varios.

<!--
3 min · acumulado 0:05
No decir todavía cuántos tokens tiene nada. La gracia del bloque es que lo
adivinen primero y lo vean después.
Si preguntan quién decide el corte: nadie lo escribió a mano, se calculó
buscando los pedazos más frecuentes en un montón de texto.
-->

---

<!-- _class: panel -->

## Antes de mirar: adiviná

¿En cuántos tokens parte el modelo la frase **perforación direccional**?

<!--
3 min · acumulado 0:08
Martín: abrir el pulso "s2-cuantos-tokens".
NO adelantar la respuesta: el laboratorio la muestra en la slide siguiente y el
golpe está en la distancia entre lo que votaron y lo que ven.
Este pulso es la excepción: las barras se pueden dejar a la vista mientras
votan. Martín lo cierra recién después de que hayan visto el conteo real.
-->

---

<!-- _class: panel -->

## Ahora abrilo: laboratorio de tokens

Está en la página de la sesión 2. Empezá por **perforación direccional**.

<!--
7 min · acumulado 0:15
Ventana C, sesión 2, ejercicio "El texto que ve el modelo: tokens".
Empezar por el ejemplo "Dos palabras que usás todos los días": son seis fichas
para dos palabras. Contarlas en voz alta, despacio.
Martín: cerrar el pulso y decir cuánta gente había votado 2 o 4.
Después recorrer los otros ejemplos, sobre todo el par español/inglés y el
número largo. Que jueguen dos o tres minutos solos antes de seguir: que peguen
un nombre de pozo o una unidad de su rutina y cuenten las fichas.
-->

---

<!-- _class: acentos -->

## Tres consecuencias que ya vieron sin saberlo

- **Cuenta mal las letras** de una palabra, porque nunca ve letras: ve pedazos
- **El español rinde menos**: la misma frase cuesta más tokens que en inglés
- **El uso por programa se cobra por token**, así que trabajar en español sale más caro

<!--
3 min · acumulado 0:18
El dato para decir en voz alta: "perforación direccional" son seis tokens y
"directional drilling" son tres. La mitad, para la misma idea.
Aclarar que no es una decisión contra el español: es que había mucho más inglés
cuando se armó el tokenizador.
Si alguien pregunta por el costo: hoy con cuentas gratuitas no lo pagan, pero
importa apenas alguien piense en automatizar algo, y eso aparece en la sesión 6.
-->

---

## Una sola operación, repetida

Un **modelo grande de lenguaje** (LLM) hace una sola cosa.

Dado el texto hasta acá, le pone una probabilidad a cada token que podría seguir, elige uno,
y vuelve a empezar. **No hay una base de datos de respuestas**: hay una máquina de continuar texto.

<!--
3 min · acumulado 0:21
La frase que tiene que quedar: máquina de continuar texto.
Si alguien se resiste ("pero razona"), no discutir ahora: anotarlo y decir que
es la segunda pregunta de "Para discutir" en la página, para la conversación
del cierre si sobra.
La analogía del autocompletado del teléfono sirve, pero avisar que se queda
corta: la diferencia es cuánto texto anterior mira.
-->

---

<!-- _class: panel -->

## Elegí vos el próximo token

El segundo laboratorio de la página. Movele a la temperatura y mirá qué cambia.

<!--
7 min · acumulado 0:28
Ventana C, ejercicio "Adiviná el próximo token".
Recorrer primero con temperatura baja: gana siempre el más probable, la salida
es estable y aburrida. Después subirla y mostrar que aparecen candidatos raros.
El ejemplo "Vaca ___": 90% para "Muerta". Esa seguridad viene de la frecuencia
en el texto de entrenamiento, no de haber verificado nada; volvemos a eso en
el bloque de alucinaciones.
Dejarlos jugar. La pregunta para tirar mientras juegan: ¿en qué caso querrían
la versión aburrida?
Volver al deck.
-->

---

<!-- _class: panel -->

## El mismo mecanismo, con un modelo real adentro

`poloclub.github.io/transformer-explainer`

GPT-2 corriendo en el navegador: tokens, atención y la probabilidad de cada candidato, en vivo.

<!--
5 min · acumulado 0:33
Abrir el Transformer Explainer en una pestaña de la ventana C, cargado de
antemano: la primera carga baja el modelo y tarda. Cinco minutos guiados, sin
tocar nada que no esté en esta lista:
1) Escribir una frase corta en inglés ("The well produced") y apretar
   Generate. Señalar abajo la lista de candidatos con su probabilidad: es la
   misma lista del laboratorio, pero calculada por un modelo de verdad.
2) Subir y bajar la temperatura con el control de arriba y mostrar cómo se
   achata o se afila la lista. Es la misma perilla.
3) Señalar, sin explicar, la columna de atención: cada token mirando a los
   anteriores. Es el "mira todo el contexto a la vez" del transformer que
   nombramos en la sesión 1. Con verlo alcanza; no entrar en las cabezas ni en
   las matrices.
Puente a lo que sigue: todo lo que el modelo mira para armar esa lista es la
ventana de contexto, y es el próximo bloque.
El enlace está en la página de la sesión 2, en el material de arriba y en el
párrafo "para curiosos" debajo del laboratorio: solo, vale media hora.
-->

---

## La temperatura elige entre candidatos, no inventa candidatos

Temperatura baja: gana casi siempre el más probable. Salida estable y repetitiva.

Temperatura alta: los poco probables tienen su oportunidad. Salida variada, a veces brillante
y a veces disparatada.

<!--
2 min · acumulado 0:35
Precisión que vale la pena: la temperatura no hace al modelo más creativo ni más
tonto. Solo cambia cuánto se aparta del candidato más probable.
En los chatbots gratuitos no hay perilla de temperatura a la vista. Se controla
indirectamente, pidiendo en el prompt salidas más literales o más exploratorias.
-->

---

<!-- _class: panel -->

## ¿En cuál de tus tareas querrías la versión aburrida?

<!--
3 min · acumulado 0:38
Martín: abrir el pulso "s2-temperatura" y cerrarlo apenas voten los seis.
Comentar el resultado en treinta segundos: casi todo el trabajo técnico quiere
temperatura baja, y eso es una pista de para qué sirve esta herramienta acá.
Cierre del bloque 1.
-->

---

<!-- _class: seccion -->

## Contexto y entrenamiento

Bloque 2 de 4 · **25 min**

<!--
0 min · acumulado 0:38
Arranca 0:38, termina 1:03.
-->

---

## La ventana de contexto es la memoria de trabajo

Todo lo que el modelo puede mirar para elegir el próximo token: tu pregunta, sus respuestas
anteriores, los documentos que pegaste.

Tiene un tamaño máximo, medido en tokens. Lo que queda afuera, **no existe** para el modelo.

<!--
3 min · acumulado 0:41
El tamaño cambia todo el tiempo y por modelo, así que no dar una cifra exacta:
hoy es del orden de cientos de miles de tokens en los modelos grandes.
Lo que no cambia es el mecanismo, y es lo único que tienen que llevarse.
Metáfora útil: es un escritorio, no un archivo. Lo que está sobre el escritorio
lo mira; lo que se cayó al piso no lo busca.
No explicar la consecuencia todavía: la van a ver ellos en el ejercicio.
-->

---

<!-- _class: panel -->

## Achicá la ventana

`mpodeley.github.io/curso-ia-energia` · sesión 2

Bajá el tamaño de la ventana y mirá cuál es el mensaje que se cae primero.

<!--
8 min · acumulado 0:49
Ventana C, sesión 2, ejercicio "Qué se cae del escritorio".
Antes de proyectar: "Reiniciar ejercicio", por si quedó movido del ensayo.
Abre en 520 tokens, con la instrucción inicial ya caída y todos los datos
adentro. Ese es el caso limpio: los datos siguen ahí, la regla no.
Pedirles que primero lo lleven al máximo para leer la conversación entera, y
que después bajen de a poco. La pregunta es qué se pierde primero.
Sale solo: las reglas, porque las reglas se dan al principio.
Después bajar hasta 200 y mostrar que también se caen los datos.
Martín: ronda de tres nombres: "¿a quién le pasó que el chatbot dejó de
respetar algo que le pidió al principio?". Es exactamente esto, y no fue un
olvido.
-->

---

## De ahí salen dos frustraciones conocidas

En una conversación larga, el principio se cae del escritorio. El modelo no avisa: sigue
contestando con lo que le queda.

Y en un documento grande, lo que se cayó tampoco se busca solo. Hay que volver a pegarlo.

<!--
2 min · acumulado 0:51
Es la lectura de lo que acaban de ver, no material nuevo. Ir rápido.
La solución de verdad al segundo caso es la sesión 5: en vez de
pegar todo, buscar el pedazo que hace falta y pegar solo eso.
-->

---

<!-- _class: acentos -->

## Qué hacer con esto un martes a la mañana

- **Conversación nueva por tarea**: lo viejo no ayuda, ocupa lugar
- **Repetí la regla** cada tanto en una conversación larga: no es énfasis, es volver a ponerla en la ventana
- **Pegá el material**, no confíes en que lo recuerda

<!--
3 min · acumulado 0:54
Tres prácticas que salen directo del ejercicio; son las primeras del día que
se aplican mañana en el trabajo, sin entender nada más.
La segunda es la que más sorprende: subrayar o poner en mayúsculas una regla
que ya se cayó no le agrega nada. Repetirla funciona porque la vuelve a meter.
-->

---

## Cómo se entrena: dos etapas de tamaños muy distintos

Primero **lee** una fracción enorme de todo el texto humano, practicando una sola cosa:
predecir lo que sigue. De ahí salen la gramática, los hechos y los patrones.

Después, una etapa **mucho más chica**: personas le enseñan a comportarse como asistente.
El tono servicial y seguro sale de acá, y no tiene relación con si lo que dice es cierto.

<!--
6 min · acumulado 1:00
Lo único que hay que llevarse para manejar: el objetivo del entrenamiento es
continuar texto, y el tono seguro viene del ajuste posterior, no de saber.
Aprendió lo que había escrito, con sus errores y sesgos: lo escrito no es lo
verdadero.
Un modelo que solo pasó por la primera etapa no responde preguntas, las
continúa. La capacidad ya estaba; la segunda etapa le puso la interfaz.
Pregunta que suele aparecer: ¿aprende de lo que le escribo? No: lo que le
escribís entra como contexto de esa conversación, no cambia el modelo. Lo que
sí puede pasar con cuentas gratuitas es que la empresa use la conversación
para entrenar la versión siguiente, y eso es mañana, en la sesión 3 ("qué no
se sube").
Volvemos al tono seguro en el bloque de alucinaciones.
-->

---

<!-- _class: cita -->

## Nadie escribió esas reglas: **se ajustaron solas** mirando ejemplos

<!--
3 min · acumulado 1:03
La frase del bloque. Es también la razón por la que nadie puede abrir el modelo
y leer por qué contestó lo que contestó.
Si alguien quiere mirar adentro: la página tiene una sección entera para
curiosos, con el video de LeCun de 1989 y los enlaces de interpretabilidad.
Cierre del bloque 2.
-->

---

## Pausa · 10 min

Volvemos a la 1:13 del cronómetro. Dejá el chatbot abierto: lo usás al volver.

<!--
10 min · acumulado 1:13
Cortar el audio, no la pantalla.
Martín: pasar por el chat la consigna del bloque siguiente, para que la lean
en la pausa: "pensá una pregunta de tu especialidad cuya respuesta sepas de
memoria y sea pública: una norma, una cifra del regulador, un nombre. Nada de
la empresa". Avisar un minuto antes de volver.
-->

---

<!-- _class: seccion -->

## Alucinaciones en vivo

Bloque 3 de 4 · **35 min**

<!--
0 min · acumulado 1:13
Arranca 1:13, termina 1:48.
-->

---

## Si solo continúa texto plausible, cuando no sabe **no se calla**

No tiene un mecanismo para detectarse. Genera la continuación más plausible igual.

Un número de norma que parece real, un paper que suena citable, una cifra de producción con
tres decimales.

<!--
3 min · acumulado 1:16
Acá se cierra la cadena que abrimos a las 0:02: token, predicción, alucinación.
Y se explica lo que vieron fallar en la sesión 1: la cifra del campo Sacha y los
papers inventados salieron de esto.
Decirlo explícito: esto no es un bug que alguien vaya a arreglar el año que
viene. Es el comportamiento por defecto del mecanismo que acaban de ver.
Lo que sí mejora es la frecuencia. Lo que no cambia es que hay que verificar.
-->

---

<!-- _class: panel -->

## Una palabra: ¿qué te preocupa de que alucine?

<!--
2 min · acumulado 1:18
Martín: abrir el pulso "s2-palabra-alucinacion" y dejarlo abierto.
Dejar la nube a la vista mientras la completan; sirve de telón para lo que sigue.
No cerrar el pulso todavía: se cierra al volver de la demo, y ahí se comenta.
-->

---

<!-- _class: panel -->

## Hagámoslo alucinar

Miren dos cosas: qué **seguro** suena, y cuánto tardamos en **verificarlo**.

<!--
11 min · acumulado 1:29
Ventana D (chatbot), otra vez sin búsqueda. Preguntas en orden, de más sutil a
más evidente; ninguna sobre un campo de las empresas de la sala:

1) "¿Cuál fue la producción de petróleo de Argentina en junio de 2026 según el
   Capítulo IV de la Secretaría de Energía?"
   (va a dar una cifra con total seguridad; se verifica en datos.energia.gob.ar)

2) "Citame tres papers de la SPE sobre perforación direccional en la cuenca
   Oriente, con su número de SPE."
   (los números suelen ser inventados y se verifican en el momento)

3) "¿Qué artículo del Reglamento de Operaciones Hidrocarburíferas de Ecuador
   fija el plazo para reportar el cierre de un pozo?"
   (el reglamento es real; el artículo que dé va a tener la forma exacta de
   una cita y no va a resistir abrir el PDF. Es la mezcla de las dos causas, la
   peor: el marco real hace creíble al dato inventado)

Verificar UNA en vivo, buscándola delante de ellos. Que vean el chequeo, no la
afirmación de que hay que chequear.
Preguntar quién le habría creído a la primera respuesta si la veía sola.
Seguir a la slide siguiente sin volver al deck de fondo: ahora les toca a ellos.
-->

---

<!-- _class: panel -->

## Ahora vos: hacelo alucinar

Preguntale algo de **tu especialidad** que puedas verificar de memoria y sea público: una norma,
una cifra del regulador, un nombre. Nada de tu empresa. Pegá la respuesta en el chat.

<!--
12 min · acumulado 1:41
La consigna exacta ya la mandó Martín en la pausa: una pregunta de su área
cuya respuesta conocen de memoria y es pública. Nada de la empresa: hay cuatro
en la sala.
Cuatro minutos para probar; el resultado, pegado en el chat.
Martín: leer dos o tres en voz alta, con nombre, y pasarme el resto en una
línea. Clasificar con la sala: ¿le faltaba el dato, o el dato no existe y lo
completó igual?
Si a alguien "le salió bien", también es dato: preguntarle cómo lo verificaría
si NO supiera la respuesta de memoria. Esa pregunta es el puente a la cita
siguiente.
Con seis personas se escuchan todos; nadie comparte pantalla, el chat es
suficiente. Martín guarda el chat al final: esos ejemplos alimentan la cacería
de errores de la sesión 7.
-->

---

<!-- _class: cita -->

## La salida de un LLM es un **borrador plausible**, no una fuente

<!--
3 min · acumulado 1:44
La misma regla de la sesión 1, ahora con la explicación atrás. Vale la pena
decirlo así: en la sesión 1 era una advertencia, ahora es una conclusión.
Martín: cerrar el pulso de alucinación. Leo dos o tres palabras de la nube en
voz alta.
-->

---

## Esto no se arregla con más cómputo

La ventana de contexto crece, los modelos mejoran, la frecuencia baja. El mecanismo no cambia.

Lo que sí se puede cambiar es **de dónde saca el material**, y eso es la sesión 5.

<!--
4 min · acumulado 1:48
Dejar sembradas las dos salidas que trabajamos más adelante: darle las fuentes
buenas en vez de confiar en lo que recuerda (sesión 5), y armar un protocolo de
verificación propio (sesión 7).
No prometer que resuelven el problema. Lo acotan.
Cierre del bloque 3.
-->

---

<!-- _class: seccion -->

## Cierre

Bloque 4 de 4 · **12 min**

<!--
0 min · acumulado 1:48
Arranca 1:48, termina 2:00.
-->

---

<!-- _class: acentos -->

## Las cuatro maneras de fallar

- **Inventa lo que no sabe**: de cómo genera el texto, token por token · hoy
- **No hace lo que le pediste**: de cuánto control dan las instrucciones · mañana
- **Está seguro y equivocado**: de lo que aprendió y de lo que no · sesión 5
- **Se olvida de lo que le dijiste**: de cuánto puede mirar a la vez · hoy y sesión 5

<!--
4 min · acumulado 1:52
Hoy vieron el mecanismo de dos: la predicción y la ventana. Esta es la hoja de
ruta del curso, no materia; de la sesión 3 a la 6 no usamos estos nombres, y
en la sesión 7 los juntamos en una tabla con el arreglo de cada uno.
No hay que memorizar nada. Lo único que quiero que se lleven: cuando algo salga
mal, la primera pregunta útil no es "¿cómo lo reescribo?" sino "¿cuál de las
cuatro fue?".
Ninguna de las dos de hoy es un bug: salen del mecanismo que acabamos de
recorrer, y no las va a arreglar la próxima versión del modelo.
La misma lista está en la página de la sesión 2.
-->

---

<!-- _class: acentos -->

## Qué hacer con esto desde mañana

- **Tareas donde podés verificar rápido**: ahí rinde y el riesgo es bajo
- **Poné el material en la ventana**: pegá el texto en vez de confiar en su memoria
- **Desconfiá de todo número, cita o norma** que no hayas visto con tus ojos

<!--
2 min · acumulado 1:54
Los tres takeaways del día, en palabras llanas. Es el resumen operativo de las
cuatro horas y el puente a mañana, que es entero sobre cómo pedir bien.
Y la regla que abrió el día, en una frase: nada confidencial en cuentas
gratuitas.
-->

---

## Tarea para mañana

Traé **una tarea real de tu semana** que le pedirías a un chatbot.

Tres líneas: qué le pedirías, qué material tendrías que darle, y cómo sabrías si lo hizo bien.

Si ya tenés cuenta, probala (sin datos confidenciales) y anotá qué salió **mal**. Cinco minutos.

<!--
3 min · acumulado 1:57
Es la única cosa que se pide entre días, y son cinco minutos. Mañana, en la
sesión 3, esa tarea es la materia prima del taller "tu tarea, tu prompt": cada uno trabaja sobre
la suya.
Insistir en que anoten lo que salió MAL si la probaron. Es el material más
útil que van a traer, y con la hoja de ruta recién vista ya pueden arriesgar
cuál de las cuatro fue.
Plan B para mañana, si pocos la hicieron: tres minutos al arrancar el taller,
ahí mismo, con una tarea chica de la semana; el taller no depende de la tarea.
Martín: pegar la consigna en el chat, en tres líneas, y volver a mandarla por
el canal del curso mañana a las 8:00.
-->

---

## Mañana, sesiones 3 y 4: prompting y análisis asistido de datos

- Escribir prompts con **rol, contexto, tarea, formato y ejemplos**, sobre tu tarea
- Saber **qué información de la empresa no debe subirse** a un chatbot
- Del **reporte diario de la ARCH** a una tabla verificada, y una declinación sobre pozos reales

<!--
2 min · acumulado 1:59
La segunda es la que cierra la regla que abrió el día. Anticiparlo: mañana
dejamos de decir "no subas datos confidenciales" y empezamos a decir qué sí,
qué no y por qué.
Nada de material previo obligatorio; el que quiera jugar con los laboratorios
o ver los videos de la página, bienvenido, pero mañana arranca de cero igual.
-->

---

<!-- _class: portada -->

# Nos vemos mañana

El quiz, los recursos y los laboratorios quedan en la página · **mpodeley.github.io/curso-ia-energia**

<!--
1 min · acumulado 2:00
Dejar proyectada mientras se despiden y responder lo que quede suelto.
Después de la clase: Martín exporta el CSV del relevamiento y el chat de la
ronda de alucinaciones; leemos juntos el bloque D de la encuesta y elegimos
los ejemplos de mañana con eso.
-->
