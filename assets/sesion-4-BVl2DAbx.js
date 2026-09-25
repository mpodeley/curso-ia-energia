import{u as F,j as e,L as M,c as s,F as T,f as I,r as E,s as r,D as N,S as v,b as O,d as D}from"./index-BTW5BpMI.js";import{u as w,E as U,S as b,R as $,Q as V}from"./Recursos-CSOxaOn1.js";import{s as H,e as B,c as k,a as Q,d as G,b as Y}from"./decline-C4JacJWN.js";const y=[{value:"gas",label:"Gas",unidad:"Mm³"},{value:"pet",label:"Petróleo",unidad:"m³"},{value:"agua",label:"Agua",unidad:"m³"}],W=360;function X(i,a,u){return i.serie.map(m=>{const p=m[a];return p>0?u?p/G(m.ym):p:null})}function Z({sesion:i=4}){const{data:a,meta:u,loading:m,error:p}=w(),[n,c,S]=F("decline-lab",{pozo:"",fluido:"gas",porDia:!1,log:!1,qi:0,Di:.01,b:.5,tocado:!1});if(m)return e.jsx(M,{what:"las series de producción"});if(p||!a||a.length===0)return e.jsx("div",{style:{color:s.status.err},children:"No se pudieron cargar los pozos."});const d=a.find(o=>o.id===n.pozo)??a[0],l=y.find(o=>o.value===n.fluido)??y[0],t=X(d,n.fluido,n.porDia),A=t.find(o=>o!==null)??1,g=n.tocado&&n.qi>0?n.qi:A,f=H(g,n.Di,n.b,t.length),h=B(t,f),q=k(g,n.Di,n.b,W),P=n.porDia?q*30.4:q,R=d.serie.map((o,x)=>({t:x,ym:o.ym,observado:t[x],modelo:f[x]})),L=o=>c({pozo:o,tocado:!1,qi:0}),_=()=>{const o=Y(t);c({qi:o.qi,Di:o.Di,b:o.b,tocado:!0})},z=Math.max(...t.filter(o=>o!==null),1),j=o=>({font:"inherit",fontSize:13,fontWeight:600,padding:`${r.xs}px ${r.md}px`,borderRadius:E.pill,border:`1px solid ${o?s.accent.blue:s.border}`,background:o?s.accent.blue+"15":s.surface,color:o?s.accent.blue:s.textMuted,cursor:"pointer"});return e.jsxs(U,{titulo:"Ajustá la curva de declinación",sesion:i,intro:"Movés tres perillas hasta que la curva se pegue a los puntos: eso es ajustar un modelo a datos. Empezá por los pozos de escuela, que tienen respuesta exacta, y después pasá a los reales de Salta, que salen del dataset público Capítulo IV.",onReset:S,children:[e.jsx(T,{label:"Pozo",children:e.jsx(I,{value:d.id,options:a.map(o=>({value:o.id,label:o.tipo==="escuela"?`Escuela · ${o.sigla} — ${o.formacion}`:`Real · ${o.sigla} — ${o.area} (${o.formacion})`})),onChange:L})}),d.tipo==="real"&&e.jsx("div",{style:{padding:r.md,marginBottom:r.lg,borderLeft:`3px solid ${s.accent.orange}`,background:s.surface,borderRadius:E.sm,fontSize:13,color:s.textSecondary,maxWidth:"72ch"},children:"Este es un pozo real, y en su curva, además del reservorio, están la disponibilidad de compresión, las restricciones de planta, la contrapresión de línea y la carga de líquido en el pozo. Arps describe un reservorio que se despresuriza solo; lo que medís es eso más todo lo demás."}),e.jsxs("div",{style:{display:"flex",gap:r.sm,flexWrap:"wrap",marginBottom:r.lg},children:[y.map(o=>e.jsx("button",{type:"button",style:j(n.fluido===o.value),onClick:()=>c({fluido:o.value,tocado:!1,qi:0}),children:o.label},o.value)),e.jsx("span",{style:{width:r.lg}}),e.jsx("button",{type:"button",style:j(n.porDia),onClick:()=>c({porDia:!n.porDia,tocado:!1,qi:0}),children:n.porDia?`${l.unidad}/día`:`${l.unidad}/mes`}),e.jsx("button",{type:"button",style:j(n.log),onClick:()=>c({log:!n.log}),children:"Eje log"})]}),t.every(o=>o===null)?e.jsxs("p",{style:{color:s.textMuted,fontSize:"var(--pd-fs-sm)"},children:["Este pozo no reporta ",l.label.toLowerCase(),". Probá con otro fluido."]}):e.jsxs(e.Fragment,{children:[e.jsx(N,{data:R,log:n.log,unidad:n.porDia?`${l.unidad}/d`:`${l.unidad}/mes`}),e.jsxs("div",{style:{marginTop:r.lg},children:[e.jsx(v,{label:`Caudal inicial qi (${n.porDia?l.unidad+"/día":l.unidad+"/mes"})`,value:Math.round(g),min:0,max:Math.round(z*1.4),step:Math.max(1,Math.round(z/200)),onChange:o=>c({qi:o,tocado:!0}),format:o=>o.toLocaleString("en-US")}),e.jsx(v,{label:"Tasa de declinación Di",value:n.Di,min:0,max:.08,step:5e-4,onChange:o=>c({Di:o,tocado:!0}),format:o=>`${(o*100).toFixed(2)} %/mes · ${(Q(o)*100).toFixed(0)} %/año`}),e.jsx(v,{label:"Exponente b",value:n.b,min:0,max:1.2,step:.05,onChange:o=>c({b:o,tocado:!0}),format:o=>o<.03?"0.00 — exponencial":Math.abs(o-1)<.03?"1.00 — armónica":o.toFixed(2)})]}),e.jsxs(O,{children:[e.jsx(D,{label:"Error del ajuste",value:Number.isFinite(h)?`${(h*100).toFixed(1)}%`:"—",accent:h<.06?s.status.ok:h<.12?s.status.warn:s.status.err,hint:"Cuánto se aparta el modelo de un mes típico. Abajo de 6% el ajuste es bueno."}),e.jsx(D,{label:"Acumulada a 30 años",value:(P/1e3).toFixed(0),unit:`miles de ${l.unidad}`,hint:"Lo que el modelo predice que va a producir el pozo. Depende muchísimo de b."})]}),e.jsxs("div",{style:{display:"flex",gap:r.md,alignItems:"center",flexWrap:"wrap",marginTop:r.lg},children:[e.jsx("button",{type:"button",className:"tbtn",onClick:_,children:"Buscar el mejor ajuste"}),e.jsx("span",{style:{fontSize:13,color:s.textMuted},children:"Probá vos primero. El botón hace la búsqueda por fuerza bruta."})]}),e.jsxs(b,{titulo:"¿Qué mirar en este pozo?",children:[d.nota,d.verdad&&e.jsxs("p",{style:{marginTop:r.sm},children:["Pasá el gráfico a ",e.jsxs("strong",{children:[l.unidad,"/día"]})," con el botón de arriba y después poné"," ",e.jsxs("strong",{children:["qi = ",d.verdad.qi.toLocaleString("en-US")," ",l.unidad,"/día, Di ="," ",(d.verdad.Di*100).toFixed(1)," %/mes, b = ",d.verdad.b.toFixed(2)]}),": con esos valores se generó la curva, y el modelo va a pasar por el medio de los puntos. Lo único que sobra es el ruido de medición. El orden importa: esos números son caudal diario, y en volumen mensual el calendario mete un serrucho que no está en el reservorio."]})]}),e.jsxs(b,{titulo:"Por qué febrero siempre parece un mal mes",children:["En metros cúbicos por mes vas a ver un serrucho: cada febrero cae y cada mes de 31 días sube. Eso lo ponen los días del calendario. La declinación describe un caudal, así que el serrucho desaparece en cuanto pasás a ",l.unidad,"/día, y el error del ajuste baja sin que toques ninguna perilla. Es el error más común al mirar datos de producción crudos."]}),e.jsxs(b,{titulo:"Qué significa cada perilla",children:[e.jsx("strong",{children:"qi"})," es dónde arranca la curva: subirlo o bajarlo la mueve entera. ",e.jsx("strong",{children:"Di"})," es cuán rápido cae al principio. ",e.jsx("strong",{children:"b"})," es la forma de la cola: en 0 la caída es exponencial y el pozo se apaga rápido; en 1 es armónica y la cola se estira. Cambiar b casi no mueve los primeros meses, pero cambia enormemente la acumulada a 30 años. Por eso una reserva estimada con pocos años de historia es un número frágil."]}),e.jsx(b,{titulo:"Por qué los pozos de escuela vienen primero",children:"Arps describe un reservorio que se despresuriza sin que nadie lo toque. Ningún pozo real cumple eso: lo que se mide en la boca es el reservorio más la compresión disponible ese mes, más las restricciones de planta, más la contrapresión de línea, más el líquido que se acumula en el pozo y lo ahoga. Por eso el ajuste, bueno o malo, dice poco sobre el reservorio en sí. Los pozos de escuela existen para que aprendas a mover las perillas contra una curva que sí tiene respuesta; los reales, para que veas cuánto pesa en lo que medís todo lo que no es geología. Un ingeniero de reservorios corrige los datos por horas de operación y presión de boca antes de ajustar; acá ves el volumen mensual crudo."})]}),u.source&&e.jsxs("div",{style:{marginTop:r.md,fontFamily:"var(--pd-font-mono)",fontSize:"var(--pd-fs-cap)",color:s.textDim},children:["fuente: ",u.source,u.source_date&&` · datos hasta ${u.source_date}`]})]})}function C(i){const a={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(a.h2,{children:"Antes de la sesión (opcional)"}),`
`,e.jsx(a.p,{children:`Esta sesión sigue a la 3 después de una pausa de diez minutos y no pide nada nuevo. Conviene
tener abierto un chatbot que acepte archivos y corra código: acá le damos planillas y un PDF. Si
tenés un rato antes, el laboratorio de declinación de esta página se puede jugar solo: arrancá
por los pozos de escuela.`}),`
`,e.jsx($,{sesion:4}),`
`,e.jsx(a.h2,{children:"El chatbot como copiloto de análisis"}),`
`,e.jsxs(a.p,{children:[`Hasta acá el modelo escribió texto. Ahora le vamos a dar una tabla y pedirle que la analice. La
diferencia importante es que, para analizarla, escribe `,e.jsx(a.strong,{children:"código"}),`, lo corre y te devuelve el
resultado. Eso cambia dónde puede fallar y dónde tenés que mirar.`]}),`
`,e.jsx(a.p,{children:"Cuatro movimientos, en orden de dificultad:"}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsx(a.li,{children:`De un archivo separado por comas a un análisis. Subís la planilla, pedís estadísticas y
gráficos. El copiloto escribe el código; vos juzgás el resultado.`}),`
`,e.jsx(a.li,{children:`De un archivo PDF a una tabla. La producción diaria de Ecuador se publica en un PDF de una
página del regulador, un reporte por día de operación. Extraemos sus tablas y las verificamos
contra el original, número por número.`}),`
`,e.jsx(a.li,{children:`De una tabla a un modelo. Ajustar una curva de declinación: pocos parámetros, una fórmula de
1945 y la pregunta de siempre, que es cuánto le creés a la extrapolación.`}),`
`,e.jsx(a.li,{children:`Del modelo al lote. Un prompt con reglas escritas, diez pozos, y de vuelta un Excel con
pronósticos, supuestos anotados y una visualización para recorrerlos.`}),`
`]}),`
`,e.jsx(a.h2,{children:"Verificar código es distinto de verificar texto"}),`
`,e.jsx(a.p,{children:`Cuando el modelo escribe un párrafo, el error se lee. Cuando escribe código, el error se esconde
detrás de un número que parece razonable. Un filtro mal escrito devuelve menos filas y sigue, sin
avisar.`}),`
`,e.jsx(a.p,{children:`La regla práctica es corta. Pedile siempre que te muestre el código junto con el resultado.
Pedile que el código informe cuántas filas entran y cuántas quedan en cada filtro: las cuenta el
chatbot, y ese renglón hace visible al filtro que se comió filas de más. Y comprobá un caso a
mano, uno solo, eligiendo un valor que puedas rastrear en la planilla original. Si ese cierra,
casi siempre cierra el resto; si no cierra, el resultado no sirve y hay que buscar el error.`}),`
`,e.jsx(a.h2,{children:"De PDF a tabla: el reporte diario de la ARCH"}),`
`,e.jsxs(a.p,{children:[`La Agencia de Regulación y Control de Hidrocarburos de Ecuador (ARCH) publica un reporte
preliminar de producción y operaciones por cada día de operación, en
`,e.jsx(a.a,{href:"https://controlhidrocarburos.gob.ec/",children:"controlhidrocarburos.gob.ec"}),`. Es un PDF de una página,
formulario GTRCH.GEERIH.02.FO.01, y trae cuatro tablas y un bloque de texto:`]}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsx(a.li,{children:`Producción diaria de petróleo por compañía, en barriles por día: producción del día anterior,
producción del día de operación, incremento o pérdida, estimado del mes y cumplimiento. Una
fila por sujeto de control (EP Petroecuador y trece privadas, entre ellas Andes Petroleum,
PCR-Ecuador, PetroOriental, Gente Oil, Orion, Petrobell y Pluspetrol), el subtotal de privadas
y el total nacional.`}),`
`,e.jsx(a.li,{children:`Producción de la empresa pública por bloque. Acá aparecen Shushufindi y Libertador (bloque 57)
y Bermejo (bloque 49), que Tecpetrol opera por contrato de servicios: en la tabla 1 no figura
por nombre.`}),`
`,e.jsx(a.li,{children:"Estado de pozos: en producción, en reacondicionamiento o completación, en perforación."}),`
`,e.jsx(a.li,{children:"Producción de gas natural, en miles de pies cúbicos por día."}),`
`,e.jsx(a.li,{children:`"Novedades principales": texto libre por compañía, con pozo, campo y causa. "Cerrado 24 horas
por falla de equipo BES", "continúan cerrados por alto corte de agua", "en espera de
reacondicionamiento", "con incremento de BSW".`}),`
`]}),`
`,e.jsxs(a.p,{children:[`El ejercicio usa el
`,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-15.pdf",children:"reporte del 15 de septiembre de 2026"}),` (día de
operación 14 de septiembre), copia local del
`,e.jsx(a.a,{href:"https://controlhidrocarburos.gob.ec/wp-content/uploads/downloads/2026/09/REPORTE-DIARIO-PRELIMINAR-DE-PRODUCCION-Y-OPERACIONES-DE-15-DE-SEPTIEMBRE-DE-2026.pdf",children:"original publicado por la ARCH"}),`,
por si el sitio del regulador no abre desde tu red. Es un documento público oficial; los
volúmenes son preliminares y el propio formulario dice "sujetos a revisión". Sacar esa tabla a
mano lleva una tarde; extraerla con el modelo lleva un minuto, y a eso hay que sumarle la
verificación.`]}),`
`,e.jsx(a.p,{children:"El prompt del ejercicio, para copiar con el PDF adjunto:"}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-text",children:`Actuá como analista de producción. Te subo el reporte diario preliminar
de producción y operaciones de la Agencia de Regulación y Control de
Hidrocarburos de Ecuador (ARCH), formulario GTRCH.GEERIH.02.FO.01: un
PDF de una página con cuatro tablas y un bloque de texto "Novedades
principales".

Contexto: voy a verificar lo que extraigas contra el original número por
número, y después va a alimentar una serie de varios días. El original
usa punto de miles y coma decimal (368.058,36 son trescientos sesenta y
ocho mil), y en algunas celdas el punto es de miles sin decimales
(23.607 es veintitrés mil seiscientos siete, no veintitrés coma seis).
La tabla 2 está pegada a la derecha de la tabla 1: no mezcles filas de
una con la otra.

Tarea 1: extraé completa la tabla 1, "Producción diaria y cumplimiento
de estimados": las 14 compañías, el subtotal de privadas y el total
nacional.
Formato: una tabla con las columnas fecha_operacion, tipo (pública o
privada), compania, produccion_anterior_bppd, produccion_dia_bppd,
incremento_bppd, estimado_bppd, cumplimiento_pct. Números con punto
decimal y sin separador de miles. Copiá los totales del original, no los
calcules.

Tarea 2: convertí el bloque "Novedades principales" en una tabla con las
columnas compania, bloque_o_campo, pozo, causa, horas. Una fila por pozo
nombrado. Cuando el texto dice "11 pozos de los campos X, Y" sin
nombrarlos, una sola fila con pozo = "(11 sin nombre)" y los campos en su
columna. La causa va con las palabras del original, sin resumir ni
traducir.

Regla: si una celda no la pudiste leer con certeza, dejala vacía y listá
al final qué no pudiste leer y por qué. No completes con lo que "debería"
decir.
`})}),`
`,e.jsx(a.p,{children:"Dónde suele fallar, para saber qué mirar primero:"}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"El formato de los números."}),` Tablas 1, 2 y 3 con punto de miles y coma decimal; la tabla de
gas con punto decimal (24201.44) en el reporte del 15 y con coma (24.181,23) en el del 14: el
formato cambia de un día al otro. Y celdas sin decimales, como el estimado de Andes (23.607)
o el total de pozos en producción (2.616), que un lector automático convierte en 23.6 y en
2.6 sin avisar. Ese es el primer número que hay que buscar en la tabla extraída.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Las dos tablas pegadas."}),` La tabla 2 vive a la derecha de la tabla 1 en la misma altura de
página. Una extracción apurada intercala filas de una con la otra, o le cuelga a una
compañía la producción de un bloque.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Los nombres de pozo."}),` "Hormiguero-33-43" son dos pozos, 33 y 43; "Sacha: 419-400" también;
"Villano: 03ST2-11RE1-15H" son tres; "Fanny-18B16RE1" y "Oso-H113RE" son uno solo con
sufijo de reentrada. El modelo tiende a partir donde no hay que partir, y al revés.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"Los pozos sin nombre."}),` Andes reporta por cantidad: "11 pozos de los campos Alice Oeste,
Chorongo, Dorine y Fanny-18B continúan cerrados por alto corte de agua". Una tabla que
"inventa" once filas con nombres plausibles falló en silencio.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.strong,{children:"El día anterior no coincide."}),` La columna "producción anterior" de hoy no siempre es igual a
la "producción del día" del reporte de ayer: los volúmenes son preliminares y se corrigen. Al
armar una serie, elegí una columna y anotalo.`]}),`
`]}),`
`,e.jsx(a.h3,{children:"Segunda pasada: la serie de pozos cerrados por agua"}),`
`,e.jsx(a.p,{children:`Si el tiempo da en vivo, o como tarea para curiosos: cinco reportes consecutivos, uno por día
hábil, y de ahí una serie de pozos cerrados por alto corte de agua por compañía. Los archivos
siguen una única forma de nombre, con el día en dos cifras y el mes en mayúsculas:`}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-text",children:`https://controlhidrocarburos.gob.ec/wp-content/uploads/downloads/2026/09/REPORTE-DIARIO-PRELIMINAR-DE-PRODUCCION-Y-OPERACIONES-DE-11-DE-SEPTIEMBRE-DE-2026.pdf
`})}),`
`,e.jsxs(a.p,{children:[`Por si el sitio del regulador no abre desde tu red, los cinco reportes del 8 al 15 de septiembre
de 2026 están copiados acá: `,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-08.pdf",children:"8"}),`,
`,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-09.pdf",children:"9"}),", ",e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-10.pdf",children:"10"}),`,
`,e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-11.pdf",children:"11"})," y ",e.jsx(a.a,{href:"descargas/arch-reporte-diario-2026-09-14.pdf",children:"14"}),`,
además del 15 de arriba.`]}),`
`,e.jsx(a.p,{children:`Con los cinco PDF adjuntos, el pedido es el mismo de la tarea 2 repetido por archivo, más una
tabla final: fecha de operación, compañía, cantidad de pozos cerrados por alto corte de agua
(nombrados y sin nombre por separado), y qué cambió respecto del día anterior. Ese conteo se
retoma en la sesión 8, cuando el caso de recuperación secundaria llega a la pregunta de qué se
hace con un pozo que produce agua.`}),`
`,e.jsx(a.h2,{children:"La curva de declinación, y lo que la curva no dice"}),`
`,e.jsx(a.p,{children:`Ayer, en la capa de aprendizaje automático de la sesión 1, el pozo era de escuela: dos perillas y
una respuesta exacta escondida, que la máquina encontró sola. Acá aparecen la tercera perilla, el
eje logarítmico, la acumulada a 30 años y, sobre todo, seis pozos que nadie
diseñó para que ajustaran.`}),`
`,e.jsx(a.p,{children:"El ejercicio tiene dos grupos de pozos, y el orden importa."}),`
`,e.jsxs(a.p,{children:["Los ",e.jsx(a.strong,{children:"pozos de escuela"}),` están generados a partir de parámetros conocidos. Sirven para aprender qué
hace cada perilla contra una curva que tiene respuesta exacta: si ponés los valores con los que se
generó, el modelo pasa por el medio de los puntos.`]}),`
`,e.jsxs(a.p,{children:["Los ",e.jsx(a.strong,{children:"pozos reales"}),` son de Aguaragüe, Ramos y Acambuco, en Salta, y producen de huamampampa,
tupambi, icla y santa rosa. La serie es la producción mensual declarada al Estado argentino entre
2019 y 2026, sin retocar, del Capítulo IV de la Secretaría de Energía. Aguaragüe lo opera
Tecpetrol y CGC tiene el 5%: para dos empresas de la sala es dato propio, publicado por el
Estado, y nadie tiene que agregarle nada.`]}),`
`,e.jsxs(a.p,{children:[`Y acá está lo que hay que decir en voz alta, porque es donde este ejercicio se separa de un tutorial
cualquiera. `,e.jsx(a.strong,{children:"Arps describe un reservorio que se despresuriza solo, y ningún pozo real hace eso."}),` Lo
que se mide en la boca es el reservorio más la compresión disponible ese mes, más las restricciones
de planta, más la contrapresión de línea, más el líquido que se acumula y ahoga el pozo. Un ajuste
que cierra no prueba que entendiste la geología, y uno que no cierra no prueba que el reservorio se
haya portado mal. Para un análisis serio hay que corregir los caudales por horas de operación y
presión de boca antes de ajustar.`]}),`
`,e.jsx(a.p,{children:`El método sigue siendo útil dentro de ese límite. La curva sirve para ordenar una conversación y
acotar un número; para cerrarla hacen falta otros datos.`}),`
`,e.jsx(Z,{sesion:4}),`
`,e.jsx(a.h2,{children:"Del ajuste a mano al pronóstico en lote"}),`
`,e.jsx(a.p,{children:`El laboratorio ajusta de a un pozo, con tus dedos en las perillas. El trabajo real rara vez es
así: son diez, cuarenta o doscientos pozos, y el pronóstico se entrega en una planilla. Ese
salto es el último movimiento del día.`}),`
`,e.jsxs(a.p,{children:[`La planilla del ejercicio es
`,e.jsx(a.a,{href:"descargas/produccion_noroeste_10pozos.csv",children:"produccion_noroeste_10pozos.csv"}),`: los seis pozos
del laboratorio más cuatro nuevos, 90 meses cada uno, 2019 a 2026, del mismo Capítulo IV. Trae
una columna que el laboratorio no tenía: `,e.jsx(a.code,{children:"dias_efectivos"}),`, los días del mes que el pozo produjo
de verdad. Con ella el ajuste se hace sobre `,e.jsx(a.strong,{children:"caudal efectivo"}),` en lugar de volumen calendario,
y el serrucho de los febreros desaparece solo.`]}),`
`,e.jsx(a.p,{children:`Entre los cuatro nuevos hay un pozo que murió, uno que produce cada vez más y uno que cambió de
régimen a mitad de la serie. Están porque tu campo también los tiene: un prompt de pronóstico se
mide en qué hace cuando el modelo no corresponde.`}),`
`,e.jsx(a.p,{children:"El prompt completo, para copiar:"}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-text",children:`Actuá como ingeniero de reservorios. Te subo un CSV con la producción mensual
de 10 pozos de gas convencional de la cuenca Noroeste argentina (fuente:
Capítulo IV, Secretaría de Energía; datos públicos). Columnas: idpozo, pozo,
yacimiento, formacion, mes (AAAA-MM), gas_miles_m3 (producción del mes, en
miles de m³), petroleo_m3, agua_m3, dias_efectivos (días del mes que el pozo
produjo de verdad).

Tarea: ajustá curvas de declinación de Arps por pozo y pronosticá el gas.

Antes de analizar: describí el archivo (filas, columnas, rango de fechas,
meses por pozo, huecos) y mostrame esa tabla de control. Recién después
seguí con el análisis.

Reglas del análisis:
1. Trabajá sobre caudal efectivo: q = gas_miles_m3 / dias_efectivos, en
   miles de m³/día. Los meses con dias_efectivos < 10 quedan en la historia
   pero fuera de todos los ajustes.
2. Si el caudal salta más de 2 veces de forma sostenida, para arriba o para
   abajo, es un cambio de régimen: ajustá solo el tramo posterior al último
   salto y anotalo en las notas del pozo.
3. Ventana de ajuste: desde el pico de la mediana móvil de 3 meses en
   adelante. Si quedan menos de 24 meses útiles, reportá "sin ajuste" con el
   motivo. No fuerces ningún ajuste.
4. Ajustá tres variantes: exponencial (b = 0), hiperbólica (0 < b <= 1.2) y
   armónica (b = 1), minimizando el error sobre log(q).
5. Elegí por menor error, pero la hiperbólica tiene que mejorar a la
   exponencial en más de 2% para ganarse su parámetro extra. Si b queda en
   el tope, marcá el ajuste como dudoso.
6. Confiabilidad por R² sobre log(q): 0.6 o más, confiable; entre 0.25 y
   0.6, pronóstico de orden de magnitud, marcado "dudoso"; menos de 0.25,
   no ajustable. Si la producción sube, decilo: Arps no aplica.
7. Backtest por pozo: reajustá sin los últimos 12 meses, pronosticá esos 12
   e informá el error absoluto medio en volumen. Es la medida de cuánto
   creerle a cada pronóstico.
8. Pronóstico mensual desde 2026-07 hasta 2036-12 o hasta el límite
   económico de 2 miles de m³/día, lo que llegue primero. Volumen del mes =
   q × días del mes × factor de servicio (mediana de dias_efectivos / días
   del mes de los últimos 24 meses).

Entregables:
1. Un Excel: hoja "Resumen" con una fila por pozo (estado, modelo elegido,
   qi, Di anual, b, R², error de backtest, acumulada histórica, EUR
   restante, fin del pronóstico, notas); una hoja por pozo con historia y
   pronóstico mensual; hoja "Supuestos" con todas las reglas que aplicaste.
2. Un gráfico panel con los 10 pozos en escala semilogarítmica: puntos de
   historia, las tres curvas, la elegida resaltada y el pronóstico.
3. Un artifact interactivo: selector de pozo, escala lineal/log, historia,
   ajustes, pronóstico y la tabla resumen.

En todo el proceso: mostrá el código que corras y el conteo de filas antes
y después de cada filtro. Si no podés generar archivos descargables,
entregá el Resumen como tabla y cada pronóstico como CSV en un bloque de
código.
`})}),`
`,e.jsx(a.p,{children:`Cada regla numerada es una decisión de ingeniería de reservorios: qué meses valen, cuándo un salto
parte la historia, cuánta historia pide un ajuste, cuándo decir que no. Lo que en el laboratorio
era una perilla acá es una regla escrita, auditable y repetible.`}),`
`,e.jsx(a.p,{children:`Cuando vuelva el resultado, las tres reglas del día siguen mandando. Pedí el conteo de filas.
Elegí un pozo que hayas ajustado a mano y compará qi y la declinación anual: son los mismos
datos, tienen que contar la misma historia. Y buscá la fila de YPF.St.SP.x-1: si el Excel le
inventa un EUR en lugar de decir "sin ajuste", el archivo entero pierde crédito.`}),`
`,e.jsx("div",{className:"callout",children:e.jsxs(a.p,{children:[e.jsx("strong",{children:"Si tu cuenta no genera archivos:"}),` no todos los chatbots gratuitos escriben un
Excel o una página interactiva. El prompt ya trae el plan B: las mismas tablas como CSV en
bloques de código, para pegar en tu planilla.`]})}),`
`,e.jsx(a.h3,{children:"Para curiosos: cuando además hay presiones"}),`
`,e.jsxs(a.p,{children:[`Todo lo de arriba usa caudales solos, porque es lo que publica el Capítulo IV. Equinor liberó
los datos completos del campo Volve (Mar del Norte, 2008–2016) bajo una licencia abierta que
permite usarlos y compartirlos con crédito, y ahí está lo que acá falta:
`,e.jsx(a.a,{href:"https://www.equinor.com/energy/volve-data-sharing",children:`producción diaria con presión de fondo, presión de boca y horas en
línea`}),", pozo por pozo."]}),`
`,e.jsxs(a.p,{children:[`El dataset completo pide registro; para este ejercicio no hace falta. La planilla
`,e.jsx(a.a,{href:"descargas/volve_diario_2pozos.csv",children:"volve_diario_2pozos.csv"}),` trae el recorte listo: los dos
productores con mejor cobertura de presión, 15/9-F-14 (2008–2016) y 15/9-F-11 (2013–2016), día
por día. Datos del campo Volve de Equinor y los ex socios de la licencia (ExxonMobil Exploration
& Production Norway AS, Bayerngas Norge AS), compartidos acá bajo
`,e.jsx(a.a,{href:"https://cdn.equinor.com/files/h61q9gi9/global/de6532f6134b9a953f6c41bac47a0c055a3712d3.pdf",children:"sus términos"}),`:
está permitido usarlos y compartirlos con crédito, y está prohibido venderlos.`]}),`
`,e.jsx(a.p,{children:`Con ese archivo el pedido al chatbot pasa de aplicar Arps a construir el diagnóstico que Arps
no puede dar. El prompt completo:`}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-text",children:`Te subo volve_diario_2pozos.csv: producción diaria real de dos pozos de
petróleo del campo Volve (Mar del Norte), una fila por pozo y día.
Columnas: fecha, pozo, horas_linea (horas en producción ese día),
p_fondo_bar (presión de fondo fluyente promedio), p_boca_bar (presión de
boca), oil_sm3, gas_sm3, agua_sm3 (volúmenes del día).

Antes de analizar: describí el archivo (filas y rango de fechas por pozo,
cobertura de presión de fondo) y esperá mi ok.

Reglas:
1. Día productivo: horas_linea > 0 y petróleo > 0. Normalizá los
   caudales a 24 horas en línea. Día de cierre: horas_linea = 0.
2. La presión de fondo de los días de cierre es tu proxy de presión de
   reservorio: descartá los ceros de sensor (< 50 bar), tomá la mediana
   mensual e interpolá los meses sin cierres. Graficala junto a la
   presión fluyente de los días productivos.
3. Armá series mensuales por pozo: caudal de petróleo, caudal de líquido,
   corte de agua, presión fluyente y proxy de reservorio.
4. Índice de productividad: PI = caudal de líquido / (pR − pwf), en los
   días que tienen las dos presiones. Seguilo en el tiempo.
5. Ajustá una curva de Arps al caudal de petróleo desde su pico, como
   referencia, e informá qi, Di, b y R².
6. El entregable central es un diagnóstico por pozo, en una tabla de
   cuatro filas: depresionamiento (¿pR cae?), pérdida de productividad
   (¿PI cae?), avance de agua (¿el corte sube?), manejo del drawdown
   (¿pR − pwf cae?). Cada fila con su evidencia numérica: valor al
   principio, valor al final.
7. Cerrá comparando: ¿qué acierta la Arps del punto 5 y qué no puede ver?
   ¿Qué habría pronosticado para 15/9-F-11 una Arps ajustada solo hasta
   fines de 2015, y qué pasó de verdad en 2016?

Mostrá el código y el conteo de filas después de cada filtro. Si no podés
generar archivos, las tablas van como CSV en bloques de código. Cerrá con
un gráfico de cuatro paneles por pozo: caudales y corte de agua,
presiones, PI, y el semilog con la Arps.
`})}),`
`,e.jsx(a.p,{children:`Lo que ese diagnóstico tiene que mostrar, para controlar al copiloto: la presión de reservorio
de los dos pozos no cae nunca (la inyección de agua la sostiene cerca de 300 bar), el índice de
productividad no se pierde, y el corte de agua sube de 8% a 94% en 15/9-F-14 y de 9% a 81% en
15/9-F-11. Mientras tanto una Arps ajusta el petróleo de 15/9-F-14 con R² de 0.96. La curva
describe la caída sin ver el mecanismo, y la meseta de 15/9-F-11 hasta 2015 no anuncia en nada
el barranco de 2016.`}),`
`,e.jsx(a.p,{children:`Con volumen mensual crudo este análisis no se puede hacer. Con presiones diarias lleva una tarde
de trabajo con el copiloto, y además de extrapolar la curva permite entender por qué declina el
pozo. Para un campo con inyección de agua, como Pindo o Libertador, es el análisis que
importa.`}),`
`,e.jsx(a.h2,{children:"De la ingeniería de prompts a la ingeniería de contexto"}),`
`,e.jsxs(a.p,{children:[`Una puerta que queda abierta para mañana. El prompt que ve el modelo es tu pedido más todo lo
que viaja con él: los archivos que adjuntaste hoy, los
fragmentos que un buscador recupera de tus manuales (mañana, en la sesión 5), los resultados
de las herramientas que un agente usa mientras trabaja (en la sesión 6). En el rubro ya hay
nombre para eso: la ingeniería de prompts está dando lugar a la `,e.jsx(a.strong,{children:"ingeniería de contexto"}),"."]}),`
`,e.jsx(a.p,{children:`Las piezas de hoy siguen valiendo, con la orden de trabajo en el centro. Alrededor crece todo lo
que la acompaña, y todo eso tiene que caber en la ventana de contexto de ayer.`}),`
`,e.jsx(a.h2,{children:"En la sesión en vivo (2 h)"}),`
`,e.jsxs(a.table,{children:[e.jsx(a.thead,{children:e.jsxs(a.tr,{children:[e.jsx(a.th,{children:"Bloque"}),e.jsx(a.th,{children:"Tiempo"}),e.jsx(a.th,{children:"Qué hacemos"})]})}),e.jsxs(a.tbody,{children:[e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"La planilla y el copiloto"}),e.jsx(a.td,{children:"30 min"}),e.jsx(a.td,{children:"Retomamos, subimos producción real del Capítulo IV, pedimos análisis y leemos el código juntos"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"De PDF a tabla: el reporte diario de la ARCH"}),e.jsx(a.td,{children:"35 min"}),e.jsx(a.td,{children:"La producción por compañía y las novedades pozo por pozo, verificadas número por número entre todos"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Pausa"}),e.jsx(a.td,{children:"10 min"}),e.jsx(a.td,{children:"La corrida de los 10 pozos sigue trabajando mientras tanto"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Declinación en vivo"}),e.jsx(a.td,{children:"25 min"}),e.jsx(a.td,{children:"Pozos reales de Salta: ajustamos entre todos y discutimos qué no dice la curva"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Qué se puede afirmar"}),e.jsx(a.td,{children:"10 min"}),e.jsx(a.td,{children:"De los tres análisis: qué conclusión firmarías y cuál necesita más trabajo"})]}),e.jsxs(a.tr,{children:[e.jsx(a.td,{children:"Cierre y tarea"}),e.jsx(a.td,{children:"10 min"}),e.jsx(a.td,{children:"Tres prácticas para llevarse y la tarea de mañana"})]})]})]}),`
`,e.jsx(V,{data:"quiz_s4",sesion:4}),`
`,e.jsx(a.h2,{children:"Para discutir"}),`
`,e.jsxs(a.ol,{children:[`
`,e.jsx(a.li,{children:"De la tarea que trajiste: ¿lo caro es el borrador, o lo caro es verificar?"}),`
`,e.jsx(a.li,{children:`¿Qué dato de tu área vive hoy atrapado en archivos PDF o en escaneos? ¿Cuánto valdría tenerlo en
una tabla, y quién lo usaría?`}),`
`,e.jsx(a.li,{children:`Cuando el chatbot escribe código de análisis: ¿revisás el código o el resultado? ¿Alcanza con uno
de los dos?`}),`
`,e.jsx(a.li,{children:`En el pozo que no ajusta con ningún parámetro: ¿qué información tenés vos que el modelo no puede
tener? La misma pregunta vuelve en todo el curso.`}),`
`]}),`
`,e.jsx(a.h2,{children:"Tarea para mañana"}),`
`,e.jsxs(a.p,{children:["Dos cosas, cinco minutos en total. Primero, tu prompt ",e.jsx(a.strong,{children:"antes y después"}),`: el de una línea con el
que arrancaste hoy y el que funcionó, pegados uno debajo del otro. Segundo, pensá en un documento
de tu empresa que consultás seguido y que no es confidencial (un manual, una norma, un
procedimiento, un instructivo) y anotá `,e.jsx(a.strong,{children:"tres preguntas concretas"}),` que le harías si pudieras
preguntarle en lugar de buscar. "¿Cada cuánto se calibra la válvula X?" es una pregunta
concreta; "¿qué dice el manual?" es demasiado general. Mañana ese documento y esas preguntas van
a un cuaderno de verdad.`]})]})}function ae(i={}){const{wrapper:a}=i.components||{};return a?e.jsx(a,{...i,children:e.jsx(C,{...i})}):C(i)}export{ae as default};
