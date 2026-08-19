---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 8**'
footer: 'mpodeley.github.io/curso-energia-ypfb'
---

<!-- _class: portada -->

# El caso, la ruta y el horizonte

Sesión 8 de 8 · 2 h en vivo · **YPFB Andina**

<!--
0:00 · portada mientras entra la gente
Ventanas de hoy: A este deck, C el sitio en la sesión 8, D el Libro A de
Puesto Guardián abierto en la planilla, E la terminal con el modelo local ya
cargado.
Sin pulsos hoy: el Worker está apagado y esta sesión no lo necesita.
Antes de clase: las preguntas de aceptación de la sesión 6 a la vista, y
todas las pestañas del bloque del futuro abiertas y ya cargadas (Our World
in Data, Epoch, LifeArchitect, y los dos videos). Los videos van desde el
navegador: dejarlos arrancados unos segundos y pausados, para que el buffer
esté hecho, y el de Kosinski ya posicionado en el minuto 36.
Al compartir pantalla, tildar "compartir audio de la pestaña". Sin eso el
video se ve mudo del otro lado.
-->

---

## Hoy

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| Apertura y entrada al sitio | 5 min | Las ventanas del día |
| El caso, en vivo | 30 min | El screening recorrido de punta a punta |
| La crítica | 15 min | El caso pasa por el protocolo de la sesión 7 |
| Hoja de ruta | 10 min | Mañana, noventa días, decisión corporativa |
| El futuro, en pantalla | 45 min | La frontera, los modelos locales, entender |
| Cierre del curso | 15 min | Lo que queda, y una cosa distinta para el lunes |

<!--
2 min · acumulado 0:02
La misma tabla está en la página de la sesión 8.
Bajada del día: la sesión se parte al medio. La primera hora es el caso que
eligieron y qué hacen con él. La segunda es levantar la vista, y no es
relleno: sin una idea de dónde va a estar la herramienta, el proyecto se
dimensiona contra la de hoy. Es la última sesión.
-->

---

## Al final de esta sesión van a poder

- Recorrer y **criticar el caso real**: necesidad, flujo, resultado
- Llevarse una **hoja de ruta** concreta por equipo
- Discutir el **futuro con datos**: la frontera, los modelos locales, los riesgos

<!--
1 min · acumulado 0:03
El tercero es distinto a todo lo anterior y se anuncia así: el bloque del
futuro es especulación declarada. La única regla es la del curso: separar el
dato de la fe.
-->

---

<!-- _class: panel -->

## Entrá al sitio, como siempre

`mpodeley.github.io/curso-energia-ypfb`

Hoy usamos la página de la sesión 8. Tené a mano tus **dos anotaciones** de la tarea: la
crítica se hace con ellas.

<!--
2 min · acumulado 0:05
Hoy no hace falta el PIN: no hay encuesta ni pulsos, la página se lee sola.
Plan del día en una frase: el caso, su crítica, la ruta de cada equipo, y
después una hora de horizonte.
-->

---

<!-- _class: seccion -->

## El caso, en vivo

Bloque 1 de 5 · **30 min**

<!--
Arranca 0:05, termina 0:35
-->

---

## La necesidad, como salió del relevamiento

El **screening de waterflooding**: dónde conviene inyectar agua, o revisar la que ya se
inyecta. Lo eligió el grupo; lo construyó el mismo loop de la sesión 6.

Hoy se mide contra las preguntas que escribieron **ustedes**.

<!--
4 min · acumulado 0:09
Recordar de quién salió el dolor y el techo fijado en la sesión 6: screening
con criterios, no simulación. La vara del bloque son las preguntas de
aceptación de la ronda, que están a la vista.
El resumen del caso está publicado arriba en la página: alcance, datos y
techo, para que nadie critique de memoria.
-->

---

## La escalera de datos, y dónde terminó

Producción por pozo de Bolivia, pública, no hay. El análogo es la **cuenca Noroeste
argentina**: Capítulo IV publica producción e inyección, pozo por pozo y mes por mes.

**1,003 pozos · 88,093 registros mensuales · enero de 2019 a julio de 2026.**

<!--
4 min · acumulado 0:13
Ventana D. Es el mismo conjunto de datos donde el agente de la sesión 6
trabajó en vivo, ahora bajado entero: ocho años de archivos anuales,
filtrados por cuenca al vuelo.
Decir el precio: 2.5 GB de descarga y un script de sesenta líneas. Eso es
todo lo que hizo falta para tener el análogo público.
-->

---

<!-- _class: panel -->

## Primer resultado, y no es el que esperábamos

De los **5.6 millones de m³** de agua inyectada en la cuenca, el 97% entra por pozos
**Sumidero**: disposición de agua producida, no recuperación secundaria.

Seis pozos figuran como inyección de agua en toda la cuenca. **Uno solo inyectó** algo en
siete años.

<!--
6 min · acumulado 0:19
Este es el hallazgo del caso y conviene dejarlo respirar.
Correr resumen_cuenca.py en la ventana D: la tabla sale ahí. 26 sumideros
con 5.5 millones de m3, contra un solo inyector con 154 mil. Preguntar
a la sala qué diferencia hay entre los dos, y dejar que lo contesten ellos:
el sumidero se deshace del agua en una formación que no produce; el inyector
la mete en el reservorio para empujar petróleo. La columna del dataset que
los separa es tipopozo, y son dos negocios distintos.
Consecuencia, dicha con precisión: la mitad "revisar la inyección que ya
existe" no se puede correr sobre el análogo, porque en el norte argentino la
inyección para recuperación secundaria está en pasado. Queda la otra mitad,
que es la que se corre hoy: dónde tendría sentido inyectar.
-->

---

## El único que inyectó

**P.Gu. a-11**, en Puesto Guardián, Salta. Yacoraite, 154,484 m³ en siete años.

Estado en el registro: **parado transitoriamente**. Los otros cinco declarados están en cero.

<!--
3 min · acumulado 0:22
El campo del caso se eligió por él: es el único lugar de la cuenca donde el
screening puede comparar un inyector de verdad contra dos sumideros del
mismo campo.
Y el cuadro completo, que es el de una cuenca madura: el inyector parado,
tres de los otros cinco abandonados, y la serie del campo cortada en julio
de 2025 mientras el resto de la cuenca llega a julio de 2026.
Decirlo sin dramatismo, porque es la lectura correcta: un proyecto de
recuperación secundaria tiene un final, no es eterno. Así se ve un campo que
ya lo transitó. Lo que queda después es manejo de agua, y eso es lo que
muestran los sumideros.
Si alguien de la sala conoce el campo, es buen momento para preguntarle.
-->

---

<!-- _class: panel -->

## El flujo, de punta a punta

En vivo: los datos crudos, la conversión a unidades de campo, el Libro A, y los
diagnósticos que salen solos. Miren dónde interviene una persona.

<!--
8 min · acumulado 0:30
Ventana D, en orden:
1. El CSV crudo: idpozo, mes, metros cúbicos. Nadie piensa en metros cúbicos
   por mes; la herramienta piensa en barriles por día.
2. La conversión, que es donde se cuela el primer error posible: el tef de
   Capítulo IV cuenta días de PRODUCCIÓN, así que un inyector informa
   siempre cero. Cargado sin mirar eso, los inyectores desaparecen del
   libro y el screening se queda sin la mitad que le importa. Pasó acá.
3. El Libro A cargado: 8 pozos, 340 filas, yacoraite.
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
5 min · acumulado 0:35
Mostrar la hoja de completitud de datos: el libro dice en la cara qué
porcentaje tiene y se niega a calcular el índice sin eso.
Y ese es el punto que vale para YPFB: lo que traba el screening no es la
capacidad del modelo. Es la volumetría, los fluidos y la roca. Ningún modelo
nuevo los va a inventar.
Decir el costo real: horas del instructor, y qué haría falta para repetirlo
adentro con datos propios.
Ir tachando las preguntas de aceptación que el recorrido contestó, y marcar
las que quedaron sin contestar. Cierre del bloque 1.
-->

---

<!-- _class: seccion -->

## La crítica

Bloque 2 de 5 · **15 min**

<!--
Arranca 0:35, termina 0:50
-->

---

<!-- _class: panel -->

## Pásenlo por el protocolo

Ronda con la tarea: tus **dos anotaciones**. ¿Pasa el protocolo de verificación? ¿Respeta el
mapa de datos? ¿Qué pasa el día que se equivoque?

<!--
9 min · acumulado 0:44
Ronda por nombre, dos minutos por cabeza: qué querías que muestre, y qué
tendría que pasar para que tu equipo lo use.
Plan B si pocos leyeron el resumen: dos minutos para leerlo ahí mismo, está
arriba en la página, y anotar UNA objeción. Con cinco personas alcanza.
Todo lo que salga se anota: la crítica es el entregable del bloque.
-->

---

## El día que se equivoque

Si mañana el ranking se equivoca y **nadie lo nota**, ¿qué pasa?

Si esa respuesta es grave, el flujo necesita otro control antes de usarse.

<!--
6 min · acumulado 0:50
Aplicada al caso: el screening es una lista de dónde mirar primero, no una
decisión de inversión. El control que le sigue es el de siempre, la lupa del
reservorista antes de mover un peso.
Y el error concreto de hoy sirve de ejemplo: el inyector que desaparecía por
una columna mal leída no daba error, daba un libro prolijo con la mitad de
los pozos. Los errores caros no se anuncian.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## Hoja de ruta

Bloque 3 de 5 · **10 min**

<!--
Arranca 0:50, termina 1:00
-->

---

<!-- _class: acentos -->

## Tres horizontes

- **Mañana**: lo que ya pueden usar sin pedir permiso, con las reglas de ayer
- **Noventa días**: un piloto acotado, con dueño y criterio de éxito escrito
- **Decisión corporativa**: contratos, datos, presupuesto, y quién responde

<!--
3 min · acumulado 0:53
Ejemplos del propio curso para cada horizonte: borradores asistidos y triaje
de documentos (mañana); el cuaderno de la sesión 5 para el área, o un
screening como el de hoy con datos internos (noventa días); la herramienta
contratada con acuerdo de datos (decisión corporativa).
Dos advertencias, rápidas: un piloto sin criterio de éxito escrito no
termina nunca, se diluye. Y medir "horas ahorradas" es fácil de inflar;
rinde más contar cosas observables, informes con borrador asistido,
consultas resueltas sin interrumpir a nadie.
-->

---

<!-- _class: panel -->

## La armamos por equipo

Cada uno: **una fila por horizonte**. Qué, quién, y cómo se mide. Al chat, y queda anotada.

<!--
7 min · acumulado 1:00
Ronda por nombre. Empujar hacia lo observable: no "usar más IA" sino "los
informes de turno salen con borrador asistido desde el lunes".
Las filas de todos van al chat: cada uno se lleva la suya y ve las de los
demás, que es de donde salen las mejores ideas.
El pase al bloque siguiente, y decirlo con estas palabras: esa fila de
noventa días se escribe contra la herramienta que va a existir a los noventa
días, no contra la de hoy. De eso va la segunda mitad.
Cierre del bloque 3.
-->

---

<!-- _class: seccion -->

## El futuro, en pantalla

Bloque 4 de 5 · **45 min**

<!--
Arranca 1:00, termina 1:45
-->

---

<!-- _class: acentos -->

## Por qué esto no es entretenimiento

Un proyecto dura. El que arranca **dentro de un mes** con el flujo de ese momento puede
terminar antes que el que arranca hoy.

Pero esperar tampoco es una estrategia: lo único que mejora solo es la **capacidad**.

<!--
4 min · acumulado 1:04
Primero el argumento incómodo: si tu proyecto lleva seis meses, la
herramienta con la que lo vas a terminar no es la que usaste para
dimensionarlo. La ventaja de haber salido primero se la come la diferencia
de herramienta.
Y enseguida la contracara, para que nadie se vaya con la excusa: los datos,
los permisos y los criterios no se construyen solos. La regla que sale de
las dos mitades: arrancá YA con lo que no se abarata (el mapa de datos, la
política, las preguntas de aceptación) y postergá lo que sí (la
construcción).
El caso de hoy lo probó: lo que faltaba no era modelo, era Nivel 2.
La vara del bloque, declarada: de acá en adelante es especulación con nombre
propio, para conversar. Las reglas de verificación valen también para los
pronósticos.
-->

---

<!-- _class: panel -->

## La frontera, en vivo

**ourworldindata.org/artificial-intelligence** · **epoch.ai/data**

Elegimos dos o tres gráficos y los leemos como enseñó el curso: primero qué mide cada eje,
después la opinión.

<!--
10 min · acumulado 1:14
Pestañas abiertas de antes. Our World in Data tiene 35 gráficos y Epoch
once exploradores al día.
Recorrido sugerido: cómputo de entrenamiento (la exponencial más limpia),
desempeño en pruebas contra la línea humana (años por debajo, cruce,
saturación), y demanda eléctrica de los centros de datos, que se retoma al
final del bloque.
La advertencia honesta antes de opinar: un benchmark no es un puesto de
trabajo, y las pruebas se eligen porque se pueden medir. Aun así, la
pendiente es el dato.
Si preguntan por el largo de tarea que un agente completa, se duplica cada
siete meses y ya lo vieron en la sesión 6.
-->

---

<!-- _class: panel -->

## El mismo modelo, con cuerpo

**Gemini Robotics 2**, anuncio oficial de Google DeepMind. Tres minutos.

<!--
5 min · acumulado 1:19
Reproducir el video entero, tres minutos, desde la pestaña ya cargada.
El comentario después, en dos frases: es el mismo tipo de modelo que redacta
un informe, moviendo un cuerpo completo. Y ahí la regla de la sesión 7 vale
doble, porque en el mundo físico el error no vuelve como mensaje.
-->

---

<!-- _class: panel -->

## La frontera también se achica

Modelos abiertos que corren en **una máquina de escritorio**, sin mandar un byte afuera, hoy
rinden como los gigantes de hace dos años.

Para el mapa de datos de ayer eso cambia el tablero: el **nivel 1** puede tener asistente
adentro de la red.

<!--
4 min · acumulado 1:23
Contado, no mostrado. La experiencia propia sirve de anécdota: un modelo
abierto de 27 mil millones de parámetros corriendo en la máquina del
instructor, respondiendo sobre documentos que nunca salieron del disco.
Las familias abiertas chicas (Llama, Qwen, Gemma, Phi) son las de este
mundo. La brecha con la frontera sigue existiendo; la sorpresa es la
velocidad con la que lo de ayer se vuelve local.
Si el grupo quiere seguirla, es un proyecto de sistemas con el mapa de datos
como requisito, no un experimento de escritorio.
-->

---

## Inteligencia artificial general y superinteligencia

**General**: desempeño al nivel de una persona competente en la mayoría de las tareas
cognitivas. **Superinteligencia**: por encima del mejor humano en casi todas.

La letra chica: no hay definición única, y por eso se discute tanto si la primera ya llegó.

<!--
5 min · acumulado 1:28
Abrir el conteo de LifeArchitect en la pestaña: usa criterios propios y a la
vista. Leerlo como pronóstico, mirando los supuestos, no como consenso.
Para la sala: con la definición de arriba, ¿cuánto falta? ¿Y si la
definición fuera "hace tu trabajo de hoy"?
-->

---

## La mejora recursiva

La hipótesis de I. J. Good (1965): una máquina que **diseña máquinas mejores** dispara una
**explosión de inteligencia**.

La versión de hoy, sin ciencia ficción: los laboratorios ya usan sus modelos para construir
los siguientes.

<!--
3 min · acumulado 1:31
Good era matemático, colega de Turing. Su frase: la primera máquina
ultrainteligente sería el último invento que el hombre necesite hacer.
El dato aterrizado: buena parte del código de los laboratorios ya lo
escriben sus propios modelos, y la curva del largo de tarea es el indicador
que más miran los que toman esta hipótesis en serio.
Es el mecanismo detrás de los números que vienen enseguida.
-->

---

<!-- _class: panel -->

## El mail de cuatro puntos

Vos escribís cuatro puntos. Un modelo los estira a un mail cortés. Del otro lado, otro modelo
lo vuelve a **cuatro puntos**.

Pero quizás no los tuyos: **los que le importan al receptor**.

<!--
5 min · acumulado 1:36
El fragmento del video de Kosinski, psicólogo computacional de Stanford,
desde el minuto 36. Su hipótesis, presentada como lo que es: la
inteligencia artificial reemplaza el trabajo científico y la mayoría de los
usos prácticos del lenguaje.
Las preguntas para la sala: ¿para qué está el mail largo del medio?
¿desaparece el género "mail cortés"? ¿qué pasa cuando los dos modelos
negocian qué es lo importante?
Conectar con la sesión 3: lo que era una herramienta de redacción empieza a
parecer un protocolo entre máquinas.
-->

---

## p(doom)

El número con el que el rubro resume su miedo: la probabilidad que le asignás a una
**catástrofe existencial** por inteligencia artificial.

Va de casi cero a casi seguro según a quién le preguntes. **La dispersión es el dato.**

<!--
4 min · acumulado 1:40
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
5 min · acumulado 1:45
El ensayo está linkeado en la página; el argumento fuerte es biología y
salud. Honestidad hasta en el optimismo: el mismo autor toma el riesgo en
serio. Optimismo y cautela no son bandos, son la misma persona.
El ángulo propio: volver al gráfico de demanda eléctrica de los centros de
datos que vimos al principio del bloque. Para una empresa de gas, el futuro
de la inteligencia artificial también es un mercado.
Cerrar con la mini ronda, una respuesta por cabeza: ¿optimista o pesimista
para tu trabajo, y por qué? La única regla es distinguir la afirmación con
dato de la afirmación con fe.
Cierre del bloque 4.
-->

---

<!-- _class: seccion -->

## Cierre del curso

Bloque 5 de 5 · **15 min**

<!--
Arranca 1:45, termina 2:00
-->

---

<!-- _class: acentos -->

## Lo que se llevan del curso

- La salida de un modelo es un **borrador plausible**: la verificación es tuya
- Delegá lo **digital, acotado y verificable**, con el mapa de datos en la mano
- Arrancá ya con **lo que no se abarata**: los datos, los permisos, los criterios

<!--
3 min · acumulado 1:48
Las dos semanas en tres frases. La tercera es la del bloque anterior y es la
más accionable: la capacidad mejora sola, tu mapa de datos no.
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
4 min · acumulado 1:52
La única tarea del curso sin plan B. Decirlo mitad en broma y mitad en
serio: después de estas dos semanas las van a ver distinto.
Memento es la que se explica, y es la mejor metáfora del curso: el
protagonista no forma memoria nueva, cada mañana arranca de cero y lo único
que sabe es lo que tiene tatuado encima. Un modelo de lenguaje es eso. Los
tatuajes son el contexto: los documentos que le pegás, lo que el buscador le
mete adentro antes de responder. Por eso la ingeniería de contexto no es un
truco, es la única memoria que tiene.
The AI Doc es el estreno de este año: documental, del director de Navalny,
que entrevista a los que construyen esto mientras espera un hijo. Es el
bloque anterior hecho película. Avisar que puede no estar disponible en la
región todavía.
Y para esta noche, algo que sí se puede ver ya: los ocho minutos de
Bloomberg sobre la crisis del directorio de OpenAI, en los recursos.
HAL es el agente con herramientas de más; AlphaGo es la nota optimista en
documental.
-->

---

<!-- _class: acentos -->

## Entender es el cuello de botella nuevo

Cuando la máquina hace el trabajo, le queda un trabajo más: **explicarlo**. Y a vos te queda
el de **entenderlo**.

No alcanza con aprobar lo que no entendés. Eso es el gerente que asiente.

<!--
4 min · acumulado 1:56
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
Y acá el gancho: eso es lo que vinieron haciendo. Siete sesiones, siete
quizzes. Están arriba en la página y no caducan.
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
3 min · acumulado 1:59
De viva voz, todos. Anotarlas y pedirles que las peguen en el chat: ese
puñado de frases es el mejor resumen posible del curso, escrito por ellos.
-->

---

<!-- _class: portada -->

# Gracias

El sitio queda abierto · **mpodeley.github.io/curso-energia-ypfb**

<!--
1 min · acumulado 2:00
Dejar proyectada mientras se despiden.
Después de clase: mandar por correo la política editable, las filas de la
hoja de ruta de cada equipo y las frases de la ronda final. El curso
termina; el contacto queda abierto.
-->
