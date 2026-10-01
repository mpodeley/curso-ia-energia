import{u as E,j as e,L as z,c as n,F as C,f as T,s as i,r as m,b as L,d as h,a as D,S as P}from"./index-CHTNzI2b.js";import{e as M,E as k,S as A,f as R}from"./useData-B87oy_ZF.js";import{p as w,e as I,c as F,N,E as G,C as B}from"./EscalaDeLosModelos-gtdxfjjq.js";import{R as $,L as H,I as U,a as _,Q as O}from"./Recursos-daMYTd7r.js";import"./sampling-DXnahiR4.js";const q=D.fill.map(l=>l+"38"),Q=l=>l.replace(/ /g,"␣").replace(/\n/g,"⏎");function W({sesion:l=2}){const{data:a,meta:d,loading:p,error:g}=M(),[j,x,b]=E("tokenizer-lab",{ejemplo:""});if(p)return e.jsx(z,{what:"los ejemplos de tokenización"});if(g||!a||a.length===0)return e.jsx("div",{style:{color:n.status.err},children:"No se pudieron cargar los ejemplos."});const o=a.find(r=>r.id===j.ejemplo)??a[0],c=o.texto.length;return e.jsxs(k,{titulo:"El texto que ve el modelo: tokens",sesion:l,intro:"Un LLM lee el texto partido en tokens, que no coinciden ni con las letras ni con las palabras. Cada bloque de color es un token, tal como lo parte un tokenizador real. El símbolo ␣ marca el espacio que viaja pegado al token.",onReset:b,children:[e.jsx(C,{label:"Elegí un texto",children:e.jsx(T,{value:o.id,options:a.map(r=>({value:r.id,label:r.label})),onChange:r=>x({ejemplo:r})})}),e.jsx("div",{style:{background:n.surface,border:`1px solid ${n.border}`,borderRadius:m.md,padding:i.lg,lineHeight:2.1,fontFamily:"var(--pd-font-mono)",fontSize:15,wordBreak:"break-word"},children:o.tokens.map((r,u)=>e.jsx("span",{title:`token ${u+1}`,style:{background:q[u%q.length],borderRadius:4,padding:"2px 1px",marginRight:1},children:Q(r)},u))}),e.jsx("div",{style:{marginTop:i.lg},children:e.jsxs(L,{children:[e.jsx(h,{label:"Caracteres",value:c}),e.jsx(h,{label:"Tokens",value:o.tokens.length,accent:n.accent.blue}),e.jsx(h,{label:"Caracteres por token",value:(c/o.tokens.length).toFixed(1)})]})}),o.note&&e.jsx(A,{titulo:"¿Qué mirar acá?",children:o.note}),d.source&&e.jsxs("div",{style:{marginTop:i.md,fontFamily:"var(--pd-font-mono)",fontSize:"var(--pd-fs-cap)",color:n.textDim},children:["fuente: ",d.source]})]})}function Y({sesion:l=2}){const{data:a,meta:d,loading:p,error:g}=R(),[j,x,b]=E("ejercicios-gratis",{posicion:1});if(p)return e.jsx(z,{what:"la oración del ejercicio"});if(g||!a)return e.jsx("div",{style:{color:n.status.err},children:"No se pudo cargar la oración."});const o=w(a.oracion),c=I(a.oracion);if(c.length===0)return null;const r=Math.min(Math.max(1,j.posicion),o.length-1),u=c[r-1],v=s=>x({posicion:Math.min(Math.max(1,r+s),o.length-1)}),y=[{que:"Esta oración",n:o.length,unidad:"palabras",fuente:a.fuente},...a.escalas.map(s=>({que:s.que,n:s.palabras_o_tokens,unidad:s.unidad,fuente:s.fuente}))],S=Math.max(...y.map(s=>Math.log10(s.n)));return e.jsxs(k,{titulo:"Cada oración, un montón de ejercicios con respuesta",sesion:l,intro:"Un modelo de lenguaje se entrena con un solo ejercicio: tapar una palabra y adivinarla a partir de las anteriores. Recorré la oración y mirá cuántos ejercicios, cada uno con su respuesta, salen de un texto que nadie preparó para esto.",onReset:b,children:[e.jsx("p",{"aria-live":"polite",style:{background:n.surface,border:`1px solid ${n.border}`,borderRadius:m.md,padding:i.lg,fontSize:19,lineHeight:2,margin:`0 0 ${i.md}px`},children:o.map((s,t)=>t<r?e.jsxs("span",{style:{color:n.textPrimary},children:[s," "]},t):t===r?e.jsx("span",{"aria-label":"palabra tapada",style:{display:"inline-block",minWidth:48,textAlign:"center",border:`2px solid ${n.accent.orange}`,borderRadius:m.sm,color:n.accent.orange,fontFamily:"var(--pd-font-mono)",fontWeight:700,lineHeight:1.4,margin:"0 6px 0 0",padding:"0 6px"},children:"¿?"},t):e.jsxs("span",{style:{color:n.textDim,opacity:.45},children:[s," "]},t))}),e.jsxs("div",{style:{display:"flex",gap:i.sm,alignItems:"center",flexWrap:"wrap",marginBottom:i.sm},children:[e.jsx("button",{type:"button",className:"tbtn",onClick:()=>v(-1),disabled:r<=1,children:"← Anterior"}),e.jsx("button",{type:"button",className:"tbtn",onClick:()=>v(1),disabled:r>=o.length-1,children:"Siguiente →"})]}),e.jsx(P,{label:"Palabra tapada",value:r,min:1,max:o.length-1,step:1,onChange:s=>x({posicion:s}),format:s=>`${s+1} de ${o.length}`}),e.jsxs("div",{style:{fontSize:15,lineHeight:1.6,marginBottom:i.lg},children:[e.jsxs("div",{children:[e.jsx("span",{style:{color:n.textDim},children:"Lo que el modelo ve: "}),e.jsxs("span",{style:{fontFamily:"var(--pd-font-mono)"},children:["«",u.contexto.join(" "),"»"]})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:n.textDim},children:"La respuesta, gratis: "}),e.jsxs("strong",{style:{color:n.accent.orange,fontFamily:"var(--pd-font-mono)"},children:["«",u.siguiente,"»"]})]})]}),e.jsxs(L,{children:[e.jsx(h,{label:"palabras en la oración",value:o.length}),e.jsx(h,{label:"ejemplos de entrenamiento",value:c.length,accent:n.accent.orange})]}),e.jsx("h4",{style:{margin:`${i.xl}px 0 ${i.sm}px`,fontSize:16},children:"De una oración a todo lo escrito"}),e.jsx("p",{style:{color:n.textMuted,fontSize:14,margin:`0 0 ${i.md}px`},children:"El largo de cada barra sigue la cantidad de cifras del número: cada tramo igual multiplica por 10."}),e.jsx("ul",{style:{listStyle:"none",padding:0,margin:0},children:y.map((s,t)=>e.jsxs("li",{style:{marginBottom:i.md},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",gap:i.md,fontSize:14,flexWrap:"wrap"},children:[e.jsx("span",{children:s.que}),e.jsx("span",{style:{fontFamily:"var(--pd-font-mono)",color:n.textPrimary,fontWeight:600},children:F(s.n,s.unidad)})]}),e.jsx("div",{style:{background:n.surfaceAlt,border:`1px solid ${n.border}`,borderRadius:m.sm,height:10,marginTop:4},children:e.jsx("div",{style:{width:`${Math.max(2,Math.log10(s.n)/S*100)}%`,height:"100%",background:t===0?n.accent.orange:n.accent.blue,borderRadius:m.sm}})}),e.jsx("a",{href:s.fuente.url,target:"_blank",rel:"noopener",style:{fontSize:12,color:n.textDim},children:s.fuente.titulo})]},t))}),e.jsx(A,{titulo:"Por qué esto cambió todo",children:e.jsx("p",{style:{margin:0},children:"Nadie tuvo que etiquetar nada: cada palabra de un texto es la respuesta del ejercicio que forman las palabras anteriores. Por eso la cantidad de ejemplos depende solo de cuánto texto haya, y hay muchísimo. En la sesión 1, con los pozos, alguien tuvo que declarar el tipo de cada uno para que el modelo aprendiera; acá la respuesta viene incluida en el propio dato. Así se preentrenan todos los modelos grandes de lenguaje: con billones de estos ejercicios. Para predecir bien la palabra siguiente en textos de todo tipo, el modelo termina aprendiendo gramática, datos del mundo y algo de razonamiento."})}),e.jsxs("div",{style:{marginTop:i.md,fontSize:12,color:n.textDim},children:["fuente: ",d.source]})]})}function f(l){const a={a:"a",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...l.components};return e.jsxs(e.Fragment,{children:[e.jsx(a.h2,{children:"Antes de la sesión (opcional)"}),`
`,e.jsxs(a.p,{children:[`Esta sesión arranca después de la pausa y no pide nada previo. El primer video del material de
abajo (8 min, de 3Blue1Brown) cuenta en qué consiste un modelo grande de lenguaje. Los
laboratorios de la página (el
tokenizador, "adiviná el próximo token", los ejercicios que trae cada oración, el gráfico de escala
y la ventana de contexto) los recorremos juntos en vivo; están acá para volver después, o para
adelantarte si querés. Para el más curioso, el
capítulo de `,e.jsx(a.a,{href:"https://www.youtube.com/watch?v=wjZofJX0v4M",children:"3Blue1Brown sobre transformers"}),` (27 min)
muestra la maquinaria interna; tiene audio en español, elegible en el menú del reproductor.`]}),`
`,e.jsx($,{sesion:2}),`
`,e.jsx(a.h2,{children:"En la sesión en vivo (2 h)"}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Bloque"}),e.jsx(a.th,{children:"Tiempo"}),e.jsx(a.th,{children:"Qué hacemos"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Tokens y predicción"}),e.jsx(a.td,{children:"33 min"}),e.jsx(a.td,{children:"Los dos primeros laboratorios de la página, y un modelo real abierto en el navegador"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"De predecir palabras a un asistente general"}),e.jsx(a.td,{children:"20 min"}),e.jsx(a.td,{children:"Cómo aprende de texto sin que nadie lo etiquete, la escala, la etapa que lo vuelve asistente, y de ahí a los agentes"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Contexto: la memoria de trabajo"}),e.jsx(a.td,{children:"15 min"}),e.jsx(a.td,{children:"La ventana de contexto en vivo con el laboratorio de la página"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Pausa"}),e.jsx(a.td,{children:"10 min"}),e.jsx(a.td,{children:"Dejá el chatbot abierto: lo usás al volver"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Alucinaciones en vivo"}),e.jsx(a.td,{children:"30 min"}),e.jsx(a.td,{children:"Lo hacemos alucinar: primero el instructor, después cada uno con una pregunta de su especialidad"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Cierre: cuatro maneras de fallar, ¿cambiarías tu definición?, tarea"}),e.jsx(a.td,{children:"12 min"}),e.jsx(a.td,{children:"La hoja de ruta del curso, tu definición de la mañana revisada, tres prácticas para mañana y la tarea de cinco minutos"})]})]})]}),`
`,e.jsx(a.p,{children:"Las preguntas cortas a la sala van por el chat de la videollamada."}),`
`,e.jsx(a.h2,{children:"El modelo lee tokens"}),`
`,e.jsxs(a.p,{children:["Antes de procesar tu texto, el modelo lo parte en ",e.jsx(a.strong,{children:"tokens"}),`: pedazos que pueden ser palabras enteras,
sílabas o hasta caracteres sueltos. Las palabras frecuentes en internet (en inglés, sobre todo) son un
solo token; las técnicas o en español suelen partirse en varios.`]}),`
`,e.jsx(a.p,{children:`Esto explica varias rarezas prácticas: por qué el modelo cuenta mal las letras de una palabra, por qué
el español "rinde menos" por token que el inglés, y por qué el uso por programa (la interfaz de
programación, API) se cobra por token.`}),`
`,e.jsx(W,{sesion:2}),`
`,e.jsx(a.h2,{children:"Una sola operación: predecir el próximo token"}),`
`,e.jsxs(a.p,{children:[`Todo lo que viste hacer a un chatbot (responder preguntas, escribir informes, traducir) sale de una
única operación repetida: `,e.jsx(a.strong,{children:`dado el texto hasta acá, asignar una probabilidad a cada token posible que
sigue, elegir uno, y volver a empezar`}),`. Mucha gente se lo imagina consultando una base de datos de
respuestas. Lo que hay es una máquina de continuar texto, entrenada con una fracción enorme de todo el
texto humano.`]}),`
`,e.jsxs(a.p,{children:["La ",e.jsx(a.strong,{children:"temperatura"}),` controla cómo se elige entre esos candidatos: con temperatura baja gana siempre el
más probable (salida estable, repetitiva); con temperatura alta, tokens poco probables tienen su
oportunidad (salida variada, a veces brillante, a veces disparatada).`]}),`
`,e.jsx(N,{sesion:2}),`
`,e.jsx(a.h3,{children:"Para curiosos: un modelo real corriendo en tu navegador"}),`
`,e.jsxs(a.p,{children:[`El laboratorio de arriba usa probabilidades precalculadas. El
`,e.jsx(a.a,{href:"https://poloclub.github.io/transformer-explainer/",children:"Transformer Explainer"}),` del Polo Club de
Georgia Tech hace lo mismo con un modelo de verdad: GPT-2, el antecesor de 2019 de los chatbots
actuales, corriendo entero en tu navegador. Escribís una frase en inglés y ves, capa por capa, cómo
el texto se convierte en tokens, cómo la atención decide a qué palabras anteriores mirar, y cómo
todo termina en una lista de candidatos con su probabilidad. Tiene la misma perilla de temperatura
del laboratorio. En vivo lo abrimos cinco minutos; si tenés media hora, vale la pena recorrerlo
solo. Está en inglés y pide un navegador de escritorio.`]}),`
`,e.jsx(a.h2,{children:"De predecir palabras a un asistente general"}),`
`,e.jsx(a.p,{children:`Hasta acá viste una máquina que continúa texto. Falta ver cómo se llegó de eso a un asistente que
resume, traduce, escribe código y analiza una planilla.`}),`
`,e.jsx(a.h3,{children:"El texto trae sus propias respuestas"}),`
`,e.jsxs(a.p,{children:[`En la sesión 1 viste aprendizaje supervisado: para que la máquina aprendiera a clasificar pozos,
alguien tuvo que declarar antes el tipo de cada uno. Con texto pasa algo distinto. Si tapás la
palabra siguiente de cualquier oración, la respuesta ya está escrita en el texto original. Cada
oración trae decenas de ejercicios con su respuesta, y nadie tuvo que etiquetar nada. A eso se lo
llama aprendizaje `,e.jsx(a.strong,{children:"autosupervisado"}),`, y es la primera etapa del entrenamiento de todos los LLM
(modelos grandes de lenguaje).`]}),`
`,e.jsxs("figure",{className:"figura",children:[e.jsx("img",{src:"slides/img/tres-maneras.svg",alt:"Tres columnas: supervisado, con pozos que traen su tipo declarado; no supervisado, con puntos grises agrupados; autosupervisado, con una oración a la que se le tapa la palabra siguiente."}),e.jsx("figcaption",{children:e.jsx(a.p,{children:`Tres maneras de aprender. Las dos primeras las viste con los pozos de la sesión 1; la tercera es
la de los LLM.`})})]}),`
`,e.jsx(Y,{sesion:2}),`
`,e.jsx(a.p,{children:`La consecuencia es de escala: el único límite a la cantidad de ejemplos es cuánto texto existe.
GPT-3 se entrenó en 2020 con 300,000 millones de tokens; Llama 3, en 2024, con más de 15 billones.`}),`
`,e.jsx(a.h3,{children:"Cada palabra mira a las demás"}),`
`,e.jsxs(a.p,{children:["La pieza que permitió aprovechar tanto texto es el ",e.jsx(a.strong,{children:"transformer"}),`, una arquitectura que publicaron
investigadores de Google en 2017. Su idea central es la `,e.jsx(a.strong,{children:"atención"}),`: para decidir qué palabra
sigue, cada palabra del texto mira a todas las otras y pesa cuáles importan. En "la presión del
reservorio cae porque", lo que viene depende mucho más de "presión" y de "reservorio" que de "la".
Es la columna de atención del Transformer Explainer. Además se entrena mucho más rápido que las
arquitecturas anteriores, porque procesa el texto en paralelo.`]}),`
`,e.jsx(a.h3,{children:"La escala"}),`
`,e.jsx(a.p,{children:`Con texto sin etiquetar de sobra y una arquitectura rápida de entrenar, el camino fue agrandar. En
2019, GPT-2 se entrenó con un solo objetivo, predecir la palabra siguiente, y sin ningún
entrenamiento específico ya mostraba capacidades rudimentarias de comprensión de lectura,
traducción y respuesta a preguntas. En 2020, GPT-3, con 175,000 millones de parámetros, resolvía
tareas nuevas con pocos ejemplos escritos en el mismo pedido.`}),`
`,e.jsx(a.p,{children:`El gráfico muestra cuánto cómputo hizo falta para entrenar cada modelo notable, según las
estimaciones de Epoch AI. El eje vertical es logarítmico: cada línea es diez veces la de abajo.`}),`
`,e.jsx(G,{sesion:2}),`
`,e.jsx(a.h3,{children:"Dos etapas de tamaños muy distintos"}),`
`,e.jsx(a.p,{children:`Nada de lo anterior lo programó alguien. El modelo pasa por dos etapas, y la diferencia entre ellas
explica bastante de cómo se comporta.`}),`
`,e.jsxs(a.p,{children:["En la ",e.jsx(a.strong,{children:"primera"}),` lee una fracción enorme de todo el texto humano y practica una sola cosa: predecir
lo que sigue. De ahí salen la gramática, los hechos y los patrones de razonamiento, todos como
efecto de hacer bien esa única tarea. La consecuencia incómoda es que aprendió lo que estaba
escrito, con sus errores y sus sesgos, sea cierto o no.`]}),`
`,e.jsxs(a.p,{children:["En la ",e.jsx(a.strong,{children:"segunda"}),`, mucho más chica, personas le enseñan a comportarse como asistente: escriben
ejemplos de buenas respuestas y comparan respuestas del modelo para marcar cuál es mejor. La técnica
se llama aprendizaje por refuerzo con retroalimentación humana (RLHF, por su sigla en inglés). En
marzo de 2022, OpenAI mostró que un modelo de 1,300 millones de parámetros ajustado así daba
respuestas preferidas a las de GPT-3, que tenía 100 veces más. En noviembre de ese año salió
ChatGPT, entrenado de la misma manera.`]}),`
`,e.jsxs("figure",{className:"figura",children:[e.jsx("img",{src:"slides/img/dos-etapas.svg",alt:"Un recuadro grande, el preentrenamiento, lleva con una flecha a uno mucho más chico, el ajuste como asistente."}),e.jsx("figcaption",{children:e.jsx(a.p,{children:`La primera etapa es enorme y enseña a continuar textos. La segunda es chica y enseña a responder
como asistente.`})})]}),`
`,e.jsx(a.p,{children:`A un modelo que solo pasó por la primera etapa le hacés una pregunta y la continúa, como si fuera el
principio de un texto. Esa segunda etapa es la que convirtió una curiosidad de laboratorio en algo
que llegó a todos los escritorios: la capacidad venía de la primera, y la segunda la volvió usable.`}),`
`,e.jsx(a.p,{children:`El tono servicial y seguro con el que te contesta viene de ahí. Es una forma de hablar que aprendió
en esa etapa, y la usa igual cuando acierta que cuando se equivoca.`}),`
`,e.jsx(a.h3,{children:"De conversar a hacer"}),`
`,e.jsxs(a.p,{children:[`Desde 2024 aparecen dos novedades sobre la misma base. En septiembre de ese año, OpenAI presentó o1,
entrenado con aprendizaje por refuerzo para razonar paso a paso antes de dar la respuesta: su
desempeño mejora con más tiempo para pensar, una palanca que se suma a la de agrandar el modelo. Y en
febrero de 2025, Anthropic presentó Claude Code, un agente que trabaja en la terminal: busca y lee
código, edita archivos, corre pruebas y usa herramientas de línea de comandos. Es el mismo tipo de
modelo general, con herramientas y un ciclo que le permite actuar. En 2026 los agentes se
instalaron en el escritorio de la computadora y trabajan solos durante más tiempo:
`,e.jsx(a.a,{href:"https://metr.org/time-horizons/",children:"METR"}),` mide cuánto le lleva a un experto una tarea que el agente
completa la mitad de las veces, y en mayo de 2026 esa cifra llegó a al menos 16 horas, el techo de
lo que su batería de pruebas puede medir. Qué hace bien un agente hoy, y dónde se rompe, lo vemos
en las sesiones 5 y 6.`]}),`
`,e.jsx(a.h3,{children:"Por qué termina siendo general"}),`
`,e.jsx(a.p,{children:`Durante décadas, la IA fue un modelo por tarea: un filtro de spam hacía una cosa, un clasificador de
pozos hacía otra. Es lo que en la sesión 1 llamamos IA de propósito específico. Un LLM también hace una sola cosa,
predecir la palabra siguiente, pero para hacerla bien en cualquier texto tiene que aprender un poco de
todo. Por eso un mismo modelo resume, traduce, escribe código y analiza una planilla, y por eso le
decimos IA de propósito general. Si alguna vez va a igualar a una persona en casi todo (lo que se
llama AGI, inteligencia artificial general) es otra discusión, y la tenemos en la sesión 8.`}),`
`,e.jsx(a.h2,{children:"La ventana de contexto: la memoria de trabajo"}),`
`,e.jsxs(a.p,{children:[`Para elegir el próximo token, el modelo mira todo lo que tiene delante: tu pregunta, sus respuestas
anteriores, los documentos que pegaste. Ese conjunto se llama `,e.jsx(a.strong,{children:"ventana de contexto"}),` y tiene un
tamaño máximo, medido en tokens. Lo que no entra ahí no existe para el modelo. El tamaño cambia
según el modelo y la cuenta: en septiembre de 2026, los modelos grandes de OpenAI y de Anthropic
leen hasta un millón de tokens, y la cuenta gratuita de Gemini,
`,e.jsx(a.a,{href:"https://support.google.com/gemini/answer/16275805",children:"32,000"}),"."]}),`
`,e.jsx(a.p,{children:`Conviene pensarla como un escritorio. Lo que está arriba del escritorio el modelo lo mira; lo que se
cayó al piso no lo busca, y tampoco sabe que se cayó.`}),`
`,e.jsx(B,{sesion:2}),`
`,e.jsx(a.p,{children:`De acá salen dos frustraciones que a esta altura ya te deben haber pasado. En una conversación
larga, el principio se cae y el modelo deja de respetar algo que le pediste al empezar, sin avisar.
Y en un documento grande, lo que quedó afuera no se busca solo: hay que volver a pegarlo. Al
segundo problema le dedicamos la sesión 4, mañana a la tarde, donde en vez de pegar todo buscamos el pedazo que hace
falta.`}),`
`,e.jsx(a.p,{children:`Guardá el nombre para el cierre: de las cuatro maneras de fallar, esta es "se olvida de lo que le
dijiste", y lo que la produce es el tamaño de la ventana.`}),`
`,e.jsx(a.h2,{children:"¿Y adentro qué hay? Una caja negra que se puede abrir (para curiosos)"}),`
`,e.jsx(a.p,{children:`Hasta acá describimos qué hace el modelo y cómo se entrenó. Falta qué pasa adentro cuando responde.
La respuesta corta ya la tenés: esas reglas se ajustaron solas, mirando ejemplos. La respuesta larga
es más interesante, y hay toda una disciplina dedicada a ella.`}),`
`,e.jsx(a.p,{children:`Donde mejor se ve es en un modelo de imágenes, porque lo que aprende se puede dibujar. En 1989, en los Laboratorios Bell, Yann LeCun mostró una red que leía números escritos
a mano. El video dura un minuto y está en la lista del final de esta sección; conviene mirarlo
sabiendo que ese mismo mecanismo, con más datos y más cómputo, es el que hoy escribe informes.`}),`
`,e.jsxs(a.p,{children:["Adentro, ",e.jsx(a.strong,{children:"la red aprende a descomponer la imagen en piezas."}),` Las primeras capas detectan bordes y
cambios de contraste. Las
siguientes combinan esos bordes en curvas y esquinas. Las de más arriba combinan las curvas en partes
reconocibles, y recién al final aparece algo que podríamos llamar "un siete". A cada una de esas piezas
se la llama una `,e.jsx(a.em,{children:"característica"}),", y ninguna estaba en el programa: emergieron de mirar ejemplos."]}),`
`,e.jsx(a.p,{children:`Cuando la misma técnica se aplica a redes que miran fotos, aparecen detectores de texturas, de ojos, de
ruedas de auto. Y cuando se aplica a los modelos de lenguaje de hoy, aparecen millones de conceptos
identificables, al punto de poder amplificarlos o apagarlos y ver cómo cambia la respuesta.`}),`
`,e.jsx(a.p,{children:`Esto importa por dos razones prácticas. La primera es que "caja negra" es una metáfora incompleta: se
puede mirar adentro, con esfuerzo. La segunda es que todavía no sabemos hacerlo lo bastante bien como
para garantizar cómo se va a comportar un modelo en una situación nueva, y esa brecha es exactamente el
tema de la sesión 7.`}),`
`,`
`,e.jsx(H,{items:U.filter(d=>!_[2].some(p=>p.url===d.url)),titulo:"Para ver adentro (opcional)"}),`
`,e.jsx(a.h2,{children:"De ahí salen las alucinaciones"}),`
`,e.jsxs(a.p,{children:["Volvé a la única operación: continuar texto de forma ",e.jsx(a.em,{children:"plausible"}),`. Cuando el modelo no sabe algo, no
tiene un mecanismo natural para callarse: `,e.jsx(a.strong,{children:"genera la continuación más plausible igual"}),`. Un número
de norma que parece real, un paper que suena citable, una cifra de producción con tres decimales.
Eso es una `,e.jsx(a.strong,{children:"alucinación"}),`, y es el comportamiento por defecto del mecanismo que acabás de ver en los
laboratorios, aunque se la suela tratar como una falla rara. Encima, el tono seguro con el que la dice
viene de la segunda etapa del entrenamiento, que le enseña la forma de una buena respuesta sin
chequear si es cierta.`]}),`
`,e.jsxs(a.p,{children:[`En la lista del cierre, esta es "inventa lo que no sabe". La consecuencia práctica nos acompaña todo
el curso. La salida de un LLM (modelo grande de lenguaje) es un `,e.jsx(a.strong,{children:"borrador plausible"}),`: se verifica
antes de usarlo.`]}),`
`,e.jsx(a.h2,{children:"Las cuatro maneras de fallar, y dónde vemos cada una"}),`
`,e.jsx(a.p,{children:`Hoy viste el mecanismo de dos. Hay cuatro en total, y cada una sale de una propiedad distinta del
modelo, así que cada una tiene su propio arreglo. El curso las recorre en este orden:`}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Inventa lo que no sabe."})," Sale de cómo genera el texto, token por token. Hoy."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"No hace lo que le pediste."})," Sale de cuánto control te dan de verdad las instrucciones. Mañana."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Está seguro y equivocado."})," Sale de lo que aprendió y de lo que no. Sesión 4, mañana a la tarde."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Se olvida de lo que le dijiste."}),` Sale de cuánto puede mirar a la vez. Hoy, y de nuevo en la
sesión 6.`]}),`
`]}),`
`,e.jsx(a.p,{children:`En la sesión 7 las juntamos en una sola tabla y las convertimos en un protocolo. No hace falta
memorizar nada ahora. Alcanza con que, cuando algo salga mal, te preguntes primero cuál de las cuatro
fue, antes de ponerte a reescribir el pedido.`}),`
`,e.jsx(a.h2,{children:"Para discutir"}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsx(a.li,{children:"Después de jugar con la temperatura: ¿para qué tareas tuyas querrías temperatura baja? ¿Alguna donde convenga alta?"}),`
`,e.jsx(a.li,{children:'Si el modelo "solo continúa texto", ¿por qué a veces parece razonar? ¿Dónde está el límite?'}),`
`,e.jsx(a.li,{children:`A la mañana escribiste qué es la IA para vos. Con lo que viste de cómo funciona, ¿le agregarías o
le sacarías algo?`}),`
`]}),`
`,e.jsx(a.h2,{children:"Tarea para mañana"}),`
`,e.jsxs(a.p,{children:["Traé ",e.jsx(a.strong,{children:"una tarea real de tu semana"}),` que le pedirías a un chatbot. Anotá tres líneas: qué le
pedirías, qué material tendrías que darle, y cómo te darías cuenta de si lo hizo bien. Si ya tenés
cuenta, probala (sin datos confidenciales) y anotá qué salió mal. Cinco minutos alcanzan, y es
opcional: mañana la sesión 3 trae su propio archivo y sus propios PDF, y esa tarea te sirve para
el caso de tu empresa del miércoles.`]}),`
`,e.jsx(O,{data:"quiz_s2",sesion:2})]})}function ee(l={}){const{wrapper:a}=l.components||{};return a?e.jsx(a,{...l,children:e.jsx(f,{...l})}):f(l)}export{ee as default};
