---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 2**'
footer: 'mpodeley.github.io/curso-energia-ypfb'
---

<!-- _class: portada -->

# Cómo funciona un LLM

Sesión 2 de 8 · 2 h en vivo · **YPFB Andina**

<!--
0:00 · portada mientras entra la gente
Chequear pantalla y audio, igual que la semana pasada.
Tener abiertas tres ventanas: este deck, el sitio del curso y el chatbot.
El panel va en la cuarta, o en el segundo monitor si hay.
-->

---

## Hoy

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| Apertura y entrada al sitio | 8 min | Objetivos y el PIN, como la semana pasada |
| Repaso de la tarea | 15 min | Qué les salió bien y mal con el chatbot esta semana |
| Tokens y predicción | 33 min | Recorremos juntos los dos primeros ejercicios de la página |
| Contexto y entrenamiento | 20 min | La memoria de trabajo en vivo, y cómo se entrena en dos etapas |
| Alucinaciones en vivo | 30 min | Lo hacemos alucinar: primero el instructor, después cada uno |
| Cierre y tarea | 14 min | Dos de las cuatro maneras de fallar, y qué hacer con esto |

<!--
3 min · acumulado 0:03
La misma tabla está en la página de la sesión 2.
Bajada del día: la semana pasada vimos QUÉ hace; hoy levantamos el capó un
rato, lo justo. Cada pieza que veamos termina en algo que van a hacer distinto
el lunes.
-->

---

## Al final de esta sesión van a poder

- Entender qué es un **token** y por qué importa para todo lo demás
- Ver que el modelo **predice el próximo token**, y qué controla la temperatura
- Derivar de esa mecánica **por qué los modelos alucinan**

Hoy levantamos el capó un rato: mecánica, solo la que sirve para manejar mejor.

<!--
2 min · acumulado 0:05
El tercero es el que importa. No es una lista de curiosidades: es una cadena.
Si entienden el token entienden la predicción, y si entienden la predicción la
alucinación deja de ser un misterio y pasa a ser una consecuencia.
-->

---

<!-- _class: panel -->

## Entrá al sitio, como la semana pasada

`mpodeley.github.io/curso-energia-ypfb`

Hoy usamos la página de la sesión 2. El PIN es el mismo y el navegador ya se acuerda.

<!--
3 min · acumulado 0:08
Esperar a que entren. A quien cambió de computadora hay que dictarle el PIN de nuevo.
Los tres ejercicios de hoy están en esa página; los vamos a recorrer juntos.
-->

---

<!-- _class: seccion -->

## Repaso de la tarea

Bloque 1 de 5 · **15 min**

<!--
Arranca 0:08, termina 0:23
-->

---

## ¿Qué le pidieron al chatbot esta semana?

<!--
6 min · acumulado 0:14
Que cuenten. Empezar por quien haya traído algo concreto, no preguntar al aire.
Con ~10 personas: ronda directa, con nombre.
Anotar cada tarea que mencionen: alimenta la shortlist de la sesión 5 igual que
la encuesta.
Plan B si pocos la hicieron: tres minutos ahí mismo. Que abran el chatbot, le
pidan UNA tarea real chica, y el repaso se hace sobre eso. La clase no depende
de la tarea.
-->

---

## ¿Y qué salió **mal**?

<!--
7 min · acumulado 0:21
Este es el bloque, no el anterior. Los errores de esta semana son el material
con el que arranca la clase de hoy.
Buscar tres tipos, que son tres de las cuatro maneras de fallar anunciadas en el
cierre de la sesión 1: inventó un dato (predicción), se olvidó de algo dicho
antes (memoria de trabajo), o no hizo lo que le pidieron (control de la salida).
No usar esos nombres todavía con la clase: se ponen en la sesión 7. Acá alcanza
con separar los montones y decir de cuál nos ocupamos hoy.
Nombrar quién trajo cada uno y decir en qué momento de hoy lo vamos a explicar.
-->

---

## Nada de eso fue un error del programa

Las tres fallas más comunes tienen la misma raíz, y la vamos a ver funcionar hoy.

Las próximas dos horas son esa explicación.

<!--
2 min · acumulado 0:23
Puente al bloque 2. Decirlo suave: no es que la herramienta esté rota.
Funciona exactamente como fue construida, y hoy vemos cómo fue construida.
-->

---

<!-- _class: seccion -->

## Tokens y predicción

Bloque 2 de 5 · **33 min**

<!--
Arranca 0:23, termina 0:56
-->

---

## El modelo no lee palabras: lee **tokens**

Antes de procesar nada, parte el texto en pedazos. Pueden ser palabras enteras, sílabas o
letras sueltas.

Lo frecuente en internet entra como un solo token. Lo técnico, y casi todo el español, se parte
en varios.

<!--
3 min · acumulado 0:26
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
3 min · acumulado 0:29
Cambiar a la ventana del panel y abrir el pulso "s2-cuantos-tokens".
NO adelantar la respuesta: el laboratorio la muestra en la slide siguiente y el
golpe está en la distancia entre lo que votaron y lo que ven.
Dejar las barras a la vista mientras votan. Cerrar el pulso recién después de
que hayan visto el conteo real.
-->

---

<!-- _class: panel -->

## Ahora abrilo: laboratorio de tokens

Está en la página de la sesión 2. Empezá por **perforación direccional**.

<!--
8 min · acumulado 0:37
Cambiar a la ventana del sitio, sesión 2, ejercicio "Laboratorio de tokens".
Empezar por el ejemplo "Dos palabras que usás todos los días": son seis fichas
para dos palabras. Contarlas en voz alta, despacio.
Volver al panel, cerrar el pulso y mostrar cuánta gente había votado 2 o 4.
Después recorrer los otros ejemplos, sobre todo el par español/inglés y el
número largo. Que jueguen dos o tres minutos solos antes de seguir.
-->

---

<!-- _class: acentos -->

## Tres consecuencias que ya vieron sin saberlo

- **Cuenta mal las letras** de una palabra, porque nunca ve letras: ve pedazos
- **El español rinde menos**: la misma frase cuesta más tokens que en inglés
- **Las interfaces cobran por token**, así que trabajar en español sale más caro

<!--
3 min · acumulado 0:40
El dato para decir en voz alta: "perforación direccional" son seis tokens y
"directional drilling" son tres. La mitad, para la misma idea.
Aclarar que no es una decisión contra el español: es que había mucho más inglés
cuando se armó el tokenizador.
Si alguien pregunta por el costo: hoy con cuentas gratuitas no lo pagan, pero
importa apenas alguien piense en automatizar algo.
-->

---

## Una sola operación, repetida

Un **modelo grande de lenguaje** (LLM) hace una sola cosa.

Dado el texto hasta acá, le pone una probabilidad a cada token que podría seguir, elige uno,
y vuelve a empezar. **No hay una base de datos de respuestas**: hay una máquina de continuar texto.

<!--
4 min · acumulado 0:44
La frase que tiene que quedar: máquina de continuar texto.
Si alguien se resiste ("pero razona"), no discutir ahora: anotarlo y decir que
la tercera pregunta de la discusión es exactamente esa.
La analogía del autocompletado del teléfono sirve, pero avisar que se queda
corta: la diferencia es cuánto texto anterior mira.
-->

---

<!-- _class: panel -->

## Elegí vos el próximo token

El segundo ejercicio de la página. Movele a la temperatura y mirá qué cambia.

<!--
8 min · acumulado 0:52
Cambiar al sitio, ejercicio "Adiviná el próximo token".
Recorrer primero con temperatura baja: gana siempre el más probable, la salida
es estable y aburrida. Después subirla y mostrar que aparecen candidatos raros.
Dejarlos jugar. La pregunta para tirar mientras juegan: ¿en qué caso querrían
la versión aburrida?
Volver al deck.
-->

---

## La temperatura elige entre candidatos, no inventa candidatos

Temperatura baja: gana casi siempre el más probable. Salida estable y repetitiva.

Temperatura alta: los poco probables tienen su oportunidad. Salida variada, a veces brillante
y a veces disparatada.

<!--
2 min · acumulado 0:54
Precisión que vale la pena: la temperatura no hace al modelo más creativo ni más
tonto. Solo cambia cuánto se aparta del candidato más probable.
En los chatbots gratuitos no hay perilla de temperatura a la vista. Se controla
indirectamente, pidiendo en el prompt salidas más literales o más exploratorias.
-->

---

<!-- _class: panel -->

## ¿En cuál de tus tareas querrías la versión aburrida?

<!--
2 min · acumulado 0:56
Cambiar al panel y abrir el pulso "s2-temperatura".
Cerrarlo apenas voten y comentar el resultado en treinta segundos: casi todo el
trabajo técnico quiere temperatura baja, y eso es una pista de para qué sirve
esta herramienta acá.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## Contexto y entrenamiento

Bloque 3 de 5 · **20 min**

<!--
Arranca 0:56, termina 1:16
-->

---

## La ventana de contexto es la memoria de trabajo

Todo lo que el modelo puede mirar para elegir el próximo token: tu pregunta, sus respuestas
anteriores, los documentos que pegaste.

Tiene un tamaño máximo, medido en tokens. Lo que queda afuera, **no existe** para el modelo.

<!--
3 min · acumulado 0:59
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

`mpodeley.github.io/curso-energia-ypfb` · sesión 2

Bajá el tamaño de la ventana y mirá cuál es el mensaje que se cae primero.

<!--
7 min · acumulado 1:06
Ventana C (el sitio), sesión 2, ejercicio "Qué se cae del escritorio".
Antes de proyectar: "Reiniciar ejercicio", por si quedó movido del ensayo.
Abre en 520 tokens, con la instrucción inicial ya caída y todos los datos
adentro. Ese es el caso limpio: los datos siguen ahí, la regla no.
Pedirles que primero lo lleven al máximo para leer la conversación entera, y
que después bajen de a poco. La pregunta es qué se pierde primero.
Sale solo: las reglas, porque las reglas se dan al principio.
Después bajar hasta 200 y mostrar que también se caen los datos.
Si en el repaso de la tarea salió un "se olvidó de algo que le dije antes",
nombrarlo acá: es exactamente esto, y no fue un olvido.
-->

---

## De ahí salen dos frustraciones conocidas

En una conversación larga, el principio se cae del escritorio. El modelo no avisa: sigue
contestando con lo que le queda.

Y en un documento grande, lo que se cayó tampoco se busca solo. Hay que volver a pegarlo.

<!--
2 min · acumulado 1:08
Es la lectura de lo que acaban de ver, no material nuevo. Ir rápido.
La solución de verdad al segundo caso es la sesión 5: en vez de pegar todo,
buscar el pedazo que hace falta y pegar solo eso.
-->

---

## Cómo se entrena: dos etapas de tamaños muy distintos

Primero **lee** una fracción enorme de todo el texto humano, practicando una sola cosa:
predecir lo que sigue. De ahí salen la gramática, los hechos y los patrones.

Después, una etapa **mucho más chica**: personas le enseñan a comportarse como asistente.
El tono servicial y seguro sale de acá, y no tiene relación con si lo que dice es cierto.

<!--
5 min · acumulado 1:13
Lo único que hay que llevarse para manejar: el objetivo del entrenamiento es
continuar texto, y el tono seguro viene del ajuste posterior, no de saber.
Aprendió lo que había escrito, con sus errores y sesgos: lo escrito no es lo
verdadero.
Un modelo que solo pasó por la primera etapa no responde preguntas, las
continúa. La capacidad ya estaba; la segunda etapa le puso la interfaz.
Volvemos al tono seguro en el bloque 4.
-->

---

<!-- _class: cita -->

## Nadie escribió esas reglas: **se ajustaron solas** mirando ejemplos

<!--
3 min · acumulado 1:16
La frase del bloque. Es también la razón por la que nadie puede abrir el modelo
y leer por qué contestó lo que contestó.
Si alguien quiere mirar adentro: la página tiene una sección entera para
curiosos, con el video de LeCun de 1989 y los enlaces de interpretabilidad.
Cierre del bloque 3.
-->

---

<!-- _class: seccion -->

## Alucinaciones en vivo

Bloque 4 de 5 · **30 min**

<!--
Arranca 1:16, termina 1:46
-->

---

## Si solo continúa texto plausible, cuando no sabe **no se calla**

No tiene un mecanismo para detectarse. Genera la continuación más plausible igual.

Un número de norma que parece real, un paper que suena citable, una cifra de producción con
tres decimales.

<!--
3 min · acumulado 1:19
Acá se cierra la cadena que abrimos a las 0:05: token, predicción, alucinación.
Decirlo explícito: esto no es un bug que alguien vaya a arreglar el año que
viene. Es el comportamiento por defecto del mecanismo que acaban de ver.
Lo que sí mejora es la frecuencia. Lo que no cambia es que hay que verificar.
-->

---

<!-- _class: panel -->

## Una palabra: ¿qué te preocupa de que alucine?

<!--
2 min · acumulado 1:21
Cambiar al panel y abrir el pulso "s2-palabra-alucinacion".
Dejar la nube a la vista mientras la completan; sirve de telón para lo que sigue.
No cerrar el pulso todavía: se cierra al volver de la demo, y ahí se comenta.
-->

---

<!-- _class: panel -->

## Hagámoslo alucinar

Miren dos cosas: qué **seguro** suena, y cuánto tardamos en **verificarlo**.

<!--
10 min · acumulado 1:31
Cambiar al chatbot. Preguntas en orden, de más sutil a más evidente:

1) "¿Cuál fue la producción de gas del campo San Alberto en 2024 según el
   boletín estadístico de la ANH?"
   (va a dar una cifra con total seguridad)

2) "Citame tres papers del SPE sobre perforación direccional en el Subandino,
   con su número de SPE."
   (los números suelen ser inventados y se verifican en el momento)

3) "¿Qué dice la norma API 6A sobre la presión de prueba en árboles de
   surgencia?"
   (mezcla una norma real con contenido inventado)

Verificar UNA en vivo, buscándola delante de ellos. Que vean el chequeo, no la
afirmación de que hay que chequear.
Preguntar quién le habría creído a la primera respuesta si la veía sola.
Seguir a la slide siguiente sin volver al deck de fondo: ahora les toca a ellos.
-->

---

<!-- _class: panel -->

## Ahora vos: hacelo alucinar

Preguntale algo de **tu especialidad** que puedas verificar de memoria: una cifra, una norma,
un nombre. Pegá la respuesta en el chat de la videollamada.

<!--
9 min · acumulado 1:40
La consigna exacta: una pregunta de su área cuya respuesta conocen de memoria.
Tres o cuatro minutos para probar; el resultado, pegado en el chat.
Leer dos o tres en voz alta y clasificar con la sala: ¿le faltaba el dato, o el
dato no existe y lo completó igual?
Si a alguien "le salió bien", también es dato: preguntarle cómo lo verificaría
si NO supiera la respuesta de memoria. Esa pregunta es el puente a la cita
siguiente.
Con diez personas alcanza para escuchar a varios; nadie comparte pantalla, el
chat es suficiente. Guardar el chat al final: esos ejemplos alimentan la
sesión 7.
-->

---

<!-- _class: cita -->

## La salida de un LLM es un **borrador plausible**, no una fuente

<!--
3 min · acumulado 1:43
La misma regla de la sesión 1, ahora con la explicación atrás. Vale la pena
decirlo así: la semana pasada era una advertencia, hoy es una conclusión.
Cerrar el pulso de alucinación y leer dos o tres palabras de la nube en voz alta.
-->

---

## Esto no se arregla con más cómputo

La ventana de contexto crece, los modelos mejoran, la frecuencia baja. El mecanismo no cambia.

Lo que sí se puede cambiar es **de dónde saca el material**, y eso es la sesión 5.

<!--
3 min · acumulado 1:46
Dejar sembradas las dos salidas que trabajamos más adelante: darle las fuentes
buenas en vez de confiar en lo que recuerda (sesión 5), y armar un protocolo de
verificación propio (sesión 7).
No prometer que resuelven el problema. Lo acotan.
Cierre del bloque 4.
-->

---

<!-- _class: seccion -->

## Cierre y tarea

Bloque 5 de 5 · **14 min**

<!--
Arranca 1:46, termina 2:00
-->

---

<!-- _class: acentos -->

## Dos de las cuatro, y las dos por diseño

- **Inventa lo que no sabe**: de la predicción del próximo token, que vieron hoy
- **Se olvida de lo que le dijiste**: de la ventana de contexto, que también vieron hoy
- **Está seguro y equivocado**: sesión 5
- **No hace lo que le pediste**: sesión 3

<!--
3 min · acumulado 1:49
Volver a la hoja de ruta del cierre de la sesión 1 y tachar dos.
Lo que quiero que se lleven: ninguna de las dos es un bug. Salen del mecanismo
que acabamos de recorrer, y no las va a arreglar la próxima versión del modelo.
Las otras dos también tienen su mecanismo, y lo vemos cuando toque.
La tabla completa, con el arreglo de cada una, está en la sesión 7.
-->

---

<!-- _class: acentos -->

## Qué hacer con esto el lunes

- **Tareas donde podés verificar rápido**: ahí rinde y el riesgo es bajo
- **Poné el material en la ventana**: pegá el texto en vez de confiar en su memoria
- **Desconfiá de todo número, cita o norma** que no hayas visto con tus ojos

<!--
4 min · acumulado 1:53
Es el resumen operativo de las dos horas y el puente a la sesión 3, que es
entera sobre cómo pedir bien.
Si queda tiempo, pedir un ejemplo de cada uno con tareas de ellos.
-->

---

## Tarea para la sesión 3

Traé anotadas **tres tareas repetitivas de tu semana** que involucren texto, planillas o
documentos.

No hace falta que las resuelvas. Solo anotalas. En la sesión 3 las convertimos en prompts.

<!--
3 min · acumulado 1:56
Insistir en repetitivas: lo que hacen muchas veces igual es donde primero se
nota la diferencia.
Sirve tanto lo chico (una minuta semanal) como lo grande (un informe mensual).
-->

---

## La sesión 3: prompting y trabajo diario

- Escribir prompts con **rol, contexto, tarea, formato y ejemplos**
- Aplicarlo a informes, resúmenes, minutas y traducción técnica
- Saber **qué información de la empresa no debe subirse** a un chatbot

<!--
3 min · acumulado 1:59
La tercera es la que cierra la regla que abrió el curso. Anticiparlo: en la
sesión 3 dejamos de decir "no subas datos confidenciales" y empezamos a decir
qué sí, qué no y por qué.
En la página hay un ejercicio para armar prompts antes de la clase.
-->

---

<!-- _class: portada -->

# Nos vemos en la sesión 3

El quiz y los tres ejercicios quedan en la página · **mpodeley.github.io/curso-energia-ypfb**

<!--
1 min · acumulado 2:00
Dejar proyectada mientras se despiden.
Después de la clase: exportar el CSV del panel y revisar en qué preguntas del
quiz se traba la gente, que es lo que ajusta la sesión 3.
-->
