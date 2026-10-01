import{j as e}from"./index-CHTNzI2b.js";import{A as o}from"./AgentTrace-C5pAo7-X.js";import{R as r,Q as l}from"./Recursos-daMYTd7r.js";import"./useData-B87oy_ZF.js";function s(n){const a={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(a.h2,{children:"Antes de la sesión (opcional)"}),`
`,e.jsxs(a.p,{children:[`No hace falta traer nada: todo lo de hoy pasa en vivo. Si tenés cinco minutos antes, la traza del
agente de esta página se recorre sola, paso a paso. Y si preferís leer en español, Anthropic
publica una guía de `,e.jsx(a.a,{href:"https://code.claude.com/docs/es/how-claude-code-works",children:"cómo funciona Claude Code"}),`
que recorre un ejemplo de seis pasos con herramientas. Lo de los días 1 y 2, con sus gráficos, está
junto en el `,e.jsx(a.a,{href:"#/repaso",children:"repaso"}),"."]}),`
`,e.jsx(r,{sesion:5}),`
`,e.jsx(a.h2,{children:"Ayer el chatbot ya usó herramientas"}),`
`,e.jsx(a.p,{children:`Ayer, en la sesión 3, le diste a Claude seis partes diarios de producción de la Agencia de
Regulación y Control de Hidrocarburos (ARCH) de Ecuador, en PDF, y te devolvió un Excel. En el
medio pasaron cosas que no escribiste vos. Leyó cada PDF, escribió un programa en Python, lo
corrió, miró qué salía, corrigió lo que no cerraba y armó el archivo. Cada una de esas acciones
fue una herramienta: el modelo la pidió y otro programa la ejecutó.`}),`
`,e.jsx(a.p,{children:`Hacer lo mismo todos los días, con el parte nuevo, es trabajo de un agente. Hoy vemos cómo funciona
por dentro: el loop, cómo se pide una herramienta, el programa que la ejecuta y los agentes que
trabajan en la terminal de tu computadora. Al final, un mapa de los agentes que hay.`}),`
`,e.jsx(a.h2,{children:"Un modelo en un loop, con herramientas"}),`
`,e.jsxs(a.p,{children:[`Un agente es un modelo de lenguaje metido en un loop, con permiso para usar herramientas. Piensa
qué le falta, pide una acción, mira el resultado y vuelve a pensar, hasta que puede responder.
Anthropic lo resume en una línea en
`,e.jsx(a.a,{href:"https://www.anthropic.com/engineering/building-effective-agents",children:"Building effective agents"}),`
(diciembre de 2024): modelos que usan herramientas según lo que les devuelve el entorno, en un
loop.`]}),`
`,e.jsxs(a.p,{children:[`Debajo está el mismo modelo que predice el próximo token, el de la sesión 2, con dos agregados.
Puede `,e.jsx(a.strong,{children:"pedir una acción"}),": correr un comando, leer un archivo, buscar en internet. Y puede ",e.jsx(a.strong,{children:`ver
lo que salió`}),`. Un chatbot sin herramientas que se equivoca no tiene cómo enterarse; un agente
recibe el error de vuelta y tiene la chance de corregirse.`]}),`
`,e.jsx(a.p,{children:`La misma nota separa dos cosas que en los anuncios se llaman igual. En un flujo fijo, una persona
escribió de antemano los pasos y el modelo cumple su parte en cada uno. En un agente, el modelo
decide el paso siguiente según lo que va viendo. Los dos sirven, y la recomendación de Anthropic es
empezar por lo más simple que resuelva el problema.`}),`
`,e.jsx(a.h3,{children:"La traza, paso a paso"}),`
`,e.jsx(a.p,{children:`Abajo hay una corrida de un agente sobre el Capítulo IV, reconstruida paso a paso. Le pidieron
cuál de los pozos de gas de Aguaragüe, en Salta, declinó más rápido en los últimos dos años. Cada
paso es una vuelta del loop: el modelo pide la terminal o Python, y el arnés, el programa que lo
rodea, corre el comando y le devuelve la salida.`}),`
`,e.jsx(a.p,{children:`El paso más interesante es el tercero. El agente filtra por el nombre del área, escribe
"AGUARAGUE" sin diéresis y le vuelven cero filas. Mirá qué hace con eso: va a buscar los valores
que existen de verdad en la columna, encuentra la diéresis, corrige y sigue. Fijate también en el
contador de contexto, que crece en cada vuelta, y en el final: la respuesta llega con dos
advertencias sobre lo que el agente no verificó.`}),`
`,e.jsx(o,{sesion:5}),`
`,e.jsx(a.h2,{children:"El modelo pide, el arnés ejecuta"}),`
`,e.jsxs(a.p,{children:[`Anthropic describe el uso de herramientas como un contrato entre la aplicación y el modelo
(`,e.jsx(a.a,{href:"https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works",children:"How tool use works"}),`).
La aplicación declara qué herramientas hay y qué datos reciben; el modelo decide cuándo usarlas. La
frase central es esta: "The model never executes anything on its own. It emits a structured
request, your code (or Anthropic's servers) runs the operation, and the result flows back into the
conversation." El modelo escribe un pedido con formato fijo, otro programa hace la operación, y el
resultado vuelve a la conversación.`]}),`
`,e.jsxs("figure",{className:"figura",children:[e.jsx("img",{src:"slides/img/tool-call.svg",alt:"Diagrama de secuencia con tres columnas: el modelo, el arnés y la herramienta. Uno: el arnés le manda al modelo tu pedido y la lista de herramientas. Dos: el modelo pide una herramienta con un bloque tool_use, con el nombre leer_parte_arch y la fecha 2026-09-15. Tres: el arnés la ejecuta, si hay permiso, y la herramienta le devuelve el dato. Cuatro: el arnés le devuelve el resultado al modelo en un bloque tool_result, con el total nacional. Cinco: el modelo responde en texto. Los pasos dos a cuatro se repiten mientras el modelo pida herramientas."}),e.jsx("figcaption",{children:"Una llamada a una herramienta, en cinco mensajes. El modelo solo escribe texto: el pedido del paso 2 y la respuesta del paso 5. Todo lo que se ejecuta pasa por el arnés."})]}),`
`,e.jsx(a.p,{children:`El contrato tiene tres piezas, y las tres se escriben en JSON (JavaScript Object Notation), el
formato de datos con llaves y comillas que usan casi todos los programas para intercambiar
información. Van con el ejemplo oficial de Anthropic: una herramienta que da el clima de una
ciudad.`}),`
`,e.jsx(a.h3,{children:"La definición: qué herramientas hay"}),`
`,e.jsxs(a.p,{children:[`Junto con tu pedido, el arnés le manda al modelo la lista de herramientas. Cada una lleva un
nombre, una descripción y un esquema de entrada (`,e.jsx(a.code,{children:"input_schema"}),") que dice qué datos recibe:"]}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-json",children:`{
  "name": "get_weather",
  "description": "Get the current weather for a given location.",
  "input_schema": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "City and state, e.g. San Francisco, CA"
      }
    },
    "required": ["location"]
  }
}
`})}),`
`,e.jsx(a.p,{children:`El modelo nunca ve el programa que hay detrás: "it only sees the schema you provided and the result
you returned". De la descripción depende que elija la herramienta cuando corresponde, así que se
escribe como para un colega nuevo, igual que un buen prompt de la sesión 3.`}),`
`,e.jsxs(a.h3,{children:["El pedido: ",e.jsx(a.code,{children:"tool_use"})]}),`
`,e.jsxs(a.p,{children:["Cuando el modelo necesita el dato, responde con un bloque ",e.jsx(a.code,{children:"tool_use"}),` que nombra la herramienta y
los datos de entrada, y ahí frena:`]}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-json",children:`{
  "type": "tool_use",
  "id": "toolu_01A09q90qw90lq917835lq9",
  "name": "get_weather",
  "input": { "location": "San Francisco, CA" }
}
`})}),`
`,e.jsxs(a.p,{children:["El ",e.jsx(a.code,{children:"id"})," sirve para emparejar después el resultado con este pedido. En la documentación, el ",e.jsx(a.code,{children:"input"}),`
de este ejemplo trae además una unidad (`,e.jsx(a.code,{children:'"unit": "celsius"'}),`) que la definición de arriba no
declara. La sacamos para que el pedido y la definición coincidan.`]}),`
`,e.jsxs(a.h3,{children:["El resultado: ",e.jsx(a.code,{children:"tool_result"})]}),`
`,e.jsxs(a.p,{children:[`El arnés lee el pedido, corre la herramienta y le manda la salida al modelo en un mensaje nuevo,
con un bloque `,e.jsx(a.code,{children:"tool_result"})," que repite el mismo ",e.jsx(a.code,{children:"id"}),":"]}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-json",children:`{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01A09q90qw90lq917835lq9",
      "content": "15 degrees"
    }
  ]
}
`})}),`
`,e.jsx(a.p,{children:"Con eso el modelo sigue: responde, o pide otra herramienta. Anthropic lo cuenta en cinco pasos:"}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsx(a.li,{children:"La aplicación manda la lista de herramientas y el mensaje de la persona."}),`
`,e.jsxs(a.li,{children:["El modelo responde con uno o más bloques ",e.jsx(a.code,{children:"tool_use"}),"."]}),`
`,e.jsxs(a.li,{children:["La aplicación ejecuta cada herramienta y arma los bloques ",e.jsx(a.code,{children:"tool_result"}),"."]}),`
`,e.jsx(a.li,{children:"Los manda de vuelta, con la conversación entera."}),`
`,e.jsx(a.li,{children:"Se repite desde el paso 2 mientras el modelo siga pidiendo herramientas."}),`
`]}),`
`,e.jsxs(a.p,{children:["Fijate en el rol del mensaje con el resultado: dice ",e.jsx(a.code,{children:"user"}),`, aunque no lo escribiste vos. Para el
modelo, lo que devuelve una herramienta es texto que entra a la conversación, igual que tu pedido.
Por eso un PDF o una página web con instrucciones escondidas puede desviar a un agente, y Anthropic
pide tratar ese contenido como no confiable
(`,e.jsx(a.a,{href:"https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls",children:"Handle tool calls"}),`).
Vuelve en la sesión 7.`]}),`
`,e.jsx(a.h3,{children:"El mismo contrato, con un parte de la ARCH"}),`
`,e.jsx(a.p,{children:`Esta herramienta la inventamos para el curso, y no existe en ningún producto. Sirve para ver las
tres piezas con un dato que ya conocés. La definición:`}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-json",children:`{
  "name": "leer_parte_arch",
  "description": "Lee el parte diario de producción de la ARCH publicado en una fecha y devuelve la producción de petróleo del día de operación, en barriles por día.",
  "input_schema": {
    "type": "object",
    "properties": {
      "fecha": {
        "type": "string",
        "description": "Fecha de publicación del parte, AAAA-MM-DD. Ejemplo: 2026-09-15"
      }
    },
    "required": ["fecha"]
  }
}
`})}),`
`,e.jsx(a.p,{children:"El pedido del modelo y la respuesta del arnés:"}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-json",children:`{
  "type": "tool_use",
  "id": "toolu_ejemplo_01",
  "name": "leer_parte_arch",
  "input": { "fecha": "2026-09-15" }
}
`})}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-json",children:`{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "tool_use_id": "toolu_ejemplo_01",
      "content": "Operación del 2026-09-14. Total nacional: 463812.77. EP Petroecuador: 366559.66. Compañías privadas: 97253.11."
    }
  ]
}
`})}),`
`,e.jsx(a.p,{children:`Los números son los del parte del 15 de septiembre de 2026, que informa la operación del 14. EP
Petroecuador más las privadas dan el total: 366,559.66 + 97,253.11 = 463,812.77 barriles por día.
Un agente con buenas instrucciones hace esa suma antes de responder, igual que la hoja de control
del Excel de ayer.`}),`
`,e.jsx(a.h3,{children:"Los otros proveedores usan el mismo contrato"}),`
`,e.jsxs(a.p,{children:[`OpenAI describe el uso de herramientas en cinco pasos casi iguales, y el tercero es "Execute code
on the application side with input from the tool call"
(`,e.jsx(a.a,{href:"https://developers.openai.com/api/docs/guides/function-calling",children:"Function calling"}),`). Google lo
dice en una línea: "The model doesn't execute the function itself"
(`,e.jsx(a.a,{href:"https://ai.google.dev/gemini-api/docs/function-calling",children:"Function calling con Gemini"}),`). Cambian
los nombres de los campos; el reparto de tareas es el mismo.`]}),`
`,e.jsx(a.p,{children:`Dónde corre la herramienta lo decide el arnés. En el chatbot gratuito de ayer, el código corrió en
una computadora aislada en la nube. En un agente de terminal, como el de la demo de hoy, corre en
tu computadora y sobre tus archivos.`}),`
`,e.jsx(a.h2,{children:"El arnés, el programa alrededor del modelo"}),`
`,e.jsxs(a.p,{children:[`El arnés es el programa que envuelve al modelo y lo convierte en agente. El glosario de Claude Code
lo define como "the tools, context management, and execution environment that turn a language
model into a capable coding agent", y agrega: "Claude Code is the harness; Claude is the model
inside it" (`,e.jsx(a.a,{href:"https://code.claude.com/docs/en/glossary",children:"Glossary"}),"). En inglés se dice ",e.jsx(a.em,{children:"harness"}),`, y
también lo vas a ver como `,e.jsx(a.em,{children:"scaffold"})," (andamio)."]}),`
`,e.jsxs("figure",{className:"figura",children:[e.jsx("img",{src:"slides/img/arnes.svg",alt:"Un recuadro grande, el arnés, envuelve al modelo de lenguaje, que está en el centro rodeado por un loop: piensa, actúa, mira el resultado. Dentro del arnés, seis funciones: herramientas, el loop, el contexto, los permisos, la memoria en archivos, y subagentes y conectores. Afuera, con flechas de ida y vuelta: la persona que pide y da permisos, los archivos, los programas y otros sistemas."}),e.jsx("figcaption",{children:"El modelo en el centro, el arnés alrededor con sus seis funciones, y afuera lo que el agente toca, con vos pidiendo y dando permisos."})]}),`
`,e.jsx(a.p,{children:"Las seis funciones, una por una:"}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Le da herramientas."}),` Leer y escribir archivos, correr código, buscar en internet, usar un
navegador. La lista que viaja en el paso 1 del diagrama la arma el arnés.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Corre el loop."}),` Le pasa tu pedido al modelo, ejecuta la herramienta que el modelo eligió, le
devuelve el resultado y repite hasta que el modelo da la tarea por terminada.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Decide qué entra al contexto."}),` La ventana de la sesión 2 se llena rápido en un agente. El
arnés resume la conversación vieja cuando se acerca al límite (Anthropic lo llama compactación)
y trae cada archivo recién cuando hace falta.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Pide permiso."}),` Define qué hace el agente solo y qué necesita tu visto bueno. Leer suele estar
permitido; borrar, mandar o instalar suelen pedir confirmación.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Guarda la memoria en archivos."}),` El modelo no recuerda nada de una sesión a otra. Lo que tiene
que saber lo lee de archivos de instrucciones, como CLAUDE.md o AGENTS.md.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Reparte y conecta."}),` Lanza subagentes para tareas acotadas y se conecta a otros sistemas. Las
dos cosas están más abajo, con las skills.`]}),`
`]}),`
`,e.jsx(a.h3,{children:"Trabaja por turnos, y deja un parte"}),`
`,e.jsxs(a.p,{children:[`Anthropic lo explica con una imagen que en un yacimiento se entiende sola. Es un proyecto atendido
por ingenieros que trabajan por turnos, donde cada uno llega sin memoria de lo que pasó en el turno
anterior (`,e.jsx(a.a,{href:"https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents",children:"Effective harnesses for long-running agents"}),`,
noviembre de 2025). Así trabaja un agente en una tarea larga, porque cada sesión nueva arranca en
blanco. La solución que describe es la de cualquier guardia bien llevada: un parte de avance que
el agente escribe al terminar y lee al empezar, una lista de lo que falta y el historial de
cambios.`]}),`
`,e.jsxs(a.p,{children:["De ahí sale una regla práctica: ",e.jsx(a.strong,{children:"a un agente se le enseña por escrito"}),`. Las reglas de tu tarea,
los nombres de las columnas, lo que ya se probó y no anduvo, todo eso vive en archivos que el arnés
le hace leer. Si mañana cambiás de modelo, esos archivos te siguen sirviendo.`]}),`
`,e.jsx(a.h3,{children:"Cuánto cambia el resultado con otro arnés"}),`
`,e.jsxs(a.p,{children:["Hay dos mediciones recientes. ",e.jsx(a.a,{href:"https://epoch.ai/gradient-updates/why-benchmarking-is-hard",children:"Epoch AI"}),`,
un instituto que mide el avance de estos sistemas, comparó el mismo modelo con arneses distintos en
SWE-bench Verified, un examen de tareas reales de programación. Cambiar solo el arnés movió el
resultado hasta 11% en GPT-5 y hasta 15% en Kimi K2 Thinking (diciembre de 2025).
`,e.jsx(a.a,{href:"https://metr.org/notes/2026-02-13-measuring-time-horizon-using-claude-code-and-codex/",children:"METR"}),`, otro
instituto de medición, probó en febrero de 2026 si Claude Code y Codex alargaban las tareas que un
modelo completa solo, frente a sus propios arneses de prueba, más simples. Concluyó que no hacen
una gran diferencia.`]}),`
`,e.jsxs(a.p,{children:["Las dos se leen juntas. El arnés decide sobre todo ",e.jsx(a.strong,{children:"qué puede hacer"}),` el agente: con qué
herramientas, con qué permisos y con qué memoria. La capacidad de fondo la pone el modelo, y
cambiar de arnés la mueve menos. El Claude gratuito que ayer corrió código en la nube y el Claude
Code de la demo de hoy usan la misma familia de modelos con otro arnés.`]}),`
`,e.jsx(a.h2,{children:"Un agente en la terminal"}),`
`,e.jsxs(a.p,{children:[`Una interfaz de línea de comandos (command-line interface, CLI) es un programa que se usa
escribiendo en una terminal, la ventana de texto donde se tipean comandos. Un agente de terminal
es un arnés que corre en tu computadora: lo abrís dentro de una carpeta y el modelo trabaja sobre
esos archivos. Según la `,e.jsx(a.a,{href:"https://code.claude.com/docs/en/how-claude-code-works",children:"documentación de Claude Code"}),`,
al correr `,e.jsx(a.code,{children:"claude"}),` en una carpeta el agente accede a sus archivos y subcarpetas, a la terminal
(cualquier comando que podrías correr vos) y al estado de git, el registro de versiones del
proyecto.`]}),`
`,e.jsx(a.h3,{children:"Cuáles se prueban gratis"}),`
`,e.jsx(a.p,{children:"Al 28 de septiembre de 2026, dos de estos cuatro se pueden probar sin pagar:"}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Agente de terminal"}),e.jsx(a.th,{children:"De quién"}),e.jsx(a.th,{children:"¿Gratis?"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Copilot CLI"}),e.jsx(a.td,{children:"GitHub"}),e.jsxs(a.td,{children:['Sí. "All plans include Copilot CLI" (',e.jsx(a.a,{href:"https://docs.github.com/en/copilot/get-started/plans",children:"planes"}),"), también el gratuito, con créditos limitados"]})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Antigravity CLI"}),e.jsx(a.td,{children:"Google"}),e.jsxs(a.td,{children:["Sí, con una cuenta personal de Google y una cuota que se renueva cada semana (",e.jsx(a.a,{href:"https://antigravity.google/docs/plans/",children:"planes"}),"). Desde el 18 de junio de 2026 ",e.jsx(a.a,{href:"https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/",children:"reemplaza a Gemini CLI"})," en las cuentas sin pago"]})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Claude Code"}),e.jsx(a.td,{children:"Anthropic"}),e.jsxs(a.td,{children:['No. Pide Pro o superior: "The free claude.ai plan does not include Claude Code access" (',e.jsx(a.a,{href:"https://code.claude.com/docs/en/setup",children:"instalación"}),")"]})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Codex CLI"}),e.jsx(a.td,{children:"OpenAI"}),e.jsxs(a.td,{children:["No. La terminal arranca en el plan Plus (",e.jsx(a.a,{href:"https://learn.chatgpt.com/docs/pricing",children:"precios"}),")"]})]})]})]}),`
`,e.jsx(a.p,{children:`Claude Code, Copilot CLI y Antigravity CLI se instalan con un comando en la terminal. La página de
instalación de Claude Code dice que en Windows no hace falta ser administrador; las de los otros
dos no lo mencionan. En una computadora de la empresa, consultá antes con sistemas: instalar un
programa que ejecuta comandos es una decisión de seguridad.`}),`
`,e.jsxs("details",{children:[e.jsx("summary",{children:"Para curiosos: los comandos de instalación"}),e.jsx(a.p,{children:`Copiados de la documentación de cada uno el 28 de septiembre de 2026. En cada par, la primera
línea es para macOS y Linux y la segunda para Windows (PowerShell); la de npm sirve en los tres.`}),e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-bash",children:`# Antigravity CLI (Google); se abre con el comando agy
curl -fsSL https://antigravity.google/cli/install.sh | bash
irm https://antigravity.google/cli/install.ps1 | iex

# Copilot CLI (GitHub); pide Node.js 22 o posterior
npm install -g @github/copilot
winget install GitHub.Copilot

# Claude Code (Anthropic); se abre con el comando claude
curl -fsSL https://claude.ai/install.sh | bash
irm https://claude.ai/install.ps1 | iex
`})})]}),`
`,e.jsx(a.h3,{children:"La carpeta y las herramientas de fábrica"}),`
`,e.jsxs(a.p,{children:[`Claude Code trae más de cuarenta herramientas de fábrica
(`,e.jsx(a.a,{href:"https://code.claude.com/docs/en/tools-reference",children:"Tools reference"}),`). Estas son las que vas a ver
en la demo, con la columna que más importa:`]}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Herramienta"}),e.jsx(a.th,{children:"Qué hace"}),e.jsx(a.th,{children:"¿Pide permiso?"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Read"}),e.jsx(a.td,{children:"Lee un archivo"}),e.jsx(a.td,{children:"No"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Glob, Grep"}),e.jsx(a.td,{children:"Busca archivos por nombre y texto adentro de los archivos"}),e.jsx(a.td,{children:"No"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Write, Edit"}),e.jsx(a.td,{children:"Crea un archivo, o cambia una parte de uno"}),e.jsx(a.td,{children:"Sí"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Bash"}),e.jsx(a.td,{children:"Corre un comando en la terminal: Python, un script, una instalación"}),e.jsx(a.td,{children:"Sí"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"WebFetch, WebSearch"}),e.jsx(a.td,{children:"Baja una página, o busca en internet"}),e.jsx(a.td,{children:"Sí"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"TodoWrite"}),e.jsx(a.td,{children:"Lleva la lista de tareas de la sesión"}),e.jsx(a.td,{children:"No"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Agent"}),e.jsx(a.td,{children:"Lanza un subagente"}),e.jsx(a.td,{children:"No"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Skill"}),e.jsx(a.td,{children:"Usa una skill"}),e.jsx(a.td,{children:"Sí"})]})]})]}),`
`,e.jsx(a.p,{children:`El patrón se repite en todos los agentes de terminal. Leer corre sin preguntar; escribir, ejecutar
y salir a internet pasan por un permiso.`}),`
`,e.jsx(a.h3,{children:"Los permisos"}),`
`,e.jsxs(a.p,{children:[`En Claude Code, el modo de permiso fija cuánto pregunta el agente
(`,e.jsx(a.a,{href:"https://code.claude.com/docs/en/permission-modes",children:"Permission modes"}),"):"]}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Manual."}),` Pregunta antes de editar archivos, correr comandos o salir a la red. Sin preguntar,
solo lee.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Aceptar ediciones"}),` (acceptEdits). Edita archivos y corre comandos comunes de carpetas sin
preguntar; para lo demás, pregunta.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Plan."})," Explora y propone un plan, sin tocar tus archivos."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Auto."}),` Un segundo modelo, un clasificador, revisa cada acción en tu lugar y bloquea las
riesgosas.`]}),`
`]}),`
`,e.jsx(a.p,{children:`Desde la versión 2.1.283, una sesión nueva en la terminal arranca en auto. Para ver los permisos,
en la demo arrancamos en manual. Encima de los modos van las reglas: cada herramienta, o cada
comando, puede estar permitida, preguntar o estar prohibida, y la prohibición gana en cualquier
modo. Aparte está el aislamiento (sandbox): el sistema operativo encierra los comandos de la
terminal dentro de las carpetas y la red que definas de antemano.`}),`
`,e.jsxs(a.p,{children:[`Los otros dos se parecen. Codex CLI trabaja en un aislamiento con tres niveles (solo lectura,
escritura en la carpeta del proyecto, acceso total) y arranca con la red apagada
(`,e.jsx(a.a,{href:"https://learn.chatgpt.com/docs/agent-approvals-security",children:"Agent approvals & security"}),`). Copilot
CLI permite o prohíbe herramientas una por una, y "deny rules always take precedence over allow
rules" (`,e.jsx(a.a,{href:"https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools",children:"Allowing and denying tool use"}),")."]}),`
`,e.jsx(a.h3,{children:"CLAUDE.md y AGENTS.md, las instrucciones por escrito"}),`
`,e.jsxs(a.p,{children:[`CLAUDE.md es un archivo de texto con instrucciones persistentes que Claude Code carga al empezar
cada sesión (`,e.jsx(a.a,{href:"https://code.claude.com/docs/en/glossary",children:"Glossary"}),`). AGENTS.md es lo mismo en un
formato abierto, "a README for agents" (`,e.jsx(a.a,{href:"https://agents.md/",children:"agents.md"}),`), que desde el 9 de
diciembre de 2025 administra la Agentic AI Foundation, de la Linux Foundation. Lo leen más de
veinte agentes, entre ellos Codex, Copilot y Gemini CLI. Claude Code lee AGENTS.md cuando la
carpeta no tiene CLAUDE.md.`]}),`
`,e.jsx(a.p,{children:"Es el parte de avance de la sección del arnés, hecho archivo. El de la demo entra en seis líneas:"}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-markdown",children:`# Partes diarios de la ARCH

- Cada PDF es un parte diario de producción de la ARCH de Ecuador, de una página.
- Los números usan punto de miles y coma decimal: 366.559,66 son 366559.66 barriles por día.
- Cada parte trae dos fechas: la de publicación y la de operación.
- No modifiques los PDF. Todo lo nuevo va en la carpeta salida/.
- Antes de terminar, compará la suma de las compañías con el total nacional de cada parte.
`})}),`
`,e.jsx(a.h3,{children:"En vivo: los seis partes, con Claude Code"}),`
`,e.jsx(a.p,{children:`En la sesión lo hacemos con Claude Code, con una cuenta paga del curso, sobre una carpeta con los
seis partes de ayer y ese CLAUDE.md. El pedido:`}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-text",children:`Armá un script en Python que lea los seis partes de esta carpeta y los
consolide en un Excel en salida/: producción por compañía y por día, el
total nacional, y una hoja de control que compare la suma de las
compañías con el total de cada parte. Que se pueda volver a correr
mañana con el parte nuevo. Probalo y contame qué no pudiste leer.
`})}),`
`,e.jsx(a.p,{children:`Mirá tres cosas mientras corre: qué herramienta pide en cada paso, cuándo frena a pedir permiso y
qué hace cuando un número no cierra. Lo que queda en la carpeta es un programa. Mañana se corre con
el parte nuevo, sin volver a explicar nada: ese es el salto del chatbot al agente.`}),`
`,e.jsxs(a.p,{children:[`Si tenés acceso a Copilot CLI o a Antigravity CLI, podés repetirlo. Bajá los seis partes
(`,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-08.pdf",children:"8"}),", ",e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-09.pdf",children:"9"}),`,
`,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-10.pdf",children:"10"}),", ",e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-11.pdf",children:"11"}),`,
`,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-14.pdf",children:"14"})," y ",e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-15.pdf",children:"15"}),`
de septiembre), ponelos en una carpeta nueva con esas instrucciones en un AGENTS.md y pegá el
pedido.`]}),`
`,e.jsx(a.h2,{children:"MCP, skills y subagentes"}),`
`,e.jsx(a.p,{children:"Tres piezas que agrandan a un agente sin cambiar el modelo. Las tres las carga el arnés."}),`
`,e.jsx(a.h3,{children:"MCP, un enchufe común para otros sistemas"}),`
`,e.jsxs(a.p,{children:[`El protocolo de contexto de modelo (Model Context Protocol, MCP) es "an open-source standard for
connecting AI applications to external systems"
(`,e.jsx(a.a,{href:"https://modelcontextprotocol.io/docs/getting-started/intro",children:"modelcontextprotocol.io"}),`): un
estándar abierto para conectar aplicaciones de IA con otros sistemas. Su documentación lo compara
con un puerto USB-C. Lo creó Anthropic, y desde diciembre de 2025 lo administra la Agentic AI
Foundation.`]}),`
`,e.jsxs(a.p,{children:[`Tiene tres partes. El host es la aplicación de IA, por ejemplo Claude Code. El servidor es el
programa que da acceso a un sistema, y ofrece herramientas (acciones que el agente puede pedir),
recursos (datos para leer) y prompts (plantillas). Entre los dos, un cliente por cada conexión
(`,e.jsx(a.a,{href:"https://modelcontextprotocol.io/docs/learn/architecture",children:"Architecture"}),`). Para el modelo, una
herramienta que llega por MCP se usa igual que una de fábrica: definición, pedido y resultado.`]}),`
`,e.jsx("div",{className:"callout",children:e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Un ejemplo del rubro."}),` OSDU (Open Subsurface Data Universe) es la plataforma abierta de datos de
subsuelo que define el OSDU Forum, de The Open Group. Hay un `,e.jsx(a.a,{href:"https://github.com/danielscholl-osdu/osdu-mcp-server",children:"servidor MCP para OSDU"}),`
que le da a un agente herramientas para buscar registros, leer esquemas y consultar el
almacenamiento. Es un proyecto de la comunidad, por fuera del OSDU Forum, y viene con la escritura
y el borrado apagados: cada uno se prende a propósito, con su propia variable de configuración.`]})}),`
`,e.jsx(a.h3,{children:"Skills, instrucciones que se cargan cuando hacen falta"}),`
`,e.jsxs(a.p,{children:[`Una skill (habilidad) es una carpeta con "instructions, scripts, and resources that Claude can load
when needed" (`,e.jsx(a.a,{href:"https://claude.com/blog/skills",children:"Introducing Agent Skills"}),`, 16 de octubre de 2025).
Al empezar, el agente ve solo la descripción de cada skill, y el contenido entero se carga cuando
lo usa. Así no ocupa la ventana de contexto hasta que sirve. Es un estándar abierto
(`,e.jsx(a.a,{href:"https://agentskills.io",children:"agentskills.io"}),`). El script de la demo, con las reglas de lectura de los
partes, podría quedar guardado como una skill "partes-arch" para la próxima vez.`]}),`
`,e.jsx(a.h3,{children:"Subagentes, una tarea aparte con su propio contexto"}),`
`,e.jsxs(a.p,{children:[`Un subagente "runs in its own context window with a custom system prompt, specific tool access,
and independent permissions" (`,e.jsx(a.a,{href:"https://code.claude.com/docs/en/sub-agents",children:"Subagents"}),`): corre con
su propia ventana de contexto, su propio prompt de sistema (el de la sesión 3), sus herramientas y
sus permisos. Hace una tarea delegada y le devuelve un resumen al agente principal. Sirve para que
la lectura de los seis PDF, por ejemplo, no llene la ventana del agente que después arma el Excel.`]}),`
`,e.jsx(a.h2,{children:"Qué agentes hay, por forma de uso"}),`
`,e.jsx(a.p,{children:`Los agentes de hoy se ordenan mejor por cómo se usan que por la marca. La foto es del 28 de
septiembre de 2026 y envejece rápido: los nombres y los planes cambian de un mes a otro.`}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Forma de uso"}),e.jsx(a.th,{children:"Qué hace"}),e.jsx(a.th,{children:"Gratis hoy"}),e.jsx(a.th,{children:"Con plan pago o de empresa"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Chat con herramientas"}),e.jsx(a.td,{children:"Corre código sobre tus archivos y devuelve planillas, documentos y gráficos"}),e.jsxs(a.td,{children:["Claude (",e.jsx(a.a,{href:"https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude",children:"código y archivos"}),"), Gemini, ChatGPT (con límites)"]}),e.jsx(a.td,{children:"Los mismos, con más cuota"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Investigación"}),e.jsx(a.td,{children:"Arma un plan, lee decenas de páginas y entrega un informe con fuentes"}),e.jsx(a.td,{children:"Gemini Deep Research, ChatGPT deep research (pocas por mes)"}),e.jsx(a.td,{children:"Claude Research"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Navegador y computadora"}),e.jsx(a.td,{children:"Usa sitios y aplicaciones como lo harías vos"}),e.jsxs(a.td,{children:["ChatGPT Work, en la app de escritorio, a medida que se habilita (",e.jsx(a.a,{href:"https://learn.chatgpt.com/docs/pricing",children:"precios"}),")"]}),e.jsxs(a.td,{children:[e.jsx(a.a,{href:"https://claude.com/blog/claude-in-chrome-generally-available",children:"Claude in Chrome"}),", Microsoft Copilot Autopilot (",e.jsx(a.a,{href:"https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/",children:"vista previa privada"}),")"]})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Terminal sobre una carpeta"}),e.jsx(a.td,{children:"Lee, escribe y ejecuta sobre los archivos de una carpeta"}),e.jsx(a.td,{children:"Copilot CLI, Antigravity CLI"}),e.jsx(a.td,{children:"Claude Code, Codex CLI"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Conectores"}),e.jsx(a.td,{children:"Conecta el agente con otros sistemas por MCP"}),e.jsxs(a.td,{children:["Claude, ",e.jsx(a.a,{href:"https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp",children:"un conector propio"})]}),e.jsx(a.td,{children:"Más conectores"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Caja de arena"}),e.jsx(a.td,{children:"Un agente en una computadora descartable en la nube"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://arena.ai/agent",children:"Arena, modo agente"})}),e.jsx(a.td,{})]})]})]}),`
`,e.jsx(a.p,{children:`Arena puede compartir las conversaciones con los proveedores de los modelos, así que ahí va solo
dato público. En la sesión 6 vas a usar una de estas formas gratuitas sobre un dataset público.`}),`
`,e.jsx(a.h2,{children:"Para llevarse"}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsx(a.li,{children:`Antes de darle una tarea a un agente, mirá su arnés: qué herramientas tiene, qué permisos pide y
dónde corre lo que ejecuta.`}),`
`,e.jsx(a.li,{children:`Escribí las reglas de la tarea en un CLAUDE.md o un AGENTS.md. La próxima sesión arranca sin
memoria y las lee de ahí.`}),`
`,e.jsx(a.li,{children:`Empezá en modo manual y sobre una copia de la carpeta. Lo que no se deshace lo aprueba una
persona.`}),`
`]}),`
`,e.jsx(a.h2,{children:"En la sesión en vivo (2 h)"}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Bloque"}),e.jsx(a.th,{children:"Tiempo"}),e.jsx(a.th,{children:"Qué hacemos"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Apertura"}),e.jsx(a.td,{children:"8 min"}),e.jsx(a.td,{children:"De ayer a hoy: el chatbot que consolidó los partes ya usó herramientas"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"El loop"}),e.jsx(a.td,{children:"12 min"}),e.jsx(a.td,{children:"Modelo, herramientas y loop, con la traza de un agente paso a paso"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Cómo usa una herramienta"}),e.jsx(a.td,{children:"20 min"}),e.jsx(a.td,{children:"La definición, el pedido y el resultado, en JSON de verdad; el modelo pide y el arnés ejecuta"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"El arnés"}),e.jsx(a.td,{children:"15 min"}),e.jsx(a.td,{children:"Las seis funciones, los permisos y la memoria en archivos; cuánto pesa en el resultado"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Los CLI: un agente en la terminal"}),e.jsx(a.td,{children:"25 min"}),e.jsx(a.td,{children:"Qué es, cómo se instala, la carpeta, los permisos, las herramientas de fábrica, CLAUDE.md y AGENTS.md; Claude Code en vivo sobre los seis partes de la ARCH"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"MCP, skills y subagentes"}),e.jsx(a.td,{children:"10 min"}),e.jsx(a.td,{children:"Tres piezas que agrandan al agente, una definición cada una"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Qué agentes hay, y para llevarse"}),e.jsx(a.td,{children:"20 min"}),e.jsx(a.td,{children:"El mapa por forma de uso y tres prácticas"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Pausa"}),e.jsx(a.td,{children:"10 min"}),e.jsx(a.td,{children:"A las 12:00 (10:00 en Ecuador y Colombia) sigue la sesión 6"})]})]})]}),`
`,e.jsx(a.p,{children:`Las preguntas a la sala van por el chat de la videollamada. Todo lo que ves en esta sesión usa
datos públicos: el Capítulo IV de Argentina y los partes de la ARCH de Ecuador.`}),`
`,e.jsx(l,{data:"quiz_s5",sesion:5})]})}function u(n={}){const{wrapper:a}=n.components||{};return a?e.jsx(a,{...n,children:e.jsx(s,{...n})}):s(n)}export{u as default};
