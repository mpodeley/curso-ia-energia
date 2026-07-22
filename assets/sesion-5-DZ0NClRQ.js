import{j as e}from"./index-D7zWAstQ.js";function o(s){const n={a:"a",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...s.components};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"callout callout--wip",children:e.jsx(n.p,{children:`El contenido completo de esta sesión se publica a medida que avanza el curso. La estructura de abajo
es el plan de la sesión.`})}),`
`,e.jsx(n.h2,{children:"De qué va esta sesión"}),`
`,e.jsxs(n.p,{children:["Un LLM no conoce tus manuales de operación, tus normas internas ni tus informes históricos. ",e.jsx(n.strong,{children:"RAG"}),`
(retrieval-augmented generation) es la solución estándar: en vez de esperar que el modelo "sepa",
se `,e.jsx(n.strong,{children:"busca"})," primero en tus documentos, se le ",e.jsx(n.strong,{children:"entrega"}),` lo encontrado, y se le pide que responda
`,e.jsx(n.strong,{children:"solo con eso"}),", citando la fuente."]}),`
`,e.jsxs(n.p,{children:["En la práctica, sin programar nada: ",e.jsx(n.a,{href:"https://notebooklm.google.com",children:"NotebookLM"}),` (gratuito) permite
subir un conjunto de documentos y conversar con ellos, con citas. Armamos en vivo un notebook con
documentos técnicos públicos y vemos qué cambia respecto del chatbot "a secas".`]}),`
`,e.jsx(n.h2,{children:"Además: elegimos el caso real"}),`
`,e.jsxs(n.p,{children:[`Esta sesión cierra el relevamiento que empezó en la sesión 1: con la encuesta y las tareas que fueron
trayendo, presentamos una `,e.jsx(n.strong,{children:"shortlist de 2–3 casos candidatos"}),` y elegimos entre todos el que se
construye para la sesión 8.`]}),`
`,e.jsx(n.h2,{children:"Ejercicios de esta página (en preparación)"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Demo RAG visible:"}),` un corpus chico de documentos técnicos, con la búsqueda por similitud a la vista —
para entender qué hace NotebookLM por adentro.`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Para discutir (borrador)"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"¿Qué corpus de tu área (manuales, normas, informes históricos) haría más diferencia con un buscador conversacional encima?"}),`
`,e.jsx(n.li,{children:"RAG reduce alucinaciones pero no las elimina: ¿dónde puede seguir fallando?"}),`
`]})]})}function r(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(o,{...s})}):o(s)}export{r as default};
