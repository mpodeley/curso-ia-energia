# Volve, paquete liviano

Datos del campo Volve (mar del Norte noruego, en producción de 2008 a 2016), recortados para la
sesión 6 del curso de IA generativa para petróleo y gas. Alcanzan para pedirle a un agente
gratuito la ficha del pozo 15/9-F-12, un visor de sus perfiles y dos chequeos.

## Crédito y licencia

Datos de Equinor y los ex socios de la licencia Volve (ExxonMobil Exploration & Production
Norway AS, Bayerngas Norge AS), compartidos bajo la
[Equinor Open Data Licence](https://cdn.equinor.com/files/h61q9gi9/global/de6532f6134b9a953f6c41bac47a0c055a3712d3.pdf):
está permitido usarlos, adaptarlos y compartirlos con este crédito y el link a los términos, y
está prohibido venderlos. Estos archivos son una adaptación: se cambió el formato, se tradujeron
los nombres de columna y se recortaron o ralearon los datos, como se detalla abajo. Ni Equinor ni
sus socios participan del curso ni lo respaldan. Página oficial del conjunto de datos:
[Volve data sharing](https://www.equinor.com/energy/volve-data-sharing).

Los dos archivos `sodir_*` contienen datos bajo la Norwegian Licence for Open Government Data
([NLOD 2.0](https://data.norge.no/nlod/en/2.0)) distribuidos por la Norwegian Offshore Directorate
(Sokkeldirektoratet, Sodir), el registro oficial noruego. Se tomaron de sus
[FactPages](https://factpages.sodir.no/) el 2026-09-28 y se filtraron al campo VOLVE, sin otro
cambio.

## Qué hay

| Archivo | Qué trae | Filas |
| --- | --- | --- |
| `produccion_mensual_por_pozo.csv` | Producción e inyección mensual de los 7 pozos que figuran en el archivo de producción del operador, de 2007-09 a 2016-12 | 526 |
| `topes_formacion.csv` | Topes de formación de 35 pozos: profundidad medida, vertical y bajo el nivel del mar, y coordenadas | 409 |
| `15_9-F-12_perfiles_2680-3600m.las` | Perfiles de pozo de 15/9-F-12 en formato LAS 2.0, de 2,680.1 a 3,600.0 m de profundidad medida | 6,037 |
| `15_9-F-12_perfiles_2680-3600m_las.txt` | El mismo archivo con extensión `.txt`, para las herramientas que no aceptan `.las`. No va en el zip | 6,037 |
| `grilla_tope_hugin_raleada.csv` | Profundidad del tope de la Formación Hugin, el reservorio, en una grilla: uno de cada tres puntos en cada dirección | 20,449 |
| `sodir_volve_produccion_campo_mensual.csv` | Producción mensual del campo según Sodir, la fuente oficial noruega | 114 |
| `sodir_volve_pozos.csv` | Los pozos de desarrollo del campo según Sodir: estado, propósito, fechas, profundidad final y coordenadas | 22 |

## Diccionario de datos

**Siglas.** MD: profundidad medida a lo largo del pozo (measured depth), desde la mesa rotaria,
unos 55 m sobre el nivel del mar. TVD: profundidad vertical verdadera (true
vertical depth), desde la misma referencia. TVDSS: profundidad vertical bajo el nivel del mar
(true vertical depth subsea). Sm³: metro cúbico en condiciones estándar. LAS: Log ASCII Standard,
el formato de texto de los perfiles de pozo. UTM: proyección Universal Transversal de Mercator.
ED50 y WGS84: dos datums geodésicos, European Datum 1950 y World Geodetic System 1984.

### produccion_mensual_por_pozo.csv

Hoja "Monthly Production Data" del archivo `Volve production data.xlsx` del operador, en formato
largo.

| Columna | Qué es |
| --- | --- |
| `pozo` | Nombre del pozo tal como lo escribe el operador, por ejemplo `15/9-F-12` |
| `codigo_npd` | Código del pozo en el registro noruego |
| `anio`, `mes`, `periodo` | Año, mes y los dos juntos (`AAAA-MM`) |
| `horas_en_linea_h` | Horas en producción o inyección en el mes |
| `petroleo_sm3`, `gas_sm3`, `agua_sm3` | Volúmenes producidos en el mes |
| `gas_inyectado_sm3`, `agua_inyectada_sm3` | Volúmenes inyectados en el mes |

Una celda vacía es un `NULL` del original, un dato faltante: al sumar o promediar, se saltea.

### topes_formacion.csv

Archivo `Well_picks_Volve_v1.dat`, exportado de un proyecto de interpretación y pasado a CSV. Una
fila por tope y por observación: un pozo horizontal puede cruzar el mismo tope varias veces.

| Columna | Qué es |
| --- | --- |
| `pozo` | Nombre del pozo con el prefijo del país, por ejemplo `NO 15/9-F-12` |
| `superficie` | El tope, por ejemplo `Hugin Fm. VOLVE Top` |
| `observacion` | Número de cruce del tope en ese pozo (1, 2, …) |
| `calificador` | Vacío si el tope es normal. `ER` erosionado, `FP` tope por falla, `FO` cortado por falla, `NL` no perfilado, `NR` no alcanzado |
| `md_m`, `tvd_m` | Profundidad medida y vertical, en metros desde la mesa rotaria |
| `tvdss_m` | Profundidad vertical bajo el nivel del mar, en metros, **con signo negativo** |
| `twt_ms` | Tiempo doble de viaje sísmico, en milisegundos |
| `buzamiento_grados`, `azimut_grados` | Inclinación y dirección de la capa, cuando se midieron |
| `este_m`, `norte_m` | Coordenadas del tope en el pozo, en metros (UTM zona 31 norte, datum ED50) |
| `interpretacion` | Quién lo interpretó (todas `STAT`) |

### 15_9-F-12_perfiles_2680-3600m.las

Archivo `WLC_PETRO_COMPUTED_INPUT_1.LAS` de 15/9-F-12, recortado de 2,680.1 a 3,600.0 m de
profundidad medida (el original va de 239.9 a 4,186.7 m) y sin tres columnas de banderas de
interpretación. Muestra cada 0.1524 m (medio pie). Valor nulo: `-999.25`.

| Curva | Qué mide | Unidad |
| --- | --- | --- |
| `DEPTH` | Profundidad medida | m |
| `GR` | Rayos gamma (gamma ray): separa arcillas (alto) de arenas (bajo) | unidades API (American Petroleum Institute) |
| `RHOB` | Densidad de la roca | g/cm³ |
| `NPHI` | Porosidad neutrónica | fracción |
| `RT`, `RD`, `RS` | Resistividad verdadera, profunda y somera | ohm·m en `RT`; `RD` y `RS` sin unidad declarada |
| `DT` | Tiempo de tránsito sónico | µs/pie |
| `ROP5_RM` | Velocidad de perforación | sin unidad declarada |

### grilla_tope_hugin_raleada.csv

Archivo `Hugin_Fm_Top.csv` (184,066 puntos, uno cada 12.5 m), raleado a uno de cada tres en
inline y en crossline.

| Columna | Qué es |
| --- | --- |
| `inline`, `crossline` | Posición en la grilla sísmica |
| `este_m`, `norte_m` | Coordenadas (UTM zona 31 norte, datum ED50) |
| `tope_hugin_tvdss_m` | Profundidad del tope de Hugin bajo el nivel del mar, en metros, **positiva hacia abajo** |

### sodir_volve_*.csv

Las columnas conservan los nombres de Sodir. Las más usadas:

- Pozos: `wlbWellboreName` (nombre), `wlbStatus`, `wlbPurpose` (PRODUCTION, INJECTION,
  OBSERVATION), `wlbContent`, `wlbEntryDate` y `wlbCompletionDate` (`DD.MM.AAAA`),
  `wlbTotalDepth` (profundidad final medida, m), `wlbGeodeticDatum` (ED50), `wlbNsDecDeg` y
  `wlbEwDecDeg` (latitud y longitud de la boca de pozo), `wlbNsUtm` y `wlbEwUtm` (UTM).
- Producción: `prfYear`, `prfMonth`, `prfPrdOilNetMillSm3` (petróleo, millones de Sm³),
  `prfPrdGasNetBillSm3` (gas neto, miles de millones de Sm³),
  `prfPrdProducedWaterInFieldMillSm3` (agua producida, millones de Sm³).

## Antes de usarlos

- El mismo pozo se escribe distinto en cada archivo: `15/9-F-12`, `NO 15/9-F-12`, `15_9-F-12`.
  Las letras `A`, `B` o `T2` después del número nombran otra rama, con otros datos.
- Las coordenadas están en ED50. Un mapa web usa WGS84: sin convertirlas, los puntos quedan
  corridos más de cien metros.
- El paquete liviano recorta el perfil y ralea la grilla. Un chequeo que da bien acá vale para
  lo que quedó adentro: de F-12, solo el tramo de 2,680 a 3,600 m, y del resto de los pozos,
  ningún perfil.
- El paquete completo del curso suma la producción diaria, la grilla entera, la trayectoria de
  F-12 y otros tres perfiles. El conjunto original de Equinor tiene unos 40,000 archivos.
