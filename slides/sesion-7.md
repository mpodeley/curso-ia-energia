---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 7**'
footer: 'mpodeley.github.io/curso-energia-ypfb'
---

<!-- _class: portada -->

# Riesgos, límites y gobernanza

Sesión 7 de 8 · 2 h en vivo · **YPFB Andina**

<!--
0:00 · portada mientras entra la gente
Ventanas de hoy: A este deck, C el sitio en la sesión 7. Sin pulsos hoy.
Antes de clase: el borrador de la política (el .docx descargable de la
página, con corchetes para completar) abierto y listo, y las fuentes de los
cinco incidentes abiertas en pestañas: Deloitte (Guardian), el registro de
Charlotin, Replit (AIID), Air Canada (BBC) y el reporte de espionaje de
Anthropic. Todas están linkeadas en la página.
-->

---

## Hoy

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| Apertura y entrada al sitio | 5 min | El PIN de siempre y las ventanas del día |
| La cacería | 20 min | Invenciones cazadas en vivo, cada una con su causa |
| El protocolo | 25 min | Cuánto verificar según el costo del error |
| Datos de la empresa | 20 min | Datos reales del equipo en los tres niveles |
| Agentes y operación | 25 min | Donde el error no es reversible, el loop no sirve |
| La política | 15 min | El borrador de una página, redactado en vivo |
| Cierre y tarea | 10 min | La tarea de la sesión 8 y las cuatro, cerradas |

<!--
2 min · acumulado 0:02
La misma tabla está en la página de la sesión 7.
Bajada del día: hoy no hay tema nuevo. Hoy se convierte todo lo que vieron
en reglas que se aplican un martes a la mañana. Y de acá sale la vara con la
que mañana se critica el caso.
Primero la cacería: el material del día se produce en vivo, sin depender de
la tarea.
-->

---

## Al final de esta sesión van a poder

- Ponerle **causa** a un error concreto, con la tabla de las cuatro propiedades
- Dosificar la verificación según el **costo del error**, y ubicar cada dato en su nivel
- Salir con el **borrador de política** de una página para su equipo

<!--
1 min · acumulado 0:03
Lo nuevo de hoy no es contenido: es que cada regla viene con un incidente
real y documentado de los últimos dos años. Nada de esta sesión es
hipotético.
-->

---

<!-- _class: panel -->

## Entrá al sitio, como siempre

`mpodeley.github.io/curso-energia-ypfb`

Hoy usamos la página de la sesión 7. El primer bloque se juega en su ejercicio: la **cacería
de alucinaciones**.

<!--
2 min · acumulado 0:05
El PIN de siempre. Plan del día en una frase: primero cazar invenciones,
después las tres reglas (verificar, datos, operación), y al final la
política escrita.
-->

---

<!-- _class: seccion -->

## La cacería

Bloque 1 de 6 · **20 min**

<!--
Arranca 0:05, termina 0:25
-->

---

<!-- _class: panel -->

## A cazar invenciones

Abrí la **cacería de alucinaciones**: tres informes con errores plantados. Cinco minutos en el
primero, marcando lo que **no sale de los datos**. Después, ronda.

<!--
12 min · acumulado 0:17
Ventana C, ejercicio "Cacería de alucinaciones". El material del bloque se
produce acá mismo: no depende de que hayan hecho nada antes.
Cinco minutos de caza individual en el primer informe. Después ronda por
nombre: qué marcaste y por qué. Contar también los falsos positivos: el
puntaje penaliza marcar de más, y desconfiar de todo es otra forma de no
leer.
Bonus si alguien trajo la afirmación de la tarea: va primera en la ronda.
Quien ya hizo la cacería en casa comparte qué lo engañó, que vale igual.
Anotar los hallazgos a la vista: son el material de la slide siguiente.
-->

---

<!-- _class: acentos -->

## Cuatro propiedades, cuatro arreglos

- **Predice el próximo token**: el dato lo traés vos, él lo redacta
- **Conocimiento**: adjuntale el documento, que lea en vez de recordar
- **Memoria de trabajo**: conversaciones cortas, y repetí lo que no puede perderse
- **Control de la salida**: describí mejor el resultado, o mostrale un ejemplo

<!--
8 min · acumulado 0:25
Recorrer los hallazgos de la cacería y ponerle propiedad a cada uno: la
cifra precisa inventada (predicción), la norma recitada de memoria
(conocimiento).
La tabla de la página es el índice del curso leído al revés: cada fila se
trabajó en su sesión, con su ejercicio.
El uso real: diagnosticar antes de reescribir el prompt por cuarta vez. Si
le atribuís al prompt lo que era falta de documento, va a seguir inventando
con prolijidad.
En el trabajo casi nunca viene una sola: el ejemplo de la página es una
consulta larga sobre una norma no adjuntada (conocimiento + memoria).
Cierre del bloque 1.
-->

---

<!-- _class: seccion -->

## El protocolo

Bloque 2 de 6 · **25 min**

<!--
Arranca 0:25, termina 0:50
-->

---

## Lo verificable y lo inventado

Lo verificable es lo que **se deriva de lo que le diste**. Lo inventado es lo que tuvo que
completar.

Un resumen de tu planilla suele estar bien. Una causa, una cita, un artículo de una norma,
casi nunca.

<!--
5 min · acumulado 0:30
La regla que deja la cacería, dicha corta. Conecta con la sesión 2: donde no
tenía el dato, completó lo plausible.
La pregunta operativa frente a cualquier salida: ¿esto estaba en lo que le
di, o lo tuvo que poner él?
-->

---

## Esto ya pasó: Deloitte, octubre de 2025

Un informe de AU$ 440,000 para el gobierno australiano salió con **citas académicas
inventadas** y una cita judicial falsa.

La firma devolvió parte de los honorarios.

<!--
5 min · acumulado 0:35
La fuente (Guardian) está linkeada en la página y abierta en pestaña. Quien
lo destapó fue un investigador que hizo lo que enseña este curso: abrió las
citas.
El detalle que duele: la firma sostuvo que las recomendaciones no cambiaban.
La reputación ya había pagado igual.
Y no es un caso aislado: el registro público de Charlotin (también linkeado)
ya pasa los 1,900 fallos judiciales con citas inventadas por IA. La fila de
normativa del protocolo existe por eso.
-->

---

<!-- _class: acentos -->

## El protocolo, por costo del error

- **Borrador que vas a reescribir**: no se verifica, se reescribe
- **Texto con tu nombre**: todo dato puntual, contra la fuente
- **Cifra en informe firmado**: fuente primaria a la vista, sin excepción
- **Normativa**: con el texto de la norma adjunto, nunca de memoria

<!--
10 min · acumulado 0:45
Armarlo CON ellos: por cada nivel, pedir un ejemplo real de su semana y
ubicarlo. El protocolo se ajusta al costo del error, no al tipo de
herramienta: el mismo chatbot puede estar bien para el primero y prohibido
para el tercero.
Volver a Deloitte: el informe era del tercer y cuarto nivel, tratado como
del primero.
-->

---

<!-- _class: cita -->

## Si no podés abrir la fuente en **dos minutos**, el número no entra

<!--
5 min · acumulado 0:50
La frase del bloque, tal cual está en la página. Es la versión operativa de
"borrador plausible, no fuente" de la sesión 2, ahora con umbral de tiempo.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## Datos de la empresa

Bloque 3 de 6 · **20 min**

<!--
Arranca 0:50, termina 1:10
-->

---

<!-- _class: acentos -->

## El mapa de tres niveles

- **Nunca, en ninguna herramienta externa**: producción real por pozo, reservas, contratos, personas
- **Solo en herramientas contratadas**, con acuerdo de datos: documentos internos no críticos
- **En cualquiera, incluso gratuita**: lo público, lo ya publicado, lo sintético

<!--
6 min · acumulado 0:56
El clásico que abrió esta conversación en la industria: ingenieros de
Samsung pegando código fuente en ChatGPT en 2023. La respuesta de la empresa
fue prohibir todo, que es la política que nadie cumple. El mapa existe para
no terminar ahí: tres niveles se pueden cumplir.
La regla del primer día (el correo a un desconocido) era la versión de
entrada; esta es la operativa.
-->

---

<!-- _class: panel -->

## Clasifiquemos datos de verdad

Ronda: un dato con el que trabajás todas las semanas. La sala lo pone en su nivel.

**Los casos de borde son el material.**

<!--
11 min · acumulado 1:07
Ronda por nombre. Ejemplos para empujar si se traban: el pronóstico de
producción del mes (¿es la producción real?), un procedimiento interno, el
organigrama, una minuta con nombres propios.
La regla del borde: ante la duda, el nivel más alto, y la consulta al
responsable, que es el quinto punto de la política de hoy.
Anotar los datos clasificados: entran tal cual al punto 2 del borrador en el
bloque 5.
-->

---

## El truco del tercer nivel

Para probar un análisis o afinar un prompt, una **planilla sintética** con las mismas columnas
funciona igual de bien que la real.

<!--
3 min · acumulado 1:10
Es lo que hizo el curso entero: los pozos de escuela de la sesión 4 son
datos sintéticos con estructura real. Probar con lo sintético, correr con lo
real adentro de la red.
Cierre del bloque 3.
-->

---

<!-- _class: seccion -->

## Agentes y operación

Bloque 4 de 6 · **25 min**

<!--
Arranca 1:10, termina 1:35
-->

---

## El loop supone que equivocarse es barato

Ayer: el error vuelve y se corrige. Funciona porque leer y calcular son **reversibles**.

En un sistema que opera equipos, un paso equivocado no vuelve como mensaje: vuelve como una
**válvula en la posición que no era**.

<!--
6 min · acumulado 1:16
Retomar la traza de ayer: todo lo que hizo el agente era reversible, y por
eso el loop podía permitirse el error de la diéresis.
"Conectemos un agente al sistema de control" tiene que encender todas las
alarmas, y no porque el modelo sea tonto: porque el mecanismo que lo hace
funcionar supone que equivocarse no cuesta nada.
-->

---

## Esto ya pasó: Replit, julio de 2025

Un agente de programación **borró la base de datos de producción** de una empresa, en pleno
congelamiento de cambios.

Después informó que la recuperación era imposible. No lo era.

<!--
5 min · acumulado 1:21
La fuente (el AI Incident Database) está linkeada en la página.
Dos lecciones, las dos del curso: la herramienta de escritura estaba
conectada sin necesidad (herramientas que no deberían estar, sesión 6), y lo
que el agente dice sobre su propio error también es salida de un modelo: se
verifica igual. La recuperación la terminó haciendo una persona.
-->

---

## Sin garantías de comportamiento

No se puede **demostrar** que un modelo nunca va a hacer algo. Se puede observar que hasta
ahora no lo hizo.

La seguridad industrial se diseña al revés: garantías demostrables, modos de falla conocidos.

<!--
8 min · acumulado 1:29
El video corto de los recursos (Anthropic, qué es la interpretabilidad) es
exactamente esta pregunta: mirar adentro se puede, garantizar todavía no.
Son dos culturas de ingeniería incompatibles, y no se arregla con un prompt
mejor.
Para el ángulo de seguridad informática: en noviembre de 2025 Anthropic
reportó el primer caso de espionaje orquestado con agentes de IA, contra
unas treinta organizaciones. El link está en la página; para una empresa de
energía es lectura obligada.
-->

---

<!-- _class: cita -->

## Entre el modelo y el campo, **una persona con nombre y apellido**

<!--
6 min · acumulado 1:35
La separación práctica: asistentes sobre copias de datos, del lado de la
oficina, produciendo recomendaciones que una persona ejecuta. No es
desconfianza en la tecnología: es la misma lógica por la que un cálculo de
ingeniería lo firma alguien.
Cierre del bloque 4.
-->

---

<!-- _class: seccion -->

## La política

Bloque 5 de 6 · **15 min**

<!--
Arranca 1:35, termina 1:50
-->

---

## Quién responde ya tiene respuesta

Air Canada, 2024: su chatbot **inventó una política de descuentos** y un tribunal obligó a la
aerolínea a cumplirla.

Lo que tu herramienta dice, lo dijo tu empresa.

<!--
5 min · acumulado 1:40
La fuente (BBC) está en la página. La defensa de la aerolínea fue que el
chatbot era "una entidad separada responsable de sus propios actos"; el
tribunal no lo tomó bien.
Por eso la política no es burocracia: es saber qué herramientas hablan en
nombre de quién, y quién responde cuando se equivocan.
-->

---

<!-- _class: panel -->

## La política, en una página

La redactamos en vivo sobre un borrador editable de **cinco puntos**: herramientas aprobadas,
mapa de datos, verificación, declaración de asistencia, y a quién consultar.

<!--
10 min · acumulado 1:50
El borrador es el .docx descargable de la página; proyectarlo y completarlo
en vivo: los datos clasificados del bloque 3 entran al punto 2, el
protocolo al punto 3, y el nombre del punto 5 se decide acá.
El quinto punto (a quién se consulta el caso nuevo) es el que más se olvida
y el que mantiene la política viva.
Cada uno se lo baja de la página, editable, para su equipo.
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

## Para llevarse

- Antes de reescribir el prompt, **diagnosticá**: cuál de las cuatro propiedades fue
- La verificación se dosifica por **costo del error**, no por desconfianza
- Lo que dice tu herramienta **lo dice tu empresa**: por eso existe la política

<!--
3 min · acumulado 1:53
Tres prácticas, en palabras simples. Las cuatro maneras de fallar quedaron
cerradas: nombre, causa y arreglo para cada una, más el protocolo para
dosificar la desconfianza.
-->

---

## Tarea para la sesión 8

Leé el **resumen del caso** en la página de la sesión 8 y anotá dos cosas: qué te gustaría que
muestre la demostración, y qué tendría que pasar para que tu equipo **lo use de verdad**.

<!--
3 min · acumulado 1:56
La segunda pregunta es la difícil, y es la que alimenta la hoja de ruta de
mañana. Cinco minutos más la lectura del resumen.
Recordar que el resumen ya está publicado en la página de la sesión 8, con
las preguntas de aceptación que escribieron ayer.
-->

---

## La sesión 8: el caso y la hoja de ruta

- El **screening de waterflooding**, recorrido de punta a punta
- La crítica del grupo, con el **protocolo de hoy** en la mano
- Una **hoja de ruta** por equipo: mañana, noventa días, decisión corporativa

<!--
3 min · acumulado 1:59
Mañana el caso se somete a lo que armamos hoy: si algo no pasa el protocolo,
se dice con todas las letras. Es la última sesión y cierra el curso.
La cacería y el quiz quedan en la página, como siempre.
-->

---

<!-- _class: portada -->

# Nos vemos mañana

La cacería y el quiz quedan en la página · **mpodeley.github.io/curso-energia-ypfb**

<!--
1 min · acumulado 2:00
Dejar proyectada mientras se despiden.
Después de clase: terminar la construcción del caso con las preguntas de
aceptación a la vista, y dejar la hoja de ruta editable lista. Las políticas
que salgan del bloque 5 viajan por el chat o correo a cada uno.
-->
