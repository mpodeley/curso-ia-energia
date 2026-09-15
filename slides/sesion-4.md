---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Día 4**'
footer: 'mpodeley.github.io/curso-ia-energia'
---

<!-- _class: portada -->

# Riesgos, el caso y el horizonte

Día 4 de 4 · 4 h en vivo · **PCR · CGC · Tecpetrol · Andes Petroleum**

<!--
0:00 · portada mientras entra la gente
Ventanas de hoy: A este deck, C el sitio en el día 4, D el Libro A de
Puesto Guardián abierto en la planilla y la terminal con resumen_cuenca.py
listo, E las pestañas del bloque del futuro.
Sin pulsos hoy: el Worker está encendido pero este día no los usa.
Antes de clase: el borrador de la política (el .docx descargable de la
página, con corchetes para completar) abierto y listo; las fuentes de los
cinco incidentes abiertas en pestañas: Deloitte (Guardian), el registro de
Charlotin, Replit (AIID), Air Canada (BBC) y el reporte de espionaje de
Anthropic. Todas están linkeadas en la página.
Las pestañas del futuro abiertas y ya cargadas (Our World in Data, Epoch,
LifeArchitect, y los dos videos). Los videos van desde el navegador:
dejarlos arrancados unos segundos y pausados, para que el buffer esté
hecho, y el de Kosinski ya posicionado en el minuto 36. Al compartir
pantalla, tildar "compartir audio de la pestaña".
Martín: cronómetro en cero, la lista de las seis personas por empresa a
mano para las rondas, y el chat con la regla de siempre pegada: ningún dato
propio en el chat compartido.
-->

---

<!-- _class: agenda -->

## Hoy

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| Apertura | 8 min | Las ventanas del día y el caso de cada uno a mano |
| La cacería | 20 min | Invenciones cazadas en vivo, cada una con su causa |
| El protocolo | 25 min | Cuánto verificar según el costo del error |
| Datos de la empresa | 20 min | Datos reales en los tres niveles, y el borde entre cuatro empresas |
| Agentes y operación | 20 min | Donde el error no es reversible, el loop no sirve |
| Pausa | 10 min | |
| La política | 15 min | El borrador de una página, redactado en vivo |
| El caso, en vivo | 30 min | El screening recorrido de punta a punta sobre el Capítulo IV |
| La crítica: el caso y los cuatro de ustedes | 22 min | El protocolo aplicado al caso prearmado y a la página de cada empresa |
| Pausa | 10 min | |
| Hoja de ruta | 10 min | Mañana, noventa días, decisión corporativa |
| El futuro, en pantalla | 35 min | La frontera, los modelos locales, los riesgos |
| Cierre del curso | 15 min | Entender, lo que queda, y una cosa distinta para el lunes |

<!--
3 min · acumulado 0:03
La misma tabla está en la página del día 4.
Bajada del día, en tres partes. La primera mitad no tiene tema nuevo: hoy
se convierte todo lo que vieron en reglas que se aplican el lunes a la
mañana. La segunda es el caso, y esas reglas se le aplican al caso y a las
cuatro páginas que escribieron ayer. La última hora es levantar la vista, y
no es relleno: sin una idea de dónde va a estar la herramienta, el proyecto
se dimensiona contra la de hoy. Es el último día.
-->

---

## Al final de este día van a poder

- Ponerle **causa** a un error concreto, con la tabla de las cuatro propiedades
- Dosificar la verificación según el **costo del error**, y ubicar cada dato en su nivel
- Salir con el **borrador de política** de una página, y con su **caso criticado** con esas reglas
- Llevarse una **hoja de ruta** por empresa, y discutir el **futuro con datos**

<!--
2 min · acumulado 0:05
Lo nuevo de hoy no es contenido: es que cada regla viene con un incidente
real y documentado de los últimos dos años, y que las reglas se usan dos
veces, contra el caso prearmado y contra el de cada uno.
El bloque del futuro se anuncia como lo que es: especulación declarada. La
única regla es la del curso, separar el dato de la fe.
-->

---

<!-- _class: panel -->

## Entrá al sitio, como siempre

`mpodeley.github.io/curso-ia-energia`

Hoy usamos la página del día 4. Tené a mano **tu caso en una página**: en la crítica pasa
por el protocolo. El primer bloque se juega en el ejercicio de la **cacería de alucinaciones**.

<!--
3 min · acumulado 0:08
Hoy no hace falta el PIN: no hay encuesta ni pulsos, la página se lee sola.
Plan del día en una frase: primero cazar invenciones, después las tres
reglas (verificar, datos, operación), la política escrita, el caso y su
crítica, la ruta de cada empresa, y después una hora de horizonte.
Plan B para la tarea: si alguien no pulió su página, la versión que escribió
en el taller de ayer sirve igual. Martín confirma en el chat quién la tiene
a mano; con seis personas alcanza con preguntar.
-->

---

<!-- _class: seccion -->

## La cacería

Bloque 1 de 10 · **20 min**

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
puntaje penaliza marcar de más, y desconfiar de todo es otra forma de no
leer.
Quien ya hizo la cacería en casa comparte qué lo engañó, que vale igual.
Anotar los hallazgos a la vista: son el material de la slide siguiente.
Martín: cinco minutos de cronómetro para la caza, y después llama la ronda
por nombre, seis personas, un minuto cada una.
-->

---

<!-- _class: acentos -->

## Cuatro propiedades, cuatro arreglos

- **Predice el próximo token**: el dato lo traés vos, él lo redacta
- **Conocimiento**: adjuntale el documento, que lea en vez de recordar
- **Memoria de trabajo**: conversaciones cortas, y repetí lo que no puede perderse
- **Control de la salida**: describí mejor el resultado, o mostrale un ejemplo

<!--
8 min · acumulado 0:28
Recorrer los hallazgos de la cacería y ponerle propiedad a cada uno: la
cifra precisa inventada (predicción), la norma recitada de memoria
(conocimiento).
El lunes anunciamos cuatro maneras de fallar como hoja de ruta; hoy se arma
la tabla. Está en la página, con el arreglo de cada una, y es el índice del
curso leído al revés: predicción el día 1, control de la salida el día 2,
conocimiento el día 3, memoria los días 1 y 3.
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

Bloque 2 de 10 · **25 min**

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
10 min · acumulado 0:48
Armarlo CON ellos: por cada nivel, pedir un ejemplo real de su semana y
ubicarlo. El protocolo se ajusta al costo del error, no al tipo de
herramienta: el mismo chatbot puede estar bien para el primero y prohibido
para el tercero.
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
"borrador plausible, no fuente" del lunes, ahora con umbral de tiempo.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## Datos de la empresa

Bloque 3 de 10 · **20 min**

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
la ronda: la ronda se hace con la CATEGORÍA del dato ("el pronóstico
mensual de un campo"), nunca con el dato.
Es la misma regla del lunes, dicha para hoy, porque el bloque que sigue y
la crítica de la tarde piden hablar de datos propios sin decirlos.
-->

---

<!-- _class: panel -->

## Clasifiquemos datos de verdad

Ronda: **la categoría** de un dato con el que trabajás todas las semanas. La sala lo pone en
su nivel.

**Los casos de borde son el material.**

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

Bloque 4 de 10 · **20 min**

<!--
1:13 · arranca acá, termina 1:33
-->

---

## El loop supone que equivocarse es barato

Ayer: el error vuelve y se corrige. Funciona porque leer y calcular son **reversibles**.

En un sistema que opera equipos, un paso equivocado no vuelve como mensaje: vuelve como una
**válvula en la posición que no era**.

<!--
5 min · acumulado 1:18
Retomar la traza de ayer: todo lo que hizo el agente era reversible, y por
eso el loop podía permitirse el error.
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
4 min · acumulado 1:22
La fuente (el AI Incident Database) está linkeada en la página.
Dos lecciones, las dos del curso: la herramienta de escritura estaba
conectada sin necesidad (herramientas que no deberían estar, ayer), y lo
que el agente dice sobre su propio error también es salida de un modelo: se
verifica igual. La recuperación la terminó haciendo una persona.
-->

---

## Sin garantías de comportamiento

No se puede **demostrar** que un modelo nunca va a hacer algo. Se puede observar que hasta
ahora no lo hizo.

La seguridad industrial se diseña al revés: garantías demostrables, modos de falla conocidos.

<!--
6 min · acumulado 1:28
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
5 min · acumulado 1:33
La separación práctica: asistentes sobre copias de datos, del lado de la
oficina, produciendo recomendaciones que una persona ejecuta. SCADA y el
resto de la red de operaciones quedan en su propia red, y el asistente no la
toca. No es desconfianza en la tecnología: es la misma lógica por la que un
cálculo de ingeniería lo firma alguien.
Cierre del bloque 4. Anunciar la pausa y la hora de vuelta.
-->

---

<!-- _class: seccion -->

## Pausa · 10 min

Volvemos con **la política**

<!--
10 min · acumulado 1:43
Martín: pone la hora de vuelta en el chat y pide que dejen abierta la página
del día 4. Mientras tanto ordena las categorías de datos que anotó en el
bloque 3, porque entran al punto 2 del borrador en cuanto volvemos.
Matías: dejar el .docx de la política proyectado y en la pantalla correcta.
-->

---

<!-- _class: seccion -->

## La política

Bloque 5 de 10 · **15 min**

<!--
1:43 · arranca acá, termina 1:58
-->

---

## Quién responde ya tiene respuesta

Air Canada, 2024: su chatbot **inventó una política de descuentos** y un tribunal obligó a la
aerolínea a cumplirla.

Lo que tu herramienta dice, lo dijo tu empresa.

<!--
5 min · acumulado 1:48
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
10 min · acumulado 1:58
El borrador es el .docx descargable de la página; proyectarlo y completarlo
en vivo: las categorías clasificadas del bloque 3 entran al punto 2, el
protocolo al punto 3, y el nombre del punto 5 se decide acá. Con cuatro
empresas el punto 5 se llena distinto en cada una: pedir el ROL, no el
nombre.
El quinto punto (a quién se consulta el caso nuevo) es el que más se olvida
y el que mantiene la política viva.
Cada uno se lo baja de la página, editable, para su empresa.
Martín: pega en el chat las categorías del bloque 3 para que Matías las
copie al punto 2 sin retipear.
Cierre del bloque 5.
-->

---

<!-- _class: seccion -->

## El caso, en vivo

Bloque 6 de 10 · **30 min**

<!--
1:58 · arranca acá, termina 2:28
-->

---

## La pregunta es la de Pindo y la de Libertador

El **screening de waterflooding**: dónde conviene inyectar agua, o revisar la que ya se
inyecta. Un campo maduro con inyección, recobro por debajo del 30%, declinación y un contrato
con barriles y fecha.

Prearmado antes del curso, sobre datos públicos. Hoy se muestra y se critica.

<!--
4 min · acumulado 2:02
Decir de entrada qué es y qué no es: lo armó el instructor antes del curso,
con el mismo loop de agente de ayer, sobre datos públicos. No se construyó
con datos ni preguntas de ninguna de las cuatro empresas. Por eso se
critica, no se celebra.
La pregunta les habla a dos de las cuatro por su nombre: Pindo tiene 17
productores, 1 inyector y 3 reinyectores con recobro 28%; Libertador tiene
16 pozos en inyección secundaria. Todo público. Y a las otras dos les habla
por la ARCH: un pozo cerrado por alto corte de agua es un pozo sobre el que
alguien tiene que decidir algo.
El techo, fijado de antemano: screening con criterios, no simulación.
-->

---

## Dónde se puede correr de punta a punta

Argentina, porque el **Capítulo IV** publica producción e inyección pozo por pozo y mes por
mes.

**1,003 pozos · 88,093 registros mensuales · enero de 2019 a julio de 2026.**

El gancho ecuatoriano es la lista que extrajeron el martes: los pozos cerrados por **alto
corte de agua** en el reporte diario de la ARCH.

<!--
4 min · acumulado 2:06
Ventana D. Es el mismo conjunto de datos donde el agente de ayer trabajó en
vivo, ahora bajado entero: ocho años de archivos anuales, filtrados por
cuenca al vuelo.
Decir el precio: 2.5 GB de descarga y un script de sesenta líneas. Eso es
todo lo que hizo falta para tener el dato público.
La lista del martes es el principio de un screening, no el final: dice qué
pozos ya están fuera por agua, no qué hacer con el patrón.
-->

---

<!-- _class: panel -->

## Primer resultado, y no es el que esperábamos

De los **5.6 millones de m³** de agua inyectada en la cuenca, el 97.3% entra por pozos
**Sumidero**: disposición de agua producida, no recuperación secundaria.

Seis pozos figuran como inyección de agua en toda la cuenca. **Uno solo inyectó** algo en
91 meses.

<!--
6 min · acumulado 2:12
Este es el hallazgo del caso y conviene dejarlo respirar.
Correr resumen_cuenca.py en la ventana D: las tres tablas salen ahí, y son
las mismas de la página. 26 sumideros con 5.46 millones de m3, contra un
solo inyector con 154 mil. Preguntar a la sala qué diferencia hay entre los
dos, y dejar que lo contesten ellos: el sumidero se deshace del agua en una
formación que no produce; el inyector la mete en el reservorio para empujar
petróleo. La columna del dataset que los separa es tipopozo, y son dos
negocios distintos.
Consecuencia, dicha con precisión: la mitad "revisar la inyección que ya
existe" no se puede correr sobre este análogo, porque en el norte argentino
la recuperación secundaria está en pasado. Queda la otra mitad, que es la
que se corre hoy: dónde tendría sentido inyectar.
Martín: la pregunta va también al chat, para el que no quiera hablar.
-->

---

## El único que inyectó

**P.Gu. a-11**, en Puesto Guardián, Salta. Yacoraite, 154,484 m³ en siete años.

Estado en el registro: **parado transitoriamente**. Los otros cinco declarados están en cero,
tres de ellos abandonados.

<!--
3 min · acumulado 2:15
La segunda tabla de resumen_cuenca.py. El campo del caso se eligió por él:
es el único lugar de la cuenca donde el screening puede comparar un inyector
de verdad contra dos sumideros del mismo campo.
Y el cuadro completo, que es el de una cuenca madura: el inyector parado,
tres de los otros cinco abandonados, y la serie del campo cortada en julio
de 2025 mientras el resto de la cuenca llega a julio de 2026.
Decirlo sin dramatismo, porque es la lectura correcta y es la que les
importa a Pindo y a Libertador: un proyecto de recuperación secundaria tiene
un final. Así se ve un campo que ya lo transitó. Lo que queda después es
manejo de agua, y eso es lo que muestran los sumideros.
-->

---

<!-- _class: panel -->

## El flujo, de punta a punta

En vivo: los datos crudos, la conversión a unidades de campo, el Libro A, y los
diagnósticos que salen solos. Miren dónde interviene una persona.

<!--
8 min · acumulado 2:23
Ventana D, en orden:
1. El CSV crudo: idpozo, mes, metros cúbicos. Nadie piensa en metros cúbicos
   por mes; la herramienta piensa en barriles por día.
2. La conversión, que es donde se cuela el primer error posible: el tef de
   Capítulo IV cuenta días de PRODUCCIÓN, así que un inyector informa
   siempre cero. Cargado sin mirar eso, los inyectores desaparecen del
   libro y el screening se queda sin la mitad que le importa. Pasó acá, y lo
   agarró una persona contando filas, no el modelo.
3. El Libro A cargado: 8 pozos, 340 filas, 300 de yacoraite. La tercera
   tabla de la página es este campo, pozo por pozo.
4. Los diagnósticos: clasificador de Chan da DESPLAZAMIENTO NORMAL, la
   relación agua-petróleo termina en 10.38, y la pendiente de Hall mide al
   inyector.
Todo esto es Excel sin macros: se abre y anda.
-->

---

## El resultado, con honestidad

Lo que salió: declinación, firma de Chan, relación agua-petróleo, pendiente de Hall.

Lo que **no** salió: el índice de atractivo. Le falta el Nivel 2, y el Nivel 2 no está
en ninguna fuente pública.

<!--
5 min · acumulado 2:28
Mostrar la hoja de completitud de datos: el libro dice en la cara qué
porcentaje tiene y se niega a calcular el índice sin eso.
Y ese es el punto que vale para las cuatro: lo que traba el screening no es
la capacidad del modelo. Es la volumetría, los fluidos y la roca. Ningún
modelo nuevo los va a inventar, y ese Nivel 2 es primer nivel del mapa de
datos: corrido con datos propios, el libro viaja adentro de la red.
Decir el costo real: horas del instructor, y qué haría falta para repetirlo
adentro con datos propios.
Cierre del bloque 6.
-->

---

<!-- _class: seccion -->

## La crítica: el caso y los cuatro de ustedes

Bloque 7 de 10 · **22 min**

<!--
2:28 · arranca acá, termina 2:50
-->

---

<!-- _class: acentos -->

## El caso prearmado, por el protocolo

- **Dónde puede alucinar**: en la conversión y en el tiempo efectivo, no en las cifras
- **Qué dato no puede salir**: ninguno, es público; con datos propios, el Nivel 2 entero
- **Cómo se verifica**: la fuente abierta al lado, y un script que compara

<!--
6 min · acumulado 2:34
Las reglas de la mañana aplicadas al caso, una por una, con la tabla de la
página a la vista. Preguntar antes de contestar: ¿dónde le pondrían ustedes
la marca de "esto lo tuvo que completar"? La conversión de unidades y el
tef son las respuestas; cada número del libro sale de una fila del Capítulo
IV que se puede abrir.
Sobre el mapa de datos: el caso es público de punta a punta. Corrido con
datos propios, la volumetría y los fluidos son primer nivel y el libro no
sale de la red.
Martín: anota las objeciones en el chat; son el entregable del bloque.
-->

---

## El día que se equivoque

Si mañana el ranking se equivoca y **nadie lo nota**, ¿qué pasa?

Si esa respuesta es grave, el flujo necesita otro control antes de usarse.

<!--
4 min · acumulado 2:38
Aplicada al caso: el screening es una lista de dónde mirar primero, no una
decisión de inversión. El control que le sigue es el de siempre, la lupa del
reservorista antes de mover un peso.
Y el error concreto del caso sirve de ejemplo: el inyector que desaparecía
por una columna mal leída no daba error, daba un libro prolijo con la mitad
de los pozos. Los errores caros no se anuncian.
Esta pregunta es la tercera de la grilla que sigue: cada empresa se la hace
a su caso.
-->

---

<!-- _class: panel -->

## Los cuatro de ustedes

Ronda por empresa, **tres minutos** cada una, con la página de ayer y la misma grilla:
dónde puede alucinar, qué dato no puede salir, cómo se verifica.

Se lee la **estructura** del caso, no el dato.

<!--
12 min · acumulado 2:50
Cuatro empresas, tres minutos cada una: PCR, CGC, Tecpetrol, Andes. Donde
hay más de una persona por empresa, una presenta y la otra suma.
La grilla es la misma tabla de la página. La página de cada uno tiene
dolor, datos, sensibilidad, verificabilidad y primer paso; la crítica se
hace sobre la categoría del dato, nunca sobre el dato: nadie dice un
número de su empresa en la sala.
Plan B si alguna empresa no trae la página: dos minutos para escribir UNA
objeción a su propio caso de ayer, y se critica esa.
Lo que salga se anota: la crítica es lo que cada empresa se lleva para
reescribir el caso.
Martín: lleva el reloj, tres minutos exactos por empresa, avisa al minuto
dos, y llama a la siguiente. Anota una línea por empresa en el chat.
Cierre del bloque 7. Anunciar la pausa y la hora de vuelta.
-->

---

<!-- _class: seccion -->

## Pausa · 10 min

Volvemos con **la hoja de ruta**

<!--
10 min · acumulado 3:00
Martín: hora de vuelta en el chat, y deja armadas cuatro líneas vacías
("PCR / CGC / Tecpetrol / Andes") para que cada empresa pegue sus tres filas
de la hoja de ruta al volver.
Matías: chequear que las pestañas del futuro sigan cargadas y el audio de la
pestaña listo para el video.
-->

---

<!-- _class: seccion -->

## Hoja de ruta

Bloque 8 de 10 · **10 min**

<!--
3:00 · arranca acá, termina 3:10
-->

---

<!-- _class: acentos -->

## Tres horizontes

- **Mañana**: lo que ya pueden usar sin pedir permiso, con las reglas de hoy
- **Noventa días**: un piloto acotado, con dueño y criterio de éxito escrito
- **Decisión corporativa**: contratos, datos, presupuesto, y quién responde

<!--
3 min · acumulado 3:03
Ejemplos del propio curso para cada horizonte: borradores asistidos y triaje
de documentos (mañana); el cuaderno de ayer para el área, o un screening
como el de hoy con datos internos (noventa días); la herramienta contratada
con acuerdo de datos (decisión corporativa).
Dos advertencias, rápidas: un piloto sin criterio de éxito escrito no
termina nunca, se diluye. Y medir "horas ahorradas" es fácil de inflar;
rinde más contar cosas observables, informes con borrador asistido,
consultas resueltas sin interrumpir a nadie.
-->

---

<!-- _class: panel -->

## La armamos por empresa

Cada empresa: **una fila por horizonte**. Qué, quién, y cómo se mide. Al chat, y queda
anotada.

<!--
7 min · acumulado 3:10
Ronda por empresa, cuatro. Empujar hacia lo observable: no "usar más IA"
sino "los informes de turno salen con borrador asistido desde el lunes".
Las filas de todos van al chat: cada empresa se lleva la suya y ve las de
las demás, que es de donde salen las mejores ideas, y ninguna fila lleva un
dato propio.
El pase al bloque siguiente, y decirlo con estas palabras: esa fila de
noventa días se escribe contra la herramienta que va a existir a los noventa
días, no contra la de hoy. De eso va la última hora.
Martín: llama a las cuatro empresas en orden y confirma que las tres filas
de cada una quedaron pegadas.
Cierre del bloque 8.
-->

---

<!-- _class: seccion -->

## El futuro, en pantalla

Bloque 9 de 10 · **35 min**

<!--
3:10 · arranca acá, termina 3:45
-->

---

<!-- _class: acentos -->

## Por qué esto no es entretenimiento

Un proyecto dura. El que arranca **dentro de un mes** con el flujo de ese momento puede
terminar antes que el que arranca hoy.

Pero esperar tampoco es una estrategia: lo único que mejora solo es la **capacidad**.

<!--
4 min · acumulado 3:14
Primero el argumento incómodo: si tu proyecto lleva seis meses, la
herramienta con la que lo vas a terminar no es la que usaste para
dimensionarlo. La ventaja de haber salido primero se la come la diferencia
de herramienta.
Y enseguida la contracara, para que nadie se vaya con la excusa: los datos,
los permisos y los criterios no se construyen solos. La regla que sale de
las dos mitades: arrancá YA con lo que no se abarata (el mapa de datos, la
política, las preguntas de aceptación) y postergá lo que sí (la
construcción).
El caso lo probó: lo que faltaba no era modelo, era Nivel 2.
La vara del bloque, declarada: de acá en adelante es especulación con nombre
propio, para conversar. Las reglas de verificación valen también para los
pronósticos.
-->

---

<!-- _class: panel -->

## La frontera, en vivo

**ourworldindata.org/artificial-intelligence** · **epoch.ai/data**

Elegimos dos gráficos y los leemos como enseñó el curso: primero qué mide cada eje,
después la opinión.

<!--
8 min · acumulado 3:22
Pestañas abiertas de antes. Our World in Data tiene 35 gráficos y Epoch
once exploradores al día. Hoy alcanzan dos, no tres.
Recorrido: desempeño en pruebas contra la línea humana (años por debajo,
cruce, saturación), y demanda eléctrica de los centros de datos, que se
retoma al final del bloque. El cómputo de entrenamiento se nombra, no se
abre.
La advertencia honesta antes de opinar: un benchmark no es un puesto de
trabajo, y las pruebas se eligen porque se pueden medir. Aun así, la
pendiente es el dato.
Si preguntan por el largo de tarea que un agente completa, se duplica cada
siete meses y ya lo vieron ayer.
-->

---

<!-- _class: panel -->

## El mismo modelo, con cuerpo

**Gemini Robotics 2**, anuncio oficial de Google DeepMind. Tres minutos.

<!--
4 min · acumulado 3:26
Reproducir el video entero, tres minutos, desde la pestaña ya cargada, con
el audio de la pestaña compartido.
El comentario después, en dos frases: es el mismo tipo de modelo que redacta
un informe, moviendo un cuerpo completo. Y ahí la regla de la mañana vale
doble, porque en el mundo físico el error no vuelve como mensaje.
-->

---

<!-- _class: panel -->

## La frontera también se achica

Modelos abiertos que corren en **una máquina de escritorio**, sin mandar un byte afuera, hoy
rinden como los gigantes de hace dos años.

Para el mapa de datos de hoy eso cambia el tablero: el **primer nivel** puede tener asistente
adentro de la red.

<!--
3 min · acumulado 3:29
Contado, no mostrado. La experiencia propia sirve de anécdota: un modelo
abierto de 27 mil millones de parámetros corriendo en la máquina del
instructor, respondiendo sobre documentos que nunca salieron del disco.
Las familias abiertas chicas (Llama, Qwen, Gemma, Phi) son las de este
mundo. La brecha con la frontera sigue existiendo; la sorpresa es la
velocidad con la que lo de ayer se vuelve local.
Si alguna empresa quiere seguirla, es un proyecto de sistemas con el mapa de
datos como requisito, no un experimento de escritorio.
-->

---

## General, superinteligencia, y la máquina que diseña máquinas

**General**: al nivel de una persona competente en la mayoría de las tareas cognitivas.
**Superinteligencia**: por encima del mejor humano en casi todas.

La hipótesis que las conecta, I. J. Good (1965): una máquina que **diseña máquinas mejores**
dispara una explosión de inteligencia. Hoy, sin ciencia ficción: los laboratorios ya usan sus
modelos para construir los siguientes.

<!--
5 min · acumulado 3:34
Los dos términos, definidos, y la letra chica: no hay definición única, y
por eso se discute tanto si la primera ya llegó. El conteo de LifeArchitect
queda en la pestaña y en la página: se lee como pronóstico, mirando los
supuestos, no como consenso. Abrirlo solo si sobra tiempo.
Good era matemático, colega de Turing. El dato aterrizado: buena parte del
código de los laboratorios ya lo escriben sus propios modelos, y la curva
del largo de tarea es el indicador que más miran los que toman esta
hipótesis en serio.
Para la sala: con la definición de arriba, ¿cuánto falta? ¿Y si la
definición fuera "hace tu trabajo de hoy"?
-->

---

<!-- _class: panel -->

## El mail de cuatro puntos

Vos escribís cuatro puntos. Un modelo los estira a un mail cortés. Del otro lado, otro modelo
lo vuelve a **cuatro puntos**.

Pero quizás no los tuyos: **los que le importan al receptor**.

<!--
4 min · acumulado 3:38
El fragmento del video de Kosinski, psicólogo computacional de Stanford,
desde el minuto 36. Su hipótesis, presentada como lo que es: la
inteligencia artificial reemplaza el trabajo científico y la mayoría de los
usos prácticos del lenguaje.
Las preguntas para la sala: ¿para qué está el mail largo del medio?
¿desaparece el género "mail cortés"? ¿qué pasa cuando los dos modelos
negocian qué es lo importante?
Conectar con el martes: lo que era una herramienta de redacción empieza a
parecer un protocolo entre máquinas.
-->

---

## p(doom)

El número con el que el rubro resume su miedo: la probabilidad que le asignás a una
**catástrofe existencial** por inteligencia artificial.

Va de casi cero a casi seguro según a quién le preguntes. **La dispersión es el dato.**

<!--
3 min · acumulado 3:41
Nombres para la conversación, sin caricaturizar: pioneros que se volvieron
cautos (Hinton dejó Google para poder hablar de esto), gente que lo
considera manejable, gente que lo descarta. No hay consenso: hay apuestas
razonadas, y la página linkea el panorama.
La pregunta para la sala no es el número ajeno sino el propio: ¿te preocupa?
¿cambia algo de lo que hacés el lunes?
-->

---

## La nota optimista, con fuente

Machines of Loving Grace: la inteligencia artificial puede **comprimir décadas de progreso
científico** en años.

Y para esta industria: los centros de datos son **demanda eléctrica firme**, y buena parte de
esa electricidad es gas.

<!--
4 min · acumulado 3:45
El ensayo está linkeado en la página; el argumento fuerte es biología y
salud. Honestidad hasta en el optimismo: el mismo autor toma el riesgo en
serio. Optimismo y cautela no son bandos, son la misma persona.
El ángulo propio: volver al gráfico de demanda eléctrica de los centros de
datos que vimos al principio del bloque. Para una empresa de gas, el futuro
de la inteligencia artificial también es un mercado.
Sin mini ronda acá: la ronda del día es la del cierre. Cierre del bloque 9.
-->

---

<!-- _class: seccion -->

## Cierre del curso

Bloque 10 de 10 · **15 min**

<!--
3:45 · arranca acá, termina 4:00
-->

---

<!-- _class: acentos -->

## Lo que se llevan del curso

- La salida de un modelo es un **borrador plausible**: la verificación es tuya
- Delegá lo **digital, acotado y verificable**, con el mapa de datos en la mano
- Arrancá ya con **lo que no se abarata**: los datos, los permisos, los criterios

<!--
3 min · acumulado 3:48
Los cuatro días en tres frases. La tercera es la del bloque anterior y es la
más accionable: la capacidad mejora sola, tu mapa de datos no.
Las cuatro maneras de fallar quedaron cerradas: nombre, causa y arreglo
para cada una, más el protocolo para dosificar la desconfianza.
-->

---

## La última tarea: cine

| Ficción | Documental |
| --- | --- |
| **Memento** (2000) | AlphaGo (2017) |
| 2001, odisea del espacio (1968) | **The AI Doc** (2026) |
| Her (2013) | |
| Ex Machina (2014) | |
| Terminator (1984) | |

<!--
3 min · acumulado 3:51
La única tarea del curso sin plan B. Decirlo mitad en broma y mitad en
serio: después de estos cuatro días las van a ver distinto.
Memento es la que se explica, y es la mejor metáfora del curso: el
protagonista no forma memoria nueva, cada mañana arranca de cero y lo único
que sabe es lo que tiene tatuado encima. Un modelo de lenguaje es eso. Los
tatuajes son el contexto: los documentos que le pegás, lo que el buscador le
mete adentro antes de responder.
The AI Doc es el estreno de este año, del director de Navalny; avisar que
puede no estar disponible en la región todavía. Para esta noche, algo que sí
se puede ver ya: los ocho minutos de Bloomberg sobre la crisis del
directorio de OpenAI, en los recursos.
-->

---

<!-- _class: acentos -->

## Entender es el cuello de botella nuevo

Cuando la máquina hace el trabajo, le queda un trabajo más: **explicarlo**. Y a vos te queda
el de **entenderlo**.

No alcanza con aprobar lo que no entendés. Eso es el gerente que asiente.

<!--
4 min · acumulado 3:55
Fuente: Geoffrey Litt, "Understanding is the new bottleneck", julio de 2026,
linkeado en la página.
Su tesis, que es más filosa que "hay que seguirle el ritmo": la idea cómoda
es que si el agente se verifica solo, entender deja de hacer falta. Litt
dice lo contrario, y no por desconfianza: se entiende para PARTICIPAR. Sin
fluidez conceptual no podés intervenir, ni pedir la variante, ni ver la
opción que el modelo no consideró.
Su instrumento es un quiz de cinco preguntas después de cada explicación,
con una regla dura: no le manda código a nadie hasta que puede aprobarlo.
Trabajar y cursar a la vez.
Y acá el gancho: eso es lo que vinieron haciendo. Cuatro días, cuatro
quizzes. Están en cada página y no caducan.
El remate, con Alan Kay de fondo: la computación se pensó siempre como
aumento, no como reemplazo. No hace falta que nos saquemos del loop, también
podemos meternos más adentro.
-->

---

<!-- _class: panel -->

## Una cosa distinta, el lunes

Ronda de cierre, por nombre: **una sola cosa** que vas a hacer distinto el lunes, en una
frase.

<!--
4 min · acumulado 3:59
De viva voz, las seis personas. Pedirles que la peguen también en el chat:
ese puñado de frases es el mejor resumen posible del curso, escrito por
ellos.
Martín: llama la ronda por nombre y guarda el chat entero al terminar.
-->

---

<!-- _class: portada -->

# Gracias

El sitio queda abierto · **mpodeley.github.io/curso-ia-energia**

<!--
1 min · acumulado 4:00
Dejar proyectada mientras se despiden.
Después de clase: mandar por correo, a cada empresa por separado, su
política editable, sus tres filas de la hoja de ruta y la crítica de su
caso; a todos, las frases de la ronda final. El curso termina; el contacto
queda abierto.
-->
