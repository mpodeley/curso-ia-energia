import{j as e}from"./index-CHTNzI2b.js";function a(n){const s={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...n.components};return e.jsxs(e.Fragment,{children:[e.jsxs(s.p,{children:[`La segunda pregunta de la cohorte de septiembre mira al software de todos los días: qué
inteligencia artificial (IA) traen tNavigator, Petrel e INTERSECT, y cómo se conecta con lo que
vimos en el curso. La primera, cómo usar un agente en la PC de la empresa, está en la
`,e.jsx(s.a,{href:"#/preguntas",children:"página de preguntas"}),"."]}),`
`,e.jsx("div",{className:"callout",children:e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Foto del 29 de septiembre de 2026."}),` Cada dato lleva su fuente, y estos productos cambian de
versión cada trimestre. Antes de decidir algo con esto, abrí el link y fijate la fecha.`]})}),`
`,e.jsx(s.p,{children:"Los tres traen IA, y de tres clases distintas. Conviene separarlas porque se evalúan distinto:"}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/preguntas-ia-simuladores.svg",alt:"Tres capas. Capa 1, un asistente que conversa, un modelo de lenguaje dentro del programa: tNavigator AI Assistant, Petrel AI Assistant y Tela, ENVOY de Stone Ridge. Capa 2, aprendizaje automático sobre el modelo: history matching asistido y proxies de tNavigator, Petrel ML, CMOST-AI y Techlog AI Log Prediction. Capa 3, una puerta para tu agente, API de Python y servidores MCP: tNavigator, Python Tool Pro para Petrel, OPM Flow con ResInsight. Una flecha va de tu agente a la capa 3."})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"El asistente que conversa"}),` es un modelo de lenguaje (large language model, LLM) adentro del
programa, con el arnés que armó el fabricante. Es lo de las sesiones 2 y 5, con las mismas
alucinaciones posibles.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"El aprendizaje automático"}),` (machine learning, ML) sobre el modelo existe hace años: redes
entrenadas con corridas del simulador, o con datos de pozo. Es el aprendizaje supervisado de la
sesión 1.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"La puerta para tu agente"}),` es una interfaz de programación (application programming
interface, API) en Python, o un servidor MCP. Con eso, un agente como Claude Code, Copilot o
Codex maneja el programa desde afuera, con tus permisos y tu AGENTS.md. Es lo de las sesiones 5
y 6.`]}),`
`]}),`
`,e.jsx(s.h2,{children:"tNavigator"}),`
`,e.jsx(s.p,{children:`tNavigator, de Rock Flow Dynamics, es el que más movió su asistente en el último año. Las notas de
versión, una por trimestre, muestran el recorrido:`}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/preguntas-tnavigator.svg",alt:"Línea de tiempo. 25.2, julio de 2025: AI Assistant en servidor local, genera código Python. 25.3, octubre de 2025: voz, links a la documentación, AI Server en Windows. 25.4, enero de 2026: asistente desde el navegador en la red interna. 26.1, abril de 2026: conecta modelos de lenguaje externos por el protocolo de OpenAI y soporta MCP. 26.2, julio de 2026: servidor MCP local, modo multiagente, lectura de logs de simulación, flash acelerado con aprendizaje automático."})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"25.2"}),` (julio de 2025): AI Assistant instalable en un servidor de la red local, con
generación interactiva de código Python (`,e.jsx(s.a,{href:"https://rfdyn.com/tnavigator-25-2-key-updates-now-available/",children:"notas"}),")."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"25.3"}),` (octubre de 2025): entrada por voz, links a la documentación, AI Server en Windows
(`,e.jsx(s.a,{href:"https://rfdyn.com/tnavigator-25-3-key-updates-now-available/",children:"notas"}),")."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"25.4"})," (enero de 2026): el asistente, desde el navegador (",e.jsx(s.a,{href:"https://www.rfdyn.com/tnavigator-25-4-key-updates-now-available/",children:"notas"}),")."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"26.1"}),` (abril de 2026): el AI Server se conecta a modelos de lenguaje de terceros "via the
OpenAI protocol", y aparece MCP (`,e.jsx(s.a,{href:"https://rfdyn.com/tnavigator-26-1-advancing-integrated-modelling-and-ai-capabilities/",children:"notas"}),")."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"26.2"}),` (julio de 2026): un servidor MCP local para que aplicaciones de IA de terceros busquen
en la documentación y manejen proyectos con funciones de la API; un modo multiagente; análisis
de los logs de simulación para encontrar la causa de errores y advertencias; aprendizaje
automático para acelerar el equilibrio líquido-vapor en corridas composicionales
(`,e.jsx(s.a,{href:"https://www.rfdyn.eu/tnavigator-26-2-accelerating-the-digital-energy-workflow-with-ai-petrophysics-and-advanced-simulation/",children:"notas"}),")."]}),`
`]}),`
`,e.jsxs(s.p,{children:[`El servidor MCP de 26.2 es el enchufe de la sesión 5, del lado del simulador. Con él, un agente
de terminal puede consultar la documentación de tNavigator y operar un proyecto por la API, en el
mismo loop de pensar, actuar y mirar el resultado. Además, tNavigator tiene hace años su API de
Python y el módulo de ajuste histórico asistido e incertidumbre (assisted history matching, AHM),
que entrena proxies con redes neuronales (`,e.jsx(s.a,{href:"https://rfdyn.com/industries/machine-learning-ai/",children:"IA y ML en tNavigator"}),")."]}),`
`,e.jsx("div",{className:"callout",children:e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Lo que no se sabe."}),` Todo lo anterior sale de las notas de versión del fabricante. No
encontramos una evaluación independiente de cuánto acierta el asistente. Tampoco dice qué modelo
de lenguaje usa por defecto; desde 26.1 se le puede conectar uno externo. Antes de usarlo con un
modelo de la empresa, preguntá a sistemas qué versión tienen, si el AI Server está instalado y a
qué modelo apunta.`]})}),`
`,e.jsx(s.h2,{children:"Petrel, Delfi y Lumi"}),`
`,e.jsx(s.p,{children:"SLB tiene las tres capas, repartidas en varios productos:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Aprendizaje automático en Petrel."}),` Predicción de fallas y horizontes con redes que entrena
el usuario, y modelado de propiedades con ML
(`,e.jsx(s.a,{href:"https://www.slb.com/products-and-services/delivering-digital-at-scale/subsurface/machine-learning",children:"Petrel ML"}),")."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Petrel AI Assistant."}),` Ayuda conversacional, consultas a los datos del proyecto y
visualizaciones armadas desde un pedido (`,e.jsx(s.a,{href:"https://www.slb.com/videos/petrel-ai-assistant",children:"video de SLB"}),")."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Tela."}),` Un asistente agéntico presentado en ADIPEC, en noviembre de 2025. Sigue "a common
five-step agentic AI loop: observe, plan, generate, act, and learn"
(`,e.jsx(s.a,{href:"https://jpt.spe.org/slb-unveils-agentic-ai-for-upstream-workflows",children:"JPT"}),`), que es el loop del
arnés de la sesión 5 con otros nombres (`,e.jsx(s.a,{href:"https://www.slb.com/newsroom/press-release/2025/pr-2025-1103-slb-tela-ai",children:"comunicado"}),")."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Lumi."}),` La plataforma de datos e IA donde corren Tela y los modelos de SLB, en la nube o en
los servidores de la empresa (`,e.jsx(s.a,{href:"https://worldoil.com/news/2024/9/17/slb-accelerates-digital-transformation-with-lumi-data-and-ai-platform-launch/",children:"World Oil, 2024"}),`).
SLB la desarrolla con NVIDIA (`,e.jsx(s.a,{href:"https://worldoil.com/news/2026/3/25/slb-nvidia-expand-partnership-to-deploy-ai-infrastructure-for-energy-industry",children:"World Oil, 2026"}),`)
y con Shell (`,e.jsx(s.a,{href:"https://www.worldoil.com/news/2025/12/11/slb-shell-partner-to-accelerate-digital-and-ai-solutions-in-upstream-operations",children:"World Oil, 2025"}),")."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Python."})," Petrel se programa en C# con Ocean (",e.jsx(s.a,{href:"https://www.ocean.slb.com/en/developer/petrel",children:"Ocean"}),`),
y en Python con Python Tool Pro, de Cegal, que SLB revende: desde un entorno de Python externo
se leen y escriben objetos de Petrel
(`,e.jsx(s.a,{href:"https://www.cegal.com/en/software/data-science-and-cegal-prizm/cegal-python-tool-pro",children:"Cegal"}),`).
Techlog tiene su propio Python y una predicción de perfiles con un modelo entrenado en más de
18,000 pozos públicos (`,e.jsx(s.a,{href:"https://www.slb.com/products-and-services/delivering-digital-at-scale/software/techlog-wellbore-software/techlog-features",children:"Techlog"}),")."]}),`
`]}),`
`,e.jsx(s.p,{children:`Python Tool Pro es la puerta de la capa 3: un agente de terminal escribe y corre el script de
Python que habla con Petrel, igual que en la sesión 6 escribió el que leía los perfiles de Volve.`}),`
`,e.jsx(s.h2,{children:"INTERSECT"}),`
`,e.jsx(s.p,{children:`INTERSECT, el simulador de alta resolución de SLB, es el que menos IA pública tiene de los tres.
Lo que se puede citar:`}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[`Corre en procesadores gráficos (graphics processing unit, GPU) en Windows desde la versión
2024.3 (`,e.jsx(s.a,{href:"https://www.software.slb.com/software-news/support-news/intersect/intersect-2024-3",children:"notas"}),`),
y en varias GPU a la vez desde la 2025.4 (`,e.jsx(s.a,{href:"https://www.software.slb.com/software-news/support-news/intersect/intersect-2025-4",children:"notas"}),")."]}),`
`,e.jsxs(s.li,{children:[`Corre en la nube de Delfi, junto con ECLIPSE y VISAGE
(`,e.jsx(s.a,{href:"https://www.slb.com/products-and-services/delivering-digital-at-scale/software/delfi/delfi-solutions/delfi-on-demand-reservoir-simulation",children:"On Demand Reservoir Simulation"}),")."]}),`
`,e.jsx(s.li,{children:`El manejo de campo (field management) se programa en Python. La documentación está detrás del
login de SLB, así que no hay página pública para citar.`}),`
`]}),`
`,e.jsx("div",{className:"callout",children:e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Lo que no se sabe de INTERSECT."}),` No encontramos una descripción pública de funciones de
aprendizaje automático en INTERSECT, ni un asistente conversacional propio, ni un producto que
reemplace corridas con un proxy, ni una confirmación de que Tela opere corridas de INTERSECT.
Si alguien de SLB se lo ofrece a tu empresa, pedí la demo sobre un modelo propio.`]})}),`
`,e.jsx(s.h2,{children:"El resto del mercado, en una tabla"}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Producto"}),e.jsx(s.th,{children:"Asistente que conversa"}),e.jsx(s.th,{children:"Aprendizaje automático"}),e.jsx(s.th,{children:"Puerta para un agente"}),e.jsx(s.th,{children:"Fuente"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"tNavigator"}),e.jsx(s.td,{children:"Sí, local; desde 26.1 acepta modelos externos"}),e.jsx(s.td,{children:"AHM con proxies, flash con ML"}),e.jsx(s.td,{children:"API de Python, servidor MCP (26.2)"}),e.jsx(s.td,{children:e.jsx(s.a,{href:"https://rfdyn.com/industries/machine-learning-ai/",children:"RFD"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Petrel"}),e.jsx(s.td,{children:"Petrel AI Assistant, Tela"}),e.jsx(s.td,{children:"Fallas, horizontes, propiedades"}),e.jsx(s.td,{children:"Python Tool Pro, Ocean (C#)"}),e.jsx(s.td,{children:e.jsx(s.a,{href:"https://www.cegal.com/en/software/data-science-and-cegal-prizm/cegal-python-tool-pro",children:"Cegal"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"INTERSECT"}),e.jsx(s.td,{children:"No encontrado"}),e.jsx(s.td,{children:"Sin detalle público"}),e.jsx(s.td,{children:"Python para manejo de campo"}),e.jsx(s.td,{children:e.jsx(s.a,{href:"https://www.software.slb.com/software-news/support-news/intersect/intersect-2024-3",children:"SLB"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"CMG (CMOST-AI)"}),e.jsx(s.td,{children:"No encontrado"}),e.jsx(s.td,{children:"Ajuste histórico y optimización con ML"}),e.jsx(s.td,{children:"Sin detalle público"}),e.jsx(s.td,{children:e.jsx(s.a,{href:"https://www.cmgl.ca/solutions/software/cmost/",children:"CMG"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Halliburton DecisionSpace 365"}),e.jsx(s.td,{children:"Prueba de concepto con Claude en Amazon Bedrock, para sísmica"}),e.jsx(s.td,{children:"Modelos de ML integrados"}),e.jsx(s.td,{children:"Sin detalle público"}),e.jsxs(s.td,{children:[e.jsx(s.a,{href:"https://aws.amazon.com/blogs/machine-learning/halliburton-enhances-seismic-workflow-creation-with-amazon-bedrock-and-generative-ai/",children:"AWS"}),", ",e.jsx(s.a,{href:"https://www.halliburton.com/en/software/decisionspace-365-enterprise",children:"Halliburton"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Stone Ridge ECHELON"}),e.jsx(s.td,{children:"ENVOY, prototipo con Claude en Amazon Bedrock"}),e.jsx(s.td,{children:"No encontrado"}),e.jsx(s.td,{children:"Archivos de entrada en texto"}),e.jsx(s.td,{children:e.jsx(s.a,{href:"https://stoneridgetechnology.com/company/blog/envoy-an-ai-assistant-for-reservoir-simulation/",children:"Stone Ridge"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"OPM Flow + ResInsight (abiertos)"}),e.jsx(s.td,{children:"No"}),e.jsx(s.td,{children:"No, de fábrica"}),e.jsxs(s.td,{children:["Paquete ",e.jsx(s.code,{children:"opm"})," de Python, API de ResInsight, un servidor MCP de la comunidad"]}),e.jsxs(s.td,{children:[e.jsx(s.a,{href:"https://pypi.org/project/opm/",children:"OPM"}),", ",e.jsx(s.a,{href:"https://github.com/hnil/resinsight-mcp",children:"resinsight-mcp"})]})]})]})]}),`
`,e.jsx(s.p,{children:`OPM Flow es un simulador abierto que lee archivos en formato ECLIPSE. Con ResInsight y su
servidor MCP comunitario, se puede probar la capa 3 completa sobre un modelo público, sin licencias
y sin datos de la empresa.`}),`
`,e.jsx(s.h2,{children:"Cómo funciona un proxy del simulador"}),`
`,e.jsx(s.p,{children:`La capa 2 es la más vieja y la que más se usa en ajuste histórico. Un proxy es un modelo de
aprendizaje supervisado entrenado con corridas del simulador:`}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/preguntas-proxy.svg",alt:"Cinco pasos: parámetros inciertos; cientos de corridas del simulador, horas cada una; una tabla de ejemplos de entrada y salida; un proxy entrenado que responde en segundos; miles de preguntas para ajuste histórico, P10, P50 y P90 y optimización. Una flecha punteada vuelve al simulador para confirmar los casos que importan. Dos avisos: el costo está en las corridas de entrenamiento, y fuera de rango el proxy se equivoca sin avisar."})}),`
`,e.jsx(s.p,{children:`Es el mismo mecanismo de la sesión 1: ejemplos con respuesta, un modelo que aprende la relación y
un error que se mide con datos que el modelo no vio. Y vale lo que dice la sesión 8: la simulación
sigue siendo trabajo de reservoristas. El proxy acelera la exploración, y el caso que se lleva a
una decisión se corre en el simulador.`}),`
`,e.jsxs("details",{children:[e.jsx("summary",{children:"Para curiosos: qué está haciendo la investigación"}),e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Operadores neuronales."}),` U-FNO predijo la migración de CO₂ unas 10,000 veces más rápido que
el simulador en los casos de prueba de sus autores (`,e.jsx(s.a,{href:"https://arxiv.org/abs/2109.03697",children:"Wen y otros, 2022"}),`).
La versión anidada llegó a escala de cuenca (`,e.jsx(s.a,{href:"https://arxiv.org/abs/2210.17051",children:"Wen y otros, 2023"}),")."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Redes sobre grafos,"}),` para grillas irregulares y optimización de pozos
(`,e.jsx(s.a,{href:"https://arxiv.org/abs/2312.08625",children:"Stanford, 2024"}),")."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"NVIDIA PhysicsNeMo"}),` trae un ejemplo entrenado con corridas de OPM Flow sobre Norne, un campo
público. Su documentación reconoce que los errores "accumulate over time"
(`,e.jsx(s.a,{href:"https://docs.nvidia.com/physicsnemo/26.08/physicsnemo/examples/reservoir_simulation/xmgn/README.html",children:"ejemplo"}),")."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Agentes que arman modelos."}),` JutulGPT, de SINTEF, es un agente que construye modelos de
simulación en JutulDarcy, los corre y los valida en un loop, y marca las ambigüedades del pedido
(`,e.jsx(s.a,{href:"https://arxiv.org/abs/2603.00214",children:"Lie y otros, 2026"}),`). En ADIPEC 2025 hubo varios trabajos de
agentes sobre simuladores, por ejemplo uno con 18 herramientas y búsqueda en documentos
(`,e.jsx(s.a,{href:"https://onepetro.org/SPEADIP/proceedings-abstract/25ADIP/25ADIP/D021S069R002/793001",children:"SPE-229646-MS"}),")."]}),`
`]}),e.jsx(s.p,{children:`Las velocidades de estos papers se miden después de entrenar y sobre los casos de sus autores. El
costo de las corridas de entrenamiento queda afuera de la cuenta.`})]}),`
`,e.jsx(s.h2,{children:"Qué se puede hacer el lunes"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Preguntar qué hay."}),` Qué versión de tNavigator o de Petrel tiene la empresa, si el AI
Assistant o Tela están licenciados, y a qué modelo de lenguaje apuntan.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Probar la capa 3 con dato público."}),` Un agente de terminal, OPM Flow y ResInsight, sobre
Norne o Volve. El AGENTS.md de la sesión 5 se adapta con tres líneas: qué modelo es, qué no se
toca y cómo se valida el resultado.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Si tienen tNavigator 26.2 o posterior,"}),` pedirle a sistemas que evalúe el servidor MCP local
con el agente que ya contrató la empresa.`]}),`
`]}),`
`,e.jsx(s.h2,{children:"Fuentes"}),`
`,e.jsx(s.p,{children:`Todas abiertas y revisadas el 29 de septiembre de 2026. Las de fabricantes cuentan lo que el
fabricante afirma.`}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Rock Flow Dynamics: ",e.jsx(s.a,{href:"https://rfdyn.com/industries/machine-learning-ai/",children:"IA y ML en tNavigator"})," · ",e.jsx(s.a,{href:"https://rfdyn.com/tnavigator-25-2-key-updates-now-available/",children:"25.2"})," · ",e.jsx(s.a,{href:"https://rfdyn.com/tnavigator-25-3-key-updates-now-available/",children:"25.3"})," · ",e.jsx(s.a,{href:"https://www.rfdyn.com/tnavigator-25-4-key-updates-now-available/",children:"25.4"})," · ",e.jsx(s.a,{href:"https://rfdyn.com/tnavigator-26-1-advancing-integrated-modelling-and-ai-capabilities/",children:"26.1"})," · ",e.jsx(s.a,{href:"https://www.rfdyn.eu/tnavigator-26-2-accelerating-the-digital-energy-workflow-with-ai-petrophysics-and-advanced-simulation/",children:"26.2"})]}),`
`,e.jsxs(s.li,{children:["SLB: ",e.jsx(s.a,{href:"https://www.slb.com/products-and-services/delivering-digital-at-scale/subsurface/machine-learning",children:"Petrel ML"})," · ",e.jsx(s.a,{href:"https://www.slb.com/videos/petrel-ai-assistant",children:"Petrel AI Assistant"})," · ",e.jsx(s.a,{href:"https://www.slb.com/newsroom/press-release/2025/pr-2025-1103-slb-tela-ai",children:"Tela"})," · ",e.jsx(s.a,{href:"https://jpt.spe.org/slb-unveils-agentic-ai-for-upstream-workflows",children:"Tela en JPT"})," · ",e.jsx(s.a,{href:"https://www.slb.com/products-and-services/delivering-digital-at-scale/software/techlog-wellbore-software/techlog-features",children:"Techlog"})," · ",e.jsx(s.a,{href:"https://www.software.slb.com/software-news/support-news/intersect/intersect-2024-3",children:"INTERSECT 2024.3"})," · ",e.jsx(s.a,{href:"https://www.software.slb.com/software-news/support-news/intersect/intersect-2025-4",children:"INTERSECT 2025.4"})," · ",e.jsx(s.a,{href:"https://www.slb.com/products-and-services/delivering-digital-at-scale/software/delfi/delfi-solutions/delfi-on-demand-reservoir-simulation",children:"simulación en Delfi"})," · ",e.jsx(s.a,{href:"https://www.ocean.slb.com/en/developer/petrel",children:"Ocean"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.a,{href:"https://www.cegal.com/en/software/data-science-and-cegal-prizm/cegal-python-tool-pro",children:"Cegal Python Tool Pro"})," · ",e.jsx(s.a,{href:"https://www.cmgl.ca/solutions/software/cmost/",children:"CMG CMOST"})," · ",e.jsx(s.a,{href:"https://www.halliburton.com/en/software/decisionspace-365-enterprise",children:"Halliburton DecisionSpace 365"})," · ",e.jsx(s.a,{href:"https://aws.amazon.com/blogs/machine-learning/halliburton-enhances-seismic-workflow-creation-with-amazon-bedrock-and-generative-ai/",children:"Halliburton y Amazon Bedrock"})," · ",e.jsx(s.a,{href:"https://stoneridgetechnology.com/company/blog/envoy-an-ai-assistant-for-reservoir-simulation/",children:"Stone Ridge ENVOY"})]}),`
`,e.jsxs(s.li,{children:["Abiertos: ",e.jsx(s.a,{href:"https://pypi.org/project/opm/",children:"OPM Flow en Python"})," · ",e.jsx(s.a,{href:"https://resinsight.org/",children:"ResInsight"})," · ",e.jsx(s.a,{href:"https://github.com/hnil/resinsight-mcp",children:"resinsight-mcp"})]}),`
`,e.jsxs(s.li,{children:["Investigación: ",e.jsx(s.a,{href:"https://arxiv.org/abs/2109.03697",children:"U-FNO"})," · ",e.jsx(s.a,{href:"https://arxiv.org/abs/2210.17051",children:"FNO anidado"})," · ",e.jsx(s.a,{href:"https://arxiv.org/abs/2312.08625",children:"redes sobre grafos"})," · ",e.jsx(s.a,{href:"https://docs.nvidia.com/physicsnemo/26.08/physicsnemo/examples/reservoir_simulation/xmgn/README.html",children:"PhysicsNeMo con Norne"})," · ",e.jsx(s.a,{href:"https://arxiv.org/abs/2603.00214",children:"JutulGPT"})," · ",e.jsx(s.a,{href:"https://onepetro.org/SPEADIP/proceedings-abstract/25ADIP/25ADIP/D021S069R002/793001",children:"SPE-229646-MS"})]}),`
`]})]})}function o(n={}){const{wrapper:s}=n.components||{};return s?e.jsx(s,{...n,children:e.jsx(a,{...n})}):a(n)}export{o as default};
