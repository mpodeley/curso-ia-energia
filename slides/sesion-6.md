---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 6**'
footer: 'mpodeley.github.io/curso-ia-energia'
---

<!-- _class: portada -->

# Agentes y el caso de tu empresa

Sesión 6 de 8 · día 3: agentes · 2 h en vivo · **PCR · CGC · Tecpetrol · Andes Petroleum**

<!--
0:00 · portada mientras vuelven de la pausa
Ventanas de esta sesión: A este deck; C el sitio en la página de la sesión
6; E la terminal en ~/caso-agente-vivo, con la carpeta lista y el agente SIN
lanzar; F los números de referencia (salida de referencia.py, o la tabla del
README de docs/edicion-2026-09/caso-agente/), fuera de la pantalla
compartida; G la carpeta salida/ del ensayo de ayer, que es el plan B.
Todo esto se deja listo antes de la sesión 5: la pausa dura diez minutos.
Letra de la terminal grande (que se lea en una notebook) y tema claro.
Apoyo: cronómetro en cero, chat abierto, y su documento con lo que cada uno
dijo el lunes en la ronda de relevamiento, a mano para el taller.
-->

---

<!-- _class: seccion -->

## El caso real, armado por un agente

Bloque 1 de 4 · **45 min**

<!--
0:00 · arranca el bloque, termina 0:45
-->

---

<!-- _class: agenda -->

## Esta sesión

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| El caso real, armado por un agente | 45 min | Un agente de terminal trabaja sobre una carpeta preparada y arma el screening de waterflooding que el jueves se critica |
| Dónde se rompe, dónde mejora | 15 min | Contexto que crece, leer contra tocar, la memoria en archivos, la frontera que sube |
| Pausa | 10 min | |
| Taller: el caso de tu empresa, en una página | 40 min | Dolor, datos, sensibilidad, verificabilidad, primer paso; por empresa |
| Cierre y tarea | 10 min | Lo que se llevan, y pulir la página del caso para mañana |

<!--
2 min · acumulado 0:02
La misma tabla está en la página de la sesión 6.
Retomar en una frase: antes de la pausa vieron qué es un agente y el arnés
que lo envuelve, y corrieron uno gratis. Ahora uno más fuerte trabaja en
serio, sobre el caso real del curso, el que mañana se critica. Y después de
la pausa cada empresa escribe el suyo.
-->

---

## Al final de esta sesión van a poder

- Leer lo que hace un **agente de terminal**, vuelta por vuelta, y decir qué chequear
- Separar lo que se **delega hoy** de lo que todavía no
- Escribir en una página el **caso de su empresa**: dolor, datos, sensibilidad, verificabilidad

<!--
1 min · acumulado 0:03
Tres cosas. La primera se hace mirando: nadie corre nada en esta sesión. La
tercera es de ellos, y mañana se pone al lado de lo que arme el agente.
Apoyo: avisa por el chat que la página de la sesión 6 ya está abierta en el
sitio.
-->

---

## El caso del jueves, armado hoy

Un **screening de waterflooding**: dónde tendría sentido inyectar agua para empujar petróleo,
con criterios escritos, sobre datos públicos de la cuenca Noroeste.

El jueves se critica. Hoy lo arma un agente, en vivo, y ustedes lo miran trabajar.

<!--
2 min · acumulado 0:05
El agente es Claude Code, de Anthropic, en esta computadora y con cuenta
paga. Es el loop de la sesión 5 con herramientas más fuertes: lee archivos,
escribe Python, lo corre, lee el error y corrige. OpenAI y Google tienen
agentes de terminal de la misma familia.
Decir el alcance: un screening con criterios. La simulación y la decisión de
inversión quedan para los reservoristas.
-->

---

## La carpeta

```
caso-agente-vivo/
├── CLAUDE.md               las instrucciones del proyecto
├── PEDIDO.md               el pedido, en cuatro pasos
├── .claude/settings.json   los permisos
├── datos/                  Capítulo IV: 1,003 pozos, 88,093 meses
└── salida/                 vacía: ahí escribe el agente
```

<!--
3 min · acumulado 0:08
Ventana E: mostrar la carpeta de verdad con ls -la, que se vea que salida/
está vacía. Los datos son la misma fuente de los 84 pozos del lunes, ahora
la cuenca entera: registros mensuales de producción e inyección pozo por
pozo, de enero de 2019 a julio de 2026. Copiados ayer del caché: el agente
no baja nada de internet.
El pedido, en voz alta: quién inyecta agua y para qué, un ranking de los
campos, el diagnóstico de agua de Puesto Guardián y un informe de una página.
-->

---

## El archivo de instrucciones

Lo lee solo, cada vez que arranca: reglas de trabajo, qué es cada columna, los criterios del
manual y una lista de **trampas conocidas**.

La primera trampa se aprendió en agosto: los inyectores desaparecieron del resultado y lo
detectó una persona **contando filas**. Hoy está escrita.

<!--
4 min · acumulado 0:12
Ventana E: abrir CLAUDE.md y recorrer los títulos, sin leer todo. Parar en
tres lugares:
1. Las reglas 4 y 5: contar filas después de cada filtro, y contrastar
   cualquier número del campo con el detalle pozo por pozo.
2. La trampa del tef: cuenta días de producción, así que muchas filas de
   inyección vienen con cero días (550 de 815 en la cuenca). Un filtro de
   días pensado para productores las borra sin avisar. Pasó en agosto.
3. Los criterios: el ranking con cinco filtros en orden, y la frase del
   manual que el informe tiene que repetir: con menos del 50% de los datos,
   no se usa para decidir, se usa para saber qué datos pedir.
El punto: a un agente se le enseña por escrito. Es el prompt del proyecto,
escrito una vez y guardado al lado de los datos. Otras herramientas leen el
mismo tipo de archivo con el nombre AGENTS.md.
-->

---

## Los permisos

- **Sin preguntar**: leer, correr Python, escribir en `salida/`
- **Prohibido**: internet, borrar archivos, tocar `datos/`
- **Todo lo demás**: se detiene y pregunta, y contestamos en pantalla

<!--
2 min · acumulado 0:14
Ventana E: mostrar .claude/settings.json, que son diez líneas. Los permisos
también viven en un archivo de la carpeta, y por eso al abrirla por primera
vez la herramienta pregunta si confiamos en ella.
Todo lo permitido se deshace: si sale mal, se vacía salida/ y se repite.
-->

---

<!-- _class: panel -->

## Arranca

`claude --model opus "$(cat PEDIDO.md)"`

Miren **qué herramienta llama** en cada vuelta y qué hace cuando algo **no sale**.

<!--
2 min · acumulado 0:16
Ventana E, desde ~/caso-agente-vivo. La primera vez aparece el diálogo de
confianza de la carpeta: leerlo en voz alta (lista los permisos que la
carpeta trae) y aceptar. El pedido queda escrito arriba, en la pantalla:
leerlo.
Si hay que responder algún permiso, contestar en voz alta y decir por qué.
Apoyo: abre en el chat la consigna "¿qué chequearías antes de creerle?".
-->

---

<!-- _class: panel -->

## Mientras trabaja

El loop, vuelta por vuelta: lee, corre, mira, corrige.

Tu parte, por el chat: **¿qué chequearías antes de creerle?**

<!--
17 min · acumulado 0:33
Narrar sin tapar al agente. Lo que conviene señalar cuando pase:
- La primera mirada a los datos: cuenta filas y columnas antes de calcular
  nada. Es lo que pide la regla 4.
- El primer error, que casi siempre llega: una columna leída con otro tipo,
  un filtro vacío. Leer el error en voz alta y ver qué hace con él.
- Los conteos después de cada filtro del ranking: 27, 16, 13, 10, 5.
- Si en algún momento deja de seguir una regla del archivo, decirlo: es
  material para el bloque siguiente.
No corregirlo a mano ni apurarlo con pedidos nuevos mientras corre.
Apoyo: junta los chequeos del chat en tres montones (conteos, un número
contra la fuente, un pozo) y lee los dos mejores al terminar, con el nombre
de quién los propuso.
Plan B, por tiempos: si a 0:28 no terminó el paso 3, se sigue narrando hasta
0:33; ahí se pasa a la ventana G (la salida del ensayo, misma carpeta y
mismo pedido) y el agente en vivo termina solo, para mirarlo en la pausa.
Plan B si falla: un error que repite tres veces, o se cuelga, se dice en voz
alta (es parte de lo que se enseña) y se pasa a G. Sin red, el agente no
arranca: G, y si tampoco está, el zip de la página (el proyecto original,
con el libro de Puesto Guardián en datos/argentina/) y referencia.py en la
ventana F.
-->

---

## Lo que entregó, contra la referencia

| Qué | Referencia |
| --- | --- |
| Pozos y filas | 1,003 · 88,093 · 2019-01 a 2026-07 |
| Agua a sumideros | 97.3% del total, en 26 pozos |
| Inyectores que inyectaron | 1 de 6: P.Gu. a-11 |
| Ranking | 27 → 16 → 13 → 10 → 5 campos |
| Puesto Guardián | Np 240.6 Mbbl · último WOR 10.38 · Chan normal |

<!--
6 min · acumulado 0:39
Ventana E: abrir salida/informe.md y leerlo contra esta tabla (y contra F si
algo no coincide). La tabla también está en la página.
Si un número difiere, no se discute cuál está bien: se busca por qué. Las
diferencias típicas tienen nombre: el filtro de días (el Np de Puesto
Guardián es 243.4 con todas las filas y 240.6 sin las 11 de menos de 10
días), o el denominador del caudal medio (el inyector a-11 da 404 bpd sobre
79 meses y 2,660 sobre los 12 en que inyectó).
Leer en voz alta la sección de límites del informe: tiene que decir que el
ranking es de nivel 1 y que el índice de atractivo no se calcula porque falta
volumetría, fluidos y roca.
Puesto Guardián sale último de los cinco, y está bien: es el campo del caso
por su inyector, no por su tamaño.
-->

---

## El chequeo que más vale: pozo por pozo

El WOR del campo **baja**: de 26.5 en 2019 a 10.4 en 2025.

El pozo nuevo da el 95% del petróleo, y su WOR **se triplicó**: de 3.3 en 2022 a 10.4. Cambió
la mezcla de pozos.

<!--
5 min · acumulado 0:44
Si alguien lo propuso en el chat, decir su nombre. Si el informe ya lo dice
(la regla 5 lo pide), mostrar dónde.
Si no, pedírselo al agente en vivo, una línea: "Mostrame el WOR anual de
cada pozo de Puesto Guardián". Tarda un minuto.
Lo que se ve: PPSA.St.PGu-13 entra en 2022 con WOR 3.3 y en 2025 está en
10.4; los viejos, con WOR entre 14 y 36, fueron parando. El número del campo
baja porque la suma cambió de pozos, y el diagnóstico de Chan, pensado para
un pozo, se aplicó a esa mezcla. Esa es una de las preguntas del jueves.
-->

---

<!-- _class: cita -->

## Lo que el agente sabe del proyecto **está escrito en la carpeta**

<!--
1 min · acumulado 0:45
La frase del bloque. Instrucciones, permisos y datos: tres archivos que
cualquiera puede leer y corregir.
Cierre del bloque 1.
-->

---

<!-- _class: seccion -->

## Dónde se rompe, dónde mejora

Bloque 2 de 4 · **15 min**

<!--
0:45 · arranca el bloque, termina 1:00
-->

---

## El contexto crece en cada vuelta

Cada archivo leído y cada resultado se suman a la ventana: más lento, más caro, más fácil
perder el objetivo del principio.

Por eso el pedido vino en **cuatro pasos**.

<!--
3 min · acumulado 0:48
Ventana E: escribir /context en la terminal y mostrar cuánto ocupó la
corrida. Es la ventana de contexto de la sesión 2, ahora llenándose en medio
del trabajo.
La regla práctica: una tarea de veinte pasos sale bastante peor que dos de
diez. Cortar en sesiones que se pasan el trabajo por archivos.
-->

---

## Cuando el agente pasa de leer a actuar

El de hoy lee y escribe en su propia carpeta: si se equivoca, se borra y se repite.

Un correo, una carga en un sistema o una válvula **quedan hechos**.

<!--
4 min · acumulado 0:52
Ejemplos del rubro sin dramatizar: una nominación, una orden de trabajo, un
sistema de control. El loop se apoya en mirar el resultado y corregir;
cuando el paso ya tuvo efecto afuera, mirar no alcanza.
Por eso los permisos de hoy son estrechos. Mañana, en la sesión 7, hay un
bloque entero sobre dónde un agente no entra.
-->

---

## Lo que aprende un agente vive en archivos

La sesión se apaga y el modelo no retiene nada. Queda lo escrito: **instrucciones**,
habilidades empaquetadas (skills) y conexiones a otros sistemas.

Cambiás de herramienta, y el archivo **sigue sirviendo**.

<!--
3 min · acumulado 0:55
La trampa del tef es el ejemplo: se aprendió una vez y la lee cada agente que
abre la carpeta. AGENTS.md lo leen más de veinte herramientas, entre ellas
las de OpenAI, Google y GitHub.
MCP, el protocolo de contexto de modelo: la forma estándar de enchufarle
herramientas a un modelo. Plomería; lo que puede hacer lo deciden los
permisos. La página lo dice en dos líneas.
Opcional si sobra un minuto: pedirle al agente que proponga una trampa nueva
para CLAUDE.md. Va a pedir permiso para editar fuera de salida/: decidir en
pantalla.
-->

---

## La frontera sube, con letra chica

METR mide el largo de tarea que un agente completa solo: se duplicó cada **unos siete meses**
desde 2019, y cada unos tres desde 2024. Por encima de **16 horas** ya no mide bien.

GPT-5.6 Sol, junio: 11.3 horas, con intentos de trampa contados como fallas. Claude Opus 5.5,
septiembre: mejora incremental.

<!--
4 min · acumulado 0:59
Mostrar metr.org/time-horizons, que está en los recursos de la página. METR
es Model Evaluation and Threat Research. Leer la letra chica a la vista: es
al 50% de éxito, en tareas de software, y el gráfico se actualizó el 8 de
mayo de 2026, cuando sumó una versión temprana de Claude Mythos Preview.
GPT-5.6 Sol (26 de junio): 11.3 horas, intervalo de 5 a 40, y METR dice que
no es una medición robusta. En algunas tareas intentó sacar información de
las pruebas ocultas; contados como éxitos, pasaría las 270 horas.
Claude Opus 5.5 (22 de septiembre): mejora incremental sobre Fable 5.1,
dentro de la tendencia.
Dos lecturas: lo que hoy no delegan porque es largo, reevaluarlo en seis
meses. Y la trampa es el motivo de fondo de todo lo que chequeamos hoy: un
agente capaz también puede pasar su propia prueba sin hacer la tarea.
-->

---

<!-- _class: cita -->

## Delegá lo que podés **corregir mirando el resultado**

<!--
1 min · acumulado 1:00
La frase del bloque, y la vara para la página que escriben después de la
pausa: si comprobar el resultado cuesta más que hacerlo, no es un caso.
Nota de régimen: si el bloque 1 se estiró, este se comprime (la página lo
cubre entero); el taller no se toca.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## Pausa · 10 min

Volvemos a las **13:10** (11:10 en Ecuador y Colombia)

<!--
10 min · acumulado 1:10
Apoyo: cronómetro de diez minutos en pantalla, y en el chat el link a la
plantilla del taller (sección "Taller: el caso de tu empresa" de la página
de la sesión 6), para que la abran antes de volver.
Durante la pausa: preparar las salas (PCR juntos, Andes juntos, CGC y
Tecpetrol solos). Si la plataforma no tiene salas, el taller se hace en la
sala principal con micrófonos cerrados y chat privado entre los pares.
Si el agente en vivo quedó corriendo, mirar cómo terminó.
-->

---

<!-- _class: seccion -->

## Taller: el caso de tu empresa, en una página

Bloque 3 de 4 · **40 min**

<!--
1:10 · arranca el bloque, termina 1:50
-->

---

## La plantilla, con el caso de hoy como ejemplo

| Pregunta | El caso de hoy |
| --- | --- |
| Dolor | Dónde estudiar primero una inyección de agua, con un criterio para todos |
| Datos | Producción e inyección mensual por pozo, públicas |
| Sensibilidad | Ninguna; con datos propios, la volumetría no sale |
| Verificabilidad | Referencia independiente, filas por filtro, pozo por pozo |
| Primer paso | Una carpeta y un archivo de instrucciones |

<!--
6 min · acumulado 1:16
La plantilla completa, con la columna "qué tiene que decir", está en la
página. Recorrerla con el caso que acaban de ver, fila por fila.
Los criterios vienen de la lista corta con la que la primera edición eligió
su caso: frecuencia del dolor, datos accesibles y no sensibles, resultado
verificable. Tienen que estar los tres. Ser exigente con el primer paso:
alcanza con uno solo, concreto, para el lunes.
Y una idea para llevarse: si el caso pasa la crítica de mañana, esta página
es casi el archivo de instrucciones de su proyecto.
-->

---

<!-- _class: panel -->

## A escribir, por empresa

Veinte minutos. PCR y Andes en pareja; CGC y Tecpetrol solos, y valen igual. Arranca del
problema que nombraste el lunes.

<!--
20 min · acumulado 1:36
Apoyo, antes de abrir las salas: lee de su documento lo que cada uno contestó
el lunes a "el problema que probarías primero", una línea por persona, con
nombre. Es la semilla del caso: la página arranca de ahí, o dice por qué
cambió.
Apoyo: cronómetro a la vista, aviso a los 10 y a los 17 minutos, y la
plantilla pegada en el chat de cada sala.
Pasar por cada sala a mitad de tiempo con una sola pregunta: ¿cómo sabrían
que está bien? Es la fila que siempre queda floja.
Recordar antes de abrir: el documento es de ellos; por el chat general va
después solo la fila del dolor y la del primer paso.
-->

---

## Ronda: el dolor y el primer paso

Por empresa, dos líneas al chat y en voz alta: **qué duele** y **qué probarían el lunes**. El
resto queda en su página, y mañana se critica con el protocolo.

<!--
14 min · acumulado 1:50
Tres minutos y medio por empresa. Escuchar buscando lo mismo en las cuatro:
¿el dato existe y puede salir, o tiene análogo público? ¿El resultado se
comprueba en menos de lo que tarda hacerlo a mano? Decirlo como pregunta; el
veredicto queda para mañana, con el protocolo.
Apoyo: anota las cuatro filas de dolor y primer paso; son la lista que
mañana se proyecta al lado del screening.
Cierre del bloque 3.
-->

---

<!-- _class: seccion -->

## Cierre y tarea

Bloque 4 de 4 · **10 min**

<!--
1:50 · arranca el bloque, termina 2:00
-->

---

<!-- _class: acentos -->

## Para llevarse

- A un agente se le enseña **por escrito**: instrucciones al lado de los datos
- Antes de creerle, **recontá**: filas por filtro, una cifra contra la fuente, un pozo
- Delegá lo que se corrige mirando el resultado; lo irreversible, **nunca sin persona**

<!--
3 min · acumulado 1:53
Tres prácticas, en palabras simples. Se suman a las de la sesión 5.
-->

---

## Tarea para mañana

Pulí la **página del caso** de tu empresa: releé las cinco filas y completá la que quedó floja.
Casi siempre es la de **verificabilidad**. Cinco minutos.

<!--
3 min · acumulado 1:56
El que está solo la pule solo; los de a dos se la mandan entre ellos. Mañana
se leen los cuatro casos al lado del screening que armó el agente.
Plan B si pocos la pulen: la página tal como quedó hoy sirve igual, y el
protocolo de mañana se aplica sobre lo que haya. Si alguien no llegó a
escribir nada, la ronda de hoy (dolor y primer paso) alcanza para empezar.
-->

---

## Mañana: sesiones 7 y 8

- Un **protocolo de verificación** según el costo del error, y dónde un agente no entra
- El screening de hoy, **criticado** con ese protocolo
- Sus **cuatro casos**, con las mismas reglas

<!--
3 min · acumulado 1:59
Mañana las piezas sueltas se vuelven reglas (sesión 7), y el caso del
agente y las cuatro páginas pasan por esas reglas (sesión 8). El quiz queda
en la página, como siempre.
-->

---

<!-- _class: portada -->

# Nos vemos mañana

El quiz y el caso quedan en la página · **mpodeley.github.io/curso-ia-energia**

<!--
1 min · acumulado 2:00
Dejar proyectada mientras se despiden.
Después de clase: copiar ~/caso-agente-vivo/salida/ a un lugar a mano, para
mostrarla el jueves al lado del libro del caso; guardar las cuatro filas de
dolor y primer paso y los chequeos del chat para el deck de la sesión 8.
-->
