---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 1**'
footer: 'podeley.github.io/curso-energia-ypfb'
---

<!-- _class: portada -->

# De los datos a la IA generativa

Sesión 1 de 8 · 2 h en vivo · **YPFB Andina**

<!--
0:00 · portada mientras entra la gente
Antes de arrancar: chequear que se vea la pantalla y que se escuche.
El deck está publicado en el sitio; si alguien se cae de la videollamada,
puede seguir las slides desde ahí.
-->

---

## Hoy

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| Apertura y entrada al sitio | 10 min | La regla de confidencialidad, el PIN y el primer pulso |
| El mapa de cuatro capas | 35 min | La historia, con ejemplos de la industria. Las dos primeras capas las tocamos en vivo |
| Demos en vivo | 30 min | El chatbot frente a tareas reales, y también verlo fallar |
| Encuesta de relevamiento | 15 min | La completamos juntos |
| Discusión | 20 min | Sus primeras conversaciones: qué sorprendió, qué decepcionó |
| Cierre y tarea | 10 min | Las cuatro maneras de fallar, y qué viene en la sesión 2 |

<!--
2 min · acumulado 0:02
Bajada: son ocho sesiones y terminan con un caso construido con SUS necesidades.
Hoy es el mapa y el relevamiento.
La misma tabla está en la página de la sesión: deck y sitio no se contradicen.
-->

---

## Al final de esta sesión van a poder

- Ubicar **data science**, **machine learning** e **IA generativa** en un solo mapa
- Ver en vivo qué puede y qué **no** puede hacer hoy un chatbot con tareas reales de la industria
- Completar la **encuesta de relevamiento** que alimenta el caso real del final del curso

<!--
2 min · acumulado 0:04
El tercer punto es el que más importa para el resto del curso: sin encuesta no
hay caso final. Repetirlo cuando lleguemos al bloque 3.
-->

---

<!-- _class: cita -->

## En estos ejercicios **no** usamos datos confidenciales de la empresa

Ni volúmenes reales de producción, ni nombres de contratos, ni información de partners.
En la sesión 3 y en la 7 vemos en detalle por qué, y qué alternativas hay.

<!--
3 min · acumulado 0:07
La regla del día uno, temprano y grande. No es burocracia: en la sesión 7
mostramos qué pasa con lo que se sube a un chatbot gratuito.
Si alguien pregunta por la versión empresarial: existe, cambia el contrato de
datos, lo vemos en la 7. Hoy trabajamos con cuentas gratuitas.
-->

---

<!-- _class: panel -->

## Antes de empezar, entrá al sitio

`podeley.github.io/curso-energia-ypfb`

Vamos a usar la página de la sesión 1 varias veces hoy. El PIN del curso lo dicto en voz alta.

<!--
3 min · acumulado 0:10
Dictar el PIN y esperar a que todos entren. Que escriban nombre y apellido:
las respuestas de hoy se cruzan con las de la sesión 3 y la 5.
Cambiar a la ventana B (panel) y abrir el pulso "s1-palabra-ia".
Volver acá cuando hayan votado unos cuantos.
Pedirles que dejen la página de la sesión 1 abierta: en el bloque 1 hay un
ejercicio que hacemos ahí mismo.
-->

---

<!-- _class: seccion -->

## El mapa de cuatro capas

Bloque 1 de 5 · **35 min**

<!--
Arranca 0:10, termina 0:45
-->

---

<!-- _class: cita -->

## Para quien trabajó con reservorios, nada de esto es **tan nuevo** como parece

<!--
1 min · acumulado 0:11
La bajada del bloque. Lo que sigue son cuatro capas y la de arriba es la única
verdaderamente nueva.
-->

---

<!-- _class: acentos -->

## Cuatro capas, una historia conocida

- **Data science** — mirar datos, limpiarlos, graficarlos, sacar conclusiones
- **Machine learning** — en vez de escribir la fórmula, mostrás ejemplos y la máquina encuentra el patrón
- **Deep learning** — machine learning con redes neuronales grandes: más datos, más cómputo, patrones más complejos
- **IA generativa** — modelos tan grandes que ya no solo clasifican o predicen un número: *generan*

<!--
3 min · acumulado 0:14
Presentar las cuatro juntas y después una por una con su ejemplo.
Insistir en que están anidadas: cada capa usa la anterior, no la reemplaza.
-->

---

## Capa 1 · Data science

Es lo que siempre hicimos: mirar datos, limpiarlos, graficarlos, sacar conclusiones.

**Una curva de declinación ajustada a mano ya es un modelo.** Alguien eligió una forma
funcional, estimó tres parámetros y proyectó. Eso es modelar.

<!--
3 min · acumulado 0:17
Preguntar quién ajustó una declinación a mano alguna vez, y con qué la ajustó.
Cortar corto: la conversación larga sobre esto va en el bloque 4.
Entregar al ejercicio: "no se los voy a contar, lo van a hacer ustedes".
-->

---

<!-- _class: panel -->

## Ajustala vos

`podeley.github.io/curso-energia-ypfb` · sesión 1

Dos perillas y un número que tiene que bajar: el error. Bájenlo todo lo que puedan.

<!--
6 min · acumulado 0:23
Ventana C (el sitio), página de la sesión 1, ejercicio "Ajustala vos, después
que la busque la máquina".
ANTES de proyectar: apretar "Reiniciar ejercicio". Si ensayé antes de la clase,
el navegador se acuerda y el ejercicio abre con la respuesta puesta.
Arranca en una recta plana, con 66% de error. En tres minutos la mayoría llega
a algo entre 3% y 8%. El mejor ajuste posible con estas perillas es 2.17%.
Que aprieten "Listo, este es mi ajuste" antes de seguir.
Mientras trabajan, decir en voz alta que esto ES la capa 1: eligieron una forma
funcional y estimaron los parámetros a ojo. Todavía no hay ninguna máquina.
Este ejercicio no depende del Worker: si el firewall bloquea los pulsos, esto
funciona igual.
-->

---

## Capa 2 · Machine learning

Invierte la lógica: en vez de escribir la fórmula, **mostrás ejemplos y la máquina encuentra
el patrón**.

Sirve cuando la fórmula no existe, o existe pero no la conocemos. Mantenimiento predictivo:
nadie sabe escribir la ecuación de "esta bomba va a fallar en tres semanas", pero hay miles de
bombas que fallaron y sus datos previos.

<!--
3 min · acumulado 0:26
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
5 min · acumulado 0:31
Ventana C otra vez. Que aprieten "Que la busque la máquina".
Leer la tabla en voz alta: su ajuste contra el de ella. Casi siempre gana la
máquina, y por el doble (2.17% contra 1.06% en el mejor caso a mano).
Abrir el desplegable "Los valores con los que se generó esta curva": qi 320 y
Di 2.1%/mes. La máquina cayó justo encima sin que nadie se los dijera.
La frase del bloque: ni con los valores exactos el error da cero. Queda 1.06%,
que es el ruido de medición. Un modelo que llega a cero está copiando el ruido.
Si alguien le ganó a la máquina, mostrarlo: barre una grilla finita, no es magia.
-->

---

## Capa 3 · Deep learning

Machine learning con **redes neuronales grandes**. Más datos y más cómputo, y a cambio
patrones mucho más complejos.

Acá entran las imágenes sísmicas, los registros de pozo, el texto. Son datos donde la señal
está distribuida y no se deja resumir en cinco variables.

<!--
2 min · acumulado 0:33
No entrar en arquitectura. Lo único que tiene que quedar: "grande" quiere decir
muchas capas de transformación aprendidas de los datos.
Puente: en la sesión 2 abrimos esta caja con el ejemplo de LeCun y los números
escritos a mano.
-->

---

## Capa 4 · IA generativa

Modelos tan grandes, entrenados con tanto texto, que en lugar de solo clasificar o predecir
un número, **generan**: texto, código, imágenes.

Los **LLM** — modelos grandes de lenguaje — son el caso que nos ocupa las próximas ocho semanas.

<!--
3 min · acumulado 0:36
Acá recién aparece el chatbot. Todo lo anterior sigue existiendo y sigue siendo
la herramienta correcta para la mayoría de los problemas con números.
-->

---

<!-- _class: acentos -->

## Tres cosas, ninguna mágica

- **Datos** — todo el texto de internet, disponible y digitalizado
- **Cómputo** — GPUs, que resultaron ser justo la máquina que estos modelos necesitaban
- **Una arquitectura que escala** — el *transformer*, 2017

<!--
4 min · acumulado 0:40
Abrir con la pregunta antes de mostrar la lista: ¿por qué explotó ahora y no en
2010? Suele salir "más computadoras", que es un tercio de la respuesta.
Lo importante del transformer no es cómo funciona sino que **mejora al agrandarlo**,
de forma predecible. Eso convirtió la investigación en ingeniería: si duplico
datos y cómputo, sé aproximadamente cuánto mejora.
-->

---

<!-- _class: cita -->

## No hubo un descubrimiento mágico: hubo una **receta que mejora al agrandarla**

<!--
2 min · acumulado 0:42
La frase que quiero que se lleven del bloque.
Consecuencia práctica: lo que hoy no funciona bien probablemente funcione mejor
en un año, sin que nadie invente nada nuevo. Y lo que falla por diseño —las
alucinaciones— no se arregla solo agrandando.
-->

---

## Dónde está esto en el software que ya usan

Machine learning lleva años escondido en herramientas de la industria: simuladores,
interpretación sísmica, mantenimiento predictivo, control de procesos.

Lo nuevo de 2023 en adelante no es la IA. Es que **una parte de la IA se volvió conversacional**,
y por eso llegó a todos los escritorios de golpe.

<!--
3 min · acumulado 0:45
NO abrir conversación acá: esa charla es la tercera pregunta del bloque 4, y
ahí está presupuestada. Acá es puente a las demos.
Cierre del bloque 1.
-->

---

<!-- _class: seccion -->

## Demos en vivo

Bloque 2 de 5 · **30 min**

<!--
Arranca 0:45, termina 1:15
-->

---

## Tres tareas reales

- Resumir un **paper del SPE**
- Explicar un **término técnico** a alguien no técnico
- Redactar un **correo difícil**

Y una cuarta, la más importante: **verlo fallar**.

<!--
2 min · acumulado 0:47
Avisar que las tres las hago en vivo y que van a ver los errores también.
La tabla de producción sale de acá a propósito: es el bloque de apertura de la
sesión 4, y hacerla dos veces no agrega nada.
Pedir que mientras miran anoten: ¿esto me serviría el lunes?
-->

---

<!-- _class: panel -->

## Vamos al chatbot

Miren tres cosas: qué tan **rápido** responde, qué tan **seguro** suena, y si lo que dice es **verdad**.

<!--
10 min · acumulado 0:57
Cambiar a la ventana del chatbot. Prompts exactos, en orden:

1) "Resumí este resumen de paper del SPE en cinco viñetas para un gerente que
   no es ingeniero de reservorios: <pegar abstract público>"

2) "Explicá qué es la recuperación secundaria como si le hablaras a un directorio
   no técnico. Máximo 150 palabras, sin fórmulas."

3) "Redactá un correo para avisarle a un contratista que vamos a postergar una
   intervención dos semanas por disponibilidad de equipo. Tono cordial pero firme,
   sin comprometer fecha nueva."

Volver al deck en la slide siguiente.
-->

---

## Qué acabamos de ver

Rápido, ordenado, con buen tono. Y **sin ninguna garantía de que sea cierto**.

El chatbot no tiene un botón de "no sé". Cuando no sabe, sigue escribiendo igual.

<!--
2 min · acumulado 0:59
Puente al fallo deliberado. Preguntar si alguien notó algo raro en las respuestas
anteriores; a veces ya lo cazaron solos y es mejor si sale de ellos.
-->

---

<!-- _class: panel -->

## Ahora, a hacerlo fallar

<!--
10 min · acumulado 1:09
Cambiar al chatbot. Preguntas para provocar la falla, en orden de más sutil a
más evidente:

1) "¿Cuál es la producción del campo Río Grande en 2024 según el boletín de la ANH?"
   (va a inventar una cifra con total seguridad)

2) "Citame tres papers del SPE sobre recuperación asistida en areniscas del
   Subandino con su número de SPE."
   (los números de paper suelen ser inventados y son verificables al instante)

3) "¿Qué dice la norma API 14B sobre el intervalo de prueba?"
   (mezcla normas reales con contenido inventado)

Verificar UNA en vivo, buscándola. Que vean el chequeo, no solo la afirmación.
Volver al deck.
-->

---

## No fallaron todas por lo mismo

A la primera le **faltaba el dato**: nunca leyó ese boletín, y en vez de decirlo escribió la cifra más creíble.

En la segunda el dato **no existe en ninguna parte**, y aun así produjo algo con la forma exacta de una cita.

<!--
2 min · acumulado 1:11
Dos causas, no cuatro. Las otras dos no las vieron todavía y nombrarlas ahora
sería humo; van enteras en el cierre, como hoja de ruta.
La primera se arregla trayéndole el documento, y eso es la sesión 5.
La segunda no se arregla: se verifica, y eso es la sesión 7.
Si preguntan por la tercera respuesta, la de la norma API 14B: es la mezcla de
las dos. La norma existe y el contenido no. Es la peor de las tres, y por eso
el ejercicio de la sesión 7 le dedica un informe entero.
-->

---

<!-- _class: cita -->

## La salida de un LLM es un **borrador plausible**, no una fuente

<!--
2 min · acumulado 1:13
La regla que nos acompaña las ocho sesiones.
En la sesión 2 vemos POR QUÉ pasa esto: sale del mecanismo mismo, no es un bug
que alguien vaya a arreglar.
-->

---

<!-- _class: panel -->

## ¿Cuánto confiarías ahora?

<!--
2 min · acumulado 1:15
Cambiar al panel y abrir el pulso "s1-confianza".
Es la misma forma de pregunta que la del arranque, pero después de ver fallar al
modelo. Mostrar las barras mientras se llenan.
Cerrar el pulso para que ellos vean el resultado. Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## Encuesta de relevamiento

Bloque 3 de 5 · **15 min**

<!--
Arranca 1:15, termina 1:30
-->

---

## Este curso termina con un caso construido **con lo de ustedes**

Para eso necesito saber qué rol tiene cada uno, qué tareas repetitivas le comen la semana,
qué datos maneja y en qué formato.

Con eso, en la **sesión 5** elegimos juntos un caso. En la **sesión 8** lo recorremos resuelto
de punta a punta.

<!--
2 min · acumulado 1:17
Este es el bloque que hace que el curso valga distinto a un tutorial de YouTube.
Decirlo así, sin vueltas.
Aclarar la nota de privacidad: las respuestas las uso solo para diseñar el caso
y los ejercicios, y no hay que poner nada confidencial.
-->

---

<!-- _class: panel -->

## La encuesta está en la página de la sesión 1

`podeley.github.io/curso-energia-ypfb`

Son doce preguntas y unos quince minutos. Sin datos confidenciales.

<!--
13 min · acumulado 1:30
Dejar esta slide proyectada mientras la completan. No cambiar de ventana: que
tengan la URL a la vista todo el bloque.
Mirar el panel en la otra ventana para ver cuántos van completando.
A los 10 min avisar que quedan 5.
El que no llegue la puede terminar después: se guarda sola.
-->

---

<!-- _class: seccion -->

## Discusión

Bloque 4 de 5 · **20 min**

<!--
Arranca 1:30, termina 1:50
-->

---

## ¿Qué tarea de tu semana te parece **más** automatizable con lo que viste hoy?

¿Y cuál **menos**?

<!--
8 min · acumulado 1:38
Primera pregunta de discusión. Dejarla proyectada mientras hablan.
Si nadie arranca, empezar por la de "menos": es más fácil y suele destrabar.
Anotar todo: esto alimenta la shortlist de la sesión 5 igual que la encuesta.
-->

---

## El chatbot respondió algo incorrecto con total seguridad

¿Le **faltaba el dato**, o el dato **no existía** y lo completó igual?

<!--
7 min · acumulado 1:45
Segunda pregunta. Ahora es un diagnóstico, no una opinión: que clasifiquen cada
error que vieron en una de las dos causas.
Buscar que salga la idea de "verificable": las tareas donde puedo comprobar el
resultado rápido son las tareas seguras.
Si sale "entonces no sirve", repreguntar: ¿un borrador de un pasante sirve?
-->

---

## ¿Dónde ya hay machine learning escondido en el software que usás?

Simuladores, interpretación sísmica, mantenimiento predictivo…

<!--
5 min · acumulado 1:50
Tercera pregunta. Cierra el círculo con el bloque 1, que la dejó planteada y no
la conversó.
Si quedó poco tiempo, esta es la que se puede acortar.
-->

---

<!-- _class: seccion -->

## Cierre y tarea

Bloque 5 de 5 · **10 min**

<!--
Arranca 1:50, termina 2:00
-->

---

<!-- _class: acentos -->

## Las cuatro maneras de fallar

- **Inventa lo que no sabe** — de cómo genera el texto, palabra por palabra · sesión 2
- **Está seguro y equivocado** — de lo que aprendió y de lo que no · sesión 5
- **Se olvida de lo que le dijiste** — de cuánto puede mirar a la vez · sesiones 2 y 6
- **No hace lo que le pediste** — de cuánto control dan las instrucciones · sesión 3

<!--
3 min · acumulado 1:53
Hoy vieron las dos primeras. Esta es la hoja de ruta del curso, no materia.
No hay que memorizar nada. Lo único que quiero que se lleven: cuando algo salga
mal, la primera pregunta útil no es "¿cómo lo reescribo?" sino "¿cuál de las
cuatro fue?".
En la sesión 7 las juntamos en una tabla y salen con un protocolo.
La misma lista está en la página de la sesión 1.
-->

---

## Tarea para la sesión 2

Usá el chatbot para **una tarea real** de tu trabajo, sin datos confidenciales.

Anotá tres cosas: **qué pediste**, **qué salió bien**, **qué salió mal**.

Dos minutos de notas alcanzan. Las usamos para abrir la próxima sesión.

<!--
3 min · acumulado 1:56
Insistir en que anoten lo que salió MAL. Es el material más útil que van a traer.
Y que arriesguen por qué: con la hoja de ruta recién vista, ya pueden.
-->

---

## La sesión 2: cómo funciona un LLM

- Entender qué es un **token** y por qué importa para todo lo demás
- Ver que el modelo **predice el próximo token**, y qué controla la temperatura
- Derivar de esa mecánica **por qué los modelos alucinan**

En la página hay dos ejercicios para jugar antes: el tokenizador y "adiviná el próximo token".

<!--
3 min · acumulado 1:59
Pedirles que hagan los dos ejercicios ANTES de la sesión 2: la clase los recorre
suponiendo que ya jugaron.
-->

---

<!-- _class: portada -->

# Nos vemos en la sesión 2

El quiz, los recursos y los ejercicios quedan en la página · **podeley.github.io/curso-energia-ypfb**

<!--
1 min · acumulado 2:00
Dejar proyectada mientras se despiden y responder lo que quede suelto.
Después de la clase: revisar el panel, exportar el CSV del relevamiento y
empezar a clasificar los casos.
-->
