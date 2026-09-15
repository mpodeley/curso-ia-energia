---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Día 2**'
footer: 'mpodeley.github.io/curso-ia-energia'
---

<!-- _class: portada -->

# Prompting y análisis asistido de datos

Día 2 de 4 · 4 h en vivo · **PCR · CGC · Tecpetrol · Andes Petroleum**

<!--
0:00 · portada mientras entra la gente
Ventanas de hoy: A este deck, C el sitio en el día 2, D el chatbot del
instructor. A la mañana Gemini Flash para las demos de prompting (sin
conexión, como ayer); a la tarde Claude (Sonnet), que corre código y genera
el Excel y el artifact de la corrida grande. Los alumnos siguen con el
chatbot que tengan; el prompt trae el plan B para cuentas que no escriben
archivos. Sin pulsos ni encuesta hoy: el panel no hace falta.
Antes de clase, en el escritorio: un CSV de un año del Capítulo IV (cuenca
Noroeste, el link está en el material previo de la página), el CSV de 10
pozos de la página (descargas/produccion_noroeste_10pozos.csv), el reporte
diario de la ARCH del 15 de septiembre (descargas/arch-reporte-diario-
2026-09-15.pdf, abierto en un visor aparte), y scripts/_cache/
dca_referencia.xlsx como referencia del instructor (regenerar con: python
scripts/dca_referencia.py).
Si un bloque corre corto: la corrida de Volve está lista para demo
(descargas/volve_diario_2pozos.csv, prompt en la página bajo "para
curiosos", referencia en volve_referencia.xlsx/png). El remate en una
frase: la presión nunca cayó, el agua subió a 94%, y Arps igual ajusta con
R² 0.96.
Martín: cronómetro en cero, chat abierto, lista de asistencia por nombre y
empresa a la vista para llamar las rondas.
-->

---

<!-- _class: seccion -->

## Apertura y repaso de la tarea

Bloque 1 de 13 · **15 min**

<!--
0:00 · arranca acá, termina 0:15
La apertura es corta a propósito: dos minutos de agenda, uno de objetivos,
dos para entrar al sitio, y la ronda de la tarea se lleva los diez que
quedan.
-->

---

<!-- _class: agenda -->

## Hoy

| Bloque | min |
| --- | --- |
| Apertura y repaso de la tarea | 15 |
| Elegir modelo | 12 |
| El peor prompt | 12 |
| Anatomía de un prompt | 22 |
| Taller: tu tarea, tu prompt | 36 |
| Pausa | 10 |
| Qué no se sube a un chatbot | 13 |
| La planilla y el copiloto | 30 |
| De PDF a tabla: el reporte diario de la ARCH | 35 |
| Pausa | 10 |
| Declinación en vivo | 25 |
| Qué se puede afirmar | 10 |
| Cierre y tarea | 10 |

<!--
2 min · acumulado 0:02
La misma tabla está en la página del día 2.
Bajada del día: ayer, qué es y cómo funciona; hoy, manejo puro. A la mañana
el modelo escribe texto y aprendemos a pedírselo bien. A la tarde le damos
tablas y PDF, y para analizarlos escribe código: eso cambia dónde puede
fallar y dónde hay que mirar.
Dos pausas de diez, marcadas en la tabla. Martín avisa cada una.
-->

---

## Al final del día van a poder

- Escribir prompts con **rol, contexto, tarea, formato y ejemplos**, sobre una tarea propia
- Saber **qué información de la empresa no se sube** a un chatbot, ni al chat de esta sala
- Extraer una tabla del **reporte diario de la ARCH** y verificarla contra el original
- Ajustar una curva de declinación **sobre datos públicos de un pozo**

<!--
1 min · acumulado 0:03
Todo el día con datos públicos: el reporte diario de la Agencia de
Regulación y Control de Hidrocarburos de Ecuador y el Capítulo IV
argentino. Es la regla entre empresas de ayer, puesta en práctica: nadie
tiene que traer nada propio.
-->

---

<!-- _class: panel -->

## Entrá al sitio, como ayer

`mpodeley.github.io/curso-ia-energia`

Hoy usamos la página del día 2, y tu chatbot en otra pestaña: a la tarde le vamos a dar de
comer planillas y un PDF, así que conviene uno que acepte archivos.

<!--
2 min · acumulado 0:05
El PIN es el mismo; dictarlo solo si alguien cambió de computadora.
Avisar temprano: en el taller de la mañana cada uno corre su propio prompt
en su propio chatbot. El que no tenga cuenta, que la cree ahora.
Para la tarde conviene un chatbot que acepte archivos y corra código
(Gemini, ChatGPT o Claude). El que tenga solo el teléfono sigue las demos
igual; el laboratorio de declinación corre en cualquier navegador.
Martín: pegar la URL en el chat y confirmar por nombre que los seis
entraron.
-->

---

## ¿Qué tarea trajeron?

Una ronda completa: la tarea real de tu semana, la que le pedirías a un chatbot. Las anotamos:
son el menú del taller de hoy.

<!--
10 min · acumulado 0:15
Martín: llama la ronda por nombre, seis personas, una tarea cada una, sin
apuro. Anota TODAS en un archivo a la vista (compartir la ventana de notas
un momento): esa lista es el menú del taller y alimenta el cuaderno de
mañana.
Regla dicha una vez y en voz alta: la tarea es real, los datos no. Nadie
describe un pozo, un contrato ni un número propio; alcanza con "el informe
mensual de producción" o "la minuta del comité".
Plan B si alguien no la hizo: un minuto ahí mismo para anotar una, con la
consigna "lo que hacés más de una vez por semana y te aburre". Nadie queda
afuera del taller.
Marcar con un asterisco las dos tareas que se repiten entre empresas:
esas van al bloque del peor prompt. Con cuatro empresas distintas suelen
coincidir en el informe mensual y en la minuta.
-->

---

<!-- _class: seccion -->

## Elegir modelo

Bloque 2 de 13 · **12 min**

<!--
0:15 · arranca acá, termina 0:27
Este bloque existe porque en la primera edición lo pidieron el primer día:
cómo se comparan los modelos y dónde mirar. Si ayer salió la pregunta,
decirlo.
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
Ya la usaron sin saberlo: el Flash de las demos de ayer es el rápido de
Gemini.
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
Conectar con ayer: ya saben qué es un token y por qué el español rinde
menos por token; ahora saben que eso también es plata.
El patrón que se usa en serio: el modelo grande para lo difícil o lo que se
hace una vez; el rápido para lo repetitivo, después de probar que alcanza.
Adelanto de mañana: pegar el manual entero en cada pregunta también es
plata; traer solo el fragmento que hace falta es la mitad de la gracia de lo
que veremos mañana a la mañana.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## El peor prompt

Bloque 3 de 13 · **12 min**

<!--
0:27 · arranca acá, termina 0:39
-->

---

<!-- _class: panel -->

## Pidámosla de una línea

Elegimos una tarea de la lista y se la pedimos al chatbot **de la peor manera posible**: una
línea, sin contexto. Antes de ver la respuesta: ¿qué creen que devuelve?

<!--
8 min · acumulado 0:35
Cambiar a la ventana del chatbot (Gemini Flash, sin conexión, como en las
demos de ayer). Tomar una tarea con asterisco de la lista y pedirla
literal en una línea: "haceme el informe mensual de producción", "escribí una
minuta de la reunión".
ANTES de mandar: una predicción por persona, por el chat. Con seis entran
todas. Martín: las lee en voz alta a medida que llegan.
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
Conectar con ayer sin nombres técnicos: lo que rellenó es la continuación
más plausible, el mismo mecanismo de las alucinaciones.
Puente: si el problema es la orden, la solución es aprender a escribir
órdenes. Eso es todo el prompting.
-->

---

<!-- _class: seccion -->

## Anatomía de un prompt

Bloque 4 de 13 · **22 min**

<!--
0:39 · arranca acá, termina 1:01
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
Las preguntas piden estructura, nunca datos: "¿quién lo lee?" sí; "¿cuánto
produce?" jamás. Si el dueño empieza a dar un número, cortarlo con
amabilidad: la regla de la sala.
Mandar y comparar contra la salida genérica que quedó de antes.
Repetir con una segunda tarea de otra empresa si el tiempo da.
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
toca a ellos, con la tarea propia.
-->

---

<!-- _class: seccion -->

## Taller: tu tarea, tu prompt

Bloque 5 de 13 · **36 min**

<!--
1:01 · arranca acá, termina 1:37
-->

---

<!-- _class: panel -->

## Armá el tuyo

Tomá **tu** tarea de la ronda. Armá el prompt en el constructor de la página, pieza por pieza, o
escribilo directo si ya lo ves. Cuando esté, apretá "Copiar prompt".

<!--
13 min · acumulado 1:14
Ventana C: página del día 2, ejercicio "Constructor de prompts". Tiene
tres casos de ejemplo (resumen ejecutivo, minuta, triaje de paper) y acepta
pegar uno propio para ver qué le falta.
Recordar la regla antes de que empiecen: la tarea es real pero los datos no.
Nada confidencial: estructura real, contenido público o inventado. Y lo que
peguen en el chat lo leen las otras tres empresas.
Martín: circula por el chat mientras arman; quien se trabe, que pegue lo que
tiene y lo miramos. El constructor puntúa piezas presentes, no calidad:
decirlo para que nadie persiga el puntaje.
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
Ocho minutos de trabajo en silencio; Martín avisa cuando queden tres.
Con seis personas se leen TODOS los resultados en voz alta, y se critican
CON las piezas: ¿tiene rol? ¿el contexto dice quién lo lee? ¿pidió formato?
La crítica con nombre de pieza es amable y transferible; "está flojo" no
enseña nada. Martín: llama el orden de lectura por nombre.
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
Cierre del bloque 5. Guardar los prompts del chat: son el "antes" de la
tarea de hoy, y el que arme el "después" ya tiene la mitad hecha.
-->

---

<!-- _class: seccion -->

## Pausa · 10 min

Diez minutos. Seguimos con qué no se sube a un chatbot

<!--
10 min · acumulado 1:47
Martín: cronómetro de diez minutos a la vista en el chat y aviso a los dos
minutos del final. Mientras tanto, pasa en limpio la lista de tareas de la
ronda y los prompts del taller en un archivo aparte: mañana alimentan el
cuaderno.
Matías: cambiar el chatbot de la ventana D a Claude, subir el CSV del
Capítulo IV y dejarlo listo para la demo.
-->

---

<!-- _class: seccion -->

## Qué no se sube a un chatbot

Bloque 7 de 13 · **13 min**

<!--
1:47 · arranca acá, termina 2:00
-->

---

## La regla práctica

Si no lo pondrías en un **correo a un desconocido**, no va en el chat.

No van: producción real por pozo, reservas, precios y cláusulas de contratos, datos de socios,
información de personas.

Y en esta sala hay cuatro empresas que compiten: **el chat de la videollamada es tan
compartido como el chatbot**.

<!--
7 min · acumulado 1:54
La regla de ayer, ahora con criterio detrás. El porqué corto: lo que se
sube a una cuenta gratuita sale de tu control, y el contrato de datos de una
cuenta gratuita no promete nada.
La segunda cara es nueva y va dicha sin dramatismo: PCR, CGC, Tecpetrol y
Andes en la misma videollamada. Ningún ejercicio pide un dato propio, y si
uno se escapa en el chat, Martín lo borra y seguimos. Lo público del
regulador (que vamos a usar en una hora) sí se comenta con nombre y todo:
está publicado.
Preguntar por casos grises de SUS tareas del taller: ¿el borrador del informe
mensual entra? Depende de qué números lleve. Ese "depende" es el día 4.
No profundizar en política corporativa hoy: el día 4 se llevan un borrador
de política de uso entero.
-->

---

## Las alternativas

- **Datos públicos**: el reporte diario de la ARCH, el Capítulo IV, lo que ya está afuera
- **Datos viejos** que dejaron de ser sensibles
- **Estructura real, contenido inventado**: la planilla con las mismas columnas y números de fantasía

Y las versiones corporativas existen, con otro contrato de datos. Eso es parte del día 4.

<!--
6 min · acumulado 2:00
La tercera alternativa es la más útil para el trabajo diario: el modelo no
necesita tus números para ayudarte a armar el informe; necesita la estructura.
Puente a lo que sigue: la tarde entera trabaja con datos públicos de
producción, argentinos y ecuatorianos, justamente por esta regla. Y para dos
empresas de la sala el Capítulo IV es su propio dato, publicado por el
Estado.
Cierre del bloque 7.
-->

---

<!-- _class: seccion -->

## La planilla y el copiloto

Bloque 8 de 13 · **30 min**

<!--
2:00 · arranca acá, termina 2:30
-->

---

## Hoy el modelo escribe código

Le das una tabla y le pedís un análisis. Ya no genera solo prosa: **genera código, lo corre y te
devuelve el resultado**.

Cuando escribía un párrafo, el error se leía. Ahora el error se esconde detrás de un número que
parece razonable.

<!--
4 min · acumulado 2:04
El cambio de régimen de la tarde, dicho antes de la demo para que sepan qué
mirar. Un filtro mal escrito no rompe nada: devuelve menos filas y sigue.
Esa es la diferencia con el texto, y la razón de las reglas que vienen
después de la demo.
Si preguntan por el costo de automatizar esto: la cuenta quedó a la mañana,
precio por token por mil corridas. La demo de hoy es gratis; el presupuesto
aparece con la automatización.
-->

---

<!-- _class: panel -->

## Demo: producción del Capítulo IV

Un año de producción real de la cuenca Noroeste, pozo por pozo. Miren qué le pido, qué código
escribe, y **dónde decido creerle**.

<!--
14 min · acumulado 2:18
Cambiar al chatbot y subir el CSV del Capítulo IV. Prompts en orden:

1) "Describí este archivo: qué columnas tiene, cuántas filas, qué rango de
   fechas cubre." (La descripción es barata y calibra: si esto viene mal, no
   seguimos.)

2) "Graficá la producción total de gas por mes. Mostrame el código."

3) "¿Qué pozo cayó más en el último año? Mostrame el código y el conteo de
   filas que usaste."

Narrar mientras corre: el código aparece, se ejecuta, devuelve número y
gráfico. Señalar UNA línea del código en voz alta (el filtro, el groupby) sin
explicar sintaxis: alcanza con que vean que se puede leer qué hizo.
Guardar el resultado del prompt 3: se retoma en el bloque de declinación.
Antes de cerrar la demo, SEMBRAR la corrida grande: subir el CSV de 10 pozos
y pegar el prompt de pronóstico en lote de la página (sección "Del ajuste a
mano al pronóstico en lote"). Contestarle el ok a la tabla de control y
dejarlo trabajando: se cosecha en el bloque de declinación. Decirlo en voz
alta: "esto queda corriendo, volvemos después de la pausa".
-->

---

## Leé el código, no solo el resultado

- Pedile **siempre** que muestre el código, no solo la respuesta
- Pedile que el código **informe cuántas filas** entran y cuántas quedan en cada filtro
- Comprobá **un caso a mano**, uno solo, que puedas rastrear en la planilla original

Si ese caso cierra, casi siempre cierra el resto. Si no cierra, no hay nada más que discutir.

<!--
8 min · acumulado 2:26
Las tres reglas de la tarde, sobre la demo fresca. Aplicarlas en vivo: elegir
un pozo del gráfico, pedirle al chatbot su serie, y comprobar UN mes contra
el CSV abierto en otra ventana. Que vean el gesto completo, no la teoría.
La regla de las filas, dicha completa porque el título solo no alcanza: el
que cuenta es el chatbot, no ustedes. Se le pide que cada filtro del código
imprima cuántas filas recibió y cuántas dejó. Un filtro mal escrito no tira
error: se come filas en silencio y el gráfico sale igual de lindo. Ejemplo
con el CSV de 10 pozos: 900 filas; "excluí los meses con menos de 10 días
efectivos" tiene que dejar 885. Si el conteo dice 400, el filtro quedó mal
escrito, y ningún gráfico lo iba a mostrar.
-->

---

<!-- _class: cita -->

## Un número que parece razonable no es un número **verificado**

<!--
4 min · acumulado 2:30
La frase del bloque. Es la misma regla del borrador plausible de ayer, ahora
para código: la salida viene con la forma de un análisis, no con la garantía
de uno.
Cierre del bloque 8.
-->

---

<!-- _class: seccion -->

## De PDF a tabla: el reporte diario de la ARCH

Bloque 9 de 13 · **35 min**

<!--
2:30 · arranca acá, termina 3:05
-->

---

## Un PDF por día de operación

La Agencia de Regulación y Control de Hidrocarburos (ARCH) publica cada día hábil **una página**:
producción por compañía, por bloque público, estado de pozos, gas, y las novedades pozo por pozo.

Sacar esa tabla a mano es una tarde. Extraerla con el modelo es un minuto, más **la
verificación**, que es la parte que nadie cuenta.

<!--
4 min · acumulado 2:34
Por qué este ejercicio es el más honesto del curso: es exactamente el flujo
que cualquiera de ellos haría el lunes con un dato que necesita, y expone el
costo real de la herramienta, que no es extraer sino verificar.
Abrir el PDF del 15 de septiembre (día de operación 14) en el visor y
recorrerlo 30 segundos: tabla 1 a la izquierda, tabla 2 pegada a la derecha,
estado de pozos y gas abajo, y el bloque de novedades en texto corrido.
Cuatro de los seis trabajan en empresas que están en esa página: Andes y
PCR en la tabla 1; Tecpetrol adentro del bloque 57 (Shushufindi Libertador)
de la tabla 2, porque opera por contrato de servicios para Petroecuador.
Es público y oficial, así que se comenta con nombre. Nadie agrega nada.
Preguntar rápido: ¿qué dato de su área vive hoy atrapado en un PDF? (Es
pregunta de discusión de la página; acá alcanza una mano levantada.)
-->

---

<!-- _class: panel -->

## Demo: la tabla 1, a tabla

El reporte del 15 de septiembre, real. Le pedimos la producción diaria por compañía en una tabla,
con la fecha de operación y los números en formato numérico.

<!--
8 min · acumulado 2:42
El PDF está en la página (descargas) y en el sitio de la ARCH; si la red
corporativa de alguien no abre el regulador, la copia de la página alcanza.
Subirlo al chatbot y pegar el prompt del ejercicio de la página (sección "De
PDF a tabla"), tareas 1 y 2 juntas. Mientras extrae, el PDF queda a la vista
en la otra ventana: la comparación visual ya muestra si la estructura vino
bien (16 filas: 14 compañías, subtotal y total).
Lo primero que miro, antes de repartir: el estimado de Andes. En el
original dice 23.607 sin decimales, y es veintitrés mil seiscientos siete;
un lector apurado devuelve 23.6. Lo segundo: que no se haya colado ninguna
fila de la tabla 2 (los bloques de Petroecuador van pegados a la derecha).
Pedir una segunda pasada si hace falta ("ese 23.607 es miles", "te
mezclaste con los bloques"). Iterar acá es normal: es la conversación como
método, de la mañana.
Martín: pega en el chat la tabla extraída, en texto, para que todos la
tengan a mano en el bloque siguiente.
-->

---

<!-- _class: panel -->

## Verifiquemos número por número

Se reparte: cada uno toma **dos o tres compañías** de la tabla extraída y compara sus cinco
números contra el PDF original. "Cierra" o "no cierra", por el chat.

<!--
10 min · acumulado 2:52
El mecanismo estrella de la tarde: 16 filas por 5 columnas son 80 números;
entre seis, dos o tres filas por cabeza, y la tabla queda verificada entera
con cada uno haciendo el gesto completo con sus propios ojos.
Martín: asigna las filas por nombre para que nadie espere, y a quien le
toque el subtotal y el total les pide además una suma de control: la suma
de las trece privadas tiene que dar el subtotal (97,253.11 el día 14) y
público más subtotal el total (463,812.77). Si el modelo "calculó" el
total en lugar de copiarlo, acá se nota.
Anotar los "no cierra" a la vista y revisarlos juntos: ¿fue un dígito
bailado, una coma decimal leída como punto de miles, una fila de la tabla
2 metida en la 1?
Si alguien no puede abrir el PDF, el texto del original va pegado en el
chat.
-->

---

<!-- _class: panel -->

## Las novedades, a tabla

El bloque de texto libre, pozo por pozo: compañía · campo · pozo · causa. Miren qué hace con
"Hormiguero-33-43", con "11 pozos de los campos Dorine y Fanny-18B", y con lo que no pudo leer.

<!--
9 min · acumulado 3:01
Es la tarea 2 del mismo prompt; la salida ya está en pantalla desde la demo.
Recorrerla con tres lupas:
1) Los nombres de pozo. "Hormiguero-33-43" son dos pozos; "Sacha: 419-400"
   también; "Villano: 03ST2-11RE1-15H" son tres; "Fanny-18B16RE1" y
   "Oso-H113RE" son uno solo con sufijo de reentrada. El modelo parte donde
   no hay que partir, y al revés.
2) Los pozos sin nombre. Andes reporta por cantidad: "11 pozos de los campos
   Alice Oeste, Chorongo, Dorine y Fanny-18B continúan cerrados por alto corte
   de agua". Una tabla que inventa once filas con nombres plausibles falló en
   silencio. La fila correcta dice "(11 sin nombre)".
3) La lista de "no pude leer". Si está vacía y el texto tiene medio renglón
   ilegible, el prompt no se cumplió.
Repartir de nuevo por empresa reportante (Petroecuador es larga: dos
personas), un minuto, y cantar por el chat qué fila está mal.
Dejar sembrada la segunda pasada: cinco reportes seguidos dan una serie de
pozos cerrados por alto corte de agua por compañía. Está en la página como
tarea para curiosos, y el conteo se retoma el día 4 con el caso de
recuperación secundaria.
-->

---

## Qué encontramos

Lo típico: casi todo cierra, y **algo no cierra**. Una coma decimal leída como punto de miles, dos
pozos pegados en uno, once pozos con nombres inventados.

El error de extracción no avisa. Por eso la verificación no es opcional, y por eso se hace
número por número.

<!--
4 min · acumulado 3:05
Cerrar con lo que haya salido de verdad en la verificación. Si TODO cerró,
decirlo también: hoy cerró todo, y no había forma de saberlo sin mirar. La
confianza sale de la verificación, no de la herramienta.
Una advertencia más para la serie de varios días: la columna "producción
anterior" de hoy no siempre coincide con la "producción del día" del
reporte de ayer (Andes: 23,816.18 en el del 15 contra 23,814.41 en el del
14). Los volúmenes son preliminares y se corrigen. Quien arme la serie
elige una columna y lo anota.
Cierre del bloque 9.
-->

---

<!-- _class: seccion -->

## Pausa · 10 min

Diez minutos. Seguimos con la declinación en vivo

<!--
10 min · acumulado 3:15
Martín: cronómetro de diez minutos en el chat y aviso a los dos minutos del
final. Guarda en el archivo de la tarde la tabla verificada y la lista de
"no cierra": son material del día 4.
Matías: mirar si la corrida grande de 10 pozos terminó. Si terminó, abrir el
Excel y dejar a la vista la hoja Resumen; si no, tener dca_referencia.xlsx
abierto como plan B. Abrir el laboratorio de declinación en la ventana C y
apretar "Reiniciar ejercicio".
-->

---

<!-- _class: seccion -->

## Declinación en vivo

Bloque 11 de 13 · **25 min**

<!--
3:15 · arranca acá, termina 3:40
-->

---

## De ayer a hoy

Ayer el pozo era de escuela: dos perillas y una respuesta exacta escondida.

Hoy: la **tercera perilla**, el eje logarítmico, la acumulada a 30 años, y **seis pozos reales**
de Aguaragüe, Ramos y Acambuco que nadie diseñó para que ajustaran.

<!--
4 min · acumulado 3:19
El puente: producción mensual declarada al Estado argentino, sin retocar,
del Capítulo IV. Aguaragüe lo opera Tecpetrol y CGC tiene el 5%: para dos
personas de la sala es su propio dato, publicado. Decirlo con naturalidad y
sin pedirles nada: no hace falta que confirmen ni corrijan.
La tercera perilla es b, la curvatura: ayer estaba clavada en cero y nadie
lo notó. Hoy se mueve.
-->

---

<!-- _class: panel -->

## Primero, un pozo de escuela

Abrí el laboratorio de declinación en la página. Dos minutos con el **pozo de escuela 2**: la
tercera perilla, contra una curva que tiene respuesta exacta.

<!--
4 min · acumulado 3:23
Ventana C, ejercicio "Ajustá la curva de declinación". Antes de proyectar:
"Reiniciar ejercicio".
Rápido a propósito: mover b con qi y Di fijos para que se vea qué hace la
curvatura, y listo. La respuesta exacta existe y el desplegable la muestra.
Que cada uno lo haga en su pantalla a la par.
-->

---

<!-- _class: panel -->

## Ahora un pozo real, entre todos

Elegimos un pozo de Aguaragüe. Ustedes cantan los movimientos por el chat; yo muevo las
perillas. ¿Dónde se pega la curva, y dónde no hay forma?

<!--
8 min · acumulado 3:31
Proyectar el laboratorio con un pozo real de la lista. Los movimientos los
canta la sala ("subí qi", "bajá Di") y el instructor ejecuta: el ajuste es de
todos y las decisiones se discuten mientras pasan. Martín: ordena el chat,
un movimiento por persona, por turno.
Mostrar el eje logarítmico: la exponencial es una recta ahí, y los pozos
reales no lo son.
Señalar los desvíos que la curva no puede seguir: paradas, recuperaciones,
el serrucho de los meses cortos (el desplegable de febrero lo explica).
-->

---

<!-- _class: panel -->

## El pozo que no ajusta

Prueben con **YPF.St.SP.x-1**. Ningún juego de perillas lo arregla. ¿Qué le pasó?

<!--
5 min · acumulado 3:36
Que lo intenten en su pantalla un par de minutos: la frustración es parte de
la lección. Después juntar hipótesis por el chat.
La respuesta honesta: la curva no lo dice. Un pozo que se rompió, una
intervención, un cambio de destino del gas; el dato de qué pasó no está en la
serie. Ese es el límite del método, mostrado y no contado.
-->

---

## Lo que la curva no dice

**Arps describe un reservorio que se despresuriza solo, y ningún pozo real hace eso.** Lo que se
mide en boca es reservorio más compresión, más restricciones de planta, más contrapresión de
línea.

Un ajuste que cierra no prueba que entendiste la geología. La curva ordena la conversación y
acota un número; no la cierra.

<!--
4 min · acumulado 3:40
El párrafo serio de la tarde, el que separa esto de un tutorial. Un análisis
de verdad se hace sobre caudales corregidos por horas de operación y presión
de boca, no sobre el volumen mensual crudo. En un campo con inyección de
agua, como Pindo o Libertador, la curva sola dice todavía menos: ahí manda
la presión, y eso es el "para curiosos" de Volve en la página.
COSECHA de la corrida sembrada en el bloque 8: abrir el Excel que devolvió
Claude. Dos miradas, no más: la fila de YPF.St.SP.x-1 tiene que decir "sin
ajuste" (el pozo que acaban de sufrir a mano: el prompt con reglas lo dice
solo), y el qi/declinación de un pozo que ajustaron a mano, comparado con lo
que dio la sala. Referencia del instructor: dca_referencia.xlsx. Si el
artifact salió, mostrarlo 30 segundos. Plan B si la corrida falló o quedó a
medias: abrir dca_referencia.xlsx y leer las mismas dos filas ahí.
La pregunta de discusión de la página lo remata: en el pozo que no ajusta,
¿qué información tenés vos que el modelo no puede tener? Esa pregunta es el
resumen del curso entero.
Cierre del bloque 11.
-->

---

<!-- _class: seccion -->

## Qué se puede afirmar

Bloque 12 de 13 · **10 min**

<!--
3:40 · arranca acá, termina 3:50
-->

---

## De los tres análisis de hoy

El gráfico del CSV, la tabla del reporte de la ARCH, el ajuste del pozo real. Una ronda: ¿cuál
**firmarías** con tu nombre, y cuál necesita más trabajo antes de circular?

<!--
10 min · acumulado 3:50
Martín: ronda directa por nombre, los seis. No hay respuesta única: el
punto es que expliciten el criterio. Las respuestas fuertes suenan a "firmo
la tabla porque la verificamos número por número; el ajuste no, porque no sé
qué pasó en ese pozo".
Empujar hacia la regla general: se firma lo que se verificó, al nivel al que
se verificó. Es el puente directo al protocolo de verificación del día 4.
-->

---

<!-- _class: seccion -->

## Cierre y tarea

Bloque 13 de 13 · **10 min**

<!--
3:50 · arranca acá, termina 4:00
-->

---

<!-- _class: acentos -->

## Qué te llevás hoy

- **Escribile como a un analista nuevo** en su primer día: quién lo lee, qué decide, cómo lo quiere
- **Pedí el código y las filas**: que cada filtro diga cuántas recibió y cuántas dejó
- **Un caso a mano**: un número rastreado en el original; si cierra, casi siempre cierra el resto

<!--
3 min · acumulado 3:53
Tres prácticas, una de la mañana y dos de la tarde. Son baratas, no piden
saber programar, y cazan la mayoría de los errores del trabajo asistido.
La contracara de la página ("intentá en serio", la cota de Riemann) queda
para quien la lea: el prompt fino controla la salida de todos los días; lo
que nunca es mínimo es la verificación.
-->

---

## Tarea para mañana

Dos cosas, cinco minutos. Tu prompt **antes y después**: el de una línea de hoy y el que
funcionó, uno debajo del otro.

Y un **documento de tu empresa** que consultás seguido y no es confidencial (manual, norma,
procedimiento), con **tres preguntas concretas** que le harías si pudieras preguntarle en vez de
buscar.

<!--
3 min · acumulado 3:56
El antes/después ya está medio hecho: el "antes" quedó en el chat del
taller. Insistir en traer los dos, porque la distancia entre ellos es la
clase de hoy funcionando.
Las preguntas, "concretas": "¿cada cuánto se calibra la válvula X?" sirve;
"¿qué dice el manual?" no. Mañana el documento y las preguntas van a un
cuaderno de verdad, así que la calidad de la pregunta se paga sola. No
confidencial: mañana ese documento se sube a una herramienta gratuita.
Plan B para mañana si pocos la hicieron: el cuaderno del rubro arranca con
documentos públicos (reglamentos, reportes del regulador) y las preguntas
se escriben en vivo en dos minutos.
-->

---

## Mañana: de la ingeniería de prompts a la **ingeniería de contexto**

El prompt que ve el modelo ya no es solo el que escribís: es tu pedido más todo lo que viaja
con él. Hoy fueron tus archivos adjuntos.

Mañana: los fragmentos recuperados de tus documentos a la mañana, y herramientas que trabajan
solas a la tarde.

<!--
3 min · acumulado 3:59
El término real del rubro: la ingeniería de prompts está dando lugar a la
ingeniería de contexto. Lo de hoy no caduca: las piezas siguen siendo la
orden de trabajo; lo que crece es todo lo que viaja alrededor.
Ya lo vieron sin nombre: la ventana de contexto de ayer es el lugar donde
todo eso entra, y de donde se cae.
Dejar la palabra sembrada y no profundizar: mañana la llena de contenido
concreto, y el día 4 llega el caso de recuperación secundaria, donde el
conteo de pozos cerrados por agua de hoy vuelve a aparecer.
El quiz, el constructor y el laboratorio quedan en la página, como siempre.
-->

---

<!-- _class: portada -->

# Nos vemos mañana

El quiz, el constructor y el laboratorio quedan en la página · **mpodeley.github.io/curso-ia-energia**

<!--
1 min · acumulado 4:00
Dejar proyectada mientras se despiden.
Después de clase: pasar en limpio la lista de tareas de la ronda, los
prompts del taller y la tabla verificada de la ARCH; los tres alimentan el
cuaderno de mañana y el caso del día 4.
-->
