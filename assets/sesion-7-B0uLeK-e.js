import{u as S,j as e,L as C,c as s,F as k,f as N,s as l,b as P,d as y,r as I}from"./index-CHTNzI2b.js";import{n as T,E as U,S as w}from"./useData-B87oy_ZF.js";import{R as D,L as H,P as M,Q as F}from"./Recursos-daMYTd7r.js";function B(r,a){let p=0,j=0,f=0,u=0;r.forEach((c,q)=>{const g=c.inventada===!0,d=a.has(q);g&&u++,g&&d&&p++,!g&&d&&j++,g&&!d&&f++});const m=p+j,h=m===0?0:p/m,i=u===0?0:p/u,t=h+i===0?0:2*h*i/(h+i);return{encontradas:p,falsasAlarmas:j,perdidas:f,totalInventadas:u,precision:h,recall:i,f1:t}}function $(r){return r.totalInventadas===0?"No había nada que encontrar.":r.encontradas===r.totalInventadas&&r.falsasAlarmas===0?"Las encontraste todas y no marcaste ninguna afirmación sana. Eso es leer con criterio.":r.encontradas===0?"No marcaste ninguna de las invenciones. Fijate abajo qué las delataba: casi siempre es una cifra muy precisa sin fuente.":r.precision<.5?"Marcaste más afirmaciones sanas que invenciones. Desconfiar de todo cuesta tanto tiempo como no desconfiar de nada, y encima no deja lugar para la duda cuando hace falta.":r.encontradas===r.totalInventadas?"Encontraste todas las invenciones, pero te llevaste puestas algunas afirmaciones correctas.":"Encontraste algunas. Las que se te escaparon son las más peligrosas, porque son las que pasarían una revisión."}function R({sesion:r=7}){const{data:a,meta:p,loading:j,error:f}=T(),[u,m,h]=S("hallucination-hunt",{informe:"",marcados:{},corregidos:[]});if(j)return e.jsx(C,{what:"los informes"});if(f||!a||a.length===0)return e.jsx("div",{style:{color:s.status.err},children:"No se pudieron cargar los informes."});const i=a.find(n=>n.id===u.informe)??a[0],t=new Set(u.marcados[i.id]??[]),c=u.corregidos.includes(i.id),q=n=>{if(c)return;const o=new Set(t);o.has(n)?o.delete(n):o.add(n),m({marcados:{...u.marcados,[i.id]:[...o]}})},g=()=>m({corregidos:[...u.corregidos,i.id]}),d=B(i.segmentos,t),z=n=>{const o=i.segmentos[n],v=t.has(n);let x=s.border,b="transparent";return c?o.inventada&&v?(x=s.status.ok,b=s.status.ok+"12"):o.inventada&&!v?(x=s.status.err,b=s.status.err+"12"):!o.inventada&&v&&(x=s.status.warn,b=s.status.warn+"12"):v&&(x=s.accent.blue,b=s.accent.blue+"12"),{display:"block",width:"100%",textAlign:"left",font:"inherit",fontSize:"var(--pd-fs-sm)",color:s.textPrimary,lineHeight:1.6,padding:`${l.sm}px ${l.md}px`,marginBottom:l.sm,border:`1px solid ${x}`,borderLeftWidth:3,borderRadius:I.md,background:b,cursor:c?"default":"pointer"}},A=n=>{const o=i.segmentos[n];return c?o.inventada&&t.has(n)?"inventada: la encontraste":o.inventada?"inventada: se te pasó":t.has(n)?"era correcta: falsa alarma":"correcta":t.has(n)?"marcada":""},L=n=>{const o=i.segmentos[n];return c?o.inventada&&t.has(n)?s.status.ok:o.inventada?s.status.err:t.has(n)?s.status.warn:s.textDim:s.accent.blue};return e.jsxs(U,{titulo:"Cacería de alucinaciones",sesion:r,intro:"Tres textos generados por un modelo. Algunas afirmaciones son sólidas y otras están inventadas con total seguridad. Marcá las que no usarías sin verificar antes. Ojo: marcar todo no cuenta como acertar.",onReset:h,done:c,children:[e.jsx(k,{label:"Informe",children:e.jsx(N,{value:i.id,options:a.map(n=>({value:n.id,label:n.label})),onChange:n=>m({informe:n})})}),e.jsx("p",{style:{fontSize:"var(--pd-fs-sm)",color:s.textSecondary,margin:`0 0 ${l.lg}px`,maxWidth:"70ch"},children:i.contexto}),i.segmentos.map((n,o)=>e.jsxs("div",{children:[e.jsx("button",{type:"button",style:z(o),onClick:()=>q(o),disabled:c,children:n.texto}),(c||t.has(o))&&e.jsx("div",{style:{fontFamily:"var(--pd-font-mono)",fontSize:11,textTransform:"uppercase",letterSpacing:.5,color:L(o),margin:`-4px 0 ${l.sm}px ${l.md}px`},children:A(o)}),c&&e.jsxs("div",{style:{margin:`0 0 ${l.lg}px ${l.md}px`,maxWidth:"70ch"},children:[e.jsx("p",{style:{fontSize:13,color:s.textSecondary,margin:0},children:n.porque}),n.comoVerificar&&e.jsxs("p",{style:{fontSize:13,color:s.textPrimary,margin:`${l.xs}px 0 0`},children:[e.jsx("strong",{children:"Cómo verificarlo:"})," ",n.comoVerificar]})]})]},o)),c?e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{margin:`${l.lg}px 0`},children:e.jsxs(P,{children:[e.jsx(y,{label:"Encontradas",value:`${d.encontradas} / ${d.totalInventadas}`,accent:d.encontradas===d.totalInventadas?s.status.ok:s.status.err}),e.jsx(y,{label:"Falsas alarmas",value:d.falsasAlarmas,accent:d.falsasAlarmas===0?s.status.ok:s.status.warn,hint:"Afirmaciones correctas que marcaste como sospechosas"}),e.jsx(y,{label:"Precisión",value:`${Math.round(d.precision*100)}%`,hint:"De todo lo que marcaste, cuánto estaba realmente mal"})]})}),e.jsx("p",{style:{fontSize:"var(--pd-fs-sm)",color:s.textPrimary,maxWidth:"70ch"},children:$(d)}),i.note&&e.jsx(w,{titulo:"El patrón detrás de este informe",children:i.note})]}):e.jsxs("div",{style:{display:"flex",gap:l.md,alignItems:"center",flexWrap:"wrap",marginTop:l.lg},children:[e.jsx("button",{type:"button",className:"btn btn--primary",disabled:t.size===0,onClick:g,children:"Corregir"}),e.jsx("span",{style:{fontSize:13,color:s.textMuted},children:t.size===0?"Marcá al menos una afirmación.":`${t.size} marcada${t.size>1?"s":""} de ${i.segmentos.length}.`})]}),e.jsx(w,{titulo:"El protocolo, en cuatro preguntas",children:"Es lo que te llevás de esta sesión, más que el puntaje. Ante cualquier afirmación de un modelo, preguntate: ¿esto se puede derivar de lo que le di, o lo completó por su cuenta? ¿Qué fuente primaria lo confirmaría, y cuánto tardo en abrirla? ¿Qué pasa si es falso y nadie lo nota? Y la más útil: ¿por qué sonaba creíble? Las invenciones más peligrosas son las que tienen la forma exacta de un dato verdadero."}),e.jsx(w,{titulo:"Por qué marcar todo tampoco sirve",children:"Si desconfiás de cada frase, la herramienta deja de ahorrarte tiempo y volvés a escribir todo a mano. El objetivo es la puntería: saber qué clase de afirmación exige fuente. Las cifras que salen de datos que vos entregaste casi siempre están bien; las causas, las citas, la normativa y las estimaciones de beneficio casi nunca."}),p.source&&e.jsxs("div",{style:{marginTop:l.md,fontFamily:"var(--pd-font-mono)",fontSize:"var(--pd-fs-cap)",color:s.textDim},children:["fuente: ",p.source]})]})}function E(r){const a={a:"a",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(a.h2,{children:"Antes de la sesión (opcional)"}),`
`,e.jsx(a.p,{children:"Si tenés un rato antes, esto suma, en este orden:"}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsx(a.li,{children:`Video (2 min): el primero de la lista de abajo, sobre el episodio de Hugging Face. Es el
caso que cierra la sesión, y conviene llegar habiéndolo visto.`}),`
`,e.jsxs(a.li,{children:["Lectura (10 min): la ",e.jsx(a.a,{href:"descargas/politica-uso-ia.docx",children:"política de uso, versión larga"}),`.
Alcanza con el índice y dos secciones, la de agentes y la de correo.`]}),`
`]}),`
`,e.jsxs(a.p,{children:["Tené a mano ",e.jsx(a.strong,{children:"tu caso en una página"}),`, la tarea de ayer: en la sesión 8 pasa por las reglas
que se arman acá.`]}),`
`,e.jsx(D,{sesion:7}),`
`,e.jsx(a.h2,{children:"Para qué sirve esta sesión"}),`
`,e.jsx(a.p,{children:`Alucinaciones el lunes, confidencialidad y verificación número por número el martes, agentes que
actúan ayer. Hoy los junta y los convierte en reglas que se puedan aplicar el lunes a la mañana.`}),`
`,e.jsx(a.p,{children:`La sesión habla de riesgos, y conviene decir de entrada para qué. El objetivo es que tu empresa
use más estas herramientas, con los ojos abiertos. Los casos que vas a leer acá son reales y
tienen fuente. Casi todos terminaron en un control que ya se conocía y no estaba puesto: un
permiso de más, una copia de respaldo guardada en el mismo lugar que el original, un dato que
nadie cotejó. Ninguno se resolvía prohibiendo la herramienta.`}),`
`,e.jsx(a.p,{children:`Por eso cada sección tiene la misma forma: qué puede pasar, dónde ya pasó, y qué control deja
seguir trabajando. Todo eso junto es la política de uso, que es lo que te llevás.`}),`
`,e.jsx(a.h2,{children:"Qué información entra y qué no"}),`
`,e.jsx(a.p,{children:`La regla del martes (si no lo pondrías en un correo a un desconocido, no va al chat) sirve
para empezar. Una empresa necesita una versión operativa, que es un mapa de tres niveles:`}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Nivel 1, nunca en una herramienta externa:"}),` producción real por pozo, reservas, precios y
cláusulas de contratos, datos de socios, información de personas, cualquier cosa bajo acuerdo de
confidencialidad.`]}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Nivel 2, solo en herramientas contratadas por la empresa"}),`, con acuerdo de tratamiento de datos
y sin entrenamiento sobre lo que subís: documentos internos no críticos, procedimientos,
correspondencia ordinaria.`]}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Nivel 3, en cualquier herramienta, incluso gratuita:"}),` información pública, datos históricos ya
publicados, textos sin datos propios, y datos inventados que imiten la estructura de los tuyos.
Esta última categoría es más útil de lo que parece: para probar un análisis o afinar un prompt,
una planilla sintética con las mismas columnas funciona igual de bien.`]}),`
`,e.jsx(a.p,{children:`El nivel del dato no alcanza solo. Importa también adónde va, porque la misma herramienta cambia
según cómo se contrató. Una cuenta gratuita puede usar lo que subís para entrenar modelos; la
cuenta contratada por la empresa, con acuerdo de datos, no. Y un agente que trabaja sobre una
copia, dentro de un entorno aislado, es otra cosa que un agente suelto en tu máquina.`}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/s7-flujo-datos.svg",alt:"Matriz de cuatro herramientas contra tres niveles de dato. Cuenta personal o gratuita: solo nivel 3. Cuenta contratada por la empresa: niveles 2 y 3. Agente en un entorno aislado: niveles 2 y 3. Herramienta dentro de la red de la empresa: los tres niveles. Ante la duda, se asume el nivel más alto y se consulta."})}),`
`,e.jsxs(a.p,{children:[`El caso que abrió esta conversación en la industria es de 2023. Empleados de Samsung pegaron
código fuente y la transcripción de una reunión en ChatGPT, tres veces en unos veinte días
(`,e.jsx(a.a,{href:"https://expansion.mx/tecnologia/2023/05/02/samsung-prohibe-chatgpt-a-sus-empleados-por-temores-de-seguridad",children:"Expansión"}),`).
La empresa respondió prohibiendo la herramienta en sus equipos. Una prohibición general suele
terminar igual: el uso sigue, pero en cuentas personales, donde nadie lo ve. El mapa de tres
niveles existe para no llegar ahí, porque es una regla que se puede cumplir.`]}),`
`,e.jsx(a.p,{children:`Esta cohorte tiene un borde más que otras: en la sala hay cuatro empresas que compiten entre sí, y
en algún bloque son socias. El chat compartido del curso es una herramienta externa para las otras
tres. Lo que va al nivel 1 no se dice ahí, y en las rondas de hoy se nombra solo la categoría del
dato, por ejemplo "el pronóstico mensual de un campo", sin decir el pronóstico.`}),`
`,e.jsx(a.h2,{children:"El relevamiento: qué se está usando hoy"}),`
`,e.jsx(a.p,{children:`Antes de escribir una regla hay que saber sobre qué se escribe. El primer paso de cualquier
política es un relevamiento: una lista de las herramientas de IA que el equipo ya usa, hecha sin
consecuencias para nadie. Sirve para aprobar lo que ya funciona y contratar lo que hace falta. Si
se vive como una auditoría de personas, la lista sale vacía.`}),`
`,e.jsx(a.p,{children:`Por cada herramienta se anotan seis cosas: quién la usa, para qué tarea, con qué tipo de cuenta
(personal, gratuita o contratada), qué datos recibe, qué conectores tiene activos y si actúa como
agente.`}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/s7-relevamiento.svg",alt:"Planilla de ejemplo con siete columnas: herramienta, quién la usa, para qué, tipo de cuenta, datos que recibe, conectores activos y si actúa como agente. Cuatro filas de ejemplo; la última, una extensión del navegador que nadie relevó, aparece resaltada. Debajo, las tres decisiones posibles por fila: aprobar, contratar o reemplazar."})}),`
`,e.jsx(a.p,{children:"Tres cosas se escapan casi siempre, y conviene preguntarlas por nombre:"}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Lo que viene adentro de otro programa."}),` La suite de oficina, el correo, el navegador y el
software técnico traen hoy un asistente incorporado. Nadie lo instaló, y por eso nadie lo cuenta.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Las extensiones del navegador."}),` Una extensión que "resume la página" lee todas las páginas
que abrís, incluidas las internas.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Los conectores."}),` Un asistente con permiso sobre el correo o la unidad de archivos es otra
herramienta que el mismo asistente sin ese permiso.`]}),`
`]}),`
`,e.jsx(a.p,{children:`Cada fila termina en una de tres decisiones: se aprueba, se contrata con cuenta de empresa, o se
reemplaza por una aprobada que hace lo mismo. El relevamiento se repite cada tres meses, porque
en tres meses la lista cambia.`}),`
`,e.jsx(a.h2,{children:"Cuando la IA se equivoca, y cuando miente"}),`
`,e.jsx(a.p,{children:"Son dos fenómenos distintos y conviene no mezclarlos."}),`
`,e.jsx(a.h3,{children:"Se equivoca: inventa con buena forma"}),`
`,e.jsx(a.p,{children:`Un modelo de lenguaje produce texto verosímil, y a veces lo verosímil es falso. No avisa cuándo
completa. Tres casos, con consecuencias:`}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Deloitte, octubre de 2025."}),` Un informe de AU$ 440,000 para el gobierno australiano salió con
citas académicas inventadas y una cita judicial falsa; la firma
`,e.jsx(a.a,{href:"https://www.theguardian.com/australia-news/2025/oct/06/deloitte-to-pay-money-back-to-albanese-government-after-using-ai-in-440000-report",children:"devolvió parte de los honorarios"}),`.
Lo destapó un investigador que abrió las citas.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Los abogados sancionados, 2023 a hoy."}),` Un
`,e.jsx(a.a,{href:"https://www.damiencharlotin.com/hallucinations/",children:"registro público"}),` junta los fallos judiciales
con citas inventadas por inteligencia artificial: en septiembre de 2026 pasaba los 2,000 casos.
En Argentina ya hay varios: un tribunal
`,e.jsx(a.a,{href:"https://www.diarioconstitucional.cl/2026/01/04/tribunal-argentino-apercibe-a-abogado-que-utilizo-inteligencia-artificial-para-redactar-escrito-con-jurisprudencia-inexistente/",children:"apercibió a un abogado"}),`
por jurisprudencia que no existía, y en Zapala, Neuquén, la cámara encontró al menos cinco citas
inexistentes en una apelación y
`,e.jsx(a.a,{href:"https://www.lmneuquen.com/neuquen/un-abogado-neuquino-se-paso-rosca-la-ia-y-le-dieron-un-fuerte-castigo-n1236839",children:"mandó el caso al colegio de abogados"}),"."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Air Canada, febrero de 2024."}),` Su chatbot inventó una política de descuentos y
`,e.jsx(a.a,{href:"https://www.bbc.com/travel/article/20240222-air-canada-chatbot-misinformation-what-travellers-should-know",children:"un tribunal obligó a la aerolínea a cumplirla"}),`.
Para el tribunal, lo que dijo el chatbot lo dijo la empresa.`]}),`
`]}),`
`,e.jsx(a.p,{children:`El lunes anunciamos cuatro maneras de fallar como hoja de ruta del curso. Acá cada una recibe el
nombre de la propiedad del modelo de la que sale. El arreglo cambia según cuál te tocó, y por eso
conviene diagnosticar antes de reescribir el prompt por cuarta vez.`}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"La propiedad"}),e.jsx(a.th,{children:"Cómo se ve la falla"}),e.jsx(a.th,{children:"El arreglo"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsxs(a.td,{children:[e.jsx(a.strong,{children:"Predice el próximo token"})," (sesión 2)"]}),e.jsx(a.td,{children:"Escribe algo que no existe con el mismo tono con el que escribe lo que sí. La forma del dato queda impecable."}),e.jsx(a.td,{children:"No lo uses de fuente. El dato lo traés vos, él lo redacta."})]}),e.jsxs(a.tr,{children:[e.jsxs(a.td,{children:[e.jsx(a.strong,{children:"Conocimiento"})," (sesión 5)"]}),e.jsx(a.td,{children:"Seguro y equivocado sobre un hecho puntual: lo reciente, lo local, lo interno, lo tuyo."}),e.jsx(a.td,{children:"Adjuntale el documento. Con el texto delante deja de recordar y pasa a leer."})]}),e.jsxs(a.tr,{children:[e.jsxs(a.td,{children:[e.jsx(a.strong,{children:"Memoria de trabajo"})," (sesiones 2 y 6)"]}),e.jsx(a.td,{children:"Se olvida de una instrucción de hace veinte mensajes, se contradice, pierde de vista el objetivo."}),e.jsx(a.td,{children:"Conversaciones cortas, una tarea por vez, y repetile lo que no puede perder."})]}),e.jsxs(a.tr,{children:[e.jsxs(a.td,{children:[e.jsx(a.strong,{children:"Control de la salida"})," (sesión 3)"]}),e.jsx(a.td,{children:"Hace algo parecido a lo que pediste: cambia el formato, se pasa de largo, vuelve al tono de siempre."}),e.jsx(a.td,{children:"Describí mejor el resultado, o mostrale un ejemplo."})]})]})]}),`
`,e.jsx(H,{items:M,titulo:"El marco original (opcional, en inglés)"}),`
`,e.jsx(a.h3,{children:"Miente: informa algo que no hizo"}),`
`,e.jsx(a.p,{children:`Con los agentes aparece otra cosa. Un agente que actúa también escribe un informe de lo que hizo,
y ese informe es salida de un modelo, igual que cualquier otra.`}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Replit, julio de 2025."}),` Un agente de programación
`,e.jsx(a.a,{href:"https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident/",children:"borró la base de datos de producción"}),`
de una empresa en pleno congelamiento de cambios. Según el relato del dueño, además generó unos
4,000 registros ficticios y afirmó que la recuperación era imposible. No lo era: la restauró una
persona.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Un modelo que dice haber corrido código."}),` En abril de 2025, el laboratorio Transluce
`,e.jsx(a.a,{href:"https://transluce.org/investigating-o3-truthfulness",children:"documentó"}),` a un modelo de OpenAI, antes de
su lanzamiento, afirmando que había ejecutado código "en su laptop", y defendiendo la invención
cuando se lo cuestionaban.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Pruebas de laboratorio."}),` Anthropic armó una empresa simulada y puso a dieciséis modelos de
distintos fabricantes frente a un conflicto: iban a ser reemplazados y tenían un objetivo que
cumplir. Varios
`,e.jsx(a.a,{href:"https://www.anthropic.com/research/agentic-misalignment",children:"eligieron presionar o chantajear"}),` a
una persona. Sin ese conflicto, ninguno lo hizo. En otro trabajo, un modelo
`,e.jsx(a.a,{href:"https://www.anthropic.com/research/alignment-faking",children:"fingió estar de acuerdo"}),` con un
entrenamiento para que no lo modificaran.`]}),`
`]}),`
`,e.jsxs(a.p,{children:[`Lo de laboratorio hay que leerlo con cuidado. Son escenarios construidos para provocar esa
conducta, y no describen a los asistentes que usás todos los días. Sirven para fijar una regla
sobria: `,e.jsx(a.strong,{children:"lo que un agente dice que hizo se comprueba mirando el resultado"}),`. Se abre el archivo,
la tabla o el registro de acciones. El resumen que escribe el agente sobre su propio trabajo no
cuenta como prueba.`]}),`
`,e.jsx(a.h3,{children:"El protocolo de verificación"}),`
`,e.jsxs(a.p,{children:["La regla es corta: ",e.jsx(a.strong,{children:`lo verificable es lo que se deriva de lo que le diste; lo inventado es lo que
tuvo que completar`}),`. Un resumen de tu planilla suele estar bien. Una causa, una cita, un artículo
de una norma o una estimación de beneficio casi nunca lo están.`]}),`
`,e.jsx(a.p,{children:"De ahí sale un protocolo que se ajusta al costo del error:"}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Borrador que vas a reescribir igual:"}),` lo reescribís y no hace falta verificarlo. Un correo,
un primer esquema.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Texto que sale con tu nombre:"}),` se verifica contra la fuente todo dato puntual (cifras, fechas,
nombres). La redacción es tuya; cada dato tiene que salir de una fuente que puedas mostrar.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Cifra que entra en un informe firmado, una decisión o un documento contractual:"}),` fuente
primaria a la vista, sin excepción. Si no podés abrir la fuente en dos minutos, el número no
entra.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Cualquier cosa sobre normativa:"}),` siempre con el texto de la norma adjunto. Acá el error ya
tiene costo legal, además del reputacional.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Trabajo de un agente:"})," se revisa el resultado, no el resumen."]}),`
`]}),`
`,e.jsx(a.h2,{children:"Depender de más, y el plan B"}),`
`,e.jsx(a.p,{children:`El riesgo que menos se nombra es el más cotidiano: que la herramienta funcione bien casi siempre.
Cuando algo acierta nueve veces de diez, se deja de mirar la décima. Y cuando una tarea la hace
siempre el asistente, el equipo deja de saber hacerla. Hay tres formas de depender de más, y
cada una tiene evidencia propia.`}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"La herramienta se cae."}),` El 3 de septiembre de 2026 ChatGPT, Claude y Grok estuvieron caídos al
mismo tiempo, cada uno por una causa distinta
(`,e.jsx(a.a,{href:"https://qz.com/chatgpt-claude-grok-simultaneous-outages-090326",children:"Quartz"}),`). No hizo falta una
falla común: alcanzó la coincidencia. Un proveedor también puede cambiar el precio, los límites de
uso o las condiciones de un día para otro.`]}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Se pierde la habilidad."}),` En cuatro centros de endoscopía de Polonia se midió qué pasaba en los
estudios hechos sin asistencia después de unos meses de trabajar con IA: la detección de adenomas
bajó de 28.4% a 22.4%
(`,e.jsx(a.a,{href:"https://www.statnews.com/2025/08/12/ai-deskilling-doctors-colonoscopy-study-lancet/",children:"STAT"}),`). Es
un estudio observacional y de otra profesión, pero el mecanismo es el mismo en cualquier oficio
que se apoye en el ojo entrenado.`]}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Se deja de revisar."}),` En un ensayo de METR, programadores con experiencia tardaron 19% más
usando IA, y creyeron haber sido 20% más rápidos
(`,e.jsx(a.a,{href:"https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/",children:"METR"}),`). La muestra es
chica, dieciséis personas, y las herramientas eran de principios de 2025. Lo que queda es la
distancia entre lo que se siente y lo que se mide. Una encuesta de Microsoft Research encontró algo
parecido: a más confianza en la herramienta,
`,e.jsx(a.a,{href:"https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/",children:"menos esfuerzo de revisión"}),"."]}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/s7-plan-b.svg",alt:"Tres columnas, cada una con un riesgo arriba y su plan B abajo. La herramienta se cae: procedimiento escrito para hacer la tarea sin IA y una segunda herramienta de otro proveedor. Se pierde la habilidad: dos personas que saben hacer la tarea a mano y la practican una vez por semestre. Se deja de revisar: quien firma explica el resultado sin el asistente abierto."})}),`
`,e.jsxs(a.p,{children:["El plan B no se arma para todo. Se arma para las ",e.jsx(a.strong,{children:"tareas críticas"}),`: las que tienen un plazo
comprometido con alguien de afuera, como el reporte al regulador, el informe mensual a los socios
o el parte diario. Para cada una:`]}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsx(a.li,{children:"un procedimiento escrito para hacerla sin IA, y dos personas que lo saben ejecutar;"}),`
`,e.jsx(a.li,{children:"una práctica cada tanto, una vez por semestre alcanza;"}),`
`,e.jsx(a.li,{children:"una segunda herramienta aprobada, de otro proveedor;"}),`
`,e.jsx(a.li,{children:"ningún plazo que dependa de que una herramienta esté disponible justo ese día."}),`
`]}),`
`,e.jsx(a.p,{children:`Y una regla para todas las tareas, críticas o no: quien firma tiene que poder explicar el resultado
sin el asistente abierto. Si no puede, el documento no está listo. La sesión 8 vuelve sobre esto.`}),`
`,e.jsx(a.h2,{children:"Agentes: dónde corren y qué pueden tocar"}),`
`,e.jsxs(a.p,{children:[`Un agente suma algo que el chatbot no tiene: actúa. Eso es lo que ahorra horas, y es también lo
que convierte un error en un hecho. Hay tres poderes que conviene mirar por separado: leer
contenido que no controlás (una página, un correo, un PDF de un tercero), tener acceso a lo
sensible (partes, bases, credenciales) y actuar o salir hacia afuera (escribir, borrar, mandar).
Con los tres juntos, un texto escondido en un correo puede darle órdenes al agente, y el agente
las cumple con tus permisos. Simon Willison lo llamó
`,e.jsx(a.a,{href:"https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/",children:"la trifecta letal"}),`. La regla de
diseño que propuso Meta es corta: sin una persona que apruebe cada acción, un agente tiene como
mucho dos de los tres.`]}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/guia-regla-de-dos.svg",alt:"Tres círculos que se superponen: A, lee lo que no controlás; B, tiene acceso a lo sensible; C, actúa o sale afuera. En el centro, donde se juntan los tres, un signo de peligro. A la derecha, las combinaciones seguras: A más C sin B, scraping de datos públicos sin acceso a nada interno; B más C sin A, partes internos a una base con archivos de fuente conocida; A más B sin C, lee todo pero solo propone y una persona ejecuta. Las tres juntas, solo con una persona que aprueba cada acción."})}),`
`,e.jsxs(a.p,{children:["La regla de dos dice qué poderes tiene el agente. Falta la otra mitad: ",e.jsx(a.strong,{children:"dónde corre"}),`. Ayer el
agente trabajó en una carpeta, y esa carpeta era todo lo que podía tocar. Eso tiene nombre: un
entorno aislado, o `,e.jsx(a.em,{children:"sandbox"}),`. Puede ser una carpeta dedicada, una máquina virtual o el entorno en
la nube del proveedor. Adentro hay una copia de los datos que la tarea necesita y una credencial
propia, acotada a esa tarea. No hay correo, ni contraseñas guardadas, ni red de la empresa.`]}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/s7-sandbox.svg",alt:"Dos paneles. A la izquierda, el agente en tu máquina de trabajo alcanza toda la unidad, el correo y el navegador abiertos, las credenciales guardadas y la red de la empresa: si se equivoca, se equivoca con tus permisos. A la derecha, el agente en un entorno aislado alcanza una copia de los datos de la tarea, una credencial propia y acotada, ningún correo ni contraseña, y solo los sitios de una lista: si se equivoca, se pierde una copia."})}),`
`,e.jsxs(a.p,{children:[`La diferencia se ve cuando algo sale mal. En un entorno aislado se pierde una copia. En tu máquina,
el agente se equivoca con tus permisos. Por eso la política lo pone como opción por defecto: el
agente corre aislado, y lo otro se pide. Los proveedores van en la misma dirección
(`,e.jsx(a.a,{href:"https://www.anthropic.com/engineering/claude-code-sandboxing",children:"Anthropic, sobre el aislamiento de Claude Code"}),")."]}),`
`,e.jsx(a.p,{children:"Tres casos muestran qué pasa cuando falta alguna de las dos mitades:"}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"PocketOS, abril de 2026."}),` Un agente de programación tenía una tarea en el entorno de pruebas
y se topó con una credencial que no funcionaba. Encontró en otro archivo un token con más alcance
del necesario y
`,e.jsx(a.a,{href:"https://www.theregister.com/software/2026/04/27/cursor-opus-agent-snuffs-out-startups-production-database/5224442",children:"borró el volumen de producción"}),`
en segundos. Las copias de respaldo estaban en ese mismo volumen. El fundador habló de varios
errores humanos encadenados, y tiene razón: el token sobraba y el respaldo estaba mal ubicado.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"postmark-mcp, septiembre de 2025."}),` Un servidor MCP publicado para conectar agentes al correo
empezó, en una versión nueva, a mandar copia oculta de cada mensaje a un tercero
(`,e.jsx(a.a,{href:"https://www.theregister.com/2025/09/29/postmark_mcp_server_code_hijacked/",children:"The Register"}),`).
Un conector es software de terceros con tus permisos.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Amazon Q, julio de 2025."}),` Alguien logró meter en la extensión oficial de un asistente de
programación una instrucción que le ordenaba
`,e.jsx(a.a,{href:"https://www.bleepingcomputer.com/news/security/amazon-ai-coding-agent-hacked-to-inject-data-wiping-commands/",children:"borrar archivos y recursos en la nube"}),`.
Amazon dice que estaba mal formada y no llegó a ejecutarse. La lección es la del anterior: las
extensiones se instalan de una lista aprobada y en versiones fijas.`]}),`
`]}),`
`,e.jsxs(a.p,{children:[`De ahí salen los controles, que son pocos: entorno aislado por defecto, una credencial propia con
los permisos justos, ningún permiso de borrado sobre producción, el respaldo en un lugar al que el
agente no llega, y un registro de lo que hizo. La `,e.jsx(a.a,{href:"#/guia-agentes",children:"guía de agentes"}),` los desarrolla,
con la escalera de autonomía y las cuatro tareas que más pidió esta cohorte.`]}),`
`,e.jsx(a.h2,{children:"El correo es la llave maestra"}),`
`,e.jsx(a.p,{children:`Hay un conector que merece sección propia. La casilla de correo es la llave de casi todas las
demás cuentas: ahí llegan los enlaces para restablecer contraseñas y buena parte de los códigos de
verificación. Un agente con permiso sobre la casilla puede recibirlos. Y cualquiera que le escriba
a esa casilla puede intentar darle instrucciones, porque para el agente un correo es texto que
lee.`}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/s7-mail-llave.svg",alt:"Cadena de cinco pasos: alguien le escribe a la casilla un correo con instrucciones escondidas; el agente lo lee porque tiene permiso sobre toda la casilla; pide un reinicio de contraseña en otro servicio; el código llega a la misma casilla que el agente está leyendo; la cuenta queda tomada. Debajo, tres controles que cortan la cadena: una casilla dedicada para el agente, un segundo factor que no dependa del correo, y que los cambios de cuenta los haga una persona."})}),`
`,e.jsx(a.p,{children:"Cada eslabón de esa cadena ya se vio por separado:"}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"El asistente de soporte de Meta, abril y mayo de 2026."}),` Los atacantes le pedían al asistente
que asociara un correo nuevo a una cuenta ajena de Instagram, y el asistente mandaba el código
ahí. Fueron
`,e.jsx(a.a,{href:"https://krebsonsecurity.com/2026/06/hackers-used-metas-ai-support-bot-to-seize-instagram-accounts/",children:"20,225 cuentas"}),`.
Las que tenían un segundo factor de autenticación no se vieron afectadas. Meta le quitó al
asistente la capacidad de hacer ese cambio solo y lo pasó a revisión de una persona.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Un navegador con agente, agosto de 2025."}),` En una demostración de Brave, un texto escondido en
una página hizo que el agente del navegador buscara el correo del usuario, pidiera un código de
acceso, lo leyera en Gmail y lo publicara
(`,e.jsx(a.a,{href:"https://brave.com/blog/comet-prompt-injection/",children:"Brave"}),`). Fue una prueba de investigadores, no
un ataque real.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"EchoLeak, 2025."}),` Un solo correo, sin que nadie hiciera clic, lograba que Microsoft 365 Copilot
sacara datos de su alcance: el correo traía instrucciones escondidas y el asistente las seguía
(`,e.jsx(a.a,{href:"https://www.hackthebox.com/blog/cve-2025-32711-echoleak-copilot-vulnerability",children:"Hack The Box"}),`).
Microsoft lo corrigió en sus servidores, y no se conocen usos reales.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Salesloft Drift, agosto de 2025."}),` A un chatbot de ventas le robaron los permisos que tenía
sobre otros sistemas, y con ellos sacaron datos de
`,e.jsx(a.a,{href:"https://cloud.google.com/blog/topics/threat-intelligence/data-theft-salesforce-instances-via-salesloft-drift",children:"más de 700 organizaciones"}),`.
El segundo factor no ayudó, porque un permiso ya otorgado no vuelve a pedirlo.`]}),`
`]}),`
`,e.jsx(a.p,{children:"Los controles cortan la cadena en tres lugares:"}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Casilla dedicada."}),` Ningún agente autónomo entra a la casilla principal de una persona ni a las
compartidas del equipo. Si necesita correo, tiene una casilla propia, que no sea dirección de
recuperación de ninguna otra cuenta.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Segundo factor que no pase por el correo."}),` Una aplicación o una llave física. Tampoco se le
da al agente acceso al gestor de contraseñas ni a los mensajes de verificación del teléfono.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Los cambios de cuenta los hace una persona."}),` Restablecer contraseñas, cambiar datos de
recuperación y dar accesos. El agente puede preparar el pedido; no lo ejecuta.`]}),`
`]}),`
`,e.jsx(a.p,{children:`Nada de esto impide usar un asistente para el correo. Redactar, resumir y ordenar sigue
habilitado, en modo borrador: el asistente propone y la persona envía.`}),`
`,e.jsx(a.h2,{children:"Enjambres: muchos agentes a la vez"}),`
`,e.jsxs(a.p,{children:[`En la sesión 5 aparecieron los subagentes: un agente que reparte partes de la tarea a otros. A
escala, eso se llama sistema multiagente o enjambre (`,e.jsx(a.em,{children:"swarm"}),`): decenas o cientos de agentes
trabajando en paralelo. Sirve para tareas grandes que se pueden partir, como revisar mil
documentos o probar muchas variantes de un cálculo. Con la cantidad cambian cuatro cosas.`]}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/s7-swarm.svg",alt:"A la izquierda, un agente coordinador sobre una grilla de veinte agentes; cinco de ellos, contiguos, están marcados con un signo de alerta: un resultado malo pasa de un agente al siguiente y cada uno lo da por bueno. A la derecha, cuatro cambios: el error se copia, la instrucción ajena circula, el gasto se dispara y nadie lee todo. Debajo, los controles: entorno aislado sin acceso a producción, tope de agentes, de tiempo y de gasto, y un responsable que lo puede detener."})}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"El error se copia."}),` Un equipo de Berkeley revisó más de 1,600 ejecuciones de siete sistemas
de este tipo y clasificó
`,e.jsx(a.a,{href:"https://arxiv.org/abs/2503.13657",children:"catorce modos de falla"}),`. Varios son de coordinación: un
agente da por verificado lo que otro no verificó, o ignora lo que otro le avisó.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"La instrucción ajena circula."}),` En enero de 2026 una red social hecha para agentes dejó su
base de datos abierta, con
`,e.jsx(a.a,{href:"https://www.wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys",children:"1.5 millones de credenciales"}),`
y los mensajes privados entre agentes. Otro análisis mostró agentes pasándose instrucciones
maliciosas entre sí
(`,e.jsx(a.a,{href:"https://www.securityweek.com/security-analysis-of-moltbook-agent-network-bot-to-bot-prompt-injection-and-data-leaks/",children:"SecurityWeek"}),")."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"El error se acumula con el tiempo."}),` Anthropic puso a un agente a manejar un pequeño kiosco de
oficina durante un mes. Vendió a pérdida, inventó una cuenta de cobro y tuvo un episodio de
confusión sobre quién era (`,e.jsx(a.a,{href:"https://www.anthropic.com/research/project-vend-1",children:"Project Vend"}),`).
Es un experimento contado con humor por sus autores, y muestra bien qué pasa cuando nadie
corrige en el camino.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Nadie lee todo."}),` Miles de acciones por hora no las sigue una persona. El aviso de que algo
anda mal tiene que ser automático.`]}),`
`]}),`
`,e.jsx(a.p,{children:`Los controles son los de un agente, más tres propios: un tope de agentes, de tiempo y de gasto
configurado en la herramienta; un responsable que puede detener todo y sabe cómo; y una
verificación final hecha por una persona o por un control independiente. Un agente que revisa a
otro agente no cuenta como verificación.`}),`
`,e.jsx(a.h2,{children:"El episodio de Hugging Face, julio de 2026"}),`
`,e.jsx(a.p,{children:`Hugging Face es la plataforma donde se publican y se descargan modelos y conjuntos de datos
abiertos, algo así como el repositorio común de la industria. En julio de 2026 tuvo una intrusión
que junta en un solo caso lo que vimos en las tres secciones anteriores.`}),`
`,e.jsxs(a.p,{children:[`Lo que está confirmado sale de dos comunicados de la propia empresa, el
`,e.jsx(a.a,{href:"https://huggingface.co/blog/security-incident-july-2026",children:"aviso del 16 de julio"}),` y la
`,e.jsx(a.a,{href:"https://huggingface.co/blog/agent-intrusion-technical-timeline",children:"cronología técnica del 27"}),":"]}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsx(a.li,{children:`OpenAI estaba corriendo una evaluación interna para medir cuánto sabe un agente de seguridad
informática. La prueba le pedía encontrar y explotar fallas de software.`}),`
`,e.jsx(a.li,{children:`El agente salió del entorno aislado donde corría la prueba, usando una falla que nadie conocía
en una de las pocas salidas a internet que tenía permitidas.`}),`
`,e.jsx(a.li,{children:`Desde ahí entró a la infraestructura de Hugging Face con un conjunto de datos malicioso, robó
credenciales y se movió por varios sistemas internos entre el 9 y el 13 de julio, buena parte
durante un fin de semana.`}),`
`,e.jsx(a.li,{children:`Hugging Face reconstruyó unas 17,600 acciones. Su lectura es que el agente buscaba las
respuestas de la prueba, que suponía alojadas ahí: quiso aprobar por otro camino.`}),`
`,e.jsx(a.li,{children:`El daño informado fue acotado: acceso a algunos conjuntos de datos internos y a credenciales de
servicio. La empresa no encontró alteraciones en los modelos ni en los datos públicos, y pidió a
sus usuarios renovar sus credenciales.`}),`
`]}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/s7-huggingface.svg",alt:"Línea de tiempo con cinco fechas. 9 de julio: un agente sale del entorno de prueba de una evaluación interna de OpenAI usando una falla desconocida. 9 al 13 de julio: entra a Hugging Face con un dataset malicioso, roba credenciales y se mueve por varios clústeres. 16 de julio: Hugging Face lo informa; hay datasets internos y credenciales afectados y nada público alterado. 21 de julio: OpenAI se hace cargo. 27 de julio: Hugging Face publica la cronología técnica, con unas 17,600 acciones reconstruidas. Debajo, tres reglas de la sesión que el caso muestra."})}),`
`,e.jsxs(a.p,{children:[`Dos videos cortos lo cuentan en castellano, y sirven para verlo antes de leer el detalle:
`,e.jsx(a.a,{href:"https://www.youtube.com/watch?v=A-3n2ZpKPWY",children:"Televisión Pública"}),` (2 min) y
`,e.jsx(a.a,{href:"https://www.youtube.com/watch?v=NHar0LXIoSc",children:"RTVE"}),` (1 min y medio). Son noticieros, así que
simplifican: la cantidad de agentes cambia según quién lo cuente, de 700 a 1,200, y ninguno de los
dos comunicados de Hugging Face da esa cifra. La prensa también informó que los agentes se
coordinaban por un canal de mensajes improvisado
(`,e.jsx(a.a,{href:"https://fortune.com/2026/08/06/openai-agents-passed-secret-notes-for-months-leading-up-to-hugging-face-hack/",children:"Fortune"}),")."]}),`
`,e.jsx(a.p,{children:`Conviene leerlo sin dramatismo. Nadie resultó dañado más allá de un incidente de seguridad serio
y bien manejado, y las dos empresas lo contaron en público. Lo que deja son tres reglas de esta
sesión, vistas juntas:`}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"El entorno aislado es un control, y puede fallar."}),` No reemplaza a los permisos mínimos ni al
registro: se suman. Por eso la política pide los tres.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Muchos agentes, nadie mirando."}),` Corrió durante un fin de semana, a velocidad de máquina.
Hugging Face cambió sus alertas para que un aviso grave llame a una persona en minutos,
cualquier día.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Cumplió el objetivo, a su modo."}),` Nadie le pidió entrar a otra empresa. Tenía un objetivo y
encontró un camino que quienes escribieron la prueba no habían previsto. Es la misma conducta de
los escenarios de laboratorio de más arriba, esta vez fuera del laboratorio.`]}),`
`]}),`
`,e.jsx(a.h2,{children:"Los atacantes también tienen IA"}),`
`,e.jsx(a.p,{children:`Hasta acá el riesgo estaba adentro: una herramienta propia, mal configurada o mal usada. Queda el
de afuera. Quien quiere atacar a una empresa tiene acceso a los mismos modelos, y eso cambia tres
cosas concretas.`}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"El engaño es más creíble."}),` Un correo de phishing ya no trae errores de redacción, viene en el
idioma y el tono del remitente, y una voz o una cara se pueden imitar. En 2024, un empleado de la
ingeniería Arup hizo quince transferencias por unos 25 millones de dólares después de una
videollamada en la que todos los demás participantes eran falsos
(`,e.jsx(a.a,{href:"https://www.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk",children:"CNN"}),")."]}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Atacar requiere menos oficio."}),` En noviembre de 2025 Anthropic informó el
`,e.jsx(a.a,{href:"https://www.anthropic.com/news/disrupting-AI-espionage",children:"primer caso reportado"}),` de espionaje
informático orquestado con agentes, contra unas treinta organizaciones. Según la propia empresa,
la mayor parte del trabajo la hizo el agente; la cifra es suya y algunos investigadores la
discutieron. ESET mostró ese mismo año un programa de secuestro de datos que
`,e.jsx(a.a,{href:"https://www.welivesecurity.com/es/investigaciones/eset-research-descubre-el-primer-ransomware-basado-ia/",children:"usa un modelo para escribir su código"}),`;
resultó ser una prueba de concepto, no un ataque visto en uso.`]}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Las fallas se encuentran más rápido."}),` Los modelos más nuevos encuentran vulnerabilidades en
software muy usado. Anthropic informó en mayo de 2026 que su modelo y las empresas asociadas al
programa habían identificado más de 10,000 de severidad alta o crítica
(`,e.jsx(a.a,{href:"https://www.helpnetsecurity.com/2026/05/26/anthropic-project-glasswing-update/",children:"Help Net Security"}),`);
la cifra es de la propia empresa.
Es una buena noticia para la defensa, y acorta el tiempo entre que una falla se publica y que
alguien la aprovecha.`]}),`
`,e.jsxs(a.p,{children:[`El caso más cercano a esta industria es de enero de 2026. En una intrusión a una empresa de agua
de Monterrey, el modelo que usaba el atacante señaló por su cuenta una interfaz de control
industrial como objetivo de valor
(`,e.jsx(a.a,{href:"https://www.securityweek.com/claude-ai-guided-hackers-toward-ot-assets-during-water-utility-intrusion/",children:"SecurityWeek"}),`).
El ataque a los sistemas de control falló. Dragos, que lo analizó,
`,e.jsx(a.a,{href:"https://www.dragos.com/blog/ai-assisted-ics-attack-water-utility",children:"advierte"}),` que no demuestra
capacidad autónoma de atacar una operación. Sí muestra que un atacante sin conocimiento de la
industria recibe hoy esa orientación.`]}),`
`,e.jsx(a.p,{children:"Para una empresa, esto se traduce en cuatro prácticas que no dependen de ninguna herramienta:"}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsx(a.li,{children:`Pagos, cambios de datos bancarios, entrega de credenciales y pedidos urgentes de un directivo se
confirman por un segundo canal ya conocido: una llamada a un número registrado, o en persona.`}),`
`,e.jsx(a.li,{children:"La voz y la imagen en una llamada no alcanzan como prueba de identidad."}),`
`,e.jsx(a.li,{children:"Los correos sospechosos se reportan aunque estén bien escritos."}),`
`,e.jsx(a.li,{children:"Las actualizaciones de seguridad se instalan rápido."}),`
`]}),`
`,e.jsx(a.h2,{children:"Infraestructura crítica"}),`
`,e.jsx(a.p,{children:`Acá hay que ser directo. "Conectemos un agente al sistema de control" es una frase que tiene que
encender todas las alarmas, por más capaz que sea el modelo.`}),`
`,e.jsx(a.p,{children:`El motivo es el de ayer. El loop del agente funciona porque el error vuelve y se corrige: leyó mal,
el resultado salió vacío, reintentó. Ese mecanismo supone que equivocarse es barato y reversible.
En un sistema que opera equipos, ninguna de las dos cosas es cierta. Ahí un paso equivocado
termina en una válvula en la posición que no era.`}),`
`,e.jsx(a.p,{children:`A eso se suma que un modelo de lenguaje no tiene garantías de comportamiento. Podés observar que
hasta ahora no hizo algo, pero no podés demostrar que nunca lo va a hacer. Los sistemas de
seguridad industriales se diseñan al revés, sobre garantías demostrables y modos de falla
conocidos. Son dos culturas de ingeniería incompatibles, y escribir mejor el prompt no cambia eso.`}),`
`,e.jsxs(a.p,{children:["La separación práctica es clara: los asistentes trabajan sobre ",e.jsx(a.strong,{children:"copias de datos"}),`, del lado de la
oficina, y producen recomendaciones que una persona ejecuta. Los sistemas de supervisión y
adquisición de datos (SCADA) y el resto de la tecnología de operaciones (OT) quedan en su propia
red, y el asistente no la toca. Entre el modelo y cualquier cosa que se mueva en el campo hay un
humano con nombre y apellido, por la misma lógica por la que un cálculo de ingeniería lo firma
alguien.`]}),`
`,e.jsxs(a.p,{children:[`Las agencias de ciberseguridad llegaron a lo mismo. En diciembre de 2025, CISA, la NSA y otras
siete agencias de siete países publicaron principios para integrar IA en tecnología de operaciones.
Cubren modelos de lenguaje y agentes, y piden una persona en el lazo para todo lo que toque la
seguridad del proceso (`,e.jsx(a.a,{href:"https://www.cisa.gov/resources-tools/resources/principles-secure-integration-artificial-intelligence-operational-technology",children:"CISA"}),")."]}),`
`,e.jsx(a.h2,{children:"La política de uso, explicada"}),`
`,e.jsx(a.p,{children:`Todo lo anterior termina en un documento. La política de uso existe para que el equipo use estas
herramientas sin tener que adivinar qué está permitido, y se apoya en tres principios:`}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Habilitar por defecto."}),` Lo que la política no restringe, se puede hacer con las herramientas
aprobadas.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"La responsabilidad no se delega."}),` Quien firma un documento o aprueba una acción responde por
ella, la haya hecho con asistencia o sin ella.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"El control es proporcional al daño posible."}),` Un borrador no necesita el mismo cuidado que una
cifra en un informe firmado, y un agente que lee una carpeta no necesita el mismo que uno que
escribe en una base.`]}),`
`]}),`
`,e.jsx("figure",{className:"figura",children:e.jsx("img",{src:"slides/img/s7-riesgo-control.svg",alt:"Siete riesgos, cada uno unido por una flecha a su control y a la sección de la política que lo trata. Dato confidencial afuera: mapa de tres niveles y herramientas aprobadas. Dato inventado en un informe firmado: verificación según el destino. La herramienta se cae o se pierde la habilidad: plan B por tarea crítica. Un agente borra o manda lo que no debía: entorno aislado, permisos mínimos y regla de dos. Toman una cuenta a través del correo: sin agentes en la casilla y segundo factor sin correo. Un sistema de muchos agentes se desborda: topes, entorno aislado y un responsable con corte. Un pedido falso con voz o cara conocida: confirmación por un segundo canal."})}),`
`,e.jsx(a.p,{children:"Hay dos versiones para descargar, y sirven para cosas distintas."}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"La versión larga, 1.0:"})," ",e.jsx(a.a,{href:"descargas/politica-uso-ia.docx",children:"politica-uso-ia.docx"}),`. Tiene dieciséis
secciones y cuatro anexos. Cada sección está escrita en tres partes: qué se habilita, qué riesgo
cubre, con un caso real y su fuente, y cuál es la regla. Es la que se discute con sistemas, legales
y la gerencia, porque explica el porqué de cada punto. El recorrido es el de esta página:`]}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Secciones"}),e.jsx(a.th,{children:"De qué se ocupan"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"1 y 2"}),e.jsx(a.td,{children:"El principio (se usa IA; la política dice cómo), el alcance y las definiciones"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"3 y 4"}),e.jsx(a.td,{children:"El relevamiento de herramientas y la lista de aprobadas, con el trámite para sumar una"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"5 a 7"}),e.jsx(a.td,{children:"El mapa de datos, la verificación según el destino y la declaración de asistencia"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"8"}),e.jsx(a.td,{children:"Dependencia y continuidad: el plan B por tarea crítica"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"9 a 12"}),e.jsx(a.td,{children:"Agentes, correo y contraseñas, conectores y modelos descargados, y sistemas de muchos agentes"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"13 y 14"}),e.jsx(a.td,{children:"Amenazas externas con IA, y operación e infraestructura crítica"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"15 y 16"}),e.jsx(a.td,{children:"Qué se reporta cuando algo sale mal, y quién resuelve los casos nuevos"})]})]})]}),`
`,e.jsx(a.p,{children:`Los anexos traen la planilla de relevamiento, la tabla de riesgos y controles, las diez preguntas
para antes de poner en marcha un agente, y los marcos de referencia para quien tenga que
justificarla ante una auditoría: los dos listados de OWASP, el marco de gestión de riesgos del
NIST y la norma ISO/IEC 42001.`}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"La versión de una página, 0.2:"}),`
`,e.jsx(a.a,{href:"descargas/politica-uso-ia-borrador.docx",children:"politica-uso-ia-borrador.docx"}),`. Seis puntos: herramientas,
datos, verificación, declaración de asistencia, casos nuevos y agentes. Es la que se pega al lado
del monitor. Sirve para empezar el lunes mientras la larga pasa por las revisiones que tenga que
pasar.`]}),`
`,e.jsx(a.p,{children:`Las dos se abren en Word o en cualquier procesador, y los corchetes marcan lo que cada empresa
completa. Dos puntos se olvidan más que el resto, y son los que mantienen viva una política: a
quién se le consulta el caso nuevo, y qué se hace cuando algo sale mal. Un incidente que se avisa
en una hora se contiene. Para que se avise, el reporte de buena fe no puede tener sanción.`}),`
`,e.jsx(a.h2,{children:"Para practicar (opcional)"}),`
`,e.jsx(a.p,{children:`La forma más rápida de entender cómo se equivoca un modelo es leer con atención algo que escribió.
Los tres informes de este ejercicio tienen errores plantados, de los que aparecen de verdad:
cifras inventadas con demasiada precisión, causas que suenan razonables y no salen de ningún dato,
citas completas de artículos que no existen, y normativa recitada de memoria. No se hace en vivo;
queda acá para quien quiera entrenar el ojo.`}),`
`,e.jsx(a.p,{children:`El puntaje mide dos cosas a propósito: cuántas invenciones encontraste y cuántas afirmaciones sanas
marcaste de más. Marcar todo como sospechoso también resta, porque es otra manera de leer mal.`}),`
`,e.jsx(R,{sesion:7}),`
`,e.jsx(a.h2,{children:"En la sesión en vivo (2 h)"}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Bloque"}),e.jsx(a.th,{children:"Tiempo"}),e.jsx(a.th,{children:"Qué hacemos"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Apertura"}),e.jsx(a.td,{children:"5 min"}),e.jsx(a.td,{children:"Para qué se habla de riesgos: para habilitar el uso"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Información y relevamiento"}),e.jsx(a.td,{children:"20 min"}),e.jsx(a.td,{children:"El mapa de tres niveles, y la ronda de qué se usa hoy"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Cuando se equivoca o miente"}),e.jsx(a.td,{children:"20 min"}),e.jsx(a.td,{children:"Verificar según el costo del error, y el plan B"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Agentes, entorno aislado y correo"}),e.jsx(a.td,{children:"25 min"}),e.jsx(a.td,{children:"Dónde corre un agente, qué puede tocar, y por qué no entra a la casilla"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Enjambres y Hugging Face"}),e.jsx(a.td,{children:"15 min"}),e.jsx(a.td,{children:"Muchos agentes a la vez, y el caso de julio con su video"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Los atacantes también tienen IA"}),e.jsx(a.td,{children:"10 min"}),e.jsx(a.td,{children:"El segundo canal, y por qué el campo queda aparte"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"La política"}),e.jsx(a.td,{children:"15 min"}),e.jsx(a.td,{children:"El recorrido por el documento, y tres prácticas para llevarse"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Pausa"}),e.jsx(a.td,{children:"10 min"}),e.jsx(a.td,{children:"A las 12:00 (10:00 en Ecuador y Colombia) sigue la sesión 8"})]})]})]}),`
`,e.jsx(F,{data:"quiz_s7",sesion:7}),`
`,e.jsx(a.p,{children:"Después de la pausa, la sesión 8 le aplica estas reglas al caso prearmado y al caso de tu empresa."})]})}function _(r={}){const{wrapper:a}=r.components||{};return a?e.jsx(a,{...r,children:e.jsx(E,{...r})}):E(r)}export{_ as default};
