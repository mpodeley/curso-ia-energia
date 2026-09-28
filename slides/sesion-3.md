---
marp: true
theme: podeley
paginate: true
header: 'IA generativa · petróleo y gas · **Sesión 3**'
footer: 'mpodeley.github.io/curso-ia-energia'
---

<!-- _class: portada -->

# Prompts y datos, en la práctica

Sesión 3 de 8 · día 2: datos y documentos, con el chatbot trabajando · 2 h en vivo · **PCR · CGC · Tecpetrol · Andes Petroleum**

<!--
0:00 · portada mientras entra la gente
Ventanas de hoy: A este deck; C el sitio en la página de la sesión 3; D Claude
con la ejecución de código y la creación de archivos activadas (si se puede,
una cuenta gratuita, para ver lo mismo que ellos); E Arena en modo batalla;
F Gemini como plan B.
En el escritorio: public/descargas/campos_capiv_2006_2026.csv,
campos_capiv_sucio.csv, los dos PDF de Ecuador
(petroecuador-informe-estadistico-2026-ene-ago.pdf y
bce-boletin-sector-petrolero-2026-t2.pdf), el recorte de las páginas 11 y 12,
y surveillance_referencia.xlsx abierto en Excel como respuesta.
Nadie trae nada: ni tarea ni datos. Todo sale de la página.
Apoyo: cronómetro en cero, chat abierto, lista por nombre y empresa a la
vista, y el link de la página de la sesión 3 listo para pegar.
-->

---

<!-- _class: seccion -->

## Apertura

Bloque 1 de 6 · **8 min**

<!--
0 min · acumulado 0:00
Arranca 0:00, termina 0:08.
-->

---

<!-- _class: agenda -->

## Esta sesión

| Bloque | min |
| --- | --- |
| Apertura | 8 |
| Qué hace hoy un chatbot gratuito | 10 |
| Prompt corto, dato bueno | 20 |
| Taller: planilla de surveillance | 37 |
| ¿Cuadran Petroecuador y el Banco Central? | 25 |
| Qué no se sube, y para llevarse | 10 |
| Pausa | 10 |

<!--
1 min · acumulado 0:01
La misma tabla está en la página de la sesión 3.
Bajada del día: ayer vimos qué es y cómo funciona; hoy lo ponemos a trabajar.
Esta mañana, con datos: el chatbot lee un archivo, escribe un programa, lo
corre y devuelve una planilla. Después de la pausa, con documentos.
Apoyo: avisar por el chat privado cuando un bloque se pase cinco minutos.
-->

---

## Al final de la sesión van a poder

- Pedirle a un chatbot gratuito un **análisis con código** sobre un archivo, y verificarlo
- Saber qué va en el prompt cuando **el dato es bueno**, y qué cambia cuando no
- Cruzar **dos fuentes oficiales** y encontrar dónde difieren

<!--
1 min · acumulado 0:02
Decirlo en una frase: hoy el prompt se achica y el dato manda.
-->

---

<!-- _class: panel -->

## Entrá al sitio y abrí Claude

`mpodeley.github.io/curso-ia-energia`

En la página de la sesión 3: la cuenta gratuita de Claude, cómo activar el código, y el archivo para bajar.

<!--
6 min · acumulado 0:08
Tres pasos, con pantalla compartida: crear la cuenta (con Google es un
minuto), activar en la configuración la ejecución de código y la creación
de archivos, y bajar campos_capiv_2006_2026.csv desde la página.
Si el firewall de la empresa bloquea Claude: siguen desde el celular, o
miran la pantalla compartida y hacen el taller en Gemini, que no arma el
Excel pero sí corre el análisis.
Apoyo: pegar el link en el chat y confirmar por nombre, uno por uno, que
cada persona tiene Claude abierto y el archivo bajado. El que se traba,
por el chat privado.
-->

---

<!-- _class: seccion -->

## Qué hace hoy un chatbot gratuito

Bloque 2 de 6 · **10 min**

<!--
0 min · acumulado 0:08
Arranca 0:08, termina 0:18.
-->

---

## Lo que trae cada cuenta gratuita

| Chatbot | Con tus archivos | Lo que entrega |
| --- | --- | --- |
| Claude | Corre código sobre CSV, Excel y PDF | Planillas, documentos y gráficos para bajar |
| ChatGPT | Análisis de datos, con límites | Tablas y gráficos; unas 12 páginas por pedido |
| Gemini | Corre código y grafica una planilla | Tablas a Hojas de cálculo de Google; unas 48 páginas |

Foto al 28 de septiembre de 2026. La cuota gratuita se renueva cada cinco horas.

<!--
6 min · acumulado 0:14
El punto: un chatbot gratuito de hoy ya no solo escribe. Lee el archivo,
escribe un programa, lo corre, mira el resultado y entrega un archivo. Es un
agente chico; mañana le dedicamos el día.
Fuentes en la página: las de precios de cada uno y la ayuda de Claude sobre
creación de archivos (6 de agosto de 2026).
Por qué Claude en el taller: es el único de los tres que, con cuenta
gratuita, devuelve un .xlsx verificado de punta a punta.
-->

---

## La misma escalera en todos

- **OpenAI**: GPT-6 Astra (pago) y GPT-5.6 Luna
- **Anthropic**: Opus 5.5 (pago), Sonnet y Haiku
- **Google**: Pro y Flash

El benchmark que importa es tu tarea, corrida en dos modelos.

<!--
4 min · acumulado 0:18
El grande para lo difícil o lo que se hace una vez; el rápido para lo
repetitivo, después de probar que alcanza. El precio por token no lo pagan
con la cuenta gratuita: importa el día que algo corre mil veces por mes.
Artificial Analysis y Arena están en el material de la página; un punto más
de benchmark no se nota en una planilla.
-->

---

<!-- _class: seccion -->

## Prompt corto, dato bueno

Bloque 3 de 6 · **20 min**

<!--
0 min · acumulado 0:18
Arranca 0:18, termina 0:38.
-->

---

<!-- _class: panel -->

## ¿Qué campos tengo que mirar este mes y por qué?

Una línea, con el archivo adjunto. Nada más.

<!--
6 min · acumulado 0:24
En vivo, en la ventana D: adjuntar campos_capiv_2006_2026.csv y pegar la
pregunta tal cual. Que la hagan a la par.
Mientras corre, mostrar que escribe código y lo ejecuta: es el loop.
Lo que suele encontrar: El Trapial, con lo convencional casi apagado en
2026 y Vaca Muerta creciendo; Puesto Hernández, con la RAP más alta (arriba
de 60); El Corcobo Norte sin enero de 2019. Si no separa convencional de no
convencional, anotarlo: vuelve en el taller.
Apoyo: pedir que dos personas peguen en el chat el primer campo que les
nombró el modelo.
-->

---

## El archivo ya explica

- Columnas con nombre y **unidad**: `petroleo_m3`, `agua_m3`
- Un solo formato de fecha: `2026-07`
- Una fila por campo, mes y tipo de recurso

Buena parte de lo que antes iba en el prompt, ahora lo dice el dato.

<!--
2 min · acumulado 0:26
Sin rol, sin contexto y sin formato, y la respuesta fue buena. El mérito es
del archivo.
-->

---

<!-- _class: panel -->

## El mismo dato, exportado sin cuidado

`campos_capiv_sucio.csv`, en la página. La misma pregunta. ¿Qué supuso?

<!--
5 min · acumulado 0:31
Mismos números: encabezados sin unidades (yac;per;p;a;iny), coma decimal,
convencional y no convencional sumados, fechas en dos formatos, el agua de
Los Perales en barriles (su RAP sale 6.3 veces más alta), ocho meses
borrados y marzo de 2020 de Diadema duplicado.
Lo típico: Los Perales aparece como el peor campo por el agua en barriles, y
El Trapial "mejora" porque Vaca Muerta quedó mezclada. Preguntarle al modelo
qué supuso de las unidades.
La lista completa está en la página, plegada: abrirla recién después.
-->

---

<!-- _class: acentos -->

## Lo que sí va en el prompt

- **Para qué decisión es**
- **Qué cuenta como problema**: un umbral
- **En qué formato**, si lo vas a reusar
- **Que te diga qué supuso** y qué encontró raro

<!--
2 min · acumulado 0:33
Rol, tono y ejemplos siguen sirviendo para escribir texto (correos,
minutas): el constructor de prompts está en la página para practicar.
Para analizar datos, pesan menos que un archivo con columnas claras.
-->

---

<!-- _class: panel -->

## A ciegas, en Arena

`arena.ai` · modo batalla · pegá la tabla de la página

Antes de votar, hacé una cuenta con la calculadora.

<!--
5 min · acumulado 0:38
La tabla anual está en la página, en un bloque para copiar: 2024 a 2026,
convencional, siete campos. El modo batalla anda sin cuenta, no acepta
planillas y no corre código: los modelos hacen las cuentas de memoria.
Cuenta de control: El Corcobo Norte 2025, 8,138,122 / 494,397 = 16.46;
Puesto Hernández 2025, 8,384,926 / 137,549 = 60.96.
Lo que se ve: dos modelos, dos respuestas distintas al mismo dato, y a veces
una división mal hecha con total seguridad.
Aviso: lo que se escribe en Arena puede compartirse con los proveedores; va
solo dato público.
Apoyo: juntar en el chat qué modelo le tocó a cada uno y cuál votó.
Plan B si Arena pide cuenta o no carga: lo muestro yo desde la ventana E.
-->

---

<!-- _class: seccion -->

## Taller: planilla de surveillance

Bloque 4 de 6 · **37 min**

<!--
0 min · acumulado 0:38
Arranca 0:38, termina 1:15.
-->

---

## RAP contra Np

- **RAP**: relación agua-petróleo, el agua producida por cada m³ de petróleo
- **Np**: el petróleo acumulado
- En escala logarítmica, un waterflood maduro dibuja **una recta**

El quiebre de la recta es lo que busca un surveillance.

<!--
4 min · acumulado 0:42
Más agua de la esperada, un pozo nuevo, un cambio de inyección, o un dato
que cambió de definición. Extender la recta hasta la RAP en la que producir
deja de pagar da el acumulado final: está en la página como "para curiosos".
Advertencia: el Np del archivo cuenta desde 2006. Solo El Corcobo Norte
arranca ahí; a los otros les falta lo producido antes.
-->

---

<!-- _class: panel -->

## Tu planilla, en Claude

El prompt está en la página. Copialo, adjuntá el archivo, y cuando baje el Excel, abrilo.

<!--
20 min · acumulado 1:02
El prompt de la página es el contrato: solo convencional; ventana reciente
de 3 meses contra los 12 anteriores; rojo con 15%, amarillo con 5%; Np desde
2006; fórmulas que lean la hoja Datos; hoja Léeme. El mismo contrato lo
implementa scripts/surveillance_referencia.py, que armó la planilla de
referencia.
Correrlo en vivo a la par en la ventana D. Tarda entre dos y cinco minutos:
mientras, recorrer el código que escribe.
Plan B si se agota la cuota gratuita de alguien: sigue en Gemini (hace el
análisis, sin el .xlsx) o baja surveillance_referencia.xlsx de la página.
Apoyo: a los 12 minutos, ronda rápida por el chat: ¿quién tiene el Excel
abierto? A los que no, el link de la planilla de referencia.
-->

---

## Tres chequeos antes de confiar

1. **¿Fórmula o número pegado?** Una celda de RAP del Resumen
2. **Una cuenta a mano**: El Corcobo Norte, mayo a julio de 2026
3. **¿Vio lo raro?** Enero de 2019 que falta, El Trapial que se apaga

<!--
8 min · acumulado 1:10
La cuenta de control: El Corcobo Norte, mayo a julio de 2026, agua 2,017,696
m³ y petróleo 116,143 m³: RAP 17.37. Petróleo reciente: 116,143 / 92 días =
1,262.4 m³/d.
Si la planilla trae números pegados, pedirle que la rehaga con fórmulas: es
la diferencia entre una respuesta y una herramienta.
Apoyo: ronda con nombre, uno por empresa: ¿qué chequeo falló?
-->

---

## Lo que tiene que dar

| Campo | Semáforo | Por qué |
| --- | --- | --- |
| El Trapial | rojo | Petróleo convencional −90% |
| Puesto Hernández | amarillo | Petróleo −10% |
| Los Perales | amarillo | Petróleo −8%, cambió de operadora |
| El Corcobo Norte | amarillo | Petróleo −5%, falta un mes |
| Manantiales Behr | amarillo | RAP +7%, cambió de operadora |
| Chihuido y Diadema | verde | Estables |

<!--
5 min · acumulado 1:15
Los números completos están en la página, plegados, y en
surveillance_referencia.xlsx.
El Trapial es la historia: lo convencional pasa de 71,639 m³ en 2025 a 5,332
m³ en siete meses de 2026, mientras Vaca Muerta crece en el mismo campo.
Sumado todo, la RAP del campo parece mejorar. Separado, lo convencional se
está apagando. Por eso el prompt pedía solo convencional.
-->

---

<!-- _class: seccion -->

## ¿Cuadran Petroecuador y el Banco Central?

Bloque 5 de 6 · **25 min**

<!--
0 min · acumulado 1:15
Arranca 1:15, termina 1:40.
-->

---

## Dos documentos, un trimestre

- **EP Petroecuador**: informe estadístico, enero a agosto de 2026, páginas 11 y 12
- **Banco Central del Ecuador**: boletín del sector petrolero, segundo trimestre, tabla 2

El prompt está en la página: los dos PDF adjuntos, la misma pregunta.

<!--
15 min · acumulado 1:30
Que lo corran en Claude con los dos PDF. En Gemini no entra el informe
completo: usar el recorte de las páginas 11 y 12 que está en la página.
En vivo a la par en la ventana D. Mientras corre, mostrar las dos páginas
originales.
Apoyo: pedir que peguen en el chat el promedio diario que les dio.
Seguramente aparezcan 360,513, 360,500 y alguno raro: son el material de
la lámina siguiente.
-->

---

<!-- _class: acentos -->

## Dónde mirar

- **Formatos**: 11.213.284 en Petroecuador; 32,81 en el Banco Central
- **El promedio**: total sobre días, o promedio de promedios
- **Filas que no son**: crudo y gas, y una fila escondida en el texto del PDF
- **La etiqueta**: dice "BPPD" en una página en barriles

<!--
5 min · acumulado 1:35
La fila escondida: en la página 12, la capa de texto trae una fila "PRODUCCIÓN
GAS BOE" que en la imagen no se ve. Un modelo que lee el texto puede ver
números que nadie ve. Si alguien la citó, es el mejor ejemplo del día.
Otras respuestas que salen mal: dividir por 90 días (364,519), tomar crudo y
gas (364,929), el promedio de enero a agosto (363,393).
-->

---

## Cuadran, y el atajo casi también

- Abril a junio: **32,806,722** barriles, en 91 días: **360,513** por día
- Banco Central: 32.81 millones y 360.51 mil por día
- Promedio de los tres promedios mensuales: **360,500**

Trece barriles por día, escondidos en el segundo decimal.

<!--
5 min · acumulado 1:40
Cuadran al redondeo. El Banco Central toma el dato de la ARCH: es el reporte
de la empresa contra el del regulador, y coinciden.
El promedio simple da 360,50 en la escala del Banco Central: parece
redondeo, y es un error de método. Con un trimestre de 90 o 92 días la
diferencia crece.
Datos provisionales: Petroecuador lo dice en la portada, y el recorte de
dos páginas lo pierde. Vale la pena decirlo.
-->

---

<!-- _class: seccion -->

## Qué no se sube, y para llevarse

Bloque 6 de 6 · **10 min**

<!--
0 min · acumulado 1:40
Arranca 1:40, termina 1:50.
-->

---

<!-- _class: cita -->

## Si no lo pondrías en un correo a un desconocido, **no va en el chat**

<!--
4 min · acumulado 1:44
Todo lo de hoy fue público. En la sala hay cuatro empresas que compiten, y el
chat de la videollamada es tan compartido como el chatbot: ningún ejercicio
pide un dato de la empresa. Para practicar con una estructura real: datos
públicos, datos viejos, o la misma planilla con números inventados. Los casos
grises y las versiones corporativas, en la sesión 7.
-->

---

<!-- _class: acentos -->

## Qué te llevás de esta sesión

- **Arreglá el dato** antes de alargar el prompt
- **Pedí que te diga qué supuso**, y verificá una cuenta a mano
- **Pedí fórmulas** en la planilla que vas a reusar

<!--
6 min · acumulado 1:50
Decirlas en palabras propias, sin leer. Si sobra un minuto, preguntar quién
se lleva la planilla para probarla con un campo de su trabajo, en la cuenta
corporativa y no en la gratuita.
Apoyo: la hora de vuelta en el chat.
-->

---

## Pausa · 10 min

A las 12:00 (10:00 en Ecuador y Colombia) sigue la **sesión 4**: tus documentos, con Gemini Notebook. Dejá abierta la página de la sesión 4.

<!--
10 min · acumulado 2:00
Cerrar este deck y abrir el de la sesión 4. Ventana nueva con Gemini
Notebook y el cuaderno de reservas y normativa ya armado.
-->
