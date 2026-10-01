import{j as e}from"./index-CHTNzI2b.js";import{N as o,E as r,C as l}from"./EscalaDeLosModelos-gtdxfjjq.js";import{R as i}from"./RagDemo-B6eU-buJ.js";import{A as t}from"./AgentTrace-C5pAo7-X.js";import"./useData-B87oy_ZF.js";import"./sampling-DXnahiR4.js";function s(n){const a={a:"a",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(a.p,{children:`Esta página junta en un solo recorrido lo que vimos el lunes y el martes, con los mismos gráficos,
para arrancar el día de agentes con todo a mano. Son cinco pasos: dónde queda un modelo de lenguaje
dentro de la IA, cómo funciona, qué límites tiene, cómo se trabaja alrededor de esos límites y qué
es un agente. Al final, qué hacemos hoy y mañana.`}),`
`,e.jsx(a.h2,{children:"1. Dónde quedan los LLM dentro de la IA"}),`
`,e.jsx(a.p,{children:`Un modelo grande de lenguaje (LLM, por su sigla en inglés) es la capa más chica de una serie de
capas anidadas. La inteligencia artificial contiene al aprendizaje automático, que contiene a las
redes profundas, que contienen a la IA generativa.`}),`
`,e.jsxs("figure",{className:"figura",children:[e.jsx("img",{src:"slides/img/capas.svg",alt:"Cuatro rectángulos anidados: inteligencia artificial contiene al aprendizaje automático, que contiene a las redes profundas, que contienen a la IA generativa. Cada capa lleva un ejemplo del petróleo: sistemas expertos que interpretan perfiles, un modelo que clasifica pozos, una red que lee perfiles o sísmica, un chatbot que redacta un informe."}),e.jsx("figcaption",{children:"Las capas de la IA, con un ejemplo del rubro en cada una."})]}),`
`,e.jsx(a.p,{children:`Durante décadas, cada modelo hizo una sola tarea: un clasificador de pozos clasificaba pozos. A eso
lo llamamos IA de propósito específico. Un LLM también hace una sola cosa, predecir la palabra
siguiente, pero para hacerla bien en cualquier texto aprende un poco de todo, y un mismo modelo
resume, traduce, programa y analiza una planilla. Es una IA de propósito general.`}),`
`,e.jsxs("figure",{className:"figura",children:[e.jsx("img",{src:"slides/img/estrecha-vs-general.svg",alt:"A la izquierda, cuatro modelos de propósito específico, uno por tarea; a la derecha, un modelo grande de lenguaje conectado a seis tareas."}),e.jsx("figcaption",{children:"Un modelo por tarea, o un modelo para muchas tareas."})]}),`
`,e.jsx(a.p,{children:`El camino tuvo cuatro eras: reglas escritas a mano, aprender de datos, redes profundas y modelos
generales. La segunda línea acerca la lupa a 2012–2026, donde está casi todo lo que usamos hoy.`}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/linea-de-tiempo.svg",alt:"Línea de tiempo de 1950 a 2026 con cuatro eras: reglas escritas a mano, aprender de datos, redes profundas y modelos generales."})}),`
`,e.jsxs("figure",{className:"figura",children:[e.jsx("img",{src:"slides/img/linea-de-tiempo-reciente.svg",alt:"Línea de tiempo de 2012 a 2026: AlexNet, AlphaGo, Transformer, GPT, GPT-2, GPT-3, InstructGPT, ChatGPT, LLaMA, GPT-4, Claude, o1, DeepSeek-R1, Claude Code, Claude Mythos y GPT-6 Astra."}),e.jsx("figcaption",{children:"De AlexNet a los modelos de 2026."})]}),`
`,e.jsx(a.p,{children:`Y hay tres maneras de aprender. Con etiquetas (supervisado), como los pozos que traen su tipo
declarado. Sin etiquetas (no supervisado), cuando el algoritmo arma grupos solo. Y la del LLM,
autosupervisado: el texto trae su propia respuesta, porque alcanza con tapar la palabra siguiente.`}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/tres-maneras.svg",alt:"Tres columnas: supervisado, con pozos que traen su tipo declarado; no supervisado, con puntos grises agrupados; autosupervisado, con una oración a la que se le tapa la palabra siguiente."})}),`
`,e.jsx(a.h2,{children:"2. Cómo funciona un LLM"}),`
`,e.jsx(a.p,{children:`El modelo lee tokens, pedazos de palabra, y hace una sola operación: calcula qué token es más
probable que venga después, elige uno, lo agrega al texto y repite. Todo lo que ves en un chatbot
sale de repetir ese paso miles de veces.`}),`
`,e.jsx(o,{sesion:2}),`
`,e.jsx(a.p,{children:`Se entrena en dos etapas de tamaños muy distintos. El preentrenamiento lee una fracción enorme de
todo lo escrito y aprende a predecir la palabra siguiente. El ajuste como asistente, mucho más
chico, le enseña a conversar, seguir instrucciones y negarse a lo que no corresponde.`}),`
`,e.jsxs("figure",{className:"figura",children:[e.jsx("img",{src:"slides/img/dos-etapas.svg",alt:"Un recuadro grande, el preentrenamiento, lleva con una flecha a uno mucho más chico, el ajuste como asistente."}),e.jsx("figcaption",{children:"Casi todo el cómputo va al preentrenamiento."})]}),`
`,e.jsx(a.p,{children:`Para predecir bien la palabra siguiente de un manual de perforación, de una demostración o de un
programa, el modelo tiene que aprender lo que dicen. Con suficiente escala, en los parámetros
queda comprimida buena parte del conocimiento escrito, y aparece algo más: la capacidad de
encadenar razonamientos. El gráfico muestra cuánto creció el cómputo de entrenamiento desde 1989.`}),`
`,e.jsx(r,{sesion:2}),`
`,e.jsx(a.p,{children:`Desde 2024 los modelos, además, piensan paso a paso antes de responder, y con más tiempo aciertan
más. Hoy compiten con los mejores del mundo en matemática y programación:`}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[`En julio de 2025, una versión de Gemini sacó 35 de 42 puntos en la Olimpíada Internacional de
Matemática, nivel de medalla de oro, corregido por los jueces de la olimpíada
(`,e.jsx(a.a,{href:"https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/",children:"Google DeepMind"}),")."]}),`
`,e.jsxs(a.li,{children:[`En septiembre de 2025, en la final mundial de programación universitaria (ICPC), resolvió 10 de
12 problemas, nivel oro, incluido uno que no resolvió ningún equipo humano
(`,e.jsx(a.a,{href:"https://deepmind.google/blog/gemini-achieves-gold-medal-level-at-the-international-collegiate-programming-contest-world-finals/",children:"Google DeepMind"}),")."]}),`
`,e.jsxs(a.li,{children:["Para agosto de 2026, según ",e.jsx(a.a,{href:"https://epoch.ai/latest/announcing-frontiermath-erdos",children:"Epoch AI"}),`,
la IA había resuelto entre 3 y 5 problemas abiertos de Erdős, preguntas de investigación que los
matemáticos no habían podido cerrar.`]}),`
`,e.jsxs(a.li,{children:["En mayo de 2026, ",e.jsx(a.a,{href:"https://metr.org/time-horizons/",children:"METR"}),` midió que el modelo más fuerte de
Anthropic completaba la mitad de las veces tareas que a un experto le llevan al menos 16 horas.`]}),`
`]}),`
`,e.jsx(a.p,{children:`Estas cifras describen lo mejor que logra cada modelo en condiciones medidas. En una tarea tuya,
con tus datos, el mismo modelo se puede equivocar en algo simple: el nivel alto en promedio no
garantiza cada respuesta.`}),`
`,e.jsx(a.h2,{children:"3. Lo que no puede: la ventana de contexto"}),`
`,e.jsxs(a.p,{children:[`Para elegir el próximo token, el modelo mira todo lo que tiene delante: tu pregunta, sus respuestas
anteriores, los documentos que pegaste. Ese conjunto es la `,e.jsx(a.strong,{children:"ventana de contexto"}),`, y tiene un
tamaño máximo. En septiembre de 2026, los modelos grandes de OpenAI y de Anthropic leen hasta un
millón de tokens, y la cuenta gratuita de Gemini, 32,000. Lo que no entra no existe para el modelo,
y el modelo tampoco sabe que se cayó.`]}),`
`,e.jsx(l,{sesion:2}),`
`,e.jsx(a.p,{children:`La otra mitad del límite: cuando termina el entrenamiento, el modelo queda fijo. Sabe lo que leyó
hasta esa fecha, y de ahí en adelante solo sabe lo que entra en el prompt. Tu manual de operaciones,
el parte de ayer o la normativa que salió el mes pasado existen para el modelo si viajan en el
prompt, y el prompt tiene que caber entero en la ventana.`}),`
`,e.jsxs("figure",{className:"figura",children:[e.jsx("img",{src:"slides/img/prompt.svg",alt:"Un recuadro grande, el prompt, que tiene que entrar entero en la ventana de contexto, con cuatro capas: el prompt de sistema, que escribe quien arma la aplicación y que no ves; tus instrucciones, las que dejás escritas en la configuración; la conversación, con el pedido anterior, la respuesta anterior y tu pedido de ahora; y los adjuntos. Una flecha lleva todo al modelo."}),e.jsx("figcaption",{children:"Todo lo que el modelo sabe de tu caso viaja en el prompt."})]}),`
`,e.jsxs(a.p,{children:[`Cuando le preguntás algo que no está ni en su entrenamiento ni en el prompt, el modelo hace lo único
que sabe hacer: completa con lo más plausible. Así sale una alucinación, con el mismo tono seguro
que una respuesta correcta. Las cuatro maneras de fallar están en la
`,e.jsx(a.a,{href:"#/sesion/2",children:"sesión 2"}),"."]}),`
`,e.jsx(a.h2,{children:"4. Cómo se trabaja con ese límite"}),`
`,e.jsx(a.h3,{children:"RAG: buscar, traer, responder"}),`
`,e.jsxs(a.p,{children:[`Para que el modelo responda sobre tus documentos, no hace falta reentrenarlo. Se busca el
fragmento que responde la pregunta, se lo pega arriba de la pregunta y el modelo responde con el
libro abierto. Se llama generación aumentada por recuperación (RAG, por su sigla en inglés), y es
lo que hace Gemini Notebook (antes NotebookLM) con el cuaderno de reservas de la
`,e.jsx(a.a,{href:"#/sesion/4",children:"sesión 4"}),"."]}),`
`,e.jsxs("figure",{className:"figura",children:[e.jsx("img",{src:"slides/img/rag.svg",alt:"Tres pasos. 1: tu pregunta se busca por significado entre los fragmentos de tus documentos. 2: se traen los dos más parecidos. 3: el prompt lleva las instrucciones, los dos fragmentos y tu pregunta, y el modelo responde con la cita al fragmento, que conviene abrir. Abajo, dos límites: si el buscador trae el fragmento equivocado, la respuesta sale mal y con cita; si la respuesta no está en los documentos, ninguna búsqueda la trae."}),e.jsx("figcaption",{children:"RAG en tres pasos, y sus dos límites."})]}),`
`,e.jsx(i,{sesion:4}),`
`,e.jsx(a.h3,{children:"Un agente administra su propia ventana"}),`
`,e.jsx(a.p,{children:`Un agente lee archivos, corre programas y mira los resultados, y cada una de esas cosas ocupa lugar
en la ventana. En una tarea larga se llena rápido. El programa que envuelve al modelo, el arnés,
tiene cinco maneras de administrarla, y las vemos funcionar hoy.`}),`
`,e.jsxs("figure",{className:"figura",children:[e.jsx("img",{src:"slides/img/contexto-agente.svg",alt:"Arriba, la ventana de contexto de un agente, ocupada por las instrucciones, las descripciones de las skills, el pedido y la conversación, y sobre todo los resultados de herramientas; queda una parte libre. Abajo, cinco técnicas: instrucciones por escrito en CLAUDE.md o AGENTS.md; skills, de las que entra solo la descripción hasta que hacen falta; subagentes, con su propia ventana, que devuelven solo el resumen; compactación, el arnés resume la conversación vieja cerca del límite; y el parte de turno, un archivo donde el agente anota lo que hizo y lo que falta."}),e.jsx("figcaption",{children:"La ventana se llena con lo que el agente lee; el arnés decide qué queda."})]}),`
`,e.jsx(a.h2,{children:"5. Qué es un agente"}),`
`,e.jsx(a.p,{children:`Un agente es un modelo de lenguaje metido en un loop, con permiso para usar herramientas. Piensa
qué le falta, pide una acción, mira el resultado y vuelve a pensar, hasta que puede responder.`}),`
`,e.jsx(a.p,{children:`Ayer lo viste trabajar en la terminal. Claude Code armó, por fases, un asistente de ingeniería de
reservorios sobre los datos públicos del campo Volve:`}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Formato estándar y adaptador."}),` Convirtió los datos crudos de Volve a un formato propio,
con validación y 13 tests. La acumulada de petróleo cerró a 1.3% de la que publica Sodir, el
registro petrolero noruego.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Cálculos de ingeniería."}),` Caudales, la relación agua-petróleo (RAP) contra la acumulada de
petróleo (Np), el gráfico de Chan y la declinación de Arps, en un informe HTML. Cada cálculo
se prueba contra datos inventados con resultado conocido, y esos tests atraparon tres errores
en el camino.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"App web."}),` Los mismos análisis en el navegador, con el pozo, la ventana de ajuste y el
límite económico elegibles. Las capturas de pantalla encontraron lo que los tests no ven,
como leyendas encima de los títulos.`]}),`
`]}),`
`,e.jsx(a.p,{children:`El agente trabajó con las reglas del proyecto escritas en un CLAUDE.md y dejó una nota por fase
con lo que hizo y lo que encontró: el parte de turno de la figura de arriba. Cada fase quedó en
su carpeta, así que se puede abrir y ver qué cambió de una a otra.`}),`
`,e.jsx(t,{sesion:5}),`
`,e.jsx(a.p,{children:`El modelo solo lee y escribe texto. Cuando necesita una herramienta, la pide, y quien la ejecuta
es el arnés, si hay permiso.`}),`
`,e.jsxs("figure",{className:"figura",children:[e.jsx("img",{src:"slides/img/tool-call.svg",alt:"Diagrama de secuencia con tres columnas, modelo, arnés y herramienta: el arnés manda el pedido y la lista de herramientas; el modelo pide una herramienta con tool_use; el arnés la ejecuta y recibe el dato; le devuelve el resultado al modelo con tool_result; el modelo responde en texto. Los pasos 2 a 4 se repiten."}),e.jsx("figcaption",{children:"El modelo pide, el arnés ejecuta."})]}),`
`,e.jsxs("figure",{className:"figura",children:[e.jsx("img",{src:"slides/img/arnes.svg",alt:"El arnés envuelve al modelo de lenguaje, que está en el centro con su loop: piensa, actúa, mira el resultado. Seis funciones adentro del arnés: herramientas, el loop, el contexto, los permisos, la memoria en archivos, y subagentes y conectores. Afuera, la persona, los archivos, los programas y otros sistemas."}),e.jsx("figcaption",{children:"El modelo en el centro y el arnés alrededor, con sus seis funciones."})]}),`
`,e.jsx(a.h2,{children:"Hoy y mañana: agentes sobre problemas reales"}),`
`,e.jsx(a.p,{children:`Lo que queda del curso es práctica con agentes. El objetivo es que puedas dar los primeros pasos
por tu cuenta, que conozcas los riesgos que trae darle a un programa permiso para actuar y que sepas
cómo mitigarlos.`}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Día"}),e.jsx(a.th,{children:"Sesión"}),e.jsx(a.th,{children:"Qué hacemos"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Hoy"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"#/sesion/5",children:"5. Cómo funciona un agente"})}),e.jsx(a.td,{children:"Herramientas, arnés y permisos; Claude Code en vivo sobre los partes de la ARCH"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Hoy"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"#/sesion/6",children:"6. Un agente arma el tablero de un campo"})}),e.jsx(a.td,{children:"Un tablero sobre los datos públicos de Volve, tu versión con un agente gratuito y el caso de tu empresa en una página"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Mañana"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"#/sesion/7",children:"7. Información, riesgos y política de uso"})}),e.jsx(a.td,{children:"Qué dato va a qué herramienta, cuánto verificar, dónde corre un agente y la política de uso para tu empresa"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Mañana"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"#/sesion/8",children:"8. El caso y el horizonte"})}),e.jsx(a.td,{children:"El caso de waterflooding de punta a punta, una hoja de ruta y hacia dónde va todo esto"})]})]})]}),`
`,e.jsxs(a.p,{children:[`Las alternativas para probar sin instalar nada están en
`,e.jsx(a.a,{href:"#/agentes-nube",children:"agentes en la nube"}),`, y las preguntas sobre PC corporativas con restricciones, en
`,e.jsx(a.a,{href:"#/preguntas",children:"preguntas"}),`. Lo que traen tNavigator, Petrel e INTERSECT está en
`,e.jsx(a.a,{href:"#/ia-reservorios",children:"IA en el software de reservorios"}),"."]}),`
`,e.jsx(a.h3,{children:"Para llevarse"}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Empezá por una tarea propia con datos públicos."}),` Un agente en un proyecto chico, con datos que
pueden salir de la empresa, es la manera más barata de aprender qué hace bien y dónde se rompe.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Verificá en proporción al costo del error."}),` Mirá los fragmentos que citó, los números que
calculó y los archivos que tocó antes de usar el resultado.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Dale permisos de a uno, y por escrito."}),` Lo que el agente puede leer, correr o borrar lo decidís
vos. Las reglas de la tarea van en un archivo que el agente lee al empezar.`]}),`
`]})]})}function h(n={}){const{wrapper:a}=n.components||{};return a?e.jsx(a,{...n,children:e.jsx(s,{...n})}):s(n)}export{h as default};
