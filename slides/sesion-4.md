---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 4**'
footer: 'mpodeley.github.io/curso-ia-energia'
---

<!-- _class: portada -->

# Tus documentos: RAG y Gemini Notebook (antes NotebookLM)

Sesión 4 de 8 · día 2: datos y documentos, con el chatbot trabajando · 2 h en vivo · **PCR · CGC · Tecpetrol · Andes Petroleum**

<!--
0:00 · portada mientras vuelven de la pausa
Ventanas de esta sesión: A este deck, C el sitio en la página de la sesión 4,
D Gemini Notebook (notebook.google.com) con la cuenta del curso.
Antes de clase, en la ventana D, dos cuadernos:
1) "Reservas (en vivo)", vacío: se arma delante de la sala. En el escritorio,
   los cinco PDF bajados (PRMS 2018 en español, guía de aplicación 2011,
   reglamento de Ecuador, Resolución ANH 0895, IRR 2025) y un archivo de texto
   con las dos direcciones web: el texto ACTUALIZADO de la 324/2006
   (argentina.gob.ar/normativa/nacional/norma-114769/actualizacion) y la
   69-E/2016 (.../norma-267420/texto). Tener a mano también la dirección del
   texto ORIGINAL de la 324 (.../norma-114769/texto), para el bloque 5.
2) "Reservas (preparado)", con las mismas siete fuentes y tres piezas ya
   generadas: un resumen en video Corto en español (tarda, a veces más de 30
   minutos), un resumen en audio formato Resumen en español de Latinoamérica y
   una tabla de datos con la pregunta 5. Es el plan B si algo no carga en vivo.
Apoyo: cronómetro en cero, chat abierto, lista de asistencia por nombre y
empresa a la vista para llamar las rondas.
-->

---

<!-- _class: seccion -->

## De la planilla a los documentos

Bloque 1 de 8 · **10 min**

<!--
0:00 · arranca el bloque, termina 0:10
-->

---

<!-- _class: agenda -->

## Esta sesión

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| De la planilla a los documentos | 10 min | El puente con la mañana, las ventanas de la sesión y una pregunta a la sala por el chat |
| Por qué no sabe lo tuyo | 12 min | El hueco, las dos formas de cerrarlo, y qué significa "parecido" para un modelo |
| Buscar por significado | 13 min | Las dos búsquedas del ejercicio, y el prompt aumentado que se le manda al modelo |
| El cuaderno de reservas y regulación | 25 min | Armamos en vivo un cuaderno con el estándar internacional de reservas y las normas de los tres países, y lo interrogamos abriendo cada cita |
| Pausa | 10 min | A las 13:00 de Argentina (11:00 de Ecuador y Colombia) |
| Cuando la cita miente | 10 min | Una pregunta sin respuesta en las fuentes y una norma bien citada en su versión vieja |
| Tu cuaderno, sin traer nada | 20 min | Cada uno elige un documento público del menú, arma su cuaderno y le hace dos preguntas |
| Las cosas lindas del cuaderno | 14 min | Audio, video, mapa, tabla, infografía y presentación: cada uno genera una sola pieza y la verifica |
| Cierre y tarea | 6 min | Tres prácticas, qué discutir y la tarea de cinco minutos para el taller de agentes |

<!--
2 min · acumulado 0:02
La misma tabla está en la página de la sesión 4.
Bajada: a la mañana el chatbot trabajó con una planilla; ahora, con
documentos. La pausa va en el medio, a las 13:00 de Argentina.
Decirlo una vez: no hace falta traer nada. Todo lo que usamos es público y
lo armamos acá.
-->

---

## Esta mañana, una planilla. Ahora, documentos

Con el CSV, el dato estaba **entero adelante**: el chatbot lo leyó, corrió la cuenta y devolvió un
Excel que se puede revisar.

Un reglamento de 84 páginas funciona distinto. La respuesta está en **un párrafo del medio**,
escrita con otras palabras que las de tu pregunta.

<!--
3 min · acumulado 0:05
El puente con la sesión 3, en dos frases. La pregunta de hoy: cómo llega una
herramienta a ese párrafo, y cómo verificamos que llegó al correcto.
Pregunta a la sala, por el chat, una línea: "¿qué documento de tu trabajo
abrís todos los meses para buscar un párrafo?" El tipo de documento, sin
nombrar la empresa ni el contenido.
Apoyo: leer en voz alta dos o tres respuestas, con nombre. Se retoman en
"Para discutir".
-->

---

## Al final de esta sesión van a poder

- Entender la intuición de **RAG**: buscar, traer, responder con cita
- Armar un **cuaderno gratuito** con el PRMS y las normas de reservas de Ecuador, Colombia y Argentina
- Abrir cada cita y juzgar si el fragmento **responde la pregunta** o solo queda cerca

<!--
2 min · acumulado 0:07
Los tres objetivos, iguales a los de la página. El PRMS es el Sistema de
Gerencia de los Recursos de Petróleo de la SPE: decirlo con todas las letras
la primera vez. La tercera es la regla del curso aplicada a las citas: lo que
verifica es abrir la cita y leer el fragmento.
-->

---

<!-- _class: panel -->

## Entrá al sitio, en la sesión 4

`mpodeley.github.io/curso-ia-energia`

Los dos ejercicios de hoy están en esa página. No hace falta traer nada.

<!--
3 min · acumulado 0:10
Apoyo: confirmar por el chat que los seis entraron a la página de la sesión
4; al que no, ayuda por privado. Pedir también que abran notebook.google.com
con una cuenta personal de Google, para descubrir ahora si la red o la
cuenta corporativa lo bloquean, y no en el bloque 6.
Cierre del bloque 1.
-->

---

<!-- _class: seccion -->

## Por qué no sabe lo tuyo

Bloque 2 de 8 · **12 min**

<!--
0:10 · arranca el bloque, termina 0:22
-->

---

## El modelo no leyó tus documentos

Leyó una fracción enorme de internet. **No leyó tu manual de operaciones**, ni tus normas, ni el
informe que escribió tu compañero el mes pasado.

Preguntarle sobre eso es pedirle la continuación más plausible, que termina en una respuesta
inventada con tono seguro.

<!--
4 min · acumulado 0:14
Conectar con la mecánica de la sesión 2 sin reabrirla: cuando no sabe algo,
lo inventa, y lo de ustedes no lo sabe. El PRMS quizás lo leyó; el
procedimiento interno de su campo, seguro que no.
-->

---

## Dos formas de cerrar el hueco

**Reentrenar** el modelo con tus documentos: caro, lento, casi siempre innecesario.

**Traerle el documento**: buscar los fragmentos que responden la pregunta y pegarlos arriba de
la pregunta. El modelo responde con el libro abierto.

<!--
3 min · acumulado 0:17
La segunda es la que usa todo el mundo y la que vemos hoy. El nombre técnico
es generación aumentada por recuperación (RAG), y una vez que la ven
funcionar deja de parecer sofisticada: es un buscador más un pegado.
Para buscar el fragmento correcto hace falta buscar por significado, y para
eso hay que poder medir "parecido". Eso es lo que sigue.
-->

---

<!-- _class: panel -->

## Qué significa "parecido" para un modelo

Abrí el **mapa de significados** en la página. Clickeá términos y mirá qué le queda cerca.
Buscá la familia de jerga: "burro", "araña", "pescado", "camisa".

<!--
5 min · acumulado 0:22
Ventana C, ejercicio "El mapa de significados". Cada texto convertido en una
lista de números; textos parecidos, listas parecidas; el mapa es esa lista
proyectada a un plano.
Detenerse en la jerga: el modelo aprendió "burro" y "araña" del lenguaje
corriente, así que las ubica con los objetos cotidianos, lejos del
equipamiento del yacimiento. Dejar que lo encuentren ellos clickeando; pedir
por el chat una palabra de jerga de cada país que el mapa no tenga.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## Buscar por significado

Bloque 3 de 8 · **13 min**

<!--
0:22 · arranca el bloque, termina 0:35
-->

---

<!-- _class: panel -->

## Dos formas de buscar, mismo manual

El segundo ejercicio: un manual interno que ningún modelo pudo haber leído. Probá las
preguntas que **no comparten ninguna palabra** con su respuesta.

<!--
7 min · acumulado 0:29
Ventana C, ejercicio "Buscar en tus documentos". El corpus es inventado a
propósito: un documento público real podría haber estado en el entrenamiento
y la demo no probaría nada.
Las dos preguntas estrella: la de evitar que alguien arranque el equipo
mientras lo reparás (la responde "bloqueo y etiquetado") y la de cuidarse los
oídos ("protección auditiva"). El buscador de palabras no tiene con qué
encontrarlas y el de significado sí.
Apoyo: que comparen los dos modos en su pantalla y canten por el chat qué
pregunta rompió al buscador de palabras.
-->

---

## El prompt aumentado

Mirá el bloque del final del ejercicio: es **todo lo que se le manda al modelo**, los fragmentos
encontrados pegados arriba de tu pregunta.

<!--
3 min · acumulado 0:32
Desmitificar del todo: el botón "Copiar prompt aumentado" muestra que RAG es
un prompt largo con los fragmentos adelante. Toda la sofisticación está en
encontrar el fragmento correcto; el resto es el mismo chatbot de siempre.
Gemini Notebook, que viene ahora, hace esto mismo con interfaz: busca, pega
y responde con números de cita.
-->

---

<!-- _class: cita -->

## RAG es responder **con el libro abierto**

<!--
3 min · acumulado 0:35
La frase del bloque. Y la letra chica que abre el bloque siguiente: con el
libro abierto igual hay que mirar qué página trajo.
Cierre del bloque 3.
-->

---

<!-- _class: seccion -->

## El cuaderno de reservas y regulación

Bloque 4 de 8 · **25 min**

<!--
0:35 · arranca el bloque, termina 1:00
-->

---

<!-- _class: panel -->

## Armamos el cuaderno

- **PRMS 2018** en español, de la SPE, y su **guía de aplicación** de 2011, en inglés
- **Ecuador**: el Reglamento de Operaciones Hidrocarburíferas, artículo 22
- **Colombia**: la Resolución 0895 de la ANH y el Informe de Recursos y Reservas 2025
- **Argentina**: la Resolución 324/2006 actualizada y la 69-E/2016

<!--
6 min · acumulado 0:41
Ventana D, cuaderno "Reservas (en vivo)". Subir los cinco PDF y pegar las dos
direcciones web; narrar lo que hace: procesa, arma la lista de fuentes y
ofrece un resumen. Tamaños: PRMS 65 páginas, guía 222, reglamento 84 (191
artículos), 0895 19, IRR 36 láminas.
Decir por qué estos: el PRMS es el estándar con el que se clasifican
reservas en los tres países; el resto dice cómo se reporta en cada uno. La
guía es de 2011 y comenta la versión 2007 del PRMS: dos versiones en el mismo
cuaderno, y el cuaderno no lo avisa.
Decir en voz alta el mapeo: es el mismo circuito del ejercicio anterior, con
interfaz. Buscar por significado, libro abierto, cita.
Si algo no carga en vivo (un PDF pesado, una red que bloquea
argentina.gob.ar), pasar al cuaderno "Reservas (preparado)" sin perder tiempo.
Las preguntas de las cinco láminas que siguen están en la página: se pueden
seguir desde ahí.
-->

---

## Pregunta 1: reserva o recurso contingente

"¿Qué diferencia hay entre una reserva y un recurso contingente, y qué tiene que pasar para que un
recurso contingente pase a ser reserva?"

Mirá **de cuál de los dos documentos del PRMS** sale cada parte.

<!--
4 min · acumulado 0:45
Antes de preguntar, predicción rápida a la sala: ¿de qué documento va a
sacar la respuesta?
Clave. PRMS 2018 en español, sección 1.1.0.6, A y B (PDF págs. 7 y 8,
impresas 2 y 3). Reservas: cantidades anticipadas a ser comercialmente
recuperables, con proyectos de desarrollo, en acumulaciones conocidas, desde
una fecha dada y bajo condiciones definidas; cuatro criterios: descubiertas,
recuperables, comerciales y remanentes. Recursos contingentes: potencialmente
recuperables de acumulaciones conocidas, que hoy no se consideran comerciales
por una o más contingencias.
Para pasar a reserva, sección 2.1.2.1 (PDF pág. 11, impresa 6): firme
intención de desarrollar y siete criterios, de la A a la G (plan de
desarrollo técnicamente maduro, financiamiento, plazo razonable, retornos
positivos, mercado, instalaciones, aprobaciones). La 2.1.2.3 (PDF pág. 12)
recomienda cinco años como referencia de plazo.
Si cita la guía de 2011 (sección 2.3, pág. 11): el camino inverso, de reserva
a contingente, "should be a rare event". Mostrar que cita en inglés y
contesta en español.
Apoyo: anotar en el archivo a la vista qué documento citó.
-->

---

## Pregunta 2: Ecuador, plazo y certificación

"En Ecuador, ¿hasta qué fecha se presentan las reservas de cada año, y quién las tiene que
certificar?"

Leé el artículo citado **entero**: la respuesta tiene una segunda mitad.

<!--
3 min · acumulado 0:48
Clave. Reglamento de Operaciones Hidrocarburíferas, artículo 22 (PDF pág. 9;
al pie dice "Página 8 de 82"). Corte al 31 de diciembre; los sujetos de
control presentan "hasta el treinta y uno (31) de enero del siguiente año" el
informe y el cálculo actualizado. Los estudios que certifican "deben ser
efectuados por los Sujetos de Control a través de compañías independientes o
de acuerdo a lo establecido en el instructivo emitido por el Ministerio del
Ramo". El Ministerio fija las cifras oficiales; el informe final va a la
Agencia de Regulación y Control en 15 días desde su conformidad.
La trampa fina: si el cuaderno dice "siempre compañías independientes", se
comió el "o de acuerdo al instructivo". Leer la frase en voz alta.
Dato de regalo: la Disposición General Primera (PDF pág. 66) nombra el PRMS
para amortizar inversiones con reservas probadas P1.
-->

---

## Pregunta 3: Colombia y el PRMS

"¿Cómo se relaciona la Resolución 0895 de la ANH con el PRMS? ¿Qué toma de él y qué le agrega?"

Poné **el fragmento de la resolución al lado del fragmento del PRMS**.

<!--
4 min · acumulado 0:52
Clave. Resolución 0895, artículo 2 (pág. 4): el sistema de valoración es el
PRMS "que se encuentre vigente", adoptado por el Acuerdo 11 de 2008; el Anexo 1
(pág. 13) dice que aplican en su totalidad las definiciones del PRMS.
Artículo 2, parágrafo 2 (págs. 5 y 6): copia los criterios A a G de la
sección 2.1.2.1 del PRMS 2018, y la cita. Si el cuaderno los pone lado a
lado, es el mejor momento de la sesión: mostrarlo.
Lo que agrega: parágrafo 5 (pág. 6), reservas que llevan cinco años sin
desarrollarse, sin revisión y soporte documentado, pasan a recursos
contingentes (el PRMS da cinco años solo como referencia). Artículo 3 (págs.
6 y 7): certificación externa si las probadas del campo son de un millón de
barriles equivalentes o más, con el mismo certificador cinco años seguidos
como máximo. Artículo 5, parágrafo 1 (pág. 8): Brent promedio del primer día
de los doce meses, descuento del 10%, antes del impuesto de renta.
El IRR 2025 (pág. 5) dice que cumple "con la Res. 0895/2025 y PRMS 2018".
-->

---

## Pregunta 4: Argentina y la reserva comprobada

"¿Cómo define la norma argentina una reserva comprobada? ¿Cita el PRMS?"

Fijate **qué organizaciones nombra** la norma, y de qué año.

<!--
4 min · acumulado 0:56
Clave. Resolución 324/2006, texto actualizado, Anexo I-A (sustituido por la
69-E/2016), punto II.3: "aquellas reservas de hidrocarburos que de acuerdo al
análisis de datos geológicos y de ingeniería, pueden ser estimadas con
razonable certeza sobre la base de ser comercialmente recuperables de
reservorios conocidos, a partir de una fecha dada"; con métodos
probabilísticos, al menos 90% de probabilidad.
No nombra el PRMS: dice que las definiciones salen de la "unificación de
criterios aprobados por la SPE y el WPC" y, desde febrero de 2000, la AAPG
(antecesores del PRMS). La definición de reservas de 2016 (II.2) sí usa
lenguaje del PRMS: descubiertas, recuperables, comerciales y remanentes, y
cinco años como plazo razonable.
Comparar con el PRMS 2018, 2.2.2.8 A (PDF pág. 18): la misma "certeza
razonable" y el mismo 90%. Bien si dice "no lo cita por nombre"; mal si dice
"adopta el PRMS".
-->

---

## Pregunta 5: los tres países en una tabla

"Armá una tabla con Ecuador, Colombia y Argentina: fecha límite para presentar las reservas,
quién las certifica y cada cuánto hay que cambiar de certificador."

Una celda **tiene que quedar vacía**. ¿Cuál?

<!--
4 min · acumulado 1:00
Clave.
Ecuador: 31 de enero (art. 22); compañías independientes o lo que diga el
instructivo del Ministerio; rotación: no figura en el reglamento.
Colombia: 1 de abril (0895, art. 1, pág. 3); externa si las probadas del
campo llegan a un millón de barriles equivalentes, interna por debajo (arts.
3 y 4); el mismo certificador hasta cinco años seguidos por campo, y después
un año afuera (art. 3, parágrafos 1 y 2, pág. 7).
Argentina: 31 de marzo (324, Anexo I-C, punto 1, texto actualizado); auditor
externo inscripto en el registro (art. 1 y Anexo I-B); no el mismo auditor
dos años seguidos, ni más de dos veces en cinco años (Anexo I-C, punto 4,
que puso la 69-E).
La celda vacía es la rotación de Ecuador. Si trae un número, lo inventó o lo
trajo de otro país: abrir la cita.
La misma tabla, generada como "tabla de datos", está en el cuaderno
preparado: se exporta a Hojas de cálculo con las citas en otra pestaña.
Vuelve en el bloque 7.
Cierre del bloque 4.
-->

---

## Pausa · 10 min

A las 13:00 de Argentina (11:00 de Ecuador y Colombia). Volvemos a la 1:10 del cronómetro.

<!--
10 min · acumulado 1:10
Cortar el audio y dejar la pantalla compartida.
Apoyo: cronómetro de diez minutos en pantalla. Pasar por el chat la consigna
del bloque 6, para que la lean en la pausa: "elegí un documento del menú de
la página de la sesión 4 (IAPG, ANH, Banco Central o el artículo de
Chichimene) y abrilo". Avisar un minuto antes de volver.
-->

---

<!-- _class: seccion -->

## Cuando la cita miente

Bloque 5 de 8 · **10 min**

<!--
1:10 · arranca el bloque, termina 1:20
-->

---

## Pregunta 6: una que no está

"¿Cuántos años de reservas probadas de petróleo le quedan a Colombia, y cuántos a Ecuador?"

La mitad de la respuesta **no está en ninguna de las siete fuentes**.

<!--
4 min · acumulado 1:14
Clave. Colombia: 7.4 años (IRR 2025, págs. 8 y 11; subió desde 7.2), con
reservas probadas de 2,020 millones de barriles al 31 de diciembre de 2025
(pág. 10). Ecuador: no está en ninguna fuente del cuaderno.
La respuesta buena dice eso. Si da un número para Ecuador, salió de afuera
de las fuentes o es el de Colombia mal atribuido: abrir la cita y mostrar
que el fragmento habla de Colombia.
Pregunta a la sala: si la respuesta viniera sola, con una cita al lado,
¿quién la habría copiado en un informe?
-->

---

## Cita correcta, norma vieja

Si el buscador trae el **fragmento equivocado**, la respuesta viene mal, y viene **con una cita
al lado**, que es peor.

Y un fragmento puede ser exacto y estar **reemplazado**.

<!--
4 min · acumulado 1:18
Provocarlo en vivo, en el cuaderno "Reservas (en vivo)": agregar como fuente
el texto ORIGINAL de la 324 (argentina.gob.ar/normativa/nacional/
norma-114769/texto) y preguntar: "¿Los condensados que se separan en el
yacimiento se suman a las reservas comprobadas de petróleo?"
Texto original de 2006, Anexo I-A, apartado II, punto 5: "no deberán ser
sumados a las reservas comprobadas de petróleo". Texto vigente (69-E/2016,
apartado III, punto 5): "deberán ser sumados", siempre que las plantas
separadoras estén dentro del permiso o concesión.
Con las dos fuentes marcadas, el cuaderno puede contestar cualquiera de las
dos, o las dos juntas, con cita prolija. Mostrarlo, y después desmarcar el
texto original.
La regla: la versión la elige quien arma el cuaderno, antes de cargarla.
-->

---

## El segundo límite, más aburrido

Si la respuesta **no está en los documentos**, ninguna búsqueda la va a traer. La herramienta
sabe lo que dicen las fuentes que le diste.

<!--
2 min · acumulado 1:20
El límite frecuente de verdad: la mitad de las preguntas interesantes no
tienen respuesta escrita en ningún lado. Detectar eso ya vale la
herramienta: te dice qué falta documentar.
Puente al bloque que sigue: ahora cada uno arma el suyo.
Cierre del bloque 5.
-->

---

<!-- _class: seccion -->

## Tu cuaderno, sin traer nada

Bloque 6 de 8 · **20 min**

<!--
1:20 · arranca el bloque, termina 1:40
-->

---

## Un menú de cuatro documentos públicos

- **Argentina**: el Reporte Mensual del IAPG, julio de 2026
- **Colombia**: el Informe de Recursos y Reservas 2025 de la ANH
- **Ecuador**: el Boletín del Banco Central, segundo trimestre, el de la mañana
- **Un caso técnico**: inyección de agua en ciclos en Chichimene, revista de Ecopetrol

Cada uno trae **dos preguntas** en la página.

<!--
3 min · acumulado 1:23
IAPG es el Instituto Argentino del Petróleo y del Gas; ANH, la Agencia
Nacional de Hidrocarburos de Colombia. Cada uno elige el que más se acerque a
su trabajo; no hace falta que sea de su país.
Claves de las preguntas del menú, por si alguien pregunta:
IAPG (64 págs.): 145,166 m³/d en julio (págs. 2 y 4), pero la tabla
convencional y no convencional (pág. 12) suma 155,177 y la de cuencas (pág.
20), 143,553: tres totales en el mismo reporte. Reservas: el último dato es de
2024; no convencional de petróleo 293,599 miles de m³, 19.0% más que en 2023
(pág. 58); total 491,772 miles de m³ (pág. 52).
IRR 2025 (36 láminas): 99.21% del petróleo y 99.11% del gas certificados por
un tercero, 11 auditoras (pág. 6). Gas contingente 3C de 10,540 Gpc: 55% por
contingencias ambientales o sociales, casi todo costa afuera, y 29% legales o
contractuales (págs. 30 y 31).
Banco Central (32 págs.): 457.81 mil barriles diarios en campo (pág. 7) y
447.18 mil fiscalizados (pág. 10); la fiscalizada es la registrada en los
centros de fiscalización, libre de sedimentos (pág. 6). EP Petroecuador bajó
por fallas en la generación eléctrica (pág. 8): 360.51 mil barriles diarios.
Chichimene (14 págs., en inglés): la inyección bajó de 4,500 a 2,500
barriles por día, 44% menos agua, y la energía cerca de 10% (pág. 11 del PDF).
La segunda es trampa: el artículo no da un número de factor de recobro del
piloto (muestra el cambio de tendencia en la figura 14); el 3 a 5% y el 2 a
20% de la pág. 6 son de otros estudios.
-->

---

<!-- _class: panel -->

## Manos a la obra

Doce minutos. Un cuaderno nuevo, un documento del menú, sus dos preguntas. Por cada respuesta,
**abrí la cita**. Lo que trabe, al chat.

<!--
12 min · acumulado 1:35
Trabajo individual. Los pasos están en la página.
Apoyo: cronómetro a la vista, aviso a los 6 y a los 10 minutos. Las trabas
típicas: cuenta corporativa bloqueada (que usen la personal), PDF que no
termina de procesar (que peguen la dirección en vez de subir el archivo), y
la red que bloquea un sitio (el boletín del Banco Central también está en
descargas/ del sitio del curso).
Plan B si Gemini Notebook no abre desde alguna red: esa persona sigue en el
cuaderno de reservas de la ventana D, con una pregunta del menú en voz alta.
Ojo con la dirección: desde el cambio de nombre es notebook.google.com, y una
red que solo habilitó la vieja (notebooklm.google.com) puede bloquear la
nueva.
-->

---

## Ronda: una bien citada y una que no

Por nombre, una línea: la respuesta que salió **bien citada** y la que salió **mal o no
estaba**.

<!--
5 min · acumulado 1:40
Menos de un minuto por persona. Lo que se busca es el patrón: salen bien las
que tienen una cifra o un párrafo entero en el documento; salen mal las que
piden algo que el documento no dice, o lo dice en una tabla que el cuaderno
leyó torcida. El que eligió IAPG o Chichimene probablemente trae el mejor
ejemplo de la ronda: pedírselo primero.
Cierre del bloque 6.
-->

---

<!-- _class: seccion -->

## Las cosas lindas del cuaderno

Bloque 7 de 8 · **14 min**

<!--
1:40 · arranca el bloque, termina 1:54
-->

---

## Con las mismas fuentes, el cuaderno arma

- **Resumen en audio**: dos voces o una, en español de Latinoamérica
- **Resumen en video**: explicativo o corto, de unos 60 segundos
- **Mapa mental**, **informe**, **tarjetas y cuestionario**
- **Infografía**, **presentación** en PDF o PPTX y **tabla de datos** a Hojas de cálculo

<!--
2 min · acumulado 1:42
Todo sale del panel Studio, y en septiembre de 2026 todo está en la cuenta
gratuita. El uso de trabajo de cada una está en la tabla de la página: el
audio para ponerse al día con el marco de otro país en el viaje al
yacimiento, el video para la inducción de un ingeniero nuevo, la tabla para
la comparación de los tres países, las tarjetas para preparar al equipo
antes de una auditoría de reservas.
Infografía y presentación piden mayoría de edad en la cuenta: la personal
de cada uno la tiene.
-->

---

<!-- _class: panel -->

## Dos que trajimos hechas

El **video corto** y el **resumen en audio** del cuaderno de reservas.

<!--
4 min · acumulado 1:46
Ventana D, cuaderno "Reservas (preparado)". Pasar el video Corto entero
(unos 60 segundos) y un minuto del audio formato Resumen.
Decir por qué vienen hechos: un video a veces tarda más de 30 minutos, y
gasta mucha cuota.
Pregunta a la sala mientras suena: ¿escucharon alguna cifra o fecha? La
anotamos para verificarla en la lámina de verificación.
Apoyo: anotar en el chat la cifra o la fecha que canten.
-->

---

<!-- _class: panel -->

## Cada uno genera una sola

En tu cuaderno, panel Studio: elegí **una** pieza y lanzala. Mientras se arma, seguimos.

La cuenta gratuita mide por cómputo desde el 2 de septiembre: una cuota que se renueva cada
**cinco horas**, con tope semanal.

<!--
5 min · acumulado 1:51
Sugerir las rápidas: infografía, tabla de datos, informe, mapa mental o
resumen en audio formato Resumen. El video, no: no llega.
El límite, dicho una vez: desde el 2 de septiembre de 2026 la cuota se mide
por cómputo, se renueva cada cinco horas hasta un tope semanal, y una pieza
gasta mucho más que una pregunta. Por eso una sola.
Apoyo: preguntar por el chat qué eligió cada uno, para no repetir todos la
misma.
-->

---

## Cómo se verifica un audio o una infografía

No traen **una cita por frase**, y pueden decir cosas que ninguna fuente dice.

Elegí dos afirmaciones con un número, una fecha o un artículo, y hacé la misma pregunta **en el
chat del cuaderno**, donde sí hay cita.

<!--
3 min · acumulado 1:54
Hacerlo en vivo con la cifra o fecha que cantaron durante el audio: la
misma pregunta en el chat del cuaderno preparado, y abrir la cita. La ayuda
de Google lo avisa en cada pieza: pueden tener imprecisiones. Y si se le
piden cambios a una presentación ya generada, la corrección no vuelve a
mirar las fuentes.
Que cada uno haga lo mismo con la pieza que lanzó, cuando termine de
generarse; si no terminó, queda para después de la clase.
Cierre del bloque 7.
-->

---

<!-- _class: seccion -->

## Cierre y tarea

Bloque 8 de 8 · **6 min**

<!--
1:54 · arranca el bloque, termina 2:00
-->

---

<!-- _class: acentos -->

## Para llevarse

- RAG es responder **con el libro abierto**, y lo que verifica es abrir la cita
- Antes de creerle a un cuaderno, fijate **de qué documento y de qué versión** sale cada cosa
- Audio, video e infografía son **borradores sin cita**: cada cifra se chequea en el chat

<!--
2 min · acumulado 1:56
Tres prácticas de la sesión, en palabras simples. El quiz, los dos
ejercicios y las tres preguntas de "Para discutir" quedan en la página: una
de ellas vuelve sobre la pregunta del chat del arranque.
-->

---

## Tarea para mañana

Opcional, cinco minutos. Pensá **una tarea de tu semana con varios pasos seguidos**: buscar un
dato, bajar un archivo, calcular, armar una tabla, escribir el correo.

Anotá los pasos en tres a cinco líneas y marcá **cuál revisarías vos**. Nada de la empresa.

<!--
2 min · acumulado 1:58
Es la única cosa que se pide entre días, y nadie la da por hecha. Mañana es
la materia prima del taller de agentes: un agente es exactamente eso, una
tarea de varios pasos con herramientas, y el paso que revisarían ellos es
donde el agente se verifica.
Plan B para mañana, si pocos la hicieron: tres minutos al arrancar el taller
para escribirla ahí mismo, con la consigna "lo que hacés todos los lunes con
cinco pestañas abiertas". Con seis personas alcanza con tres tareas.
Apoyo: pegar la consigna en el chat, en tres líneas, y volver a mandarla por
el canal del curso mañana a las 8:00 de Argentina.
-->

---

## Mañana, sesiones 5 y 6: agentes

- Qué es un agente, qué es el **arnés** que lo envuelve y cuáles hay hoy
- Un taller para **correr uno gratis** sobre una tarea de varios pasos
- Un agente arma en vivo el caso del curso, y cada empresa escribe **el suyo**

<!--
1 min · acumulado 1:59
Adelanto en una frase por punto, sin abrir nada. Nada de material previo
obligatorio: mañana arranca de cero igual.
-->

---

<!-- _class: portada -->

# Nos vemos mañana

El quiz, los ejercicios y el menú de documentos quedan en la página · **mpodeley.github.io/curso-ia-energia**

<!--
1 min · acumulado 2:00
Dejar proyectada mientras se despiden y responder lo que quede suelto.
Después de la clase: guardar el chat, con las respuestas a la pregunta del
arranque y las piezas que eligió cada uno; sirven de ejemplos para mañana.
-->
