---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 8**'
footer: 'mpodeley.github.io/curso-ia-energia'
---

<!-- _class: portada -->

# El caso y el horizonte

Sesión 8 de 8 · día 4 · 2 h en vivo · **PCR · CGC · Tecpetrol · Andes Petroleum**

<!--
0:00 · portada mientras vuelven de la pausa
Ventanas de esta sesión: A este deck, C el sitio en la página de la sesión 8,
D el Libro A de Puesto Guardián abierto en la planilla y la terminal con
resumen_cuenca.py listo, E las pestañas del bloque del futuro.
Todo esto se deja preparado antes de la sesión 7: la pausa dura diez minutos.
Las pestañas del futuro abiertas y ya cargadas (Our World in Data, Epoch,
LifeArchitect, y los dos videos). Los videos van desde el navegador:
dejarlos arrancados unos segundos y pausados, para que el buffer esté
hecho, y el de Kosinski ya posicionado en el minuto 36. Al compartir
pantalla, tildar "compartir audio de la pestaña".
Retomar en una frase: la sesión 7 dejó las reglas; esta las usa dos veces,
contra el caso prearmado y contra el caso de cada empresa.
Martín: confirma en el chat quién volvió, y tiene a mano la lista de las
cuatro empresas para las rondas.
-->

---

<!-- _class: agenda -->

## Esta sesión

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| El caso, en vivo | 30 min | La vuelta de la pausa, y el screening recorrido de punta a punta sobre el Capítulo IV |
| La crítica: el caso y los cuatro de ustedes | 22 min | El protocolo aplicado al caso prearmado y a la página de cada empresa |
| Pausa | 10 min | |
| Hoja de ruta | 10 min | Mañana, noventa días, decisión corporativa |
| El futuro, en pantalla | 33 min | La frontera, los modelos locales, los riesgos |
| Cierre del curso | 15 min | Entender, lo que queda, y una cosa distinta para el lunes |

<!--
2 min · acumulado 0:02
La misma tabla está en la página de la sesión 8.
Dos partes. Primero el caso, y las reglas de la sesión 7 se le aplican al
caso y a las cuatro páginas que escribieron ayer. Después de la pausa, la
última hora levanta la vista, y tiene un motivo práctico: sin una idea de
dónde va a estar la herramienta, el proyecto se dimensiona contra la de hoy.
-->

---

## Al final de esta sesión van a poder

- Leer un **screening** hecho sobre datos públicos y decir qué parte de la pregunta no contesta
- Pasar **su caso** por el protocolo: dónde alucina, qué dato no sale, cómo se verifica
- Llevarse una **hoja de ruta** por empresa, y discutir el **futuro con datos**

<!--
1 min · acumulado 0:03
El bloque del futuro se anuncia como lo que es: especulación declarada. La
única regla es la del curso, separar el dato de la fe.
-->

---

<!-- _class: seccion -->

## El caso, en vivo

Bloque 1 de 5 · **30 min**

<!--
0:03 · el bloque arranca con la portada (los tres minutos de retomar son
suyos) y termina 0:30
-->

---

## La pregunta es la de Pindo y la de Libertador

El **screening de waterflooding**: dónde conviene inyectar agua, o revisar la que ya se
inyecta. Un campo maduro con inyección, recobro por debajo del 30%, declinación y un contrato
con barriles y fecha.

Prearmado antes del curso, sobre datos públicos. Hoy se muestra y se critica.

<!--
3 min · acumulado 0:06
Decir de entrada de dónde sale: lo armó el instructor antes del curso, con
el mismo loop de agente de ayer, sobre datos públicos. No se construyó con
datos ni preguntas de ninguna de las cuatro empresas. Por eso hoy se
critica.
La pregunta les habla a dos de las cuatro por su nombre: Pindo tiene 17
productores, 1 inyector y 3 reinyectores con recobro 28%; Libertador tiene
16 pozos en inyección secundaria. Todo público. Y a las otras dos les habla
por la ARCH: un pozo cerrado por alto corte de agua es un pozo sobre el que
alguien tiene que decidir algo.
El alcance, fijado de antemano: un screening con criterios; la simulación
queda para los reservoristas.
-->

---

## Dónde se puede correr de punta a punta

Argentina, porque el **Capítulo IV** publica producción e inyección pozo por pozo y mes por
mes.

**1,003 pozos · 88,093 registros mensuales · enero de 2019 a julio de 2026.**

El gancho ecuatoriano es la lista que extrajeron el martes: los pozos cerrados por **alto
corte de agua** en el reporte diario de la ARCH.

<!--
3 min · acumulado 0:09
Ventana D. Es el mismo conjunto de datos donde el agente de ayer trabajó en
vivo, ahora bajado entero: ocho años de archivos anuales, filtrados por
cuenca al vuelo.
Decir el precio: 2.5 GB de descarga y un script de sesenta líneas. Eso es
todo lo que hizo falta para tener el dato público.
La lista del martes es el punto de partida de un screening: dice qué pozos
ya están fuera por agua, y qué hacer con ese patrón es la pregunta del
screening.
-->

---

<!-- _class: panel -->

## Primer resultado, y no es el que esperábamos

De los **5.6 millones de m³** de agua inyectada en la cuenca, el 97.3% entra por pozos
**Sumidero**, que disponen del agua producida. Solo el 2.7% va a recuperación secundaria.

Seis pozos figuran como inyección de agua en toda la cuenca. **Uno solo inyectó** algo en
91 meses.

<!--
6 min · acumulado 0:15
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
3 min · acumulado 0:18
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
7 min · acumulado 0:25
Ventana D, en orden:
1. El CSV crudo: idpozo, mes, metros cúbicos. Nadie piensa en metros cúbicos
   por mes; la herramienta piensa en barriles por día.
2. La conversión, que es donde se cuela el primer error posible: el tef de
   Capítulo IV cuenta días de PRODUCCIÓN, así que un inyector informa
   siempre cero. Cargado sin mirar eso, los inyectores desaparecen del
   libro y el screening se queda sin la mitad que le importa. Pasó acá: el
   modelo siguió de largo y lo agarró una persona contando filas.
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
5 min · acumulado 0:30
Mostrar la hoja de completitud de datos: el libro dice en la cara qué
porcentaje tiene y se niega a calcular el índice sin eso.
Y ese es el punto que vale para las cuatro: lo que traba el screening es la
falta de volumetría, fluidos y roca, datos que ningún modelo nuevo puede
inventar. Y ese Nivel 2 es primer nivel del mapa de datos: corrido con datos
propios, el libro viaja adentro de la red.
Decir el costo real: horas del instructor, y qué haría falta para repetirlo
adentro con datos propios.
Cierre del bloque 1.
-->

---

<!-- _class: seccion -->

## La crítica: el caso y los cuatro de ustedes

Bloque 2 de 5 · **22 min**

<!--
0:30 · arranca acá, termina 0:52
-->

---

<!-- _class: acentos -->

## El caso prearmado, por el protocolo

- **Dónde puede alucinar**: en la conversión y en el tiempo efectivo; las cifras salen de filas que se pueden abrir
- **Qué dato no puede salir**: ninguno, es público; con datos propios, el Nivel 2 entero
- **Cómo se verifica**: la fuente abierta al lado, y un script que compara

<!--
6 min · acumulado 0:36
Las reglas de la sesión 7 aplicadas al caso, una por una, con la tabla de la
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
4 min · acumulado 0:40
Aplicada al caso: el screening es una lista de dónde mirar primero. Antes de
cualquier decisión de inversión viene el control de siempre, la lupa del
reservorista.
Y el error concreto del caso sirve de ejemplo: el inyector que desaparecía
por una columna mal leída dejaba un libro prolijo con la mitad de los pozos,
sin ningún aviso.
Esta pregunta es la tercera de la grilla que sigue: cada empresa se la hace
a su caso.
-->

---

<!-- _class: panel -->

## Los cuatro de ustedes

Ronda por empresa, **tres minutos** cada una, con la página de ayer y la misma grilla:
dónde puede alucinar, qué dato no puede salir, cómo se verifica.

Se lee la **estructura** del caso: nadie dice un dato de su empresa.

<!--
12 min · acumulado 0:52
Cuatro empresas, tres minutos cada una: PCR, CGC, Tecpetrol, Andes. Donde
hay más de una persona por empresa, una presenta y la otra suma.
La grilla es la misma tabla de la página. La página de cada uno tiene
dolor, datos, sensibilidad, verificabilidad y primer paso; la crítica se
hace sobre la categoría del dato, y nadie dice un número de su empresa en
la sala.
Plan B si alguna empresa no trae la página: dos minutos para escribir UNA
objeción a su propio caso de ayer, y se critica esa.
Lo que salga se anota: la crítica es lo que cada empresa se lleva para
reescribir el caso.
Martín: lleva el reloj, tres minutos exactos por empresa, avisa al minuto
dos, y llama a la siguiente. Anota una línea por empresa en el chat.
Cierre del bloque 2. Anunciar la pausa y la hora de vuelta.
-->

---

<!-- _class: seccion -->

## Pausa · 10 min

Volvemos con **la hoja de ruta**

<!--
10 min · acumulado 1:02
Martín: hora de vuelta en el chat, y deja armadas cuatro líneas vacías
("PCR / CGC / Tecpetrol / Andes") para que cada empresa pegue sus tres filas
de la hoja de ruta al volver.
Matías: chequear que las pestañas del futuro sigan cargadas y el audio de la
pestaña listo para el video.
-->

---

<!-- _class: seccion -->

## Hoja de ruta

Bloque 3 de 5 · **10 min**

<!--
1:02 · arranca acá, termina 1:12
-->

---

<!-- _class: acentos -->

## Tres horizontes

- **Mañana**: lo que ya pueden usar sin pedir permiso, con las reglas de hoy
- **Noventa días**: un piloto acotado, con dueño y criterio de éxito escrito
- **Decisión corporativa**: contratos, datos, presupuesto, y quién responde

<!--
3 min · acumulado 1:05
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
7 min · acumulado 1:12
Ronda por empresa, cuatro. Empujar hacia lo observable: si alguien pone
"usar más IA", pedir algo como "los informes de turno salen con borrador
asistido desde el lunes".
Las filas de todos van al chat: cada empresa se lleva la suya y ve las de
las demás, que es de donde salen las mejores ideas, y ninguna fila lleva un
dato propio.
El pase al bloque siguiente, y decirlo con estas palabras: esa fila de
noventa días se escribe pensando en la herramienta que va a existir dentro
de noventa días. De eso va la última hora.
Martín: llama a las cuatro empresas en orden y confirma que las tres filas
de cada una quedaron pegadas.
Cierre del bloque 3.
-->

---

<!-- _class: seccion -->

## El futuro, en pantalla

Bloque 4 de 5 · **33 min**

<!--
1:12 · arranca acá, termina 1:45
-->

---

<!-- _class: acentos -->

## Un proyecto largo termina con otra herramienta

Un proyecto dura. El que arranca **dentro de un mes** con el flujo de ese momento puede
terminar antes que el que arranca hoy.

Pero esperar sin hacer nada tampoco sirve: lo único que mejora solo es la **capacidad**.

<!--
4 min · acumulado 1:16
Primero el argumento incómodo: si tu proyecto lleva seis meses, la
herramienta con la que lo vas a terminar no es la que usaste para
dimensionarlo. La ventaja de haber salido primero se la come la diferencia
de herramienta.
Y enseguida la contracara, para que nadie se vaya con la excusa: los datos,
los permisos y los criterios los tiene que construir alguien. La regla que sale de
las dos mitades: arrancá YA con lo que no se abarata (el mapa de datos, la
política, las preguntas de aceptación) y postergá lo que sí (la
construcción).
El caso lo mostró: lo que faltaba era el Nivel 2.
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
7 min · acumulado 1:23
Pestañas abiertas de antes. Our World in Data tiene 35 gráficos y Epoch
once exploradores al día. Hoy alcanzan dos.
Recorrido: desempeño en pruebas contra la línea humana (años por debajo,
cruce, saturación), y demanda eléctrica de los centros de datos, que se
retoma al final del bloque. El cómputo de entrenamiento se nombra sin
abrirlo.
Antes de opinar, una advertencia: un benchmark mide una tarea acotada, muy
lejos de un puesto de trabajo completo, y las pruebas se eligen porque se
pueden medir. Aun así, conviene mirar la pendiente.
Si preguntan por el largo de tarea que un agente completa, se duplica cada
siete meses y ya lo vieron ayer.
-->

---

<!-- _class: panel -->

## El mismo modelo, con cuerpo

**Gemini Robotics 2**, anuncio oficial de Google DeepMind. Tres minutos.

<!--
4 min · acumulado 1:27
Reproducir el video entero, tres minutos, desde la pestaña ya cargada, con
el audio de la pestaña compartido.
El comentario después, en dos frases: es el mismo tipo de modelo que redacta
un informe, moviendo un cuerpo completo. Y ahí la regla de la sesión 7
vale doble, porque en el mundo físico un paso equivocado mueve algo real.
-->

---

<!-- _class: panel -->

## La frontera también se achica

Modelos abiertos que corren en **una máquina de escritorio**, sin mandar un byte afuera, hoy
rinden como los gigantes de hace dos años.

Para el mapa de datos de hoy eso cambia el tablero: el **primer nivel** puede tener asistente
adentro de la red.

<!--
3 min · acumulado 1:30
Esto se cuenta, sin demo. La experiencia propia sirve de anécdota: un modelo
abierto de 27 mil millones de parámetros corriendo en la máquina del
instructor, respondiendo sobre documentos que nunca salieron del disco.
Las familias abiertas chicas (Llama, Qwen, Gemma, Phi) son las de este
mundo. La brecha con la frontera sigue existiendo, pero lo de hace dos años
se vuelve local cada vez más rápido.
Si alguna empresa quiere seguirla, es un proyecto de sistemas, con el mapa
de datos como requisito.
-->

---

## General, superinteligencia, y la máquina que diseña máquinas

**General**: al nivel de una persona competente en la mayoría de las tareas cognitivas.
**Superinteligencia**: por encima del mejor humano en casi todas.

La hipótesis que las conecta, I. J. Good (1965): una máquina que **diseña máquinas mejores**
dispara una explosión de inteligencia. Hoy, en concreto: los laboratorios ya usan sus modelos
para construir los siguientes.

<!--
4 min · acumulado 1:34
Los dos términos, definidos, y la letra chica: no hay definición única, y
por eso se discute tanto si la primera ya llegó. El conteo de LifeArchitect
queda en la pestaña y en la página: se lee como un pronóstico, mirando los
supuestos. Abrirlo solo si sobra tiempo.
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

Y quizás sean **los que le importan al receptor**, que pueden ser otros.

<!--
4 min · acumulado 1:38
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

Va de casi cero a casi seguro según a quién le preguntes: **no hay consenso**.

<!--
3 min · acumulado 1:41
Nombres para la conversación, sin caricaturizar: pioneros que se volvieron
cautos (Hinton dejó Google para poder hablar de esto), gente que lo
considera manejable, gente que lo descarta. Lo que hay son apuestas
razonadas, y la página linkea el panorama.
La pregunta para la sala es por el número propio: ¿te preocupa?
¿cambia algo de lo que hacés el lunes?
-->

---

## La nota optimista, con fuente

Machines of Loving Grace: la inteligencia artificial puede **comprimir décadas de progreso
científico** en años.

Y para esta industria: los centros de datos son **demanda eléctrica firme**, y buena parte de
esa electricidad es gas.

<!--
4 min · acumulado 1:45
El ensayo está linkeado en la página; el argumento fuerte es biología y
salud. El mismo autor toma el riesgo en serio: optimismo y cautela conviven
en la misma persona.
El ángulo propio: volver al gráfico de demanda eléctrica de los centros de
datos que vimos al principio del bloque. Para una empresa de gas, el futuro
de la inteligencia artificial también es un mercado.
Sin mini ronda acá: la ronda del día es la del cierre. Cierre del bloque 4.
-->

---

<!-- _class: seccion -->

## Cierre del curso

Bloque 5 de 5 · **15 min**

<!--
1:45 · arranca acá, termina 2:00
-->

---

<!-- _class: acentos -->

## Lo que se llevan del curso

- La salida de un LLM es un **borrador plausible**: se verifica antes de usarlo
- Delegá lo **digital, acotado y verificable**, con el mapa de datos en la mano
- Arrancá ya con **lo que no se abarata**: los datos, los permisos, los criterios

<!--
3 min · acumulado 1:48
Los cuatro días en tres frases. La tercera es la del bloque anterior y es la
más accionable: la capacidad mejora sola, y el mapa de datos lo tiene que
armar cada empresa.
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
3 min · acumulado 1:51
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

Si aprobás algo que no entendés, estás firmando sin saber qué.

<!--
4 min · acumulado 1:55
Fuente: Geoffrey Litt, "Understanding is the new bottleneck", julio de 2026,
linkeado en la página.
Su tesis: la idea cómoda es que si el agente se verifica solo, entender deja
de hacer falta. Litt dice lo contrario: se entiende para PARTICIPAR. Sin
fluidez conceptual no podés intervenir, ni pedir la variante, ni ver la
opción que el modelo no consideró.
Su instrumento es un quiz de cinco preguntas después de cada explicación,
con una regla dura: no le manda código a nadie hasta que puede aprobarlo.
Es trabajar y cursar a la vez.
Es lo mismo que vinieron haciendo con el quiz de cada sesión, y los quizzes
quedan en las páginas.
Para terminar, con Alan Kay de fondo: la computación se pensó siempre como
una forma de aumentar lo que puede hacer una persona. Con estas herramientas
también podemos meternos más adentro del loop.
-->

---

<!-- _class: panel -->

## Una cosa distinta, el lunes

Ronda de cierre, por nombre: **una sola cosa** que vas a hacer distinto el lunes, en una
frase.

<!--
4 min · acumulado 1:59
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
1 min · acumulado 2:00
Dejar proyectada mientras se despiden.
Después de clase: mandar por correo, a cada empresa por separado, su
política editable, sus tres filas de la hoja de ruta y la crítica de su
caso; a todos, las frases de la ronda final. El curso termina; el contacto
queda abierto.
-->
