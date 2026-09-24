---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 1**'
footer: 'mpodeley.github.io/curso-ia-energia'
---

<!-- _class: portada -->

# De los datos a la IA generativa

Sesión 1 de 8 · día 1 · 2 h en vivo · **PCR · CGC · Tecpetrol · Andes Petroleum**

<!--
0:00 · portada mientras entra la gente
Antes de arrancar: chequear que se vea la pantalla y que se escuche.
Tener abiertas cuatro ventanas: este deck (A), el panel (B), el sitio del
curso (C) y el chatbot (D). El panel lo maneja Martín desde su máquina; en la
mía queda abierto solo para proyectar resultados.
El deck está publicado en el sitio; si alguien se cae de la videollamada,
puede seguir las slides desde ahí.
Martín: confirmar en el chat quién entró y quién falta; a las 10:03 arrancamos
con los que estén.
-->

---

<!-- _class: seccion -->

## Apertura

Bloque 1 de 5 · **15 min**

<!--
0 min · acumulado 0:00
Arranca 0:00, termina 0:15.
-->

---

<!-- _class: agenda -->

## Esta sesión

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| Apertura: quiénes somos, regla entre empresas, entrada al sitio | 15 min | Los dos instructores, una ronda de seis con nombre y empresa, la regla de confidencialidad, el ingreso con el PIN y el primer pulso |
| El mapa de cuatro capas | 35 min | La historia de abajo, con ejemplos de la industria en cada capa. Las dos primeras las tocamos en vivo, con el duelo de declinación |
| Demos en vivo | 30 min | El chatbot frente a tareas reales: resumir un paper, explicar un término, escribir un correo difícil. Y verlo fallar |
| Encuesta de relevamiento | 15 min | La completamos juntos en vivo (ver abajo) |
| Discusión | 15 min | Qué sorprendió y qué decepcionó de lo visto hasta acá |
| Pausa | 10 min | Si te quedó la encuesta a medias, es el momento: se guarda sola |

<!--
2 min · acumulado 0:02
Bajada: son cuatro días de cuatro horas, cada uno en dos sesiones de dos: de 10
a 12 y de 12 a 14 (de 8 a 10 y de 10 a 12 en Ecuador y Colombia). Hay una pausa
al final de la primera sesión y otra a mitad de la segunda. Esta sesión es el
mapa y el relevamiento; después de la pausa, en la sesión 2, una mirada bajo el
capó, lo justo.
La misma tabla está en la página de la sesión 1: deck y sitio no se contradicen.
Martín: el cronómetro arranca acá; avisarme por el chat privado cuando un
bloque se pase cinco minutos.
-->

---

## Al final de esta sesión van a poder

- Ubicar **data science**, **machine learning** e **IA generativa** en un solo mapa
- Ver en vivo qué puede y qué **no** puede hacer hoy un chatbot con tareas reales de la industria
- Distinguir las dos maneras de equivocarse: le **faltaba el dato**, o el dato **no existe**

Este es un curso de conducir, no de mecánica: de cómo funciona por dentro, solo lo que ayude a manejar mejor.

<!--
2 min · acumulado 0:04
La frase del auto es el encuadre de los cuatro días: decirla y dejarla. Nadie
sale de acá experto en machine learning; salen manejando mejor la herramienta.
El tercer punto se arma en las demos y se cierra en la discusión: es la
primera distinción práctica del curso, y la sesión 2 explica de dónde sale.
-->

---

## Quiénes somos

**Matías Podeley** dicta. Ingeniero del ITBA, dieciocho años en energía: cuatro de operación en
Neuquén, simulación de yacimientos gigantes como Camisea y respaldo técnico a compras de activos
por más de US$ 300 millones. Buenos Aires.

**Martín Alvarado** lleva el chat, los pulsos y las rondas. Lo que escriban en el chat lo lee él,
y él llama a cada uno cuando toca hablar.

<!--
2 min · acumulado 0:06
Un minuto cada uno, sin leer la slide. Lo que importa que entiendan del
reparto: yo miro la pantalla que comparto, Martín mira el chat. Si tienen un
problema técnico o una pregunta que no quieren interrumpir, va por el chat y
Martín decide cuándo entra.
Martín: presentarse con la voz, treinta segundos, y decir cómo van a
funcionar las rondas: él nombra, el nombrado habla.
-->

---

<!-- _class: panel -->

## Ronda: nombre, empresa y a qué te dedicás

Seis personas, medio minuto cada una. Sin datos de la empresa: solo el rol.

<!--
4 min · acumulado 0:10
Martín: llamar por nombre, en el orden de la lista de asistentes, y anotar en
el chat rol y país de cada uno. Esa lista es la que usa después para las
rondas del día.
Son 4 personas en Ecuador, 1 en Argentina y 1 en Colombia; cuatro empresas.
Escuchar qué hace cada uno: los ejemplos de las demos se eligen con eso
(reservorios, producción, planificación).
Cortar a los treinta segundos con amabilidad: la ronda larga es la de la
discusión, a la 1:35.
-->

---

<!-- _class: cita -->

## En estos ejercicios **no** usamos datos confidenciales de ninguna empresa

Hay cuatro empresas en la sala. Ni volúmenes reales de producción, ni nombres de contratos, ni
información de partners: nada de eso va al chat ni a un chatbot gratuito. Los ejemplos salen de
fuentes públicas: el reporte diario de la ARCH y el Capítulo IV.

<!--
3 min · acumulado 0:13
La regla del día uno, temprano y grande, y hoy con una razón extra: en la
sala hay competidores. Ninguna ronda pide un dato propio; cuando pida "una
tarea de tu semana" es el tipo de tarea, no el contenido.
ARCH: Agencia de Regulación y Control de Hidrocarburos, Ecuador. Capítulo IV:
producción por pozo de la Secretaría de Energía, Argentina. Decir los nombres
completos una vez.
No es burocracia: en la sesión 7 mostramos qué pasa con lo que se sube a un
chatbot gratuito. Si alguien pregunta por la versión empresarial: existe, cambia
el contrato de datos, lo vemos mañana en la sesión 3. Hoy trabajamos con cuentas gratuitas.
-->

---

<!-- _class: panel -->

## Antes de empezar, entrá al sitio

`mpodeley.github.io/curso-ia-energia`

Vamos a usar la página de la sesión 1 varias veces. El PIN del curso lo dicto en voz alta.

<!--
2 min · acumulado 0:15
Dictar el PIN y esperar a que todos entren. Que escriban nombre y apellido:
las respuestas de hoy se cruzan con las del taller de la sesión 6.
Martín: abrir el pulso "s1-palabra-ia" apenas los seis estén adentro. Con seis
votos la nube dibuja igual; no esperar más quórum que ese. Cerrarlo cuando
hayan votado todos y avisarme: proyecto la nube desde la ventana B y sigo.
Pedirles que dejen la página de la sesión 1 abierta: en el bloque siguiente hay un
ejercicio que hacemos ahí mismo.
-->

---

<!-- _class: seccion -->

## El mapa de cuatro capas

Bloque 2 de 5 · **35 min**

<!--
0 min · acumulado 0:15
Arranca 0:15, termina 0:50.
-->

---

<!-- _class: cita -->

## Para quien trabajó con reservorios, nada de esto es **tan nuevo** como parece

<!--
1 min · acumulado 0:16
La bajada del bloque. Lo que sigue son cuatro capas y la de arriba es la única
verdaderamente nueva.
-->

---

<!-- _class: acentos -->

## Cuatro capas, una historia conocida

- **Data science**: mirar datos, limpiarlos, graficarlos, sacar conclusiones
- **Machine learning**: en vez de escribir la fórmula, mostrás ejemplos y la máquina encuentra el patrón
- **Deep learning**: machine learning con redes neuronales grandes (más datos, más cómputo, patrones más complejos)
- **IA generativa**: modelos tan grandes que ya no solo clasifican o predicen un número: *generan*

<!--
3 min · acumulado 0:19
Presentar las cuatro juntas y después una por una con su ejemplo.
Insistir en que están anidadas: cada capa usa la anterior, no la reemplaza.
-->

---

## Capa 1 · Data science

Es lo que siempre hicimos: mirar datos, limpiarlos, graficarlos, sacar conclusiones.

**Una curva de declinación ajustada a mano ya es un modelo.** Y la línea de tendencia sobre un
Excel de costos o de demanda, también: la fórmula la pusiste vos, y los datos pusieron los
parámetros. La estadística de la facultad vive acá.

<!--
3 min · acumulado 0:22
Para los que no son de reservorios (planning, administración): la línea de
tendencia en Excel es el mismo gesto, sobre costos, demanda o avance de obra.
Si preguntan por la regresión lineal: vive en las capas 1 y 2. Es estadística
cuando la usás para entender (coeficientes, significancia) y es machine
learning cuando la máquina elige sola los parámetros para predecir y se la
valida con datos que no vio. La diferencia no es la matemática: es la
intención, y el ritual de validar.
Preguntar quién ajustó una declinación o una tendencia a mano, y con qué.
Cortar corto: la conversación larga sobre esto va en la discusión.
Entregar al ejercicio: "no se los voy a contar, lo van a hacer ustedes".
-->

---

<!-- _class: panel -->

## Ajustala vos

`mpodeley.github.io/curso-ia-energia` · sesión 1

Dos perillas y un número que tiene que bajar: el error. Bajalo todo lo que puedas.

Si ya lo hiciste antes de hoy, apretá "Reiniciar ejercicio" y arrancá de cero.

<!--
6 min · acumulado 0:28
Ventana C (el sitio), página de la sesión 1, ejercicio "Ajustala vos, después que
la busque la máquina".
ANTES de proyectar: apretar "Reiniciar ejercicio". Si ensayé antes de la clase,
el navegador se acuerda y el ejercicio abre con la respuesta puesta.
Arranca en una recta plana, con 66% de error. En tres minutos la mayoría llega
a algo entre 3% y 8%. El mejor ajuste posible con estas perillas es 2.17%.
Que aprieten "Listo, este es mi ajuste" antes de seguir.
Mientras trabajan, decir en voz alta que esto ES la capa 1: eligieron una forma
funcional y estimaron los parámetros a ojo. Todavía no hay ninguna máquina.
Este ejercicio no depende del Worker: si el firewall bloquea los pulsos, esto
funciona igual.
Martín: pedir por el chat que cada uno escriba su error cuando aprieta
"Listo"; leo los seis números en voz alta antes de pasar a la máquina.
-->

---

## Capa 2 · Machine learning

Invierte la lógica: en vez de escribir la fórmula, **mostrás ejemplos y la máquina encuentra
el patrón**.

Sirve cuando la fórmula no existe, o existe pero no la conocemos. Mantenimiento predictivo:
nadie sabe escribir la ecuación de "esta bomba va a fallar en tres semanas", pero hay miles de
bombas que fallaron y sus datos previos.

Tu correo hace esto hace veinte años: nadie escribió la regla de qué es spam. Vio ejemplos.

<!--
3 min · acumulado 0:31
El contraste con la capa 1, en una frase: allá la fórmula la ponías vos y los
datos ponían los parámetros; acá la máquina ajusta el modelo sola, contra un
criterio. Subir de capa es dejar que los datos pongan cada vez más del modelo.
La pregunta que suele aparecer acá: ¿y cómo sabe que acertó?
Respuesta corta: se le esconde parte de los datos y se mide. Es la idea de
validación, y es la razón por la que un modelo puede andar bien en el papel y
mal en el campo.
-->

---

<!-- _class: panel -->

## Ahora que la busque la máquina

El botón está abajo del gráfico. Nadie le dijo los valores: tiene los puntos y un criterio.

<!--
5 min · acumulado 0:36
Ventana C otra vez. Que aprieten "Que la busque la máquina".
Leer la tabla en voz alta: su ajuste contra el de ella. Casi siempre gana la
máquina, y por el doble: 1.06% contra el 2.17% del mejor ajuste posible a mano.
Abrir el desplegable "Los valores con los que se generó esta curva": qi 320 y
Di 2.1%/mes. La máquina cayó justo encima sin que nadie se los dijera.
La frase del bloque: ni con los valores exactos el error da cero. Queda 1.06%,
que es el ruido de medición. Un modelo que llega a cero está copiando el ruido.
Si alguien le ganó a la máquina, mostrarlo: barre una grilla finita, no es magia.
Puente a mañana: este pozo es de escuela. En la sesión 4, con pozos reales del
Capítulo IV, aparece la tercera perilla y la pregunta de cuánto es reservorio y
cuánto es operación.
-->

---

## Capa 3 · Deep learning

Machine learning con **redes neuronales grandes**. Más datos y más cómputo, y a cambio
patrones mucho más complejos.

Acá entran las imágenes sísmicas, los registros de pozo, el texto. Y la cara que desbloquea tu
teléfono: datos donde la señal está distribuida y no se deja resumir en cinco variables.

La capa arranca en 1989 (**LeNet** leyendo números escritos a mano, video de un minuto) y
explota en 2012 (**AlexNet**, el mismo mecanismo con placas gráficas). Los dos videos están en la página.

<!--
2 min · acumulado 0:38
No entrar en arquitectura. Lo único que tiene que quedar: "grande" quiere decir
muchas capas de transformación aprendidas de los datos. Acá ni la forma de la
función la escribe nadie: la aprende la red.
El arco: LeNet (Bell Labs, 1989) es donde empieza; AlexNet (2012, GPU y un
millón de imágenes) es donde deja de ser curiosidad y se come la década. Ojo
con decir que la capa "termina" ahí: la capa 4 es esta misma receta llevada al
extremo. Lo que termina en 2012 es otra cosa, y es el título del video de
Welch Labs: el momento en que dejamos de entender qué pasa adentro. Ese hilo
se retoma en la sesión 2 (mirar adentro, en la página) y en la sesión 7
(verificar porque no se puede mirar todo).
-->

---

## Capa 4 · IA generativa

Modelos tan grandes, entrenados con tanto texto, que en lugar de solo clasificar o predecir
un número, **generan**: texto, código, imágenes.

Los modelos grandes de lenguaje (**LLM**) son el caso que nos ocupa el resto del curso.

¿Y por qué explotó ahora, y no en 2010?

<!--
3 min · acumulado 0:41
Acá recién aparece el chatbot. Todo lo anterior sigue existiendo y sigue siendo
la herramienta correcta para la mayoría de los problemas con números.
Cerrar con la pregunta proyectada y juntar dos o tres hipótesis de la sala
antes de avanzar: la slide siguiente es la respuesta.
Martín: ronda corta, tres nombres, una hipótesis cada uno.
-->

---

<!-- _class: acentos -->

## Tres cosas, ninguna mágica

- **Datos**: todo el texto de internet, disponible y digitalizado
- **Cómputo**: las placas gráficas (GPU), que resultaron ser justo la máquina que estos modelos necesitaban
- **Una arquitectura que escala**: el *transformer*, 2017

<!--
4 min · acumulado 0:45
Esta slide responde la pregunta que quedó proyectada en la anterior. En las
hipótesis suele salir "más computadoras", que es un tercio de la respuesta.
Lo importante del transformer no es cómo funciona sino que **mejora al agrandarlo**,
de forma predecible. Eso convirtió la investigación en ingeniería: si duplico
datos y cómputo, sé aproximadamente cuánto mejora.
Si alguien pregunta qué tiene de especial la arquitectura: el mecanismo de
atención, que mira todo el contexto a la vez y se paraleliza bien. Con el
nombre alcanza; en la sesión 2 lo vemos dibujado en el Transformer Explainer, y la
mecánica completa está en la serie de 3Blue1Brown de la página.
-->

---

<!-- _class: cita -->

## No hubo un descubrimiento mágico: hubo una **receta que mejora al agrandarla**

<!--
2 min · acumulado 0:47
La frase que quiero que se lleven del bloque.
Consecuencia práctica: lo que hoy no funciona bien probablemente funcione mejor
en un año, sin que nadie invente nada nuevo. Y lo que falla por diseño (las
alucinaciones) no se arregla solo agrandando.
-->

---

## Dónde está esto en el software que ya usan

Machine learning lleva años escondido en herramientas de la industria: simuladores,
interpretación sísmica, mantenimiento predictivo, control de procesos.

Lo nuevo desde fines de 2022 no es la IA. Es que **una parte de la IA se volvió conversacional**,
y por eso llegó a todos los escritorios de golpe.

<!--
3 min · acumulado 0:50
NO abrir conversación acá: si sobra tiempo en la discusión, es la pregunta de
reserva. Acá es puente a las demos.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## Demos en vivo

Bloque 3 de 5 · **30 min**

<!--
0 min · acumulado 0:50
Arranca 0:50, termina 1:20.
-->

---

## Tres tareas reales

- Resumir un **paper de la Society of Petroleum Engineers (SPE)**
- Explicar un **término técnico** a alguien no técnico
- Redactar un **correo difícil**

Y una cuarta, la más importante: **verlo fallar**.

<!--
2 min · acumulado 0:52
Avisar que las tres las hago en vivo y que van a ver los errores también.
La tabla de producción sale de acá a propósito: es el bloque "de PDF a tabla"
de mañana (sesión 4), sobre el reporte diario de la ARCH, y hacerla dos veces no
agrega nada.
Pedir que mientras miran anoten: ¿esto me serviría mañana en mi trabajo?
-->

---

<!-- _class: panel -->

## Vamos al chatbot

Miren tres cosas: qué tan rápido responde, qué tan seguro suena, y si lo que dice es **verdad**.

<!--
12 min · acumulado 1:04
Cambiar a la ventana D (chatbot). Prompts exactos, en orden:

1) "Resumí este resumen de paper de la SPE en cinco viñetas para un gerente que
   no es ingeniero de reservorios: <pegar abstract público>"

2) "Explicá qué es la recuperación secundaria por inyección de agua como si le
   hablaras a un directorio no técnico. Máximo 150 palabras, sin fórmulas."

3) "Redactá un correo para avisarle a un contratista que vamos a postergar una
   intervención dos semanas por disponibilidad de equipo. Tono cordial pero firme,
   sin comprometer fecha nueva."

El término de la demo 2 no es casual: es el tema del caso de la sesión 8, y dos de
las cuatro empresas tienen inyección de agua en campos maduros. No nombrarlas.
Martín: pegar cada prompt en el chat apenas lo corro, para que lo tengan a
mano después. Entre demo y demo, un nombre: "¿te sirve tal cual, o qué le
cambiarías?". Un minuto por respuesta, no más.
Volver al deck en la slide siguiente.
-->

---

## Qué acabamos de ver

Rápido, ordenado, con buen tono. Y **sin ninguna garantía de que sea cierto**.

El chatbot no tiene un botón de "no sé". Cuando no sabe, sigue escribiendo igual.

<!--
2 min · acumulado 1:06
Puente al fallo deliberado. Preguntar si alguien notó algo raro en las respuestas
anteriores; a veces ya lo cazaron solos y es mejor si sale de ellos.
-->

---

<!-- _class: panel -->

## Ahora, a hacerlo fallar

<!--
10 min · acumulado 1:16
Demo en Gemini Flash, pidiéndole en el primer mensaje que no use búsqueda ni
se conecte a internet: sin conexión no puede apoyarse en fuentes y la falla
sale reproducible. Dos preguntas acá, de más sutil a más evidente; la tercera
familia (la norma real con contenido inventado) queda para el bloque de
alucinaciones de la sesión 2.

1) "¿Cuánto produjo el campo Sacha el 15 de septiembre de 2026 según el
   reporte diario de la ARCH?"
   (va a inventar una cifra con total seguridad; el campo es de Petroecuador,
   público, y de nadie en la sala)

2) "Citame tres papers de la SPE sobre recuperación secundaria en areniscas de
   la cuenca Oriente, con su número de SPE."
   (los números de paper suelen ser inventados y son verificables al instante)

Verificar UNA en vivo, buscándola: la del reporte diario, abriendo el PDF de
la ARCH en controlhidrocarburos.gob.ec. Que vean el chequeo, no solo la
afirmación.
Comentar al pasar, sin slide, las dos causas: a una le faltaba el dato (nunca
leyó ese reporte, y en vez de decirlo escribió la cifra más creíble) y en la
otra el dato no existe en ninguna parte, y aun así salió con la forma exacta
de una cita. La primera se arregla trayéndole el documento (sesión 5); la
segunda no se arregla: se verifica (sesión 7). La segunda pregunta de la discusión
retoma esta distinción. El POR QUÉ viene después de la pausa: no adelantarlo.
Volver al deck.
-->

---

<!-- _class: cita -->

## La salida de un LLM es un **borrador plausible**, no una fuente

<!--
2 min · acumulado 1:18
La regla que nos acompaña los cuatro días.
En la sesión 2, después de la pausa, vemos POR QUÉ pasa esto: sale del mecanismo mismo, no es
un bug que alguien vaya a arreglar.
-->

---

<!-- _class: panel -->

## ¿Cuánto confiarías ahora?

<!--
2 min · acumulado 1:20
Martín: abrir el pulso "s1-confianza".
Retoma la pregunta del arranque, ahora después de ver fallar al modelo: el
antes y el después es el golpe del bloque.
No proyectar las barras mientras votan (el que mira ancla su voto en el de los
demás): Martín cierra el pulso cuando votaron los seis y recién ahí muestro el
resultado desde la ventana B. Cierre del bloque 3.
-->

---

<!-- _class: seccion -->

## Encuesta de relevamiento

Bloque 4 de 5 · **15 min**

<!--
0 min · acumulado 1:20
Arranca 1:20, termina 1:35.
-->

---

## La encuesta que ajusta el curso

El caso real de la sesión 8 ya está armado sobre datos públicos. Lo que falta saber es lo de ustedes:
qué rol tiene cada uno, qué tareas repetitivas le comen la semana, qué datos maneja y en qué formato.

El último bloque pide una sola cosa: **el problema que probarías primero**. Con eso arranca el
taller de la sesión 6, donde cada empresa escribe su caso en una página.

<!--
2 min · acumulado 1:22
Este es el bloque que hace que el curso valga distinto a un tutorial de YouTube.
Decirlo así, sin vueltas.
Aclarar la nota de privacidad: las respuestas las leemos Martín y yo, se usan
para elegir ejemplos y énfasis, y no hay que poner nada confidencial. Nadie de
otra empresa las ve.
-->

---

<!-- _class: panel -->

## La encuesta está en la página de la sesión 1

`mpodeley.github.io/curso-ia-energia`

Son doce preguntas y unos diez minutos. Sin datos confidenciales.

<!--
13 min · acumulado 1:35
Dejar esta slide proyectada mientras la completan. No cambiar de ventana: que
tengan la URL a la vista todo el bloque.
Martín: mirar el panel; con seis personas se ve al instante quién va
completando, y se puede preguntar por nombre si alguien se trabó. A los 10 min
avisar por el chat que quedan 3.
Los cuatro bloques de la encuesta suman quince minutos orientativos; acá hay
trece. El que no llegue la termina en la pausa: se guarda sola.
-->

---

<!-- _class: seccion -->

## Discusión

Bloque 5 de 5 · **15 min**

<!--
0 min · acumulado 1:35
Arranca 1:35, termina 1:50.
-->

---

## ¿Qué tarea de tu semana laboral te parece **más** automatizable con lo que viste hoy?

¿Y cuál **menos**?

<!--
7 min · acumulado 1:42
Primera pregunta de discusión. Dejarla proyectada mientras hablan.
Martín: ronda completa con nombre, un minuto cada uno; no preguntar al aire.
Con seis alcanza el tiempo para que hablen todos.
Si nadie arranca, empezar por la de "menos": es más fácil y suele destrabar.
Anotar todo: esto alimenta los ejemplos de mañana igual que la encuesta. Son
tipos de tarea, no contenido de la empresa.
-->

---

## El chatbot respondió algo incorrecto con total seguridad

¿Le **faltaba el dato**, o el dato **no existía** y lo completó igual?

<!--
8 min · acumulado 1:50
Segunda pregunta. Ahora es un diagnóstico, no una opinión: que clasifiquen cada
error que vieron en una de las dos causas.
Buscar que salga la idea de "verificable": las tareas donde puedo comprobar el
resultado rápido son las tareas seguras.
Si sale "entonces no sirve", repreguntar: ¿un borrador de un pasante sirve?
Pregunta de reserva si sobra tiempo: ¿dónde ya hay machine learning escondido
en el software que usás? (simuladores, sísmica, mantenimiento predictivo).
Cierre del bloque 5 y de la sesión 1.
-->

---

## Pausa · 10 min

A las 12:00 (10:00 en Ecuador y Colombia) sigue la **sesión 2**, con su propio deck.
Si te quedó la encuesta a medias, es el momento.

<!--
10 min · acumulado 2:00
Cortar el audio, no la pantalla: dejar esta slide proyectada.
En la pausa, abrir el deck de la sesión 2 en la ventana A y dejarlo en la
portada; las otras tres ventanas quedan como están.
Martín: revisar en el panel quién terminó la encuesta y recordarle por chat
privado a quien no. Exportar lo que haya hasta ahora y leer por arriba el
bloque D: si alguien escribió algo que sirve como ejemplo para la sesión 2, me
lo pasa en una línea. Avisar por el chat un minuto antes de volver.
-->

