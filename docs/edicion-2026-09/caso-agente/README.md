# El caso en vivo de la sesión 6: un agente arma el screening

Esta carpeta es lo que recibe el agente de terminal en el primer bloque de la sesión 6 (miércoles 30
de septiembre, 12:00 de Argentina) para armar en vivo el screening de waterflooding de la cuenca
Noroeste, el mismo caso que la sesión 8 critica el jueves. El agente es Claude Code, en la
computadora del instructor, con la cuenta paga. Los alumnos miran y proponen chequeos por el chat;
no corren nada.

## Qué hay acá

| Archivo | Para quién | Qué es |
| --- | --- | --- |
| `CLAUDE.md` | El agente | Las instrucciones del proyecto: reglas de trabajo, diccionario de datos, trampas conocidas y los criterios del screening, resumidos del manual de criterios del zip de la sesión 8 |
| `PEDIDO.md` | El agente | El pedido, en cuatro pasos. Es lo que se pega en la terminal |
| `.claude/settings.json` | El agente | Los permisos: sin preguntar puede correr `uv run`, `ls`, `head`, `wc` y escribir en `salida/`; tiene prohibido internet, `curl`, `wget`, `rm` y escribir en `datos/` |
| `preparar_datos.py` | El instructor | Arma la carpeta de trabajo fuera del repo: copia las instrucciones y los dos archivos del caché del Capítulo IV, y deja `salida/` vacía |
| `referencia.py` | El instructor | Calcula todos los números esperados. Es la hoja de respuestas: nunca se copia a la carpeta del agente |
| `.gitignore` | | `datos/` y `salida/`, por si alguien corre algo acá adentro |

Los datos no se versionan: salen de `scripts/_cache/` (fuera de git), que genera
`scripts/fetch_capiv_noroeste.py`. Son dos archivos, 3.4 MB en total.

## Por qué la carpeta de trabajo va fuera del repo

Claude Code lee el `CLAUDE.md` de la carpeta donde arranca y el de cada carpeta de arriba. Si se
lanza dentro de `docs/edicion-2026-09/caso-agente/`, lee también el `CLAUDE.md` de la raíz del
repo, que describe el sitio del curso y no tiene nada que ver con el screening. Por eso
`preparar_datos.py` se niega a escribir dentro del repo y arma la carpeta en `~/caso-agente-vivo`.

El `CLAUDE.md` personal del instructor (`~/.claude/CLAUDE.md`) se carga igual, en cualquier carpeta.
Conviene releerlo antes: el agente lo sigue (por ejemplo, reglas de estilo para el informe).

## Preparación, la víspera (unos 40 minutos)

1. Confirmar que el caché existe: `scripts/_cache/capiv_noroeste_oil_monthly.csv` y
   `scripts/_cache/capiv_noroeste_oil_wells.json`. Si falta, `python scripts/fetch_capiv_noroeste.py`
   (baja unos 2.5 GB, y el corte nuevo cambia los números de este README: correr `referencia.py`
   de nuevo).
2. Dejar listo el caché de `uv`, para que en clase no baje nada:
   `uv run --with pandas --with matplotlib python -c "import pandas, matplotlib"`
3. Ensayo completo, en una carpeta aparte, cronometrado:

   ```
   python3 docs/edicion-2026-09/caso-agente/preparar_datos.py ~/caso-agente-ensayo
   cd ~/caso-agente-ensayo
   claude --model opus "$(cat PEDIDO.md)"
   ```

   Anotar cuánto tardó, en qué se trabó y si llegó a los números de abajo. La carpeta
   `~/caso-agente-ensayo/salida/` queda como plan B.
4. La carpeta del vivo, sin abrir el agente en ella (el diálogo de confianza es parte de la demo):

   ```
   python3 docs/edicion-2026-09/caso-agente/preparar_datos.py ~/caso-agente-vivo
   ```

   El script imprime el tamaño y el sha256 de cada archivo. Los de los datos tienen que empezar
   con `aa01ba31fb9d` (mensual) y `b64c535ab06f` (padrón de pozos): con esos se calcularon los
   números de este README.
5. La referencia, en un archivo para la ventana F:

   ```
   uv run --with pandas python docs/edicion-2026-09/caso-agente/referencia.py ~/caso-agente-vivo/datos > ~/caso-agente-referencia.txt
   ```

6. Terminal con letra grande y tema claro. Ventanas del deck: A el deck, C el sitio, E la terminal
   en `~/caso-agente-vivo`, F la referencia, G `~/caso-agente-ensayo/salida/`.

Para repetir un ensayo en la misma carpeta: `preparar_datos.py ~/caso-agente-ensayo --limpiar`.

## La prueba en seco

El 28 de septiembre se hizo una prueba en seco: un agente del mismo modelo, con esta carpeta, este
`CLAUDE.md` y este pedido, sin acceso a `referencia.py` ni a internet. Tardó unos 11 minutos (31
llamadas a herramientas), reprodujo todos los números de la sección siguiente y, por la regla 5,
encontró solo el efecto de la mezcla de pozos en el WOR de Puesto Guardián. Sus dudas sobre las
instrucciones (qué hacer con los números sin tabla propia, el largo del informe, el fluido del
caudal por pozo, el tiempo cero de Chan) quedaron resueltas en el `CLAUDE.md` actual. Lo que esa
prueba no cubre: el CLI de Claude Code en sí, el diálogo de confianza y los pedidos de permiso,
que se ven recién en el ensayo de la víspera.

## En clase

El bloque dura 45 minutos (de 0:00 a 0:45 del deck).

| Minuto | Qué pasa | Dónde |
| --- | --- | --- |
| 0:00–0:05 | Agenda, objetivos, qué es el caso | Deck |
| 0:05–0:08 | La carpeta: `ls -la`, `salida/` vacía | E |
| 0:08–0:12 | `CLAUDE.md`: reglas 4 y 5, la trampa del `tef`, los criterios del ranking | E |
| 0:12–0:14 | `.claude/settings.json` | E |
| 0:14–0:16 | Lanzar el agente; aceptar la carpeta en el diálogo de confianza | E |
| 0:16–0:33 | El agente trabaja; se narra el loop; el chat propone chequeos | E |
| 0:33–0:39 | `salida/informe.md` contra la tabla de referencia | E y F |
| 0:39–0:44 | El chequeo pozo por pozo, pedido en vivo si el informe no lo trae | E |

El comando, desde la carpeta:

```
cd ~/caso-agente-vivo
claude --model opus "$(cat PEDIDO.md)"
```

Si se prefiere pegar el pedido a mano: `claude --model opus`, y pegar el contenido de
`PEDIDO.md`. En los dos casos el pedido queda escrito arriba en la terminal, a la vista de la
sala.

Durante la corrida, no corregir al agente a mano ni sumarle pedidos. Lo que conviene señalar: la
primera mirada a los datos (cuenta filas antes de calcular), el primer error y qué hace con él,
y los conteos después de cada filtro del ranking.

Al terminar, dos pedidos cortos que suman sin romper nada, si hay tiempo:

- "Mostrame el WOR anual de cada pozo de Puesto Guardián" (el chequeo pozo por pozo).
- En el bloque 2, `/context` para mostrar cuánto ocupó la corrida.

## Los números esperados

Salen de `referencia.py` sobre los archivos de hash `aa01ba31fb9d` y `b64c535ab06f` (caché del
19 de agosto de 2026).

**La cuenca.** 1,003 pozos en el padrón, 88,093 filas mensuales, de 2019-01 a 2026-07. Filas con
inyección: 815, de ellas 550 con `tef = 0`.

**Quién inyecta agua** (filas con `iny_agua > 0`):

| Tipo de pozo | Pozos | m³ | Participación |
| --- | --- | --- | --- |
| Sumidero | 26 | 5,464,168 | 97.3% |
| Inyección de Agua | 1 | 154,484 | 2.7% |
| Petrolífero | 1 | 1 | 0.0% |
| Total | 28 | 5,618,654 | |

**Pozos declarados como Inyección de Agua:** 6. Uno solo inyectó: P.Gu. a-11 (Puesto Guardián),
154,484 m³ en 12 meses, parado transitoriamente. Los otros cinco (TPT.St.CN.i-7, YPF.St.Lo.a-105,
T-58, YPF.St.Tr.a-207, SOC.St.A-1) en cero.

**Ranking de nivel 1**, campos que quedan después de cada filtro: 27 con petróleo desde 2019 → 16
con RGP de hasta 590 m³/m³ → 13 con petróleo en 2025 o después → 10 con Np de al menos 50 Mbbl
→ 5 con al menos tres pozos con petróleo.

| # | Campo | Np desde 2019 (Mbbl) | Pozos con petróleo | RGP (m³/m³) | WOR 12 meses | Corte 12 meses | Agua (bpd) | Sumideros (m³) | Inyección (m³) | Último mes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Palmar Largo | 929.5 | 7 | 364 | 26.27 | 96.3% | 7,796 | 2,027,522 | 0 | 2026-07 |
| 2 | Proa | 618.7 | 3 | 105 | 26.81 | 96.4% | 3,237 | 0 | 0 | 2026-07 |
| 3 | Caimancito | 514.0 | 12 | 288 | 4.28 | 81.1% | 736 | 382,998 | 0 | 2026-07 |
| 4 | Dos Puntitas | 367.8 | 6 | 128 | 23.04 | 95.8% | 2,241 | 834,528 | 0 | 2025-07 |
| 5 | Puesto Guardián | 243.4 | 5 | 59 | 11.61 | 92.1% | 868 | 534,904 | 154,484 | 2025-07 |

Los que salen por el filtro de condensado son 11 (Campo Durán Tupambi, Macueta, Ramos, San
Pedrito, Campo Durán Tranquitas, Chango Norte-Porcelana, Lomitas Bloque Bajo, los dos de la
Sierra de Aguaragüe, Madrejones y Campo Durán San Telmo-Las Peñas). Por actividad salen El
Potrillo, Martínez del Tineo y El Molino; por tamaño, Pozo Escondido, Pozo Escondido Este y
Cañada Grande; por cantidad de pozos, Los Blancos (un solo pozo, 1,531.7 Mbbl y cero agua
informada), Ramón Lista, Alto de Yariguarenda, El Chivil y Puesto La Entrada.

**Puesto Guardián, tabla por pozo** (todas las filas del archivo):

| Pozo | Tipo | Qué | Meses en el archivo | Meses activos | bpd sobre todos | bpd sobre activos |
| --- | --- | --- | --- | --- | --- | --- |
| P.Gu. e-3 | Sumidero | inyección | 79 | 48 | 922.1 | 1,517.6 |
| YPF.St.PGu.a-12 | Sumidero | inyección | 41 | 40 | 919.3 | 942.3 |
| P.Gu. a-11 | Inyección de Agua | inyección | 79 | 12 | 404.1 | 2,660.3 |
| PPSA.St.PGu-13 | Petrolífero | petróleo | 39 | 38 | 87.7 | 90.0 |
| P.Gu. 19 | Petrolífero | petróleo | 79 | 63 | 22.9 | 28.7 |
| P.Gu. 21 | Petrolífero | petróleo | 79 | 70 | 18.4 | 20.8 |
| P.Gu. 20 | Petrolífero | petróleo | 79 | 42 | 10.8 | 20.3 |
| P.Gu. a-15 bis | Petrolífero | petróleo | 79 | 38 | 5.9 | 12.2 |

La columna "bpd sobre todos" es la que muestra la tabla de la sesión 8. Último mes con datos del
campo: 2025-07.

**Puesto Guardián, diagnóstico** (reglas de carga del libro de diagnóstico):

- 1,818 filas del campo en el archivo (24 pozos); 351 con algún volumen; 11 afuera por menos de
  10 días efectivos (2.8 Mbbl de petróleo); 0 filas de inyección rescatadas por la excepción del
  `tef`. Quedan 340 filas de 8 pozos: 300 de yacoraite y 40 de río seco.
- Serie de yacoraite: 2019-01 a 2025-07, 79 meses, 78 con actividad.
- Np desde 2019: 240.6 Mbbl. Agua producida: 4,102.8 Mbbl. Agua inyectada: 3,188.9 Mbbl.
- WOR del primer mes (2019-01): 26.48. Último WOR (2025-07): 10.38. Corte de agua: 91.2%.
- Chan: 41 puntos válidos, pendiente log-log del WOR −0.50, de la derivada −0.308:
  desplazamiento normal.
- `ln(WOR)` contra Np: 78 puntos, pendiente −0.005620 por Mbbl, intercepto 3.4382. La pendiente
  es negativa: no se extrapola al WOR económico.
- Hall: no se calcula (el Capítulo IV no publica presión de inyección).

## Diferencias que no son errores

Si el agente da otro número, casi siempre es una de estas, y cada una se explica con un conteo:

- Np de Puesto Guardián. 243.4 Mbbl con todas las filas (el ranking) y 240.6 sin las 11 filas
  de menos de 10 días (el diagnóstico).
- Caudal medio. P.Gu. a-11: 404.1 bpd sobre los 79 meses del archivo, 2,660.3 sobre los 12
  en que inyectó.
- WOR de 12 meses. Para Puesto Guardián y Dos Puntitas, la ventana termina en 2025-07: son
  los últimos 12 meses con producción del campo.
- Redondeos en la pendiente de Chan o del WOR contra Np, en la tercera cifra.

Y una que sí importa leer: el WOR del campo baja de 26.5 a 10.4 porque cambió la mezcla de pozos.
PPSA.St.PGu-13 entra en 2022 con WOR 3.3 y llega a 10.4 en 2025, cuando da el 95% del petróleo
del campo; los pozos viejos, con WOR de 14 a 36 en 2022, fueron parando. La regla 5 del
`CLAUDE.md` pide que el informe lo diga.

## Plan B

1. El agente se traba, repite un error o no termina a 0:33. Decirlo en voz alta, pasar a la
   ventana G (`~/caso-agente-ensayo/salida/`) y seguir el deck con esa salida. El agente en vivo
   termina solo y se mira en la pausa.
2. No hay ensayo. El zip de la página, `public/descargas/waterflood-screening_2026-08-19.zip`:
   el libro de Puesto Guardián en `datos/argentina/` y `python3 construccion/resumen_cuenca.py`,
   que imprime las tres tablas de la sesión 8 desde el caché del repo. Y `referencia.py` en la
   ventana F, que corre sin red.
3. Sin red. El agente no arranca (necesita la API). Plan B 1, o 2.

## Para el jueves

Tres cosas que salieron al preparar este caso y que tocan a la sesión 8:

- En este caché, las filas de inyección de Puesto Guardián traen `tef` de 20 a 31 días, así que
  la trampa del `tef` no se dispara en ese campo (0 filas rescatadas). En la cuenca sí: 550 de
  las 815 filas con inyección tienen `tef = 0`.
- La pendiente de Hall necesita presión de inyección, que la fuente pública no trae: con esa
  columna vacía, las fórmulas del libro de Puesto Guardián dan "sin datos de inyección". El deck
  de la sesión 8 dice que la pendiente de Hall mide al inyector.
- El "bpd medio" de la tabla de la sesión 8 promedia sobre todos los meses del pozo en el
  archivo, también los de volumen cero.
