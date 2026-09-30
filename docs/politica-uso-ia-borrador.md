# Política de uso de inteligencia artificial generativa

**[Gerencia / equipo] · Versión 0.2 · [fecha]**

*Borrador de trabajo del curso de IA generativa, pensado para que cada equipo lo adapte y lo
haga propio. No es un documento oficial de la empresa. Los corchetes marcan lo que falta
completar.*

Esta política cubre el uso de asistentes de inteligencia artificial generativa (chatbots,
cuadernos de documentos, agentes) en tareas de trabajo. Aplica a todo el equipo, con cualquier
herramienta, en cualquier dispositivo.

## 1. Herramientas

- **Aprobadas para documentos internos**: [herramienta contratada por la empresa, con acuerdo de
  tratamiento de datos y sin entrenamiento sobre lo que se sube].
- **Permitidas con cuenta gratuita**, solo con datos del nivel 3: [lista: p. ej. Claude, ChatGPT,
  Gemini, Gemini Notebook].
- **No aprobadas** para datos de la empresa: cuentas personales, herramientas no listadas, y toda
  extensión o aplicación que reenvíe texto a servicios de terceros.

## 2. Datos: el mapa de tres niveles

- **Nivel 1, nunca en una herramienta externa**: producción real por pozo, reservas, precios y
  cláusulas de contratos, datos de socios, información de personas, y todo lo alcanzado por un
  acuerdo de confidencialidad.
- **Nivel 2, solo en herramientas aprobadas del punto 1**: documentos internos no críticos,
  procedimientos, correspondencia ordinaria.
- **Nivel 3, en cualquier herramienta**: información pública, datos históricos ya publicados,
  textos sin datos propios, y datos sintéticos que imiten la estructura de los reales.
- **Regla de borde**: ante la duda, se asume el nivel más alto y se consulta (punto 5).

## 3. Verificación, según el destino del texto

- **Borrador que se va a reescribir**: no se verifica, se reescribe.
- **Texto que sale con firma propia**: todo dato puntual (cifras, fechas, nombres) se coteja
  contra la fuente.
- **Cifra en informe firmado, decisión o documento contractual**: fuente primaria a la vista, sin
  excepción. Si la fuente no se puede abrir en dos minutos, el número no entra.
- **Normativa**: siempre con el texto de la norma adjunto en la conversación, nunca de memoria.

## 4. Declaración de asistencia

Declaran asistencia de inteligencia artificial: [definir umbral; p. ej. todo informe o documento
que circule fuera del equipo, con una línea al pie]. La responsabilidad por el contenido es
siempre de quien firma, con o sin asistencia.

## 5. Casos nuevos

- Los casos que esta página no cubre los resuelve **[nombre y cargo]**, y la respuesta se
  incorpora a la versión siguiente.

## 6. Agentes

Un agente es un asistente que además actúa: lee y escribe archivos, corre código, navega, manda
mensajes o se conecta a otros sistemas.

- **Autonomía máxima permitida**: [escalón 3: el agente escribe solo en copias o en tablas de
  staging; lo que pasa a producción lo aprueba una persona]. Escalones por encima requieren
  aprobación de [rol].
- **Regla de dos**: sin una persona que apruebe cada acción, un agente tiene como mucho dos de
  estos tres poderes: leer contenido externo no confiable (web, correos, archivos de terceros),
  acceder a datos o sistemas sensibles, y actuar o comunicarse hacia afuera.
- **Permisos mínimos**: cada agente corre con una cuenta o credencial propia, con los permisos que
  su tarea necesita y nada más. Ningún agente tiene permisos de borrado sobre bases de producción.
  Las credenciales no se escriben en el código ni en las instrucciones del agente.
- **Validación y revisión**: lo que un agente carga en una base o entrega como resultado pasa por
  una validación automática (formato, rangos, totales) y por una persona antes de usarse.
- **Extensiones y conectores**: solo servidores MCP, extensiones y skills de la lista aprobada
  por [sistemas], en versiones fijas. Está prohibido desactivar los permisos del agente.
- **Registro**: las acciones de cada agente quedan registradas y se revisan [cada mes].
- **Responsable**: cada agente tiene un dueño con nombre y cargo, que responde por lo que hace.
- **Operación**: ningún asistente ni agente se conecta a sistemas de operación o control (SCADA,
  controladores, redes de planta). Trabajan sobre copias o réplicas de solo lectura, del lado de
  la oficina, y producen recomendaciones que una persona ejecuta.
- **Antes de arrancar**: todo agente nuevo responde por escrito las diez preguntas de la lista de
  chequeo [anexo o link], y la firma su responsable.

---

*Esta política se revisa [cada tres meses] o al aparecer un caso nuevo, lo que ocurra primero.
Responsable de la próxima revisión: [nombre] · [fecha].*
