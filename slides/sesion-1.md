---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Día 1**'
footer: 'mpodeley.github.io/curso-ia-energia'
---

<!-- _class: portada -->

# Qué es esto y cómo funciona

Día 1 de 4 · 4 h en vivo · **PCR · CGC · Tecpetrol · Andes Petroleum**

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

Bloque 1 de 9 · **15 min**

<!--
0 min · acumulado 0:00
Arranca 0:00, termina 0:15.
-->

---

## Hoy

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| Apertura: quiénes somos, regla entre empresas, entrada al sitio | 15 min | Los dos instructores, una ronda de seis con nombre y empresa, la regla de confidencialidad, el ingreso con el PIN y el primer pulso |
| El mapa de cuatro capas | 35 min | La historia de abajo, con ejemplos de la industria en cada capa. Las dos primeras las tocamos en vivo, con el duelo de declinación |
| Demos en vivo | 30 min | El chatbot frente a tareas reales: resumir un paper, explicar un término, escribir un correo difícil. Y verlo fallar |
| Encuesta de relevamiento | 12 min | La completamos juntos en vivo (ver abajo) |
| Discusión | 15 min | Qué sorprendió y qué decepcionó de lo visto hasta acá |
| Pausa | 10 min | Si te quedó la encuesta a medias, es el momento: se guarda sola |
| Tokens y predicción | 40 min | Los dos primeros laboratorios de la página, y un modelo real abierto en el navegador |
| Contexto y entrenamiento | 25 min | La ventana de contexto en vivo con el tercer laboratorio, y cómo se entrena en dos etapas |
| Pausa | 10 min | Dejá el chatbot abierto: lo usás al volver |
| Alucinaciones en vivo | 35 min | Lo hacemos alucinar: primero el instructor, después cada uno con una pregunta de su especialidad |
| Cierre: las cuatro maneras de fallar, takeaways, tarea | 13 min | La hoja de ruta del curso, tres prácticas para mañana y la tarea de cinco minutos |

<!--
2 min · acumulado 0:02
Bajada: son cuatro días de cuatro horas, con dos pausas de diez. Hoy es el mapa,
el relevamiento y una mirada bajo el capó, lo justo.
La misma tabla está en la página del día 1: deck y sitio no se contradicen.
Martín: el cronómetro arranca acá; avisarme por el chat privado cuando un
bloque se pase cinco minutos.
-->

---

## Al final del día van a poder

- Ubicar **data science**, **machine learning** e **IA generativa** en un solo mapa
- Ver en vivo qué puede y qué **no** puede hacer hoy un chatbot con tareas reales de la industria
- Entender qué es un **token**, cómo el modelo predice el siguiente, y derivar de ahí **por qué alucina**

Este es un curso de conducir, no de mecánica: de cómo funciona por dentro, solo lo que ayude a manejar mejor.

<!--
2 min · acumulado 0:04
La frase del auto es el encuadre de los cuatro días: decirla y dejarla. Nadie
sale de acá experto en machine learning; salen manejando mejor la herramienta.
El tercer punto es una cadena, no una lista de curiosidades: si entienden el
token entienden la predicción, y si entienden la predicción la alucinación
deja de ser un misterio y pasa a ser una consecuencia.
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
discusión, a la 1:32.
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
No es burocracia: el día 4 mostramos qué pasa con lo que se sube a un chatbot
gratuito. Si alguien pregunta por la versión empresarial: existe, cambia el
contrato de datos, lo vemos mañana. Hoy trabajamos con cuentas gratuitas.
-->

---

<!-- _class: panel -->

## Antes de empezar, entrá al sitio

`mpodeley.github.io/curso-ia-energia`

Vamos a usar la página del día 1 varias veces hoy. El PIN del curso lo dicto en voz alta.

<!--
2 min · acumulado 0:15
Dictar el PIN y esperar a que todos entren. Que escriban nombre y apellido:
las respuestas de hoy se cruzan con las del taller del día 3.
Martín: abrir el pulso "s1-palabra-ia" apenas los seis estén adentro. Con seis
votos la nube dibuja igual; no esperar más quórum que ese. Cerrarlo cuando
hayan votado todos y avisarme: proyecto la nube desde la ventana B y sigo.
Pedirles que dejen la página del día 1 abierta: en el bloque siguiente hay un
ejercicio que hacemos ahí mismo.
-->

---

<!-- _class: seccion -->

## El mapa de cuatro capas

Bloque 2 de 9 · **35 min**

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

`mpodeley.github.io/curso-ia-energia` · día 1

Dos perillas y un número que tiene que bajar: el error. Bajalo todo lo que puedas.

Si ya lo hiciste antes de hoy, apretá "Reiniciar ejercicio" y arrancá de cero.

<!--
6 min · acumulado 0:28
Ventana C (el sitio), página del día 1, ejercicio "Ajustala vos, después que
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
Puente a mañana: este pozo es de escuela. Mañana, con pozos reales del
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
se retoma después de la segunda pausa (mirar adentro, en la página) y el día 4
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
nombre alcanza; a la tarde lo vemos dibujado en el Transformer Explainer, y la
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

Bloque 3 de 9 · **30 min**

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
de mañana, sobre el reporte diario de la ARCH, y hacerla dos veces no agrega nada.
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

El término de la demo 2 no es casual: es el tema del caso del día 4, y dos de
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
alucinaciones de la tarde.

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
de una cita. La primera se arregla trayéndole el documento (día 3); la
segunda no se arregla: se verifica (día 4). La segunda pregunta de la discusión
retoma esta distinción. El POR QUÉ viene después de la pausa: no adelantarlo.
Volver al deck.
-->

---

<!-- _class: cita -->

## La salida de un LLM es un **borrador plausible**, no una fuente

<!--
2 min · acumulado 1:18
La regla que nos acompaña los cuatro días.
Después de la pausa vemos POR QUÉ pasa esto: sale del mecanismo mismo, no es
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

Bloque 4 de 9 · **12 min**

<!--
0 min · acumulado 1:20
Arranca 1:20, termina 1:32.
-->

---

## La encuesta que ajusta el curso

El caso real del día 4 ya está armado sobre datos públicos. Lo que falta saber es lo de ustedes:
qué rol tiene cada uno, qué tareas repetitivas le comen la semana, qué datos maneja y en qué formato.

El último bloque pide una sola cosa: **el problema que probarías primero**. Con eso arranca el
taller del día 3, donde cada empresa escribe su caso en una página.

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

## La encuesta está en la página del día 1

`mpodeley.github.io/curso-ia-energia`

Son doce preguntas y unos diez minutos. Sin datos confidenciales.

<!--
10 min · acumulado 1:32
Dejar esta slide proyectada mientras la completan. No cambiar de ventana: que
tengan la URL a la vista todo el bloque.
Martín: mirar el panel; con seis personas se ve al instante quién va
completando, y se puede preguntar por nombre si alguien se trabó. A los 7 min
avisar por el chat que quedan 3.
Los cuatro bloques de la encuesta suman quince minutos orientativos; acá hay
diez. El que no llegue la termina en la pausa: se guarda sola.
-->

---

<!-- _class: seccion -->

## Discusión

Bloque 5 de 9 · **15 min**

<!--
0 min · acumulado 1:32
Arranca 1:32, termina 1:47.
-->

---

## ¿Qué tarea de tu semana laboral te parece **más** automatizable con lo que viste hoy?

¿Y cuál **menos**?

<!--
7 min · acumulado 1:39
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
8 min · acumulado 1:47
Segunda pregunta. Ahora es un diagnóstico, no una opinión: que clasifiquen cada
error que vieron en una de las dos causas.
Buscar que salga la idea de "verificable": las tareas donde puedo comprobar el
resultado rápido son las tareas seguras.
Si sale "entonces no sirve", repreguntar: ¿un borrador de un pasante sirve?
Pregunta de reserva si sobra tiempo: ¿dónde ya hay machine learning escondido
en el software que usás? (simuladores, sísmica, mantenimiento predictivo).
Cierre del bloque 5.
-->

---

## Pausa · 10 min

Volvemos a la 1:57 del cronómetro. Si te quedó la encuesta a medias, es el momento.

<!--
10 min · acumulado 1:57
Cortar el audio, no la pantalla: dejar esta slide proyectada.
Martín: revisar en el panel quién terminó la encuesta y recordarle por chat
privado a quien no. Exportar lo que haya hasta ahora y leer por arriba el
bloque D: si alguien escribió algo que sirve como ejemplo para la tarde, me lo
pasa en una línea. Avisar por el chat un minuto antes de volver.
-->

---

<!-- _class: seccion -->

## Tokens y predicción

Bloque 6 de 9 · **40 min**

<!--
0 min · acumulado 1:57
Arranca 1:57, termina 2:37.
Bajada de la segunda mitad del día: hasta acá vimos QUÉ hace; ahora levantamos
el capó un rato, lo justo. Cada pieza termina en algo que van a hacer distinto
mañana en el trabajo.
-->

---

## El modelo no lee palabras: lee **tokens**

Antes de procesar nada, parte el texto en pedazos. Pueden ser palabras enteras, sílabas o
letras sueltas.

Lo frecuente en internet entra como un solo token. Lo técnico, y casi todo el español, se parte
en varios.

<!--
4 min · acumulado 2:01
No decir todavía cuántos tokens tiene nada. La gracia del bloque es que lo
adivinen primero y lo vean después.
Si preguntan quién decide el corte: nadie lo escribió a mano, se calculó
buscando los pedazos más frecuentes en un montón de texto.
-->

---

<!-- _class: panel -->

## Antes de mirar: adiviná

¿En cuántos tokens parte el modelo la frase **perforación direccional**?

<!--
3 min · acumulado 2:04
Martín: abrir el pulso "s2-cuantos-tokens".
NO adelantar la respuesta: el laboratorio la muestra en la slide siguiente y el
golpe está en la distancia entre lo que votaron y lo que ven.
Este pulso es la excepción: las barras se pueden dejar a la vista mientras
votan. Martín lo cierra recién después de que hayan visto el conteo real.
-->

---

<!-- _class: panel -->

## Ahora abrilo: laboratorio de tokens

Está en la página del día 1. Empezá por **perforación direccional**.

<!--
8 min · acumulado 2:12
Ventana C, día 1, ejercicio "El texto que ve el modelo: tokens".
Empezar por el ejemplo "Dos palabras que usás todos los días": son seis fichas
para dos palabras. Contarlas en voz alta, despacio.
Martín: cerrar el pulso y decir cuánta gente había votado 2 o 4.
Después recorrer los otros ejemplos, sobre todo el par español/inglés y el
número largo. Que jueguen dos o tres minutos solos antes de seguir: que peguen
un nombre de pozo o una unidad de su rutina y cuenten las fichas.
-->

---

<!-- _class: acentos -->

## Tres consecuencias que ya vieron sin saberlo

- **Cuenta mal las letras** de una palabra, porque nunca ve letras: ve pedazos
- **El español rinde menos**: la misma frase cuesta más tokens que en inglés
- **El uso por programa se cobra por token**, así que trabajar en español sale más caro

<!--
3 min · acumulado 2:15
El dato para decir en voz alta: "perforación direccional" son seis tokens y
"directional drilling" son tres. La mitad, para la misma idea.
Aclarar que no es una decisión contra el español: es que había mucho más inglés
cuando se armó el tokenizador.
Si alguien pregunta por el costo: hoy con cuentas gratuitas no lo pagan, pero
importa apenas alguien piense en automatizar algo, y eso aparece el día 3.
-->

---

## Una sola operación, repetida

Un **modelo grande de lenguaje** (LLM) hace una sola cosa.

Dado el texto hasta acá, le pone una probabilidad a cada token que podría seguir, elige uno,
y vuelve a empezar. **No hay una base de datos de respuestas**: hay una máquina de continuar texto.

<!--
4 min · acumulado 2:19
La frase que tiene que quedar: máquina de continuar texto.
Si alguien se resiste ("pero razona"), no discutir ahora: anotarlo y decir que
es la cuarta pregunta de la página, para la conversación del cierre si sobra.
La analogía del autocompletado del teléfono sirve, pero avisar que se queda
corta: la diferencia es cuánto texto anterior mira.
-->

---

<!-- _class: panel -->

## Elegí vos el próximo token

El segundo laboratorio de la página. Movele a la temperatura y mirá qué cambia.

<!--
8 min · acumulado 2:27
Ventana C, ejercicio "Adiviná el próximo token".
Recorrer primero con temperatura baja: gana siempre el más probable, la salida
es estable y aburrida. Después subirla y mostrar que aparecen candidatos raros.
El ejemplo "Vaca ___": 90% para "Muerta". Esa seguridad viene de la frecuencia
en el texto de entrenamiento, no de haber verificado nada; volvemos a eso en
el bloque de alucinaciones.
Dejarlos jugar. La pregunta para tirar mientras juegan: ¿en qué caso querrían
la versión aburrida?
Volver al deck.
-->

---

<!-- _class: panel -->

## El mismo mecanismo, con un modelo real adentro

`poloclub.github.io/transformer-explainer`

GPT-2 corriendo en el navegador: tokens, atención y la probabilidad de cada candidato, en vivo.

<!--
5 min · acumulado 2:32
Abrir el Transformer Explainer en una pestaña de la ventana C, cargado de
antemano: la primera carga baja el modelo y tarda. Cinco minutos guiados, sin
tocar nada que no esté en esta lista:
1) Escribir una frase corta en inglés ("The well produced") y apretar
   Generate. Señalar abajo la lista de candidatos con su probabilidad: es la
   misma lista del laboratorio, pero calculada por un modelo de verdad.
2) Subir y bajar la temperatura con el control de arriba y mostrar cómo se
   achata o se afila la lista. Es la misma perilla.
3) Señalar, sin explicar, la columna de atención: cada token mirando a los
   anteriores. Es el "mira todo el contexto a la vez" del transformer que
   nombramos a la mañana. Con verlo alcanza; no entrar en las cabezas ni en
   las matrices.
Puente a lo que sigue: todo lo que el modelo mira para armar esa lista es la
ventana de contexto, y es el próximo bloque.
El enlace está en la página del día 1, en el material de arriba y en el
párrafo "para curiosos" debajo del laboratorio: solo, vale media hora.
-->

---

## La temperatura elige entre candidatos, no inventa candidatos

Temperatura baja: gana casi siempre el más probable. Salida estable y repetitiva.

Temperatura alta: los poco probables tienen su oportunidad. Salida variada, a veces brillante
y a veces disparatada.

<!--
2 min · acumulado 2:34
Precisión que vale la pena: la temperatura no hace al modelo más creativo ni más
tonto. Solo cambia cuánto se aparta del candidato más probable.
En los chatbots gratuitos no hay perilla de temperatura a la vista. Se controla
indirectamente, pidiendo en el prompt salidas más literales o más exploratorias.
-->

---

<!-- _class: panel -->

## ¿En cuál de tus tareas querrías la versión aburrida?

<!--
3 min · acumulado 2:37
Martín: abrir el pulso "s2-temperatura" y cerrarlo apenas voten los seis.
Comentar el resultado en treinta segundos: casi todo el trabajo técnico quiere
temperatura baja, y eso es una pista de para qué sirve esta herramienta acá.
Cierre del bloque 6.
-->

---

<!-- _class: seccion -->

## Contexto y entrenamiento

Bloque 7 de 9 · **25 min**

<!--
0 min · acumulado 2:37
Arranca 2:37, termina 3:02.
-->

---

## La ventana de contexto es la memoria de trabajo

Todo lo que el modelo puede mirar para elegir el próximo token: tu pregunta, sus respuestas
anteriores, los documentos que pegaste.

Tiene un tamaño máximo, medido en tokens. Lo que queda afuera, **no existe** para el modelo.

<!--
3 min · acumulado 2:40
El tamaño cambia todo el tiempo y por modelo, así que no dar una cifra exacta:
hoy es del orden de cientos de miles de tokens en los modelos grandes.
Lo que no cambia es el mecanismo, y es lo único que tienen que llevarse.
Metáfora útil: es un escritorio, no un archivo. Lo que está sobre el escritorio
lo mira; lo que se cayó al piso no lo busca.
No explicar la consecuencia todavía: la van a ver ellos en el ejercicio.
-->

---

<!-- _class: panel -->

## Achicá la ventana

`mpodeley.github.io/curso-ia-energia` · día 1

Bajá el tamaño de la ventana y mirá cuál es el mensaje que se cae primero.

<!--
8 min · acumulado 2:48
Ventana C, día 1, ejercicio "Qué se cae del escritorio".
Antes de proyectar: "Reiniciar ejercicio", por si quedó movido del ensayo.
Abre en 520 tokens, con la instrucción inicial ya caída y todos los datos
adentro. Ese es el caso limpio: los datos siguen ahí, la regla no.
Pedirles que primero lo lleven al máximo para leer la conversación entera, y
que después bajen de a poco. La pregunta es qué se pierde primero.
Sale solo: las reglas, porque las reglas se dan al principio.
Después bajar hasta 200 y mostrar que también se caen los datos.
Martín: ronda de tres nombres: "¿a quién le pasó que el chatbot dejó de
respetar algo que le pidió al principio?". Es exactamente esto, y no fue un
olvido.
-->

---

## De ahí salen dos frustraciones conocidas

En una conversación larga, el principio se cae del escritorio. El modelo no avisa: sigue
contestando con lo que le queda.

Y en un documento grande, lo que se cayó tampoco se busca solo. Hay que volver a pegarlo.

<!--
2 min · acumulado 2:50
Es la lectura de lo que acaban de ver, no material nuevo. Ir rápido.
La solución de verdad al segundo caso es la primera mitad del día 3: en vez de
pegar todo, buscar el pedazo que hace falta y pegar solo eso.
-->

---

<!-- _class: acentos -->

## Qué hacer con esto un martes a la mañana

- **Conversación nueva por tarea**: lo viejo no ayuda, ocupa lugar
- **Repetí la regla** cada tanto en una conversación larga: no es énfasis, es volver a ponerla en la ventana
- **Pegá el material**, no confíes en que lo recuerda

<!--
3 min · acumulado 2:53
Tres prácticas que salen directo del ejercicio; son las primeras del día que
se aplican mañana en el trabajo, sin entender nada más.
La segunda es la que más sorprende: subrayar o poner en mayúsculas una regla
que ya se cayó no le agrega nada. Repetirla funciona porque la vuelve a meter.
-->

---

## Cómo se entrena: dos etapas de tamaños muy distintos

Primero **lee** una fracción enorme de todo el texto humano, practicando una sola cosa:
predecir lo que sigue. De ahí salen la gramática, los hechos y los patrones.

Después, una etapa **mucho más chica**: personas le enseñan a comportarse como asistente.
El tono servicial y seguro sale de acá, y no tiene relación con si lo que dice es cierto.

<!--
6 min · acumulado 2:59
Lo único que hay que llevarse para manejar: el objetivo del entrenamiento es
continuar texto, y el tono seguro viene del ajuste posterior, no de saber.
Aprendió lo que había escrito, con sus errores y sesgos: lo escrito no es lo
verdadero.
Un modelo que solo pasó por la primera etapa no responde preguntas, las
continúa. La capacidad ya estaba; la segunda etapa le puso la interfaz.
Pregunta que suele aparecer: ¿aprende de lo que le escribo? No: lo que le
escribís entra como contexto de esa conversación, no cambia el modelo. Lo que
sí puede pasar con cuentas gratuitas es que la empresa use la conversación
para entrenar la versión siguiente, y eso es mañana ("qué no se sube").
Volvemos al tono seguro en el bloque de alucinaciones.
-->

---

<!-- _class: cita -->

## Nadie escribió esas reglas: **se ajustaron solas** mirando ejemplos

<!--
3 min · acumulado 3:02
La frase del bloque. Es también la razón por la que nadie puede abrir el modelo
y leer por qué contestó lo que contestó.
Si alguien quiere mirar adentro: la página tiene una sección entera para
curiosos, con el video de LeCun de 1989 y los enlaces de interpretabilidad.
Cierre del bloque 7.
-->

---

## Pausa · 10 min

Volvemos a la 3:12 del cronómetro. Dejá el chatbot abierto: lo usás al volver.

<!--
10 min · acumulado 3:12
Cortar el audio, no la pantalla.
Martín: pasar por el chat la consigna del bloque siguiente, para que la lean
en la pausa: "pensá una pregunta de tu especialidad cuya respuesta sepas de
memoria y sea pública: una norma, una cifra del regulador, un nombre. Nada de
la empresa". Avisar un minuto antes de volver.
-->

---

<!-- _class: seccion -->

## Alucinaciones en vivo

Bloque 8 de 9 · **35 min**

<!--
0 min · acumulado 3:12
Arranca 3:12, termina 3:47.
-->

---

## Si solo continúa texto plausible, cuando no sabe **no se calla**

No tiene un mecanismo para detectarse. Genera la continuación más plausible igual.

Un número de norma que parece real, un paper que suena citable, una cifra de producción con
tres decimales.

<!--
3 min · acumulado 3:15
Acá se cierra la cadena que abrimos a las 0:04: token, predicción, alucinación.
Y se explica lo que vieron fallar a la mañana: la cifra del campo Sacha y los
papers inventados salieron de esto.
Decirlo explícito: esto no es un bug que alguien vaya a arreglar el año que
viene. Es el comportamiento por defecto del mecanismo que acaban de ver.
Lo que sí mejora es la frecuencia. Lo que no cambia es que hay que verificar.
-->

---

<!-- _class: panel -->

## Una palabra: ¿qué te preocupa de que alucine?

<!--
2 min · acumulado 3:17
Martín: abrir el pulso "s2-palabra-alucinacion" y dejarlo abierto.
Dejar la nube a la vista mientras la completan; sirve de telón para lo que sigue.
No cerrar el pulso todavía: se cierra al volver de la demo, y ahí se comenta.
-->

---

<!-- _class: panel -->

## Hagámoslo alucinar

Miren dos cosas: qué **seguro** suena, y cuánto tardamos en **verificarlo**.

<!--
11 min · acumulado 3:28
Ventana D (chatbot), otra vez sin búsqueda. Preguntas en orden, de más sutil a
más evidente; ninguna sobre un campo de las empresas de la sala:

1) "¿Cuál fue la producción de petróleo de Argentina en junio de 2026 según el
   Capítulo IV de la Secretaría de Energía?"
   (va a dar una cifra con total seguridad; se verifica en datos.energia.gob.ar)

2) "Citame tres papers de la SPE sobre perforación direccional en la cuenca
   Oriente, con su número de SPE."
   (los números suelen ser inventados y se verifican en el momento)

3) "¿Qué artículo del Reglamento de Operaciones Hidrocarburíferas de Ecuador
   fija el plazo para reportar el cierre de un pozo?"
   (el reglamento es real; el artículo que dé va a tener la forma exacta de
   una cita y no va a resistir abrir el PDF. Es la mezcla de las dos causas, la
   peor: el marco real hace creíble al dato inventado)

Verificar UNA en vivo, buscándola delante de ellos. Que vean el chequeo, no la
afirmación de que hay que chequear.
Preguntar quién le habría creído a la primera respuesta si la veía sola.
Seguir a la slide siguiente sin volver al deck de fondo: ahora les toca a ellos.
-->

---

<!-- _class: panel -->

## Ahora vos: hacelo alucinar

Preguntale algo de **tu especialidad** que puedas verificar de memoria y sea público: una norma,
una cifra del regulador, un nombre. Nada de tu empresa. Pegá la respuesta en el chat.

<!--
12 min · acumulado 3:40
La consigna exacta ya la mandó Martín en la pausa: una pregunta de su área
cuya respuesta conocen de memoria y es pública. Nada de la empresa: hay cuatro
en la sala.
Cuatro minutos para probar; el resultado, pegado en el chat.
Martín: leer dos o tres en voz alta, con nombre, y pasarme el resto en una
línea. Clasificar con la sala: ¿le faltaba el dato, o el dato no existe y lo
completó igual?
Si a alguien "le salió bien", también es dato: preguntarle cómo lo verificaría
si NO supiera la respuesta de memoria. Esa pregunta es el puente a la cita
siguiente.
Con seis personas se escuchan todos; nadie comparte pantalla, el chat es
suficiente. Martín guarda el chat al final: esos ejemplos alimentan la cacería
de errores del día 4.
-->

---

<!-- _class: cita -->

## La salida de un LLM es un **borrador plausible**, no una fuente

<!--
3 min · acumulado 3:43
La misma regla de la mañana, ahora con la explicación atrás. Vale la pena
decirlo así: a la mañana era una advertencia, ahora es una conclusión.
Martín: cerrar el pulso de alucinación. Leo dos o tres palabras de la nube en
voz alta.
-->

---

## Esto no se arregla con más cómputo

La ventana de contexto crece, los modelos mejoran, la frecuencia baja. El mecanismo no cambia.

Lo que sí se puede cambiar es **de dónde saca el material**, y eso es el día 3.

<!--
4 min · acumulado 3:47
Dejar sembradas las dos salidas que trabajamos más adelante: darle las fuentes
buenas en vez de confiar en lo que recuerda (día 3), y armar un protocolo de
verificación propio (día 4).
No prometer que resuelven el problema. Lo acotan.
Cierre del bloque 8.
-->

---

<!-- _class: seccion -->

## Cierre

Bloque 9 de 9 · **13 min**

<!--
0 min · acumulado 3:47
Arranca 3:47, termina 4:00.
-->

---

<!-- _class: acentos -->

## Las cuatro maneras de fallar

- **Inventa lo que no sabe**: de cómo genera el texto, token por token · hoy
- **No hace lo que le pediste**: de cuánto control dan las instrucciones · mañana
- **Está seguro y equivocado**: de lo que aprendió y de lo que no · día 3
- **Se olvida de lo que le dijiste**: de cuánto puede mirar a la vez · hoy y día 3

<!--
4 min · acumulado 3:51
Hoy vieron el mecanismo de dos: la predicción y la ventana. Esta es la hoja de
ruta del curso, no materia; mañana y el día 3 no usamos estos nombres, y el
día 4 los juntamos en una tabla con el arreglo de cada uno.
No hay que memorizar nada. Lo único que quiero que se lleven: cuando algo salga
mal, la primera pregunta útil no es "¿cómo lo reescribo?" sino "¿cuál de las
cuatro fue?".
Ninguna de las dos de hoy es un bug: salen del mecanismo que acabamos de
recorrer, y no las va a arreglar la próxima versión del modelo.
La misma lista está en la página del día 1.
-->

---

<!-- _class: acentos -->

## Qué hacer con esto desde mañana

- **Tareas donde podés verificar rápido**: ahí rinde y el riesgo es bajo
- **Poné el material en la ventana**: pegá el texto en vez de confiar en su memoria
- **Desconfiá de todo número, cita o norma** que no hayas visto con tus ojos

<!--
3 min · acumulado 3:54
Los tres takeaways del día, en palabras llanas. Es el resumen operativo de las
cuatro horas y el puente a mañana, que es entero sobre cómo pedir bien.
Y la regla que abrió el día, en una frase: nada confidencial en cuentas
gratuitas.
Si queda tiempo, pedir un ejemplo de cada uno con tareas de ellos.
-->

---

## Tarea para mañana

Traé **una tarea real de tu semana** que le pedirías a un chatbot.

Tres líneas: qué le pedirías, qué material tendrías que darle, y cómo sabrías si lo hizo bien.

Si ya tenés cuenta, probala (sin datos confidenciales) y anotá qué salió **mal**. Cinco minutos.

<!--
3 min · acumulado 3:57
Es la única cosa que se pide entre días, y son cinco minutos. Mañana esa tarea
es la materia prima del taller "tu tarea, tu prompt": cada uno trabaja sobre
la suya.
Insistir en que anoten lo que salió MAL si la probaron. Es el material más
útil que van a traer, y con la hoja de ruta recién vista ya pueden arriesgar
cuál de las cuatro fue.
Plan B para mañana, si pocos la hicieron: tres minutos al arrancar el taller,
ahí mismo, con una tarea chica de la semana; el taller no depende de la tarea.
Martín: pegar la consigna en el chat, en tres líneas, y volver a mandarla por
el canal del curso mañana a las 8:00.
-->

---

## Mañana: prompting y análisis asistido de datos

- Escribir prompts con **rol, contexto, tarea, formato y ejemplos**, sobre tu tarea
- Saber **qué información de la empresa no debe subirse** a un chatbot
- Del **reporte diario de la ARCH** a una tabla verificada, y una declinación sobre pozos reales

<!--
2 min · acumulado 3:59
La segunda es la que cierra la regla que abrió el día. Anticiparlo: mañana
dejamos de decir "no subas datos confidenciales" y empezamos a decir qué sí,
qué no y por qué.
Nada de material previo obligatorio; el que quiera jugar con los laboratorios
o ver los videos de la página, bienvenido, pero mañana arranca de cero igual.
-->

---

<!-- _class: portada -->

# Nos vemos mañana

El quiz, los recursos y los laboratorios quedan en la página · **mpodeley.github.io/curso-ia-energia**

<!--
1 min · acumulado 4:00
Dejar proyectada mientras se despiden y responder lo que quede suelto.
Después de la clase: Martín exporta el CSV del relevamiento y el chat de la
ronda de alucinaciones; leemos juntos el bloque D de la encuesta y elegimos
los ejemplos de mañana con eso.
-->
