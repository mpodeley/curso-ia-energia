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

Bloque 1 de 7 · **12 min**

<!--
0 min · acumulado 0:00
Arranca 0:00, termina 0:12.
-->

---

<!-- _class: agenda -->

## Esta sesión

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| Apertura: quiénes somos, regla entre empresas, entrada al sitio | 12 min | Los dos instructores, una ronda de seis con nombre y empresa, la regla de confidencialidad y el ingreso con el PIN |
| ¿Qué es IA para vos? Definiciones en vivo y conversación | 12 min | Cada uno escribe su definición en una oración, las proyectamos con nombre y de ahí sale la diferencia entre IA estrecha e IA de propósito general |
| Setenta años en quince minutos: la línea de tiempo | 15 min | De Dartmouth y los sistemas expertos a ChatGPT y Claude Code, con los dos inviernos en el medio y un sistema experto que interpretaba perfiles de pozo |
| Cómo aprende una máquina: reglas, supervisado, no supervisado, capas | 25 min | Reglas escritas y reglas aprendidas: el duelo de declinación y 84 pozos reales, con etiquetas y sin etiquetas |
| Demos en vivo | 22 min | El chatbot frente a tareas reales: resumir un paper, explicar un término, escribir un correo difícil. Y verlo fallar |
| Encuesta de relevamiento | 12 min | La completamos juntos en vivo |
| Discusión | 12 min | Qué sorprendió y qué decepcionó de lo visto hasta acá |
| Pausa | 10 min | Si te quedó la encuesta a medias, es el momento: se guarda sola |

<!--
1 min · acumulado 0:01
Bajada: son cuatro días de cuatro horas, cada uno en dos sesiones de dos: de 10
a 12 y de 12 a 14 (de 8 a 10 y de 10 a 12 en Ecuador y Colombia). Hay una pausa
al final de la primera sesión y otra a mitad de la segunda. Esta sesión es qué
entendemos por IA, de dónde viene, cómo aprende una máquina, las demos y el
relevamiento; después de la pausa, en la sesión 2, una mirada bajo el capó,
lo justo.
La misma tabla está en la página de la sesión 1: deck y sitio no se contradicen.
Martín: el cronómetro arranca acá; avisarme por el chat privado cuando un
bloque se pase cinco minutos.
-->

---

## Al final de esta sesión van a poder

- Distinguir una **IA estrecha** de una **IA de propósito general**
- Contar cómo se llegó de los **sistemas expertos** a los modelos de hoy
- Distinguir aprendizaje **supervisado** de **no supervisado**, con pozos reales
- Ver en vivo qué puede y qué **no** puede hacer hoy un chatbot, y por qué se equivoca

Es un curso para aprender a manejar: del motor vemos solo lo que ayuda a manejar mejor.

<!--
1 min · acumulado 0:02
La frase del auto es el encuadre de los cuatro días: decirla y dejarla. Nadie
sale de acá experto en machine learning; salen manejando mejor la herramienta.
El cuarto punto se arma en las demos y se cierra en la discusión: es la
primera distinción práctica del curso, y la sesión 2 explica de dónde sale.
-->

---

<!-- _class: dupla -->

## Quiénes somos

### Matías Podeley

**Dicta.** Ingeniero en petróleo e industrial (ITBA). Hizo el programa Energy Innovation and
Emerging Technologies de Stanford y un intercambio en informática en el INSA de Lyon, y cursa la
certificación AI Security Professional de Practical DevSecOps. Ayuda a equipos de petróleo, gas y
minería a convertir ideas en oportunidades de negocio, herramientas internas y proyectos concretos
con IA, datos, ingeniería y ciberseguridad.

### Martín Alvarado

**Lleva el chat, los pulsos y las rondas.** Ingeniero de reservorios senior, con más de 25 años de
trabajo para operadoras y consultoras de todo el mundo: Halliburton, Petrobras, Pluspetrol y
Beicip-Franlab (IFPEN), y como consultor para Netherland, Sewell & Associates, Gazprom Neft, PDVSA,
GeoPark y Wintershall Noordzee, entre otras. Simulación de yacimientos, ajuste histórico,
estimación de reservas (SPE-PRMS) y recuperación mejorada.

<!--
2 min · acumulado 0:04
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

Seis personas, medio minuto cada una. Contá tu rol, sin datos de la empresa.

<!--
4 min · acumulado 0:08
Martín: llamar por nombre, en el orden de la lista de asistentes, y anotar en
el chat rol y país de cada uno. Esa lista es la que usa después para las
rondas del día.
Son 4 personas en Ecuador, 1 en Argentina y 1 en Colombia; cuatro empresas.
Escuchar qué hace cada uno: los ejemplos de las demos se eligen con eso
(reservorios, producción, planificación).
Cortar a los treinta segundos con amabilidad: la ronda larga es la de la
discusión, a la 1:38.
-->

---

<!-- _class: cita -->

## En estos ejercicios **no** usamos datos confidenciales de ninguna empresa

Hay cuatro empresas en la sala. Ni volúmenes reales de producción, ni nombres de contratos, ni
información de partners: nada de eso va al chat ni a un chatbot gratuito. Los ejemplos salen de
fuentes públicas: el reporte diario de la ARCH y el Capítulo IV.

<!--
2 min · acumulado 0:10
La regla del día uno, temprano y grande, y hoy con una razón extra: en la
sala hay competidores. Ninguna ronda pide un dato propio; cuando pida "una
tarea de tu semana", alcanza con describir el tipo de tarea, sin su contenido.
ARCH: Agencia de Regulación y Control de Hidrocarburos, Ecuador. Capítulo IV:
producción por pozo de la Secretaría de Energía, Argentina. Decir los nombres
completos una vez.
La razón la mostramos en la sesión 7: qué pasa con lo que se sube a un
chatbot gratuito. Si alguien pregunta por la versión empresarial: existe, cambia
el contrato de datos, lo vemos mañana en la sesión 3. Hoy trabajamos con cuentas gratuitas.
-->

---

<!-- _class: panel -->

## Antes de empezar, entrá al sitio

`mpodeley.github.io/curso-ia-energia`

Vamos a usar la página de la sesión 1 varias veces. El PIN del curso lo dicto en voz alta.

<!--
2 min · acumulado 0:12
Dictar el PIN y esperar a que todos entren. Que escriban nombre y apellido:
las respuestas de hoy se cruzan con las del taller de la sesión 6, y el nombre
es el que aparece en la tarjeta de su definición en el bloque que sigue.
Martín: confirmar por el chat que los seis ven la página de la sesión 1 con su
nombre arriba. Si alguien no puede entrar (firewall de la empresa), que siga
desde el celular; el pulso del bloque siguiente también se contesta desde ahí.
Pedirles que dejen la página abierta: la usamos enseguida.
-->

---

<!-- _class: seccion -->

## ¿Qué es IA para vos?

Bloque 2 de 7 · **12 min**

<!--
0 min · acumulado 0:12
Arranca 0:12, termina 0:24.
-->

---

<!-- _class: panel -->

## En una oración: ¿qué es la inteligencia artificial para vos?

Escribila en la página de la sesión 1, en el recuadro de pulsos. Sin buscar: la que te salga.

<!--
3 min · acumulado 0:15
Martín: abrir el pulso "s1-definicion-ia". Tres minutos para escribir. El
panel muestra las tarjetas a medida que llegan, con el nombre de cada uno; no
hace falta cerrarlo para proyectar. Cerrarlo cuando hayan respondido los seis.
Mientras escriben, no dar ejemplos de definiciones: cualquier ejemplo mío
arrastra las de ellos.
Plan B si el pulso no anda (firewall): que la escriban en el chat de la
videollamada y Martín las lee en voz alta.
-->

---

<!-- _class: panel -->

## Las definiciones de ustedes

Una por persona, con su nombre. Las leemos y las agrupamos.

<!--
5 min · acumulado 0:20
Proyectar el panel desde la ventana B, en modo proyección: una tarjeta por
persona. Leerlas en voz alta y agruparlas en familias, sin corregir ninguna:
- las que hablan de hacer tareas (resolver, automatizar, ayudar);
- las que hablan de imitar a una persona;
- las que hablan de aprender de datos o de patrones;
- las que hablan de pensar, entender o razonar.
Martín: llamar a dos o tres por nombre, con una repregunta: "¿por qué esa
palabra?". Anotar en el chat las palabras que se repiten.
El campo tampoco tiene una definición cerrada: Turing la planteó en 1950 como
un juego de imitación, una conversación escrita donde la máquina intenta pasar
por persona; en Dartmouth, en 1956, el proyecto se propuso describir la
inteligencia con tanta precisión que una máquina pudiera simularla. Las dos
están en la línea de tiempo que sigue.
El puente al slide siguiente: casi todas las definiciones describen algo que
resuelve una tarea. La pregunta es cuántas.
-->

---

<!-- _class: figura -->

## Una tarea o muchas

![IA estrecha: un modelo por tarea. IA de propósito general: un modelo, muchas tareas](img/estrecha-vs-general.svg)

En este curso, general quiere decir de propósito general: un mismo modelo para muchas tareas.

<!--
4 min · acumulado 0:24
IA estrecha: un modelo por tarea. El filtro de spam, el clasificador de
imágenes, el modelo que pronostica una declinación. Deep Blue, que le ganó a
Kasparov en 1997, es el ejemplo clásico: un sistema construido para una sola
tarea (hito de la línea de tiempo).
IA de propósito general: el mismo modelo resume, traduce, escribe código,
analiza una planilla y redacta un correo. Eso es lo que llegó a todos los
escritorios con ChatGPT, a fines de 2022.
Volver a las definiciones proyectadas: ¿cuáles describían una IA estrecha y
cuáles una general? Una o dos, no más.
Si alguien pregunta por la AGI: la definición y la discusión están en la
sesión 8; hoy alcanza con separar las dos ideas.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## Setenta años en quince minutos

Bloque 3 de 7 · **15 min**

<!--
0 min · acumulado 0:24
Arranca 0:24, termina 0:39.
-->

---

<!-- _class: figura -->

## De Turing a hoy, en cuatro eras

![Línea de tiempo de 1950 a 2026 con cuatro eras: reglas escritas a mano, aprender de datos, redes profundas y modelos generales](img/linea-de-tiempo.svg)

Cada hito tiene su fuente en la línea de tiempo interactiva de la página de la sesión 1.

<!--
3 min · acumulado 0:27
Recorrer las cuatro bandas de izquierda a derecha, sin leer los hitos: lo que
cambia de una era a la otra es quién escribe las reglas. En la primera las
escribe una persona; en la segunda la máquina las encuentra en los datos; en
la tercera, con redes de muchas capas, aprende hasta la forma de la función;
en la cuarta, un mismo modelo sirve para muchas tareas.
Los detalles vienen en las slides que siguen. La línea completa, con cada
hito y su fuente, queda en la página para verla después.
-->

---

## Reglas escritas a mano

- **1956, Dartmouth**: un proyecto de verano busca describir la inteligencia con tanta precisión que una máquina pueda simularla. De ahí sale el nombre del campo
- **Sistemas expertos**: sacarle el conocimiento a un especialista y escribirlo como reglas del tipo *si pasa esto, hacé aquello*. R1, en 1980, tenía 772 reglas
- **1981, Dipmeter Advisor**: el MIT y Schlumberger arman un sistema experto que infiere la estructura geológica a partir del perfil de buzamiento

<!--
3 min · acumulado 0:30
El ancla de la industria es el Dipmeter Advisor: la IA llegó al pozo hace más
de cuarenta años, imitando a los intérpretes expertos en una tarea que se
aprende con años de práctica. Preguntar si alguien trabajó con perfiles de
buzamiento.
R1 (John McDermott, Carnegie Mellon) configuraba las computadoras VAX de
Digital Equipment Corporation. La receta de la época: el conocimiento lo pone
una persona, regla por regla.
MIT: Instituto Tecnológico de Massachusetts. Decirlo completo una vez.
-->

---

<!-- _class: acentos -->

## Dos inviernos

- **1973, informe Lighthill**: el consejo de investigación científica británico concluye que la IA decepcionó lo esperado. En el Reino Unido, la confianza en el campo cae por casi una década
- **1984, la Asociación Estadounidense de IA (AAAI)** advierte que las expectativas están demasiado altas. El peor escenario que describen incluye a Schlumberger y Texas Instruments perdiendo interés

<!--
2 min · acumulado 0:32
Un invierno es un período en que el campo pierde la confianza de quienes lo
financian y lo usan. Los dos datos salen de la línea de tiempo, con su fuente.
El detalle que le habla a esta sala: en 1984 la industria ya era cliente de
los sistemas expertos, y los investigadores la nombran en su advertencia.
Pregunta para la sala, sin responderla yo: ¿se parece en algo al momento
actual? Una o dos voces, un minuto. No abrir debate largo: la conversación
sobre el futuro está en la sesión 8.
-->

---

## Aprender de datos

- **1986**: la retropropagación entrena redes con capas ocultas a partir de sus errores
- **1989**: una red de los Laboratorios Bell lee los códigos postales
- **1997**: Deep Blue le gana a Kasparov; IA estrecha, una sola tarea
- **2009**: ImageNet, 3.2 millones de imágenes etiquetadas por personas
- **2012**: AlexNet gana ImageNet con 15.3% de error contra 26.2%, en dos placas gráficas (GPU)

<!--
2 min · acumulado 0:34
La regla pasa a encontrarla la máquina mirando ejemplos. Deep Blue queda como
contraejemplo: gana al campeón del mundo en una sola tarea.
AlexNet junta los tres ingredientes de lo que sigue: muchos datos etiquetados,
cómputo en placas gráficas y redes con muchas capas. Los dos videos de esta
parte (LeNet y AlexNet) están en el material de la página.
GPU: unidad de procesamiento gráfico, las placas de los videojuegos.
-->

---

<!-- _class: figura -->

## Los últimos quince años, de AlexNet a hoy

![Línea de tiempo de 2012 a 2026: AlexNet, AlphaGo, Transformer, GPT, GPT-2, GPT-3, InstructGPT, ChatGPT, LLaMA, GPT-4, Claude, o1, DeepSeek-R1, Claude Code, Claude Mythos y GPT-6 Astra](img/linea-de-tiempo-reciente.svg)

2017, el transformer. 2022, ChatGPT. 2024, modelos que razonan antes de responder. 2025, agentes como Claude Code.

<!--
3 min · acumulado 0:37
Leer el camino en cinco pasos, con el dedo en la figura:
1) 2017, el transformer (Google): una arquitectura más paralelizable y mucho
   más rápida de entrenar. Todo lo que sigue se construye sobre ella.
2) 2018 a 2020, GPT, GPT-2 y GPT-3: leer texto sin etiquetar y predecir la
   palabra siguiente; GPT-3 ya traduce y responde preguntas sin reentrenarlo.
3) En marzo de 2022, InstructGPT: personas le enseñan a seguir instrucciones
   (aprendizaje por refuerzo con retroalimentación humana, RLHF). El 30 de
   noviembre de 2022 sale ChatGPT, con ese mismo entrenamiento.
4) 2024, o1: modelos que razonan paso a paso antes de responder.
5) 2025, Claude Code: el modelo general con herramientas y un loop, que pasa
   de conversar a hacer (lo vemos en la sesión 6). En 2026, Anthropic reserva
   Claude Mythos Preview por seguridad y OpenAI presenta GPT-6 Astra.
Cómo funciona cada paso es la sesión 2. Hoy alcanza con el mapa.
-->

---

<!-- _class: acentos -->

## Tres cosas que se juntaron

- **Datos**: todo el texto de internet, disponible y digitalizado
- **Cómputo**: las placas gráficas (GPU), que resultaron ser justo la máquina que estos modelos necesitaban
- **Una arquitectura que escala**: el *transformer*, 2017

<!--
2 min · acumulado 0:39
La respuesta a "¿por qué ahora y no en 2010?". En las hipótesis suele salir
"más computadoras", que es un tercio de la respuesta.
Lo importante del transformer es que mejora al agrandarlo, de forma
predecible. Eso convirtió la investigación en ingeniería: si duplico datos y
cómputo, sé aproximadamente cuánto mejora. Consecuencia práctica: lo que hoy
no funciona bien probablemente funcione mejor en un año; lo que falla por
diseño (las alucinaciones, sesión 2) no se arregla solo agrandando.
Cierre del bloque 3.
-->

---

<!-- _class: seccion -->

## Cómo aprende una máquina

Bloque 4 de 7 · **25 min**

<!--
0 min · acumulado 0:39
Arranca 0:39, termina 1:04.
-->

---

## Reglas escritas y reglas aprendidas

En un sistema experto, **la regla la escribe una persona**.

En el aprendizaje automático (*machine learning*), **la máquina encuentra la regla mirando
ejemplos**. Sirve cuando la fórmula no existe o no la conocemos.

Y en el medio está lo que siempre hicimos: **una curva de declinación ajustada a mano ya es un
modelo**. La fórmula la ponés vos, y los datos ponen los parámetros.

<!--
2 min · acumulado 0:41
Para los que no son de reservorios (planning, administración): la línea de
tendencia en Excel es el mismo gesto, sobre costos, demanda o avance de obra.
Si preguntan por la regresión lineal: es estadística cuando la usás para
entender (coeficientes, significancia) y es machine learning cuando la máquina
elige sola los parámetros para predecir y se la valida con datos que no vio.
La matemática es la misma; cambian la intención y el ritual de validar.
Entregar al ejercicio: "no se los voy a contar, lo van a hacer ustedes".
-->

---

<!-- _class: panel -->

## Ajustala vos

En la página de la sesión 1, el duelo de declinación.

Dos perillas y un número que tiene que bajar: el error. Bajalo todo lo que puedas.

Si ya lo hiciste antes de hoy, apretá "Reiniciar ejercicio" y arrancá de cero.

<!--
5 min · acumulado 0:46
Ventana C (el sitio), página de la sesión 1, ejercicio "Ajustala vos, después que
la busque la máquina".
ANTES de proyectar: apretar "Reiniciar ejercicio". Si ensayé antes de la clase,
el navegador se acuerda y el ejercicio abre con la respuesta puesta.
Arranca en una recta plana, con 66% de error. En tres minutos la mayoría llega
a algo entre 3% y 8%. El mejor ajuste posible con estas perillas es 2.17%.
Que aprieten "Listo, este es mi ajuste" antes de seguir.
Mientras trabajan, decir en voz alta que esto es la regla escrita a mano:
eligieron una forma funcional y estimaron los parámetros a ojo.
Este ejercicio no depende del Worker: si el firewall bloquea los pulsos, esto
funciona igual.
Martín: pedir por el chat que cada uno escriba su error cuando aprieta
"Listo"; leo los seis números en voz alta antes de pasar a la máquina.
-->

---

<!-- _class: panel -->

## Ahora que la busque la máquina

El botón está abajo del gráfico. La máquina tiene los puntos y un criterio, y los valores los encuentra sola.

<!--
4 min · acumulado 0:50
Ventana C otra vez. Que aprieten "Que la busque la máquina".
Leer la tabla en voz alta: su ajuste contra el de ella. Casi siempre gana la
máquina, y por el doble: 1.06% contra el 2.17% del mejor ajuste posible a mano.
Abrir el desplegable "Los valores con los que se generó esta curva": qi 320 y
Di 2.1%/mes. La máquina cayó justo encima sin que nadie se los dijera.
Ni con los valores exactos el error da cero: queda 1.06%, que es el ruido de
medición. Un modelo que llega a cero está copiando el ruido.
Si alguien le ganó a la máquina, mostrarlo: barre una grilla finita, y por eso
a veces se le puede ganar.
Puente: esto ya es aprendizaje supervisado. Cada punto trae su respuesta, el
caudal que el pozo produjo ese mes, y la máquina busca la curva que mejor la
reproduce.
-->

---

<!-- _class: figura -->

## Tres maneras de aprender

![Tres columnas: supervisado, con pozos que traen su tipo; no supervisado, con puntos grises en grupos; autosupervisado, con la palabra siguiente de un texto tapada](img/tres-maneras.svg)

Hoy vemos las dos primeras con pozos reales. La tercera es la que usan los modelos de lenguaje: la sesión 2 arranca por ahí.

<!--
3 min · acumulado 0:53
Supervisado: los ejemplos traen la respuesta. El duelo que acaban de hacer, y
los pozos con el tipo que declaró la operadora.
No supervisado: los ejemplos vienen sin respuesta; la máquina arma grupos por
su cuenta, y ponerles nombre queda para una persona.
Autosupervisado: la respuesta sale del propio dato. Se tapa la palabra
siguiente de un texto y el modelo intenta adivinarla. Nadie tuvo que etiquetar
nada, y por eso alcanza con tener mucho texto. Una línea y nada más: es el
arranque de la sesión 2.
-->

---

<!-- _class: panel -->

## Los mismos pozos, con etiquetas y sin etiquetas

En la página de la sesión 1, abajo del duelo.

84 pozos activos de la cuenca Noroeste, del Capítulo IV. Probá las dos pestañas.

<!--
5 min · acumulado 0:58
Ventana C, ejercicio "Los mismos pozos, con etiquetas y sin etiquetas". Dos
ejes que cualquier ingeniero lee de un vistazo: la relación gas-petróleo
(RGP, escala logarítmica) y el corte de agua de los últimos doce meses.
Con etiquetas: que ubiquen un pozo nuevo tocando el gráfico. Los cinco vecinos
más cercanos votan el tipo. El recuadro "aciertos tapando cada etiqueta" dice
cuántas veces acierta si se tapa el tipo de cada pozo y se lo predice con los
demás: con los datos de hoy, 82 de 84. Leer el número de la pantalla, que se
calcula en vivo.
Sin etiquetas: "Buscar 2 grupos" y después "Comparar con las etiquetas". Sin
haber visto nunca el tipo declarado, la máquina separa los pozos casi igual
que la operadora: con los datos de hoy, 81 de 84.
Martín: pedir que uno por empresa diga en el chat qué predijo su pozo nuevo.
-->

---

<!-- _class: figura -->

## Lo que encontró la máquina, y lo que queda para ustedes

![Los mismos pozos coloreados por el tipo declarado y por los dos grupos que encontró k-means, con borde en los tres que no coinciden](img/pozos-aprendizaje.svg)

Los que caen en el grupo equivocado son los interesantes: petrolíferos con relación gas-petróleo de pozo de gas.

<!--
2 min · acumulado 1:00
Preguntar a la sala qué puede explicar esos tres pozos: casquete de gas, una
etiqueta vieja que nadie actualizó, un pozo que cambió con los años. Para
responderlo hace falta conocer el yacimiento. Ponerles nombre a los grupos es
trabajo de una persona.
Detalle para los curiosos: los grupos dependen de cómo se mide la distancia.
Acá una década de RGP pesa lo mismo que todo el rango del corte de agua; con
otra escala, los grupos cambian. Está explicado en la página.
-->

---

<!-- _class: figura -->

## Cuatro capas, una dentro de otra

![Capas anidadas: inteligencia artificial, aprendizaje automático, redes profundas e IA generativa, con un ejemplo del rubro en cada una](img/capas.svg)

Cada capa se apoya en la anterior, que sigue vigente.

<!--
2 min · acumulado 1:02
Recorrer de afuera hacia adentro con el ejemplo de cada capa. La inteligencia
artificial incluye los sistemas expertos de reglas escritas; el aprendizaje
automático, lo que acabamos de hacer con los pozos; las redes profundas, lo
que viene en la slide siguiente; la IA generativa, el chatbot.
Todo lo de afuera sigue siendo la herramienta correcta para la mayoría de los
problemas con números: el chatbot se suma a lo que ya había.
-->

---

## Redes profundas

Aprendizaje automático con **redes neuronales de muchas capas**: más datos y más cómputo, y a
cambio patrones mucho más complejos.

Acá entran las imágenes sísmicas, los registros de pozo, el texto. La red aprende hasta **la
forma de la función**.

Los **modelos grandes de lenguaje (LLM)** son redes profundas llevadas al extremo, y son el caso
que nos ocupa el resto del curso.

<!--
2 min · acumulado 1:04
No entrar en arquitectura. Lo único que tiene que quedar: "profunda" quiere
decir muchas capas de transformación aprendidas de los datos.
El video de Welch Labs de la página ("el momento en que dejamos de entender")
es el hilo que se retoma en la sesión 2 (mirar adentro) y en la sesión 7
(verificar porque no se puede mirar todo).
Puente a las demos: ahora sí, el chatbot.
Cierre del bloque 4.
-->

---

<!-- _class: seccion -->

## Demos en vivo

Bloque 5 de 7 · **22 min**

<!--
0 min · acumulado 1:04
Arranca 1:04, termina 1:26.
-->

---

## Tres tareas reales

- Resumir un **paper de la Society of Petroleum Engineers (SPE)**
- Explicar un **término técnico** a alguien no técnico
- Redactar un **correo difícil**

Y la cuarta, la más importante, es **verlo fallar**.

<!--
1 min · acumulado 1:05
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
9 min · acumulado 1:14
Cambiar a la ventana D (chatbot). Prompts exactos, en orden:

1) "Resumí este resumen de paper de la SPE en cinco viñetas para un gerente que
   no es ingeniero de reservorios: <pegar abstract público>"

2) "Explicá qué es la recuperación secundaria por inyección de agua como si le
   hablaras a un directorio no técnico. Máximo 150 palabras, sin fórmulas."

3) "Redactá un correo para avisarle a un contratista que vamos a postergar una
   intervención dos semanas por disponibilidad de equipo. Tono cordial pero firme,
   sin comprometer fecha nueva."

El término de la demo 2 está elegido a propósito: es el tema del caso de la sesión 8,
y dos de las cuatro empresas tienen inyección de agua en campos maduros. No nombrarlas.
Martín: pegar cada prompt en el chat apenas lo corro, para que lo tengan a
mano después. Entre demo y demo, un nombre: "¿te sirve tal cual, o qué le
cambiarías?". Un minuto por respuesta, no más; si el tiempo aprieta, la
ronda va solo después de la tercera.
Volver al deck en la slide siguiente.
-->

---

## Qué acabamos de ver

Respondió rápido, ordenado y con buen tono, **sin ninguna garantía de que sea cierto**.

El chatbot no tiene un botón de "no sé". Cuando no sabe, sigue escribiendo igual.

<!--
1 min · acumulado 1:15
Puente al fallo deliberado. Preguntar si alguien notó algo raro en las respuestas
anteriores; a veces ya lo cazaron solos y es mejor si sale de ellos.
-->

---

<!-- _class: panel -->

## Ahora, a hacerlo fallar

<!--
8 min · acumulado 1:23
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
la ARCH en controlhidrocarburos.gob.ec. Que vean el chequeo completo.
Comentar al pasar, sin slide, las dos causas: a una le faltaba el dato (nunca
leyó ese reporte, y en vez de decirlo escribió la cifra más creíble) y en la
otra el dato no existe en ninguna parte, y aun así salió con la forma exacta
de una cita. La primera se arregla trayéndole el documento (sesión 5); la
segunda hay que verificarla (sesión 7). La segunda pregunta de la discusión
retoma esta distinción. El POR QUÉ viene después de la pausa: no adelantarlo.
Volver al deck.
-->

---

<!-- _class: cita -->

## La salida de un LLM es un **borrador plausible**: se verifica antes de usarlo

<!--
1 min · acumulado 1:24
La regla que nos acompaña los cuatro días.
En la sesión 2, después de la pausa, vemos POR QUÉ pasa esto: sale del mecanismo mismo, así que
nadie lo va a arreglar con un parche.
-->

---

<!-- _class: panel -->

## ¿Cuánto confiarías ahora?

<!--
2 min · acumulado 1:26
Martín: abrir el pulso "s1-confianza".
Es la confianza declarada después de ver fallar al modelo: contrastarla con el
tono de las definiciones del arranque.
No proyectar las barras mientras votan (el que mira ancla su voto en el de los
demás): Martín cierra el pulso cuando votaron los seis y recién ahí muestro el
resultado desde la ventana B. Cierre del bloque 5.
-->

---

<!-- _class: seccion -->

## Encuesta de relevamiento

Bloque 6 de 7 · **12 min**

<!--
0 min · acumulado 1:26
Arranca 1:26, termina 1:38.
-->

---

## La encuesta que ajusta el curso

El caso real de la sesión 8 ya está armado sobre datos públicos. Lo que falta saber es lo de ustedes:
qué rol tiene cada uno, qué tareas repetitivas le comen la semana, qué datos maneja y en qué formato.

El último bloque pide una sola cosa: **el problema que probarías primero**. Con eso arranca el
taller de la sesión 6, donde cada empresa escribe su caso en una página.

<!--
1 min · acumulado 1:27
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

Son doce preguntas y unos diez minutos, y ninguna pide datos confidenciales.

<!--
11 min · acumulado 1:38
Dejar esta slide proyectada mientras la completan. No cambiar de ventana: que
tengan la URL a la vista todo el bloque.
Martín: mirar el panel; con seis personas se ve al instante quién va
completando, y se puede preguntar por nombre si alguien se trabó. A los 8 min
avisar por el chat que quedan 3.
El que no llegue la termina en la pausa: se guarda sola.
-->

---

<!-- _class: seccion -->

## Discusión

Bloque 7 de 7 · **12 min**

<!--
0 min · acumulado 1:38
Arranca 1:38, termina 1:50.
-->

---

## ¿Qué tarea de tu semana laboral te parece **más** automatizable con lo que viste hoy?

¿Y cuál **menos**?

<!--
6 min · acumulado 1:44
Primera pregunta de discusión. Dejarla proyectada mientras hablan.
Martín: ronda completa con nombre, un minuto cada uno; no preguntar al aire.
Con seis alcanza el tiempo para que hablen todos.
Si nadie arranca, empezar por la de "menos": es más fácil y suele destrabar.
Anotar todo: esto alimenta los ejemplos de mañana igual que la encuesta. Solo
tipos de tarea, sin contenido de la empresa.
-->

---

## El chatbot respondió algo incorrecto con total seguridad

¿Le **faltaba el dato**, o el dato **no existía** y lo completó igual?

<!--
6 min · acumulado 1:50
Segunda pregunta. Esta pide un diagnóstico: que clasifiquen cada error que
vieron en una de las dos causas.
Buscar que salga la idea de "verificable": las tareas donde puedo comprobar el
resultado rápido son las tareas seguras.
Si sale "entonces no sirve", repreguntar: ¿un borrador de un pasante sirve?
Pregunta de reserva si sobra tiempo: ¿dónde ya hay machine learning escondido
en el software que usás? (simuladores, sísmica, mantenimiento predictivo).
Cierre del bloque 7 y de la sesión 1.
-->

---

## Pausa · 10 min

A las 12:00 (10:00 en Ecuador y Colombia) sigue la **sesión 2**, con su propio deck.
Si te quedó la encuesta a medias, es el momento.

<!--
10 min · acumulado 2:00
Cortar el audio y dejar la pantalla compartida, con esta slide proyectada.
En la pausa, abrir el deck de la sesión 2 en la ventana A y dejarlo en la
portada; las otras tres ventanas quedan como están.
Martín: revisar en el panel quién terminó la encuesta y recordarle por chat
privado a quien no. Exportar lo que haya hasta ahora y leer por arriba el
bloque D: si alguien escribió algo que sirve como ejemplo para la sesión 2, me
lo pasa en una línea. Avisar por el chat un minuto antes de volver.
-->
