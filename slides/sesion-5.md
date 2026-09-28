---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 5**'
footer: 'mpodeley.github.io/curso-ia-energia'
---

<!-- _class: portada -->

# Cómo funciona un agente: herramientas, arnés y CLI

Sesión 5 de 8 · día 3: agentes · 2 h en vivo · **PCR · CGC · Tecpetrol · Andes Petroleum**

<!--
0:00 · portada mientras entra la gente
Ventanas de hoy: A este deck; C el sitio en la página de la sesión 5; D
Claude gratuito con la conversación del Excel de los partes de ayer, por si
alguien pide verla; G la terminal en la carpeta de la demo, con Claude Code
iniciado con la cuenta paga del curso; H un editor de texto para escribir
el CLAUDE.md en vivo.
Preparación de la demo, una vez y fuera del repo:
1. mkdir -p ~/arch-demo/salida
2. copiar a ~/arch-demo los seis PDF de public/descargas/
   (arch-reporte-diario-2026-09-08.pdf a -15.pdf)
3. cd ~/arch-demo y abrir con: claude --permission-mode manual
   Desde la versión 2.1.283 una sesión nueva arranca en auto, y en auto no
   se ven los pedidos de permiso. Confirmar que el indicador dice manual.
4. No crear el CLAUDE.md: se escribe en vivo, en el bloque 5.
Ensayo completo la noche anterior, con la pantalla grabada. La carpeta que
queda del ensayo se guarda como ~/arch-demo-ensayo: es el plan B.
Nadie trae nada: ni tarea ni datos. Todo sale de la página.
Apoyo: cronómetro en cero, chat abierto, lista por nombre y empresa a la
vista, y el link de la página de la sesión 5 listo para pegar.
-->

---

<!-- _class: seccion -->

## Apertura

Bloque 1 de 7 · **8 min**

<!--
0 min · acumulado 0:00
Arranca 0:00, termina 0:08.
-->

---

<!-- _class: agenda -->

## Esta sesión

| Bloque | Tiempo | Qué hacemos |
| --- | --- | --- |
| Apertura | 8 min | De ayer a hoy: el chatbot que consolidó los partes ya usó herramientas |
| El loop | 12 min | Modelo, herramientas y loop, con la traza de un agente paso a paso |
| Cómo usa una herramienta | 20 min | La definición, el pedido y el resultado, en JSON de verdad; el modelo pide y el arnés ejecuta |
| El arnés | 15 min | Las seis funciones, los permisos y la memoria en archivos; cuánto pesa en el resultado |
| Los CLI: un agente en la terminal | 25 min | Qué es, cómo se instala, la carpeta, los permisos, las herramientas de fábrica, CLAUDE.md y AGENTS.md; Claude Code en vivo sobre los seis partes de la ARCH |
| MCP, skills y subagentes | 10 min | Tres piezas que agrandan al agente, una definición cada una |
| Qué agentes hay, y para llevarse | 20 min | El mapa por forma de uso y tres prácticas |
| Pausa | 10 min | A las 12:00 (10:00 en Ecuador y Colombia) sigue la sesión 6 |

<!--
1 min · acumulado 0:01
La misma tabla está en la página de la sesión 5.
Bajada del día: hoy es el día de los agentes. Esta mañana, cómo funcionan
por dentro, sin taller: mucha demo y dos rondas. Después de la pausa, en la
sesión 6, un agente arma una herramienta en vivo y cada uno hace su
versión con un agente gratuito.
Apoyo: avisar por el chat privado cuando un bloque se pase cinco minutos.
-->

---

## Al final de la sesión van a poder

- Explicar cómo usa una herramienta un agente: **el modelo pide y el arnés ejecuta**
- Ubicar las seis funciones del **arnés**, y cuánto pesa en el resultado
- Leer qué hace un **agente de terminal** en una carpeta: herramientas, permisos e instrucciones

<!--
1 min · acumulado 0:02
Decirlo en una frase: ayer usaron un agente sin saberlo; hoy lo abrimos
para ver cada pieza.
-->

---

## Ayer el chatbot ya usó herramientas

Seis partes de la Agencia de Regulación y Control de Hidrocarburos (ARCH), en PDF, y un Excel de vuelta. En el medio, Claude leyó, **escribió un programa**, lo corrió, miró y corrigió.

Hacerlo todos los días, con el parte nuevo, es trabajo de un agente.

<!--
4 min · acumulado 0:06
Antes de mostrar el segundo párrafo, pregunta por voz a dos o tres
personas: ¿qué hizo Claude entre que subieron los PDF y bajaron el Excel?
Queremos oír "escribió código", "lo corrió", "se equivocó y corrigió",
"tardó". Si alguien desplegó un bloque de código ayer, que cuente qué vio.
El remate es el segundo párrafo, que retoma el cierre del taller de ayer:
bajar el PDF del día, leerlo, sumar y avisar si algo no cuadra, todos los
días. Hoy vemos cómo funciona por dentro, y en el bloque 5 un agente de
terminal lo hace en vivo sobre los mismos seis partes.
Apoyo: llama por nombre, uno de cada empresa si se puede.
-->

---

<!-- _class: panel -->

## Entrá al sitio

`mpodeley.github.io/curso-ia-energia`

En la página de la sesión 5 están la traza del agente, los JSON de hoy y el mapa de agentes. Hoy no hace falta abrir ningún chatbot.

<!--
2 min · acumulado 0:08
Que abran la página de la sesión 5. Esta sesión es conceptual: miran, leen
JSON con nosotros y responden por el chat. Nadie instala nada hoy.
Plan B si el firewall bloquea el sitio: siguen la pantalla compartida.
Apoyo: pegar el link en el chat y confirmar por nombre que cada uno tiene
la página abierta.
-->

---

<!-- _class: seccion -->

## El loop

Bloque 2 de 7 · **12 min**

<!--
0 min · acumulado 0:08
Arranca 0:08, termina 0:20.
-->

---

## Un modelo en un loop, con herramientas

Piensa qué le falta, **pide una acción**, mira el resultado y vuelve a pensar, hasta que puede responder.

Un chatbot sin herramientas no se entera de su error. Un agente lo recibe de vuelta.

<!--
3 min · acumulado 0:11
La definición de Anthropic (Building effective agents, diciembre de 2024),
en una línea: modelos que usan herramientas según lo que les devuelve el
entorno, en un loop. Está en la página, con el link.
Debajo está el mismo modelo de la sesión 2, el que predice el próximo
token. Lo nuevo son dos cosas: pedir una acción y ver lo que salió.
Ojo con la palabra: decimos "pide", a propósito. Quién ejecuta es el tema
del bloque 3.
Gancho del rubro: un pozo con un sensor que manda datos. Sin retorno,
operás a ciegas; con retorno, corregís.
-->

---

<!-- _class: panel -->

## La traza, paso a paso

Ejercicio "El loop por dentro", en la página: una corrida sobre el Capítulo IV, en diez pasos. Frenamos en el **tercero**.

<!--
7 min · acumulado 0:18
Ventana C, ejercicio "El loop por dentro". Recorrerlo juntos, leyendo en
voz alta qué piensa, qué herramienta pide y qué vuelve.
Pasos 1 y 2: antes de escribir código, mira qué hay. Primer hábito bueno.
Paso 3: filtra por AGUARAGUE sin diéresis y le vuelven cero filas. Frenar
acá. Pregunta al chat, una línea por persona: ¿qué hace ahora el agente?
Apoyo: lee las respuestas en voz alta a medida que llegan.
Paso 4: lista los valores que existen, encuentra la diéresis, corrige y
sigue. Las cero filas le sirvieron de información, y las usa porque VE el
resultado.
Paso 10: la respuesta trae dos advertencias sobre lo que no verificó.
Mostrar el contador de contexto: crece en cada vuelta. Vuelve con los
subagentes, en el bloque 6.
-->

---

## Flujo fijo o agente

- **Flujo fijo**: una persona escribió los pasos de antemano; el modelo cumple su parte en cada uno
- **Agente**: el modelo decide el paso siguiente según lo que va viendo

Los dos sirven. Empezá por lo más simple que resuelva el problema.

<!--
2 min · acumulado 0:20
La distinción es de la misma nota de Anthropic. Sirve para leer anuncios:
mucho de lo que se vende como agente es un flujo fijo con un modelo
adentro, y eso está bien.
El script que va a escribir el agente del bloque 5 es un buen ejemplo: lo
arma un agente, pero una vez escrito se corre todos los días como flujo
fijo, sin modelo.
Cierre del bloque 2.
-->

---

<!-- _class: seccion -->

## Cómo usa una herramienta

Bloque 3 de 7 · **20 min**

<!--
0 min · acumulado 0:20
Arranca 0:20, termina 0:40.
-->

---

<!-- _class: cita -->

## El modelo pide, **el arnés ejecuta**

"The model never executes anything on its own." Anthropic, How tool use works

<!--
2 min · acumulado 0:22
Leer la frase entera, que está en la página: "The model never executes
anything on its own. It emits a structured request, your code (or
Anthropic's servers) runs the operation, and the result flows back into
the conversation." Traducirla en voz alta.
Anthropic lo llama un contrato: la aplicación declara qué herramientas hay
y qué datos reciben; el modelo decide cuándo usarlas.
Es la idea que más cuesta: ayer "Claude corrió el código". El modelo
escribió el código y pidió correrlo; lo corrió otro programa.
-->

---

<!-- _class: figura -->

## Una llamada a una herramienta, en cinco mensajes

![Diagrama de secuencia con tres columnas, modelo, arnés y herramienta: el arnés manda el pedido y la lista de herramientas; el modelo pide una herramienta con tool_use; el arnés la ejecuta y recibe el dato; le devuelve el resultado al modelo con tool_result; el modelo responde en texto. Los pasos 2 a 4 se repiten](img/tool-call.svg)

El modelo solo escribe texto: el pedido del paso 2 y la respuesta del paso 5.

<!--
4 min · acumulado 0:26
Recorrer los cinco mensajes con el dedo, de arriba abajo.
1: el arnés le manda al modelo tu pedido y la lista de herramientas, cada
una con su descripción.
2: el modelo no tiene el dato. Escribe un pedido con formato fijo,
tool_use, con el nombre de la herramienta y la entrada, y frena.
3: el arnés lee ese pedido y ejecuta. Acá entran los permisos: si la
herramienta pide permiso, el arnés te pregunta antes.
4: el dato vuelve al modelo como tool_result.
5: el modelo responde en texto, o vuelve a pedir otra herramienta: la caja
verde. Eso es el loop de la traza, visto por dentro.
La herramienta del ejemplo, leer_parte_arch, la inventamos nosotros; en
dos láminas la vemos entera.
-->

---

## La definición

```json
{
  "name": "get_weather",
  "description": "Get the current weather for a given location.",
  "input_schema": {
    "type": "object",
    "properties": {
      "location": { "type": "string",
        "description": "City and state, e.g. San Francisco, CA" }
    },
    "required": ["location"]
  }
}
```

<!--
3 min · acumulado 0:29
Es el ejemplo oficial de Anthropic, tal cual (Tool use with Claude). Leer
las tres partes: el nombre, la descripción y el esquema de entrada, que
dice qué datos recibe y cuáles son obligatorios.
Lo importante para ellos: el modelo nunca ve el programa que hay detrás,
solo esto. "It only sees the schema you provided and the result you
returned." De la descripción depende que elija bien la herramienta, así
que se escribe como para un colega nuevo, igual que el buen prompt de
ayer.
Explicar JSON en una frase: el formato de datos con llaves y comillas que
usan casi todos los programas para intercambiar información.
-->

---

## El pedido: `tool_use`

```json
{
  "type": "tool_use",
  "id": "toolu_01A09q90qw90lq917835lq9",
  "name": "get_weather",
  "input": { "location": "San Francisco, CA" }
}
```

El modelo nombra la herramienta y la entrada, y **frena**.

<!--
2 min · acumulado 0:31
El id sirve para emparejar después el resultado con este pedido.
Honestidad con la fuente: en la documentación, este input trae además
"unit": "celsius", que la definición no declara. Lo sacamos para que
coincidan. Está dicho en la página.
El modelo frena con stop_reason "tool_use": se queda esperando el
resultado. No sigue escribiendo hasta que el arnés le conteste.
-->

---

## El resultado: `tool_result`

```json
{
  "role": "user",
  "content": [{
    "type": "tool_result",
    "tool_use_id": "toolu_01A09q90qw90lq917835lq9",
    "content": "15 degrees"
  }]
}
```

Vuelve con el rol de **usuario**, aunque no lo escribiste vos.

<!--
2 min · acumulado 0:33
Mismo id que el pedido. Con esto el modelo sigue: responde, o pide otra
herramienta. Anthropic lo cuenta en cinco pasos; el quinto es repetir
mientras el modelo pida herramientas (están en la página).
El rol user es el gancho para la sesión 7: para el modelo, lo que devuelve
una herramienta es texto que entra a la conversación, igual que tu pedido.
Un PDF o una página web con instrucciones escondidas puede desviar a un
agente. Anthropic pide tratar ese contenido como no confiable. Nombrarlo
y seguir.
-->

---

## Lo mismo, con un parte de la ARCH

```text
pedido      "name": "leer_parte_arch"
            "input": { "fecha": "2026-09-15" }

resultado   "content": "Operación del 2026-09-14.
                        Total nacional: 463812.77.
                        EP Petroecuador: 366559.66.
                        Compañías privadas: 97253.11."
```

366,559.66 + 97,253.11 = **463,812.77** barriles por día: la misma suma de la hoja de control de ayer.

<!--
3 min · acumulado 0:36
La herramienta la inventamos para el curso: no existe en ningún producto.
Su definición completa, con la descripción y el esquema, está en la
página.
Los números son del parte del 15 de septiembre de 2026, que informa la
operación del 14: el mismo PDF del taller de ayer. Verificados contra el
PDF: total nacional 463,812.77; EP Petroecuador 366,559.66; subtotal de
privadas 97,253.11.
Pregunta al aire: ¿quién hace la suma? El modelo, si se lo pedís en las
instrucciones. Es el control que en el bloque 5 va a quedar escrito en el
CLAUDE.md de la demo.
-->

---

## Tres proveedores, el mismo contrato

- **Anthropic**: "The model never executes anything on its own"
- **OpenAI**: "Execute code on the application side with input from the tool call"
- **Google**: "The model doesn't execute the function itself"

Dónde corre la herramienta lo decide el arnés: ayer, en la nube; en un agente de terminal, en tu computadora.

<!--
1 min · acumulado 0:37
OpenAI (Function calling) lo cuenta en cinco pasos casi iguales; la cita es
el tercero. Google (Function calling con Gemini) lo dice en una línea.
Cambian los nombres de los campos; el reparto de tareas es el mismo.
Links en la página.
-->

---

<!-- _class: panel -->

## Tu herramienta, en una línea

Por el chat: una herramienta que le darías a un agente en tu trabajo. **Nombre, qué recibe y qué devuelve.**

<!--
3 min · acumulado 0:40
Ejemplo para arrancar, en voz alta: leer_presion_cabeza(pozo, fecha), que
devuelve la presión en boca de pozo de ese día.
Solo el tipo de herramienta: ni el nombre del sistema de la empresa ni
datos. Un minuto para escribir.
Apoyo: lee dos o tres en voz alta; guarda la lista, vuelve en la ronda del
bloque 4.
Tomar una y preguntar: ¿qué tendría que decir la descripción para que el
modelo la use bien? ¿Y si la presión viene en otra unidad?
Cierre del bloque 3.
-->

---

<!-- _class: seccion -->

## El arnés

Bloque 4 de 7 · **15 min**

<!--
0 min · acumulado 0:40
Arranca 0:40, termina 0:55.
-->

---

<!-- _class: figura -->

## El arnés, todo lo que rodea al modelo

![El arnés envuelve al modelo de lenguaje, que está en el centro con su loop: piensa, actúa, mira el resultado. Seis funciones adentro del arnés, y afuera la persona, los archivos, los programas y otros sistemas](img/arnes.svg)

"Claude Code is the harness; Claude is the model inside it." Glosario de Claude Code

<!--
3 min · acumulado 0:43
La definición completa del glosario: "the tools, context management, and
execution environment that turn a language model into a capable coding
agent". Las herramientas, el manejo del contexto y el entorno de
ejecución.
Recorrer la figura de adentro hacia afuera. Centro: el modelo, texto
entra, texto sale. El loop verde es la traza. El recuadro naranja es el
arnés: el que ejecuta los tool_use del bloque anterior. Afuera: vos, tus
archivos, los programas, otros sistemas. Todo eso lo toca el arnés, nunca
el modelo directo.
En inglés también se dice scaffold, andamio.
-->

---

## Seis cosas que hace el arnés

- Le da **herramientas**: la lista que viaja en el paso 1
- Corre el **loop** hasta que la tarea termina
- Decide qué entra al **contexto**: resume lo viejo y trae lo justo
- Pide **permiso** antes de lo que no puede hacer solo
- Guarda la **memoria en archivos**: CLAUDE.md, AGENTS.md
- **Reparte y conecta**: subagentes, y otros sistemas por MCP

<!--
3 min · acumulado 0:46
Pasar las seis con el Claude de ayer como ejemplo, rápido:
herramientas, código en una computadora aislada y archivos; loop, cada
bloque de código que desplegaron era una vuelta; contexto, la ventana de
la sesión 2, que el arnés resume cuando se llena (compactación);
permisos, casi no pide porque trabaja aislado y no toca tu computadora;
memoria, el modelo no recuerda nada de un día a otro; conectores, uno
propio en la cuenta gratuita.
Permisos, memoria, subagentes y MCP vuelven en los bloques 5 y 6. No
profundizar acá.
-->

---

## Trabaja por turnos, y deja un parte

Cada sesión de un agente arranca **sin memoria** de la anterior, como un turno nuevo.

El arnés le hace leer y escribir un parte: instrucciones, avance, lo que falta. A un agente se le enseña **por escrito**.

<!--
2 min · acumulado 0:48
La imagen es de Anthropic (Effective harnesses for long-running agents,
noviembre de 2025): un proyecto atendido por ingenieros que trabajan por
turnos, y cada uno llega sin memoria del turno anterior.
Su solución es la de una guardia bien llevada: un parte de avance que el
agente escribe al terminar y lee al empezar, la lista de lo que falta, el
historial de cambios.
El punto práctico: las reglas de la tarea van en un archivo. En el bloque
5 escribimos uno en vivo, para los partes de la ARCH.
-->

---

## ¿Cuánto pesa el arnés en el resultado?

- **Epoch AI**, diciembre de 2025: mismo modelo, otro arnés, hasta 11% y 15% de diferencia en un examen de programación
- **METR**, febrero de 2026: Claude Code y Codex contra arneses simples, sin una gran diferencia en el largo de tarea

El arnés decide sobre todo **qué puede hacer** el agente.

<!--
2 min · acumulado 0:50
Epoch AI: SWE-bench Verified, tareas reales de programación. Cambiar solo
el arnés movió hasta 11% el resultado de GPT-5 y hasta 15% el de Kimi K2
Thinking.
METR: midió si Claude Code y Codex alargaban las tareas que el modelo
completa solo, contra sus arneses de prueba. Concluyó que no hacen una gran
diferencia.
Lectura para ellos: el arnés abre y cierra puertas (herramientas,
permisos, memoria); la capacidad de fondo la pone el modelo. El Claude de
ayer y el Claude Code de la demo son la misma familia de modelos con otro
arnés.
-->

---

<!-- _class: panel -->

## Sin preguntar, o con permiso

Pensá en tu trabajo: ¿qué herramienta le darías a un agente **sin que pregunte**, y cuál **solo con tu visto bueno**?

<!--
5 min · acumulado 0:55
Ronda por nombre, seis personas, cuarenta segundos cada una. Pueden usar
la herramienta que escribieron en el chat del bloque 3. Solo el tipo de
herramienta, nunca el sistema ni el dato de la empresa: "leer la carpeta
de informes, sin preguntar; mandar un correo, con permiso".
Escuchar el patrón: lo que dan libre es de lectura; lo que piden con
permiso escribe, manda o mueve algo. Nombrarlo: es exactamente la columna
de permisos de las herramientas de Claude Code, que viene en el bloque 5.
Apoyo: llama el orden y anota la columna "con permiso"; es material de la
sesión 7.
Cierre del bloque 4.
-->

---

<!-- _class: seccion -->

## Los CLI: un agente en la terminal

Bloque 5 de 7 · **25 min**

<!--
0 min · acumulado 0:55
Arranca 0:55, termina 1:20.
-->

---

## Un agente en la terminal

Un programa que abrís **dentro de una carpeta**. Ve sus archivos, la terminal y el historial de versiones (git).

El arnés corre en tu computadora; el modelo, en la nube.

<!--
2 min · acumulado 0:57
CLI: interfaz de línea de comandos (command-line interface). La terminal es
la ventana de texto donde se tipean comandos; mostrar la ventana G un
segundo, sin correr nada.
Según la documentación de Claude Code, al correr claude en una carpeta el
agente accede a sus archivos y subcarpetas, a la terminal (cualquier
comando que podrías correr vos) y al estado de git.
La diferencia con ayer: el chatbot trabajaba en una computadora aislada en
la nube; este trabaja sobre tus archivos. Por eso los permisos importan
tanto.
La página tiene la guía en español: Cómo funciona Claude Code.
-->

---

## Cuáles se prueban gratis

| Agente de terminal | De quién | ¿Gratis? |
| --- | --- | --- |
| Copilot CLI | GitHub | Sí: todos los planes, con créditos |
| Antigravity CLI | Google | Sí: cuenta personal, cuota semanal |
| Claude Code | Anthropic | No: desde Pro |
| Codex CLI | OpenAI | No: desde Plus |

Se instalan con un comando en la terminal. En una computadora de la empresa, consultá antes con sistemas.

<!--
3 min · acumulado 1:00
Datos al 28 de septiembre de 2026, con link en la página.
Copilot CLI: "All plans include Copilot CLI", también el gratuito, que trae
una cantidad limitada de créditos.
Antigravity CLI: cuenta personal de Google (la documentación recomienda
una @gmail.com), cuota que se renueva cada semana. Reemplazó a Gemini CLI
en las cuentas sin pago el 18 de junio de 2026.
Claude Code: "The free claude.ai plan does not include Claude Code
access". En Windows no hace falta ser administrador (lo dice su página de
instalación); los otros dos no lo aclaran.
Codex CLI: la terminal arranca en Plus.
Los comandos de instalación están en la página, en "para curiosos".
Instalar un programa que ejecuta comandos en una computadora de la empresa
es una decisión de seguridad: que la tome sistemas.
-->

---

## Las herramientas de fábrica

| Herramienta | Qué hace | ¿Pide permiso? |
| --- | --- | --- |
| Read, Glob, Grep | Lee y busca en los archivos | No |
| Write, Edit | Crea o cambia un archivo | Sí |
| Bash | Corre un comando: Python, un script | Sí |
| WebFetch, WebSearch | Baja una página o busca en internet | Sí |
| Agent, TodoWrite | Lanza un subagente, lleva la lista de tareas | No |

<!--
2 min · acumulado 1:02
De la referencia de herramientas de Claude Code: son más de cuarenta; estas
son las que van a ver en la demo.
El patrón, que es el mismo de la ronda de recién: leer corre sin
preguntar; escribir, ejecutar y salir a internet pasan por un permiso.
Cada una de estas es un tool_use como el del bloque 3: nombre, entrada,
resultado.
-->

---

## Los permisos

- **Manual**: pregunta antes de editar, ejecutar o salir a la red
- **Aceptar ediciones**: edita solo; para lo demás, pregunta
- **Plan**: explora y propone, sin tocar archivos
- **Auto**: un segundo modelo revisa cada acción en tu lugar

Lo prohibido gana en cualquier modo. Codex CLI y Copilot CLI hacen lo mismo con otros nombres.

<!--
3 min · acumulado 1:05
Modos de Claude Code (Permission modes). Se cambian con Shift+Tab.
Desde la versión 2.1.283, una sesión nueva arranca en auto. Para la demo
arrancamos en manual, para que se vean los pedidos.
Encima de los modos van las reglas: cada herramienta o comando puede estar
permitida, preguntar o prohibida. La prohibición gana siempre, en
cualquier modo.
Aparte, el aislamiento (sandbox): el sistema operativo encierra los
comandos en las carpetas y la red que definas de antemano.
Codex CLI: aislamiento en tres niveles (solo lectura, escritura en la
carpeta del proyecto, acceso total) y la red apagada de fábrica. Copilot
CLI: --allow-tool y --deny-tool, y "deny rules always take precedence".
-->

---

## CLAUDE.md y AGENTS.md

Instrucciones por escrito que el arnés carga **al empezar cada sesión**: el parte del turno, hecho archivo.

AGENTS.md es el mismo archivo en un formato abierto, que leen más de veinte agentes.

<!--
2 min · acumulado 1:07
CLAUDE.md, según el glosario: instrucciones persistentes que se cargan al
empezar cada sesión. AGENTS.md: "a README for agents", formato abierto que
desde el 9 de diciembre de 2025 administra la Agentic AI Foundation, de la
Linux Foundation. Lo leen Codex, Copilot, Gemini CLI y más. Claude Code lee
AGENTS.md cuando la carpeta no tiene CLAUDE.md.
Consecuencia práctica: si cambian de herramienta, el archivo les sigue
sirviendo.
Ahora lo escribimos.
-->

---

## En vivo: la carpeta

```text
arch-demo/
├── CLAUDE.md          lo escribimos ahora, seis líneas
├── arch-reporte-diario-2026-09-08.pdf
├── ...                cuatro partes más
├── arch-reporte-diario-2026-09-15.pdf
└── salida/            vacía: ahí escribe el agente
```

<!--
2 min · acumulado 1:09
Ventana H: escribir el CLAUDE.md en vivo, dictándolo en voz alta. Está en
la página, para copiar si hay apuro:
# Partes diarios de la ARCH
- Cada PDF es un parte diario de producción de la ARCH de Ecuador, de una
  página.
- Los números usan punto de miles y coma decimal: 366.559,66 son 366559.66
  barriles por día.
- Cada parte trae dos fechas: la de publicación y la de operación.
- No modifiques los PDF. Todo lo nuevo va en la carpeta salida/.
- Antes de terminar, compará la suma de las compañías con el total
  nacional de cada parte.
Guardarlo en ~/arch-demo. Ventana G: mostrar la carpeta con ls, que se vea
que salida/ está vacía.
-->

---

## En vivo: el pedido

```text
Armá un script en Python que lea los seis partes de esta carpeta y los
consolide en un Excel en salida/: producción por compañía y por día, el
total nacional, y una hoja de control que compare la suma de las
compañías con el total de cada parte. Que se pueda volver a correr
mañana con el parte nuevo. Probalo y contame qué no pudiste leer.
```

Miren qué herramienta pide, **cuándo frena a pedir permiso** y qué hace cuando un número no cierra.

<!--
9 min · acumulado 1:18
Ventana G. Pegar el pedido. Narrar mientras corre, en el lenguaje del
bloque 3: "pidió Read sobre el CLAUDE.md", "pide Bash para correr
pdftotext: frena y me pregunta", "pide Write para crear el script".
Aprobar de a uno los primeros permisos. Mostrar la opción de no volver a
preguntar por ese comando y decir qué implica: desde ahí, ese comando corre
solo en esta carpeta.
Si pide instalar una biblioteca de Python, es el mejor momento de la demo:
instalar también pide permiso, y conviene leer qué instala.
Qué buscar, de lo que ya conocemos por el taller de ayer:
- la coma decimal y el punto de miles; el gas viene con otro formato;
- en el texto del PDF, la tabla 2 queda pegada a la 1;
- los días de operación 11 y 12 no tienen parte propio;
- el parte del 11 revisa el día 9 de EP Petroecuador en +5,827 bppd, así
  que la "producción anterior" no coincide con el día previo.
Al terminar: abrir el Excel y chequear un número contra el PDF en
pantalla: el parte del 15, total nacional 463,812.77.
Apoyo: pide por el chat un chequeo más que le harían al Excel y lee uno;
si hay tiempo, se lo pedimos al agente como segundo turno.
Plan B, en orden: si no terminó a los 7 minutos, mostrar lo que va y abrir
el Excel de ~/arch-demo-ensayo. Si se cae la red o la cuota, la grabación
del ensayo y la carpeta ~/arch-demo-ensayo. Último recurso: la planilla de
referencia de la sesión 3, public/descargas/arch_consolidado_referencia.xlsx.
-->

---

## Lo que queda en la carpeta

Un **script** que mañana corre con el parte nuevo, sin volver a explicar nada.

Ayer fue una conversación. Hoy quedó un programa, y las reglas por escrito.

<!--
2 min · acumulado 1:20
Mostrar la carpeta salida/ y el script. Correrlo una vez más a mano, sin el
agente, en la terminal: python y el nombre del script. Corre sin modelo.
Esto conecta con el flujo fijo del bloque 2: el agente lo armó, y lo que
queda se corre todos los días como un flujo fijo. Falta bajar el PDF del
día solo; es un paso más que se le puede pedir.
Cierre del bloque 5.
-->

---

<!-- _class: seccion -->

## MCP, skills y subagentes

Bloque 6 de 7 · **10 min**

<!--
0 min · acumulado 1:20
Arranca 1:20, termina 1:30.
-->

---

## MCP, un enchufe común para otros sistemas

Protocolo de contexto de modelo (Model Context Protocol, MCP): un **estándar abierto** para conectar agentes con otros sistemas.

Un servidor MCP le ofrece al agente herramientas, datos para leer y plantillas. Del rubro: un servidor comunitario para OSDU, con la escritura apagada.

<!--
4 min · acumulado 1:24
Definición oficial: "an open-source standard for connecting AI
applications to external systems". Su documentación lo compara con un
puerto USB-C. Lo creó Anthropic y desde diciembre de 2025 lo administra la
Agentic AI Foundation, igual que AGENTS.md.
Tres partes: el host (la aplicación, por ejemplo Claude Code), un cliente
por conexión, y el servidor, que ofrece herramientas, recursos y prompts.
Para el modelo, una herramienta que llega por MCP se usa igual: definición,
pedido, resultado. El bloque 3 entero sigue valiendo.
OSDU: Open Subsurface Data Universe, la plataforma abierta de datos de
subsuelo del OSDU Forum. El servidor MCP es de la comunidad, por fuera del
OSDU Forum, y trae la escritura y el borrado apagados, cada uno con su
propia variable. Ese diseño es el de la ronda del bloque 4 llevado a un
sistema real.
La cuenta gratuita de Claude admite un conector propio.
-->

---

## Skills, instrucciones que se cargan cuando hacen falta

Una carpeta con instrucciones, scripts y recursos. El agente ve la descripción al empezar y **carga el resto cuando la usa**.

El script de la demo, con sus reglas, podría quedar como una skill "partes-arch".

<!--
3 min · acumulado 1:27
Anthropic, Introducing Agent Skills (16 de octubre de 2025): "folders
that include instructions, scripts, and resources that Claude can load
when needed". Es un estándar abierto (agentskills.io).
La diferencia con CLAUDE.md: CLAUDE.md se carga siempre, en cada sesión;
una skill ocupa contexto solo cuando sirve. Una empresa puede tener
decenas de skills sin llenar la ventana.
-->

---

## Subagentes, una tarea aparte con su propio contexto

Corre con **su propia ventana de contexto**, su prompt de sistema, sus herramientas y sus permisos. Devuelve un resumen.

<!--
3 min · acumulado 1:30
Documentación de Claude Code: "runs in its own context window with a
custom system prompt, specific tool access, and independent permissions".
El prompt de sistema es el de ayer, en la sesión 3.
Para qué sirve: el contador de contexto de la traza. Si un subagente lee
los seis PDF y devuelve solo la tabla, la ventana del agente principal no
se llena de texto de PDF.
Cierre del bloque 6.
-->

---

<!-- _class: seccion -->

## Qué agentes hay, y para llevarse

Bloque 7 de 7 · **20 min**

<!--
0 min · acumulado 1:30
Arranca 1:30, termina 1:50.
-->

---

## Seis formas de usar un agente

- **Chat con herramientas**: corre código sobre tus archivos
- **Investigación**: lee decenas de páginas y te da un informe con fuentes
- **Navegador y computadora**: usa sitios y aplicaciones como vos
- **Terminal sobre una carpeta**: lee, escribe y ejecuta en tus archivos
- **Conectores**: lo enchufan a otros sistemas por MCP
- **Caja de arena**: una computadora descartable en la nube

<!--
3 min · acumulado 1:33
El orden es por forma de uso, que es lo que dura; las marcas cambian de un
mes a otro.
Ayer usaron la primera. Hoy vimos la cuarta en vivo, y la quinta en el
bloque 6. La tercera es la que más cerca está de tocar sistemas: sitios
con tu sesión iniciada. Mencionarlo sin alarma; es la puerta a la sesión
7.
-->

---

## Gratis, al 28 de septiembre

| Forma | Gratis | Pago o empresa |
| --- | --- | --- |
| Chat con herramientas | Claude, Gemini, ChatGPT (con límites) | Los mismos, con más cuota |
| Investigación | Gemini Deep Research, ChatGPT (pocas) | Claude Research |
| Navegador | ChatGPT Work, app de escritorio | Claude in Chrome, Copilot Autopilot |
| Terminal | Copilot CLI, Antigravity CLI | Claude Code, Codex CLI |
| Conectores | Claude, un conector propio | Más conectores |
| Caja de arena | Arena, modo agente | |

<!--
4 min · acumulado 1:37
La tabla completa, con un link por dato, está en la página. Envejece
rápido: decirlo.
Detalles por si preguntan: ChatGPT Work comparte la cuota con Codex, y en
la cuenta gratuita llega por la app de escritorio a medida que se
habilita. Claude in Chrome está en todos los planes pagos desde el 26 de
agosto de 2026. Microsoft anunció Autopilot el 25 de septiembre de 2026;
pasa a vista previa privada a fin de mes.
Arena puede compartir las conversaciones con los proveedores de los
modelos: ahí va solo dato público. En la sesión 6 usan una forma gratuita.
-->

---

<!-- _class: panel -->

## Ronda: cuál probarías primero

¿Cuál de las seis formas probarías en tu trabajo, y **para qué tarea**?

<!--
7 min · acumulado 1:44
Ronda por nombre, un minuto por persona. La tarea dicha en general, sin
datos de la empresa: "la terminal, para consolidar los partes diarios que
hoy armo a mano".
Escuchar dos cosas: quién elige terminal o conectores (tocan archivos y
sistemas de la empresa: ahí aparecen los permisos y sistemas) y quién
elige investigación (el chequeo es abrir las citas).
Apoyo: llama el orden y anota forma y tarea de cada uno. Sirve para el
caso de la empresa en la sesión 6.
-->

---

<!-- _class: cita -->

## Lo que no se deshace **lo aprueba una persona**

<!--
2 min · acumulado 1:46
Todo lo que hizo el agente de la demo se deshace: leyó PDF y escribió
archivos nuevos en salida/. Claude Code guarda una copia de cada archivo
antes de editarlo. Lo que toca otros sistemas (una base de datos, un
correo, una nominación) no tiene vuelta atrás, y mirar la salida llega
tarde.
Traer la columna "con permiso" de la ronda del bloque 4: casi todo lo que
pusieron ahí es de este tipo. Eso es la sesión 7.
-->

---

<!-- _class: acentos -->

## Para llevarse

- **Mirá el arnés**: qué herramientas tiene, qué permisos pide y dónde corre lo que ejecuta
- **Escribile las reglas**: un CLAUDE.md o AGENTS.md que cada sesión nueva lee al empezar
- **Empezá en manual**, sobre una copia de la carpeta; lo que no se deshace lo aprueba una persona

<!--
2 min · acumulado 1:48
Decirlas en palabras propias, sin leer. Son las tres de la página.
El quiz de la sesión 5, la traza y los JSON quedan en la página.
-->

---

## Después de la pausa, la sesión 6

- Un agente arma **en vivo** una herramienta sobre un dataset público: producción, mapa y perfiles
- Tu versión, con un agente gratuito
- El caso de tu empresa, en una página

<!--
2 min · acumulado 1:50
Adelanto de treinta segundos por punto. El agente de la sesión 6 es el
mismo Claude Code de la demo, con su propio archivo de instrucciones.
Apoyo: la hora de vuelta en el chat.
Cierre del bloque 7.
-->

---

<!-- _class: seccion -->

## Pausa · 10 min

A las 12:00 (10:00 en Ecuador y Colombia) sigue la **sesión 6**, con su propio deck. Dejá abierta la página de la sesión 6.

<!--
10 min · acumulado 2:00
Cerrar este deck y abrir el de la sesión 6. Cerrar la sesión de Claude
Code de ~/arch-demo y dejar lista la terminal para la carpeta de la sesión
6.
Apoyo: cronómetro de diez minutos a la vista y aviso a los dos minutos del
final; pegar en el chat el link de la página de la sesión 6.
-->
