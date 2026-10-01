import{j as e}from"./index-CHTNzI2b.js";import{R as s,Q as r}from"./Recursos-daMYTd7r.js";import"./useData-B87oy_ZF.js";function n(a){const o={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...a.components};return e.jsxs(e.Fragment,{children:[e.jsx(o.h2,{children:"Antes de la sesión (opcional)"}),`
`,e.jsx(o.p,{children:"No hace falta traer nada. Si tenés cinco minutos antes:"}),`
`,e.jsxs(o.ol,{children:[`
`,e.jsxs(o.li,{children:[`Bajá el paquete liviano del campo Volve,
`,e.jsx(o.a,{href:"descargas/volve/volve_liviano.zip",children:"volve_liviano.zip"}),` (435 KB), y descomprimilo en una carpeta
a mano. Son los archivos de tu parte, después de la pausa.`]}),`
`,e.jsx(o.li,{children:`Dejá Claude abierto con la ejecución de código activada, como el martes (en la interfaz en
inglés: Settings, Capabilities, "Code execution and file creation").`}),`
`,e.jsx(o.li,{children:`Traé a la cabeza el problema que nombraste el lunes en la ronda de relevamiento, el primero que
probarías: es el punto de partida del taller.`}),`
`]}),`
`,e.jsx(s,{sesion:6}),`
`,e.jsx(o.h2,{children:"En la sesión en vivo (2 h)"}),`
`,e.jsxs(o.table,{children:[e.jsx(o.thead,{children:e.jsxs(o.tr,{children:[e.jsx(o.th,{children:"Bloque"}),e.jsx(o.th,{children:"Tiempo"}),e.jsx(o.th,{children:"Qué hacemos"})]})}),e.jsxs(o.tbody,{children:[e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"El dataset, en cinco minutos"}),e.jsx(o.td,{children:"8 min"}),e.jsx(o.td,{children:"Qué es Volve, qué archivos trae, la licencia, y la pregunta del día: ¿qué hay acá, y cuadra?"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"La herramienta, armada por un agente en vivo"}),e.jsx(o.td,{children:"40 min"}),e.jsx(o.td,{children:"Claude Code sobre una carpeta preparada arma un tablero HTML de un solo archivo: inventario, mapa, producción por pozo con la conciliación contra Sodir, visor de LAS y cruce de nombres; la sala propone chequeos por el chat"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"Pausa"}),e.jsx(o.td,{children:"10 min"}),e.jsx(o.td,{})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"Tu versión, con un agente gratuito"}),e.jsx(o.td,{children:"30 min"}),e.jsx(o.td,{children:"El paquete liviano en Claude gratuito (código y un artifact) o en Arena, modo agente: la ficha del pozo F-12 o un visor de su LAS, y dos chequeos (el GR relleno, F-11 contra F-11 B)"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"Taller: el caso de tu empresa, en una página"}),e.jsx(o.td,{children:"25 min"}),e.jsx(o.td,{children:"Dolor, datos, sensibilidad, verificabilidad y primer paso, por empresa, desde el problema que cada uno nombró el lunes"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"Cierre y tarea"}),e.jsx(o.td,{children:"7 min"}),e.jsx(o.td,{children:"Tres prácticas y pulir la página del caso para mañana"})]})]})]}),`
`,e.jsx(o.p,{children:`En el segundo bloque mirás y proponés: los chequeos que se te ocurran van por el chat de la
videollamada. Después de la pausa manejás vos. Todo lo que se usa hoy es público: los datos de un
campo noruego que su operador liberó para estudiar.`}),`
`,e.jsx(o.h2,{children:"Volve, un campo entero en diez archivos"}),`
`,e.jsx(o.p,{children:`Volve es un campo de petróleo del mar del Norte noruego que Equinor (entonces Statoil) puso en
producción en febrero de 2008 y cerró en septiembre de 2016. En 2018, Equinor y sus socios
liberaron todos sus datos, unos 40,000 archivos: producción, perfiles de pozo, sísmica, informes.
Equinor lo presentó como la liberación de datos más completa de la plataforma continental noruega,
y junta en un mismo campo la producción por pozo, los mapas y los perfiles en formato LAS (Log
ASCII Standard, el formato de texto de los perfiles de pozo).`}),`
`,e.jsx(o.p,{children:`El acceso oficial hoy pasa por una cuenta de Databricks. Para no depender de eso, el curso bajó
diez archivos de copias públicas en GitHub, fijadas a una versión, y los contrastó con el registro
oficial noruego: las FactPages de la Norwegian Offshore Directorate (Sodir).`}),`
`,e.jsxs(o.table,{children:[e.jsx(o.thead,{children:e.jsxs(o.tr,{children:[e.jsx(o.th,{children:"Qué"}),e.jsx(o.th,{children:"Paquete completo (la demo)"}),e.jsx(o.th,{children:"Paquete liviano (tu versión)"})]})}),e.jsxs(o.tbody,{children:[e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"Producción"}),e.jsx(o.td,{children:"El archivo del operador: producción diaria y mensual de 7 pozos, de 2007 a 2016"}),e.jsx(o.td,{children:"La hoja mensual, en CSV (valores separados por comas)"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"Topes de formación"}),e.jsx(o.td,{children:"409 topes de 35 pozos, con profundidad y coordenadas"}),e.jsx(o.td,{children:"Los mismos, en CSV"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"Mapa"}),e.jsx(o.td,{children:"El tope de la Formación Hugin, el reservorio: 184,066 puntos, uno cada 12.5 m"}),e.jsx(o.td,{children:"Uno de cada tres puntos por lado: 20,449"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"Perfiles de pozo"}),e.jsx(o.td,{children:"F-12 (entrada e interpretación), F-11 B y F-14"}),e.jsx(o.td,{children:"F-12, de 2,680 a 3,600 m"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"Trayectoria"}),e.jsx(o.td,{children:"La de F-12"}),e.jsx(o.td,{})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"Sodir"}),e.jsx(o.td,{children:"Los pozos del campo y su producción mensual"}),e.jsx(o.td,{children:"Los mismos dos"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"Tamaño"}),e.jsx(o.td,{children:"16.1 MB"}),e.jsx(o.td,{children:"2.5 MB"})]})]})]}),`
`,e.jsx(o.p,{children:`Las siglas que aparecen en todos los archivos. MD (measured depth) es la profundidad medida a lo
largo del pozo, desde la mesa rotaria, unos 55 m sobre el mar. TVDSS (true vertical depth subsea)
es la profundidad vertical bajo el nivel del mar. Sm³ es el metro cúbico en condiciones estándar.
En un perfil, GR (gamma ray) son los rayos gamma, altos en las arcillas y bajos en las arenas; RHOB
es la densidad y NPHI la porosidad neutrónica.`}),`
`,e.jsx(o.h3,{children:"Los archivos del paquete liviano"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.a,{href:"descargas/volve/volve_liviano.zip",children:"volve_liviano.zip"}),", todo junto (435 KB)"]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.a,{href:"descargas/volve/produccion_mensual_por_pozo.csv",children:"produccion_mensual_por_pozo.csv"}),`: 526 filas,
7 pozos`]}),`
`,e.jsx(o.li,{children:e.jsx(o.a,{href:"descargas/volve/topes_formacion.csv",children:"topes_formacion.csv"})}),`
`,e.jsxs(o.li,{children:[e.jsx(o.a,{href:"descargas/volve/15_9-F-12_perfiles_2680-3600m.las",children:"15_9-F-12_perfiles_2680-3600m.las"}),`, y el
mismo archivo con otro nombre,
`,e.jsx(o.a,{href:"descargas/volve/15_9-F-12_perfiles_2680-3600m_las.txt",children:"15_9-F-12_perfiles_2680-3600m_las.txt"}),`,
para las herramientas que no aceptan `,e.jsx(o.code,{children:".las"})]}),`
`,e.jsx(o.li,{children:e.jsx(o.a,{href:"descargas/volve/grilla_tope_hugin_raleada.csv",children:"grilla_tope_hugin_raleada.csv"})}),`
`,e.jsxs(o.li,{children:[e.jsx(o.a,{href:"descargas/volve/sodir_volve_pozos.csv",children:"sodir_volve_pozos.csv"}),` y
`,e.jsx(o.a,{href:"descargas/volve/sodir_volve_produccion_campo_mensual.csv",children:"sodir_volve_produccion_campo_mensual.csv"})]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.a,{href:"descargas/volve/README.md",children:"README.md"}),", con el diccionario de datos de cada archivo"]}),`
`]}),`
`,e.jsxs(o.p,{children:[`Datos del campo Volve de Equinor y los ex socios de la licencia (ExxonMobil Exploration &
Production Norway AS, Bayerngas Norge AS), compartidos acá bajo
`,e.jsx(o.a,{href:"https://cdn.equinor.com/files/h61q9gi9/global/de6532f6134b9a953f6c41bac47a0c055a3712d3.pdf",children:"sus términos"}),`:
está permitido usarlos, adaptarlos y compartirlos con crédito, y está prohibido venderlos. Los
archivos del paquete están recortados y traducidos, como detalla su README. Los dos de Sodir
contienen datos bajo la `,e.jsx(o.a,{href:"https://data.norge.no/nlod/en/2.0",children:"Norwegian Licence for Open Government Data"}),`
(NLOD) distribuidos por la Norwegian Offshore Directorate, filtrados al campo Volve.`]}),`
`,e.jsx(o.p,{children:`La pregunta del día tiene dos partes: qué hay en estos archivos, y si cuadran entre sí y con la
fuente oficial. Es la primera pregunta que conviene hacerle a cualquier conjunto de datos que llega
de otra área, de un socio o de un contratista.`}),`
`,e.jsx(o.h2,{children:"La herramienta, armada por un agente en vivo"}),`
`,e.jsx(o.p,{children:`La herramienta es un tablero HTML (el formato de las páginas web) de un solo archivo, que se abre
con doble clic y sin red, armado por Claude Code sobre la carpeta del paquete completo. Claude Code es el agente de terminal de
Anthropic que viste en la sesión 5; corre en la computadora del instructor, con una cuenta paga.
Es el mismo loop: lee un archivo, escribe un programa en Python, lo corre, lee el error y corrige.`}),`
`,e.jsx(o.h3,{children:"La carpeta"}),`
`,e.jsxs(o.table,{children:[e.jsx(o.thead,{children:e.jsxs(o.tr,{children:[e.jsx(o.th,{children:"En la carpeta"}),e.jsx(o.th,{children:"Qué es"})]})}),e.jsxs(o.tbody,{children:[e.jsxs(o.tr,{children:[e.jsx(o.td,{children:e.jsx(o.code,{children:"CLAUDE.md"})}),e.jsx(o.td,{children:"Las instrucciones del proyecto: reglas de trabajo, qué es cada columna de cada archivo, las trampas conocidas, el tablero que se pide y siete chequeos"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:e.jsx(o.code,{children:"PEDIDO.md"})}),e.jsx(o.td,{children:"El pedido, en cinco pasos. Es lo único que se escribe en la terminal"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:e.jsx(o.code,{children:".claude/settings.json"})}),e.jsxs(o.td,{children:["Los permisos: sin preguntar puede leer, correr Python y escribir en ",e.jsx(o.code,{children:"salida/"}),"; tiene prohibido internet, borrar archivos y tocar ",e.jsx(o.code,{children:"datos/"})]})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:e.jsx(o.code,{children:"datos/"})}),e.jsx(o.td,{children:"Los diez archivos, en seis carpetas: producción, topes, mapas, trayectorias, perfiles y Sodir"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:e.jsx(o.code,{children:"salida/"})}),e.jsx(o.td,{children:"Vacía al empezar. Ahí quedan el programa, el tablero, las tablas y un informe de una página"})]})]})]}),`
`,e.jsx(o.p,{children:`El archivo de instrucciones separa dos cosas. Lo que ya se sabe de los datos va escrito como regla,
para que el agente no tenga que descubrirlo. Un extracto:`}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{children:`- La profundidad bajo el nivel del mar tiene signo distinto según el
  archivo: negativa en los topes, positiva en la grilla.
- Las coordenadas están en ED50. Un mapa web usa WGS84, y sin convertir
  los puntos se corren del orden de cien metros: el mapa del tablero va
  en metros UTM, sin mapa base.
`})}),`
`,e.jsx(o.p,{children:`ED50 y WGS84 son dos datums geodésicos (European Datum 1950 y World Geodetic System 1984), y UTM
es la proyección Universal Transversal de Mercator. Lo que todavía no se sabe va como chequeo: una
pregunta que el agente tiene que contestar con un número, sin la respuesta al lado.`}),`
`,e.jsx(o.h3,{children:"El tablero"}),`
`,e.jsx(o.p,{children:"El pedido tiene cinco pasos, y el tablero, seis secciones:"}),`
`,e.jsxs(o.ol,{children:[`
`,e.jsx(o.li,{children:`Inventario: cada archivo con su formato, tamaño, filas o muestras, período o profundidades, y qué
pozos nombra.`}),`
`,e.jsx(o.li,{children:`Producción por pozo, y la suma de los pozos contra la producción del campo según Sodir, año
por año.`}),`
`,e.jsx(o.li,{children:"Mapa del tope de Hugin, con el punto donde cada pozo entra al reservorio."}),`
`,e.jsx(o.li,{children:"Visor de perfiles de F-12: GR, densidad con porosidad neutrónica, y resistividad."}),`
`,e.jsx(o.li,{children:"Nombres: cómo se escribe cada pozo en cada archivo."}),`
`,e.jsx(o.li,{children:"Chequeos, con el número que sostiene cada resultado."}),`
`]}),`
`,e.jsx(o.p,{children:`En los ensayos, la corrida llevó de 13 a 18 minutos y unas 50 a 60 vueltas del loop. Tu parte, mientras
tanto, es proponer por el chat qué chequearías antes de creerle: un total contra la fuente, un
pozo, una profundidad.`}),`
`,e.jsx(o.h3,{children:"Los siete chequeos"}),`
`,e.jsxs(o.ol,{children:[`
`,e.jsx(o.li,{children:"Conciliación: ¿la suma del petróleo de los pozos da lo mismo que Sodir para el campo?"}),`
`,e.jsx(o.li,{children:"Pozo sin reservorio: ¿cada pozo con producción tiene su tope de Hugin?"}),`
`,e.jsx(o.li,{children:"Producción contra perfiles: ¿el mayor productor tiene los mejores perfiles?"}),`
`,e.jsx(o.li,{children:"Curvas constantes: ¿algún perfil medido repite exactamente el mismo valor en un tramo largo?"}),`
`,e.jsx(o.li,{children:"Boca de F-12: ¿el perfil, la trayectoria y Sodir ponen el pozo en el mismo lugar?"}),`
`,e.jsx(o.li,{children:"Hoja diaria: ¿hay días de más de 24 horas, o volúmenes negativos?"}),`
`,e.jsx(o.li,{children:`Mapa contra topes: ¿la grilla y los topes dan la misma profundidad donde el pozo entra al
reservorio?`}),`
`]}),`
`,e.jsxs("details",{children:[e.jsx("summary",{children:"Lo que tiene que dar"}),e.jsx(o.p,{children:"Calculado aparte, con un programa independiente sobre los mismos diez archivos."}),e.jsxs(o.table,{children:[e.jsx(o.thead,{children:e.jsxs(o.tr,{children:[e.jsx(o.th,{children:"Chequeo"}),e.jsx(o.th,{children:"Resultado"})]})}),e.jsxs(o.tbody,{children:[e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"1. Conciliación"}),e.jsx(o.td,{children:"Los pozos suman 10.04 millones de Sm³ de petróleo y Sodir da 10.17: 134,909 Sm³ menos, −1.3%. Los pozos suman menos todos los años, y más que nunca en 2016 (−4.1%). El agua cuadra a −0.2%. El gas no se compara: Sodir publica el gas vendido, 0.81 miles de millones de Sm³, contra 1.48 producidos"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"2. Pozo sin reservorio"}),e.jsx(o.td,{children:"La producción de F-11 (1.15 millones de Sm³, de julio de 2013 a septiembre de 2016) está cargada a 15/9-F-11. Sodir lo lista como pozo de observación, y en los topes no pasa del fondo marino. La rama productora es F-11 B, terminada el 15 de junio de 2013, que cruza el tope de Hugin siete veces"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"3. Producción contra perfiles"}),e.jsx(o.td,{children:"F-14 es el segundo productor (3.94 millones de Sm³, 39.3% de lo que suman los pozos) y el primero en agua. En el paquete tiene un solo perfil, la permeabilidad, en 208 m; el resto existe en un formato binario que el paquete no trae. F-12, el primero (4.58 millones, 45.6%), tiene once curvas de 240 a 4,187 m y cinco de interpretación en el reservorio"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"4. Curvas constantes"}),e.jsx(o.td,{children:"El GR de F-12 vale 100.669 unidades API (American Petroleum Institute) desde 3,509.0 m hasta el final del archivo, 4,186.7 m: 4,448 muestras. Sodir da 3,520 m de profundidad final, así que 667 m de GR están debajo del fondo del pozo. La densidad, el neutrón y las resistividades terminan entre 3,505 y 3,508 m"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"5. Boca de F-12"}),e.jsx(o.td,{children:"El encabezado del perfil la pone 8.5 m al norte de la trayectoria y a 8.6 m de Sodir. La trayectoria y Sodir coinciden a 0.1 m"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"6. Hoja diaria"}),e.jsx(o.td,{children:"20 filas con más de 24 horas en línea (13 con 25 exactas), en cinco días: el último domingo de octubre, cuando termina el horario de verano. Cuatro volúmenes de agua negativos, en F-12 y F-14. F-5 es inyector y figura 144 días de 2016 como productor"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:"7. Mapa contra topes"}),e.jsx(o.td,{children:"Menos de 3.5 m de diferencia en seis de los siete pozos. En F-1 C, 9.5 m, y ese tope está calificado como tope por falla"})]})]})]}),e.jsxs(o.p,{children:[`El tablero que armó el agente en uno de los ensayos, tal cual lo entregó (un solo archivo, se abre
con doble clic y sin red): `,e.jsx(o.a,{href:"descargas/volve/tablero_volve.html",children:"tablero_volve.html"}),"."]})]}),`
`,e.jsx(o.p,{children:`Ningún chequeo invalida el conjunto de datos. Cada uno cambia lo que se puede afirmar: un 1.3% de
diferencia importa en un balance de reservas; un GR relleno parece dato hasta que se lo compara
con la profundidad final; y un pozo mal nombrado deja sin reservorio al 11% de la producción. Si
el agente llega a otros números, alguno de los dos se equivocó, y hay que encontrar cuál antes de
seguir.`}),`
`,e.jsx(o.h2,{children:"Tu versión, con un agente gratuito"}),`
`,e.jsx(o.p,{children:"Después de la pausa manejás vos, con el paquete liviano y una de dos herramientas gratuitas:"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"Claude"}),`, con la ejecución de código activada. Corre Python sobre tus archivos y puede mostrar
el resultado como un artifact: una página interactiva al lado de la conversación.`]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:e.jsx(o.a,{href:"https://arena.ai/agent",children:"Arena, modo agente"})}),`, que le da al modelo una computadora descartable
en la nube. Acepta `,e.jsx(o.code,{children:".csv"})," y ",e.jsx(o.code,{children:".txt"}),", y no ",e.jsx(o.code,{children:".las"})," ni ",e.jsx(o.code,{children:".zip"}),`: subí los archivos sueltos y el perfil
con la copia `,e.jsx(o.code,{children:"_las.txt"}),`. Lo que escribís ahí puede compartirse con los proveedores de los
modelos, así que va solo dato público, como este.`]}),`
`]}),`
`,e.jsx(o.p,{children:"Elegí una de las dos tareas. La primera usa cuatro archivos; la segunda, uno."}),`
`,e.jsx(o.h3,{children:"La ficha del pozo F-12"}),`
`,e.jsxs(o.p,{children:["Subí ",e.jsx(o.code,{children:"produccion_mensual_por_pozo.csv"}),", ",e.jsx(o.code,{children:"topes_formacion.csv"}),", ",e.jsx(o.code,{children:"sodir_volve_pozos.csv"}),` y el perfil
de F-12, y pegá esto:`]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-text",children:`Te subo cuatro archivos públicos del campo Volve (mar del Norte, Equinor):
la producción mensual por pozo, los topes de formación, la lista de pozos
del registro oficial noruego (Sodir) y un perfil LAS del pozo 15/9-F-12.
El mismo pozo se escribe distinto en cada archivo: 15/9-F-12, NO 15/9-F-12,
15_9-F-12.

Con código, armá la ficha del pozo 15/9-F-12:
1. Qué dice Sodir: propósito, fechas de perforación, profundidad final.
2. Su petróleo y su agua por mes, en un gráfico, con el acumulado y su
   participación en el total de los 7 pozos.
3. Sus topes, con MD y TVDSS, y dónde entra al reservorio (el tope
   "Hugin Fm. VOLVE Top").
4. Un gráfico del perfil: GR, RHOB con NPHI, y RT en escala logarítmica,
   con los topes como líneas horizontales.

Mostrame la ficha como un artifact de una página, con unidades en cada
eje y cada número. Al final, decime qué supusiste.
`})}),`
`,e.jsx(o.h3,{children:"Un visor del perfil de F-12"}),`
`,e.jsx(o.p,{children:"Subí solo el perfil y pegá esto:"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-text",children:`Te subo un perfil de pozo en formato LAS (Log ASCII Standard) del pozo
15/9-F-12 del campo Volve (mar del Norte, datos públicos de Equinor).

1. Con código, leé el encabezado y decime qué curvas trae, con su unidad,
   y de qué profundidad a qué profundidad va. El valor nulo es -999.25.
2. Armá un visor del perfil como un artifact: profundidad hacia abajo y
   tres pistas, GR (0 a 150 API), RHOB (1.95 a 2.95 g/cm3) con NPHI
   (0.45 a -0.15) superpuestas, y RT en escala logarítmica (0.2 a 2,000
   ohm.m). Que se pueda elegir el tramo de profundidad a mirar.
3. Decime qué supusiste y qué no pudiste leer.
`})}),`
`,e.jsx(o.p,{children:`Si el artifact no aparece, pedile el mismo visor como un archivo HTML para bajar. Si el agente pide
confirmación antes de seguir, contestale; es parte de su loop.`}),`
`,e.jsx(o.h3,{children:"Dos chequeos"}),`
`,e.jsx(o.p,{children:"Con la ficha o el visor andando, pegá esto en la misma conversación:"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-text",children:`Dos chequeos, cada uno con el número que lo sostiene:
a) ¿Hay algún tramo largo del LAS (más de 100 muestras seguidas, unos
   15 m) donde una curva repite exactamente el mismo valor? ¿Dónde
   empieza? Comparalo con la profundidad final del pozo según Sodir
   (sodir_volve_pozos.csv), y con la última profundidad con dato de las
   otras curvas.
b) En produccion_mensual_por_pozo.csv hay un pozo 15/9-F-11. ¿Qué dice
   Sodir de ese pozo y de sus otras ramas (propósito, fechas)? ¿Qué rama
   produjo ese petróleo, y qué dicen los topes de cada una?
`})}),`
`,e.jsxs(o.p,{children:["Para el chequeo b hacen falta ",e.jsx(o.code,{children:"sodir_volve_pozos.csv"})," y ",e.jsx(o.code,{children:"topes_formacion.csv"}),`: si hiciste el visor,
subilos ahora.`]}),`
`,e.jsxs("details",{children:[e.jsx("summary",{children:"Lo que tiene que dar"}),e.jsxs(o.p,{children:[e.jsx(o.strong,{children:"La ficha."}),` Sodir: pozo de producción de petróleo, perforado del 14 de junio al 27 de agosto de
2007, con 3,520 m de profundidad final medida; hoy taponado y abandonado. Produjo 4,579,610 Sm³ de
petróleo, el 45.6% de lo que suman los siete pozos, y 6,833,320 Sm³ de agua, de febrero de 2008 a agosto de 2016. Entra
a Hugin a 3,126.0 m de MD (2,818.4 m bajo el nivel del mar) y sale a 3,280.3 m.`]}),e.jsxs(o.p,{children:[e.jsx(o.strong,{children:"El perfil."}),` Ocho curvas y la profundidad, de 2,680.1 a 3,600.0 m, una muestra cada 0.1524 m (medio pie):
6,037 muestras.`]}),e.jsxs(o.p,{children:[e.jsx(o.strong,{children:"a) El GR relleno."}),` Desde 3,509.0 m hasta el final del archivo, el GR vale siempre 100.669 API:
598 muestras en el recorte. El último valor medido es de 3,508.9 m. Sodir da 3,520 m de
profundidad final, y la densidad, el neutrón y las resistividades terminan entre 3,505 y 3,508 m.
Los últimos 11 m antes del fondo pueden ser la distancia entre el sensor de GR y la mecha; los 80 m
que siguen están debajo del fondo del pozo. Es un valor de relleno, y un gráfico sin chequeo lo dibuja como una arcilla.`]}),e.jsxs(o.p,{children:[e.jsx(o.strong,{children:"b) F-11 contra F-11 B."}),` El archivo de producción carga 1,147,849 Sm³ a 15/9-F-11, de julio de
2013 a septiembre de 2016. Sodir: 15/9-F-11 y 15/9-F-11 A son pozos de observación (perforados entre
marzo y mayo de 2013); 15/9-F-11 B es el de producción, terminado el 15 de junio de 2013, justo
antes del primer mes con petróleo. En los topes, NO 15/9-F-11 tiene solo dos (el fondo marino y el
Grupo Nordland) y NO 15/9-F-11 B cruza el tope de Hugin siete veces. El petróleo es de F-11 B.`]})]}),`
`,e.jsx(o.p,{children:`La última parte del bloque es una ronda: cada uno dice qué entregó su agente y en qué se equivocó,
si se equivocó. Un número que no coincide con el de arriba se rastrea hasta el archivo y la fila de
donde salió.`}),`
`,e.jsx(o.h2,{children:"Taller: el caso de tu empresa, en una página"}),`
`,e.jsx(o.p,{children:`El último bloque es de escritura, por empresa: los de PCR juntos, los de Andes juntos, y CGC y
Tecpetrol cada uno por su cuenta. El punto de partida es el problema que cada uno nombró el lunes
en la ronda de relevamiento. El resultado es una página con el primer caso de uso que probarían en
su empresa, y mañana, en la sesión 8, se critica con el mismo protocolo que el caso prearmado del
curso. Una línea o dos por pregunta alcanzan.`}),`
`,e.jsxs(o.table,{children:[e.jsx(o.thead,{children:e.jsxs(o.tr,{children:[e.jsx(o.th,{children:"Pregunta"}),e.jsx(o.th,{children:"Qué tiene que decir"}),e.jsx(o.th,{children:"El tablero de hoy, como ejemplo"})]})}),e.jsxs(o.tbody,{children:[e.jsxs(o.tr,{children:[e.jsx(o.td,{children:e.jsx(o.strong,{children:"Dolor"})}),e.jsx(o.td,{children:'Qué tarea, cuán seguido, quién la sufre. "Todos los lunes, el ingeniero de producción, tres horas" dice más que "optimizar la gestión"'}),e.jsx(o.td,{children:"Recibir los datos de un campo de otra área y saber, antes de usarlos, qué hay y si cuadran"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:e.jsx(o.strong,{children:"Datos"})}),e.jsx(o.td,{children:"Dónde viven, en qué formato, quién los tiene"}),e.jsx(o.td,{children:"Una planilla de producción, topes en texto, una grilla, perfiles LAS y el registro oficial"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:e.jsx(o.strong,{children:"Sensibilidad"})}),e.jsx(o.td,{children:"Qué puede salir de la empresa y qué no, y si hay un análogo público para probar el flujo"}),e.jsx(o.td,{children:"Ninguna: son públicos. Con datos propios, el agente corre adentro de la red"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:e.jsx(o.strong,{children:"Verificabilidad"})}),e.jsx(o.td,{children:"Contra qué se compara el resultado y cuánto tarda comprobarlo. Si comprobar cuesta más que hacer, no es un caso"}),e.jsx(o.td,{children:"La producción oficial del campo, y siete chequeos con número"})]}),e.jsxs(o.tr,{children:[e.jsx(o.td,{children:e.jsx(o.strong,{children:"Primer paso"})}),e.jsx(o.td,{children:"Qué probarían el lunes, con qué herramienta y con qué archivo"}),e.jsx(o.td,{children:"Una carpeta con los datos y un archivo de instrucciones de una página"})]})]})]}),`
`,e.jsx(o.p,{children:`Tienen que estar los tres criterios con los que la primera edición del curso eligió su caso real:
un dolor frecuente, datos disponibles y no sensibles, y un resultado verificable. Si el caso pasa
la crítica de mañana, esta página es casi el archivo de instrucciones de su proyecto.`}),`
`,e.jsx(o.p,{children:`Por el chat va solo lo que no es confidencial: la fila del dolor y la del primer paso alcanzan para
la ronda. El resto queda en su documento.`}),`
`,e.jsx(o.h2,{children:"Para llevarse"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:`Antes de analizar un conjunto de datos, pedí el inventario y el cruce: qué archivo es qué, y si
el total da lo mismo que la fuente oficial.`}),`
`,e.jsx(o.li,{children:`Lo que ya sabés de tus datos (signos, unidades, nombres) va escrito en las instrucciones; lo que
no sabés, como chequeo con número.`}),`
`,e.jsx(o.li,{children:"Un tablero prolijo se verifica igual: elegí un número y rastrealo hasta el archivo y la fila."}),`
`]}),`
`,e.jsx(o.h2,{children:"Para discutir"}),`
`,e.jsxs(o.ol,{children:[`
`,e.jsx(o.li,{children:`¿Qué conjunto de datos de tu área llega de otra gerencia, de un socio o de un contratista, y
nadie cruza contra una fuente independiente?`}),`
`,e.jsx(o.li,{children:`En tu trabajo, ¿dónde se escribe el mismo pozo de tres formas distintas? ¿Quién lleva hoy la
tabla de equivalencias?`}),`
`,e.jsx(o.li,{children:`El GR relleno se ve como una arcilla. ¿Qué valor de relleno o por defecto de tus sistemas se ve
como un dato real?`}),`
`,e.jsx(o.li,{children:`¿Qué parte del tablero de hoy le darías a un agente con tus datos, y qué te frenaría: la
capacidad o el permiso?`}),`
`]}),`
`,e.jsx(o.h2,{children:"Tarea para mañana"}),`
`,e.jsx(o.p,{children:`Pulí la página del caso de tu empresa: releé las cinco filas y completá la que quedó floja, que
casi siempre es la de verificabilidad. Cinco minutos. Mañana, en la sesión 8, se leen los cuatro
casos con el mismo protocolo que el caso prearmado del curso.`}),`
`,e.jsx(r,{data:"quiz_s6",sesion:6})]})}function c(a={}){const{wrapper:o}=a.components||{};return o?e.jsx(o,{...a,children:e.jsx(n,{...a})}):n(a)}export{c as default};
