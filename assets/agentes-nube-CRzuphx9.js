import{j as e}from"./index-CHTNzI2b.js";function s(n){const a={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(a.p,{children:`Un agente en la nube trabaja en una computadora del proveedor, y a vos te alcanza con el
navegador. No hay nada que instalar, así que sirve en una PC donde sistemas no deja instalar
programas. Esta página compara los que se prueban gratis o por unos 20 dólares al mes, y trae un
tutorial con ChatGPT sobre el taller de la sesión 3.`}),`
`,e.jsx("div",{className:"callout",children:e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Foto del 30 de septiembre de 2026."}),` Los planes y los cupos de esta página cambian seguido, y en
algunos casos el cambio fue grande: el "modo agente" de ChatGPT ya no existe, y lo reemplazó
ChatGPT Work. Antes de pagar, abrí el link y confirmá el precio en la pantalla de compra.`]})}),`
`,e.jsx(a.h2,{children:"Dónde corre el agente"}),`
`,e.jsxs(a.p,{children:["Los agentes de la sesión 5 y de la ",e.jsx(a.a,{href:"#/preguntas",children:"página de preguntas"}),` corren en tu PC: Claude
Code, Codex CLI, Copilot en VS Code. Los de esta página corren en una máquina virtual del
proveedor, con su propio Python, su propio navegador y sus propios archivos:`]}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/nube-donde-corre.svg",alt:"Dos recuadros. El agente local se instala en tu PC, ve las carpetas que le abrís, corre comandos con tus permisos y llega a la red de la empresa; en una PC con restricciones choca con la instalación, el proxy y la política. El agente en la nube solo necesita el navegador: los archivos van y vienen a una máquina virtual del proveedor, con Python y navegador propio, fuera de tu red; no ve tu disco. Abajo: en los dos casos lo que el agente lee viaja al proveedor del modelo, y en la nube además queda guardado allá."})}),`
`,e.jsx(a.p,{children:`El arnés es el mismo de la sesión 5: herramientas, un loop, permisos. Cambia dónde corren las
herramientas. Eso tiene una ventaja y un costo. La ventaja es que el agente no puede tocar nada de
tu PC ni de la red de la empresa. El costo es que todo lo que le das sale de la empresa y queda en
los servidores del proveedor, así que en las cuentas personales va solo dato público, como en todo
el curso.`}),`
`,e.jsx(a.h2,{children:"Cuál probar"}),`
`,e.jsx(a.p,{children:"La pregunta útil es qué querés que te entregue:"}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/nube-cual-probar.svg",alt:"Cinco filas. Un Excel o un informe desde archivos que ya tenés: Claude o ChatGPT en el chat común, gratis. Datos que hay que buscar en la web y un Excel: ChatGPT Work, Manus o Genspark, con el plan Plus de 20 dólares o créditos gratis. Un análisis que quede como notebook de Python: Colab con Data Science Agent, gratis. Una app o un tablero que use otra persona: Replit Agent, gratis con la app publicada 30 días, o Core de 20 dólares. Comparar modelos con datos públicos: Arena en modo agente, gratis, y las conversaciones se comparten."})}),`
`,e.jsx(a.h3,{children:"La hoja comparativa"}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Herramienta"}),e.jsx(a.th,{children:"Mejor para"}),e.jsx(a.th,{children:"Gratis"}),e.jsx(a.th,{children:"Plan pago más barato"}),e.jsx(a.th,{children:"Navega la web"}),e.jsx(a.th,{children:"Fuente"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Claude, chat con ejecución de código"}),e.jsx(a.td,{children:"Planillas, documentos y gráficos desde tus archivos"}),e.jsx(a.td,{children:'Sí: "available to all Claude users (Free, Pro, Max, Team, and Enterprise)"'}),e.jsx(a.td,{children:"Pro, US$20 por mes"}),e.jsx(a.td,{children:"No en el chat gratuito; Cowork en la web es pago"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude",children:"Anthropic"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"ChatGPT, chat con análisis de datos"}),e.jsx(a.td,{children:"Lo mismo, con los modelos de OpenAI"}),e.jsx(a.td,{children:"Sí, con límites de archivos"}),e.jsx(a.td,{children:"Plus, US$20"}),e.jsx(a.td,{children:"No"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"#/sesion/3",children:"Sesión 3"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"ChatGPT Work"}),e.jsx(a.td,{children:"Buscar en la web, bajar archivos y entregar planillas y documentos"}),e.jsx(a.td,{children:"En la web, no: en Free y Go, solo en la app de escritorio"}),e.jsx(a.td,{children:"Plus, US$20"}),e.jsx(a.td,{children:"Sí, con un navegador en la nube"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://learn.chatgpt.com/codex/pricing",children:"OpenAI"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Manus"}),e.jsx(a.td,{children:"Encargos completos: investigar, bajar, procesar y entregar"}),e.jsx(a.td,{children:"300 créditos por día, un modelo liviano, una tarea a la vez"}),e.jsx(a.td,{children:"US$20, con 4,000 créditos por mes"}),e.jsx(a.td,{children:"Sí"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://help.manus.im/en/articles/11711111",children:"Manus"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Genspark"}),e.jsx(a.td,{children:"Trabajo de oficina: planillas (AI Sheets), documentos, investigación"}),e.jsx(a.td,{children:"100 créditos por día, hasta agotar un cupo total"}),e.jsx(a.td,{children:"Plus, US$24.99 por mes o US$19.99 pagando el año"}),e.jsx(a.td,{children:"Sí"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://www.genspark.ai/helpcenter/membership-plans",children:"Genspark"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Replit Agent"}),e.jsx(a.td,{children:"Una app o un tablero publicado, que use otra persona"}),e.jsx(a.td,{children:"Créditos diarios limitados y una app publicada que se da de baja a los 30 días"}),e.jsx(a.td,{children:"Core, US$20 (US$18 pagando el año)"}),e.jsx(a.td,{children:"Para su trabajo, no como asistente"}),e.jsxs(a.td,{children:[e.jsx(a.a,{href:"https://docs.replit.com/billing/plans/starter-plan",children:"Replit"}),", ",e.jsx(a.a,{href:"https://replit.com/pricing",children:"precios"})]})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Colab con Data Science Agent"}),e.jsx(a.td,{children:"Un notebook de Python completo, que se puede seguir editando"}),e.jsx(a.td,{children:"Sí, para mayores de 18 en países seleccionados; sesiones de hasta 12 horas"}),e.jsx(a.td,{children:"Colab Pro"}),e.jsx(a.td,{children:"No"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://developers.googleblog.com/en/data-science-agent-in-colab-with-gemini/",children:"Google"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Arena, modo agente"}),e.jsx(a.td,{children:"Probar modelos distintos sobre el mismo pedido"}),e.jsx(a.td,{children:"Sí"}),e.jsx(a.td,{children:"No tiene"}),e.jsx(a.td,{children:"Sí"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://help.arena.ai/articles/5432423882",children:"Arena"})})]})]})]}),`
`,e.jsxs(a.p,{children:[`Quedan afuera tres que aparecen en las búsquedas. Grok Bot, de xAI, tiene su computadora en la
nube, compartida entre todos tus bots, pero se usa desde una aplicación que hay que instalar y no
tiene plan gratuito (`,e.jsx(a.a,{href:"https://docs.x.ai/grok-bot/faq",children:"FAQ"}),`). Jules, de Google, da 15 tareas por
día gratis, y Claude Code en la web y Codex en la nube corren en máquinas virtuales del
proveedor, pero los tres trabajan sobre repositorios de código en GitHub
(`,e.jsx(a.a,{href:"https://jules.google/docs/usage-limits",children:"Jules"}),`,
`,e.jsx(a.a,{href:"https://code.claude.com/docs/en/claude-code-on-the-web",children:"Claude Code en la web"}),`): sirven a quien
ya programa.`]}),`
`,e.jsx(a.h3,{children:"Qué pasa con tus datos en el plan gratuito"}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Herramienta"}),e.jsx(a.th,{children:"Qué dice el proveedor"}),e.jsx(a.th,{children:"Fuente"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"ChatGPT"}),e.jsx(a.td,{children:"En Free y Plus, las conversaciones se usan para entrenar, salvo que lo apagues en Configuración, Controles de datos"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://help.openai.com/en/articles/7730893-data-controls-faq",children:"OpenAI"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Claude"}),e.jsx(a.td,{children:"En Free, Pro y Max, lo mismo: se usan para entrenar salvo que lo apagues. Si queda prendido, se guardan cinco años"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://www.anthropic.com/news/updates-to-our-consumer-terms",children:"Anthropic"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Colab"}),e.jsx(a.td,{children:'Google usa los datos para mejorar sus productos, "human reviewers may read" las conversaciones, y las guarda hasta 18 meses'}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://research.google.com/colaboratory/faq.html",children:"Google"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Arena"}),e.jsx(a.td,{children:"Publica conversaciones en conjuntos de datos de investigación y las comparte con los proveedores de los modelos"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://arena.ai/faq",children:"Arena"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Replit"}),e.jsx(a.td,{children:"Usa los datos para mejorar sus modelos de generación de código"}),e.jsx(a.td,{children:e.jsx(a.a,{href:"https://replit.com/privacy",children:"Replit"})})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Manus, Genspark"}),e.jsx(a.td,{children:"No encontramos una política clara sobre entrenamiento"}),e.jsx(a.td,{})]})]})]}),`
`,e.jsxs(a.p,{children:[`Manus merece una línea aparte. Nació en China y tiene sede en Singapur; Meta la compró en diciembre
de 2025 y en abril de 2026 el gobierno chino ordenó deshacer la operación
(`,e.jsx(a.a,{href:"https://techcrunch.com/2026/04/27/china-vetoes-metas-2b-manus-deal-after-months-long-probe/",children:"TechCrunch"}),`).
Con dato público no cambia nada. Con cualquier otro dato, la pregunta de dónde queda guardado es de
sistemas y de legales.`]}),`
`,e.jsx("div",{className:"callout",children:e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"La regla corta."}),` En cualquier cuenta personal o gratuita, solo dato público: el del curso, el de
los organismos de control, los datasets abiertos. El dato de la empresa va en las herramientas que
contrató la empresa, con su contrato de datos. Es el mapa de tres niveles de la
`,e.jsx(a.a,{href:"#/sesion/7",children:"sesión 7"}),"."]})}),`
`,e.jsx(a.h2,{children:"Tutorial: el taller de la sesión 3, con ChatGPT"}),`
`,e.jsxs(a.p,{children:["En la ",e.jsx(a.a,{href:"#/sesion/3",children:"sesión 3"}),` consolidaste seis partes diarios de la Agencia de Regulación y Control
de Hidrocarburos (ARCH) de Ecuador en un Excel, subiendo los PDF a un chatbot. Acá lo hacés de dos
formas con ChatGPT: gratis, con el chat común, o con Work, que va a buscar los PDF solo.`]}),`
`,e.jsx(a.h3,{children:"Versión gratuita: el chat común"}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsxs(a.li,{children:[`Bajá los seis partes a tu computadora:
`,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-08.pdf",children:"8"}),`,
`,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-09.pdf",children:"9"}),`,
`,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-10.pdf",children:"10"}),`,
`,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-11.pdf",children:"11"}),`,
`,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-14.pdf",children:"14"}),` y
`,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-15.pdf",children:"15"})," de septiembre."]}),`
`,e.jsxs(a.li,{children:["Entrá a ",e.jsx(a.a,{href:"https://chatgpt.com",children:"chatgpt.com"}),` con una cuenta personal. En Configuración, Controles
de datos, apagá la opción de mejorar el modelo con tus conversaciones.`]}),`
`,e.jsx(a.li,{children:"Adjuntá los seis PDF y pegá el pedido del taller de la sesión 3, tal cual."}),`
`,e.jsx(a.li,{children:"Cuando termine, pedile el Excel para bajar."}),`
`]}),`
`,e.jsx(a.p,{children:`La cuenta gratuita limita cuántos archivos subís por día. Si se corta, seguí al día siguiente o
repartí los partes en dos conversaciones.`}),`
`,e.jsx(a.h3,{children:"Versión Work: que los vaya a buscar"}),`
`,e.jsxs(a.p,{children:[`Work, con el plan Plus, "uses its own browser, running on a separate computer in the cloud"
(`,e.jsx(a.a,{href:"https://learn.chatgpt.com/docs/browser",children:"Cloud browser"}),`): navega, baja archivos, corre Python y
entrega planillas y documentos (`,e.jsx(a.a,{href:"https://learn.chatgpt.com/codex/get-started-with-work",children:"Get started with Work"}),`).
Los partes están publicados en el sitio del curso, así que no hace falta subir nada.`]}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsxs(a.li,{children:["Entrá a ",e.jsx(a.a,{href:"https://chatgpt.com",children:"chatgpt.com"}),` con una cuenta Plus y apagá el entrenamiento, como
en la versión gratuita.`]}),`
`,e.jsxs(a.li,{children:["Cambiá a la pestaña ",e.jsx(a.strong,{children:"Work"}),"."]}),`
`,e.jsx(a.li,{children:"Pegá este pedido:"}),`
`]}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-text",children:`Bajá estos seis partes diarios de la Agencia de Regulación y Control de
Hidrocarburos (ARCH) de Ecuador, del 8 al 15 de septiembre de 2026. Son
datos públicos, copiados en el sitio de un curso:

https://mpodeley.github.io/curso-ia-energia/descargas/arch-reporte-diario-2026-09-08.pdf
https://mpodeley.github.io/curso-ia-energia/descargas/arch-reporte-diario-2026-09-09.pdf
https://mpodeley.github.io/curso-ia-energia/descargas/arch-reporte-diario-2026-09-10.pdf
https://mpodeley.github.io/curso-ia-energia/descargas/arch-reporte-diario-2026-09-11.pdf
https://mpodeley.github.io/curso-ia-energia/descargas/arch-reporte-diario-2026-09-14.pdf
https://mpodeley.github.io/curso-ia-energia/descargas/arch-reporte-diario-2026-09-15.pdf

Cada parte informa el día de operación anterior. Con código, consolidalos
en un Excel con cinco hojas:
1. Producción por compañía y día de operación, como viene en la tabla 1.
2. Resumen por día: EP Petroecuador, privadas y total nacional, con
   fórmulas desde la hoja 1, el total que dice el parte y la diferencia.
3. Estado de pozos y gas de EP Petroecuador, por día.
4. Novedades por compañía y día, con el texto original.
5. Control: si las compañías suman el total de cada parte, y si la
   producción anterior de cada parte coincide con la del día del parte
   previo.

Los números vienen con punto de miles y coma decimal; pasalos a punto
decimal. Lo que no puedas leer con certeza, dejalo vacío y listalo en
Control. No inventes datos.

Además, armá una página HTML de un solo archivo que muestre el total
nacional por día en un gráfico y deje filtrar la tabla por compañía.
Entregame el Excel y el HTML para bajar, y contame qué días faltan.
`})}),`
`,e.jsxs(a.ol,{start:"4",children:[`
`,e.jsx(a.li,{children:`Mirá cómo trabaja. Work muestra los pasos: qué páginas abre, qué código corre, qué archivos
escribe. Si una página pide iniciar sesión o un captcha, frena y te deja tomar el control; la
documentación avisa que algunos sitios bloquean navegadores automáticos.`}),`
`,e.jsxs(a.li,{children:[`Bajá los dos archivos y revisalos con los tres chequeos de la sesión 3: qué días cubre, si cierra
el resumen con fórmulas, y por qué cae el 7 de septiembre. Los números correctos están en el
desplegable "Para comparar" de esa sesión, y en la
`,e.jsx(a.a,{href:"descargas/arch_consolidado_referencia.xlsx",children:"planilla de referencia"}),"."]}),`
`]}),`
`,e.jsx("div",{className:"callout",children:e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Qué mirar."}),` Si el Excel no coincide con la referencia, la diferencia dice algo del agente. Los
errores habituales son leer la coma decimal como separador de miles, tomar el día del parte como
día de operación, o rellenar los días 11 y 12, que no tienen parte. Un agente que rellena un dato
faltante sin avisar es el error más caro: parece un dato y no lo es.`]})}),`
`,e.jsx(a.h2,{children:"Una prueba común para comparar"}),`
`,e.jsx(a.p,{children:`Si querés elegir entre Manus, Genspark, Work o Replit, dales a todos el mismo pedido de arriba, con
los mismos seis partes, y anotá:`}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Qué medir"}),e.jsx(a.th,{children:"Cómo"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"¿Terminó sin ayuda?"}),e.jsx(a.td,{children:"Cuántas veces tuviste que intervenir o corregir"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"¿Los números son correctos?"}),e.jsx(a.td,{children:"Contra la planilla de referencia, día por día"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"¿Avisó lo que no pudo?"}),e.jsx(a.td,{children:"Si los días 11 y 12 quedaron vacíos y marcados, o rellenos"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"¿Cuánto costó?"}),e.jsx(a.td,{children:"Créditos o mensajes consumidos, que cada herramienta muestra en su panel"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"¿El HTML anda?"}),e.jsx(a.td,{children:"Abrirlo sin conexión y filtrar por una compañía"})]})]})]}),`
`,e.jsx(a.p,{children:`La tarea tiene una respuesta conocida, así que la comparación no depende de la impresión que deja
cada interfaz. Antes de pagar un año, hacé esta prueba con el plan gratuito o con un mes.`}),`
`,e.jsx(a.h2,{children:"Fuentes"}),`
`,e.jsx(a.p,{children:"Revisadas el 30 de septiembre de 2026."}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:["OpenAI: ",e.jsx(a.a,{href:"https://learn.chatgpt.com/codex/pricing",children:"planes de Work y Codex"})," · ",e.jsx(a.a,{href:"https://learn.chatgpt.com/codex/get-started-with-work",children:"Get started with Work"})," · ",e.jsx(a.a,{href:"https://learn.chatgpt.com/docs/browser",children:"navegador en la nube"})," · ",e.jsx(a.a,{href:"https://help.openai.com/en/articles/7730893-data-controls-faq",children:"controles de datos"})]}),`
`,e.jsxs(a.li,{children:["Anthropic: ",e.jsx(a.a,{href:"https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude",children:"archivos y ejecución de código"})," · ",e.jsx(a.a,{href:"https://www.anthropic.com/news/updates-to-our-consumer-terms",children:"condiciones para cuentas personales"})," · ",e.jsx(a.a,{href:"https://code.claude.com/docs/en/claude-code-on-the-web",children:"Claude Code en la web"})]}),`
`,e.jsxs(a.li,{children:["Manus: ",e.jsx(a.a,{href:"https://help.manus.im/en/articles/11711111",children:"planes"})," · ",e.jsx(a.a,{href:"https://manus.im/blog/introducing-manus-2-0",children:"Manus 2.0, 28 de septiembre de 2026"})," · ",e.jsx(a.a,{href:"https://techcrunch.com/2026/04/27/china-vetoes-metas-2b-manus-deal-after-months-long-probe/",children:"TechCrunch sobre la compra de Meta"})]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.a,{href:"https://www.genspark.ai/helpcenter/membership-plans",children:"Genspark: planes"})," · ",e.jsx(a.a,{href:"https://docs.replit.com/billing/plans/starter-plan",children:"Replit: plan Starter"})," · ",e.jsx(a.a,{href:"https://replit.com/pricing",children:"Replit: precios"})," · ",e.jsx(a.a,{href:"https://replit.com/privacy",children:"Replit: privacidad"})]}),`
`,e.jsxs(a.li,{children:["Google: ",e.jsx(a.a,{href:"https://developers.googleblog.com/en/data-science-agent-in-colab-with-gemini/",children:"Data Science Agent en Colab"})," · ",e.jsx(a.a,{href:"https://research.google.com/colaboratory/faq.html",children:"preguntas frecuentes de Colab"})," · ",e.jsx(a.a,{href:"https://jules.google/docs/usage-limits",children:"Jules, límites"})]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.a,{href:"https://help.arena.ai/articles/5432423882",children:"Arena: modo agente"})," · ",e.jsx(a.a,{href:"https://arena.ai/faq",children:"Arena: preguntas frecuentes"})," · ",e.jsx(a.a,{href:"https://docs.x.ai/grok-bot/faq",children:"xAI: Grok Bot"})]}),`
`]})]})}function o(n={}){const{wrapper:a}=n.components||{};return a?e.jsx(a,{...n,children:e.jsx(s,{...n})}):s(n)}export{o as default};
