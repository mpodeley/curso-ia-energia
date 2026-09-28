# Tablero del campo Volve

Este proyecto arma un tablero HTML de un solo archivo que describe y visualiza un conjunto de datos
público: el campo Volve, del mar del Norte noruego, que Equinor operó de 2008 a 2016 y cuyos datos
liberó en 2018. El tablero responde dos preguntas: qué hay en estos archivos, y si cuadran entre sí
y con la fuente oficial noruega. No interpreta el reservorio ni recomienda nada sobre el campo.

## Reglas de trabajo

1. Trabajás solo con los archivos de `datos/`. No hay acceso a internet y no hace falta. Un dato
   que no está en esos archivos queda vacío y se dice; nunca se completa con un supuesto. Una
   explicación que no sale de los archivos (un calendario, una práctica de la industria) va
   escrita como hipótesis.
2. Todo lo que produzcas va en `salida/`, y solo los archivos de la tabla de salidas: nada de
   auxiliares. Para explorar, `python -c` sin importar el script. La carpeta `datos/` no se
   modifica.
3. Un solo script, `salida/armar_tablero.py`, que regenere todas las salidas cada vez que corre.
   Corré Python siempre así:
   `uv run --with pandas --with openpyxl --with matplotlib python salida/armar_tablero.py`
   Los LAS, los CSV, la trayectoria y el `.dat` se leen con Python común: no instales nada más.
4. El tablero es un solo archivo, `salida/tablero_volve.html`, que se abre con doble clic y sin
   red: nada de CDN, fuentes web, mapas base ni archivos al lado. Los gráficos se hacen con
   matplotlib, se guardan también como PNG en `salida/` y van embebidos en el HTML en base64. El
   HTML pesa menos de 3 MB.
5. Cada número del tablero y del informe lo calcula el script a partir de `datos/`. Imprimí en
   la terminal cada conteo y cada chequeo a medida que los hacés.
6. Unidades en cada eje, columna y cifra. Números con punto decimal y coma de miles (`1,234.5`) en
   el tablero, el informe, la terminal y los textos de `chequeos.csv`; en las columnas numéricas
   de los CSV, sin separador de miles.
7. Texto en español. Un párrafo de siglas al principio del tablero alcanza: MD (measured depth,
   profundidad medida), TVDSS (true vertical depth subsea, profundidad vertical bajo el nivel del
   mar), LAS (Log ASCII Standard, el formato de los perfiles), GR (gamma ray, rayos gamma), RHOB
   (densidad), NPHI (porosidad neutrónica), RT y RD (resistividad verdadera y profunda), Sm³
   (metro cúbico estándar), UTM y ED50 (la proyección y el datum de las coordenadas).
   El tablero y el informe son notas de trabajo internas: no hace falta cargar ninguna skill de
   estilo para escribirlos.
8. Usá los nombres de salida de la tabla de abajo y no los cambies: no podés borrar archivos, así
   que un archivo renombrado queda duplicado.
9. El pie del tablero lleva este crédito, textual, con el link:
   "Datos de Equinor y los ex socios de la licencia Volve (ExxonMobil Exploration & Production
   Norway AS, Bayerngas Norge AS), bajo la Equinor Open Data Licence
   (https://cdn.equinor.com/files/h61q9gi9/global/de6532f6134b9a953f6c41bac47a0c055a3712d3.pdf).
   Contiene datos bajo la Norwegian Licence for Open Government Data (NLOD 2.0) distribuidos por
   la Norwegian Offshore Directorate (Sodir)."

## Los datos

Diez archivos en seis carpetas. Las coordenadas de todos están en UTM zona 31 norte, datum ED50,
en metros. Las profundidades MD y TVD se miden desde la mesa rotaria (KB, kelly bushing), unos 55 m sobre el
nivel del mar; la altura exacta de cada pozo está en Sodir (`wlbKellyBushElevation`) y en el
encabezado de algunos LAS (`ELEV`).

### `produccion/Volve production data.xlsx`

El archivo de producción del operador. Dos hojas.

**`Monthly Production Data`**: una fila por pozo y por mes. La primera fila trae los nombres y la
segunda las unidades; los datos empiezan en la tercera.

| Columna | Qué es | Unidad |
| --- | --- | --- |
| `Wellbore name` | Nombre del pozo, por ejemplo `15/9-F-12` | |
| `NPDCode` | Código del pozo en el registro noruego | |
| `Year`, `Month` | Año y mes | |
| `On Stream` | Horas en producción o inyección en el mes | h |
| `Oil`, `Gas`, `Water` | Volúmenes producidos en el mes | Sm³ |
| `GI`, `WI` | Gas y agua inyectados en el mes | Sm³ |

**`Daily Production Data`**: una fila por pozo y por día. Las columnas que usa el tablero:

| Columna | Qué es | Unidad |
| --- | --- | --- |
| `DATEPRD` | Fecha | |
| `WELL_BORE_CODE` | Código interno del operador, por ejemplo `NO 15/9-F-12 H` | |
| `NPD_WELL_BORE_NAME` | Nombre en el registro noruego, por ejemplo `15/9-F-12` | |
| `ON_STREAM_HRS` | Horas en línea en el día | h |
| `BORE_OIL_VOL`, `BORE_GAS_VOL`, `BORE_WAT_VOL` | Volúmenes producidos en el día | Sm³ |
| `BORE_WI_VOL` | Agua inyectada en el día | Sm³ |
| `FLOW_KIND`, `WELL_TYPE` | `production` o `injection`; `OP` productor, `WI` inyector de agua | |

Las columnas de presión, temperatura y orificio no declaran unidad: el tablero no las usa.

### `topes/Well_picks_Volve_v1.dat`

Topes de formación exportados de un proyecto de interpretación. Texto de ancho fijo: unas líneas
de encabezado con los códigos de calificación, y después un bloque por pozo que empieza con
`Well NO 15/9-...`, una línea de títulos de columna y una línea de guiones. Las celdas vacías son
espacios: las columnas se cortan por la posición de los guiones, no por espacios.

| Columna | Qué es | Unidad |
| --- | --- | --- |
| `Well name` | Pozo, con el prefijo del país: `NO 15/9-F-12` | |
| `Surface name` | El tope. El reservorio es `Hugin Fm. VOLVE Top` | |
| `Obs#` | Número de cruce: un pozo horizontal puede cruzar el mismo tope varias veces | |
| `Qlf` | Vacío si el tope es normal. `ER` erosionado, `FP` tope por falla, `FO` cortado por falla, `NL` no perfilado, `NR` no alcanzado | |
| `MD`, `TVD` | Profundidad medida y vertical desde la mesa rotaria | m |
| `TVDSS` | Profundidad vertical bajo el nivel del mar, **negativa** | m |
| `TWT` | Tiempo doble de viaje sísmico | ms |
| `Dip`, `Azi` | Buzamiento y azimut de la capa | grados |
| `Easting`, `Northing` | Coordenadas del tope en el pozo | m |
| `Intrp` | Intérprete | |

La entrada de un pozo al reservorio es su cruce de `Hugin Fm. VOLVE Top` de menor MD.

### `mapas/Hugin_Fm_Top.csv`

La superficie del tope de la Formación Hugin en una grilla sísmica: columnas `IL` (inline), `XL`
(crossline), `X`, `Y` (m) y `Z`, la profundidad bajo el nivel del mar en metros, **positiva hacia
abajo**. Puntos cada 12.5 m, con huecos donde no hay interpretación.

### `trayectorias/F-12_ACTUAL`

La trayectoria de 15/9-F-12. Texto separado por espacios, con dos líneas de encabezado (nombres y
unidades). Columnas: `MD` (m desde la mesa rotaria), `Inc` y `Azim` (grados), `TVD` (m),
`X_Offset_EW` y `Y_Offset_NS` (m), `X_COORD` y `Y_COORD` (m) y `DLS` (grados cada 30 m).

### `perfiles/`

Perfiles de pozo en LAS 2.0: un encabezado con secciones que empiezan con `~` y los datos después
de `~A`, una fila por profundidad. La profundidad es MD, en metros. El valor nulo es `-999.25`.

| Archivo | Curvas |
| --- | --- |
| `15_9-F-12/WLC_PETRO_COMPUTED_INPUT_1.LAS` | Las curvas de entrada de la interpretación: `GR` (API), `RHOB` (g/cm³), `NPHI` (fracción), `RT` (ohm·m), `RD` y `RS` (resistividades sin unidad declarada), `DT` (µs/pie), `ROP5_RM` (velocidad de perforación) y tres banderas |
| `15_9-F-12/WLC_PETRO_COMPUTED_OUTPUT_1.LAS` | La interpretación: `PHIF` (porosidad), `SW` (saturación de agua), `VSH` (volumen de arcilla), `KLOGH` (permeabilidad, mD), `BVW` |
| `15_9-F-11 B/WLC_PETRO_COMPUTED_OUTPUT_1.LAS` | La interpretación de la rama F-11 B |
| `15_9-F-14/NO_15_9-F-14_KLOGH_NEW.las` | Una sola curva: `KLOGH_NEW`, permeabilidad |

El encabezado del LAS trae `WELL`, `UWI` y, en algunos, `XCOORD` y `YCOORD` de la boca del pozo.

### `sodir/`

Dos tablas de las FactPages de la Norwegian Offshore Directorate (Sodir), el registro oficial
noruego, filtradas al campo VOLVE. Las columnas conservan los nombres de Sodir.

- `sodir_volve_pozos.csv`: un pozo por fila. `wlbWellboreName` (nombre), `wlbStatus`,
  `wlbPurpose` (`PRODUCTION`, `INJECTION`, `OBSERVATION`), `wlbContent`, `wlbEntryDate` y
  `wlbCompletionDate` (`DD.MM.AAAA`), `wlbTotalDepth` (profundidad final medida, m),
  `wlbKellyBushElevation` (m), `wlbGeodeticDatum`, `wlbNsUtm` y `wlbEwUtm` (coordenadas UTM de la
  boca, m), `wlbNsDecDeg` y `wlbEwDecDeg` (latitud y longitud).
- `sodir_volve_produccion_campo_mensual.csv`: el campo entero, una fila por mes. `prfYear`,
  `prfMonth`, `prfPrdOilNetMillSm3` (petróleo, **millones** de Sm³), `prfPrdGasNetBillSm3` (gas
  neto, **miles de millones** de Sm³), `prfPrdProducedWaterInFieldMillSm3` (agua producida,
  millones de Sm³).

### Trampas conocidas de estos datos

- El mismo pozo se escribe distinto en cada archivo: `15/9-F-12`, `NO 15/9-F-12 H`,
  `NO 15/9-F-12`, `15_9-F-12`, `F-12_ACTUAL`. Las letras `A`, `B`, `T2` o la palabra `pilot`
  después del número nombran otra rama: otro agujero, con otros datos. Un sufijo `H` o `AH` en
  `WELL_BORE_CODE` no cambia de pozo. Armá una función que lleve cada forma a un nombre canónico
  y mostrá la tabla.
- La profundidad bajo el nivel del mar tiene signo distinto según el archivo: negativa en los
  topes, positiva en la grilla.
- En la hoja mensual, `NULL` (texto) es dato inexistente, que no es lo mismo que cero. Con pandas,
  `read_excel` lo convierte en NaN sin avisar (para contarlos, `keep_default_na=False`), y una suma
  por grupo convierte un grupo todo NaN en 0: usá `min_count=1`. En los LAS, `-999.25`.
- Las coordenadas están en ED50. Un mapa web usa WGS84, y sin convertir los puntos se corren del
  orden de cien metros: el mapa del tablero va en metros UTM, sin mapa base.
- Sodir publica la producción vendible (saleable): para el gas, el gas **neto** que se vende. El
  archivo del operador trae el gas producido, parte del cual se reinyectó o se consumió en la
  plataforma. El gas no se concilia; se dice.
- Un tope con calificador `FP`, `NR` o `NL` no es un cruce normal: se muestra, marcado.
- Las bocas de los pozos de Sodir caen todas en la plataforma, a pocos metros unas de otras: en el
  mapa van como un solo símbolo.
- En F-12, los topes de 3,102, 3,117 y 3,126 m MD están a menos de 25 m: en el visor, rotulalos
  separados, al costado de la pista.

## El tablero

`salida/tablero_volve.html`, con estas secciones en este orden. Cada sección abre con una o dos
oraciones que dicen qué muestra.

1. **Inventario.** Una fila por archivo de `datos/` (el Excel, una por hoja): ruta, formato,
   tamaño, qué trae, cantidad de filas o muestras, período o rango de profundidades, y qué pozos
   nombra (con el nombre tal como figura).
2. **Producción por pozo**, de la hoja mensual (la diaria se usa solo en el chequeo 6).
   Petróleo mensual por pozo (un gráfico) y una tabla por pozo con petróleo, agua y gas
   acumulados, participación en el petróleo del campo, y primer y último mes con petróleo.
   Después, la conciliación del petróleo con Sodir: la suma de los pozos contra la producción del
   campo, de 2008 a 2016, año por año y en total, en Sm³ y en porcentaje, con un gráfico de las
   dos series anuales. Los meses de 2007 y 2017 no tienen petróleo en ninguna de las dos fuentes:
   se dice en una línea. Para el gas, la nota de la trampa.
3. **Mapa.** El tope de Hugin como mapa de colores (profundidad bajo el nivel del mar, m), con la
   escala y los ejes en metros, norte arriba y la misma escala en los dos ejes. Encima: la entrada
   al reservorio de cada pozo del archivo de producción (su tope de Hugin de menor MD, con su
   nombre), la trayectoria de F-12 en planta y la plataforma. Al lado, una tabla con cada entrada:
   MD, TVDSS del tope, profundidad de la grilla en el nodo más cercano con dato, la distancia a
   ese nodo y la diferencia (grilla menos TVDSS con signo positivo hacia abajo). Si un pozo del archivo de producción no tiene tope de Hugin propio, va en el
   mapa y en la tabla con la entrada de la rama productora que encuentre el chequeo 2, rotulado
   con los dos nombres, y la tabla lo dice.
4. **Perfiles de F-12.** Un visor de `WLC_PETRO_COMPUTED_INPUT_1.LAS` desde 2,600 m MD hasta la
   última muestra del archivo, profundidad hacia abajo, en tres pistas: GR (0 a 150 API); RHOB
   (1.95 a 2.95 g/cm³) y NPHI (0.45 a −0.15, escala invertida) superpuestas; RT y RD en escala
   logarítmica (0.2 a 2,000 ohm·m). Los topes de F-12 como líneas horizontales con su nombre, y
   la profundidad final de Sodir como otra línea. El tramo largo que encuentre el chequeo 4 va
   sombreado y rotulado en el gráfico.
5. **Nombres.** Una fila por pozo del archivo de producción y una columna por fuente (producción
   mensual, producción diaria con su código, topes, perfiles, trayectoria, Sodir), con el nombre
   tal como figura en cada una, "no está" si falta, y las otras ramas del mismo pozo que aparecen.
6. **Chequeos.** La tabla de `salida/chequeos.csv`, con un resultado por chequeo.

### Los chequeos

Cada uno es una fila de `salida/chequeos.csv` y de la sección 6, con el número que lo sostiene.

1. **Conciliación.** ¿Cuánto difiere la suma del petróleo de los pozos de lo que publica Sodir?
   Diferencia total en Sm³ y en %, y el año con la mayor diferencia relativa. No hay tolerancia
   fijada: el tablero informa la diferencia y no la califica.
2. **Pozo sin reservorio.** ¿Cada pozo del archivo de producción tiene tope de Hugin con su propio
   nombre? Si alguno no lo tiene, ¿qué dice Sodir de ese pozo y de sus otras ramas (propósito,
   fechas), y qué rama es la productora?
3. **Producción contra perfiles.** Para cada pozo del archivo de producción: petróleo acumulado y,
   por cada archivo de `perfiles/` de ese pozo o de sus ramas, las curvas y la MD mínima y máxima
   (sin sumar metros entre archivos). ¿Los dos mayores productores tienen perfiles comparables?
4. **Curvas constantes.** En las curvas medidas de F-12 (el archivo `INPUT`, sin las tres
   banderas), ¿hay algún tramo de más de 100 muestras seguidas (unos 15 m) donde una curva repite
   exactamente el mismo valor? Dónde empieza y termina, qué valor, cuántas muestras, y dónde queda
   respecto de la profundidad final de Sodir y de la última muestra con dato de las otras curvas
   medidas (RHOB, NPHI, RT, RD, RS y DT; sin banderas ni `ROP5_RM`). Los tramos de 21 a 100
   muestras (una resistividad topada, un neutrón remuestreado) son esperables: van contados en
   una línea, sin sombrear. Las curvas de interpretación (`OUTPUT`) no entran en este chequeo.
5. **Boca de F-12.** Las coordenadas de la boca de F-12 según el encabezado del LAS, la primera
   estación de la trayectoria y Sodir: distancia en metros entre cada par.
6. **Hoja diaria.** ¿Hay días con más de 24 horas en línea? ¿Cuántas filas, en qué fechas, y qué
   tienen en común esas fechas? ¿Hay volúmenes negativos? ¿Hay pozos que figuran como productor y
   como inyector según `WELL_TYPE`?
7. **Mapa contra topes.** La diferencia de la tabla del mapa para cada entrada al reservorio; la
   mayor, y si su tope tiene calificador.

## Salidas, con estos nombres

| Archivo | Qué tiene |
| --- | --- |
| `salida/armar_tablero.py` | El script que genera todo lo demás |
| `salida/tablero_volve.html` | El tablero |
| `salida/chequeos.csv` | Un chequeo por fila. Columnas: chequeo, resultado (el texto, con todas sus cifras), valor (la cifra principal), unidad, fuente |
| `salida/inventario.csv` | La tabla del inventario |
| `salida/produccion_por_pozo.csv` | Los acumulados por pozo |
| `salida/conciliacion_anual.csv` | Pozos contra Sodir, año por año |
| `salida/nombres.csv` | La tabla de nombres |
| `salida/*.png` | Los gráficos, uno por archivo |
| `salida/informe.md` | El informe de una página |

El informe entra en una página, unas 300 palabras: qué hay en el conjunto de datos, qué cuadra y
qué no, con sus números y el archivo de donde sale cada uno; y qué no se puede afirmar con estos
datos.

## Antes de dar el trabajo por terminado

- Imprimí la cantidad de filas de cada hoja y de cada archivo, y los rangos de fechas y de
  profundidades.
- Las participaciones de la tabla de producción suman 100%.
- Abrí el HTML como texto y confirmá que no pide nada de afuera: ningún `src` ni `href` a otro
  archivo o a internet, salvo el link de la licencia.
- Cada cifra del informe sale de un archivo de `salida/`: nombrá el archivo.
- Corré `salida/armar_tablero.py` una vez más y confirmá que las salidas no cambian (por ejemplo,
  comparando el sha256 de cada archivo antes y después).
