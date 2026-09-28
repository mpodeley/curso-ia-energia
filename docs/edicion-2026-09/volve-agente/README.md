# La demo en vivo de la sesión 6: un agente arma el tablero de Volve

Esta carpeta es lo que recibe el agente de terminal en el segundo bloque de la sesión 6 (miércoles
30 de septiembre, de 12:08 a 12:48 de Argentina) para armar en vivo un tablero HTML de un solo
archivo sobre los datos públicos del campo Volve. El agente es Claude Code, en la computadora del
instructor, con la cuenta paga. Los alumnos miran y proponen chequeos por el chat; después de la
pausa arman su versión con el paquete liviano de la página y un agente gratuito.

## Qué hay acá

| Archivo | Para quién | Qué es |
| --- | --- | --- |
| `CLAUDE.md` | El agente | Las instrucciones del proyecto: reglas de trabajo, diccionario de los diez archivos, trampas conocidas, el tablero que se pide y siete chequeos sin la respuesta |
| `PEDIDO.md` | El agente | El pedido, en cinco pasos. Es lo que se pega en la terminal |
| `.claude/settings.json` | El agente | Los permisos: sin preguntar puede correr `uv run`, `ls`, `head`, `wc` y escribir en `salida/`; tiene prohibido internet, `curl`, `wget`, `rm` y escribir en `datos/` |
| `preparar_datos.py` | El instructor | Arma la carpeta de trabajo fuera del repo: copia las instrucciones y el paquete completo de `scripts/_cache/volve/completo/`, y deja `salida/` vacía |
| `.gitignore` | | `datos/` y `salida/`, por si alguien corre algo acá adentro |

La hoja de respuestas es `scripts/volve_checks.py`, que nunca se copia a la carpeta del agente.
El paquete completo y el liviano los arma `scripts/build_volve_bundle.py`.

## Los datos

Diez archivos, 16.1 MB, bajados el 28 de septiembre de 2026 de copias públicas en GitHub fijadas
a un commit, y de las FactPages de Sodir. `build_volve_bundle.py` verifica el sha256 de cada uno y
se niega a seguir si un espejo cambió.

| En `datos/` | Qué es | sha256 |
| --- | --- | --- |
| `produccion/Volve production data.xlsx` | Producción diaria (15,634 filas) y mensual (526) de 7 pozos | `514d4e38763e` |
| `topes/Well_picks_Volve_v1.dat` | 409 topes de 35 pozos, texto de ancho fijo | `1c132bba0955` |
| `mapas/Hugin_Fm_Top.csv` | El tope de Hugin, 184,066 puntos cada 12.5 m | `6bb2f7902f80` |
| `trayectorias/F-12_ACTUAL` | La trayectoria de F-12 | `34a1a6f6e1d7` |
| `perfiles/15_9-F-12/WLC_PETRO_COMPUTED_INPUT_1.LAS` | Once curvas de 239.9 a 4,186.7 m | `8d1a22ebed03` |
| `perfiles/15_9-F-12/WLC_PETRO_COMPUTED_OUTPUT_1.LAS` | Cinco curvas de interpretación, 3,102.1 a 3,505.8 m | `545ff15bc7fc` |
| `perfiles/15_9-F-11 B/WLC_PETRO_COMPUTED_OUTPUT_1.LAS` | Interpretación de F-11 B, 3,351.6 a 4,759.2 m | `e3fd166e295d` |
| `perfiles/15_9-F-14/NO_15_9-F-14_KLOGH_NEW.las` | Una curva, permeabilidad, 3,000.5 a 3,208.2 m | `06edfb899968` |
| `sodir/sodir_volve_pozos.csv` | 22 pozos del campo | `99f6172d5c8d` |
| `sodir/sodir_volve_produccion_campo_mensual.csv` | 114 meses, 2008-02 a 2017-07 | `af59272b8a87` |

Licencias: Equinor Open Data Licence para los ocho primeros (crédito a Equinor y a los ex socios,
link a los términos, sin venta) y NLOD 2.0 para los dos de Sodir. El `CLAUDE.md` le pide al agente
el crédito textual en el pie del tablero.

## Por qué la carpeta de trabajo va fuera del repo

Claude Code lee el `CLAUDE.md` de la carpeta donde arranca y el de cada carpeta de arriba. Lanzado
dentro de `docs/edicion-2026-09/volve-agente/`, leería también el `CLAUDE.md` de la raíz del repo,
que describe el sitio del curso. Por eso `preparar_datos.py` se niega a escribir dentro del repo.

El `CLAUDE.md` personal del instructor (`~/.claude/CLAUDE.md`) se carga igual, en cualquier
carpeta. Conviene releerlo antes: el agente lo sigue (por ejemplo, las reglas de estilo para el
informe).

## Preparación, la víspera (unos 45 minutos)

1. El caché del paquete completo. Si ya está, el script solo verifica los hashes y rearma el
   paquete liviano (sin cambios si nada cambió):

   ```
   uv run --with openpyxl --with lasio python scripts/build_volve_bundle.py
   ```

2. El caché de `uv`, para que en clase no baje nada:

   ```
   uv run --with pandas --with openpyxl --with matplotlib python -c "import pandas, openpyxl, matplotlib"
   ```

3. Ensayo completo, en una carpeta aparte, cronometrado:

   ```
   python3 docs/edicion-2026-09/volve-agente/preparar_datos.py ~/volve-agente-ensayo
   cd ~/volve-agente-ensayo
   claude --model opus "$(cat PEDIDO.md)"
   ```

   Anotar cuánto tardó, en qué se trabó y si llegó a los números de abajo. El tablero que quede en
   `~/volve-agente-ensayo/salida/tablero_volve.html` es el plan B: copiarlo además a un lugar
   fijo fuera del repo, por ejemplo `~/volve-plan-b/`, y abrirlo una vez en el navegador.

4. La carpeta del vivo, sin abrir el agente en ella (el diálogo de confianza es parte de la demo):

   ```
   python3 docs/edicion-2026-09/volve-agente/preparar_datos.py ~/volve-agente-vivo
   ```

   El script imprime el tamaño y el sha256 de cada archivo: tienen que coincidir con la tabla de
   arriba.

5. La hoja de respuestas, en un archivo para la ventana F:

   ```
   uv run --with openpyxl --with pyproj python scripts/volve_checks.py --datos ~/volve-agente-vivo/datos > ~/volve-referencia.txt
   ```

   Deja también `scripts/_cache/volve_checks.json`.

6. Terminal con letra grande y tema claro. Ventanas del deck: A el deck, C el sitio, D Claude con
   la ejecución de código (la parte de ellos), E la terminal en `~/volve-agente-vivo`, F la
   referencia, G el tablero del ensayo.

7. El paquete liviano de la página, probado una vez en Claude gratuito con el prompt de la ficha,
   para saber cuánto tarda y cómo sale el artifact.

Para repetir un ensayo en la misma carpeta: `preparar_datos.py ~/volve-agente-ensayo --limpiar`.

## La prueba en seco

El 28 de septiembre se hicieron dos pruebas en seco: un agente del mismo modelo, con esta carpeta,
este `CLAUDE.md` y este pedido, sin acceso a `volve_checks.py` ni a internet, con las mismas
restricciones que `settings.json` (sin `rm`, sin escribir en `datos/`).

- **Primera** (versión anterior del `CLAUDE.md`): 17.8 minutos, unas 60 llamadas a herramientas,
  un script de 1,539 líneas que corre en 5 segundos y un tablero de 1.0 MB. Reprodujo todos los
  números de abajo. Sus fricciones quedaron resueltas en el `CLAUDE.md` actual: el umbral del
  chequeo de curvas constantes (con 20 muestras encontró 361 tramos y tuvo que inventar una
  clasificación), qué cuenta como "otras curvas", los metros de perfil sumados entre archivos
  superpuestos, el `NULL` que pandas convierte en 0 en una suma por grupo, qué hoja usar, qué
  hacer con 2007 y 2017, el separador de miles en `chequeos.csv`, el signo de la diferencia del
  mapa, F-11 fuera del mapa, las bocas de Sodir encimadas, los rótulos de los topes encimados,
  la altura de la mesa rotaria (54.0 m en Sodir para F-12), y "correr desde cero" sin poder
  borrar. También bajó el informe a unas 300 palabras y sacó la conciliación del agua del
  pedido.
- **Segunda** (con esas correcciones): 12.7 minutos, unas 50 llamadas, un tablero de 0.77 MB.
  Reprodujo los siete chequeos al número, encontró un solo tramo constante largo (el GR) y puso a
  F-11 en el mapa con la entrada de F-11 B. Sus últimas dudas (el umbral de los tramos cortos,
  la tolerancia de la conciliación, el Excel en una o dos filas del inventario, los archivos
  auxiliares que no puede borrar) quedaron escritas en el `CLAUDE.md` actual, que no volvió a
  probarse entero.

Lo que estas pruebas no cubren: el CLI de Claude Code en sí, el diálogo de confianza, los pedidos
de permiso y la carga del `CLAUDE.md` personal del instructor, que se ven recién en el ensayo de la
víspera. El tablero de la primera prueba no queda en el repo: es la referencia del ensayo, no el
plan B, que sale del ensayo de la víspera.

## En clase

El bloque dura 40 minutos (de 0:08 a 0:48 del deck).

| Minuto | Qué pasa | Dónde |
| --- | --- | --- |
| 0:08–0:10 | La carpeta: `ls -la`, `ls datos/*`, `salida/` vacía | E |
| 0:10–0:11 | `.claude/settings.json` | E |
| 0:11–0:12 | Lanzar el agente; aceptar la carpeta en el diálogo de confianza | E |
| 0:12–0:16 | `CLAUDE.md`, mientras el agente lo lee: el diccionario de los topes, las trampas conocidas, los siete chequeos | Otra pestaña o el editor |
| 0:16–0:35 | El agente trabaja; se narra el loop; el chat propone chequeos | E |
| 0:35–0:40 | El tablero, sección por sección | Navegador (o G) |
| 0:40–0:46 | `salida/chequeos.csv` contra la referencia | E y F |
| 0:46–0:48 | Un número rastreado hasta el archivo, pedido en vivo | E |

El agente arranca a los 4 minutos del bloque porque las corridas en seco llevaron de 13 a 18: el
archivo de instrucciones se explica mientras el agente lo está leyendo. Plan B por tiempos: si a
0:32 no terminó el visor de perfiles (paso 4), se pasa a G a 0:35.

El comando, desde la carpeta:

```
cd ~/volve-agente-vivo
claude --model opus "$(cat PEDIDO.md)"
```

Durante la corrida, no corregir al agente a mano ni sumarle pedidos. Lo que conviene señalar: la
primera mirada a los datos (cuenta hojas y filas antes de calcular), el primer error y qué hace
con él, la conciliación contra Sodir cuando la imprime, y si marca solo el GR relleno.

Si sobra un minuto al final: "¿De qué archivo y qué filas sale el 45.6% de F-12?". Lo contesta sin
tocar nada.

## Los números esperados

Salen de `scripts/volve_checks.py` sobre los diez archivos de la tabla de arriba.

**Producción por pozo** (hoja mensual, petróleo acumulado):

| Pozo | Petróleo (Sm³) | Participación | Agua (Sm³) | Meses con petróleo |
| --- | --- | --- | --- | --- |
| 15/9-F-12 | 4,579,610 | 45.6% | 6,833,320 | 2008-02 a 2016-08 |
| 15/9-F-14 | 3,942,233 | 39.3% | 7,121,250 | 2008-07 a 2016-07 |
| 15/9-F-11 | 1,147,849 | 11.4% | 1,090,806 | 2013-07 a 2016-09 |
| 15/9-F-1 C | 177,709 | 1.8% | 207,302 | 2014-04 a 2016-04 |
| 15/9-F-15 D | 148,519 | 1.5% | 52,366 | 2014-01 a 2016-07 |
| 15/9-F-5 | 41,161 | 0.4% | 13,533 | 2016-04 a 2016-08 |
| 15/9-F-4 | 0 | 0.0% | 0 | inyector |

**1. Conciliación.** Pozos 10,037,081 Sm³ contra Sodir 10,171,990: −134,909 Sm³, −1.33%. Por año,
los pozos suman menos siempre: 2008 −0.3%, 2009 −1.2%, 2010 −0.5%, 2011 −1.3%, 2012 −2.1%,
2013 −2.5%, 2014 −2.2%, 2015 −2.2%, 2016 −4.1%. El mes con más diferencia, 2009-07 (−14,793 Sm³).
Agua: 15.32 contra 15.34 millones de Sm³ (−0.16%). Gas: 1.475 miles de millones de Sm³ producidos
contra 0.813 netos en Sodir (vendibles): no se concilia. Primer y último mes con petróleo, iguales
en las dos fuentes: 2008-02 y 2016-09. El comunicado de Equinor de 2018 habla de 63 millones de
barriles: 10.17 millones de Sm³ son 64 millones.

**2. Pozo sin reservorio.** 15/9-F-11 (código diario `NO 15/9-F-11 H`) tiene en los topes solo
`Seabed` y `NORDLAND GP. Top`. Sodir: F-11 OBSERVATION (7 de marzo a 12 de mayo de 2013), F-11 A
OBSERVATION (14 al 26 de mayo), F-11 B PRODUCTION (28 de mayo al 15 de junio). F-11 B cruza
`Hugin Fm. VOLVE Top` siete veces; la primera, a 3,467.5 m MD.

**3. Producción contra perfiles.** F-14: segundo en petróleo, primero en agua, y un solo perfil,
`KLOGH_NEW`, de 3,000.5 a 3,208.2 m (207.7 m). En el espejo de origen sus perfiles interpretados
vienen en DLIS (binario); el paquete no los trae. F-12: once curvas de 239.9 a 4,186.7 m y cinco de
interpretación de 3,102.1 a 3,505.8 m. F-1 C, F-15 D, F-4 y F-5: ningún perfil en el paquete.

**4. Curvas constantes.** En el LAS de entrada de F-12, el GR vale 100.668998 API de 3,509.01 a
4,186.73 m: 4,448 muestras. El último valor medido es 66.9 API a 3,508.86 m. Sodir da 3,520 m
de profundidad final (y la trayectoria también termina a 3,520): 4,375 muestras y 666.7 m del GR
están debajo del fondo. Último dato de las otras curvas: NPHI 3,505.35, RT, RD y RS 3,505.96, RHOB
3,507.49, DT 3,442.56, ROP5_RM 3,519.37 m. Con más de 100 muestras seguidas, en las curvas medidas
(sin banderas) no hay otro tramo. Con el umbral de 20 muestras aparecen 361 tramos en los cuatro
LAS: banderas, saturaciones de agua en 1 y permeabilidades en su mínimo en las interpretaciones,
resistividades topadas (RD en 700, RS en 1,000 y 5,000), un GR de 31 muestras a 1,353 m y el
neutrón remuestreado entre 728 y 1,341 m. En el recorte liviano, el GR constante va de 3,509.0 a
3,600.0 m: 598 muestras.

**5. Boca de F-12.** Encabezado del LAS (435,050.17 E; 6,478,574.70 N) contra la primera estación
de la trayectoria (435,050.21; 6,478,566.22, a 145.9 m MD): 8.48 m. LAS contra Sodir UTM
(435,050.25; 6,478,566.09): 8.61 m. Trayectoria contra Sodir: 0.14 m. Latitud y longitud del LAS
contra las de Sodir: 8.6 m. La mesa rotaria: 54.9 m en el LAS y en los topes, 54.0 m en Sodir.

**6. Hoja diaria.** 20 filas con más de 24 horas (13 con 25 exactas), en 2008-10-26, 2009-10-25,
2010-10-31, 2013-10-27 y 2014-10-26: todos últimos domingos de octubre, fin del horario de verano.
En la hoja mensual, octubre de 2014 tiene 745 horas en cuatro pozos. Agua negativa en cuatro filas:
F-12 el 2008-04-23 (−14.19 Sm³) y el 2012-08-13 (−457.84), F-14 el 2009-03-03 (−0.95) y el
2012-08-13 (−59.19). F-5 (inyector según Sodir) figura como productor 144 días, del 2016-04-12 al
2016-09-17, con 41,161 Sm³; F-1 C figura dos días como inyector.

**7. Mapa contra topes** (entrada = el cruce de Hugin de menor MD; grilla en el nodo más cercano):

| Pozo | Rama de los topes | MD (m) | TVDSS (m) | Grilla (m) | Diferencia (m) |
| --- | --- | --- | --- | --- | --- |
| 15/9-F-1 C | NO 15/9-F-1 C (FP) | 3,229.5 | −2,884.5 | 2,894.0 | 9.5 |
| 15/9-F-11 | NO 15/9-F-11 B | 3,467.5 | −2,829.1 | 2,829.2 | 0.1 |
| 15/9-F-12 | NO 15/9-F-12 | 3,126.0 | −2,818.4 | 2,818.0 | −0.3 |
| 15/9-F-14 | NO 15/9-F-14 | 3,000.6 | −2,805.5 | 2,804.5 | −0.9 |
| 15/9-F-15 D | NO 15/9-F-15 D | 3,483.2 | −2,858.4 | 2,861.8 | 3.4 |
| 15/9-F-4 | NO 15/9-F-4 | 3,249.3 | −2,931.0 | 2,931.1 | 0.1 |
| 15/9-F-5 | NO 15/9-F-5 | 3,473.1 | −3,000.2 | 2,998.8 | −1.4 |

**Nombres.** F-12 aparece de cinco formas en el paquete completo: `15/9-F-12` (producción, LAS,
Sodir), `NO 15/9-F-12 H` (código diario), `NO 15/9-F-12` (topes, UWI del LAS), `15_9-F-12`
(carpeta del LAS) y `F-12_ACTUAL` (trayectoria), más la rama `NO 15/9-F-12 pilot` en los topes.
F-14, de seis: suma `NO_15/9-F-14` y `NO_15_9-F-14_KLOGH_NEW.las`. F-4 y F-5 llevan `AH` en el
código diario (`NO 15/9-F-4 AH`), sin rama A en Sodir.

**Datum.** Todo en ED50, UTM zona 31. Pasar la boca de F-12 de ED50 a WGS84 la corre 117 m hacia
el suroeste (azimut 234°) con la transformación por defecto de pyproj; otras publicadas dan de 113
a 117 m.

## Diferencias que no son errores

- Conciliación con la hoja diaria en lugar de la mensual: da lo mismo, 10,037,081 Sm³.
- Diferencia grilla contra tope de algunos décimos distinta si el agente interpola en lugar de
  tomar el nodo más cercano.
- Distancias de la boca en la segunda decimal, según tome la primera estación de la trayectoria o
  la reconstruya con los desplazamientos.
- La última muestra "de las otras curvas" en F-12: 3,507.49 m con las medidas (RHOB), 3,519.37 m
  si cuenta `ROP5_RM` y 3,519.98 m si cuenta las banderas.
- Días de F-5 como productor: 144 según `WELL_TYPE`, 160 según `FLOW_KIND`.
- Si concilia también el agua por año: 2008 da +330% y 2009 −15%, sobre volúmenes chicos; desde
  2010 cuadra a menos de 0.1%.
- Participación de F-12: 45.6% sobre los siete pozos. Sobre el total de Sodir sería 45.0%.

## Plan B

1. El agente se traba, repite un error o no terminó el visor de perfiles a 0:32. Decirlo en voz
   alta, pasar a la ventana G (el tablero del ensayo, en `~/volve-plan-b/`) y seguir el deck con
   esa salida. El agente en vivo termina solo y se mira en la pausa.
2. Sin red. El agente no arranca (necesita la API): G directo, y la referencia en F.
3. No hay ensayo ni plan B. El paquete liviano de la página (`public/descargas/volve/`, también en
   el repo) y la ventana F alcanzan para recorrer los siete chequeos a mano.
4. Se perdió el caché y los espejos de GitHub no responden. El paquete liviano commiteado sirve de
   `datos/` para una corrida reducida: el agente puede hacer inventario, producción contra Sodir,
   mapa, visor de F-12 (recortado) y nombres, pero no la hoja diaria, la trayectoria, F-11 B ni
   F-14. Avisar en `PEDIDO.md` que hay seis archivos.
5. En la parte de ellos, Claude sin cuota: Arena, modo agente, con los archivos sueltos y la copia
   `_las.txt` (Arena no acepta `.las` ni `.zip`). Si fallan las dos, siguen en la pantalla del
   instructor.

## Para el jueves

La sesión 8 critica el caso prearmado del curso (waterflooding, Capítulo IV). El tablero de hoy no
se muestra ahí; lo que se lleva son las cuatro filas de dolor y primer paso del taller.
