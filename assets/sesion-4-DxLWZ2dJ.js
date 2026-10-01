import{u as E,j as e,L as P,c as o,g,s as l,E as R,F as S,f as _,r as j,b as w,d as C}from"./index-CHTNzI2b.js";import{k as z,E as L,S as x}from"./useData-B87oy_ZF.js";import{R as A}from"./RagDemo-B6eU-buJ.js";import{R as D,Q as F}from"./Recursos-daMYTd7r.js";function M(s,a){return Math.hypot(s.x-a.x,s.y-a.y)}function T(s,a,d=5){return a.filter(r=>r.id!==s.id).map(r=>({p:r,d:M(s,r)})).sort((r,t)=>r.d-t.d).slice(0,d).map(r=>r.p)}function k(s,a){if(a.length===0)return 0;const d=new Set(s);return a.filter(r=>d.has(r)).length/a.length}function U({sesion:s=5}){const{data:a,meta:d,loading:r,error:t}=z(),[b,c,v]=E("embeddings-map",{termino:""});if(r)return e.jsx(P,{what:"el mapa de términos"});if(t||!a||a.length===0)return e.jsx("div",{style:{color:o.status.err},children:"No se pudo cargar el mapa."});const u=[...new Set(a.map(n=>n.familia))],p=Object.fromEntries(u.map((n,q)=>[n,g[q%g.length]])),i=a.find(n=>n.id===b.termino),m=i?.vecinos.map(n=>n.termino)??[],y=i?T(i,a).map(n=>n.termino):[],h=i?k(y,m):0;return e.jsxs(L,{titulo:"El mapa de significados",sesion:s,intro:"Cada término de la industria convertido en un vector, y esos vectores proyectados a un plano. Las flechas salen del promedio de todos los términos: dos con sentido parecido apuntan para el mismo lado. Clickeá cualquier punto para ver qué términos le quedan más cerca según el modelo. Empezá por los de la familia «jerga», que son los que más muestran.",onReset:v,children:[e.jsx("div",{style:{display:"flex",gap:l.md,flexWrap:"wrap",marginBottom:l.md},children:u.map(n=>e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:6,fontSize:13,color:o.textSecondary},children:[e.jsx("span",{style:{width:10,height:10,borderRadius:"50%",background:p[n],display:"inline-block"}}),n]},n))}),e.jsx(R,{puntos:a,colorPorFamilia:p,seleccionado:i?.id,vecinos:new Set(m),onSelect:n=>c({termino:n})}),e.jsx(S,{label:"O elegilo de la lista",children:e.jsx(_,{value:i?.id??"",options:[{value:"",label:"(ninguno)"},...a.map(n=>({value:n.id,label:`${n.termino} · ${n.familia}`}))],onChange:n=>c({termino:n})})}),i?e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{marginTop:l.lg},children:[e.jsxs("div",{style:{fontSize:12,color:o.textDim,fontFamily:"var(--pd-font-mono)",textTransform:"uppercase",letterSpacing:.5},children:["Vecinos de «",i.termino,"», en las 1024 dimensiones reales"]}),e.jsx("div",{style:{display:"flex",gap:l.sm,flexWrap:"wrap",marginTop:l.sm},children:i.vecinos.map(n=>e.jsxs("span",{style:{fontSize:13,padding:"3px 10px",borderRadius:j.pill,border:`1px solid ${o.border}`,background:o.surface},children:[n.termino," ",e.jsx("span",{style:{fontFamily:"var(--pd-font-mono)",fontSize:11,color:o.textDim},children:n.sim.toFixed(2)})]},n.termino))})]}),i.glosa&&e.jsxs("div",{style:{marginTop:l.md,padding:l.md,borderLeft:`3px solid ${o.accent.orange}`,background:o.surface,borderRadius:j.sm,fontSize:"var(--pd-fs-sm)",color:o.textSecondary},children:[e.jsx("strong",{children:"En el yugo:"})," ",i.glosa," El modelo no tiene idea de esto: aprendió la palabra del lenguaje corriente."]}),e.jsxs("div",{style:{marginTop:l.lg},children:[e.jsx(w,{children:e.jsx(C,{label:"Fidelidad del mapa",value:`${Math.round(h*100)}%`,accent:h>=.6?o.status.ok:o.status.warn,hint:"Cuántos de los vecinos reales también aparecen entre los cinco más cercanos del dibujo"})}),e.jsx("p",{style:{fontSize:13,color:o.textMuted,marginTop:l.sm,maxWidth:"70ch"},children:"Los vecinos reales están marcados con flecha y borde en el mapa. Si alguno quedó lejos del punto elegido, es porque aplastar 1024 dimensiones en dos pierde información: en el dibujo dos puntos pueden verse juntos sin serlo."})]})]}):e.jsx("p",{style:{fontSize:"var(--pd-fs-sm)",color:o.textMuted,marginTop:l.lg},children:"Clickeá un punto para ver sus vecinos."}),e.jsx(x,{titulo:"Qué es un embedding, sin metáforas de más",children:"El modelo convierte cada palabra o frase en una lista de 1024 números. Lo que sirve de esa lista es compararla: dos textos con sentido parecido dan listas parecidas. Todo lo que ves acá sale de una sola operación, medir cuán parecidas son dos listas. Y eso alcanza para buscar por significado, más allá de las palabras exactas, que es lo que hace posible el próximo ejercicio."}),e.jsx(x,{titulo:"Dónde falla, y por qué te conviene saberlo",children:"Dos límites, los dos visibles en este mapa. El primero: el modelo aprendió del lenguaje general, así que la jerga del yacimiento le suena a lo que significa afuera. Buscá «burro», «araña» o «pescado» y mirá con quién se juntan. El segundo, más sutil: a veces acerca palabras solo porque se escriben parecido. «Derrame de hidrocarburo» y «regalías hidrocarburíferas» comparten raíz y poco más, y el modelo las pone cerca igual. Un buscador que se apoya en esto va a traer, cada tanto, algo que se parece pero no sirve. Por eso en el ejercicio que sigue el fragmento recuperado se muestra siempre: para que lo puedas descartar."}),d.source&&e.jsxs("div",{style:{marginTop:l.md,fontFamily:"var(--pd-font-mono)",fontSize:"var(--pd-fs-cap)",color:o.textDim},children:["fuente: ",d.source]})]})}function f(s){const a={a:"a",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(a.h2,{children:"Antes de la sesión (opcional)"}),`
`,e.jsx(a.p,{children:`No hace falta traer nada: ni documentos, ni preguntas, ni una cuenta paga. Todo lo que usamos en
esta sesión es público, y el cuaderno lo armamos en vivo.`}),`
`,e.jsxs(a.p,{children:["Si tenés cinco minutos antes, entrá a ",e.jsx(a.a,{href:"https://notebook.google.com/",children:"Gemini Notebook (antes NotebookLM)"}),`
con una cuenta personal de Google y fijate que abra, porque en varias empresas la cuenta
corporativa lo tiene bloqueado. Los dos ejercicios de esta página se juegan solos: primero el
mapa, después la búsqueda, que usa lo que muestra el mapa.`]}),`
`,e.jsx(D,{sesion:4}),`
`,e.jsx(a.h2,{children:"En la sesión en vivo (2 h)"}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Bloque"}),e.jsx(a.th,{children:"Tiempo"}),e.jsx(a.th,{children:"Qué hacemos"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"De la planilla a los documentos"}),e.jsx(a.td,{children:"10 min"}),e.jsx(a.td,{children:"El puente con la mañana, las ventanas de la sesión y una pregunta a la sala por el chat"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Por qué no sabe lo tuyo"}),e.jsx(a.td,{children:"12 min"}),e.jsx(a.td,{children:'El hueco, las dos formas de cerrarlo, y qué significa "parecido" para un modelo'})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Buscar por significado"}),e.jsx(a.td,{children:"13 min"}),e.jsx(a.td,{children:"Las dos búsquedas del ejercicio, y el prompt aumentado que se le manda al modelo"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"El cuaderno de reservas y regulación"}),e.jsx(a.td,{children:"25 min"}),e.jsx(a.td,{children:"Armamos en vivo un cuaderno con el estándar internacional de reservas y las normas de los tres países, y lo interrogamos abriendo cada cita"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Pausa"}),e.jsx(a.td,{children:"10 min"}),e.jsx(a.td,{children:"A las 13:00 de Argentina (11:00 de Ecuador y Colombia)"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Cuando la cita miente"}),e.jsx(a.td,{children:"10 min"}),e.jsx(a.td,{children:"Una pregunta sin respuesta en las fuentes y una norma bien citada en su versión vieja"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Tu cuaderno, sin traer nada"}),e.jsx(a.td,{children:"20 min"}),e.jsx(a.td,{children:"Cada uno elige un documento público del menú, arma su cuaderno y le hace dos preguntas"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Las cosas lindas del cuaderno"}),e.jsx(a.td,{children:"14 min"}),e.jsx(a.td,{children:"Audio, video, mapa, tabla, infografía y presentación: cada uno genera una sola pieza y la verifica"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Cierre y tarea"}),e.jsx(a.td,{children:"6 min"}),e.jsx(a.td,{children:"Tres prácticas, qué discutir y la tarea de cinco minutos para el taller de agentes"})]})]})]}),`
`,e.jsx(a.p,{children:"Las preguntas cortas a la sala van por el chat de la videollamada."}),`
`,e.jsx(a.h2,{children:"De la planilla a los documentos"}),`
`,e.jsx(a.p,{children:`A la mañana le diste a un chatbot seis partes de la ARCH y te devolvió un Excel con fórmulas y
controles que se pueden revisar. Con seis páginas de tablas, el dato está entero adelante: el
modelo lo lee, corre la cuenta y te la muestra. Un reglamento de 84 páginas funciona distinto. La respuesta que buscás está
en un párrafo del medio, escrita con palabras que no son las de tu pregunta. Esta sesión trata de
cómo llega una herramienta a ese párrafo, y de cómo verificás que llegó al correcto.`}),`
`,e.jsx(a.h2,{children:"El modelo no leyó tus documentos"}),`
`,e.jsx(a.p,{children:`Leyó una cantidad enorme de texto de internet. No leyó tu manual de operaciones, ni tus normas
internas, ni el informe del campo que escribió tu compañero el mes pasado. Preguntarle sobre eso es
pedirle que complete lo más plausible, y así sale una respuesta inventada con tono seguro.`}),`
`,e.jsxs(a.p,{children:[`Hay dos formas de cerrar ese hueco. Una es reentrenar el modelo con tus documentos, que es caro,
lento y casi siempre innecesario. La otra es más simple y es la que se usa: `,e.jsx(a.strong,{children:`buscar los fragmentos
que responden la pregunta y pegarlos arriba de la pregunta`}),`. El modelo responde con el libro
abierto. Se llama generación aumentada por recuperación (RAG, por su sigla en inglés), y una vez que
la ves funcionar es difícil que te siga pareciendo sofisticada.`]}),`
`,e.jsx(a.h2,{children:'Primero, qué significa "parecido" para un modelo'}),`
`,e.jsx(a.p,{children:`Para buscar por significado hay que poder medirlo. El modelo convierte cada texto en una lista de
números, y dos textos con sentido parecido dan listas parecidas. Todo lo demás sale de ahí.`}),`
`,e.jsx(a.p,{children:`El ejercicio proyecta esas listas a un plano para que las puedas mirar. Prestá atención a la familia
de jerga: "burro", "araña", "pescado", "camisa". El modelo aprendió esas palabras del lenguaje
corriente, así que las ubica junto a objetos cotidianos, lejos del equipamiento del yacimiento.
Ahí se ve, de un vistazo, qué es lo que no sabe de tu trabajo.`}),`
`,e.jsx(U,{sesion:4}),`
`,e.jsx(a.h2,{children:"Y ahora sí, buscar en tus documentos"}),`
`,e.jsx(a.p,{children:`El corpus del segundo ejercicio es un manual interno inventado para el curso, y es a propósito:
cualquier documento público de verdad podría haber estado en el entrenamiento del modelo, y entonces
la demostración no probaría nada.`}),`
`,e.jsx(a.p,{children:`Probá las preguntas que no comparten ninguna palabra con su respuesta. La que pregunta cómo evitar
que alguien arranque el equipo mientras lo reparás la responde un fragmento que habla de "bloqueo y
etiquetado". La de cuidarse los oídos la responde uno que dice "protección auditiva". Un buscador de
palabras no tiene con qué encontrarlas y uno por significado sí. Por eso esto sirve sobre
documentación técnica, que siempre está escrita en un vocabulario que nadie usa cuando pregunta.`}),`
`,e.jsx(a.p,{children:"Mirá también el bloque del final, que muestra todo lo que se le manda al modelo."}),`
`,e.jsx(A,{sesion:4}),`
`,e.jsx(a.h2,{children:"Dónde sigue fallando"}),`
`,e.jsxs(a.p,{children:[`Recuperar fragmentos reduce las invenciones pero no las elimina, y además agrega un modo de falla
nuevo: si el buscador trae el fragmento equivocado, la respuesta va a estar mal por más bueno que
sea el modelo, y va a estar mal `,e.jsx(a.strong,{children:"con una cita al lado"}),`, que es peor. Por eso la regla es mirar
siempre los fragmentos recuperados además de la respuesta. Si una herramienta no te los muestra, la
cita parece verificable pero no tenés cómo verificarla.`]}),`
`,e.jsx(a.p,{children:`Hay un segundo límite, más aburrido y más frecuente: si la respuesta no está en los documentos,
ninguna búsqueda la va a traer. La herramienta sabe lo que dicen las fuentes que le diste, y nada
más.`}),`
`,e.jsx(a.h2,{children:"El cuaderno de reservas y regulación"}),`
`,e.jsxs(a.p,{children:[`El manual inventado prueba el mecanismo. El cuaderno que armamos en vivo usa documentos reales: el
estándar con el que se clasifican las reservas y las normas que dicen cómo se reportan en los tres
países de la sala. Son públicos y entran en una cuenta gratuita de Gemini Notebook, que admite
`,e.jsx(a.a,{href:"https://support.google.com/notebooklm/answer/16213268?hl=es-419",children:"hasta 50 fuentes por cuaderno"}),`.
Podés armarte el mismo con estas siete:`]}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:["El ",e.jsx(a.a,{href:"https://www.spe.org/media/filer_public/a1/f2/a1f29a2d-f0b9-4872-8648-ffa055af93f3/2018_sistema_de_gerencia_de_los_recursos_de_petroleo_-_traduccion_en_espanol_-_vf.pdf",children:"Sistema de Gerencia de los Recursos de Petróleo 2018"}),`,
traducción oficial al español de la Sociedad de Ingenieros de Petróleo (SPE, por su sigla en
inglés). PDF de 65 páginas. Es el PRMS (por su sigla en inglés), el estándar que define qué es
una reserva y qué es un recurso contingente.`]}),`
`,e.jsxs(a.li,{children:["Las ",e.jsx(a.a,{href:"https://www.spe.org/industry/docs/PRMS_Guidelines_Nov2011.pdf",children:"Guidelines for Application of the Petroleum Resources Management System"}),`,
la guía de aplicación del PRMS. PDF en inglés, 222 páginas, de noviembre de 2011: comenta la
versión 2007 del estándar, y el cuaderno no te lo va a avisar.`]}),`
`,e.jsxs(a.li,{children:["El ",e.jsx(a.a,{href:"https://www.gob.ec/sites/default/files/regulations/2025-05/Documento_Reglamento-Operaciones-Hidrocarbur%C3%ADferas.pdf",children:"Reglamento de Operaciones Hidrocarburíferas"}),`
de Ecuador, resolución ARCERNNR-024/2021, Registro Oficial 514 del 12 de agosto de 2021. PDF de
84 páginas y 191 artículos; el artículo 22 es el de reservas.`]}),`
`,e.jsxs(a.li,{children:["La ",e.jsx(a.a,{href:"https://www.anh.gov.co/documents/32451/Res_0895_del_04-11-2025_IRR_fO1pCS6.pdf",children:"Resolución 0895 del 4 de noviembre de 2025"}),`
de la Agencia Nacional de Hidrocarburos (ANH) de Colombia. PDF de 19 páginas: cómo se valoran,
certifican y reportan recursos y reservas.`]}),`
`,e.jsxs(a.li,{children:["El ",e.jsx(a.a,{href:"https://www.anh.gov.co/documents/34284/Informe_de_Recursos_y_Reservas_-_IRR_2025.pdf",children:"Informe de Recursos y Reservas 2025"}),`
de la ANH, publicado el 23 de junio de 2026. PDF de 36 láminas: lo que dio aplicar esa
resolución.`]}),`
`,e.jsxs(a.li,{children:["La ",e.jsx(a.a,{href:"https://www.argentina.gob.ar/normativa/nacional/norma-114769/actualizacion",children:"Resolución 324/2006 de la Secretaría de Energía"}),`
de Argentina, en su texto actualizado. Página web: reservas comprobadas, no comprobadas y
recursos, certificados por auditores externos.`]}),`
`,e.jsxs(a.li,{children:["La ",e.jsx(a.a,{href:"https://www.argentina.gob.ar/normativa/nacional/norma-267420/texto",children:"Resolución 69-E/2016"}),`,
también página web, la que en 2016 reemplazó las definiciones de la 324.`]}),`
`]}),`
`,e.jsx(a.p,{children:"Con los PDF se sube el archivo; con las páginas web se pega la dirección."}),`
`,e.jsx(a.h3,{children:"Ojo con la versión"}),`
`,e.jsx(a.p,{children:`El sitio argentino de normativa muestra cada norma en dos versiones. El texto original de la
324/2006 todavía trae las definiciones de 2006; el texto actualizado ya incorpora las que puso la
69-E en 2016. Y la página de la 69-E no trae esas definiciones: están en un anexo en PDF que el
cuaderno no lee si le das solo la dirección. Un cuaderno cita con la misma prolijidad un texto
vigente y uno reemplazado, así que la versión la elegís vos antes de cargarla.`}),`
`,e.jsx(a.h3,{children:"Seis preguntas que cruzan documentos"}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsx(a.li,{children:`¿Qué diferencia hay entre una reserva y un recurso contingente, y qué tiene que pasar para que
un recurso contingente pase a ser reserva?`}),`
`,e.jsx(a.li,{children:`En Ecuador, ¿hasta qué fecha se presentan las reservas de cada año, y quién las tiene que
certificar?`}),`
`,e.jsx(a.li,{children:"¿Cómo se relaciona la Resolución 0895 de la ANH con el PRMS? ¿Qué toma de él y qué le agrega?"}),`
`,e.jsx(a.li,{children:"¿Cómo define la norma argentina una reserva comprobada? ¿Cita el PRMS?"}),`
`,e.jsx(a.li,{children:`Armá una tabla con Ecuador, Colombia y Argentina: fecha límite para presentar las reservas,
quién las certifica y cada cuánto hay que cambiar de certificador.`}),`
`,e.jsx(a.li,{children:"¿Cuántos años de reservas probadas de petróleo le quedan a Colombia, y cuántos a Ecuador?"}),`
`]}),`
`,e.jsx(a.p,{children:`Cada respuesta trae números de cita. Tocá cada uno, leé el fragmento entero y hacete tres
preguntas: de cuál de los siete documentos sale, si el fragmento dice eso mismo o algo parecido, y
de qué versión es. Con siete fuentes de tres países en dos idiomas, una misma oración prolija
puede mezclar el reglamento de Ecuador con la resolución de Colombia. Y una pregunta cuya respuesta
no está en ninguna fuente tiene que terminar en "no está en las fuentes": si trae un número,
fijate de dónde salió.`}),`
`,e.jsx(a.h2,{children:"Tu cuaderno, sin traer nada"}),`
`,e.jsx(a.p,{children:`El segundo cuaderno lo armás vos, con un solo documento público. Elegí uno del menú, el que más
se acerque a tu trabajo:`}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Producción y reservas de Argentina."})," El ",e.jsx(a.a,{href:"https://iapg.org.ar/REM/IAPG_REPORTE_JULIO_2026.pdf",children:"Reporte Mensual del Instituto Argentino del Petróleo y del Gas (IAPG), julio de 2026"}),`
(PDF, 64 páginas).`,`
`,e.jsxs(a.ul,{children:[`
`,e.jsx(a.li,{children:`"¿Cuánto petróleo por día produjo Argentina en julio de 2026?" Mirá de qué tabla lo saca: el
mismo reporte da más de un total.`}),`
`,e.jsx(a.li,{children:`"¿De qué año es el último dato de reservas comprobadas, y cuánto crecieron las no
convencionales?"`}),`
`]}),`
`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Reservas de Colombia."})," El ",e.jsx(a.a,{href:"https://www.anh.gov.co/documents/34284/Informe_de_Recursos_y_Reservas_-_IRR_2025.pdf",children:"Informe de Recursos y Reservas 2025"}),`
de la ANH (PDF, 36 láminas), el mismo del cuaderno de reservas, ahora solo.`,`
`,e.jsxs(a.ul,{children:[`
`,e.jsx(a.li,{children:`"¿Qué porcentaje de las reservas probadas de petróleo certificó un tercero independiente, y
cuántas empresas auditoras intervinieron?"`}),`
`,e.jsx(a.li,{children:'"¿Por qué no se desarrollan los recursos contingentes de gas?"'}),`
`]}),`
`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Producción de Ecuador."})," El ",e.jsx(a.a,{href:"descargas/bce-boletin-sector-petrolero-2026-t2.pdf",children:"Boletín Analítico del Sector Petrolero del Banco Central del Ecuador (BCE), segundo trimestre de 2026"}),`
(PDF, 32 páginas; `,e.jsx(a.a,{href:"https://contenido.bce.fin.ec/documentos/Estadisticas/Hidrocarburos/ASP202602.pdf",children:"original"}),").",`
`,e.jsxs(a.ul,{children:[`
`,e.jsx(a.li,{children:`"¿Cuánto petróleo por día produjo Ecuador en el segundo trimestre de 2026? Dame la producción
en campo y la fiscalizada, y explicame la diferencia."`}),`
`,e.jsx(a.li,{children:'"¿Por qué bajó la producción de EP Petroecuador en el trimestre?"'}),`
`]}),`
`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Un caso técnico."})," El ",e.jsx(a.a,{href:"https://ctyf.journal.ecopetrol.com.co/index.php/ctyf/article/download/725/497",children:"artículo sobre inyección de agua en ciclos en el campo Chichimene"}),`
(Colombia), de la revista Ciencia, Tecnología y Futuro (CT&F) de Ecopetrol, junio de 2024 (PDF
en inglés con resumen en español, 14 páginas).`,`
`,e.jsxs(a.ul,{children:[`
`,e.jsx(a.li,{children:'"¿Cuánta agua y cuánta energía se ahorró con la inyección en ciclos?"'}),`
`,e.jsx(a.li,{children:'"¿Cuánto aumentó el factor de recobro del piloto? Dame un número."'}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(a.p,{children:"Paso a paso, con el chat abierto para lo que trabe:"}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsxs(a.li,{children:["Entrá a ",e.jsx(a.a,{href:"https://notebook.google.com/",children:"notebook.google.com"}),` con una cuenta personal de Google y
creá un cuaderno nuevo.`]}),`
`,e.jsx(a.li,{children:"Subí el PDF o pegá la dirección. Un documento alcanza."}),`
`,e.jsx(a.li,{children:`Leé con desconfianza el resumen que arma solo: es la primera respuesta sin pregunta, y ya puede
estar citando de más.`}),`
`,e.jsx(a.li,{children:`Hacele las dos preguntas del menú, una por vez. Por cada respuesta, tocá el número de la cita y
leé el fragmento: ¿responde la pregunta, o quedó cerca del tema nada más?`}),`
`,e.jsx(a.li,{children:`Anotá para la ronda una respuesta bien citada y una que no, o que no estaba en el documento. Las
dos valen lo mismo.`}),`
`]}),`
`,e.jsx(a.p,{children:`La regla de la mañana sigue: a una cuenta gratuita entra solo lo que ya está en internet. Por eso
el menú es público, y ninguna ronda te pide un documento de tu empresa.`}),`
`,e.jsx(a.h2,{children:"Las cosas lindas del cuaderno"}),`
`,e.jsx(a.p,{children:`Además de contestar preguntas, Gemini Notebook arma piezas enteras con las mismas fuentes, desde
el panel Studio. En septiembre de 2026 la cuenta gratuita trae todas estas:`}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Pieza"}),e.jsx(a.th,{children:"Qué arma"}),e.jsx(a.th,{children:"Un uso de trabajo"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:e.jsx(a.a,{href:"https://support.google.com/gemininotebook/answer/16212820?hl=es-419",children:"Resumen en audio"})}),e.jsx(a.td,{children:"Una conversación de dos voces (Análisis detallado), un resumen de una voz en menos de dos minutos (Resumen), una crítica (Opinión) o un debate, en español de Latinoamérica"}),e.jsx(a.td,{children:"Ponerse al día con el marco de reservas de otro país en el viaje al yacimiento"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:e.jsx(a.a,{href:"https://support.google.com/gemininotebook/answer/16454555?hl=es-419",children:"Resumen en video"})}),e.jsx(a.td,{children:"Un video explicativo o uno corto de unos 60 segundos, en español; a veces tarda más de 30 minutos"}),e.jsx(a.td,{children:"La inducción de un ingeniero nuevo sobre cómo se reportan reservas"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Mapa mental"}),e.jsx(a.td,{children:"Los temas de las fuentes como un árbol que se abre por ramas"}),e.jsx(a.td,{children:"Orientarse en un reglamento de 191 artículos antes de buscar uno"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Informe"}),e.jsx(a.td,{children:"Un documento informativo, una guía de estudio o preguntas frecuentes; se exporta a Documentos de Google"}),e.jsx(a.td,{children:"El primer borrador de una minuta para gerencia"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Tarjetas y cuestionario"}),e.jsx(a.td,{children:"Preguntas y respuestas sobre las fuentes, con la dificultad que elijas; las tarjetas se bajan en CSV"}),e.jsx(a.td,{children:"Preparar al equipo antes de una auditoría de reservas"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Infografía"}),e.jsx(a.td,{children:"Una lámina con las cifras y relaciones principales; se baja en PNG"}),e.jsx(a.td,{children:"Una lámina para la reunión de resultados"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:e.jsx(a.a,{href:"https://support.google.com/gemininotebook/answer/16757456?hl=es-419",children:"Presentación"})}),e.jsx(a.td,{children:"Un deck detallado para leer solo, o uno de apoyo para exponer; se baja en PDF o PPTX"}),e.jsx(a.td,{children:"El esqueleto de una presentación al comité"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Tabla de datos"}),e.jsx(a.td,{children:"Filas y columnas con lo que le pidas; se exporta a Hojas de cálculo de Google, con las citas en una segunda pestaña"}),e.jsx(a.td,{children:"La comparación de plazos y certificadores de los tres países"})]})]})]}),`
`,e.jsxs(a.p,{children:["Desde el 2 de septiembre de 2026, los ",e.jsx(a.a,{href:"https://support.google.com/gemininotebook/answer/17670842?hl=es-419",children:"límites de la cuenta gratuita"}),`
se miden por cómputo: cada pregunta y cada pieza gastan de una cuota que se renueva cada cinco
horas, hasta un tope semanal. Un video gasta mucho más que una pregunta. Por eso en vivo cada uno
genera `,e.jsx(a.strong,{children:"una sola pieza"}),", y el video del cuaderno de reservas lo generamos antes de la clase."]}),`
`,e.jsx(a.h3,{children:"Cómo se verifica una pieza sin citas"}),`
`,e.jsx(a.p,{children:`Google avisa en su propia ayuda que el audio, el video, la infografía y la presentación pueden
tener imprecisiones. La razón es concreta: esas piezas no traen una cita por frase, y el modelo
que las arma puede decir cosas que ninguna fuente dice. Para verificar una, elegí dos afirmaciones
que tengan un número, una fecha o un artículo, y hacé la misma pregunta en el chat del cuaderno,
donde sí hay cita para abrir. En una infografía, cada cifra tiene que aparecer en alguna fuente. Y
si le pedís cambios a una presentación ya generada, la corrección no vuelve a mirar las fuentes.`}),`
`,e.jsx(a.h2,{children:"Para discutir"}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsx(a.li,{children:`La Resolución 0895 obliga a pasar a recurso contingente una reserva que lleva cinco años sin
desarrollarse y sin una justificación documentada; el PRMS da esos cinco años como referencia.
¿Qué cambia eso en cómo se planifica un campo?`}),`
`,e.jsx(a.li,{children:`Un resumen en audio no muestra citas. ¿Para qué usos de tu trabajo alcanza igual, y para cuáles
no?`}),`
`,e.jsx(a.li,{children:`¿Qué documento de tu trabajo abrís todos los meses para buscar un párrafo? ¿Qué te haría falta
para poder cargarlo en un cuaderno? (La respuesta de fondo, con el contrato de datos de las
versiones corporativas, es de la sesión 7.)`}),`
`]}),`
`,e.jsx(a.h2,{children:"Tarea para mañana"}),`
`,e.jsxs(a.p,{children:["Opcional, cinco minutos, y nadie la da por hecha. Pensá ",e.jsx(a.strong,{children:`una tarea de tu semana que tenga varios
pasos seguidos`}),`: buscar un dato, bajar un archivo, calcular, armar una tabla, escribir el correo.
Anotá los pasos en tres a cinco líneas y marcá cuál revisarías vos antes de dar la tarea por
terminada. Nada de la empresa: alcanza con la forma de la tarea. Mañana, en el taller de agentes,
esa lista es la materia prima; si no la traés, la escribís ahí en tres minutos.`]}),`
`,e.jsx(F,{data:"quiz_s4",sesion:4}),`
`,e.jsx(a.p,{children:`Mañana, miércoles, el día es de agentes. En la sesión 5, qué es un agente, qué es el arnés que lo
envuelve y cuáles hay hoy, con un taller para correr uno gratis. En la sesión 6, un agente arma en
vivo el caso del curso, y cada empresa escribe el suyo en una página.`})]})}function O(s={}){const{wrapper:a}=s.components||{};return a?e.jsx(a,{...s,children:e.jsx(f,{...s})}):f(s)}export{O as default};
