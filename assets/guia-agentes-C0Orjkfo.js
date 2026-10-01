import{j as e}from"./index-CHTNzI2b.js";function s(n){const a={a:"a",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...n.components};return e.jsxs(e.Fragment,{children:[e.jsxs(a.p,{children:["Esta guía acompaña la ",e.jsx(a.a,{href:"#/sesion/7",children:"sesión 7"}),` y está hecha para llevarse a la empresa. Ordena lo
que hace falta decidir antes de poner a trabajar un agente: qué poderes le das, cuánta autonomía,
qué controles pide cada tarea y qué hicieron otras empresas. Las cuatro tareas de la sección 4 son
las que más pidió esta cohorte: bajar datos públicos, pasar partes internos a una base, preparar
modelos de simulación y armar tableros de monitoreo.`]}),`
`,e.jsx("div",{className:"callout",children:e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Revisada el 30 de septiembre de 2026."}),` Cada afirmación lleva su fuente. Los incidentes son casos
públicos y documentados. Las cifras de las empresas son las que publicó cada empresa. Nada de esto
reemplaza a sistemas ni a legales: sirve para llegar a esa conversación con las preguntas
correctas.`]})}),`
`,e.jsx(a.h2,{children:"1. Por qué un agente es lo más potente y lo más riesgoso"}),`
`,e.jsx(a.p,{children:`Un chatbot contesta y una persona decide qué hacer con la respuesta. Un agente, además, actúa: lee
archivos, corre código, escribe en carpetas, manda mensajes. Eso es lo que ahorra horas, y es
también lo que convierte un error en un hecho consumado. Hay tres poderes que conviene separar:`}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"A. Lee contenido que no controlás."})," Una página web, un correo, un PDF de un tercero."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"B. Tiene acceso a lo sensible."})," Partes internos, bases de datos, credenciales."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"C. Actúa o sale hacia afuera."})," Escribe, borra, manda un correo, sube un archivo."]}),`
`]}),`
`,e.jsxs(a.p,{children:[`Con los tres juntos, un texto escondido en una página o en un correo puede darle instrucciones al
agente, y el agente las ejecuta con tus permisos. Simon Willison lo llamó
"`,e.jsx(a.a,{href:"https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/",children:"the lethal trifecta"}),`", y Meta lo
convirtió en una regla de diseño, la "Agents Rule of Two": sin supervisión, un agente tiene como
mucho dos de los tres (`,e.jsx(a.a,{href:"https://simonwillison.net/2025/Nov/2/new-prompt-injection-papers/",children:"resumen de Willison"}),")."]}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/guia-regla-de-dos.svg",alt:"Tres círculos que se superponen: A, lee lo que no controlás; B, tiene acceso a lo sensible; C, actúa o sale afuera. En el centro, donde se juntan los tres, un signo de peligro. A la derecha, las combinaciones seguras: A más C sin B, scraping de datos públicos sin acceso a nada interno; B más C sin A, partes internos a una base con archivos de fuente conocida; A más B sin C, lee todo pero solo propone y una persona ejecuta. Las tres juntas, solo con una persona que aprueba cada acción."})}),`
`,e.jsxs(a.p,{children:[`El Centro Nacional de Ciberseguridad del Reino Unido (NCSC) explica por qué no alcanza con escribir
mejor las instrucciones: un modelo de lenguaje no separa las instrucciones de los datos, así que
la inyección de instrucciones quizás no se pueda eliminar nunca, y lo que queda es diseñar para
que su impacto sea chico (`,e.jsx(a.a,{href:"https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection",children:"Prompt injection is not SQL injection"}),`).
La regla de dos es eso: un diseño que acota el daño aunque el agente sea engañado.`]}),`
`,e.jsx(a.h2,{children:"2. Los riesgos, con casos reales"}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Riesgo"}),e.jsx(a.th,{children:"Qué pasó"}),e.jsx(a.th,{children:"Cómo se ve en una petrolera"}),e.jsx(a.th,{children:"Control"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Inyección de instrucciones"}),e.jsxs(a.td,{children:["EchoLeak (CVE-2025-32711): un solo correo, sin que nadie hiciera clic, hacía que Microsoft 365 Copilot sacara datos de su alcance. Microsoft lo corrigió en sus servidores, en 2025 (",e.jsx(a.a,{href:"https://www.hackthebox.com/blog/cve-2025-32711-echoleak-copilot-vulnerability",children:"Hack The Box"}),")"]}),e.jsx(a.td,{children:"Un agente que resume correos de proveedores y además ve los partes de producción"}),e.jsx(a.td,{children:"Regla de dos: el agente que lee contenido externo no ve lo sensible"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Datos que se filtran por una herramienta"}),e.jsxs(a.td,{children:["Un issue malicioso en un repositorio público hizo que un agente con el servidor MCP de GitHub copiara datos de repositorios privados a uno público (",e.jsx(a.a,{href:"https://invariantlabs.ai/blog/mcp-github-vulnerability",children:"Invariant Labs"}),")"]}),e.jsx(a.td,{children:"Un agente con acceso a la carpeta compartida del activo y a internet"}),e.jsx(a.td,{children:'Permisos mínimos por tarea; nada de acceso "a todo"'})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Acción destructiva"}),e.jsxs(a.td,{children:["Replit, julio de 2025: un agente borró la base de producción de una empresa durante un congelamiento de cambios (",e.jsx(a.a,{href:"https://incidentdatabase.ai/cite/1152/",children:"AI Incident Database"}),")"]}),e.jsx(a.td,{children:"Un agente que carga partes y tiene permiso de borrar en la base"}),e.jsx(a.td,{children:"Staging, usuario sin DELETE ni DROP, backups probados"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Cadena de suministro"}),e.jsxs(a.td,{children:["postmark-mcp, septiembre de 2025: una versión de un servidor MCP copiaba en secreto cada correo enviado a un tercero (",e.jsx(a.a,{href:"https://www.theregister.com/2025/09/29/postmark_mcp_server_code_hijacked/",children:"The Register"}),"). En agosto, paquetes de Nx usaron los agentes instalados con permisos desactivados para buscar credenciales (",e.jsx(a.a,{href:"https://www.wiz.io/blog/s1ngularity-supply-chain-attack",children:"Wiz"}),")"]}),e.jsx(a.td,{children:'Un servidor MCP o una extensión bajada de internet para "conectar" un agente a un sistema'}),e.jsx(a.td,{children:"Lista de servidores y extensiones aprobados; nunca desactivar permisos"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Un proveedor comprometido"}),e.jsxs(a.td,{children:["En julio de 2025, una versión oficial de la extensión de Amazon Q para VS Code salió con instrucciones de borrado insertadas por un atacante (",e.jsx(a.a,{href:"https://aws.amazon.com/security/security-bulletins/AWS-2025-015/",children:"AWS"}),")"]}),e.jsx(a.td,{children:"Una actualización automática de la herramienta del agente"}),e.jsx(a.td,{children:"Versiones fijas en lo crítico; el agente trabaja sobre copias"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Fuga por uso cotidiano"}),e.jsxs(a.td,{children:["Samsung, 2023: empleados pegaron código y notas internas en un chatbot, y la empresa prohibió estas herramientas (",e.jsx(a.a,{href:"https://www.cnbc.com/2023/05/02/samsung-bans-use-of-ai-like-chatgpt-for-staff-after-misuse-of-chatbot.html",children:"CNBC"}),")"]}),e.jsx(a.td,{children:"Pegar un parte con producción por pozo en una cuenta gratuita"}),e.jsx(a.td,{children:"El mapa de tres niveles de la sesión 7 y una herramienta aprobada"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Error confiado"}),e.jsx(a.td,{children:"Deloitte, 2025: un informe con citas inventadas (en la sesión 7)"}),e.jsx(a.td,{children:"Un agente que rellena un día sin parte con un número plausible"}),e.jsx(a.td,{children:'Validación contra la fuente; "si no lo leíste, dejalo vacío"'})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Operación"}),e.jsxs(a.td,{children:["La guía de CISA de diciembre de 2025 pide que la IA no tome decisiones de seguridad por su cuenta en tecnología de operaciones (OT) (",e.jsx(a.a,{href:"https://www.cisa.gov/resources-tools/resources/principles-secure-integration-artificial-intelligence-operational-technology",children:"CISA"}),")"]}),e.jsx(a.td,{children:"Un agente conectado al SCADA"}),e.jsx(a.td,{children:"Ningún agente en la red de operación (sección 4.4)"})]})]})]}),`
`,e.jsxs(a.p,{children:[`Los dos marcos que ordenan estos riesgos son de OWASP, una fundación abierta de seguridad. El
`,e.jsx(a.a,{href:"https://genai.owasp.org/llm-top-10/",children:"Top 10 para aplicaciones con modelos de lenguaje"}),` incluye la
"excessive agency", un agente con más permisos de los que necesita. El
`,e.jsx(a.a,{href:"https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/",children:"Top 10 para aplicaciones agénticas 2026"}),`,
de diciembre de 2025, suma el secuestro del objetivo del agente, el mal uso de herramientas y la
cadena de suministro de agentes.`]}),`
`,e.jsx(a.h2,{children:"3. La escalera de autonomía"}),`
`,e.jsx(a.p,{children:"La pregunta práctica es cuánto dejarle hacer solo. Conviene pensarlo en escalones:"}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/guia-escalera.svg",alt:"Cinco escalones. 1, lee y resume; control: verificar lo que se cita. 2, propone; una persona decide y ejecuta. 3, escribe en una copia, como staging o una carpeta aparte; revisión antes de pasar a producción. 4, actúa con aprobación; una persona aprueba cada acción. 5, actúa solo; solo en tareas reversibles y acotadas. Para empezar en una empresa, escalones 2 y 3; el 5 no se usa con datos ni sistemas de la empresa."})}),`
`,e.jsx(a.p,{children:`Los escalones 2 y 3 dan casi todo el ahorro con poco riesgo. En el 2, el agente escribe el script,
la consulta o el borrador, y una persona lo corre. En el 3, el agente corre sus propios pasos, pero
sobre una copia o una tabla aparte, y lo que pasa a producción lo aprueba alguien. Es lo que hizo
el agente de la sesión 6 con Volve: trabajó en una carpeta, sobre archivos públicos, y cada
comando que modificaba algo pasó por un permiso.`}),`
`,e.jsx(a.h2,{children:"4. Las cuatro tareas que pidió la cohorte"}),`
`,e.jsx(a.h3,{children:"4.1 Bajar datos públicos (scraping)"}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Qué hace el agente."}),` Visita sitios de organismos de control o portales de datos abiertos, baja
archivos, los lee y arma una tabla.`]}),`
`,e.jsx(a.p,{children:e.jsx(a.strong,{children:"Qué puede salir mal."})}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"La fuente cambia sin avisar."}),` El 30 de septiembre de 2026, la dirección de la ARCH que usó
este curso para los partes diarios mostraba una página de apuestas en lugar de los reportes. Un
agente automático habría seguido "leyendo" esa página.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"La página es contenido no confiable."}),` Cualquier texto que el agente lee puede traer
instrucciones escondidas.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Los términos de uso importan."}),` Que un dato sea visible no quiere decir que se pueda scrapear.
El juicio de LinkedIn contra hiQ, que bajaba perfiles públicos, terminó en 2022 con una
sentencia en contra de hiQ (`,e.jsx(a.a,{href:"https://natlawreview.com/article/linkedin-s-data-scraping-battle-hiq-labs-ends-proposed-judgment",children:"National Law Review"}),")."]}),`
`]}),`
`,e.jsx(a.p,{children:e.jsx(a.strong,{children:"Controles."})}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsxs(a.li,{children:[`Preferí los datos abiertos con licencia: la producción por pozo de Argentina (Capítulo IV) se
publica con licencia Creative Commons Attribution 4.0
(`,e.jsx(a.a,{href:"https://datos.energia.gob.ar/dataset/produccion-de-petroleo-y-gas-por-pozo",children:"datos.energia.gob.ar"}),`).
Si el sitio no tiene licencia, leé sus términos.`]}),`
`,e.jsxs(a.li,{children:[`Regla de dos: el agente que navega no tiene acceso a nada interno ni a credenciales. Corre en
una carpeta aislada o en un `,e.jsx(a.a,{href:"#/agentes-nube",children:"agente en la nube"}),"."]}),`
`,e.jsx(a.li,{children:`Validá lo que baja: forma del archivo, rangos, sumas contra totales, y que la fecha sea la
pedida. Si algo no cierra, se frena y avisa.`}),`
`,e.jsx(a.li,{children:"Guardá el archivo original junto a la tabla, con la fecha de descarga."}),`
`]}),`
`,e.jsx(a.h3,{children:"4.2 Partes internos a una base de datos"}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Qué hace el agente."}),` Lee los partes diarios (PDF, planillas, correos), extrae los números y los
carga en una base.`]}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/guia-partes-db.svg",alt:"Seis pasos: partes, extracción, validación, staging, revisión, producción. Dos puertas: si no valida, no entra; si nadie lo aprueba, no pasa. Controles: el agente no tiene DELETE, DROP ni acceso a producción; cada fila guarda de qué archivo y página salió; antes de empezar, backup y prueba de restauración; la herramienta es la contratada por la empresa."})}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Qué puede salir mal."}),` Un número mal leído que parece bueno (la coma decimal de la sesión 3), un
día faltante rellenado, una carga repetida, o un borrado como el de Replit.`]}),`
`,e.jsx(a.p,{children:e.jsx(a.strong,{children:"Controles."})}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsx(a.li,{children:"Es dato de nivel 2: solo con la herramienta que contrató la empresa, con contrato de datos."}),`
`,e.jsx(a.li,{children:`El agente escribe en una tabla de staging con un usuario que solo puede insertar. No tiene
DELETE, DROP ni acceso a la base de producción.`}),`
`,e.jsx(a.li,{children:`Dos puertas: una validación automática (esquema, rangos físicos, suma de pozos contra el total
del parte) y una persona que aprueba el pase a producción.`}),`
`,e.jsx(a.li,{children:"Cada fila guarda su procedencia: archivo, página y fecha de carga."}),`
`,e.jsx(a.li,{children:"Backup antes de empezar y una restauración probada."}),`
`]}),`
`,e.jsx(a.h3,{children:"4.3 Preparar modelos de simulación"}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Qué hace el agente."}),` Arma o modifica un deck de simulación a partir de una descripción: agrega
pozos, cambia un esquema de inyección, prepara sensibilidades, lee los logs de la corrida.`]}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Qué puede salir mal."}),` El modelo corre y está mal. JutulGPT, un agente de SINTEF que construye
modelos de simulación, mostró que la misma descripción en texto admite modelos distintos, y que
sin detectar esas ambigüedades "neither the correctness of the result nor its reproducibility from
the original description can be assured" (`,e.jsx(a.a,{href:"https://arxiv.org/abs/2603.00214",children:"Lie y otros, 2026"}),`;
`,e.jsx(a.a,{href:"https://blog.sintef.com/digital-en/talking-to-your-simulator-what-we-learned-building-jutulgpt/",children:"lo que aprendieron"}),`).
Los valores por defecto del simulador son supuestos que nadie escribió.`]}),`
`,e.jsx(a.p,{children:e.jsx(a.strong,{children:"Controles."})}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsx(a.li,{children:"El agente trabaja sobre una copia del deck, en una carpeta propia, nunca sobre el caso oficial."}),`
`,e.jsx(a.li,{children:"Diff contra el caso base: cada cambio se ve y se explica."}),`
`,e.jsx(a.li,{children:"Registro de supuestos, con los valores por defecto que usa el simulador."}),`
`,e.jsx(a.li,{children:"Corrida corta de prueba antes de la corrida larga, y la versión del simulador fija."}),`
`,e.jsx(a.li,{children:`Reconstruir dos veces desde la misma descripción: si salen modelos distintos, la descripción es
ambigua.`}),`
`,e.jsx(a.li,{children:"El caso que se usa para decidir lo firma un ingeniero."}),`
`]}),`
`,e.jsxs(a.p,{children:[`Para probar sin licencias ni datos de la empresa: OPM Flow y ResInsight son abiertos, y tNavigator
26.2 trae un servidor MCP para agentes (en `,e.jsx(a.a,{href:"#/ia-reservorios",children:"IA en el software de reservorios"}),")."]}),`
`,e.jsx(a.h3,{children:"4.4 Visualización y monitoreo"}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Qué hace el agente."}),` Escribe el código de un tablero o de unas alertas sobre datos de
producción, presiones o equipos.`]}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/guia-monitoreo.svg",alt:"Tres zonas. Red de operación, OT, con SCADA, controladores e historian: el agente no entra y nada se escribe desde afuera. Zona intermedia, DMZ, con una réplica del historian con la escritura apagada: los datos salen de la planta. Oficina, IT: una cuenta de servicio de solo lectura, el tablero y las alertas cuyo código escribió el agente, y una persona que mira la alerta y decide. Las credenciales no van en el código del agente."})}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Qué puede salir mal."}),` Un agente con acceso a la red de operación, una credencial con permiso de
escritura, una contraseña guardada dentro del código del tablero, o una alerta que dispara una
acción sin nadie en el medio.`]}),`
`,e.jsx(a.p,{children:e.jsx(a.strong,{children:"Controles."})}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsx(a.li,{children:`El agente no entra a la red de operación. Los datos salen de la planta hacia una réplica o un
historian en una zona intermedia, y el tablero lee de ahí.`}),`
`,e.jsx(a.li,{children:`Una cuenta de servicio de solo lectura, con los tags que hacen falta y nada más. El agente
escribe el código; las credenciales las pone sistemas, fuera del código.`}),`
`,e.jsxs(a.li,{children:[`Los servidores de datos de planta también tienen vulnerabilidades: CISA publicó avisos sobre
PI Web API de AVEVA (`,e.jsx(a.a,{href:"https://www.cisa.gov/news-events/ics-advisories/icsa-25-162-08",children:"ICSA-25-162-08"}),`).
Se mantienen actualizados y sin exposición a internet.`]}),`
`,e.jsxs(a.li,{children:[`La alerta la mira una persona, que decide. La guía conjunta de CISA, la NSA y otras siete
agencias pone a la IA en OT bajo cuatro principios: entender la IA, evaluar su uso en OT,
gobernarla y embeber seguridad, con una persona en el lazo para todo lo que toque seguridad
(`,e.jsx(a.a,{href:"https://www.cisa.gov/resources-tools/resources/principles-secure-integration-artificial-intelligence-operational-technology",children:"CISA"}),")."]}),`
`]}),`
`,e.jsx(a.h2,{children:"5. Qué están haciendo otras empresas"}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Empresa"}),e.jsx(a.th,{children:"Qué hizo"}),e.jsx(a.th,{children:"Fuente"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"ADNOC"}),e.jsx(a.td,{children:"Contrato de US$340 millones y tres años con AIQ para llevar agentes a más de 28 campos: cinco agentes de subsuelo para sísmica, modelado geológico y monitoreo de procesos (mayo de 2025)"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://jpt.spe.org/aiq-announces-340-million-contract-from-adnoc-for-deployment-of-agentic-ai",children:"JPT"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Petrobras"}),e.jsx(a.td,{children:"ChatPetrobras, un asistente propio sobre Azure OpenAI para 110,000 empleados y contratistas, armado sobre sus políticas de seguridad de la información y con los datos dentro del dominio de la empresa"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://agencia.petrobras.com.br/w/petrobras-cria-ferramenta-com-inteligencia-artificial-generativa-para-apoiar-mais-de-100-mil-trabalhadores",children:"Agência Petrobras"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Equinor"}),e.jsx(a.td,{children:"US$130 millones de valor por IA en 2025 y 330 desde 2020. El mayor aporte, 120 millones, viene del mantenimiento predictivo de más de 700 máquinas rotantes; el personal usa copilotos, chatbots y agentes"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://www.equinor.com/news/20260107-artificial-intelligence-saved-equinor-usd-130-million",children:"Equinor"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"TotalEnergies"}),e.jsx(a.td,{children:"Alianza con Mistral para desarrollar modelos propios de exploración e ingeniería de reservorios"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://totalenergies.com/newsroom/totalenergies-annonce-un-partenariat-avec-mistral-en-vue-de-developper-des-modeles-de-frontiere-dintelligence-artificielle-dedies-a-lexploration-et-a-lingenierie-des-reservoirs-498514/?lang=eng",children:"TotalEnergies"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"bp"}),e.jsx(a.td,{children:"Relación de cinco años con Palantir, con nuevas capacidades de IA (2024)"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://investors.palantir.com/news-details/2024/Palantir-and-bp-Agree-to-5-Year-Strategic-Relationship-With-New-AI-Capabilities/",children:"Palantir"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"SLB"}),e.jsx(a.td,{children:"Tela, un asistente agéntico para sus aplicaciones (noviembre de 2025)"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://www.slb.com/newsroom/press-release/2025/pr-2025-1103-slb-tela-ai",children:"SLB"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"YPF"}),e.jsx(a.td,{children:"GAIA, IA generativa con Microsoft para la gestión de proveedores en Y-click!"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://mase.lmneuquen.com/empresas/como-es-el-acuerdo-ypf-y-microsoft-aplicar-inteligencia-artificial-n1138947",children:"LM Neuquén"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Pan American Energy"}),e.jsx(a.td,{children:"IA en la cadena de suministro"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://www.ambito.com/energia/pan-american-energy-sumo-inteligencia-artificial-su-cadena-suministro-n6094152",children:"Ámbito"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"CGC"}),e.jsx(a.td,{children:"Security Copilot de Microsoft para ciberseguridad"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://www.rionegro.com.ar/energia/petroleras-y-la-inteligencia-artificial-cgc-refuerza-su-ciberseguridad-3777192/",children:"Río Negro"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Samsung"}),e.jsx(a.td,{children:"Prohibió los chatbots externos después de una fuga, en 2023"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://www.cnbc.com/2023/05/02/samsung-bans-use-of-ai-like-chatgpt-for-staff-after-misuse-of-chatbot.html",children:"CNBC"})})]})]})]}),`
`,e.jsx(a.p,{children:"Se repiten tres patrones:"}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Dar una herramienta aprobada en vez de prohibir."}),` Petrobras armó la suya, con los datos dentro de
su dominio. Una prohibición sin alternativa manda el uso a lo que no se ve.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Agentes acotados a un dominio."}),` Los de ADNOC son cinco, con tareas de subsuelo definidas.
En lo publicado, ninguna de estas empresas anunció un agente general con acceso a todo.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"El contrato de datos decide el proveedor."}),` TotalEnergies eligió un proveedor europeo para
modelos propios; Petrobras, una nube con los datos dentro de su dominio.`]}),`
`]}),`
`,e.jsxs(a.p,{children:[`Los proveedores ya venden controles para esto. Microsoft da identidades propias a los agentes,
para saber qué hizo cada uno (`,e.jsx(a.a,{href:"https://learn.microsoft.com/en-us/entra/agent-id/",children:"Entra Agent ID"}),`,
`,e.jsx(a.a,{href:"https://learn.microsoft.com/en-us/security/security-for-ai/agent-365-security",children:"Agent 365"}),`).
Anthropic documenta los permisos y las defensas contra inyección de Claude Code
(`,e.jsx(a.a,{href:"https://code.claude.com/docs/en/security",children:"Security"}),`). OpenAI recomienda aprobaciones para las
acciones sensibles (`,e.jsx(a.a,{href:"https://developers.openai.com/api/docs/guides/agent-builder-safety",children:"Safety in building agents"}),`).
Google propone un responsable humano definido, poderes limitados y acciones observables
(`,e.jsx(a.a,{href:"https://research.google/pubs/an-introduction-to-googles-approach-for-secure-ai-agents/",children:"Secure AI agents"}),`,
`,e.jsx(a.a,{href:"https://safety.google/intl/en/safety/saif/",children:"SAIF"}),")."]}),`
`,e.jsx(a.h2,{children:"6. Marcos para respaldar la política"}),`
`,e.jsx(a.p,{children:`No hace falta inventar la política desde cero. Estos marcos son públicos y sirven de respaldo
ante la dirección o auditoría:`}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Marco"}),e.jsx(a.th,{children:"Para qué sirve"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsxs(a.td,{children:[e.jsx(a.a,{href:"https://www.nist.gov/itl/ai-risk-management-framework",children:"NIST AI RMF"})," y su perfil de IA generativa (NIST AI 600-1, julio de 2024)"]}),e.jsx(a.td,{children:"Ordenar riesgos en cuatro funciones: gobernar, mapear, medir y gestionar"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:e.jsx(a.a,{href:"https://www.iso.org/standard/81230.html",children:"ISO/IEC 42001:2023"})}),e.jsx(a.td,{children:"Un sistema de gestión de IA certificable, con la misma estructura que ISO 27001"})]}),e.jsxs(a.tr,{children:[e.jsxs(a.td,{children:[e.jsx(a.a,{href:"https://genai.owasp.org/llm-top-10/",children:"OWASP Top 10 LLM"})," y ",e.jsx(a.a,{href:"https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/",children:"agénticas 2026"})]}),e.jsx(a.td,{children:"La lista de riesgos técnicos para revisar cada agente"})]}),e.jsxs(a.tr,{children:[e.jsxs(a.td,{children:[e.jsx(a.a,{href:"https://www.cisa.gov/resources-tools/resources/principles-secure-integration-artificial-intelligence-operational-technology",children:"CISA, IA en OT"})," y ",e.jsx(a.a,{href:"https://www.cisa.gov/news-events/alerts/2025/05/22/new-best-practices-guide-securing-ai-data-released",children:"seguridad de los datos de IA"})]}),e.jsx(a.td,{children:"Lo específico de infraestructura crítica y de la cadena de datos"})]})]})]}),`
`,e.jsxs(a.p,{children:[`En Argentina y en Ecuador todavía no hay una ley de IA. Lo que ya obliga son las leyes de datos
personales: la Ley 25.326 en Argentina
(`,e.jsx(a.a,{href:"https://iapp.org/news/a/novedades-legislativas-en-argentina-sobre-protecci-n-de-datos-personales-e-inteligencia-artificial",children:"IAPP"}),`)
y la Ley Orgánica de Protección de Datos Personales en Ecuador. El 31 de agosto de 2026, la
comisión de Educación de la Asamblea recomendó archivar el proyecto de ley de IA
(`,e.jsx(a.a,{href:"https://www.eldiario.ec/ecuador/comision-de-educacion-de-la-asamblea-recomienda-archivar-proyecto-de-ley-sobre-inteligencia-artificial-31082026",children:"El Diario"}),`).
La `,e.jsx(a.a,{href:"https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",children:"Ley de IA de la Unión Europea"}),`
alcanza a quien tenga socios o clientes europeos.`]}),`
`,e.jsx(a.h2,{children:"7. Noventa días para empezar"}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/guia-90-dias.svg",alt:"Cuatro etapas. Semanas 1 y 2, inventario: quién usa qué, con qué datos y en qué cuentas. Semanas 3 y 4, herramienta aprobada con contrato de datos y la política v0.2. Mes 2, un piloto con agente: una tarea, escalón 2 o 3, un dueño con nombre. Mes 3, medir y decidir: horas ahorradas, errores atrapados, incidentes. Cada etapa deja algo escrito."})}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Inventario."}),` Una encuesta corta: qué herramientas usa cada equipo, con qué datos y en qué
cuentas. Lo que aparezca en cuentas personales es la demanda que la herramienta aprobada tiene
que cubrir.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Herramienta aprobada y política."}),` Una herramienta contratada, con contrato de datos y sin
entrenamiento sobre lo que se sube, y la
`,e.jsx(a.a,{href:"descargas/politica-uso-ia-borrador.docx",children:"política de uso v0.2"})," completada."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Un piloto con agente."}),` Una tarea de la sección 4, en el escalón 2 o 3, con un dueño con
nombre y apellido y la lista de chequeo de abajo firmada.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Medir y decidir."}),` Horas ahorradas, errores que atrapó la validación, incidentes. Con eso se
decide si se amplía, se corrige o se para.`]}),`
`]}),`
`,e.jsx(a.h2,{children:"8. Antes de poner un agente a trabajar"}),`
`,e.jsx(a.p,{children:"Diez preguntas. Si alguna no tiene respuesta, el agente todavía no arranca."}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Pregunta"}),e.jsx(a.th,{children:"Respuesta esperada"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"¿Qué tarea hace, en una oración?"}),e.jsx(a.td,{children:"Una sola tarea, con un resultado que se puede revisar"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"¿Quién es el dueño?"}),e.jsx(a.td,{children:"Una persona con nombre, que responde por lo que hace"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"¿Qué escalón de autonomía tiene?"}),e.jsx(a.td,{children:"2 o 3 para empezar"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"¿Cuáles de los tres poderes tiene?"}),e.jsx(a.td,{children:"Como mucho dos, o una persona que aprueba cada acción"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"¿Qué datos ve, y de qué nivel?"}),e.jsx(a.td,{children:"Nivel 3 en cualquier herramienta; nivel 2 solo en la contratada"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"¿Con qué permisos corre?"}),e.jsx(a.td,{children:"Los mínimos: su carpeta, su tabla de staging, lectura en lo demás"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"¿Qué servidores MCP, extensiones o skills usa?"}),e.jsx(a.td,{children:"Solo los de la lista aprobada, en versiones fijas"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"¿Cómo se valida lo que produce?"}),e.jsx(a.td,{children:"Una validación automática y una persona antes de producción"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"¿Dónde queda registrado lo que hizo?"}),e.jsx(a.td,{children:"Un registro de acciones que alguien puede revisar"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"¿Qué pasa si se equivoca?"}),e.jsx(a.td,{children:"Se deshace: copia, staging, backup probado"})]})]})]}),`
`,e.jsx(a.h2,{children:"Fuentes"}),`
`,e.jsx(a.p,{children:"Revisadas el 30 de septiembre de 2026."}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Diseño y riesgos:"})," ",e.jsx(a.a,{href:"https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/",children:"la trifecta letal"})," · ",e.jsx(a.a,{href:"https://simonwillison.net/2025/Nov/2/new-prompt-injection-papers/",children:"la regla de dos de Meta"})," · ",e.jsx(a.a,{href:"https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection",children:"NCSC"})," · ",e.jsx(a.a,{href:"https://genai.owasp.org/llm-top-10/",children:"OWASP LLM"})," · ",e.jsx(a.a,{href:"https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/",children:"OWASP agénticas"})]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Incidentes:"})," ",e.jsx(a.a,{href:"https://www.hackthebox.com/blog/cve-2025-32711-echoleak-copilot-vulnerability",children:"EchoLeak"})," · ",e.jsx(a.a,{href:"https://invariantlabs.ai/blog/mcp-github-vulnerability",children:"MCP de GitHub"})," · ",e.jsx(a.a,{href:"https://incidentdatabase.ai/cite/1152/",children:"Replit"})," · ",e.jsx(a.a,{href:"https://www.theregister.com/2025/09/29/postmark_mcp_server_code_hijacked/",children:"postmark-mcp"})," · ",e.jsx(a.a,{href:"https://www.wiz.io/blog/s1ngularity-supply-chain-attack",children:"Nx s1ngularity"})," · ",e.jsx(a.a,{href:"https://aws.amazon.com/security/security-bulletins/AWS-2025-015/",children:"Amazon Q"})," · ",e.jsx(a.a,{href:"https://www.cnbc.com/2023/05/02/samsung-bans-use-of-ai-like-chatgpt-for-staff-after-misuse-of-chatbot.html",children:"Samsung"})]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Operación:"})," ",e.jsx(a.a,{href:"https://www.cisa.gov/resources-tools/resources/principles-secure-integration-artificial-intelligence-operational-technology",children:"CISA, IA en OT"})," · ",e.jsx(a.a,{href:"https://www.cisa.gov/news-events/alerts/2025/05/22/new-best-practices-guide-securing-ai-data-released",children:"CISA, datos de IA"})," · ",e.jsx(a.a,{href:"https://www.cisa.gov/news-events/ics-advisories/icsa-25-162-08",children:"aviso sobre PI Web API"})]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Simulación y datos:"})," ",e.jsx(a.a,{href:"https://arxiv.org/abs/2603.00214",children:"JutulGPT"})," · ",e.jsx(a.a,{href:"https://blog.sintef.com/digital-en/talking-to-your-simulator-what-we-learned-building-jutulgpt/",children:"SINTEF"})," · ",e.jsx(a.a,{href:"https://datos.energia.gob.ar/dataset/produccion-de-petroleo-y-gas-por-pozo",children:"Capítulo IV"})," · ",e.jsx(a.a,{href:"https://natlawreview.com/article/linkedin-s-data-scraping-battle-hiq-labs-ends-proposed-judgment",children:"hiQ contra LinkedIn"})]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Empresas:"})," ",e.jsx(a.a,{href:"https://jpt.spe.org/aiq-announces-340-million-contract-from-adnoc-for-deployment-of-agentic-ai",children:"ADNOC y AIQ"})," · ",e.jsx(a.a,{href:"https://agencia.petrobras.com.br/w/petrobras-cria-ferramenta-com-inteligencia-artificial-generativa-para-apoiar-mais-de-100-mil-trabalhadores",children:"Petrobras"})," · ",e.jsx(a.a,{href:"https://www.equinor.com/news/20260107-artificial-intelligence-saved-equinor-usd-130-million",children:"Equinor"})," · ",e.jsx(a.a,{href:"https://totalenergies.com/newsroom/totalenergies-annonce-un-partenariat-avec-mistral-en-vue-de-developper-des-modeles-de-frontiere-dintelligence-artificielle-dedies-a-lexploration-et-a-lingenierie-des-reservoirs-498514/?lang=eng",children:"TotalEnergies"})," · ",e.jsx(a.a,{href:"https://investors.palantir.com/news-details/2024/Palantir-and-bp-Agree-to-5-Year-Strategic-Relationship-With-New-AI-Capabilities/",children:"bp y Palantir"})," · ",e.jsx(a.a,{href:"https://www.slb.com/newsroom/press-release/2025/pr-2025-1103-slb-tela-ai",children:"SLB Tela"})," · ",e.jsx(a.a,{href:"https://mase.lmneuquen.com/empresas/como-es-el-acuerdo-ypf-y-microsoft-aplicar-inteligencia-artificial-n1138947",children:"YPF"})," · ",e.jsx(a.a,{href:"https://www.ambito.com/energia/pan-american-energy-sumo-inteligencia-artificial-su-cadena-suministro-n6094152",children:"PAE"})," · ",e.jsx(a.a,{href:"https://www.rionegro.com.ar/energia/petroleras-y-la-inteligencia-artificial-cgc-refuerza-su-ciberseguridad-3777192/",children:"CGC"})]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Proveedores:"})," ",e.jsx(a.a,{href:"https://learn.microsoft.com/en-us/entra/agent-id/",children:"Entra Agent ID"})," · ",e.jsx(a.a,{href:"https://learn.microsoft.com/en-us/security/security-for-ai/agent-365-security",children:"Agent 365"})," · ",e.jsx(a.a,{href:"https://code.claude.com/docs/en/security",children:"Claude Code"})," · ",e.jsx(a.a,{href:"https://developers.openai.com/api/docs/guides/agent-builder-safety",children:"OpenAI"})," · ",e.jsx(a.a,{href:"https://research.google/pubs/an-introduction-to-googles-approach-for-secure-ai-agents/",children:"Google"})," · ",e.jsx(a.a,{href:"https://safety.google/intl/en/safety/saif/",children:"SAIF"})]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Marcos y leyes:"})," ",e.jsx(a.a,{href:"https://www.nist.gov/itl/ai-risk-management-framework",children:"NIST AI RMF"})," · ",e.jsx(a.a,{href:"https://www.iso.org/standard/81230.html",children:"ISO/IEC 42001"})," · ",e.jsx(a.a,{href:"https://iapp.org/news/a/novedades-legislativas-en-argentina-sobre-protecci-n-de-datos-personales-e-inteligencia-artificial",children:"Argentina"})," · ",e.jsx(a.a,{href:"https://www.eldiario.ec/ecuador/comision-de-educacion-de-la-asamblea-recomienda-archivar-proyecto-de-ley-sobre-inteligencia-artificial-31082026",children:"Ecuador"})," · ",e.jsx(a.a,{href:"https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",children:"Unión Europea"})]}),`
`]})]})}function i(n={}){const{wrapper:a}=n.components||{};return a?e.jsx(a,{...n,children:e.jsx(s,{...n})}):s(n)}export{i as default};
