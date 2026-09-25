---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 3**'
footer: 'mpodeley.github.io/curso-ia-energia'
---

<!-- _class: portada -->

# Prompting y trabajo diario

Sesión 3 de 8 · día 2 · 2 h en vivo · **PCR · CGC · Tecpetrol · Andes Petroleum**

<!--
0:00 · portada mientras entra la gente
Ventanas de hoy: A este deck, C el sitio en la página de la sesión 3, D el
chatbot del instructor. En esta sesión Gemini Flash para las demos de
prompting (sin conexión, como ayer); en la sesión 4, Claude (Sonnet), que
corre código y genera el Excel y el artifact de la corrida grande: se cambia
en la pausa del final. Los alumnos siguen con el chatbot que tengan.
Antes de clase, en el escritorio, lo de las dos sesiones del día: un CSV de
un año del Capítulo IV (cuenca Noroeste, el link está en el material previo
de la página de la sesión 4), el CSV de 10 pozos
(descargas/produccion_noroeste_10pozos.csv), el reporte diario de la ARCH
del 15 de septiembre (descargas/arch-reporte-diario-2026-09-15.pdf), y
scripts/_cache/dca_referencia.xlsx como referencia del instructor
(regenerar con: python scripts/dca_referencia.py).
Martín: cronómetro en cero, chat abierto, lista de asistencia por nombre y
empresa a la vista para llamar las rondas.
-->

---

<!-- _class: seccion -->

## Apertura y repaso de la tarea

Bloque 1 de 6 · **15 min**

<!--
0:00 · arranca acá, termina 0:15
La apertura es corta a propósito: dos minutos de agenda, uno de objetivos,
dos para entrar al sitio, y la ronda de la tarea se lleva los diez que
quedan.
-->

---

<!-- _class: agenda -->

## Esta sesión

| Bloque | min |
| --- | --- |
| Apertura y repaso de la tarea | 15 |
| Elegir modelo | 12 |
| El peor prompt | 12 |
| Anatomía de un prompt | 22 |
| Taller: tu tarea, tu prompt | 36 |
| Qué no se sube a un chatbot | 13 |
| Pausa | 10 |

<!--
2 min · acumulado 0:02
La misma tabla está en la página de la sesión 3.
Bajada del día: ayer vimos qué es y cómo funciona; hoy aprendemos a usarlo. En esta
sesión el modelo escribe texto y aprendemos a pedírselo bien. En la sesión
4, después de la pausa, le damos tablas y PDF, y para analizarlos escribe
código: eso cambia dónde puede fallar y dónde hay que mirar.
Una pausa de diez al final, marcada en la tabla: a las 12:00 arranca la
sesión 4 con su propio deck. Martín la avisa.
-->

---

## Al final de la sesión van a poder

- Elegir entre el modelo **grande y el rápido**, con tu tarea como benchmark
- Escribir prompts con **rol, contexto, tarea, formato y ejemplos**, sobre una tarea propia
- Saber **qué información de la empresa no se sube** a un chatbot, ni al chat de esta sala

<!--
1 min · acumulado 0:03
Los ejemplos salen de sus tareas: la ronda que sigue arma el menú del
taller. La regla entre empresas de ayer sigue en pie: nadie trae
nada propio.
-->

---

<!-- _class: panel -->

## Entrá al sitio, como ayer

`mpodeley.github.io/curso-ia-energia`

Hoy usamos la página de la sesión 3, y tu chatbot en otra pestaña: en la sesión 4 le vamos a
dar de comer planillas y un PDF, así que conviene uno que acepte archivos.

<!--
2 min · acumulado 0:05
Avisar temprano: en el taller de la mañana cada uno corre su propio prompt
en su propio chatbot. El que no tenga cuenta, que la cree ahora.
Para la sesión 4 conviene un chatbot que acepte archivos y corra código
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
un momento): esa lista es el menú del taller.
Regla dicha una vez y en voz alta: la tarea tiene que ser real, sin datos
propios. Nadie describe un pozo, un contrato ni un número propio; alcanza con "el informe
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

Bloque 2 de 6 · **12 min**

<!--
0:15 · arranca acá, termina 0:27
Este bloque existe porque en la primera edición lo pidieron el primer día:
cómo se comparan los modelos y dónde mirar. Si ayer salió la pregunta,
decirlo.
-->

---

<!-- _class: acentos -->

## ¿Qué modelo uso? Cuatro cosas para mirar

- **Capacidad en tu tarea**: cómo resuelve lo que vos le vas a pedir
- **Ventana de contexto**: cuánto le entra de una vez
- **Precio por token**: la entrada y la salida se cobran distinto
- **Velocidad**: el grande piensa mejor y tarda más

Todos los proveedores tienen la misma escalera: un modelo **grande** y uno **rápido**.

<!--
4 min · acumulado 0:19
La escalera, con nombres: Astra y Luna en OpenAI, Sonnet y Haiku en Claude,
Pro y Flash en Gemini. Ya la usaron sin saberlo: el Flash de las demos de
ayer es el rápido de Gemini.
El selector de modelo del chatbot ES esta decisión, y hasta hoy lo dejaron
en el que venía por defecto. Después de este bloque, que sea una elección.
Las cuentas gratuitas, en septiembre de 2026: ChatGPT no tiene selector
(usa su modelo chico), Claude ofrece Sonnet y Haiku, Gemini corre Flash con
acceso limitado a Pro. Plan B para el que no ve selector: el mismo prompt
en dos chatbots distintos, que para comparar sirve igual.
-->

---

## Dónde mirar

- Un benchmark es un **examen estandarizado**: sirve para descartar modelos
- **LMArena**: miles de personas votando a ciegas entre dos respuestas
- **Artificial Analysis**: capacidad, precio y velocidad de todos, en un solo cuadro
- Para elegir entre los que quedan, **tu tarea**, corrida en dos modelos

<!--
4 min · acumulado 0:23
Los dos sitios están en el material previo de la página, con enlace.
Los límites de los benchmarks, dichos sin cinismo: los modelos "estudian para
el examen" (las preguntas se filtran al entrenamiento), un punto más de
benchmark no se nota en una minuta, y el podio cambia todos los meses. Se
mira el cuadro general.
La última viñeta es la que quiero que se lleven, y el taller de hoy la deja
practicada: mismo prompt, dos modelos, comparar con tus propios ojos.
-->

---

## La economía de tokens

Se cobra **por token**, y la entrada y la salida tienen precio distinto. El modelo grande
cuesta **varias veces** lo que el rápido: Artificial Analysis tiene el precio de cada uno.

Con cuentas gratuitas hoy no lo pagan. Importa el día que algo se automatiza: mil corridas por
mes convierten el precio por token en presupuesto.

<!--
4 min · acumulado 0:27
Conectar con ayer: ya saben qué es un token y por qué el español rinde
menos por token; ahora saben que eso también es plata.
El patrón que se usa en serio: el modelo grande para lo difícil o lo que se
hace una vez; el rápido para lo repetitivo, después de probar que alcanza.
Adelanto de mañana: pegar el manual entero en cada pregunta también es
plata; traer solo el fragmento que hace falta es la mitad de la gracia de lo
que veremos mañana, en la sesión 5.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## El peor prompt

Bloque 3 de 6 · **12 min**

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

El modelo **obedeció una orden vacía**. Sin contexto, la rellena con lo más plausible, y ya
sabemos lo que eso significa.

Si la salida es genérica, casi siempre es porque el pedido también lo era.

<!--
4 min · acumulado 0:39
La frase del bloque: si la salida es genérica, casi siempre el pedido
también lo era.
Conectar con ayer sin nombres técnicos: lo que rellenó es la continuación
más plausible, el mismo mecanismo de las alucinaciones.
Puente: si el problema es la orden, hay que aprender a escribir órdenes, y
de eso se trata el prompting.
-->

---

<!-- _class: seccion -->

## Anatomía de un prompt

Bloque 4 de 6 · **22 min**

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
Lo que importa mostrar: las preguntas que hice son las piezas de la slide
anterior, en orden.
-->

---

<!-- _class: cita -->

## La primera salida es un **borrador**: se corrige conversando

<!--
3 min · acumulado 1:01
Iterar es parte del uso normal: "más corto", "menos jerga", "ahora en tono
formal".
Cierre del bloque: ya vieron las piezas y la reescritura en vivo. Ahora les
toca a ellos, con la tarea propia.
-->

---

<!-- _class: seccion -->

## Taller: tu tarea, tu prompt

Bloque 5 de 6 · **36 min**

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
Ventana C: página de la sesión 3, ejercicio "Constructor de prompts". Tiene
tres casos de ejemplo (resumen ejecutivo, minuta, triaje de paper) y acepta
pegar uno propio para ver qué le falta.
Recordar la regla antes de que empiecen: la tarea es real y los datos son
públicos o inventados. Nada confidencial. Y lo que peguen en el chat lo leen
las otras tres empresas.
Martín: circula por el chat mientras arman; quien se trabe, que pegue lo que
tiene y lo miramos. El puntaje del constructor solo cuenta qué piezas están
presentes; decirlo para que nadie lo persiga.
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
Plan B para la consigna extra: la cuenta gratuita de ChatGPT no tiene
selector de modelo. Quien no lo vea, que corra el mismo prompt en otro
chatbot (Claude o Gemini) y compare igual.
-->

---

## Qué suele faltar

En nueve de cada diez prompts flojos falta lo mismo: para quién es la salida, qué formato tiene
que tener, y un ejemplo de cómo te gusta.

El rol y la tarea casi siempre están. Faltan las cosas que un analista nuevo te preguntaría antes
de empezar.

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

## Qué no se sube a un chatbot

Bloque 6 de 6 · **13 min**

<!--
1:37 · arranca acá, termina 1:50
-->

---

## La regla práctica

Si no lo pondrías en un **correo a un desconocido**, no va en el chat.

No van: producción real por pozo, reservas, precios y cláusulas de contratos, datos de socios,
información de personas.

Y en esta sala hay cuatro empresas que compiten: **el chat de la videollamada es tan
compartido como el chatbot**.

<!--
6 min · acumulado 1:43
La regla de ayer, ahora con criterio detrás. El porqué corto: lo que se
sube a una cuenta gratuita sale de tu control, y el contrato de datos de una
cuenta gratuita no promete nada.
La segunda cara va dicha sin dramatismo: PCR, CGC, Tecpetrol y
Andes en la misma videollamada. Ningún ejercicio pide un dato propio, y si
uno se escapa en el chat, Martín lo borra y seguimos. Lo público del
regulador (que vamos a usar en la sesión 4) sí se comenta con nombre y todo:
está publicado.
Preguntar por casos grises de SUS tareas del taller: ¿el borrador del informe
mensual entra? Depende de qué números lleve. Ese "depende" es la sesión 7.
No profundizar en política corporativa hoy: en la sesión 7 se llevan un
borrador de política de uso entero.
-->

---

## Las alternativas

- **Datos públicos**: el reporte diario de la ARCH, el Capítulo IV, lo que ya está afuera
- **Datos viejos** que dejaron de ser sensibles
- **Estructura real, contenido inventado**: la planilla con las mismas columnas y números de fantasía

Y las versiones corporativas existen, con otro contrato de datos. Eso es parte de la sesión 7.

<!--
5 min · acumulado 1:48
La tercera alternativa es la más útil para el trabajo diario: para ayudarte
a armar el informe, al modelo le alcanza con la estructura.
Puente a lo que sigue: la sesión 4 entera trabaja con datos públicos de
producción, argentinos y ecuatorianos, justamente por esta regla. Y para dos
empresas de la sala el Capítulo IV es su propio dato, publicado por el
Estado.
-->

---

<!-- _class: acentos -->

## Para llevarse

- Elegí el modelo con **tu tarea**: el mismo prompt en dos modelos, y te quedás con el más barato que alcanza
- Escribí el prompt como una **orden de trabajo**: para quién es, qué decide, qué formato
- Si no lo pondrías en un **correo a un desconocido**, no va al chatbot ni al chat de la sala

<!--
2 min · acumulado 1:50
Tres prácticas de la sesión, una por bloque grande, en palabras simples. La
del medio se completa con la cita del bloque 4: la primera salida es un
borrador y se corrige conversando.
El quiz de la sesión 3 y el constructor quedan en la página.
Cierre del bloque 6.
-->

---

<!-- _class: seccion -->

## Pausa · 10 min

A las 12:00 (10:00 en Ecuador y Colombia) sigue la sesión 4, con su propio deck

<!--
10 min · acumulado 2:00
Martín: cronómetro de diez minutos a la vista en el chat y aviso a los dos
minutos del final. Pegar en el chat el link a la página de la sesión 4.
Mientras tanto, pasa en limpio la lista de tareas de la ronda y los prompts
del taller en un archivo aparte: los prompts son el "antes" de la tarea que
se da al final de la sesión 4.
Matías: cerrar este deck y abrir el de la sesión 4 en la ventana A. Cambiar
el chatbot de la ventana D a Claude, subir el CSV del Capítulo IV y dejarlo
listo para la demo.
-->
