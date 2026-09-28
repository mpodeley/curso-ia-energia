# Screening de waterflooding, cuenca Noroeste de Argentina

Este proyecto arma un screening de waterflooding: una lista ordenada de dónde tendría sentido
inyectar agua para empujar petróleo (recuperación secundaria), con criterios explícitos y sobre
datos públicos. Llega hasta el screening. La simulación y la decisión de inversión quedan para
los ingenieros de reservorios, con sus herramientas.

## Reglas de trabajo

1. Trabajás solo con los dos archivos de `datos/`. No hay acceso a internet y no hace falta.
   Un dato que no está en esos archivos queda vacío y se dice; nunca se completa con un
   supuesto.
2. Todo lo que produzcas va en `salida/`. La carpeta `datos/` no se modifica.
3. Un solo script, `salida/screening.py`, que se pueda volver a correr de cero y regenere
   todas las salidas. Corré Python siempre así:
   `uv run --with pandas --with matplotlib python salida/screening.py`
4. Después de cada filtro, imprimí cuántas filas, pozos o campos quedan. Esos conteos van
   también al informe.
5. Un número agregado por campo o por reservorio se contrasta con el detalle pozo por pozo
   antes de interpretarlo. Si el agregado cambia porque entran o salen pozos, decilo.
6. El informe (`salida/informe.md`) entra en una página, unas 500 palabras con tabla incluida:
   qué salió, con sus números; qué no se puede afirmar con estos datos; y qué datos harían falta
   para seguir.
7. Texto en español. En el informe y en la terminal, números con punto decimal y coma de miles
   (`1,234.5`); en los CSV, sin separador de miles.
8. Usá los nombres de salida de la tabla de abajo y no los cambies: no podés borrar archivos, así
   que un archivo renombrado queda duplicado.

## Los datos

`datos/capiv_noroeste_oil_monthly.csv`: una fila por pozo y por mes, de enero de 2019 a julio
de 2026. Fuente: Capítulo IV, Secretaría de Energía de Argentina (datos abiertos).

| Columna | Qué es | Unidad |
| --- | --- | --- |
| `idpozo` | Identificador del pozo en el Capítulo IV (leelo como texto) | |
| `ym` | Mes | `AAAA-MM` |
| `prod_pet` | Petróleo producido en el mes. En pozos gasíferos es condensado | m³ |
| `prod_gas` | Gas producido en el mes | miles de m³ |
| `prod_agua` | Agua producida en el mes | m³ |
| `iny_agua` | Agua inyectada en el mes | m³ |
| `tef` | Días efectivos de producción del mes | días |

`datos/capiv_noroeste_oil_wells.json`: un objeto por `idpozo` con `sigla` (el nombre del pozo),
`area`, `yacimiento` (el campo), `empresa`, `provincia`, `formaciones` (lista), `tipopozo` y
`tipoestado`.

Conversiones: 1 m³ = 6.28981 bbl. Un mes tiene 30.4375 días cuando hace falta pasar un volumen
mensual a barriles por día (bpd).

### Trampas conocidas de estos datos

- `tef` cuenta días de producción. Muchas filas de inyección traen `tef = 0`. Un filtro por días
  pensado para productores borra la inyección sin avisar: las filas con `iny_agua > 0` se
  conservan siempre.
- `tipopozo` distingue dos cosas que parecen iguales. Un **Sumidero** se deshace del agua que
  sale con el petróleo, por lo general en una formación que no produce. Un pozo de **Inyección de
  Agua** la mete en el reservorio para empujar petróleo. Se cuentan por separado, siempre.
- El pozo es el `idpozo`. Una misma `sigla` puede aparecer con dos `idpozo` distintos.
- La serie arranca en enero de 2019. Todo acumulado es "desde 2019" y así se escribe: no es el
  acumulado del campo desde su descubrimiento, y no alcanza para un factor de recobro.
- Algunos campos dejan de informar antes que el resto de la cuenca. Un campo cuyo último mes es
  anterior a julio de 2026 puede estar cerrado o puede haber dejado de reportar: los datos no
  dicen cuál.
- El reservorio de un pozo es la primera de sus `formaciones` que no sea "formación
  improductiva".

## Los criterios

Resumen del manual de criterios del proyecto. El screening completo tiene tres compuertas:
factores eliminatorios, puntaje técnico (T) y económico (E), y ejecutabilidad (X). El índice de
atractivo es `IAW = T^0.40 × E^0.35 × X^0.25`. Ese índice necesita el Nivel 2 de datos, que
ninguna fuente pública trae: clasificación del reservorio, PVT básico, saturación de agua
inicial, área, porosidad, espesor neto, permeabilidad y contactos de fluidos. Con completitud
menor al 50%, el manual dice: no usar para decidir, usar para priorizar qué datos pedir.

Con datos públicos hay solo Nivel 1 (producción e inyección mensual). De ahí salen dos cosas.

### 1. El ranking de nivel 1 de la cuenca

Por campo (`yacimiento`), con todas las filas del archivo, con estos filtros y en este orden:

1. Campos con petróleo desde 2019.
2. Rama condensado, aproximación al factor K2: relación gas-petróleo (RGP) acumulada mayor a
   590 m³/m³ (unos 3,300 pies cúbicos por barril) → afuera. La RGP es `prod_gas × 1000 /
   prod_pet`, sumados en todo el período.
3. Actividad: último mes con petróleo en enero de 2025 o después.
4. Tamaño, aproximación al factor K5: petróleo acumulado desde 2019 (Np) de al menos 50 Mbbl.
5. Arreglo posible, criterio de ejecutabilidad: al menos 3 pozos con petróleo desde 2019. Una
   inyección por arreglo necesita al menos un inyector y dos productores.

Orden: Np desde 2019, de mayor a menor. Columnas: Np (Mbbl), pozos con petróleo, RGP, relación
agua-petróleo (WOR) y corte de agua de los últimos 12 meses en que el campo produjo petróleo o
agua, agua producida en esa misma ventana (bpd), agua inyectada por sumideros y por pozos de
inyección desde 2019 (m³), y último mes con petróleo.

Los campos que no pasan un filtro van a `salida/descartados.csv` con el primer filtro que los
sacó. Un
descarte no borra el campo: si mañana aparece el dato, se revisa.

### 2. El diagnóstico de agua del campo del caso: Puesto Guardián

Puesto Guardián (`yacimiento == "PUESTO GUARDIAN"`, Salta) es el campo del caso porque tiene el
único pozo de la cuenca declarado como inyección de agua que inyectó algo, y dos sumideros.

Reglas de carga (las del libro de diagnóstico del proyecto):

- Se toman las filas con algún volumen distinto de cero.
- Los meses con `tef < 10` quedan afuera, salvo las filas con inyección.
- El diagnóstico se hace sobre el reservorio con más filas. Serie mensual del reservorio: suma
  de los pozos, mes por mes, sin saltear meses.

Diagnósticos:

- **WOR mensual**: agua producida sobre petróleo producido del mes (con volúmenes). Corte de
  agua: agua sobre agua más petróleo. Np acumulado mes a mes.
- **WOR contra Np**: recta de mínimos cuadrados de `ln(WOR)` contra Np en Mbbl, con los meses
  de WOR mayor a 0.05. Si la
  pendiente es cero o negativa, no se extrapola al WOR económico (20) y se dice por qué.
- **Chan** (SPE 30775): derivada del WOR por diferencia centrada de ±3 meses, dividida por
  0.5 años. Tiempo `t` = meses desde el primer mes de la serie / 12; el primer mes (t = 0) no
  entra. Puntos válidos: WOR mayor a 0.05 y derivada positiva; hacen falta al menos 18. Pendiente de `ln(WOR')` contra `ln(t)`: 0.25 o más
  es canalización, −1.00 o menos es conificación, en el medio es desplazamiento normal.
- **Hall**: necesita presión de inyección, y el Capítulo IV no la publica. No se calcula; se
  dice.
- **Tabla por pozo**, con todas las filas del archivo (sin las reglas de carga), para los pozos
  del campo con petróleo o con inyección: tipo, estado, reservorio, meses en el archivo (todas
  las filas del pozo, también las de volumen cero), meses con actividad (con petróleo en un
  productor, con inyección en un inyector o sumidero), bpd medio sobre todos los meses en el
  archivo y bpd medio sobre los meses con actividad. El bpd es de petróleo para un productor y de
  agua inyectada para un inyector o sumidero, con meses de 30.4375 días.

## Salidas, con estos nombres

| Archivo | Qué tiene |
| --- | --- |
| `salida/screening.py` | El script que genera todo lo demás |
| `salida/inyeccion_por_tipo.csv` | Quién inyecta agua en la cuenca: pozos, m³ y participación por `tipopozo` |
| `salida/inyectores_declarados.csv` | Los pozos declarados como Inyección de Agua: m³, meses con inyección, estado |
| `salida/ranking_campos.csv` | El ranking de nivel 1 |
| `salida/descartados.csv` | Los campos que no pasaron, con el filtro que los sacó |
| `salida/puesto_guardian_pozos.csv` | La tabla por pozo del campo del caso |
| `salida/resumen.csv` | Todo número del informe que no esté en otra tabla: conteos por filtro, pendientes, puntos de Chan. Columnas: paso, indicador, valor, unidad |
| `salida/puesto_guardian_serie.csv` | La serie mensual del reservorio: petróleo, agua, inyección, Np, WOR, corte de agua, derivada |
| `salida/wor_vs_np.png` | WOR (escala logarítmica) contra Np |
| `salida/chan.png` | WOR y su derivada contra el tiempo, los dos ejes en escala logarítmica |
| `salida/informe.md` | El informe de una página |

## Antes de dar el trabajo por terminado

- Imprimí la cantidad de pozos y de filas del archivo mensual, y el rango de meses.
- Las participaciones de la tabla de inyección suman 100%.
- Cada cifra del informe sale de un archivo de `salida/`: nombrá el archivo.
- Corré `salida/screening.py` una vez más desde cero y confirmá que da lo mismo.
