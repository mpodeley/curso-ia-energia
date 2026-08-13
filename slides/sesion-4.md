---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 4**'
footer: 'mpodeley.github.io/curso-energia-ypfb'
---

<!-- _class: portada -->

# IA + datos: análisis asistido

Sesión 4 de 8 · 2 h en vivo · **YPFB Andina**

<!--
0:00 · portada mientras entra la gente
Ventanas de hoy: A este deck, C el sitio en la sesión 4, D el chatbot del
instructor: Claude (Sonnet), que corre código y genera el Excel y el artifact
de la demo grande. Los alumnos siguen con Gemini o ChatGPT si su cuenta
gratuita no escribe archivos; el prompt trae el plan B. Sin pulsos ni
encuesta hoy.
Antes de clase, en el escritorio: un CSV de un año del Capítulo IV (cuenca
Noroeste, el link está en el material previo de la página), el CSV de 10
pozos de la página (descargas/produccion_noroeste_10pozos.csv), la rendición
pública de cuentas final 2025 de YPFB en PDF (también en el material previo;
abrirla en la página 8), y el scripts/_cache/dca_referencia.xlsx abierto
como referencia del instructor (regenerar con: python
scripts/dca_referencia.py).
Si un bloque corre corto: la corrida de Volve está lista para demo. El xlsx
en scripts/_cache/volve_production.xlsx, el prompt en la página (para
curiosos), la referencia en volve_referencia.xlsx/png (regenerar con:
python scripts/volve_referencia.py). El remate en una frase: la presión
nunca cayó, el agua subió a 94%, y Arps igual ajusta con R² 0.96.
-->

---

## Hoy

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| Apertura y entrada al sitio | 5 min | El PIN de siempre y las ventanas del día |
| Repaso de la tarea | 10 min | El antes y el después de sus prompts |
| La planilla y el copiloto | 30 min | Subimos producción real del Capítulo IV, pedimos análisis y leemos el código juntos |
| De PDF a tabla | 30 min | El pronóstico oficial de YPFB sacado de un PDF, verificado número por número entre todos |
| Declinación en vivo | 25 min | Pozos reales de Salta: ajustamos entre todos y discutimos qué no dice la curva |
| Qué se puede afirmar | 10 min | De los tres análisis: qué conclusión firmarías y cuál necesita más trabajo |
| Cierre y tarea | 10 min | La tarea de la sesión 5 |

<!--
2 min · acumulado 0:02
La misma tabla está en la página de la sesión 4.
Bajada del día: hasta ayer el modelo escribía texto. Hoy le damos tablas, y
para analizarlas escribe código y lo corre. Eso cambia dónde puede fallar y
dónde hay que mirar.
-->

---

## Al final de esta sesión van a poder

- Analizar un **CSV de producción** con el chatbot como copiloto
- Extraer datos de **PDFs oficiales** y verificarlos contra el original
- Ajustar una curva de declinación **sobre datos reales de un pozo**

<!--
1 min · acumulado 0:03
Todo el día con datos públicos: Capítulo IV argentino y boletines bolivianos.
Es la regla de confidencialidad de ayer, puesta en práctica.
-->

---

<!-- _class: panel -->

## Entrá al sitio, como ayer

`mpodeley.github.io/curso-energia-ypfb`

Hoy usamos la página de la sesión 4, y un chatbot que acepte archivos: vamos a darle de comer
planillas y PDFs.

<!--
2 min · acumulado 0:05
Dictar el PIN solo si hace falta. Avisar qué chatbot conviene para hoy: uno
que acepte archivos y corra código (Gemini o ChatGPT). El que tenga solo el
teléfono puede seguir las demos igual; el laboratorio de declinación corre en
cualquier navegador.
-->

---

<!-- _class: seccion -->

## Repaso de la tarea

Bloque 1 de 6 · **10 min**

<!--
Arranca 0:05, termina 0:15
-->

---

## El antes y el después

Una ronda: tu primer prompt, el que funcionó, y qué pieza hizo la diferencia.

<!--
10 min · acumulado 0:15
Ronda directa con nombre, dos o tres casos completos leídos en voz alta. La
pregunta que ordena: ¿qué pieza le agregaste entre el antes y el después?
Casi siempre la respuesta es contexto o formato: conectarlo con el "qué suele
faltar" de ayer.
Plan B si pocos la hicieron: tomar una tarea de la lista de ayer y armar el
antes/después en vivo, en tres minutos, entre todos.
-->

---

<!-- _class: seccion -->

## La planilla y el copiloto

Bloque 2 de 6 · **30 min**

<!--
Arranca 0:15, termina 0:45
-->

---

## Hoy el modelo escribe código

Le das una tabla y le pedís un análisis. Ya no genera solo prosa: **genera código, lo corre y te
devuelve el resultado**.

Cuando escribía un párrafo, el error se leía. Ahora el error se esconde detrás de un número que
parece razonable.

<!--
4 min · acumulado 0:19
El cambio de régimen del día, dicho antes de la demo para que sepan qué mirar.
Un filtro mal escrito no rompe nada: devuelve menos filas y sigue. Esa es la
diferencia con el texto, y la razón de las reglas que vienen después de la
demo.
Si preguntan por el costo de automatizar esto: la cuenta quedó ayer, precio
por token por mil corridas. La demo de hoy es gratis; el presupuesto aparece
con la automatización.
-->

---

<!-- _class: panel -->

## Demo: producción del Capítulo IV

Un año de producción real de la cuenca Noroeste, pozo por pozo. Miren qué le pido, qué código
escribe, y **dónde decido creerle**.

<!--
14 min · acumulado 0:33
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
dejarlo trabajando: se cosecha en el bloque 4. Decirlo en voz alta: "esto
queda corriendo, volvemos con la declinación".
-->

---

## Leé el código, no solo el resultado

- Pedile **siempre** que muestre el código, no solo la respuesta
- Pedile que el código **informe cuántas filas** entran y cuántas quedan en cada filtro
- Comprobá **un caso a mano**, uno solo, que puedas rastrear en la planilla original

Si ese caso cierra, casi siempre cierra el resto. Si no cierra, no hay nada más que discutir.

<!--
8 min · acumulado 0:41
Las tres reglas del día, sobre la demo fresca. Aplicarlas en vivo: elegir un
pozo del gráfico, pedirle al chatbot su serie, y comprobar UN mes contra el
CSV abierto en otra ventana. Que vean el gesto completo, no la teoría.
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
4 min · acumulado 0:45
La frase del bloque. Es la misma regla del borrador plausible de las sesiones
1 y 2, ahora para código: la salida viene con la forma de un análisis, no con
la garantía de uno.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## De PDF a tabla

Bloque 3 de 6 · **30 min**

<!--
Arranca 0:45, termina 1:15
-->

---

## El ejercicio boliviano

Los datos públicos de producción de Bolivia viven en **boletines en PDF**: YPFB y la Agencia
Nacional de Hidrocarburos (ANH) publican así.

Sacar esa tabla a mano es una tarde. Extraerla con el modelo es un minuto, más **la verificación**,
que es la parte que nadie cuenta.

<!--
4 min · acumulado 0:49
Por qué este ejercicio es el más honesto del curso: es exactamente el flujo
que cualquiera de ellos haría el lunes con un dato que necesita, y expone el
costo real de la herramienta, que no es extraer sino verificar.
Preguntar rápido: ¿qué dato de su área vive hoy atrapado en un PDF? (Es la
primera pregunta de discusión de la página; acá alcanza una mano levantada.)
-->

---

<!-- _class: panel -->

## Demo: del PDF a la tabla

La rendición pública de cuentas final 2025 de YPFB, real. Le pedimos la producción de gas y su
pronóstico oficial, en tabla, con las unidades.

<!--
12 min · acumulado 1:01
El PDF está en el material previo de la página (Rendición pública de cuentas
final 2025). Subirlo al chatbot. Prompt: "Extraé del gráfico de la página 8
la producción fiscalizada de gas 2006-2025 y el pronóstico 2026-2040.
Devolvelos como una tabla año-valor, con la unidad exacta del original."
Mientras extrae, abrir el PDF en otra ventana, en la página 8, y dejarlo a
la vista: la comparación visual ya muestra si la estructura vino bien.
Pedir una segunda pasada si hace falta ("te faltó la unidad", "esa serie
punteada es mercado interno, no la mezcles"). Iterar acá es normal: es la
conversación como método, de ayer.
Guardar la tabla extraída: el pronóstico oficial 2026-2040 ES una curva de
declinación (27.34 a 4.81 MMmcd), y si sobra tiempo en el bloque 4 la
pregunta es qué declinación anual implica (~12% nominal por año).
-->

---

<!-- _class: panel -->

## Verifiquemos número por número

Se reparte: cada uno toma **un tramo de años** de la tabla extraída y lo compara contra el PDF
original. "Cierra" o "no cierra", por el chat.

<!--
10 min · acumulado 1:11
El mecanismo estrella del día: 35 números entre cinco son siete por cabeza,
y la tabla queda verificada entera, con cada uno haciendo el gesto completo
con sus propios ojos. Asignar los tramos por nombre para que nadie espere.
Pegar el PDF y la tabla extraída en el chat si alguien no puede abrir el
archivo.
Anotar los "no cierra" a la vista y revisarlos juntos: ¿fue un dígito
bailado, un año corrido, la serie punteada del mercado interno tomada como
producción?
-->

---

## Qué encontramos

Lo típico: casi todo cierra, y **algo no cierra**. Un dígito bailado, un año corrido de lugar,
una serie tomada por otra.

El error de extracción no avisa. Por eso la verificación no es opcional, y por eso se hace
número por número.

<!--
4 min · acumulado 1:15
Cerrar con lo que haya salido de verdad en la verificación. Si TODO cerró,
decirlo también: hoy cerró todo, y no había forma de saberlo sin mirar. La
confianza sale de la verificación, no de la herramienta.
Cierre del bloque 3.
-->

---

<!-- _class: seccion -->

## Declinación en vivo

Bloque 4 de 6 · **25 min**

<!--
Arranca 1:15, termina 1:40
-->

---

## De la sesión 1 a hoy

En la sesión 1 el pozo era de escuela: dos perillas y una respuesta exacta escondida.

Hoy: la **tercera perilla**, el eje logarítmico, la acumulada a 30 años, y **seis pozos reales**
de Aguaragüe, Ramos y Acambuco que nadie diseñó para que ajustaran.

<!--
4 min · acumulado 1:19
El puente: mismos reservorios del subandino que se producen del lado
boliviano (huamampampa, tupambi, icla, santa rosa), producción mensual
declarada al Estado argentino, sin retocar.
La tercera perilla es b, la curvatura: en la sesión 1 estaba clavada en cero
y nadie lo notó. Hoy se mueve.
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
todos y las decisiones se discuten mientras pasan.
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
4 min · acumulado 1:40
El párrafo serio del día, el que separa esto de un tutorial. Un análisis de
verdad se hace sobre caudales corregidos por horas de operación y presión de
boca, no sobre el volumen mensual crudo.
COSECHA de la corrida sembrada en el bloque 2: abrir el Excel que devolvió
Claude. Dos miradas, no más: la fila de YPF.St.SP.x-1 tiene que decir "sin
ajuste" (el pozo que acaban de sufrir a mano: el prompt con reglas lo dice
solo), y el qi/declinación de un pozo que ajustaron a mano, comparado con lo
que dio la sala. Referencia del instructor: dca_referencia.xlsx. Si el
artifact salió, mostrarlo 30 segundos. Plan B si la corrida falló o quedó a
medias: abrir dca_referencia.xlsx y leer las mismas dos filas ahí.
La pregunta de discusión de la página lo remata: en el pozo que no ajusta,
¿qué información tenés vos que el modelo no puede tener? Esa pregunta es el
resumen del curso entero.
Cierre del bloque 4.
-->

---

<!-- _class: seccion -->

## Qué se puede afirmar

Bloque 5 de 6 · **10 min**

<!--
Arranca 1:40, termina 1:50
-->

---

## De los tres análisis de hoy

El gráfico del CSV, la tabla del boletín, el ajuste del pozo real. Una ronda: ¿cuál
**firmarías** con tu nombre, y cuál necesita más trabajo antes de circular?

<!--
10 min · acumulado 1:50
Ronda directa con nombre. No hay respuesta única: el punto es que expliciten
el criterio. Las respuestas fuertes suenan a "firmo la tabla porque la
verificamos número por número; el ajuste no, porque no sé qué pasó en ese
pozo".
Empujar hacia la regla general: se firma lo que se verificó, al nivel al que
se verificó. Es el puente directo al protocolo de la sesión 7.
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

## Qué te llevás hoy

- **Pedí el código**, no solo el resultado
- **Pedí las filas**: que cada filtro diga cuántas recibió y cuántas dejó
- **Un caso a mano**: si ese cierra, casi siempre cierra el resto

<!--
3 min · acumulado 1:53
Las tres reglas del día, ahora con las tres demos atrás. Son baratas, no
piden saber programar, y cazan la mayoría de los errores de análisis
asistido.
-->

---

## Tarea para la sesión 5

Pensá en un conjunto de **documentos de tu trabajo** que consultás seguido y no son
confidenciales: manuales, normas, procedimientos.

Anotá **tres preguntas concretas** que le harías a ese conjunto si pudieras preguntarle en vez
de buscar. Cinco minutos. Mañana las usamos, literalmente.

<!--
3 min · acumulado 1:56
Insistir en "concretas": "¿cada cuánto se calibra la válvula X?" sirve;
"¿qué dice el manual?" no. Mañana esas preguntas se le hacen a un sistema de
verdad, así que la calidad de la pregunta se paga sola.
-->

---

## La sesión 5: tu conocimiento + LLMs

- Por qué el modelo **no leyó tus documentos**, y cómo se cierra ese hueco
- **NotebookLM**: preguntarle a tus manuales, con citas
- Y elegimos entre todos el **caso real** que se construye para la sesión 8

<!--
3 min · acumulado 1:59
Mañana cae la última de las cuatro maneras de fallar, y además se elige el
caso: la sesión más importante del arco del relevamiento.
El laboratorio y el quiz quedan en la página, como siempre.
-->

---

<!-- _class: portada -->

# Nos vemos mañana

El quiz y el laboratorio quedan en la página · **mpodeley.github.io/curso-energia-ypfb**

<!--
1 min · acumulado 2:00
Dejar proyectada mientras se despiden.
Después de clase: armar la shortlist del caso real con la encuesta, la lista
de tareas de ayer y lo que salió hoy; mañana se presenta.
-->
