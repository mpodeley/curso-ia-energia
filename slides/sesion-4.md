---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 4**'
footer: 'mpodeley.github.io/curso-ia-energia'
---

<!-- _class: portada -->

# Análisis asistido de datos

Sesión 4 de 8 · día 2 · 2 h en vivo · **PCR · CGC · Tecpetrol · Andes Petroleum**

<!--
0:00 · portada mientras vuelven de la pausa
Ventanas: A este deck, C el sitio en la página de la sesión 4, D el chatbot
del instructor, ya en Claude (Sonnet) con el CSV del Capítulo IV subido en la
pausa: corre código y genera el Excel y el artifact de la corrida grande. Los
alumnos siguen con el chatbot que tengan; el prompt trae el plan B para
cuentas que no escriben archivos.
En el escritorio, desde antes de la sesión 3: el CSV de 10 pozos
(descargas/produccion_noroeste_10pozos.csv), el reporte diario de la ARCH
del 15 de septiembre (descargas/arch-reporte-diario-2026-09-15.pdf, abierto
en un visor aparte), y scripts/_cache/dca_referencia.xlsx como referencia
del instructor.
Si un bloque corre corto: la corrida de Volve está lista para demo
(descargas/volve_diario_2pozos.csv, prompt en la página bajo "para
curiosos", referencia en volve_referencia.xlsx/png). El remate en una
frase: la presión nunca cayó, el agua subió a 94%, y Arps igual ajusta con
R² 0.96.
Martín: cronómetro en cero y el link a la página de la sesión 4 en el chat.
-->

---

<!-- _class: seccion -->

## La planilla y el copiloto

Bloque 1 de 5 · **30 min**

<!--
0:00 · arranca acá, termina 0:30
Retomar en dos minutos: la agenda y los objetivos de la sesión, sin ronda.
El resto del bloque es la demo.
-->

---

<!-- _class: agenda -->

## Esta sesión

| Bloque | min |
| --- | --- |
| La planilla y el copiloto | 30 |
| De PDF a tabla: el reporte diario de la ARCH | 35 |
| Pausa | 10 |
| Declinación en vivo | 25 |
| Qué se puede afirmar | 10 |
| Cierre y tarea | 10 |

<!--
1 min · acumulado 0:01
La misma tabla está en la página de la sesión 4.
Bajada: en la sesión 3 el modelo escribió texto y aprendimos a pedírselo
bien. Ahora le damos tablas y PDF, y para analizarlos escribe código: eso
cambia dónde puede fallar y dónde hay que mirar.
Una pausa de diez en el medio, marcada en la tabla. Martín la avisa.
-->

---

## Al final de la sesión van a poder

- Pedirle un análisis a un chatbot y **leer el código** que escribió para hacerlo
- Extraer una tabla del **reporte diario de la ARCH** y verificarla contra el original
- Ajustar una curva de declinación **sobre datos públicos de un pozo**

<!--
1 min · acumulado 0:02
Toda la sesión con datos públicos: el reporte diario de la Agencia de
Regulación y Control de Hidrocarburos de Ecuador y el Capítulo IV
argentino. Es la regla entre empresas de ayer, puesta en práctica: nadie
tiene que traer nada propio.
-->

---

## Ahora el modelo escribe código

Le das una tabla y le pedís un análisis. Para eso **escribe código, lo corre y te devuelve el
resultado**.

Cuando escribía un párrafo, el error se leía. Ahora el error se esconde detrás de un número que
parece razonable.

<!--
4 min · acumulado 0:06
El cambio de régimen de esta sesión, dicho antes de la demo para que sepan qué
mirar. Un filtro mal escrito devuelve menos filas y sigue, sin ningún
error. Esa es la diferencia con el texto, y la razón de las reglas que vienen
después de la demo.
Si preguntan por el costo de automatizar esto: la cuenta quedó en la sesión 3,
precio por token por mil corridas. La demo de hoy es gratis; el presupuesto
aparece con la automatización.
-->

---

<!-- _class: panel -->

## Demo: producción del Capítulo IV

Un año de producción real de la cuenca Noroeste, pozo por pozo. Miren qué le pido, qué código
escribe, y **dónde decido creerle**.

<!--
13 min · acumulado 0:19
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

## Pedí el código y leelo

- Pedile **siempre** que muestre el código junto con la respuesta
- Pedile que el código **informe cuántas filas** entran y cuántas quedan en cada filtro
- Comprobá **un caso a mano**, uno solo, que puedas rastrear en la planilla original

Si ese caso cierra, casi siempre cierra el resto. Si no cierra, el resultado no sirve y hay que
buscar el error.

<!--
8 min · acumulado 0:27
Las tres reglas de la sesión, sobre la demo fresca. Aplicarlas en vivo: elegir
un pozo del gráfico, pedirle al chatbot su serie, y comprobar UN mes contra
el CSV abierto en otra ventana. Que vean el gesto completo, de punta a
punta.
La regla de las filas, dicha completa porque el título solo no alcanza: las
filas las cuenta el chatbot. Se le pide que cada filtro del código imprima
cuántas filas recibió y cuántas dejó. Un filtro mal escrito se come filas en
silencio, sin tirar error, y el gráfico sale igual de lindo. Ejemplo
con el CSV de 10 pozos: 900 filas; "excluí los meses con menos de 10 días
efectivos" tiene que dejar 885. Si el conteo dice 400, el filtro quedó mal
escrito, y ningún gráfico lo iba a mostrar.
-->

---

<!-- _class: cita -->

## Un número que parece razonable también hay que **verificarlo**

<!--
3 min · acumulado 0:30
La frase del bloque. Es la misma regla del borrador plausible de ayer, ahora
para código: la salida tiene forma de análisis, y la garantía la pone la
verificación.
Cierre del bloque 1.
-->

---

<!-- _class: seccion -->

## De PDF a tabla: el reporte diario de la ARCH

Bloque 2 de 5 · **35 min**

<!--
0:30 · arranca acá, termina 1:05
-->

---

## Un PDF por día de operación

La Agencia de Regulación y Control de Hidrocarburos (ARCH) publica cada día hábil **una página**:
producción por compañía, por bloque público, estado de pozos, gas, y las novedades pozo por pozo.

Sacar esa tabla a mano lleva una tarde. Con el modelo, extraerla lleva un minuto, y a eso hay
que sumarle **la verificación**.

<!--
4 min · acumulado 0:34
Por qué este ejercicio es el más honesto del curso: es exactamente el flujo
que cualquiera de ellos haría el lunes con un dato que necesita, y muestra
que el costo real de la herramienta está en verificar lo que extrae.
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
8 min · acumulado 0:42
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
mezclaste con los bloques"). Iterar acá es normal, como vimos en la
sesión 3.
Martín: pega en el chat la tabla extraída, en texto, para que todos la
tengan a mano en el bloque siguiente.
-->

---

<!-- _class: panel -->

## Verifiquemos número por número

Se reparte: cada uno toma **dos o tres compañías** de la tabla extraída y compara sus cinco
números contra el PDF original. "Cierra" o "no cierra", por el chat.

<!--
10 min · acumulado 0:52
El mecanismo estrella de la sesión: 16 filas por 5 columnas son 80 números;
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
9 min · acumulado 1:01
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
tarea para curiosos, y el conteo se retoma en la sesión 8 con el caso de
recuperación secundaria.
-->

---

## Qué encontramos

Lo típico: casi todo cierra, y **algo no cierra**. Una coma decimal leída como punto de miles, dos
pozos pegados en uno, once pozos con nombres inventados.

El error de extracción no avisa, así que la verificación se hace siempre, número por número.

<!--
4 min · acumulado 1:05
Cerrar con lo que haya salido de verdad en la verificación. Si TODO cerró,
decirlo también: hoy cerró todo, y no había forma de saberlo sin mirar. La
confianza sale de haber verificado.
Una advertencia más para la serie de varios días: la columna "producción
anterior" de hoy no siempre coincide con la "producción del día" del
reporte de ayer (Andes: 23,816.18 en el del 15 contra 23,814.41 en el del
14). Los volúmenes son preliminares y se corrigen. Quien arme la serie
elige una columna y lo anota.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## Pausa · 10 min

Diez minutos. Seguimos con la declinación en vivo

<!--
10 min · acumulado 1:15
Martín: cronómetro de diez minutos en el chat y aviso a los dos minutos del
final. Guarda en el archivo de la sesión la tabla verificada y la lista de
"no cierra": son material de las sesiones 7 y 8.
Matías: mirar si la corrida grande de 10 pozos terminó. Si terminó, abrir el
Excel y dejar a la vista la hoja Resumen; si no, tener dca_referencia.xlsx
abierto como plan B. Abrir el laboratorio de declinación en la ventana C y
apretar "Reiniciar ejercicio".
-->

---

<!-- _class: seccion -->

## Declinación en vivo

Bloque 3 de 5 · **25 min**

<!--
1:15 · arranca acá, termina 1:40
-->

---

## De ayer a hoy

Ayer el pozo era de escuela: dos perillas y una respuesta exacta escondida.

Hoy: la **tercera perilla**, el eje logarítmico, la acumulada a 30 años, y **seis pozos reales**
de Aguaragüe, Ramos y Acambuco que nadie diseñó para que ajustaran.

<!--
4 min · acumulado 1:19
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
4 min · acumulado 1:23
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
8 min · acumulado 1:31
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
5 min · acumulado 1:36
Que lo intenten en su pantalla un par de minutos: la frustración es parte de
la lección. Después juntar hipótesis por el chat.
La respuesta honesta: la curva no lo dice. Un pozo que se rompió, una
intervención, un cambio de destino del gas; el dato de qué pasó no está en la
serie. Ese es el límite del método, y acá lo ven con sus propios ojos.
-->

---

## Lo que la curva no dice

**Arps describe un reservorio que se despresuriza solo, y ningún pozo real hace eso.** Lo que se
mide en boca es reservorio más compresión, más restricciones de planta, más contrapresión de
línea.

Un ajuste que cierra no prueba que entendiste la geología. La curva ordena la conversación y
acota un número; para cerrarla hacen falta otros datos.

<!--
4 min · acumulado 1:40
El párrafo serio de la sesión, el que separa esto de un tutorial. Un análisis
de verdad se hace sobre caudales corregidos por horas de operación y presión
de boca. En un campo con inyección de
agua, como Pindo o Libertador, la curva sola dice todavía menos: ahí manda
la presión, y eso es el "para curiosos" de Volve en la página.
COSECHA de la corrida sembrada en el bloque 1: abrir el Excel que devolvió
Claude. Dos miradas, no más: la fila de YPF.St.SP.x-1 tiene que decir "sin
ajuste" (el pozo que acaban de sufrir a mano: el prompt con reglas lo dice
solo), y el qi/declinación de un pozo que ajustaron a mano, comparado con lo
que dio la sala. Referencia del instructor: dca_referencia.xlsx. Si el
artifact salió, mostrarlo 30 segundos. Plan B si la corrida falló o quedó a
medias: abrir dca_referencia.xlsx y leer las mismas dos filas ahí.
La pregunta de discusión de la página cierra el bloque: en el pozo que no
ajusta, ¿qué información tenés vos que el modelo no puede tener? Vuelve en
todo el curso.
Cierre del bloque 3.
-->

---

<!-- _class: seccion -->

## Qué se puede afirmar

Bloque 4 de 5 · **10 min**

<!--
1:40 · arranca acá, termina 1:50
-->

---

## De los tres análisis de hoy

El gráfico del CSV, la tabla del reporte de la ARCH, el ajuste del pozo real. Una ronda: ¿cuál
**firmarías** con tu nombre, y cuál necesita más trabajo antes de circular?

<!--
10 min · acumulado 1:50
Martín: ronda directa por nombre, los seis. No hay respuesta única: el
punto es que expliciten el criterio. Las respuestas fuertes suenan a "firmo
la tabla porque la verificamos número por número; el ajuste no, porque no sé
qué pasó en ese pozo".
Empujar hacia la regla general: se firma lo que se verificó, al nivel al que
se verificó. Es el puente directo al protocolo de verificación de la sesión 7.
-->

---

<!-- _class: seccion -->

## Cierre y tarea

Bloque 5 de 5 · **10 min**

<!--
1:50 · arranca acá, termina 2:00
-->

---

<!-- _class: acentos -->

## Qué te llevás hoy

- **Escribile como a un analista nuevo** en su primer día: quién lo lee, qué decide, cómo lo quiere
- **Pedí el código y las filas**: que cada filtro diga cuántas recibió y cuántas dejó
- **Un caso a mano**: un número rastreado en el original; si cierra, casi siempre cierra el resto

<!--
3 min · acumulado 1:53
Tres prácticas, una de la sesión 3 y dos de esta. Son baratas, no piden
saber programar, y cazan la mayoría de los errores del trabajo asistido.
La contracara de la página de la sesión 3 ("intentá en serio", la cota de
Riemann) queda para quien la lea: el prompt fino controla la salida de todos los días, y la
verificación hace falta siempre.
-->

---

## Tarea para mañana

Dos cosas, cinco minutos. Tu prompt **antes y después**: el de una línea de hoy y el que
funcionó, uno debajo del otro.

Y un **documento de tu empresa** que consultás seguido y no es confidencial (manual, norma,
procedimiento), con **tres preguntas concretas** que le harías si pudieras preguntarle en vez de
buscar.

<!--
3 min · acumulado 1:56
El antes/después ya está medio hecho: el "antes" quedó en el chat del
taller. Insistir en traer los dos, porque la distancia entre uno y otro
muestra lo que aprendieron hoy.
Las preguntas, "concretas": "¿cada cuánto se calibra la válvula X?" es
concreta; "¿qué dice el manual?" es demasiado general. Mañana el documento y las preguntas van a un
cuaderno de verdad, así que la calidad de la pregunta se paga sola. No
confidencial: mañana ese documento se sube a una herramienta gratuita.
Plan B para mañana si pocos la hicieron: el cuaderno del rubro arranca con
documentos públicos (reglamentos, reportes del regulador) y las preguntas
se escriben en vivo en dos minutos.
-->

---

## Mañana: de la ingeniería de prompts a la **ingeniería de contexto**

El prompt que ve el modelo es tu pedido más todo lo que viaja con él. Hoy fueron tus archivos
adjuntos.

Mañana: los fragmentos recuperados de tus documentos en la sesión 5, y herramientas que
trabajan solas en la sesión 6.

<!--
3 min · acumulado 1:59
El término real del rubro: la ingeniería de prompts está dando lugar a la
ingeniería de contexto. Lo de hoy sigue valiendo: las piezas siguen siendo
la orden de trabajo, y alrededor crece todo lo que viaja con ella.
Ya lo vieron sin nombre: la ventana de contexto de ayer es el lugar donde
todo eso entra, y de donde se cae.
Dejar la palabra sembrada y no profundizar: mañana la llena de contenido
concreto, y en la sesión 8 llega el caso de recuperación secundaria, donde el
conteo de pozos cerrados por agua de hoy vuelve a aparecer.
El quiz, el constructor y el laboratorio quedan en la página, como siempre.
-->

---

<!-- _class: portada -->

# Nos vemos mañana

El quiz, el constructor y el laboratorio quedan en la página · **mpodeley.github.io/curso-ia-energia**

<!--
1 min · acumulado 2:00
Dejar proyectada mientras se despiden.
Después de clase: pasar en limpio la lista de tareas de la ronda, los
prompts del taller y la tabla verificada de la ARCH. La tabla y la lista de
pozos cerrados por agua vuelven en el caso de la sesión 8.
-->
