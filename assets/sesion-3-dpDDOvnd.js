import{u as B,e as M,j as e,L as G,c as n,s as o,F as S,f as F,r as b,b as H,d as L}from"./index-CHTNzI2b.js";import{j as U,E as O,S as A}from"./useData-B87oy_ZF.js";import{R as I,Q}from"./Recursos-daMYTd7r.js";const f=[{id:"rol",label:"Rol",ayuda:"Quién querés que sea: «sos un ingeniero de producción senior»."},{id:"contexto",label:"Contexto",ayuda:"Lo que necesita saber para no inventar: para quién es, de qué se trata."},{id:"tarea",label:"Tarea",ayuda:"El verbo concreto: resumir, comparar, redactar, extraer, traducir."},{id:"formato",label:"Formato",ayuda:"Cómo querés la salida: tabla, viñetas, máximo de palabras."},{id:"ejemplos",label:"Ejemplos",ayuda:"Un «así me gusta» vale más que tres párrafos de instrucciones."}],$={á:"a",é:"e",í:"i",ó:"o",ú:"u",ü:"u",ñ:"n",â:"a",ê:"e",î:"i",ô:"o",û:"u"};function V(r){return r.toLowerCase().replace(/[áéíóúüñâêîôû]/g,a=>$[a]??a)}const W="(resum|redact|traduc|list|analiz|critic|clasific|orden|calcul|identific|explic|revis|compar|extra|reescrib|sintetiz)",Y="(i|a|e|ir|ar|er)(me|nos|lo|la|los|las|melo|mela|selo)?",T="(\\d+|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)",X={rol:[/\b(sos|eres|actua como|actualo como|comportate como|hace de|haces de)\b/,/\btu rol es\b/,/\b(como|siendo) (un|una) [a-z]+ (senior|tecnic|especialista|experto|experta)/],contexto:[/\b(contexto|antecedentes|situacion)\s*:/,/\b(te paso|te adjunto|adjunto|te comparto|a continuacion|mas abajo|aca va)\b/,/\b(este|esta|el|la) (informe|documento|texto|paper|planilla|reporte|minuta|resumen) (va|es para|se presenta|lo lee)/,/\b(para|dirigido a) (el|la|un|una) (comite|directorio|gerencia|cliente|equipo|jefatura|auditoria)/],tarea:[new RegExp(`\\b${W}${Y}\\b`),/\btarea\s*:/],formato:[/\b(formato|estructura|salida)\s*:/,/\b(tabla|columnas|vinetas|bullets|lista numerada|json|markdown|csv)\b/,new RegExp(`\\b(maximo|no mas de|hasta|en) ${T} (palabras|caracteres|lineas|filas|parrafos|puntos|paginas)\\b`),/\b(una|media|dos) (pagina|paginas|carilla|carillas)\b/,new RegExp(`\\b${T} (secciones|partes|apartados|columnas|vinetas)\\b`)],ejemplos:[/\b(por ejemplo|ejemplo\s*:|ejemplos\s*:|un ejemplo|asi me gusta|como este|siguiendo este modelo)\b/,/\b(te doy|te muestro|mira este|segui el formato de)\b/,/\bentrada\s*:.*\bsalida\s*:/s]};function J(r,a,p){const m=Math.max(0,r.lastIndexOf(`
`,a)+1),t=r.indexOf(`
`,a+p),i=t===-1?r.length:t,l=r.slice(m,i).trim();return l.length>90?l.slice(0,88).trimEnd()+"…":l}function K(r){const a=r.trim(),p=V(a),m=f.map(({id:i})=>{for(const l of X[i]){const h=l.exec(p);if(h)return{id:i,presente:!0,evidencia:J(a,h.index,h[0].length)}}return{id:i,presente:!1,evidencia:null}}),t=a?a.split(/\s+/).length:0;return{componentes:m,presentes:m.filter(i=>i.presente).length,total:f.length,palabras:t,senales:{numeros:/\d/.test(a),suficientementeLargo:t>=25,unaSolaLinea:a.length>0&&!a.includes(`
`)&&t<12}}}function Z(r){return f.map(({id:a})=>(r[a]??"").trim()).filter(a=>a.length>0).join(`
`)}const R=0,w={ninguna:n.status.muted,floja:n.status.warn,buena:n.status.ok};function ee({sesion:r=3}){const{data:a,meta:p,loading:m,error:t}=U(),[i,l,h]=B("prompt-builder",{caso:"",modo:"armar",elecciones:{},propio:""}),[q,C]=M.useState(!1);if(m)return e.jsx(G,{what:"los casos"});if(t||!a||a.length===0)return e.jsx("div",{style:{color:n.status.err},children:"No se pudieron cargar los casos."});const c=a.find(s=>s.id===i.caso)??a[0],y=i.elecciones[c.id]??{},E={};for(const s of c.slots){const d=y[s.componente]??R;E[s.componente]=s.opciones[d]?.texto??""}const _=Z(E),x=i.modo==="armar"?_:i.propio,u=K(x),k=(s,d)=>l({elecciones:{...i.elecciones,[c.id]:{...y,[s]:d}}}),D=()=>{navigator.clipboard?.writeText(x).then(()=>{C(!0),window.setTimeout(()=>C(!1),1800)})},P=s=>({font:"inherit",fontSize:"var(--pd-fs-sm)",fontWeight:600,padding:`${o.sm}px ${o.lg}px`,borderRadius:b.pill,border:`1px solid ${s?n.accent.blue:n.border}`,background:s?n.accent.blue+"15":n.surface,color:s?n.accent.blue:n.textMuted,cursor:"pointer"});return e.jsxs(O,{titulo:"Constructor de prompts",sesion:r,intro:"Un prompt es una orden de trabajo. Armá uno pieza por pieza y mirá cómo cambia, o pegá uno tuyo y fijate qué le falta.",onReset:h,children:[e.jsxs("div",{style:{display:"flex",gap:o.sm,marginBottom:o.lg,flexWrap:"wrap"},children:[e.jsx("button",{type:"button",style:P(i.modo==="armar"),onClick:()=>l({modo:"armar"}),children:"1 · Armar"}),e.jsx("button",{type:"button",style:P(i.modo==="puntuar"),onClick:()=>l({modo:"puntuar"}),children:"2 · Puntuar el tuyo"})]}),i.modo==="armar"?e.jsxs(e.Fragment,{children:[e.jsx(S,{label:"Caso",children:e.jsx(F,{value:c.id,options:a.map(s=>({value:s.id,label:s.label})),onChange:s=>l({caso:s})})}),e.jsx("p",{style:{fontSize:"var(--pd-fs-sm)",color:n.textSecondary,margin:`0 0 ${o.lg}px`},children:c.situacion}),c.slots.map(s=>{const d=y[s.componente]??R,v=s.opciones[d],z=f.find(j=>j.id===s.componente);return e.jsxs("div",{style:{marginBottom:o.lg},children:[e.jsxs("div",{style:{display:"flex",gap:o.sm,alignItems:"baseline",marginBottom:4},children:[e.jsx("span",{style:{fontWeight:700,fontSize:"var(--pd-fs-sm)",color:n.textPrimary},children:z?.label}),e.jsx("span",{style:{fontSize:12,color:n.textDim},children:z?.ayuda})]}),e.jsx("div",{style:{display:"flex",gap:o.sm,flexWrap:"wrap"},children:s.opciones.map((j,g)=>e.jsx("button",{type:"button",className:"tbtn",style:{fontSize:13,borderColor:g===d?w[j.calidad]:void 0,color:g===d?w[j.calidad]:void 0,fontWeight:g===d?700:void 0},onClick:()=>k(s.componente,g),children:j.etiqueta},g))}),e.jsx("p",{style:{fontSize:13,color:n.textMuted,margin:`${o.sm}px 0 0`,maxWidth:"68ch"},children:v.comentario})]},s.componente)})]}):e.jsx(S,{label:"Pegá acá un prompt tuyo (por ejemplo, el de la tarea de ayer)",children:e.jsx("textarea",{value:i.propio,onChange:s=>l({propio:s.target.value}),rows:8,placeholder:`Sos un…
Contexto: …
Tarea: …
Formato: …`,style:{width:"100%",font:"inherit",fontFamily:"var(--pd-font-mono)",fontSize:14,padding:o.md,border:`1px solid ${n.border}`,borderRadius:b.md,background:n.surface,color:n.textPrimary,resize:"vertical"}})}),e.jsx("div",{style:{margin:`${o.lg}px 0`},children:e.jsxs(H,{children:[e.jsx(L,{label:"Piezas presentes",value:`${u.presentes} / ${u.total}`,accent:u.presentes>=4?n.status.ok:u.presentes>=2?n.status.warn:n.status.muted,hint:"Cuántas de las cinco piezas detecta la rúbrica"}),e.jsx(L,{label:"Palabras",value:u.palabras,hint:"Un prompt de oficina útil rara vez baja de 25 palabras"})]})}),e.jsx("div",{style:{display:"flex",gap:o.sm,flexWrap:"wrap",marginBottom:o.lg},children:u.componentes.map(s=>{const d=f.find(v=>v.id===s.id);return e.jsxs("span",{title:s.evidencia??"No detectada",style:{fontFamily:"var(--pd-font-mono)",fontSize:12,padding:"3px 10px",borderRadius:b.pill,border:`1px solid ${s.presente?n.status.ok:n.border}`,color:s.presente?n.status.ok:n.textDim,background:s.presente?n.status.ok+"12":"transparent"},children:[s.presente?"✓":"·"," ",d?.label]},s.id)})}),u.senales.unaSolaLinea&&e.jsx("p",{style:{fontSize:"var(--pd-fs-sm)",color:n.status.warn,marginBottom:o.md},children:"Una línea suelta. Es exactamente el prompt que el modelo tiene que completar adivinando."}),e.jsx("div",{style:{background:n.surface,border:`1px solid ${n.border}`,borderRadius:b.md,padding:o.lg,fontFamily:"var(--pd-font-mono)",fontSize:14,whiteSpace:"pre-wrap",minHeight:60,color:x?n.textPrimary:n.textDim},children:x||"Elegí piezas arriba y el prompt se arma acá."}),x&&e.jsxs("div",{style:{display:"flex",gap:o.md,alignItems:"center",marginTop:o.md,flexWrap:"wrap"},children:[e.jsx("button",{type:"button",className:"tbtn",onClick:D,children:"Copiar prompt"}),e.jsx("span",{style:{fontSize:13,color:q?n.status.ok:n.textMuted},children:q?"Copiado. Pegalo en tu chatbot y compará la salida.":"Pegalo en tu chatbot junto con un documento tuyo que no sea confidencial."})]}),i.modo==="armar"&&e.jsxs(A,{titulo:"Ver el prompt de referencia para este caso",children:[e.jsx("div",{style:{fontFamily:"var(--pd-font-mono)",fontSize:13,whiteSpace:"pre-wrap",background:n.surface,border:`1px solid ${n.border}`,borderRadius:b.md,padding:o.md,marginBottom:o.sm},children:c.modelo}),c.note]}),e.jsx(A,{titulo:"Qué NO mide este puntaje",children:"La rúbrica solo detecta si están las cinco piezas. Podés escribir las cinco piezas y tener un prompt inútil: un rol decorativo, un contexto que repite lo que ya está en el documento, un ejemplo que contradice el formato. Al revés también pasa: un prompt de dos líneas escrito por alguien que sabe exactamente qué quiere puede ganarle a uno de veinte. Usá el puntaje como lista de control, para no olvidarte ninguna pieza."}),p.source&&e.jsxs("div",{style:{marginTop:o.md,fontFamily:"var(--pd-font-mono)",fontSize:"var(--pd-fs-cap)",color:n.textDim},children:["fuente: ",p.source]})]})}function N(r){const a={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(a.h2,{children:"Antes de la sesión (opcional)"}),`
`,e.jsx(a.p,{children:"No hace falta traer nada. Si tenés cinco minutos antes, dejá lista la herramienta del día:"}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsxs(a.li,{children:["Una cuenta gratuita en ",e.jsx(a.a,{href:"https://claude.ai",children:"Claude"}),`. Es el chatbot gratuito que hoy corre
código y te devuelve un Excel para bajar.`]}),`
`,e.jsx(a.li,{children:`En la configuración de Claude, en la sección de capacidades, activá la ejecución de código y
la creación de archivos (en la interfaz en inglés: Settings, Capabilities, "Code execution and
file creation").`}),`
`]}),`
`,e.jsx(a.p,{children:"Si no llegás, lo hacemos en los primeros minutos."}),`
`,e.jsx(I,{sesion:3}),`
`,e.jsx(a.h2,{children:"En la sesión en vivo (2 h)"}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Bloque"}),e.jsx(a.th,{children:"Tiempo"}),e.jsx(a.th,{children:"Qué hacemos"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Apertura"}),e.jsx(a.td,{children:"8 min"}),e.jsx(a.td,{children:"El día, el sitio, y cada uno con Claude abierto y la ejecución de código activada"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Qué es un prompt"}),e.jsx(a.td,{children:"15 min"}),e.jsx(a.td,{children:"Todo lo que recibe el modelo en un pedido y cuánto entra en la ventana de contexto, el prompt de sistema y el de usuario, cómo se ve el de Claude y dónde escribís el tuyo"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Un parte, cuatro correos"}),e.jsx(a.td,{children:"25 min"}),e.jsx(a.td,{children:"La parte de EP Petroecuador de un parte diario de la ARCH, contada a cuatro destinatarios en tres idiomas"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Qué hace un buen prompt"}),e.jsx(a.td,{children:"5 min"}),e.jsx(a.td,{children:"Las piezas, dichas sobre lo que acabamos de hacer"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Prompt corto, dato bueno"}),e.jsx(a.td,{children:"12 min"}),e.jsx(a.td,{children:"La misma pregunta de una línea sobre un archivo limpio y sobre uno sucio"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Taller: seis partes en un Excel"}),e.jsx(a.td,{children:"35 min"}),e.jsx(a.td,{children:"El chatbot consolida seis partes de la ARCH en una planilla con controles, y cada uno la verifica"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Qué no se sube, y para llevarse"}),e.jsx(a.td,{children:"10 min"}),e.jsx(a.td,{children:"La regla entre cuatro empresas y tres prácticas"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Pausa"}),e.jsx(a.td,{children:"10 min"}),e.jsx(a.td,{children:"A las 12:00 (10:00 en Ecuador y Colombia) sigue la sesión 4"})]})]})]}),`
`,e.jsx(a.p,{children:`Las preguntas a la sala van por el chat de la videollamada. Todo lo que subas a un chatbot en esta
sesión es público: reportes oficiales de Ecuador y producción oficial de Argentina.`}),`
`,e.jsx(a.h2,{children:"Qué es un prompt"}),`
`,e.jsx(a.p,{children:`Un prompt es todo lo que recibe el modelo en un pedido. Incluye lo que escribís, y también lo que
escribió otro antes que vos. En la sesión 2 viste que el modelo mira la ventana de contexto y
predice lo que sigue; el prompt es lo que hay en esa ventana cuando le toca responder.`}),`
`,e.jsxs("figure",{className:"figura",children:[e.jsx("img",{src:"slides/img/prompt.svg",alt:"Un recuadro grande, el prompt, que tiene que entrar entero en la ventana de contexto, con cuatro capas: el prompt de sistema, que escribe quien arma la aplicación y que no ves; tus instrucciones, las que dejás escritas en la configuración; la conversación, con el pedido anterior, la respuesta anterior y tu pedido de ahora, que es el prompt de usuario; y los adjuntos. Una flecha lleva todo al modelo, y de ahí sale la respuesta."}),e.jsx("figcaption",{children:"Todo tiene que entrar en la ventana de contexto: lo que no entra, para el modelo no existe."})]}),`
`,e.jsx(a.h3,{children:"El prompt vive en la ventana de contexto"}),`
`,e.jsx(a.p,{children:`La ventana de contexto de la sesión 2 es el tamaño máximo del prompt. Todo lo de la figura tiene
que entrar junto en cada pedido, y la respuesta también: el modelo no recuerda nada entre un pedido
y el otro, así que la conversación entera se vuelve a mandar cada vez. El prompt de sistema de
Claude ya ocupa cerca de 3,000 palabras, unos 5,000 tokens, antes de tu primer mensaje.`}),`
`,e.jsxs(a.p,{children:["De todas las capas, ",e.jsx(a.strong,{children:"el prompt de usuario"}),` es la única que escribís en cada pedido, y suele ser
la más chica. Es la que decide qué se hace con todo lo demás, y por eso vale la pena escribirla
bien.`]}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Pegar un documento entero puede saturar la ventana."}),` Google calcula un millón de tokens por
cada 1,500 páginas, unos 670 tokens por página. La cuenta gratuita de Gemini lee 32,000 tokens por
vez, unas 48 páginas; la de ChatGPT, unas 12 páginas por pedido. Un reglamento de 84 páginas no
entra en ninguna de las dos. Según la aplicación, lo que sobra se corta sin avisar, el pedido se
rechaza, o se cae lo más viejo de la conversación, como el escritorio de la sesión 2. Y aunque
entre, la respuesta que buscás es un párrafo entre miles, y el modelo tiene que encontrarlo entre
todo lo demás.`]}),`
`,e.jsx(a.p,{children:`Esta tarde, en la sesión 4, se hace al revés: en vez de pegar el documento entero, se busca el
pedazo que responde la pregunta y se pega solo ese. Eso es RAG (generación aumentada por
recuperación).`}),`
`,e.jsx(a.h3,{children:"Prompt de sistema y prompt de usuario"}),`
`,e.jsxs(a.p,{children:["El ",e.jsx(a.strong,{children:"prompt de sistema"}),` lo escribe quien arma la aplicación, y vale para toda la conversación:
quién es el asistente, qué fecha es, cómo responde, qué herramientas tiene. El `,e.jsx(a.strong,{children:`prompt de
usuario`}),` es lo que escribís vos en cada turno. Anthropic lo define así en la
`,e.jsx(a.a,{href:"https://platform.claude.com/docs/es/api/messages",children:"referencia de su interfaz de programación"}),`: el
prompt de sistema es "una forma de darle a Claude contexto e instrucciones, como una meta o un
rol". Por dentro son dos campos distintos del mismo pedido. Este es el ejemplo de la
`,e.jsx(a.a,{href:"https://platform.claude.com/docs/es/build-with-claude/prompt-engineering/claude-prompting-best-practices",children:"guía de prompting de Anthropic"}),`,
recortado:`]}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-json",children:`{
  "model": "claude-opus-5-5",
  "system": "You are a helpful coding assistant specializing in Python.",
  "messages": [
    {"role": "user", "content": "How do I sort a list of dictionaries by key?"}
  ]
}
`})}),`
`,e.jsxs(a.p,{children:["OpenAI hace lo mismo con el campo ",e.jsx(a.code,{children:"instructions"}),`, o con mensajes de "developer" que tienen
prioridad sobre los del usuario (`,e.jsx(a.a,{href:"https://developers.openai.com/api/docs/guides/text-generation",children:"guía de OpenAI"}),`),
y Google con `,e.jsx(a.code,{children:"system_instruction"})," (",e.jsx(a.a,{href:"https://ai.google.dev/gemini-api/docs/text-generation",children:"guía de Gemini"}),")."]}),`
`,e.jsx(a.h3,{children:"Así se ve el prompt de sistema de Claude"}),`
`,e.jsxs(a.p,{children:[`Dentro de Claude no se puede ver: la aplicación no lo muestra, y pedírselo al chat no da una copia
fiable. Lo que sí hace Anthropic es publicar una copia en su documentación, en
`,e.jsx(a.a,{href:"https://platform.claude.com/docs/es/release-notes/system-prompts/overview",children:"Indicaciones del sistema"}),`,
con una página por modelo: la interfaz está en español y el prompt, en inglés, tal cual lo recibe
Claude. El de
`,e.jsx(a.a,{href:"https://platform.claude.com/docs/es/release-notes/system-prompts/claude-sonnet-5-5",children:"Claude Sonnet 5.5"}),`,
el modelo de la cuenta gratuita, tiene una versión del 28 de septiembre de 2026; el de
`,e.jsx(a.a,{href:"https://platform.claude.com/docs/es/release-notes/system-prompts/claude-opus-5-5",children:"Claude Opus 5.5"}),`,
el grande de pago, una del 22.
Son varias páginas de texto que Claude recibe antes de tu primer mensaje, ordenadas con etiquetas
como `,e.jsx(a.code,{children:"<product_information>"})," o ",e.jsx(a.code,{children:"<tone_and_formatting>"}),". Algunos fragmentos, tal cual:"]}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-text",children:`This iteration of Claude is Claude Sonnet 5.5.

Claude's reliable knowledge cutoff, past which it can't answer reliably, is
the end of Jun 2026. It answers the way a highly informed individual in Jun
2026 would if talking to someone from {{currentDateTime}}

In typical conversation and for simple questions Claude keeps a natural tone
and responds in prose rather than lists or bullets unless asked

Personal tone, formatting, or feature preferences go in "user preferences"

When relevant, Claude can provide guidance on effective prompting (being clear
and detailed, using positive and negative examples, encouraging step-by-step
reasoning, requesting specific XML tags, specifying length or format)
`})}),`
`,e.jsxs(a.p,{children:[`Tres cosas para llevarse de ahí. La fecha de hoy entra por el prompt de sistema
(`,e.jsx(a.code,{children:"{{currentDateTime}}"}),` se reemplaza en cada conversación), y por eso Claude sabe qué día es aunque
su conocimiento termine en junio. Si no pedís un formato, responde en prosa: el formato que querés
lo tenés que pedir. Y los consejos de prompting que da Claude son los mismos que vemos hoy. ChatGPT
y Gemini no publican el suyo.`]}),`
`,e.jsx(a.h3,{children:"Dónde escribís el tuyo"}),`
`,e.jsx(a.p,{children:`Casi todos los chatbots te dejan escribir instrucciones de fondo que valen para todas tus
conversaciones: tu propio prompt de sistema, encima del de la aplicación.`}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Claude:"}),` en la configuración, "Instrucciones para Claude"
(`,e.jsx(a.a,{href:"https://support.claude.com/en/articles/10185728",children:"ayuda"}),`). Los proyectos, hasta cinco en la cuenta
gratuita, tienen además sus propias instrucciones.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Gemini:"}),` "Instrucciones para Gemini", y los Gems, que son asistentes con instrucciones fijas
(`,e.jsx(a.a,{href:"https://support.google.com/gemini/answer/16598625",children:"ayuda"}),")."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"ChatGPT:"})," instrucciones personalizadas, en la configuración de personalización."]}),`
`]}),`
`,e.jsx(a.p,{children:`Lo que va ahí es lo que no cambia de un pedido a otro: quién sos, para quién escribís, en qué
formato te gusta recibir las cosas, qué no tiene que hacer nunca.`}),`
`,e.jsx(a.h2,{children:"Un parte, cuatro correos"}),`
`,e.jsxs(a.p,{children:[`La Agencia de Regulación y Control de Hidrocarburos (ARCH) de Ecuador publica un parte por cada
día de operación: producción por compañía, estado de pozos y novedades, pozo por pozo. El ejercicio
usa la parte de EP Petroecuador del `,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-15.pdf",children:"parte del 15 de septiembre de 2026"}),`,
que informa el día 14. Estos son los datos, verificados contra el PDF:`]}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-text",children:`- EP Petroecuador produjo 366,559.66 barriles por día, 1,498.70 menos que el
  día anterior: el 99.57% de su estimado de septiembre.
- Bloque 15: 59 pozos cerrados 4 horas por mantenimiento de generación.
- Bloque 58: 5 pozos de Cuyabeno cerrados 24 horas por falla en el control de
  niveles del tanque de lavado.
- Bloque 57: Dureno 01 cerrado 24 horas por robo de cables; Parahuacu 32
  cerrado 24 horas por falla de la bomba electrosumergible.
- Bloques 60 y 61: Sacha 419 y 400 y Yulebra 20 con incremento de BSW
  (sedimentos y agua).
`})}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Primero, el pedido pelado."}),` Pegale los datos a Claude con una sola línea: "Escribí un correo
con esto". Mirá qué inventa para completar: el destinatario, el tono, el saludo, a veces una
conclusión que no estaba en los datos.`]}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Después, cuatro destinatarios."})," El mismo contenido, con el pedido completo:"]}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-text",children:`Con estos datos del parte diario de la ARCH, escribí un correo para el
gerente de producción. Lo lee en el celular entre reuniones: cinco líneas
como máximo, primero la cifra y la causa principal, después lo que hay que
seguir. Tono directo, sin saludos largos. No agregues cifras ni causas que
no estén en los datos.

<pegá los datos>
`})}),`
`,e.jsx(a.p,{children:"Y tres variantes, cambiando solo el destinatario y el idioma:"}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:["Un socio extranjero, ",e.jsx(a.strong,{children:"en inglés"}),`, formal, con los barriles por día escritos como "barrels of
oil per day".`]}),`
`,e.jsx(a.li,{children:"El grupo de chat del equipo de campo: tres líneas, sin formato de correo."}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Un idioma que no leés"}),", portugués o chino, para una casa matriz."]}),`
`]}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Al final, lo estable pasa a tus instrucciones."}),` Todo lo que se repite en los cuatro pedidos
("no agregues cifras ni causas que no estén en los datos", el tono, tu firma) va en "Instrucciones
para Claude". En el pedido queda solo lo que cambia: los datos, el destinatario y el idioma. Probá
el mismo pedido corto con las instrucciones puestas y sin ellas.`]}),`
`,e.jsx(a.h3,{children:"Cómo se revisa un correo en un idioma que no leés"}),`
`,e.jsxs(a.p,{children:["La ",e.jsx(a.a,{href:"https://platform.claude.com/docs/es/build-with-claude/multilingual-support",children:"guía multilingüe de Anthropic"}),`
recomienda nombrar siempre el idioma de destino, idealmente en el prompt de sistema. Los errores
graves de traducción automática, según la
`,e.jsx(a.a,{href:"https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/translator/transparency-note",children:"nota de transparencia de Microsoft Translator"}),`,
son la negación invertida, los números o unidades cambiados y el contenido que no estaba en el
original. Pedirle al modelo que traduzca de vuelta ayuda a cazar esos tres, y conviene hacerlo en
una conversación nueva. Una vuelta limpia no prueba que la ida esté bien: un estudio de 2005 ya
encontró traducciones de vuelta impecables sobre traducciones de ida malas
(`,e.jsx(a.a,{href:"https://aclanthology.org/www.mt-archive.info/05/ALTW-2005-Somers.pdf",children:"Somers"}),`). Lo que va
a salir de la empresa en un idioma que no leés lo revisa alguien que lo lee.`]}),`
`,e.jsx(a.h2,{children:"Qué hace un buen prompt"}),`
`,e.jsxs(a.p,{children:[`Anthropic propone pensar al modelo como "un empleado brillante pero nuevo, que no conoce tus normas
ni tu forma de trabajar". Su regla de oro, en la
`,e.jsx(a.a,{href:"https://platform.claude.com/docs/es/build-with-claude/prompt-engineering/claude-prompting-best-practices",children:"guía de prompting"}),`:
mostrale tu prompt a un colega que no conozca la tarea y pedile que lo siga; si él se confunde,
Claude también. Las piezas que acabás de usar en el correo:`]}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"La tarea"}),", con un verbo concreto: escribí, resumí, extraé, compará."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"El destinatario y el propósito:"})," quién lo lee, dónde y para qué decisión."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"El contexto"})," que el modelo no tiene: qué es el parte, qué cuenta como novedad."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"El formato:"})," largo, orden, idioma, si va en lista o en prosa."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Ejemplos"}),`, si tenés uno que te guste. La guía de Google lo dice sin vueltas: "los prompts sin
ejemplos suelen ser menos efectivos" (`,e.jsx(a.a,{href:"https://ai.google.dev/gemini-api/docs/prompting-strategies",children:"Gemini"}),")."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Qué no hacer"}),", y que te diga qué supuso."]}),`
`]}),`
`,e.jsx(a.p,{children:"Lo que se repite en todos tus pedidos va en tus instrucciones; lo del día, en el pedido."}),`
`,e.jsx(a.h2,{children:"Prompt corto, dato bueno"}),`
`,e.jsx(a.p,{children:`Cuando lo que le das es un dato, el prompt se achica. El archivo de práctica tiene la producción
mensual de siete campos maduros de Argentina, de enero de 2006 a julio de 2026, tomada del
Capítulo IV de la Secretaría de Energía (datos abiertos, licencia CC BY 4.0). Ninguno de los siete
es de una empresa de la sala.`}),`
`,e.jsxs(a.p,{children:[e.jsx(a.a,{href:"descargas/campos_capiv_2006_2026.csv",children:"campos_capiv_2006_2026.csv"})," · 2,078 filas · 194 KB"]}),`
`,e.jsx(a.p,{children:"Subilo a Claude con una sola línea:"}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-text",children:`¿Qué campos tengo que mirar este mes y por qué?
`})}),`
`,e.jsxs(a.p,{children:["La respuesta suele ser buena: los nombres de las columnas dicen qué es cada cosa (",e.jsx(a.code,{children:"petroleo_m3"}),`,
`,e.jsx(a.code,{children:"agua_m3"}),`), las unidades están en el nombre y las fechas vienen en un solo formato. Ahora la misma
pregunta sobre los mismos números, exportados sin cuidado:
`,e.jsx(a.a,{href:"descargas/campos_capiv_sucio.csv",children:"campos_capiv_sucio.csv"}),`. Antes de abrir la lista de abajo, mirá
qué contesta y qué supone.`]}),`
`,e.jsxs("details",{children:[e.jsx("summary",{children:"Lo que tiene el archivo sucio"}),e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:["Encabezados sin unidades (",e.jsx(a.code,{children:"yac;per;p;a;iny"}),"), punto y coma de separador y coma decimal."]}),`
`,e.jsx(a.li,{children:`Convencional y no convencional sumados en una fila: en El Trapial y en Chihuido, Vaca Muerta
queda mezclada con la recuperación secundaria.`}),`
`,e.jsxs(a.li,{children:["Fechas en dos formatos, ",e.jsx(a.code,{children:"2006-02"})," y ",e.jsx(a.code,{children:"01/2006"}),"."]}),`
`,e.jsx(a.li,{children:"El agua de Los Perales en barriles en lugar de m³, sin que nada lo diga."}),`
`,e.jsx(a.li,{children:"Ocho meses borrados y un mes duplicado (Diadema, marzo de 2020)."}),`
`]})]}),`
`,e.jsx(a.p,{children:`Buena parte de lo que antes había que explicar en el prompt, ahora lo explica un archivo bien
armado.`}),`
`,e.jsx(a.h2,{children:"Taller: seis partes en un Excel"}),`
`,e.jsxs(a.p,{children:[`Un parte suelto se lee en un minuto. Seis partes seguidos son una serie, y ahí aparecen las
preguntas: por qué cayó la producción un día, si los números de un parte coinciden con los del
siguiente, qué días faltan. El taller consolida los partes del 8 al 15 de septiembre de 2026 en un
Excel. Son seis PDF de una página, copiados de la ARCH:
`,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-08.pdf",children:"8"}),`,
`,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-09.pdf",children:"9"}),`,
`,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-10.pdf",children:"10"}),`,
`,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-11.pdf",children:"11"}),`,
`,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-14.pdf",children:"14"}),` y
`,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-15.pdf",children:"15"}),"."]}),`
`,e.jsx(a.p,{children:"Subí los seis a Claude, con la ejecución de código activada, y este pedido:"}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-text",children:`Te adjunto seis partes diarios de la Agencia de Regulación y Control de
Hidrocarburos (ARCH) de Ecuador, del 8 al 15 de septiembre de 2026. Cada
parte informa el día de operación anterior. Quiero consolidarlos en un Excel.

Hojas:
1. Producción por compañía: una fila por compañía y día de operación, con
   producción anterior, producción del día, incremento, estimado y
   cumplimiento, tal como vienen en la tabla 1.
2. Resumen: una fila por día de operación con EP Petroecuador, privadas y
   total nacional calculados con fórmulas desde la hoja 1, el total que dice
   el parte, la diferencia, y un gráfico del total nacional por día.
3. Pozos y gas: el estado de pozos y el gas de EP Petroecuador, por día.
4. Novedades: una fila por compañía y día, con el texto original.
5. Control: si las compañías suman el total de cada parte, y si la
   "producción anterior" de cada parte coincide con la "producción del día"
   del parte previo, cuando los días son consecutivos. Marcá las diferencias.

El original usa punto de miles y coma decimal (368.058,36), salvo el gas,
que algunos días viene con punto decimal. Pasá todo a punto decimal. Si algo
no lo pudiste leer con certeza, dejalo vacío y listalo en Control. Antes de
armarlo, decime qué días de operación cubren los partes y si falta alguno.
`})}),`
`,e.jsx(a.p,{children:"Cuando baje el Excel, tres chequeos:"}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"¿Qué días cubre?"})," Seis partes no son seis días seguidos: el fin de semana no hubo parte."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"¿Cierra el Resumen?"}),` El total nacional calculado tiene que coincidir con el del parte, día por
día, y tiene que ser una fórmula.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"¿Por qué cae el 7 de septiembre?"})," Buscalo en la hoja de novedades."]}),`
`]}),`
`,e.jsxs("details",{children:[e.jsx("summary",{children:"Para comparar: lo que tiene que dar"}),e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Día de operación"}),e.jsx(a.th,{children:"EP Petroecuador (bppd)"}),e.jsx(a.th,{children:"Privadas (bppd)"}),e.jsx(a.th,{children:"Total nacional (bppd)"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"7 de septiembre"}),e.jsx(a.td,{children:"346,742.97"}),e.jsx(a.td,{children:"96,968.94"}),e.jsx(a.td,{children:"443,711.91"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"8 de septiembre"}),e.jsx(a.td,{children:"360,858.53"}),e.jsx(a.td,{children:"96,766.01"}),e.jsx(a.td,{children:"457,624.54"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"9 de septiembre"}),e.jsx(a.td,{children:"361,238.63"}),e.jsx(a.td,{children:"96,431.49"}),e.jsx(a.td,{children:"457,670.12"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"10 de septiembre"}),e.jsx(a.td,{children:"366,095.21"}),e.jsx(a.td,{children:"97,004.89"}),e.jsx(a.td,{children:"463,100.10"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"13 de septiembre"}),e.jsx(a.td,{children:"368,058.36"}),e.jsx(a.td,{children:"97,052.29"}),e.jsx(a.td,{children:"465,110.65"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"14 de septiembre"}),e.jsx(a.td,{children:"366,559.66"}),e.jsx(a.td,{children:"97,253.11"}),e.jsx(a.td,{children:"463,812.77"})]})]})]}),e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Los días que faltan:"}),` no hay parte de los días de operación 11 y 12. El parte del 14 trae el 12
como "producción anterior" (EP Petroecuador, 368,127.46); del 11 no hay ninguna cifra.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"La caída del 7:"}),` el total fue el 95.98% del estimado. La novedad lo explica: 163 pozos del
bloque 43 cerrados temporalmente por falla de un componente de seguridad.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Las revisiones:"}),` el parte del 11 corrige la producción de EP Petroecuador del día 9 de
361,238.63 a 367,065.88 barriles por día, 5,827 más. Los otros días la corrección es de dos
barriles. Los volúmenes son preliminares: al armar una serie, elegí una columna y anotalo.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"El gas"})," viene con coma decimal cinco días y con punto decimal el 15 (24201.44)."]}),`
`]}),e.jsxs(a.p,{children:[`La planilla de referencia la arma un programa del curso con estas mismas reglas:
`,e.jsx(a.a,{href:"descargas/arch_consolidado_referencia.xlsx",children:"arch_consolidado_referencia.xlsx"}),"."]})]}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Y mañana, un agente."}),` Hacer esto todos los días lleva cinco pasos: bajar el PDF nuevo (su
dirección tiene siempre la misma forma), leerlo, sumar las filas, controlar contra el día anterior
y avisar si algo no cuadra. Hoy los hiciste a mano, con el chatbot. Mañana vemos cómo un agente los
hace solo, y dónde hay que mirarlo.`]}),`
`,e.jsx(a.h2,{children:"Qué no se sube a un chatbot"}),`
`,e.jsx(a.p,{children:`Regla práctica: si no lo pondrías en un correo a un desconocido, no va en el chat. No van
producción real por pozo, reservas, precios y cláusulas de contratos, datos de socios ni
información de personas. Lo que se sube a una cuenta gratuita sale de tu control.`}),`
`,e.jsxs(a.p,{children:[`En la sala hay cuatro empresas que compiten entre sí, y el chat de la videollamada es tan
compartido como el chatbot: `,e.jsx(a.strong,{children:"ningún ejercicio pide un dato de tu empresa"}),`. Para practicar con una
estructura real hay tres salidas: datos públicos como los de hoy, datos viejos que dejaron de ser
sensibles, o la misma planilla con números inventados. Los casos grises y las versiones
corporativas de estas herramientas, con otro contrato de datos, son tema de la sesión 7.`]}),`
`,e.jsx(a.h2,{children:"Para llevarse"}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsx(a.li,{children:"Lo que se repite, en tus instrucciones; lo del día, en el pedido."}),`
`,e.jsx(a.li,{children:`Verificá cada número contra la fuente, y lo que va en un idioma que no leés, con alguien que lo
lee.`}),`
`,e.jsx(a.li,{children:"En una planilla que vas a reusar, pedí fórmulas y una hoja de control."}),`
`]}),`
`,e.jsx(a.h2,{children:"Para curiosos"}),`
`,e.jsx(a.h3,{children:"Una planilla de surveillance"}),`
`,e.jsx(a.p,{children:`Con el archivo de los siete campos se puede armar una planilla para revisar todos los meses, con la
relación agua-petróleo (RAP) contra el petróleo acumulado (Np), el gráfico de diagnóstico clásico
de la recuperación secundaria:`}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-text",children:`Te adjunto la producción mensual de siete campos maduros de Argentina
(Capítulo IV, Secretaría de Energía), en m³, desde enero de 2006. Quiero una
planilla de Excel de surveillance para revisar estos campos todos los meses.

Usá solo las filas con tipo_recurso = "convencional".
Hojas:
1. Datos: el CSV tal cual, más una columna con los días de cada mes.
2. Resumen: una fila por campo con la operadora del último mes, el petróleo
   en m³/d de los últimos 3 meses y de los 12 meses anteriores, el cambio en
   %, la relación agua-petróleo (RAP = agua / petróleo) de esas dos ventanas
   y su cambio, el petróleo acumulado desde 2006 (Np), y un semáforo: rojo si
   el petróleo cae 15% o más o la RAP sube 15% o más; amarillo desde 5%;
   verde si no. Una columna "revisar dato" con los meses que faltan y los
   cambios de operadora de los últimos 24 meses.
3. Un gráfico por campo de RAP (eje vertical logarítmico) contra Np.
4. Léeme: de dónde salen los datos, los criterios, y cómo sumar el mes que
   viene.

Todo con fórmulas de Excel que lean la hoja Datos, sin valores pegados, así
el mes que viene alcanza con pegar filas. Antes de armarla, decime qué
supuestos hiciste y qué encontraste raro en los datos.
`})}),`
`,e.jsxs("details",{children:[e.jsx("summary",{children:"Para comparar: lo que tiene que dar"}),e.jsx(a.p,{children:"Ventana reciente: mayo a julio de 2026. Base: mayo de 2025 a abril de 2026."}),e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Campo"}),e.jsx(a.th,{children:"Petróleo base → reciente (m³/d)"}),e.jsx(a.th,{children:"RAP base → reciente"}),e.jsx(a.th,{children:"Np desde 2006 (m³)"}),e.jsx(a.th,{children:"Semáforo"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"El Corcobo Norte"}),e.jsx(a.td,{children:"1,334.6 → 1,262.4 (−5.4%)"}),e.jsx(a.td,{children:"16.60 → 17.37"}),e.jsx(a.td,{children:"15,109,737"}),e.jsx(a.td,{children:"amarillo"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Chihuido de la Sierra Negra"}),e.jsx(a.td,{children:"384.5 → 377.6 (−1.8%)"}),e.jsx(a.td,{children:"37.11 → 34.93"}),e.jsx(a.td,{children:"9,695,940"}),e.jsx(a.td,{children:"verde"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"El Trapial"}),e.jsx(a.td,{children:"120.4 → 11.7 (−90.3%)"}),e.jsx(a.td,{children:"59.34 → 110.35"}),e.jsx(a.td,{children:"20,737,718"}),e.jsx(a.td,{children:"rojo"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Puesto Hernández"}),e.jsx(a.td,{children:"351.5 → 315.4 (−10.3%)"}),e.jsx(a.td,{children:"63.28 → 65.58"}),e.jsx(a.td,{children:"12,419,240"}),e.jsx(a.td,{children:"amarillo"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Los Perales"}),e.jsx(a.td,{children:"932.3 → 856.8 (−8.1%)"}),e.jsx(a.td,{children:"22.57 → 23.90"}),e.jsx(a.td,{children:"13,745,181"}),e.jsx(a.td,{children:"amarillo"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Manantiales Behr"}),e.jsx(a.td,{children:"4,019.3 → 3,877.0 (−3.5%)"}),e.jsx(a.td,{children:"6.25 → 6.71"}),e.jsx(a.td,{children:"24,341,645"}),e.jsx(a.td,{children:"amarillo"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Diadema"}),e.jsx(a.td,{children:"1,579.0 → 1,601.5 (+1.4%)"}),e.jsx(a.td,{children:"28.01 → 27.42"}),e.jsx(a.td,{children:"12,444,536"}),e.jsx(a.td,{children:"verde"})]})]})]}),e.jsxs(a.p,{children:[`A El Corcobo Norte le falta enero de 2019; Los Perales pasó de YPF a Patagonia Resources y
Manantiales Behr de YPF a PECOM en los últimos 24 meses. En El Trapial, lo convencional cayó de
71,639 m³ en 2025 a 5,332 m³ entre enero y julio de 2026, mientras Vaca Muerta crece en el mismo
campo. El Np de la planilla empieza a contar en 2006: a los campos más viejos les falta todo lo
producido antes. La planilla de referencia:
`,e.jsx(a.a,{href:"descargas/surveillance_referencia.xlsx",children:"surveillance_referencia.xlsx"}),"."]})]}),`
`,e.jsx(a.h3,{children:"A ciegas, en Arena"}),`
`,e.jsxs(a.p,{children:[e.jsx(a.a,{href:"https://arena.ai",children:"Arena"}),` (antes LMArena) le manda el mismo pedido a dos modelos anónimos; votás
cuál respondió mejor y recién ahí te dice quiénes eran. El modo batalla anda sin cuenta, no acepta
planillas y no corre código: los modelos hacen las cuentas de memoria. Lo que escribas puede
compartirse con los proveedores, así que va solo dato público. Pegá esta tabla con la pregunta "¿qué
campos tengo que mirar y por qué? Mostrá la relación agua-petróleo de 2025 de cada campo", y antes
de votar hacé una de esas divisiones con la calculadora:`]}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-text",children:`campo | año | meses | petroleo_m3 | agua_m3
El Corcobo Norte | 2024 | 12 | 523,738 | 8,462,116
El Corcobo Norte | 2025 | 12 | 494,397 | 8,138,122
El Corcobo Norte | 2026 | 7 | 273,620 | 4,654,284
Chihuido de la Sierra Negra | 2024 | 12 | 153,741 | 6,299,940
Chihuido de la Sierra Negra | 2025 | 12 | 143,865 | 5,469,298
Chihuido de la Sierra Negra | 2026 | 7 | 80,166 | 2,819,356
El Trapial | 2024 | 12 | 136,884 | 7,258,974
El Trapial | 2025 | 12 | 71,639 | 4,178,451
El Trapial | 2026 | 7 | 5,332 | 422,458
Puesto Hernández | 2024 | 12 | 157,665 | 10,171,071
Puesto Hernández | 2025 | 12 | 137,549 | 8,384,926
Puesto Hernández | 2026 | 7 | 68,101 | 4,530,698
Los Perales | 2024 | 12 | 414,030 | 8,020,220
Los Perales | 2025 | 12 | 358,843 | 7,746,645
Los Perales | 2026 | 7 | 186,208 | 4,395,822
Manantiales Behr | 2024 | 12 | 1,386,059 | 8,045,735
Manantiales Behr | 2025 | 12 | 1,462,226 | 9,153,217
Manantiales Behr | 2026 | 7 | 842,228 | 5,411,608
Diadema | 2024 | 12 | 561,023 | 14,961,339
Diadema | 2025 | 12 | 573,379 | 16,098,308
Diadema | 2026 | 7 | 334,146 | 9,297,314
`})}),`
`,e.jsx(a.h3,{children:"Qué trae hoy cada cuenta gratuita"}),`
`,e.jsx(a.p,{children:"Al 28 de septiembre de 2026:"}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Chatbot"}),e.jsx(a.th,{children:"Modelo de la cuenta gratuita"}),e.jsx(a.th,{children:"Con tus archivos"}),e.jsx(a.th,{children:"Lo que entrega"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:e.jsx(a.a,{href:"https://claude.com/pricing",children:"Claude"})}),e.jsx(a.td,{children:"Sonnet y Haiku"}),e.jsx(a.td,{children:"Corre código sobre CSV, Excel y PDF; hasta 20 archivos por conversación"}),e.jsxs(a.td,{children:["Planillas ",e.jsx(a.code,{children:".xlsx"}),", documentos, presentaciones y gráficos para bajar"]})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:e.jsx(a.a,{href:"https://chatgpt.com/pricing",children:"ChatGPT"})}),e.jsx(a.td,{children:"GPT-5.6 Luna"}),e.jsx(a.td,{children:"Análisis de datos y subida de archivos, con límites"}),e.jsx(a.td,{children:"Tablas y gráficos; unas 12 páginas de texto por pedido"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:e.jsx(a.a,{href:"https://support.google.com/gemini/answer/16275805",children:"Gemini"})}),e.jsx(a.td,{children:"Flash, con algo de Pro"}),e.jsx(a.td,{children:"Corre código y arma gráficos desde una planilla"}),e.jsx(a.td,{children:"Tablas que se exportan a Hojas de cálculo de Google; unas 48 páginas por pedido"})]})]})]}),`
`,e.jsx(a.p,{children:`Todos los proveedores ofrecen la misma escalera: un modelo grande y uno rápido. En OpenAI, GPT-6
Astra (pago) y GPT-5.6 Luna; en Anthropic, Opus 5.5 (pago), Sonnet y Haiku; en Google, Pro y
Flash. El benchmark que importa es tu tarea, corrida en dos modelos.`}),`
`,e.jsx(a.h3,{children:"Para practicar prompts de texto"}),`
`,e.jsx(a.p,{children:"El constructor de abajo arma un prompt por partes y puntúa uno tuyo."}),`
`,e.jsx(ee,{sesion:3}),`
`,e.jsx(a.p,{children:`A las 12:00 (10:00 en Ecuador y Colombia) sigue la sesión 4: de las planillas a los documentos,
con un cuaderno de reservas y normativa en Gemini Notebook.`}),`
`,e.jsx(Q,{data:"quiz_s3",sesion:3})]})}function oe(r={}){const{wrapper:a}=r.components||{};return a?e.jsx(a,{...r,children:e.jsx(N,{...r})}):N(r)}export{oe as default};
