---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 6**'
footer: 'mpodeley.github.io/curso-energia-ypfb'
---

<!-- _class: portada -->

# Agentes

Sesión 6 de 8 · 2 h en vivo · **YPFB Andina**

<!--
0:00 · portada mientras entra la gente
Ventanas de hoy: A este deck, C el sitio en la sesión 6, D la terminal del
agente (Codex u otra; la que esté ensayada). Sin pulsos hoy.
Antes de clase: la terminal del agente probada sobre los CSV del Capítulo IV
(los mismos del ejercicio de la página) y los archivos del caso a mano. La
demo no se guiona: el plan del screening se arma con ellos y se mira qué hace.
-->

---

## Hoy

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| Apertura y entrada al sitio | 5 min | El PIN de siempre y las ventanas del día |
| El loop del agente | 20 min | La traza del ejercicio paso a paso, y después en vivo |
| Sus tareas | 30 min | Las cadenas que trajeron: qué delegarían y qué no |
| Dónde se rompe, dónde mejora | 20 min | Contexto, memoria en archivos, la frontera que sube |
| Puente a la sesión 7 | 10 min | Qué cambia cuando las herramientas escriben |
| El caso, en marcha | 25 min | El screening de waterflooding, planificado entre todos |
| Cierre y tarea | 10 min | La tarea de la sesión 7 y quién hace qué |

<!--
2 min · acumulado 0:02
La misma tabla está en la página de la sesión 6.
Bajada del día: hasta ahora el modelo respondía; hoy trabaja. Y el caso que
elegimos el viernes arranca hoy, con el mismo loop que vamos a ver.
-->

---

## Al final de esta sesión van a poder

- Ver el **loop** de un agente: pensar, ejecutar, mirar el resultado, repetir
- Distinguir qué conviene **delegar hoy** y qué todavía no
- Dejar **en marcha el caso real**: el screening de waterflooding de la sesión 8

<!--
1 min · acumulado 0:03
El tercero es el cambio de género: el curso pasa de entender a construir.
Lo que se decida hoy en el último bloque es lo que se presenta terminado en
la sesión 8.
-->

---

<!-- _class: panel -->

## Entrá al sitio, como siempre

`mpodeley.github.io/curso-energia-ypfb`

Hoy usamos la página de la sesión 6. Tené a mano tu **cadena de pasos** de la tarea: es el
material del bloque central.

<!--
2 min · acumulado 0:05
El PIN de siempre. Plan del día en una frase: primero ver trabajar a un
agente, después sus cadenas de pasos, y al final arranca el caso real.
-->

---

<!-- _class: seccion -->

## El loop del agente

Bloque 1 de 6 · **20 min**

<!--
Arranca 0:05, termina 0:25
-->

---

## Un LLM metido en un loop, con permiso para ejecutar

El mismo modelo de la sesión 2, con dos agregados: puede **ejecutar** una herramienta y puede
**mirar lo que salió**.

Un chatbot que se equivoca no se entera nunca. Un agente recibe el error de vuelta.

<!--
3 min · acumulado 0:08
Gancho con la micro-tarea: contar palabras falla en el chatbot porque ve
tokens, no palabras. El agente lo resuelve porque ejecuta un conteo de
verdad en vez de predecirlo. Si nadie la hizo, se muestra en la demo: es un
comando de una línea.
-->

---

<!-- _class: panel -->

## El loop por dentro, paso a paso

Abrí el ejercicio de la página: una corrida real, congelada en diez pasos. Prestá atención al
**tercero y al cuarto**.

<!--
9 min · acumulado 0:17
Ventana C, ejercicio "El loop por dentro". Recorrerla juntos, paso a paso,
leyendo qué herramienta llama y qué vuelve.
El corazón es el paso 3: filtra por AGUARAGUE sin diéresis y le vuelven cero
filas. Detenerse ahí y preguntar a la sala qué haría un chatbot con eso.
Después el paso 4: no insiste, no inventa; lista los valores que existen,
encuentra la diéresis, corrige y sigue. Cero filas no es un fracaso, es
información, y el agente la usa porque VE el resultado.
El cierre del recorrido: la respuesta final llega con dos advertencias
autoimpuestas. Eso también es el loop mirándose a sí mismo.
-->

---

<!-- _class: panel -->

## Ahora en vivo, sin red

El mismo loop, corriendo de verdad sobre los datos de producción. Miren **qué herramienta
llama** en cada vuelta y qué hace cuando algo **no vuelve como esperaba**.

<!--
8 min · acumulado 0:25
Ventana D, la terminal del agente. Demo abierta, sin guion: pedirle algo real
sobre los CSV del Capítulo IV (una declinación, un ranking, un gráfico) y
narrar el loop mientras corre: qué pidió, qué volvió, qué decidió con eso.
Si aparece un tropiezo (grafía, columna, unidad), es el momento bueno: es la
traza de recién pasando en vivo.
Plan B si la terminal falla: la traza ya hizo el trabajo pedagógico; se
sigue con la sesión sin drama y el agente reaparece en el bloque del caso.
Cierre del bloque 1.
-->

---

<!-- _class: seccion -->

## Sus tareas

Bloque 2 de 6 · **30 min**

<!--
Arranca 0:25, termina 0:55
-->

---

<!-- _class: panel -->

## Sus cadenas de pasos

Ronda por nombre: pegá tu cadena en el chat. La recorremos tramo por tramo con una sola
pregunta: ¿esto lo **delego hoy**, o todavía no?

<!--
20 min · acumulado 0:45
Unos 4 minutos por persona, con nombre. Marcar cada tramo en tres montones:
delegable hoy, todavía no, nunca sin revisión.
Plan B si pocos la hicieron: tres minutos ahí mismo con la consigna del
analista nuevo: una cadena de 3 o 4 pasos de una tarea real chica. Con cinco
personas sale material igual.
Anotar los tramos con consecuencias (mandar, cargar, aprobar): son el
material del bloque 4.
-->

---

## El patrón que apareció

Lo delegable hoy es **digital, acotado y verificable**: el resultado se comprueba rápido.

Lo que no: criterio, ambigüedad, y consecuencias que no vuelven como mensaje de error.

<!--
10 min · acumulado 0:55
Sintetizar con sus ejemplos, nombrando de quién es cada tramo. La
característica común de lo delegable es que el error se ve mirando la
salida: si comprobar cuesta más que hacer, no se delega.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## Dónde se rompe, dónde mejora

Bloque 3 de 6 · **20 min**

<!--
Arranca 0:55, termina 1:15
-->

---

## El contexto crece en cada vuelta

Cada paso suma texto a la ventana: más lento, más caro, más fácil perder el objetivo.

Una tarea de veinte pasos no es dos veces una de diez: es **bastante peor**.

<!--
5 min · acumulado 1:00
El contador de contexto del ejercicio muestra esto paso a paso. Es la
ventana de la sesión 2 otra vez: lo que se cae del escritorio, ahora en
medio del trabajo. De acá sale el "acotado" del patrón de recién.
-->

---

## Lo que aprende no vive en el modelo: vive en archivos

La sesión se apaga y el modelo no retiene nada. Lo que queda, queda en **archivos**: las
instrucciones del proyecto, las habilidades empaquetadas (skills), las conexiones a
herramientas (MCP).

Cambiás de modelo mañana y esos archivos siguen valiendo.

<!--
5 min · acumulado 1:05
El punto práctico: lo que le enseñás a un agente se escribe, no se conversa.
El archivo de instrucciones del proyecto (CLAUDE.md, AGENTS.md o parecido)
es la biblioteca de prompts de la sesión 3, versión agente.
Skills: procedimientos empaquetados que carga cuando los necesita. MCP, el
protocolo de contexto de modelo: plomería estándar para conectarle
herramientas, no una capacidad nueva. El callout de la página lo dice en dos
líneas.
-->

---

## La frontera se corre sola

METR mide el **largo de tarea** que un agente completa solo: viene duplicándose cada **siete
meses**, de tareas de segundos a tareas de horas.

Lo que hoy se rompe a los veinte pasos es lo que más rápido está mejorando.

<!--
7 min · acumulado 1:12
Mostrar el gráfico de METR en vivo: el link está en los recursos de la
página. Leerlo con la letra chica a la vista: es al 50% de éxito y en tareas
de software; una curva no es una promesa.
La lectura honesta para ellos: lo que hoy no delegás porque es largo,
reevalualo en seis meses. La regla de verificar no cambia con el largo.
-->

---

<!-- _class: cita -->

## Delegá lo que podés **corregir mirando el resultado**

<!--
3 min · acumulado 1:15
La frase del bloque, y la vara para las cadenas de recién.
Nota de régimen: si la sesión viene corta de tiempo, se comprime este bloque
(la página lo cubre entero); el bloque del caso no se toca.
Cierre del bloque 3.
-->

---

<!-- _class: seccion -->

## Puente a la sesión 7

Bloque 4 de 6 · **10 min**

<!--
Arranca 1:15, termina 1:25
-->

---

## Leer no es lo mismo que tocar

Todo lo que hizo el agente hoy es **reversible**: leyó archivos y guardó un gráfico.

Cuando la herramienta manda un correo, escribe en un sistema o mueve una válvula, el error ya
**no vuelve como mensaje**: queda hecho.

<!--
10 min · acumulado 1:25
Ejemplos del rubro sin dramatizar: una nominación, una orden de trabajo, un
sistema de control. El loop deja de funcionar porque el paso equivocado no
se corrige mirando la salida.
La regla que mañana se vuelve protocolo: herramientas de escritura, persona
antes del acto. De eso va la sesión 7 entera.
Cierre del bloque 4.
-->

---

<!-- _class: seccion -->

## El caso, en marcha

Bloque 5 de 6 · **25 min**

<!--
Arranca 1:25, termina 1:50
-->

---

## El caso del viernes, en una frase

¿Dónde conviene **inyectar agua**, o revisar la que ya se inyecta? Un ranking de candidatos
con **criterios explícitos**, sobre datos de producción.

Screening, no simulación: la lupa fina viene después, y es de reservoristas.

<!--
5 min · acumulado 1:30
Recordar de dónde salió: la conversación del viernes. Y el contrato de la
sesión 8: necesidad, flujo completo, resultado con honestidad, crítica del
grupo.
Fijar el techo en voz alta y sostenerlo: criterios sobre producción e
inyección, nada de simulación ni de física fina. El flujo es lo
transferible; el conjunto de datos es el análogo.
-->

---

## Los datos, sin romanticismo

Producción por pozo de Bolivia, pública, **no hay**. El análogo: la cuenca Noroeste argentina,
los mismos reservorios subandinos que opera Andina.

El agente ya los tocó hoy: en Aguaragüe hay **88 pozos petrolíferos y 22 inyectores de agua**.

<!--
5 min · acumulado 1:35
La escalera de datos: base con Capítulo IV (público, ya en el curso); si
algún dato interno por campo puede viajar, mejora el caso y se confirma
mañana; Volve queda de referencia del mecanismo (la presión sostenida y el
corte de agua que vimos en la sesión 4).
Congelamiento honesto: la base se congela mañana a la noche. Lo que no
llegó, no entra, y el caso sale igual con lo público.
-->

---

<!-- _class: panel -->

## Armamos el plan entre todos

Una pregunta por cabeza, al chat: ¿qué tiene que **responder** el screening para servirte?

Esas preguntas son los **criterios de aceptación** de la sesión 8. Después, al agente: a ver
qué hace.

<!--
12 min · acumulado 1:47
Ronda por nombre; las preguntas quedan anotadas a la vista. Son la vara con
la que la sesión 8 se deja criticar.
Ejemplos si se traban: ¿qué pozo convertirías a inyector? ¿dónde ya no rinde
inyectar más? ¿qué corte de agua delata canalización?
Con el plan anotado, dárselo al agente en la ventana D y mirar los primeros
pasos del loop con el problema de ellos. No prometer resultado en vivo: lo
que salga, sale; el resto es la construcción de esta noche.
-->

---

## Quién hace qué hasta la sesión 8

**Instructor**: construye el flujo y publica el resumen del caso en la página de la sesión 8
**esta noche**.

**Dueños de los datos**: confirman mañana qué puede viajar. **El resto**: la tarea de hoy,
nada más.

<!--
3 min · acumulado 1:50
El resumen es el contrato: alcance, datos, y las preguntas de la ronda tal
cual las escribieron. La tarea de la sesión 7 pide leerlo, así que lo de
esta noche es innegociable.
Cierre del bloque 5.
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

## Para llevarse

- Un agente es un **LLM en un loop** con herramientas: trabaja porque ve sus errores
- Delegá lo **digital, acotado y verificable**; lo irreversible, nunca sin persona
- Lo que le enseñás vive en **archivos**, y el techo de lo delegable sube solo

<!--
3 min · acumulado 1:53
Tres prácticas, en palabras simples. Y la cuarta sin decirla: el caso ya
arrancó, con el mismo loop que vieron hoy.
-->

---

## Tarea para la sesión 7

Buscá un **texto generado por IA** que hayas usado en las últimas semanas y releelo con una
pregunta: ¿qué afirmación de acá **no podría haber salido de lo que le di**?

Marcá una. Traela sin decir todavía si estaba bien o mal.

<!--
3 min · acumulado 1:56
Cinco minutos, como siempre. Sirve un texto propio o de un compañero.
Avisar sin convertirlo en tarea: el resumen del caso queda esta noche en la
página de la sesión 8, para el que quiera espiar.
-->

---

## La sesión 7: riesgos, límites y gobernanza

- Las cuatro maneras de fallar, juntas, con el **arreglo** de cada una
- Un **protocolo de verificación** según el costo del error
- Qué dato puede ir a qué herramienta: el **mapa de confidencialidad**

<!--
3 min · acumulado 1:59
Mañana las piezas sueltas se vuelven política: salen con un borrador de una
página para su equipo. Y el caso vuelve pasado mañana, terminado.
Los ejercicios y el quiz quedan en la página, como siempre.
-->

---

<!-- _class: portada -->

# Nos vemos mañana

El quiz y el ejercicio de la traza quedan en la página · **mpodeley.github.io/curso-energia-ypfb**

<!--
1 min · acumulado 2:00
Dejar proyectada mientras se despiden.
Después de clase: publicar el resumen del caso en la página de la sesión 8
con las preguntas de la ronda tal cual, escribir a los dueños de los datos
con el deadline de mañana a la noche, y extender el fetch de Capítulo IV a
petrolíferos e inyectores. El reloj del caso corre desde el viernes.
-->
