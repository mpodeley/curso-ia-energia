# IA generativa para la industria del petróleo y gas

**Curso en vivo · 8 sesiones × 2 horas · online · en español**
Primera edición diseñada para YPFB Andina.

Dictado por **Matías Podeley** — dieciocho años en energía (ingeniería de reservorios y desarrollo
de proyectos en YPF, Tecpetrol y Pluspetrol), hoy dedicado a la evaluación y seguridad de sistemas
de IA para infraestructura energética. [podeley.ar](https://podeley.ar)

---

## La idea

La IA generativa ya está en las oficinas de la industria — con o sin plan. Este curso lleva a un
público amplio (ingeniería, geociencias, operaciones, planificación, administración) **de cero a
un uso competente y con criterio**: qué son los LLMs y los agentes, cómo rinden en el trabajo
diario, dónde fallan, y qué reglas de uso corresponde adoptar en una industria donde los errores
cuestan caro.

Tres decisiones de diseño lo distinguen de un curso genérico:

1. **Todo con ejemplos de la industria.** Los ejercicios usan partes de producción, curvas de
   declinación, papers SPE, boletines de YPFB — no recetas de cocina.
2. **El curso termina en un caso real del grupo.** Desde la sesión 1 se relevan las necesidades de
   los asistentes (encuesta + tareas). En la sesión 5 el grupo elige un caso; el instructor lo
   construye y en la sesión 8 se presenta resuelto de punta a punta.
3. **Riesgo y verificación no son un anexo.** Alucinaciones, confidencialidad y los límites de la
   automatización se trabajan desde la sesión 2 y culminan en una sesión propia (7), con una
   política de uso lista para adoptar. El instructor trabaja en seguridad de IA para
   infraestructura crítica: es el diferencial del curso.

## Formato

- **Antes de cada sesión (30–45 min, auto-guiado):** materiales en el sitio del curso — lecturas o
  videos cortos con tiempo estimado y **ejercicios interactivos que corren en el navegador** (un
  tokenizador real, un simulador de predicción de tokens y temperatura, quizzes con explicación).
- **Sesión en vivo (2 h, videollamada):** exposición con demos en vivo (~40 min), taller hands-on
  con las herramientas (~40 min), discusión estructurada (~30 min), cierre y tarea (~10 min).
- **Requisitos:** navegador y una cuenta gratuita de chatbot (ChatGPT, Claude o Gemini). No se
  instala nada; no se requiere presupuesto de software.
- **Datos:** los ejercicios usan datos públicos (dataset argentino Capítulo IV, boletines YPFB).
  Regla explícita desde el día uno: nada confidencial en herramientas gratuitas.

## Programa

### Sesión 1 — De los datos a la IA generativa
El mapa completo en una historia: data science → machine learning → deep learning → IA generativa,
con ejemplos de la industria en cada capa (una curva de declinación ya es un modelo). Por qué
explotó ahora: datos + cómputo + una arquitectura que escala. Demos en vivo con tareas reales — y
sus fallas. **Se lanza la encuesta de relevamiento** que alimenta el caso final.

### Sesión 2 — Cómo funciona un LLM
Sin matemática pesada, con dos ejercicios interactivos: el modelo lee **tokens** (no palabras), y
hace una sola cosa — **predecir el próximo token** — repetida. Temperatura, ventana de contexto,
las dos etapas de entrenamiento. De esa mecánica se deriva lo más importante del curso: **por qué
alucinan** y por qué la salida es siempre un borrador plausible, no una fuente.

### Sesión 3 — Uso efectivo: prompting y trabajo diario
La anatomía de un prompt que funciona (rol, contexto, tarea, formato, ejemplos, iteración),
aplicada en taller a las tareas reales que los asistentes traen: informes, resúmenes de papers,
minutas, traducción técnica. Primera regla de confidencialidad: qué no se sube a un chatbot y qué
alternativas hay.

### Sesión 4 — IA + datos: análisis asistido
El salto a los datos: el chatbot como copiloto de análisis de un CSV de producción (dataset
público Capítulo IV — declinación, curvas tipo, territorio conocido). Y el **ejercicio boliviano**:
extraer la tabla de producción por campo de un PDF de boletín YPFB y **verificarla número por
número** — la demostración más honesta de lo que estas herramientas dan y de por qué la
verificación no es opcional.

### Sesión 5 — Tu conocimiento + LLMs: RAG y NotebookLM
El LLM no conoce los manuales ni las normas internas: RAG (buscar → traer → responder con cita) es
la solución estándar, y NotebookLM permite probarla gratis con documentos propios, sin programar.
**Checkpoint del caso real:** shortlist de 2–3 candidatos salidos del relevamiento, y elección
grupal del caso que se construye para la sesión 8.

### Sesión 6 — Agentes
De asistentes que responden a sistemas que trabajan: el loop de un agente (pensar → usar una
herramienta → leer el resultado → repetir), demo en vivo de un agente real analizando datos de
producción de punta a punta, qué funciona hoy y qué no. Cierre con la pregunta que importa acá:
qué pasa cuando un agente toca sistemas de operación — puente a la sesión 7.

### Sesión 7 — Riesgos, límites y gobernanza
La sesión que junta todos los límites sembrados en el curso y los vuelve reglas operativas:
protocolo de verificación según el tipo de salida, mapa de confidencialidad de datos, por qué los
asistentes de oficina y los sistemas de operación (SCADA/OT) deben vivir separados, y un **borrador
de política de uso interna de una página** que cada equipo se lleva editable.

### Sesión 8 — Caso real y hoja de ruta
El caso elegido en la sesión 5, construido con feedback asincrónico del grupo, presentado de punta
a punta: la necesidad, el flujo con IA, el resultado — y su crítica con las reglas de la sesión 7.
Si los datos internos no pudieron compartirse, el caso se construye con datos públicos análogos
replicando el mismo flujo (previsto desde el diseño). Cierre: hoja de ruta de adopción por equipo —
qué usar mañana, qué pilotear en 90 días, qué requiere decisión corporativa.

## El pipeline del caso real

| Momento | Qué pasa |
| --- | --- |
| Sesión 1 | Encuesta de relevamiento en vivo: rol, tareas repetitivas, datos disponibles, ideas |
| Sesión 3 | Los asistentes traen sus tareas reales al taller de prompting — más señales |
| Sesión 5 | Shortlist de 2–3 casos candidatos; el grupo elige uno |
| Sesiones 5→8 | El instructor construye el caso, con idas y vueltas asincrónicas con los "dueños" de la necesidad |
| Sesión 8 | Presentación end-to-end + crítica grupal + hoja de ruta |

Criterios de selección de la shortlist: frecuencia del dolor, disponibilidad y sensibilidad de los
datos, verificabilidad del resultado. Plan B explícito si no pueden compartirse datos internos:
caso análogo con datos públicos (boletines YPFB, Capítulo IV) replicando el flujo.

## Sitio del curso

Cada sesión tiene su página con objetivos, materiales previos con tiempo estimado, ejercicios
interactivos (corren enteros en el navegador — no envían datos a ningún servidor) y las preguntas
de discusión. El sitio queda disponible después del curso como material de consulta.
