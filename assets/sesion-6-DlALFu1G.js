import{u as E,j as e,L as z,c as n,s,r as x,b as S,d as g}from"./index-BTW5BpMI.js";import{n as T,E as C,S as h,R as A,Q as L}from"./Recursos-CSOxaOn1.js";const P={bash:"terminal",python:"python",respuesta:"respuesta final"};function D(o,a){return o.slice(0,a+1).reduce((d,i)=>d+i.pensamiento.length+i.entrada.length+i.salida.length,0)}const v={fontFamily:"var(--pd-font-mono)",fontSize:13,whiteSpace:"pre-wrap",overflowX:"auto",background:n.surface,border:`1px solid ${n.border}`,borderRadius:x.md,padding:s.md,margin:0};function R({sesion:o=6}){const{data:a,meta:d,loading:i,error:q}=T(),[y,p,f]=E("agent-trace",{paso:0});if(i)return e.jsx(z,{what:"la traza"});if(q||!a||a.pasos.length===0)return e.jsx("div",{style:{color:n.status.err},children:"No se pudo cargar la traza."});const c=a.pasos.length,r=Math.min(Math.max(y.paso,0),c-1),l=a.pasos[r],u=l.estado==="error",j=l.herramienta==="respuesta";return e.jsxs(C,{titulo:"El loop por dentro",sesion:o,intro:"Un agente es un modelo que piensa, ejecuta una herramienta, mira el resultado y vuelve a pensar. Recorré la traza paso a paso y mirá la mecánica, incluido el momento en que se equivoca.",onReset:f,children:[e.jsxs("div",{style:{background:n.surface,border:`1px solid ${n.border}`,borderRadius:x.md,padding:s.md,marginBottom:s.lg},children:[e.jsx("div",{style:{fontSize:12,color:n.textDim,fontFamily:"var(--pd-font-mono)",textTransform:"uppercase",letterSpacing:.5},children:"Lo que le pidieron"}),e.jsx("div",{style:{fontSize:"var(--pd-fs-sm)",color:n.textPrimary,marginTop:4},children:a.objetivo})]}),e.jsx("div",{style:{display:"flex",gap:4,flexWrap:"wrap",marginBottom:s.lg},children:a.pasos.map((m,t)=>e.jsx("button",{type:"button",title:m.pensamiento.slice(0,80),onClick:()=>p({paso:t}),style:{font:"inherit",fontFamily:"var(--pd-font-mono)",fontSize:12,width:30,height:30,borderRadius:x.sm,cursor:"pointer",border:`1px solid ${t===r?n.accent.blue:m.estado==="error"?n.status.err:n.border}`,background:t===r?n.accent.blue+"15":t<r?n.surfaceAlt:n.surface,color:t===r?n.accent.blue:m.estado==="error"?n.status.err:n.textMuted,fontWeight:t===r?700:400},children:t+1},t))}),e.jsxs("div",{style:{display:"flex",gap:s.sm,alignItems:"center",marginBottom:s.lg,flexWrap:"wrap"},children:[e.jsx("button",{type:"button",className:"tbtn",disabled:r===0,onClick:()=>p({paso:r-1}),children:"← Anterior"}),e.jsx("button",{type:"button",className:"tbtn",disabled:r===c-1,onClick:()=>p({paso:r+1}),children:"Siguiente →"}),e.jsxs("span",{style:{fontSize:13,color:n.textMuted},children:["Paso ",r+1," de ",c]})]}),e.jsxs("div",{style:{marginBottom:s.md},children:[e.jsx("div",{style:{fontSize:12,color:n.textDim,fontFamily:"var(--pd-font-mono)",textTransform:"uppercase",letterSpacing:.5,marginBottom:4},children:"Piensa"}),e.jsx("p",{style:{margin:0,fontSize:"var(--pd-fs-sm)",color:n.textPrimary,maxWidth:"70ch"},children:l.pensamiento})]}),!j&&e.jsxs("div",{style:{marginBottom:s.md},children:[e.jsxs("div",{style:{fontSize:12,color:n.textDim,fontFamily:"var(--pd-font-mono)",textTransform:"uppercase",letterSpacing:.5,marginBottom:4},children:["Ejecuta · ",P[l.herramienta]]}),e.jsx("pre",{style:v,children:l.entrada})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:12,color:u?n.status.err:n.textDim,fontFamily:"var(--pd-font-mono)",textTransform:"uppercase",letterSpacing:.5,marginBottom:4},children:j?"Responde":u?"Observa: no era lo que esperaba":"Observa"}),e.jsx("pre",{style:{...v,borderColor:u?n.status.err:n.border},children:l.salida})]}),u&&e.jsx("p",{style:{fontSize:"var(--pd-fs-sm)",color:n.status.err,marginTop:s.md,maxWidth:"70ch"},children:"Acá el agente se equivocó: dio por sentado cómo se escribía el nombre del área. Fijate en el paso siguiente qué hace con el error: va a mirar los datos."}),e.jsx("div",{style:{marginTop:s.lg},children:e.jsxs(S,{children:[e.jsx(g,{label:"Paso",value:`${r+1} / ${c}`,hint:"Cada paso es una vuelta completa del loop"}),e.jsx(g,{label:"Contexto acumulado",value:D(a.pasos,r).toLocaleString("en-US"),unit:"caracteres",hint:"Todo lo anterior viaja en cada llamada. Por eso los agentes se vuelven lentos y caros en tareas largas."})]})}),e.jsxs(h,{titulo:"El loop, en una línea",children:["Objetivo → pensar qué falta → elegir una herramienta → ejecutarla → mirar el resultado → repetir hasta poder responder. Lo que el agente agrega sobre un chatbot es la capacidad de ",e.jsx("em",{children:"ejecutar"})," y de",e.jsx("em",{children:"mirar lo que salió"}),". Eso lo vuelve útil, y también riesgoso."]}),e.jsx(h,{titulo:"Qué mirar en esta traza",children:"Tres cosas. Primero, antes de escribir código el agente mira qué hay. Segundo, cuando el filtro devuelve cero, va a buscar los valores reales y encuentra que el área lleva diéresis. Tercero, en la respuesta final aclara qué no verificó. Se enteró de que se había equivocado porque ve el resultado de cada paso; un modelo que no puede ejecutar no tiene cómo enterarse."}),e.jsx(h,{titulo:"Dónde esto se vuelve peligroso",children:"Todo lo que hace este agente es reversible: lee archivos y escribe un gráfico. El problema aparece cuando las herramientas dejan de ser de lectura: mandar un correo, cerrar una válvula, escribir en un sistema de control. El loop es el mismo, pero un paso equivocado ya no se corrige mirando la salida. De eso va la sesión 7."}),d.source&&e.jsxs("div",{style:{marginTop:s.md,fontFamily:"var(--pd-font-mono)",fontSize:"var(--pd-fs-cap)",color:n.textDim},children:["fuente: ",d.source]})]})}function b(o){const a={a:"a",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a.h2,{children:"Antes de la sesión (opcional)"}),`
`,e.jsx(a.p,{children:`Esta sesión no pide tarea: arranca después de la pausa de la sesión 5. Si tenés un rato antes, la
traza del agente de esta página se recorre sola, paso a paso. Y conviene tener en la cabeza una
tarea tuya que hoy te lleve varios pasos con herramientas distintas: es la ronda del segundo
bloque.`}),`
`,e.jsx(A,{sesion:6}),`
`,e.jsx(a.h2,{children:"Qué es un agente"}),`
`,e.jsx(a.p,{children:`Un agente es un modelo de lenguaje metido en un loop, con permiso para usar herramientas. Piensa qué
le falta, ejecuta una acción, mira el resultado y vuelve a pensar. Repite hasta poder responder.`}),`
`,e.jsxs(a.p,{children:[`Debajo está el mismo modelo que predice el próximo token, el de la sesión 2, con dos agregados.
Puede `,e.jsx(a.strong,{children:"ejecutar"})," (correr un comando, leer un archivo, buscar en internet) y puede ",e.jsx(a.strong,{children:`mirar lo que
salió`}),`. Un chatbot que se equivoca no se entera nunca. Un agente que se equivoca recibe el error de
vuelta y tiene la chance de corregirse.`]}),`
`,e.jsx(a.p,{children:`Esa vuelta del resultado es lo que le permite trabajar por su cuenta, y es también el motivo por el
que hay que pensar bien qué herramientas se le dan.`}),`
`,e.jsx(a.h2,{children:"La traza, paso a paso"}),`
`,e.jsx(a.p,{children:`Abajo está una corrida sobre el mismo conjunto de datos de producción de ayer, el Capítulo IV
argentino. El paso más interesante es el tercero, donde el agente filtra por el nombre del área,
escribe "AGUARAGUE" sin diéresis y le vuelven cero filas.`}),`
`,e.jsx(a.p,{children:`Mirá qué hace con eso. En vez de reintentar a ciegas o inventar un resultado para seguir adelante,
va a buscar los valores que existen de verdad en la columna, encuentra que el área lleva diéresis,
corrige y continúa. Un chatbot sin herramientas hubiera seguido escribiendo con total seguridad
sobre una tabla vacía.`}),`
`,e.jsx(R,{sesion:6}),`
`,e.jsx(a.h2,{children:"Qué funciona hoy y qué no"}),`
`,e.jsxs(a.p,{children:["Funcionan bien las tareas ",e.jsx(a.strong,{children:"digitales, acotadas y verificables"}),`: buscar información en muchos
documentos, transformar datos de un formato a otro, escribir y corregir código, automatizar una
secuencia repetitiva de pasos que hoy hacés a mano. La característica común es que el resultado se
puede comprobar rápido.`]}),`
`,e.jsx(a.p,{children:`Funcionan mal las tareas largas y ambiguas. El agente acumula contexto en cada vuelta (el ejercicio
lo muestra con un contador) y a medida que crece, se vuelve más lento, más caro y más propenso a
perder el hilo del objetivo original. Una tarea de veinte pasos sale bastante peor que dos de diez.`}),`
`,e.jsxs(a.p,{children:[`Hay una tercera categoría que en esta industria pesa más que las otras dos: las tareas con
`,e.jsx(a.strong,{children:"consecuencias físicas o irreversibles"}),`. Ahí el loop deja de funcionar, por bueno que sea el
agente. Todo lo que hace el agente del ejercicio es reversible: lee archivos y guarda un gráfico. Si
se equivoca, el error vuelve y se corrige. Cuando la herramienta manda un correo, cierra una válvula
o escribe en un sistema de control, el paso equivocado ya no se corrige mirando la salida. La
diferencia entre un agente que lee y uno que actúa sobre equipos ocupa buena parte de mañana, en la
sesión 7.`]}),`
`,e.jsx("div",{className:"callout",children:e.jsxs(a.p,{children:[e.jsx("strong",{children:"El protocolo de contexto de modelo"}),` (Model Context Protocol, MCP) aparece mucho en
estas conversaciones. Es simplemente una forma estandarizada de conectarle herramientas a un modelo,
para no reescribir la conexión por cada aplicación. Es plomería útil, y lo que un agente puede o
no puede hacer es lo mismo con o sin él.`]})}),`
`,e.jsx(a.h2,{children:"Lo que aprende un agente vive en archivos"}),`
`,e.jsx(a.p,{children:`La sesión de un agente se apaga y el modelo no retiene nada de lo que pasó. Lo que queda se guarda
en archivos: un archivo de instrucciones con las reglas del proyecto (en las herramientas actuales
se llama CLAUDE.md, AGENTS.md o parecido), habilidades empaquetadas que el agente carga cuando las
necesita (las llaman skills), y las conexiones a tus sistemas. A un agente se le enseña por escrito,
en esos archivos, que vienen a ser los prompts de la tarea del martes en versión agente. Y si
mañana cambiás de modelo, esos archivos te siguen sirviendo.`}),`
`,e.jsxs(a.p,{children:["Lo otro que conviene saber es que el techo se mueve. ",e.jsx(a.a,{href:"https://metr.org/time-horizons/",children:"METR"}),`, un
instituto que mide capacidades de modelos, sigue el largo de tarea que un agente completa solo. En
toda su serie, desde 2019, ese largo se duplicó cada unos siete meses, y `,e.jsx(a.a,{href:"https://metr.org/blog/2026-1-29-time-horizon-1-1/",children:`desde
2024`}),` cada unos tres. En mayo de 2026 publicó que
una versión temprana de Claude Mythos Preview completa tareas de al menos 16 horas, el techo de lo
que su conjunto de tareas puede medir. La medición tiene su letra chica (50% de éxito, tareas de
software). Aun así, lo que hoy no delegás porque es largo conviene reevaluarlo en seis meses. La
charla de Barry Zhang que está en los recursos de arriba es la contracara sensata: no armes un
agente para todo, y mantenelo simple.`]}),`
`,e.jsx(a.h2,{children:"Taller: el caso de tu empresa, en una página"}),`
`,e.jsx(a.p,{children:`El último bloque del día es de escritura, por empresa: los de PCR juntos, los de Andes juntos, y CGC
y Tecpetrol cada uno por su cuenta. El punto de partida es el problema que cada uno nombró el lunes,
en la ronda de relevamiento, como el primero que probaría. El resultado es una página que describe
el primer caso de uso que probarían en su empresa, y mañana, en la sesión 8, se critica al lado del
caso prearmado del curso, con el mismo protocolo de verificación. La plantilla tiene cinco
preguntas; una línea o dos por cada una alcanza.`}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Pregunta"}),e.jsx(a.th,{children:"Qué tiene que decir"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:e.jsx(a.strong,{children:"Dolor"})}),e.jsx(a.td,{children:'Qué tarea, cuán seguido se hace, quién la sufre. "Todos los lunes, el ingeniero de producción, tres horas" vale más que "optimizar la gestión".'})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:e.jsx(a.strong,{children:"Datos"})}),e.jsx(a.td,{children:"Dónde viven (planilla, sistema, PDF, correo), en qué formato, quién los tiene. Si hay que pedírselos a otra gerencia, decilo."})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:e.jsx(a.strong,{children:"Sensibilidad"})}),e.jsx(a.td,{children:"Qué puede salir de la empresa y qué no. Lo que no puede salir, ¿tiene un análogo público (Capítulo IV, reporte de la ARCH) para probar el flujo?"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:e.jsx(a.strong,{children:"Verificabilidad"})}),e.jsx(a.td,{children:"Cómo sabrían que el resultado está bien: contra qué se compara, quién lo mira, cuánto tarda comprobarlo. Si comprobar cuesta más que hacer, no es un caso."})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:e.jsx(a.strong,{children:"Primer paso"})}),e.jsx(a.td,{children:"Qué probarían el lunes, con qué herramienta y con qué documento o planilla. Alcanza con un solo paso concreto."})]})]})]}),`
`,e.jsx(a.p,{children:`Los criterios salen de la lista corta con la que la primera edición eligió su caso real:
frecuencia del dolor, datos disponibles y no sensibles, resultado verificable. Los tres tienen que
estar. Un caso doloroso sin datos accesibles no se puede construir, y uno con datos pero sin forma
de comprobar el resultado se construye y no sirve.`}),`
`,e.jsx(a.p,{children:`Por el chat va solo lo que no es confidencial: la fila del dolor y la del primer paso alcanzan para
la ronda. El resto queda en su documento, que mañana leen ustedes en voz alta si quieren, y solo la
parte que quieran.`}),`
`,e.jsx(a.h2,{children:"En la sesión en vivo (2 h)"}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Bloque"}),e.jsx(a.th,{children:"Tiempo"}),e.jsx(a.th,{children:"Qué hacemos"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"El loop del agente"}),e.jsx(a.td,{children:"20 min"}),e.jsx(a.td,{children:"Dónde quedamos antes de la pausa, la traza del ejercicio paso a paso, y después en vivo sobre el Capítulo IV"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Sus tareas"}),e.jsx(a.td,{children:"30 min"}),e.jsx(a.td,{children:"Las cadenas de pasos de cada uno: qué delegarían hoy y qué no"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Dónde se rompe, dónde mejora"}),e.jsx(a.td,{children:"15 min"}),e.jsx(a.td,{children:"Contexto, leer contra tocar, memoria en archivos, la frontera que sube"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Pausa"}),e.jsx(a.td,{children:"10 min"}),e.jsx(a.td,{})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Taller: el caso de tu empresa, en una página"}),e.jsx(a.td,{children:"36 min"}),e.jsx(a.td,{children:"Dolor, datos, sensibilidad, verificabilidad, primer paso; por empresa"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Cierre y tarea"}),e.jsx(a.td,{children:"9 min"}),e.jsx(a.td,{children:"Lo que se llevan, y pulir la página del caso para mañana"})]})]})]}),`
`,e.jsx(L,{data:"quiz_s6",sesion:6}),`
`,e.jsx(a.h2,{children:"Para discutir"}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsx(a.li,{children:`¿Qué corpus de tu área (manuales, normas, informes históricos) haría más diferencia con un
buscador conversacional encima? ¿Quién lo consultaría?`}),`
`,e.jsx(a.li,{children:`Si el buscador trae el fragmento equivocado, la respuesta viene mal y con cita. ¿Cómo te darías
cuenta vos, en tu tema?`}),`
`,e.jsx(a.li,{children:`¿Qué tarea de tu área delegarías a un agente si pudiera usar tus mismas herramientas? ¿Qué te
frenaría, la capacidad o el permiso?`}),`
`,e.jsx(a.li,{children:`En la traza, el agente se dio cuenta de su error porque el resultado volvió vacío. De los errores
que podría cometer en tu trabajo, ¿cuáles no avisarían nada al volver?`}),`
`]}),`
`,e.jsx(a.h2,{children:"Tarea para mañana"}),`
`,e.jsx(a.p,{children:`Pulí la página del caso de tu empresa: releé las cinco filas y completá la que quedó floja, que casi
siempre es la de verificabilidad. Cinco minutos. Mañana se leen los cuatro casos al lado del caso
prearmado del curso, y se les aplica el mismo protocolo.`})]})}function F(o={}){const{wrapper:a}=o.components||{};return a?e.jsx(a,{...o,children:e.jsx(b,{...o})}):b(o)}export{F as default};
