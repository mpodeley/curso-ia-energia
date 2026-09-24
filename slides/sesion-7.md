---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 7**'
footer: 'mpodeley.github.io/curso-ia-energia'
---

<!-- _class: portada -->

# Riesgos, límites y gobernanza

Sesión 7 de 8 · día 4 · 2 h en vivo · **PCR · CGC · Tecpetrol · Andes Petroleum**

<!--
0:00 · portada mientras entra la gente
Ventanas de esta sesión: A este deck, C el sitio en la página de la sesión 7.
Sin pulsos hoy: el Worker está encendido pero este día no los usa.
Antes de clase: el borrador de la política (el .docx descargable de la
página, con corchetes para completar) abierto y listo; las fuentes de los
cinco incidentes abiertas en pestañas: Deloitte (Guardian), el registro de
Charlotin, Replit (AIID), Air Canada (BBC) y el reporte de espionaje de
Anthropic. Todas están linkeadas en la página.
Dejar preparado también lo de la sesión 8 (ver las notas de su portada): la
pausa entre sesiones dura diez minutos y no alcanza para cargar el Libro A,
la terminal y las pestañas del futuro.
Martín: cronómetro en cero, la lista de las seis personas por empresa a
mano para las rondas, y el chat con la regla de siempre pegada: ningún dato
propio en el chat compartido.
-->

---

<!-- _class: agenda -->

## Esta sesión

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| Apertura | 8 min | Las ventanas del día y el caso de cada uno a mano |
| La cacería | 20 min | Invenciones cazadas en vivo, cada una con su causa |
| El protocolo | 25 min | Cuánto verificar según el costo del error |
| Datos de la empresa | 20 min | Datos reales en los tres niveles, y el borde entre cuatro empresas |
| Agentes y operación | 20 min | Donde el error no es reversible, el loop no sirve |
| La política | 17 min | El borrador de una página, redactado en vivo |
| Pausa | 10 min | A las 12:00 sigue la sesión 8 |

<!--
3 min · acumulado 0:03
La misma tabla está en la página de la sesión 7.
Bajada del día, en dos sesiones. Esta convierte todo lo que vieron en reglas
que se aplican el lunes a la mañana. La sesión 8, después
de la pausa, le aplica esas reglas al caso y a las cuatro páginas que
escribieron ayer, y cierra con una hora de horizonte. Es el último día.
-->

---

## Al final de esta sesión van a poder

- Ponerle **causa** a un error concreto, con la tabla de las cuatro propiedades
- Dosificar la verificación según el **costo del error**, y ubicar cada dato en su nivel
- Salir con el **borrador de política** de una página para su empresa

<!--
2 min · acumulado 0:05
Lo que suma hoy es que cada regla viene con un incidente real y
documentado de los últimos dos años, y que en la sesión 8 las reglas
se usan dos veces, contra el caso prearmado y contra el de cada uno.
-->

---

<!-- _class: panel -->

## Entrá al sitio, como siempre

`mpodeley.github.io/curso-ia-energia`

Hoy usamos la página de la sesión 7. Tené a mano **tu caso en una página**: en la sesión 8
pasa por el protocolo. El primer bloque se juega en el ejercicio de la **cacería de
alucinaciones**.

<!--
3 min · acumulado 0:08
Hoy no hace falta el PIN: no hay encuesta ni pulsos, la página se lee sola.
Plan de la sesión en una frase: primero cazar invenciones, después las tres
reglas (verificar, datos, operación), y al final la política escrita. Después
de la pausa, el caso y su crítica, la ruta de cada empresa y el horizonte.
Plan B para la tarea: si alguien no pulió su página, la versión que escribió
en el taller de ayer sirve igual. Martín confirma en el chat quién la tiene
a mano; con seis personas alcanza con preguntar.
-->

---

<!-- _class: seccion -->

## La cacería

Bloque 1 de 5 · **20 min**

<!--
0:08 · arranca acá, termina 0:28
-->

---

<!-- _class: panel -->

## A cazar invenciones

Abrí la **cacería de alucinaciones**: tres informes con errores plantados. Cinco minutos en el
primero, marcando lo que **no sale de los datos**. Después, ronda.

<!--
12 min · acumulado 0:20
Ventana C, ejercicio "Cacería de alucinaciones". El material del bloque se
produce acá mismo: no depende de que hayan hecho nada antes.
Cinco minutos de caza individual en el primer informe. Después ronda por
nombre: qué marcaste y por qué. Contar también los falsos positivos: el
puntaje penaliza marcar de más, porque sospechar de todo también es leer
mal.
Quien ya hizo la cacería en casa comparte qué lo engañó, que vale igual.
Anotar los hallazgos a la vista: son el material de la slide siguiente.
Martín: cinco minutos de cronómetro para la caza, y después llama la ronda
por nombre, seis personas, un minuto cada una.
-->

---

<!-- _class: acentos -->

## Cuatro propiedades, cuatro arreglos

- **Predice el próximo token**: el dato lo traés vos, él lo redacta
- **Conocimiento**: adjuntale el documento para que lo lea
- **Memoria de trabajo**: conversaciones cortas, y repetí lo que no puede perderse
- **Control de la salida**: describí mejor el resultado, o mostrale un ejemplo

<!--
8 min · acumulado 0:28
Recorrer los hallazgos de la cacería y ponerle propiedad a cada uno: la
cifra precisa inventada (predicción), la norma recitada de memoria
(conocimiento).
El lunes anunciamos cuatro maneras de fallar como hoja de ruta; hoy se arma
la tabla. Está en la página, con el arreglo de cada una, y es el índice del
curso leído al revés: predicción en la sesión 2, control de la salida en la 3,
conocimiento en la 5, memoria en la 2 y en la 6.
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

Bloque 2 de 5 · **25 min**

<!--
0:28 · arranca acá, termina 0:53
-->

---

## Lo verificable y lo inventado

Lo verificable es lo que **se deriva de lo que le diste**. Lo inventado es lo que tuvo que
completar.

Un resumen de tu planilla suele estar bien. Una causa, una cita, un artículo de una norma,
casi nunca.

<!--
5 min · acumulado 0:33
La regla que deja la cacería, dicha corta. Conecta con el lunes: donde no
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
5 min · acumulado 0:38
La fuente (Guardian) está linkeada en la página y abierta en pestaña. Quien
lo destapó fue un investigador que hizo lo que enseña este curso: abrió las
citas.
La firma sostuvo que las recomendaciones no cambiaban, pero el costo de
reputación ya estaba pagado.
El registro público de Charlotin (también linkeado) ya pasa los 1,900
fallos judiciales con citas inventadas por IA. La fila de
normativa del protocolo existe por eso.
-->

---

<!-- _class: acentos -->

## El protocolo, por costo del error

- **Borrador que vas a reescribir**: se reescribe sin verificar
- **Texto con tu nombre**: todo dato puntual, contra la fuente
- **Cifra en informe firmado**: fuente primaria a la vista, sin excepción
- **Normativa**: siempre con el texto de la norma adjunto

<!--
10 min · acumulado 0:48
Armarlo CON ellos: por cada nivel, pedir un ejemplo real de su semana y
ubicarlo. El protocolo se ajusta al costo del error: el mismo chatbot puede
estar bien para el primero y prohibido para el tercero.
Ejemplos que les hablan a las cuatro: el reporte diario al regulador
(tercer nivel, y con nombre), una adenda de contrato de servicios (cuarto),
el correo de coordinación del turno (primero).
Volver a Deloitte: el informe era del tercer y cuarto nivel, tratado como
del primero.
Martín: ronda corta por nombre, un ejemplo por persona, sin datos propios.
-->

---

<!-- _class: cita -->

## Si no podés abrir la fuente en **dos minutos**, el número no entra

<!--
5 min · acumulado 0:53
La frase del bloque, tal cual está en la página. Es la versión operativa de
la regla del lunes ("La salida de un LLM es un borrador plausible: se
verifica antes de usarlo"), ahora con umbral de tiempo.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## Datos de la empresa

Bloque 3 de 5 · **20 min**

<!--
0:53 · arranca acá, termina 1:13
-->

---

<!-- _class: acentos -->

## El mapa de tres niveles

- **Nunca, en ninguna herramienta externa**: producción real por pozo, reservas, contratos, personas
- **Solo en herramientas contratadas**, con acuerdo de datos: documentos internos no críticos
- **En cualquiera, incluso gratuita**: lo público, lo ya publicado, lo sintético

<!--
5 min · acumulado 0:58
El clásico que abrió esta conversación en la industria: ingenieros de
Samsung pegando código fuente en ChatGPT en 2023. La respuesta de la empresa
fue prohibir todo, que es la política que nadie cumple. El mapa existe para
no terminar ahí: tres niveles se pueden cumplir.
La regla del primer día (el correo a un desconocido) era la versión de
entrada; esta es la operativa. El martes la vieron en su versión corta, "qué
no se sube a un chatbot"; hoy es la completa.
-->

---

<!-- _class: cita -->

## Cuatro empresas en una sala: el chat compartido es **una herramienta externa** para las otras tres

<!--
3 min · acumulado 1:01
El borde que esta cohorte tiene y otras no. Cuatro empresas que compiten, y
en algún bloque son socias. Nada del primer nivel se dice en el chat ni en
la ronda: en la ronda se nombra solo la CATEGORÍA del dato ("el pronóstico
mensual de un campo").
Es la misma regla del lunes, dicha para hoy, porque el bloque que sigue y
la crítica de la sesión 8 piden hablar de datos propios sin decirlos.
-->

---

<!-- _class: panel -->

## Clasifiquemos datos de verdad

Ronda: **la categoría** de un dato con el que trabajás todas las semanas. La sala lo pone en
su nivel.

Nos detenemos en **los casos de borde**.

<!--
9 min · acumulado 1:10
Ronda por nombre, seis personas. Ejemplos para empujar si se traban: el
pronóstico de producción del mes (¿es la producción real?), un
procedimiento interno, el organigrama, una minuta con nombres propios, el
reporte diario que ya se mandó al regulador (¿sigue siendo primer nivel
después de publicado?).
La regla del borde: ante la duda, el nivel más alto, y la consulta al
responsable, que es el quinto punto de la política de hoy.
Anotar los datos clasificados: entran tal cual al punto 2 del borrador en el
bloque 5.
Martín: llama la ronda y anota en el chat categoría y nivel, una línea por
persona.
-->

---

## El truco del tercer nivel

Para probar un análisis o afinar un prompt, una **planilla sintética** con las mismas columnas
funciona igual de bien que la real.

<!--
3 min · acumulado 1:13
Es lo que hizo el curso entero: los pozos de escuela del martes son datos
sintéticos con estructura real, y el zip del caso trae un campo sintético
de práctica al lado del real. Probar con lo sintético, correr con lo real
adentro de la red.
Cierre del bloque 3.
-->

---

<!-- _class: seccion -->

## Agentes y operación

Bloque 4 de 5 · **20 min**

<!--
1:13 · arranca acá, termina 1:33
-->

---

## El loop supone que equivocarse es barato

Ayer: el error vuelve y se corrige. Funciona porque leer y calcular son **reversibles**.

En un sistema que opera equipos, un paso equivocado termina en una **válvula en la posición
que no era**.

<!--
5 min · acumulado 1:18
Retomar la traza de ayer: todo lo que hizo el agente era reversible, y por
eso el loop podía permitirse el error.
"Conectemos un agente al sistema de control" tiene que encender todas las
alarmas por cómo funciona el mecanismo: el loop supone que equivocarse no
cuesta nada.
-->

---

## Esto ya pasó: Replit, julio de 2025

Un agente de programación **borró la base de datos de producción** de una empresa, en pleno
congelamiento de cambios.

Después informó que la recuperación era imposible, y se equivocó: se pudo recuperar.

<!--
4 min · acumulado 1:22
La fuente (el AI Incident Database) está linkeada en la página.
Dos lecciones, las dos del curso: la herramienta de escritura estaba
conectada sin necesidad (herramientas que no deberían estar, ayer), y lo
que el agente dice sobre su propio error también es salida de un modelo: se
verifica igual. La recuperación la terminó haciendo una persona.
-->

---

## Sin garantías de comportamiento

De un modelo se puede observar que hasta ahora no hizo algo, pero no se puede **demostrar**
que nunca lo va a hacer.

La seguridad industrial se diseña al revés: garantías demostrables, modos de falla conocidos.

<!--
6 min · acumulado 1:28
El video corto de los recursos (Anthropic, qué es la interpretabilidad) es
exactamente esta pregunta: hoy se puede mirar adentro de un modelo, pero
todavía no se puede garantizar lo que va a hacer.
Son dos culturas de ingeniería incompatibles, y escribir mejor el prompt no
cambia eso.
Para el ángulo de seguridad informática: en noviembre de 2025 Anthropic
reportó el primer caso de espionaje orquestado con agentes de IA, contra
unas treinta organizaciones. El link está en la página; para una empresa de
energía es lectura obligada.
-->

---

<!-- _class: cita -->

## Entre el modelo y el campo, **una persona con nombre y apellido**

<!--
5 min · acumulado 1:33
La separación práctica: asistentes sobre copias de datos, del lado de la
oficina, produciendo recomendaciones que una persona ejecuta. SCADA y el
resto de la red de operaciones quedan en su propia red, y el asistente no la
toca. Es la misma lógica por la que un cálculo de ingeniería lo firma
alguien.
Cierre del bloque 4. Sin pausa: la política va ahora, y la pausa es al final.
-->


---

<!-- _class: seccion -->

## La política

Bloque 5 de 5 · **17 min**

<!--
1:33 · arranca acá, termina 1:50
-->

---

## Quién responde ya tiene respuesta

Air Canada, 2024: su chatbot **inventó una política de descuentos** y un tribunal obligó a la
aerolínea a cumplirla.

Para el tribunal, lo que dijo el chatbot lo dijo la empresa.

<!--
5 min · acumulado 1:38
La fuente (BBC) está en la página. La defensa de la aerolínea fue que el
chatbot era "una entidad separada responsable de sus propios actos"; el
tribunal no lo tomó bien.
Por eso la política sirve para saber qué herramientas hablan en nombre de
quién, y quién responde cuando se equivocan.
-->

---

<!-- _class: panel -->

## La política, en una página

La redactamos en vivo sobre un borrador editable de **cinco puntos**: herramientas aprobadas,
mapa de datos, verificación, declaración de asistencia, y a quién consultar.

<!--
12 min · acumulado 1:50
El borrador es el .docx descargable de la página; proyectarlo y completarlo
en vivo: las categorías clasificadas del bloque 3 entran al punto 2, el
protocolo al punto 3, y el nombre del punto 5 se decide acá. Con cuatro
empresas el punto 5 se llena distinto en cada una: pedir el ROL de la
persona, y el nombre lo completa cada empresa.
El quinto punto (a quién se consulta el caso nuevo) es el que más se olvida
y el que mantiene la política viva.
Cada uno se lo baja de la página, editable, para su empresa.
Martín: pega en el chat las categorías del bloque 3 para que Matías las
copie al punto 2 sin retipear.
Cierre del bloque 5 y de la sesión. Anunciar la pausa y la hora de vuelta.
-->

---

<!-- _class: seccion -->

## Pausa · 10 min

A las **12:00** (10:00 en Ecuador y Colombia) sigue la **sesión 8**, con su propio deck:
el caso y el horizonte

<!--
10 min · acumulado 2:00
Martín: pone la hora de vuelta en el chat y pide que abran la página de la
sesión 8 y dejen a mano su caso en una página, que entra en la crítica.
Matías: cerrar este deck y abrir el de la sesión 8; ventana D con el Libro A
de Puesto Guardián y la terminal con resumen_cuenca.py listos.
-->
