---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 3**'
footer: 'mpodeley.github.io/curso-energia-ypfb'
---

<!-- _class: portada -->

# Uso efectivo: prompting y trabajo diario

Sesión 3 de 8 · 2 h en vivo · **YPFB Andina**

<!--
0:00 · portada mientras entra la gente
Ventanas de hoy: A este deck, C el sitio en la sesión 3, D el chatbot (Gemini
Flash para las demos; en el taller cada uno usa el suyo). Hoy no hay pulsos ni
encuesta: el panel no hace falta.
Tener a mano la lista de tareas que dejó la discusión de la sesión 1: si el
repaso viene flojo, sirve de arranque.
-->

---

## Hoy

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| Apertura y entrada al sitio | 5 min | El PIN de siempre y el mapa del día |
| Repaso de la tarea | 10 min | Las tres tareas repetitivas de cada uno; con ellas armamos la lista del taller |
| Elegir modelo | 12 min | Benchmarks, precios por token y la escalera grande/rápido de cada proveedor |
| El peor prompt | 12 min | Le pedimos una de esas tareas de una línea, sin contexto, y miramos qué devuelve |
| Anatomía de un prompt | 22 min | Las seis piezas, reescribiendo en vivo dos tareas de la lista |
| Taller: tu tarea, tu prompt | 36 min | Cada uno arma el suyo con el constructor, lo prueba y pega el resultado en el chat |
| Qué no se sube a un chatbot | 13 min | La regla, el porqué y las alternativas |
| Cierre y tarea | 10 min | La tercera manera de fallar tachada, y la tarea antes/después |

<!--
2 min · acumulado 0:02
La misma tabla está en la página de la sesión 3.
Bajada del día: dos días mirando qué es y cómo funciona; hoy es manejo puro.
El bloque de elegir modelo es nuevo y existe porque lo pidieron ayer.
-->

---

## Al final de esta sesión van a poder

- Escribir prompts con **rol, contexto, tarea, formato y ejemplos**
- Comparar modelos con criterio: **benchmarks, precio por token, velocidad**
- Saber **qué información de la empresa no debe subirse** a un chatbot

<!--
1 min · acumulado 0:03
Hoy no se levanta el capó: es la sesión más práctica del curso hasta acá.
Todo lo que se arma en el taller se va con ellos, funcionando.
-->

---

<!-- _class: panel -->

## Entrá al sitio, como ayer

`mpodeley.github.io/curso-energia-ypfb`

Hoy usamos la página de la sesión 3, y tu chatbot en otra pestaña: vas a trabajar con los dos.

<!--
2 min · acumulado 0:05
El PIN es el mismo; dictarlo solo si alguien cambió de computadora.
Avisar temprano: en el taller cada uno corre su propio prompt en su propio
chatbot. El que no tenga cuenta, que la cree ahora que estamos arrancando.
-->

---

<!-- _class: seccion -->

## Repaso de la tarea

Bloque 1 de 7 · **10 min**

<!--
Arranca 0:05, termina 0:15
-->

---

## ¿Qué tres tareas trajeron?

Una ronda completa. Las anotamos: son la materia prima del taller de hoy.

<!--
10 min · acumulado 0:15
Con cinco personas la ronda es completa y sin apuro: las tres tareas de cada
uno, por nombre. Anotarlas TODAS en un archivo a la vista (se puede compartir
la ventana de notas un momento): esa lista es el menú del taller y alimenta
la shortlist de la sesión 5.
Plan B si alguien no la hizo: dos minutos ahí mismo para anotar las tres,
con la consigna "lo que hacés más de una vez por semana y te aburre". Nadie
queda afuera del taller.
Marcar con un asterisco las dos tareas más repetidas entre personas: esas van
al bloque del peor prompt.
-->

---

<!-- _class: seccion -->

## Elegir modelo

Bloque 2 de 7 · **12 min**

<!--
Arranca 0:15, termina 0:27
Este bloque salió de una pregunta de ayer: cómo se comparan los modelos y
dónde mirar.
-->

---

<!-- _class: acentos -->

## ¿Qué modelo uso? Cuatro cosas para mirar

- **Capacidad en tu tarea**: los rankings generales no redactan tu minuta
- **Ventana de contexto**: cuánto le entra de una vez
- **Precio por token**: la entrada y la salida se cobran distinto
- **Velocidad**: el grande piensa mejor y tarda más

Todos los proveedores tienen la misma escalera: un modelo **grande** y uno **rápido**.

<!--
4 min · acumulado 0:19
La escalera, con nombres: GPT y su mini, Claude y Haiku, Gemini Pro y Flash.
Ya la usaron sin saberlo: el Flash de las demos es el rápido de Gemini.
El selector de modelo del chatbot ES esta decisión, y hasta hoy lo dejaron
en el que venía por defecto. Después de este bloque, que sea una elección.
-->

---

## Dónde mirar

- Un benchmark es un **examen estandarizado**: sirve para descartar, no para elegir fino
- **LMArena**: miles de personas votando a ciegas entre dos respuestas
- **Artificial Analysis**: capacidad, precio y velocidad de todos, en un solo cuadro
- Y el benchmark que importa de verdad: **tu tarea**, corrida en dos modelos

<!--
4 min · acumulado 0:23
Los dos sitios están en el material previo de la página, con enlace.
Los límites de los benchmarks, dichos sin cinismo: los modelos "estudian para
el examen" (las preguntas se filtran al entrenamiento), un punto más de
benchmark no se nota en una minuta, y el podio cambia todos los meses. Se
mira el cuadro general, no el ranking del día.
La última viñeta es la que quiero que se lleven, y el taller de hoy la deja
practicada: mismo prompt, dos modelos, comparar con tus propios ojos.
-->

---

## La economía de tokens

Se cobra **por token**, y la entrada y la salida tienen precio distinto. Entre el modelo grande
y el rápido puede haber **cien veces** de diferencia.

Hoy no lo pagan: cuentas gratuitas. Importa el día que algo se automatiza: mil corridas por mes
convierten el precio por token en presupuesto.

<!--
4 min · acumulado 0:27
Conectar con la sesión 2: ya saben qué es un token y por qué el español rinde
menos por token; ahora saben que eso también es plata.
El patrón que se usa en serio: el modelo grande para lo difícil o lo que se
hace una vez; el rápido para lo repetitivo, después de probar que alcanza.
Adelanto de la sesión 5: pegar el manual entero en cada pregunta también es
plata; traer solo el fragmento que hace falta es la mitad de la gracia de lo
que veremos pasado mañana.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## El peor prompt

Bloque 3 de 7 · **12 min**

<!--
Arranca 0:27, termina 0:39
-->

---

<!-- _class: panel -->

## Pidámosla de una línea

Elegimos una tarea de la lista y se la pedimos al chatbot **de la peor manera posible**: una
línea, sin contexto. Antes de ver la respuesta: ¿qué creen que devuelve?

<!--
8 min · acumulado 0:35
Cambiar a la ventana del chatbot (Gemini Flash, sin conexión, como en las
demos de la sesión 1). Tomar una tarea con asterisco de la lista y pedirla
literal en una línea: "haceme el informe mensual de producción", "escribí una
minuta de la reunión".
ANTES de mandar: una predicción por persona, por el chat. Con cinco entran
todas.
Mandar y leer la respuesta en voz alta. Suele ser: larga, genérica, con el
contexto inventado (unidades, campos, fechas que nadie le dio) y con tono de
mucha seguridad.
No corregirlo todavía: dejar el resultado a la vista para compararlo en el
bloque de anatomía.
-->

---

## Hizo exactamente lo que le pediste

El problema no es que el modelo desobedezca: es que **obedeció una orden vacía**. Sin contexto,
lo rellena con lo más plausible, que ya sabemos lo que significa.

La salida genérica no es un límite de la herramienta. Es el espejo del pedido.

<!--
4 min · acumulado 0:39
La frase del bloque: la salida genérica es el espejo del pedido.
Conectar con la sesión 2 sin nombres técnicos: lo que rellenó es la
continuación más plausible, el mismo mecanismo de las alucinaciones.
Puente: si el problema es la orden, la solución es aprender a escribir
órdenes. Eso es todo el prompting.
-->

---

<!-- _class: seccion -->

## Anatomía de un prompt

Bloque 4 de 7 · **22 min**

<!--
Arranca 0:39, termina 1:01
-->

---

<!-- _class: acentos -->

## Una orden de trabajo bien escrita

- **Rol**: quién quiere que sea. "Sos un ingeniero de producción senior que escribe para gerencia"
- **Contexto**: lo que necesita saber. "Este resumen va al comité que decide el workover"
- **Tarea**: el verbo concreto. Resumir, comparar, redactar, extraer, traducir, criticar
- **Formato**: cómo querés la salida. "Tabla de dos columnas", "máximo 200 palabras"
- **Ejemplos**: si tenés un "así me gusta", mostralo. Un ejemplo vale más que tres párrafos

La sexta pieza es la conversación misma: **iterar**.

<!--
5 min · acumulado 0:44
La metáfora que ordena todo: es la orden de trabajo que le darías a un
analista nuevo en su primer día. Nadie le dice "haceme el informe" a alguien
que llegó ayer; le dice quién lo lee, qué importa, cómo lo quiere.
Recorrer las piezas con la tarea del bloque anterior en mente: ¿cuáles le
faltaron a nuestra orden de una línea? (Todas.)
-->

---

## Un ejemplo completo

```text
Sos un ingeniero de reservorios que escribe para un directorio no técnico.
Contexto: adjunto las conclusiones técnicas del estudio de simulación del campo.
Tarea: redactá un resumen ejecutivo.
Formato: máximo una página, tres secciones (situación, opciones, recomendación),
sin jerga; cada término técnico inevitable, explicado entre paréntesis.
```

<!--
3 min · acumulado 0:47
Leerlo pieza por pieza señalando cada una: rol, contexto, tarea, formato.
No tiene ejemplo adjunto y funciona igual: no todas las piezas hacen falta
siempre. Las dos que casi nunca pueden faltar: contexto y formato.
-->

---

<!-- _class: panel -->

## Reescribamos dos de las suyas

Las mismas tareas del peor prompt, ahora con las piezas completas. Miren la diferencia contra
lo que devolvió la orden de una línea.

<!--
11 min · acumulado 0:58
Cambiar al chatbot. Tomar la tarea del bloque anterior y reescribirla en vivo
preguntándole a su dueño: ¿quién lo lee? ¿qué decide con esto? ¿cómo lo
querés? Las respuestas SON el prompt; escribirlo delante de todos.
Mandar y comparar contra la salida genérica que quedó de antes.
Repetir con una segunda tarea de otra persona si el tiempo da.
El punto no es la magia del resultado: es que las preguntas que hice son las
piezas de la slide anterior, en orden.
-->

---

<!-- _class: cita -->

## La primera salida es un **borrador**. La conversación es el método.

<!--
3 min · acumulado 1:01
Iterar no es señal de fracaso: "más corto", "menos jerga", "ahora en tono
formal" son parte del uso normal, no parches.
Cierre del bloque: ya vieron las piezas y la reescritura en vivo. Ahora les
toca a ellos, con una tarea propia.
-->

---

<!-- _class: seccion -->

## Taller: tu tarea, tu prompt

Bloque 5 de 7 · **36 min**

<!--
Arranca 1:01, termina 1:37
-->

---

<!-- _class: panel -->

## Armá el tuyo

Elegí **una** de tus tres tareas. Armá el prompt en el constructor de la página, pieza por
pieza, o escribilo directo si ya lo ves. Cuando esté, apretá "Copiar prompt".

<!--
13 min · acumulado 1:14
Ventana C: página de la sesión 3, ejercicio "Constructor de prompts". Tiene
tres casos de ejemplo (resumen ejecutivo, minuta, triaje de paper) y acepta
pegar uno propio para ver qué le falta.
Recordar la regla antes de que empiecen: la tarea es real pero los datos no.
Nada confidencial: estructura real, contenido público o inventado.
Circular por el chat mientras arman: quien se trabe, que pegue lo que tiene y
lo miramos. El constructor puntúa piezas presentes, no calidad: decirlo para
que nadie persiga el puntaje.
-->

---

<!-- _class: panel -->

## Probalo y pegá el resultado en el chat

Corré tu prompt en tu chatbot. Pegá en el chat de la videollamada **el prompt y la primera
respuesta**, sin editar. Si te sobra tiempo: corré el mismo prompt en el **otro modelo** de tu
chatbot y compará.

<!--
18 min · acumulado 1:32
El mismo mecanismo del hacelo-alucinar de ayer: todos trabajan a la vez, el
chat junta los resultados, nadie comparte pantalla.
Ocho minutos de trabajo en silencio; avisar cuando queden tres.
Con cinco personas se leen TODOS los resultados en voz alta, y se critican
CON las piezas: ¿tiene rol? ¿el contexto dice quién lo lee? ¿pidió formato?
La crítica con nombre de pieza es amable y transferible; "está flojo" no
enseña nada.
La consigna extra del cambio de modelo cierra el bloque de benchmarks: quien
la haya probado, que cuente qué cambió entre el grande y el rápido.
-->

---

## Qué suele faltar

En nueve de cada diez prompts flojos falta lo mismo: para quién es la salida, qué formato tiene
que tener, y un ejemplo de cómo te gusta.

El rol y la tarea casi siempre están. Lo que no está es lo que un analista nuevo preguntaría.

<!--
5 min · acumulado 1:37
Síntesis del taller con lo que apareció de verdad en el chat: nombrar los
agujeros que se repitieron, sin nombres propios.
La frase para llevarse: lo que le falta a tu prompt es lo que un analista
nuevo te preguntaría antes de empezar.
Cierre del bloque 5.
-->

---

<!-- _class: seccion -->

## Qué no se sube a un chatbot

Bloque 6 de 7 · **13 min**

<!--
Arranca 1:37, termina 1:50
-->

---

## La regla práctica

Si no lo pondrías en un **correo a un desconocido**, no va en el chat.

No van: producción real por pozo, reservas, precios y cláusulas de contratos, datos de partners,
información de personas.

<!--
7 min · acumulado 1:44
La regla del día uno, ahora con criterio detrás. El porqué corto: lo que se
sube a una cuenta gratuita sale de tu control, y el contrato de datos de una
cuenta gratuita no promete nada.
Preguntar por casos grises de SUS tareas del taller: ¿el borrador del informe
mensual entra? Depende de qué números lleve. Ese "depende" es la sesión 7.
No profundizar en política corporativa hoy: en la sesión 7 se llevan un
borrador de política de uso entero.
-->

---

## Las alternativas

- **Datos públicos**: boletines, datos abiertos, lo que ya está afuera
- **Datos viejos** que dejaron de ser sensibles
- **Estructura real, contenido inventado**: la planilla con las mismas columnas y números de fantasía

Y las versiones corporativas existen, con otro contrato de datos. Eso es parte de la sesión 7.

<!--
6 min · acumulado 1:50
La tercera alternativa es la más útil para el trabajo diario: el modelo no
necesita tus números para ayudarte a armar el informe; necesita la estructura.
Adelanto de mañana: la sesión 4 trabaja entera con datos públicos de
producción, argentinos y bolivianos, justamente por esta regla.
Cierre del bloque 6.
-->

---

<!-- _class: seccion -->

## Cierre y tarea

Bloque 7 de 7 · **10 min**

<!--
Arranca 1:50, termina 2:00
-->

---

<!-- _class: acentos -->

## Tres de las cuatro

- **Inventa lo que no sabe**: vista ayer, por diseño
- **Se olvida de lo que le dijiste**: vista ayer, por diseño
- **No hace lo que le pediste**: vista hoy, y el control estaba en la orden de trabajo
- **Está seguro y equivocado**: sesión 5

<!--
2 min · acumulado 1:52
Volver a la hoja de ruta y tachar la tercera. La lección de hoy sobre esa
falla: la mayoría de las veces que "no hizo lo que pediste", hizo exactamente
lo que pediste. El control está en el prompt, y ahora saben escribirlo.
Queda una sola, y cae en la sesión 5.
-->

---

<!-- _class: cita -->

## La contracara: **"intentá en serio"**

En agosto de 2026, un modelo de Anthropic sin publicar movió una cota de la hipótesis de
Riemann que llevaba décadas casi quieta: del 41.6% al 67.2% de los ceros en la línea crítica.
El prompt no tenía rol, ni contexto, ni formato.

<!--
3 min · acumulado 1:55
La historia, verificable (el anuncio de Anthropic está en el material previo
de la página): un empleado sin formación matemática le pidió a un modelo
interno que "le diera una probada en serio" a la hipótesis. Un día y medio,
650 ideas probadas, 60 subagentes, 31 millones de tokens, y el resultado
formalizado en Lean y revisado por dos matemáticos. No probó la hipótesis:
movió una cota parcial.
El contrapunto, sin desdecir la clase: el prompt fino es para controlar la
salida en el trabajo de todos los días. En las tareas donde un modelo de
frontera tiene talento nativo, el prompt puede ser mínimo. Lo que no fue
mínimo ahí es lo otro que enseña este curso: la verificación, que en ese caso
fue un asistente de pruebas formal y dos matemáticos.
-->

---

## Tarea para la sesión 4

Elegí una de tus tareas y resolvela completa con el chatbot, iterando hasta que te sirva.
Traé el **antes** (tu primer prompt) y el **después** (el que funcionó). Diez minutos.

Si tenés una planilla **no confidencial** a mano, tenela lista para mañana. Si no, mañana
trabajamos igual con datos públicos.

Y lo de hoy, en una frase: escribile como a un analista nuevo en su primer día.

<!--
2 min · acumulado 1:57
El antes/después es el material del repaso de mañana: insistir en traer los
dos, porque la distancia entre ellos es la clase de hoy funcionando.
La planilla es opcional de verdad: el plan de mañana no depende de ella.
-->

---

## De la ingeniería de prompts a la **ingeniería de contexto**

El prompt que ve el modelo ya no es solo el que escribís: es tu pedido más todo lo que viaja
con él.

Las próximas sesiones son exactamente eso: mañana, tus datos adjuntos (sesión 4); después, los
fragmentos recuperados de tus documentos (sesión 5); después, herramientas que trabajan
(sesión 6).

<!--
2 min · acumulado 1:59
El término real del rubro: la ingeniería de prompts está dando lugar a la
ingeniería de contexto. Lo de hoy no caduca: las piezas siguen siendo la
orden de trabajo; lo que crece es todo lo que viaja alrededor.
Ya lo vieron sin nombre: la ventana de contexto de la sesión 2 es el lugar
donde todo eso entra, y de donde se cae.
Dejar la palabra sembrada y no profundizar: las sesiones 4, 5 y 6 la llenan
de contenido concreto. Mañana arranca con el primer escalón: el modelo
escribe código sobre una planilla que le adjuntás.
El quiz y el constructor quedan en la página, como siempre.
-->

---

<!-- _class: portada -->

# Nos vemos mañana

El quiz y el constructor quedan en la página · **mpodeley.github.io/curso-energia-ypfb**

<!--
1 min · acumulado 2:00
Dejar proyectada mientras se despiden.
Después de clase: pasar en limpio la lista de tareas del repaso y el chat del
taller; los dos alimentan la shortlist de la sesión 5.
-->
