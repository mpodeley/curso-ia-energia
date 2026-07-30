import{j as e,L as C,c as s,F as A,S as T,s as l,a as w,b as y,r as D}from"./index-CEwbTdGH.js";import{h as k,a as I,E as M,S as E,Q as F}from"./Quiz-B67ajied.js";function P(r,a){let m=0,f=0,g=0,u=0;r.forEach((c,q)=>{const x=c.inventada===!0,d=a.has(q);x&&u++,x&&d&&m++,!x&&d&&f++,x&&!d&&g++});const p=m+f,h=p===0?0:m/p,i=u===0?0:m/u,t=h+i===0?0:2*h*i/(h+i);return{encontradas:m,falsasAlarmas:f,perdidas:g,totalInventadas:u,precision:h,recall:i,f1:t}}function Q(r){return r.totalInventadas===0?"No había nada que encontrar.":r.encontradas===r.totalInventadas&&r.falsasAlarmas===0?"Las encontraste todas y no marcaste ninguna afirmación sana. Eso es leer con criterio.":r.encontradas===0?"No marcaste ninguna de las invenciones. Fijate abajo qué las delataba: casi siempre es una cifra muy precisa sin fuente.":r.precision<.5?"Marcaste más afirmaciones sanas que invenciones. Desconfiar de todo cuesta tanto tiempo como no desconfiar de nada, y encima no deja lugar para la duda cuando hace falta.":r.encontradas===r.totalInventadas?"Encontraste todas las invenciones, pero te llevaste puestas algunas afirmaciones correctas.":"Encontraste algunas. Las que se te escaparon son las más peligrosas, porque son las que pasarían una revisión."}function N({sesion:r=7}){const{data:a,meta:m,loading:f,error:g}=k(),[u,p,h]=I("hallucination-hunt",{informe:"",marcados:{},corregidos:[]});if(f)return e.jsx(C,{what:"los informes"});if(g||!a||a.length===0)return e.jsx("div",{style:{color:s.status.err},children:"No se pudieron cargar los informes."});const i=a.find(n=>n.id===u.informe)??a[0],t=new Set(u.marcados[i.id]??[]),c=u.corregidos.includes(i.id),q=n=>{if(c)return;const o=new Set(t);o.has(n)?o.delete(n):o.add(n),p({marcados:{...u.marcados,[i.id]:[...o]}})},x=()=>p({corregidos:[...u.corregidos,i.id]}),d=P(i.segmentos,t),S=n=>{const o=i.segmentos[n],b=t.has(n);let j=s.border,v="transparent";return c?o.inventada&&b?(j=s.status.ok,v=s.status.ok+"12"):o.inventada&&!b?(j=s.status.err,v=s.status.err+"12"):!o.inventada&&b&&(j=s.status.warn,v=s.status.warn+"12"):b&&(j=s.accent.blue,v=s.accent.blue+"12"),{display:"block",width:"100%",textAlign:"left",font:"inherit",fontSize:"var(--pd-fs-sm)",color:s.textPrimary,lineHeight:1.6,padding:`${l.sm}px ${l.md}px`,marginBottom:l.sm,border:`1px solid ${j}`,borderLeftWidth:3,borderRadius:D.md,background:v,cursor:c?"default":"pointer"}},L=n=>{const o=i.segmentos[n];return c?o.inventada&&t.has(n)?"inventada — la encontraste":o.inventada?"inventada — se te pasó":t.has(n)?"era correcta — falsa alarma":"correcta":t.has(n)?"marcada":""},$=n=>{const o=i.segmentos[n];return c?o.inventada&&t.has(n)?s.status.ok:o.inventada?s.status.err:t.has(n)?s.status.warn:s.textDim:s.accent.blue};return e.jsxs(M,{titulo:"Cacería de alucinaciones",sesion:r,intro:"Tres textos generados por un modelo. Algunas afirmaciones son sólidas y otras están inventadas con total seguridad. Marcá las que no usarías sin verificar antes — y ojo, marcar todo no cuenta como acertar.",onReset:h,done:c,children:[e.jsx(A,{label:"Informe",children:e.jsx(T,{value:i.id,options:a.map(n=>({value:n.id,label:n.label})),onChange:n=>p({informe:n})})}),e.jsx("p",{style:{fontSize:"var(--pd-fs-sm)",color:s.textSecondary,margin:`0 0 ${l.lg}px`,maxWidth:"70ch"},children:i.contexto}),i.segmentos.map((n,o)=>e.jsxs("div",{children:[e.jsx("button",{type:"button",style:S(o),onClick:()=>q(o),disabled:c,children:n.texto}),(c||t.has(o))&&e.jsx("div",{style:{fontFamily:"var(--pd-font-mono)",fontSize:11,textTransform:"uppercase",letterSpacing:.5,color:$(o),margin:`-4px 0 ${l.sm}px ${l.md}px`},children:L(o)}),c&&e.jsxs("div",{style:{margin:`0 0 ${l.lg}px ${l.md}px`,maxWidth:"70ch"},children:[e.jsx("p",{style:{fontSize:13,color:s.textSecondary,margin:0},children:n.porque}),n.comoVerificar&&e.jsxs("p",{style:{fontSize:13,color:s.textPrimary,margin:`${l.xs}px 0 0`},children:[e.jsx("strong",{children:"Cómo verificarlo:"})," ",n.comoVerificar]})]})]},o)),c?e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{margin:`${l.lg}px 0`},children:e.jsxs(w,{children:[e.jsx(y,{label:"Encontradas",value:`${d.encontradas} / ${d.totalInventadas}`,accent:d.encontradas===d.totalInventadas?s.status.ok:s.status.err}),e.jsx(y,{label:"Falsas alarmas",value:d.falsasAlarmas,accent:d.falsasAlarmas===0?s.status.ok:s.status.warn,hint:"Afirmaciones correctas que marcaste como sospechosas"}),e.jsx(y,{label:"Precisión",value:`${Math.round(d.precision*100)}%`,hint:"De todo lo que marcaste, cuánto estaba realmente mal"})]})}),e.jsx("p",{style:{fontSize:"var(--pd-fs-sm)",color:s.textPrimary,maxWidth:"70ch"},children:Q(d)}),i.note&&e.jsx(E,{titulo:"El patrón detrás de este informe",children:i.note})]}):e.jsxs("div",{style:{display:"flex",gap:l.md,alignItems:"center",flexWrap:"wrap",marginTop:l.lg},children:[e.jsx("button",{type:"button",className:"btn btn--primary",disabled:t.size===0,onClick:x,children:"Corregir"}),e.jsx("span",{style:{fontSize:13,color:s.textMuted},children:t.size===0?"Marcá al menos una afirmación.":`${t.size} marcada${t.size>1?"s":""} de ${i.segmentos.length}.`})]}),e.jsx(E,{titulo:"El protocolo, en cuatro preguntas",children:"Es lo que te llevás de esta sesión, más que el puntaje. Ante cualquier afirmación de un modelo, preguntate: ¿esto se puede derivar de lo que le di, o lo completó por su cuenta? ¿Qué fuente primaria lo confirmaría, y cuánto tardo en abrirla? ¿Qué pasa si es falso y nadie lo nota? Y la más útil: ¿por qué sonaba creíble? Las invenciones peligrosas no son las absurdas, son las que tienen la forma exacta de un dato verdadero."}),e.jsx(E,{titulo:"Por qué marcar todo tampoco sirve",children:"Si desconfiás de cada frase, la herramienta deja de ahorrarte tiempo y volvés a escribir todo a mano. El objetivo no es la desconfianza, es la puntería: saber qué clase de afirmación exige fuente. Las cifras que salen de datos que vos entregaste casi siempre están bien; las causas, las citas, la normativa y las estimaciones de beneficio casi nunca."}),m.source&&e.jsxs("div",{style:{marginTop:l.md,fontFamily:"var(--pd-font-mono)",fontSize:"var(--pd-fs-cap)",color:s.textDim},children:["fuente: ",m.source]})]})}function z(r){const a={em:"em",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(a.h2,{children:"Antes de la sesión"}),`
`,e.jsx(a.p,{children:e.jsx(a.em,{children:"Tiempo estimado: 30–40 minutos."})}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Tarea de la sesión 6:"}),` la afirmación que marcaste en un texto generado. Traela sin veredicto:
la vamos a evaluar entre todos.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Ejercicio de esta página (20 min):"}),` la cacería, los tres informes. Hacelos antes de leer el
resto de la página, porque el ejercicio pierde gracia si sabés qué buscar.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Lectura (10 min):"})," la sección de política de uso de más abajo, para llegar con opinión formada."]}),`
`]}),`
`,e.jsx(a.h2,{children:"Todo el curso venía sembrando esto"}),`
`,e.jsx(a.p,{children:`Alucinaciones en la sesión 2, confidencialidad en la 3, verificación en la 4, agentes que actúan en la
6. Esta sesión los junta y los convierte en reglas que se puedan aplicar un martes a la mañana.`}),`
`,e.jsx(a.h2,{children:"Cazar antes de teorizar"}),`
`,e.jsx(a.p,{children:`La forma más rápida de entender cómo se equivoca un modelo es leer con atención algo que escribió. Los
tres informes del ejercicio tienen errores plantados, y todos son de los que aparecen de verdad: cifras
inventadas con demasiada precisión, causas que suenan razonables y no salen de ningún dato, citas
completas de artículos que no existen, y normativa recitada de memoria.`}),`
`,e.jsx(a.p,{children:`El puntaje mide dos cosas a propósito: cuántas invenciones encontraste y cuántas afirmaciones sanas
marcaste de más. Desconfiar de todo no es prudencia, es otra forma de no leer.`}),`
`,e.jsx(N,{sesion:7}),`
`,e.jsx(a.h2,{children:"El protocolo de verificación"}),`
`,e.jsxs(a.p,{children:["Después de cazar un rato aparece el patrón, y el patrón es la regla: ",e.jsx(a.strong,{children:`lo verificable es lo que se
deriva de lo que le diste; lo inventado es lo que tuvo que completar`}),`. Un resumen de tu planilla
suele estar bien. Una causa, una cita, un artículo de una norma o una estimación de beneficio casi
nunca lo están.`]}),`
`,e.jsx(a.p,{children:"De ahí sale un protocolo corto, que se ajusta al costo del error:"}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Borrador que vas a reescribir igual:"})," no se verifica, se reescribe. Un correo, un primer esquema."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Texto que sale con tu nombre:"}),` se verifica todo dato puntual — cifras, fechas, nombres — contra la
fuente. La prosa es tuya, los datos son de alguien.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Cifra que entra en un informe firmado, una decisión o un documento contractual:"}),` fuente primaria
a la vista, sin excepción. Si no podés abrir la fuente en dos minutos, el número no entra.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Cualquier cosa sobre normativa:"}),` con el texto de la norma adjunto, nunca de memoria. El costo del
error acá es legal, no reputacional.`]}),`
`]}),`
`,e.jsx(a.h2,{children:"Confidencialidad, en concreto"}),`
`,e.jsx(a.p,{children:`La regla del primer día — si no lo pondrías en un correo a un desconocido, no va al chat — alcanza para
empezar y no alcanza para una empresa. La versión operativa es un mapa de tres niveles:`}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Nunca, en ninguna herramienta externa:"}),` producción real por pozo, reservas, precios y cláusulas de
contratos, datos de socios, información de personas, cualquier cosa bajo acuerdo de confidencialidad.`]}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"Solo en herramientas contratadas por la empresa"}),`, con acuerdo de tratamiento de datos y sin
entrenamiento sobre lo que subís: documentos internos no críticos, procedimientos, correspondencia
ordinaria.`]}),`
`,e.jsxs(a.p,{children:[e.jsx(a.strong,{children:"En cualquier herramienta, incluso gratuita:"}),` información pública, datos históricos ya publicados,
textos sin datos propios, y datos inventados que imiten la estructura de los tuyos. Esta última
categoría es más útil de lo que parece: para probar un análisis o afinar un prompt, una planilla
sintética con las mismas columnas funciona igual de bien.`]}),`
`,e.jsx(a.h2,{children:"Infraestructura crítica"}),`
`,e.jsx(a.p,{children:`Acá hay que ser directo. "Conectemos un agente al sistema de control" es una frase que tiene que
encender todas las alarmas, y no porque el modelo sea tonto.`}),`
`,e.jsx(a.p,{children:`El motivo es el de la sesión 6. El loop del agente funciona porque el error vuelve y se corrige: leyó
mal, el resultado salió vacío, reintentó. Ese mecanismo supone que equivocarse es barato y reversible.
En un sistema que opera equipos, ninguna de las dos cosas es cierta. Un paso equivocado no vuelve como
mensaje de error: vuelve como una válvula en la posición que no era.`}),`
`,e.jsx(a.p,{children:`A eso se suma que un modelo de lenguaje no tiene garantías de comportamiento. No podés demostrar que
nunca va a hacer algo; podés observar que hasta ahora no lo hizo. Los sistemas de seguridad
industriales se diseñan al revés, sobre garantías demostrables y modos de falla conocidos. Son dos
culturas de ingeniería incompatibles, y la incompatibilidad no se arregla con un prompt mejor.`}),`
`,e.jsxs(a.p,{children:["La separación práctica es clara: los asistentes trabajan sobre ",e.jsx(a.strong,{children:"copias de datos"}),`, del lado de la
oficina, y producen recomendaciones que una persona ejecuta. Entre el modelo y cualquier cosa que se
mueva en el campo hay un humano con nombre y apellido. Eso no es desconfianza en la tecnología, es la
misma lógica por la que un cálculo de ingeniería lo firma alguien.`]}),`
`,e.jsx(a.h2,{children:"La política de uso, en una página"}),`
`,e.jsx(a.p,{children:`Salimos de la sesión con un borrador editable que cubre cinco puntos: qué herramientas están
aprobadas y cuáles no; el mapa de datos de tres niveles de más arriba; el protocolo de verificación
según el destino del texto; qué hay que declarar cuando un documento se hizo con asistencia; y a quién
se le consulta cuando aparece un caso nuevo. Ese último punto es el que más se olvida y el que hace
que la política siga viva.`}),`
`,e.jsx(a.h2,{children:"En la sesión en vivo (2 h)"}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Bloque"}),e.jsx(a.th,{children:"Tiempo"}),e.jsx(a.th,{children:"Qué hacemos"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Sus casos"}),e.jsx(a.td,{children:"25 min"}),e.jsx(a.td,{children:"Evaluamos entre todos las afirmaciones que trajeron: ¿inventada, verificable o correcta?"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"El protocolo"}),e.jsx(a.td,{children:"25 min"}),e.jsx(a.td,{children:"Lo armamos según el costo del error, no según el tipo de herramienta"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Datos de la empresa"}),e.jsx(a.td,{children:"25 min"}),e.jsx(a.td,{children:"Clasificamos datos reales del equipo en los tres niveles, discutiendo los casos de borde"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Agentes y operación"}),e.jsx(a.td,{children:"25 min"}),e.jsx(a.td,{children:"Por qué el loop no sirve donde el error no es reversible"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"La política"}),e.jsx(a.td,{children:"20 min"}),e.jsx(a.td,{children:"Redactamos el borrador de una página, en vivo"})]})]})]}),`
`,e.jsx(F,{data:"quiz_s7",sesion:7}),`
`,e.jsx(a.h2,{children:"Para discutir"}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsx(a.li,{children:`¿Qué error de inteligencia artificial sería más caro en tu área: uno visible y grosero, o uno sutil
que pasa las revisiones? ¿Cuál es más probable?`}),`
`,e.jsx(a.li,{children:`¿Quién debería poder decidir que una herramienta de este tipo toque datos o sistemas de operación?
¿Existe hoy ese rol?`}),`
`,e.jsx(a.li,{children:`De las afirmaciones que marcaste mal en el ejercicio: ¿qué te hizo dudar de una que era correcta?
Esa señal falsa también cuesta tiempo.`}),`
`]}),`
`,e.jsx(a.h2,{children:"Tarea para la sesión 8"}),`
`,e.jsx(a.p,{children:`Leé el resumen del caso que elegimos en la sesión 5 y anotá dos cosas: qué te gustaría que muestre la
demostración, y qué tendría que pasar para que tu equipo lo use de verdad después del curso. La
segunda pregunta es la difícil.`})]})}function H(r={}){const{wrapper:a}=r.components||{};return a?e.jsx(a,{...r,children:e.jsx(z,{...r})}):z(r)}export{H as default};
