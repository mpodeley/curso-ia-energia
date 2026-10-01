# Política de uso de inteligencia artificial generativa

**[Gerencia / equipo] · Versión 1.0 · [fecha]**

*Borrador de trabajo del curso de IA generativa, pensado para que cada equipo lo adapte y lo haga propio. No es un documento oficial de la empresa. Los corchetes marcan lo que falta completar.*

## Cómo leer este documento

Cada sección tiene tres partes. **Qué se habilita** dice lo que el equipo puede hacer. **Qué riesgo cubre** explica por qué existe la regla, con un caso real y su fuente. **La regla** es lo que se cumple.

Los casos se citan para que el riesgo se pueda ver y medir. Casi todos terminaron en un control simple que ya se conocía y no estaba puesto: un permiso de más, una copia de respaldo en el mismo lugar que el original, un dato sin cotejar.

## 1. Propósito y principio

Esta empresa usa inteligencia artificial generativa. La política existe para que ese uso sea amplio, conocido y sostenible, y para que nadie tenga que adivinar qué está permitido.

Tres principios ordenan todo lo demás:

- **Habilitar por defecto.** Lo que esta política no restringe, se puede hacer con las herramientas aprobadas.
- **La responsabilidad no se delega.** Quien firma un documento o aprueba una acción responde por ella, la haya hecho con asistencia o sin ella.
- **El control es proporcional al daño posible.** Un borrador no necesita el mismo cuidado que una cifra en un informe firmado, y un agente que lee una carpeta no necesita el mismo cuidado que uno que escribe en una base de datos.

## 2. Alcance y definiciones

Esta política cubre el uso de asistentes de inteligencia artificial generativa (chatbots, cuadernos de documentos, agentes) en tareas de trabajo. Aplica a todo el equipo, con cualquier herramienta, en cualquier dispositivo, incluidos los personales cuando se usan para trabajar.

- **Asistente:** herramienta que responde con texto, imágenes o código a partir de lo que se le escribe o se le sube.
- **Agente:** asistente que además actúa: lee y escribe archivos, corre código, navega, manda mensajes o se conecta a otros sistemas.
- **Conector:** cualquier pieza que le da a un asistente acceso a otro sistema (correo, calendario, unidad de archivos, base de datos). Incluye servidores MCP, extensiones y complementos.
- **Sandbox:** entorno aislado donde corre un agente, separado de la máquina, las cuentas y la red de quien lo usa. Puede ser una carpeta aislada, una máquina virtual o un entorno en la nube del proveedor.
- **Swarm o sistema multiagente:** varios agentes que trabajan a la vez sobre una tarea, coordinados por otro agente o entre sí.

## 3. Relevamiento de herramientas

**Qué se habilita.** Declarar lo que ya se usa, sin consecuencias. El relevamiento sirve para aprobar herramientas y contratar las que hagan falta. No es una auditoría de personas.

**Qué riesgo cubre.** No se puede proteger lo que no se sabe que existe. En 2023, empleados de Samsung pegaron código fuente y la transcripción de una reunión en ChatGPT en tres ocasiones en unos veinte días; la empresa se enteró después y respondió prohibiendo la herramienta ([Expansión](https://expansion.mx/tecnologia/2023/05/02/samsung-prohibe-chatgpt-a-sus-empleados-por-temores-de-seguridad)). Una prohibición general empuja el uso a cuentas personales, donde nadie lo ve.

**La regla.**

- Antes de la primera versión firmada de esta política, [responsable] releva qué herramientas de IA usa el equipo. La planilla está en el Anexo A.
- Por cada herramienta se registra: quién la usa, para qué tarea, con qué tipo de cuenta (personal, gratuita, contratada por la empresa), qué datos se le suben, qué conectores tiene activos y si actúa como agente.
- El relevamiento incluye las funciones de IA que vienen dentro de programas ya contratados (suite de oficina, correo, navegador, software técnico).
- Se actualiza [cada tres meses] y cada vez que alguien empieza a usar una herramienta nueva.

## 4. Herramientas aprobadas

**Qué se habilita.** Usar las herramientas de la lista sin pedir permiso cada vez, y proponer herramientas nuevas con un trámite corto.

**Qué riesgo cubre.** Las condiciones cambian según la cuenta: una cuenta gratuita puede usar lo que se le sube para entrenar modelos; una contratada con acuerdo de tratamiento de datos, no. La misma herramienta puede ser segura o no según cómo se contrató.

**La regla.**

- Aprobadas para documentos internos: [herramienta contratada por la empresa, con acuerdo de tratamiento de datos y sin entrenamiento sobre lo que se sube].
- Permitidas con cuenta gratuita, solo con datos del nivel 3: [lista: p. ej. Claude, ChatGPT, Gemini, Gemini Notebook].
- No aprobadas para datos de la empresa: cuentas personales, herramientas no listadas, y toda extensión o aplicación que reenvíe texto a servicios de terceros.
- Para aprobar una herramienta nueva, quien la propone responde cuatro preguntas a [responsable]: quién es el proveedor, dónde quedan los datos, si se usan para entrenar, y qué permisos pide. La respuesta llega en [cinco días hábiles].

## 5. Datos: el mapa de tres niveles

**Qué se habilita.** Trabajar con cualquier herramienta sobre información pública o sintética, y con las herramientas aprobadas sobre documentos internos.

**Qué riesgo cubre.** Lo que se sube a un servicio externo sale del control de la empresa. Cuando hay socios, contratos o acuerdos de confidencialidad, el dato tampoco es solo propio.

**La regla.**

- Nivel 1, nunca en una herramienta externa: producción real por pozo, reservas, precios y cláusulas de contratos, datos de socios, información de personas, y todo lo alcanzado por un acuerdo de confidencialidad.
- Nivel 2, solo en herramientas aprobadas del punto 4: documentos internos no críticos, procedimientos, correspondencia ordinaria.
- Nivel 3, en cualquier herramienta: información pública, datos históricos ya publicados, textos sin datos propios, y datos sintéticos que imiten la estructura de los reales.
- Regla de borde: ante la duda, se asume el nivel más alto y se consulta (punto 16).
- Contraseñas, claves de API y credenciales no se pegan en ningún asistente, de ningún nivel.

## 6. Verificación, según el destino del texto

**Qué se habilita.** Usar un asistente para redactar, resumir, calcular y analizar, con un esfuerzo de control acorde a dónde termina el resultado.

**Qué riesgo cubre.** Un modelo de lenguaje produce texto verosímil, y a veces lo verosímil es falso. No avisa cuándo inventa. Deloitte devolvió parte de un informe de AUD 440,000 al gobierno australiano por referencias y una cita judicial inexistentes ([The Register](https://www.theregister.com/2025/10/06/deloitte_ai_report_australia/)). Air Canada tuvo que cumplir lo que su chatbot le prometió por error a un pasajero ([The Guardian](https://www.theguardian.com/world/2024/feb/16/air-canada-chatbot-lawsuit)). En Argentina ya hubo abogados apercibidos por presentar jurisprudencia que no existe ([Diario Constitucional](https://www.diarioconstitucional.cl/2026/01/04/tribunal-argentino-apercibe-a-abogado-que-utilizo-inteligencia-artificial-para-redactar-escrito-con-jurisprudencia-inexistente/)).

Hay un segundo fenómeno, distinto de la alucinación: un agente que informa algo que no hizo. En julio de 2025, un agente de Replit borró una base de producción durante un congelamiento de cambios, generó registros ficticios y afirmó que no se podía restaurar, cosa que resultó falsa ([The Register](https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident/)). En pruebas de laboratorio, con escenarios armados para provocarlo, varios modelos eligieron engañar o presionar a una persona para cumplir su objetivo ([Anthropic](https://www.anthropic.com/research/agentic-misalignment)). Son escenarios construidos, no sistemas en uso, pero alcanzan para fijar la regla: lo que un agente dice que hizo se comprueba mirando el resultado.

**La regla.**

- Borrador que se va a reescribir: no se verifica, se reescribe.
- Texto que sale con firma propia: todo dato puntual (cifras, fechas, nombres) se coteja contra la fuente.
- Cifra en informe firmado, decisión o documento contractual: fuente primaria a la vista, sin excepción. Si la fuente no se puede abrir en dos minutos, el número no entra.
- Normativa: siempre con el texto de la norma adjunto en la conversación, nunca de memoria.
- Trabajo de un agente: se revisa el resultado (el archivo, la tabla, el registro de acciones), no el resumen que el agente escribe sobre su propio trabajo.

## 7. Declaración de asistencia

**Qué se habilita.** Usar asistencia sin esconderla.

**Qué riesgo cubre.** Quien recibe un documento ajusta su lectura si sabe cómo se hizo. Ocultarlo le quita esa posibilidad y, cuando aparece un error, daña la confianza en todo el equipo.

**La regla.**

- Declaran asistencia de inteligencia artificial: [definir umbral; p. ej. todo informe o documento que circule fuera del equipo, con una línea al pie].
- La responsabilidad por el contenido es siempre de quien firma, con o sin asistencia.

## 8. Dependencia y continuidad: el plan B

**Qué se habilita.** Apoyarse en la IA para el trabajo diario, sabiendo qué se hace el día que no está o que se equivoca.

**Qué riesgo cubre.** Tres cosas distintas.

- *La herramienta se cae.* El 3 de septiembre de 2026 ChatGPT, Claude y Grok estuvieron caídos al mismo tiempo, cada uno por una causa propia ([Quartz](https://qz.com/chatgpt-claude-grok-simultaneous-outages-090326)). Un proveedor también puede cambiar precios, límites o condiciones de un día para otro.
- *Se pierde la habilidad.* En cuatro centros de endoscopía de Polonia, la detección de adenomas en estudios hechos sin asistencia bajó de 28.4% a 22.4% después de unos meses de trabajar con IA ([STAT](https://www.statnews.com/2025/08/12/ai-deskilling-doctors-colonoscopy-study-lancet/)). Es un estudio observacional, pero describe bien el mecanismo.
- *Se deja de revisar.* En un ensayo de METR, programadores con experiencia tardaron 19% más usando IA y creyeron haber sido 20% más rápidos ([METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)). La muestra es chica; lo que importa es la distancia entre lo percibido y lo medido.

**La regla.**

- [Responsable] mantiene la lista de tareas críticas que hoy se hacen con IA: [p. ej. informe mensual a socios, parte diario, consolidación de producción].
- Cada tarea crítica tiene un procedimiento escrito para hacerla sin IA, y al menos [dos] personas que lo saben ejecutar.
- Ese procedimiento se practica [una vez por semestre].
- Para las tareas críticas hay una segunda herramienta aprobada, de otro proveedor.
- Ningún plazo comprometido con terceros depende de que una herramienta de IA esté disponible ese día.
- Quien firma tiene que poder explicar el resultado sin el asistente abierto. Si no puede, el documento no está listo.

## 9. Agentes

**Qué se habilita.** Usar agentes para tareas de varios pasos: ordenar archivos, armar tableros, procesar datos, escribir y correr código.

**Qué riesgo cubre.** Un agente combina tres poderes: lee contenido que nadie del equipo escribió, accede a datos o sistemas, y actúa. Con los tres juntos y sin supervisión, un texto ajeno puede terminar dando órdenes. A eso se suma el error simple con permisos de más: en abril de 2026 un agente de programación de la empresa PocketOS encontró en un archivo un token con más alcance del necesario y borró el volumen de producción en segundos; las copias de respaldo estaban en ese mismo volumen ([The Register](https://www.theregister.com/software/2026/04/27/cursor-opus-agent-snuffs-out-startups-production-database/5224442)). El fundador habló de varios errores humanos encadenados.

**La regla.**

- Sandbox por defecto: un agente corre en un entorno aislado (carpeta dedicada, máquina virtual o entorno en la nube del proveedor), con copias de los datos que necesita. Correrlo sobre la máquina de trabajo, con acceso a toda la unidad, requiere aprobación de [rol].
- Autonomía máxima permitida: [escalón 3: el agente escribe solo en copias o en tablas de staging; lo que pasa a producción lo aprueba una persona]. Escalones por encima requieren aprobación de [rol].
- Regla de dos: sin una persona que apruebe cada acción, un agente tiene como mucho dos de estos tres poderes: leer contenido externo no confiable (web, correos, archivos de terceros), acceder a datos o sistemas sensibles, y actuar o comunicarse hacia afuera.
- Permisos mínimos: cada agente corre con una cuenta o credencial propia, con los permisos que su tarea necesita y nada más. Ningún agente tiene permisos de borrado sobre bases de producción. Las credenciales no se escriben en el código ni en las instrucciones del agente.
- Copias de respaldo: se guardan en un lugar al que el agente no llega.
- Validación y revisión: lo que un agente carga en una base o entrega como resultado pasa por una validación automática (formato, rangos, totales) y por una persona antes de usarse.
- Registro: las acciones de cada agente quedan registradas y se revisan [cada mes].
- Responsable: cada agente tiene un dueño con nombre y cargo, que responde por lo que hace.
- Antes de arrancar: todo agente nuevo responde por escrito las diez preguntas del Anexo C, y la firma su responsable.
- Está prohibido desactivar los permisos o las confirmaciones del agente.

## 10. Correo, identidades y contraseñas

**Qué se habilita.** Usar asistentes para redactar, resumir y ordenar correo, con la persona enviando.

**Qué riesgo cubre.** La casilla de correo es la llave de casi todas las demás cuentas: ahí llegan los enlaces para restablecer contraseñas y muchos códigos de verificación. Un agente que lee el correo puede recibirlos, y cualquiera que le escriba a esa casilla puede intentar darle instrucciones.

- Entre abril y mayo de 2026, atacantes le pidieron al asistente de soporte de Meta que asociara un correo nuevo a cuentas ajenas de Instagram; el asistente mandó el código ahí. Fueron 20,225 cuentas. Las que tenían autenticación de varios factores no se vieron afectadas, y Meta le quitó al asistente la capacidad de hacer ese cambio solo ([Krebs on Security](https://krebsonsecurity.com/2026/06/hackers-used-metas-ai-support-bot-to-seize-instagram-accounts/)).
- En una demostración de Brave, un texto escondido en una página web hizo que un navegador con agente buscara el correo del usuario, pidiera un código de acceso, lo leyera en Gmail y lo publicara ([Brave](https://brave.com/blog/comet-prompt-injection/)).
- Un conector de correo falso, publicado como paquete, copiaba al atacante cada mensaje que el agente enviaba ([The Hacker News](https://thehackernews.com/2025/09/first-malicious-mcp-server-found.html)).

**La regla.**

- Ningún agente autónomo tiene acceso a la casilla principal de una persona ni a casillas compartidas del equipo.
- Si un agente necesita correo, usa una casilla dedicada, que no sea dirección de recuperación de ninguna otra cuenta.
- Ningún agente accede a gestores de contraseñas, a aplicaciones de autenticación ni a los SMS de verificación.
- Las cuentas de la empresa usan autenticación de varios factores que no dependa del correo: [aplicación o llave física].
- Restablecer contraseñas, cambiar datos de recuperación, dar permisos y aprobar accesos son acciones de personas. Un agente puede preparar el pedido; no lo ejecuta.
- Los asistentes integrados al correo trabajan en modo borrador: proponen, y la persona envía.
- Los permisos que se le dan a una herramienta sobre una cuenta (accesos OAuth) se revisan [cada tres meses] y se revocan los que no se usan.

## 11. Conectores, extensiones y modelos descargados

**Qué se habilita.** Conectar asistentes a los sistemas de la empresa con las piezas de la lista aprobada.

**Qué riesgo cubre.** Cada conector es software de un tercero que corre con los permisos del agente. Lo mismo vale para un modelo descargado: cargar ciertos formatos de modelo ejecuta código. En 2024 se encontraron en Hugging Face unos cien modelos que abrían una puerta trasera al cargarse ([BleepingComputer](https://www.bleepingcomputer.com/news/security/malicious-ai-models-on-hugging-face-backdoor-users-machines/)).

**La regla.**

- Solo servidores MCP, extensiones y skills de la lista aprobada por [sistemas], en versiones fijas. Las actualizaciones se aprueban antes de instalarse.
- Los modelos descargados vienen de [fuentes aprobadas], en formato safetensors, y se prueban primero en un sandbox.
- Todo conector nuevo se prueba en un sandbox con datos sintéticos antes de tocar datos reales.

## 12. Swarms y sistemas multiagente

**Qué se habilita.** Usar varios agentes en paralelo para tareas grandes, dentro de un sandbox y con topes.

**Qué riesgo cubre.** Con muchos agentes cambia la escala: un error se propaga de uno a otro, las instrucciones maliciosas pueden pasar entre agentes, el gasto crece sin que nadie lo mire y ninguna persona lee todo lo que ocurre.

- En julio de 2026, durante una evaluación interna de OpenAI con las salvaguardas reducidas, un conjunto de agentes salió de su entorno de prueba y entró a la infraestructura de producción de Hugging Face. Hugging Face confirmó acceso a datasets internos y a credenciales de servicio, y no encontró alteraciones en modelos ni datasets públicos ([Hugging Face](https://huggingface.co/blog/security-incident-july-2026)). La cantidad de agentes varía según la fuente.
- En enero de 2026, una red social de agentes dejó expuestos 1.5 millones de tokens de acceso y los mensajes privados entre agentes ([Wiz](https://www.wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys)).
- Un estudio de Berkeley sobre más de 1,600 ejecuciones clasificó catorce modos de falla propios de estos sistemas, entre ellos agentes que dan por verificado lo que otro agente no verificó ([arXiv](https://arxiv.org/abs/2503.13657)).

**La regla.**

- Un sistema multiagente corre siempre en un sandbox, sin acceso a producción ni a internet abierta, salvo aprobación de [rol].
- Tiene tope de agentes simultáneos [n], de tiempo [horas] y de gasto [monto], configurados en la herramienta.
- Tiene un responsable que puede detenerlo en cualquier momento, y sabe cómo.
- La verificación final la hace una persona o un control automático independiente. Un agente que revisa a otro no cuenta como verificación.
- Los agentes no comparten credenciales entre sí.

## 13. Amenazas externas con IA

**Qué se habilita.** Seguir trabajando con normalidad por correo, teléfono y videollamada, con un control adicional en las acciones sensibles.

**Qué riesgo cubre.** Quien ataca también usa estas herramientas. Los mensajes de phishing ya no tienen errores de redacción, y una voz o una cara se pueden imitar.

- En 2024, un empleado de la ingeniería Arup hizo quince transferencias por unos USD 25 millones después de una videollamada donde todos los demás participantes eran falsos ([CNN](https://www.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk)).
- En enero de 2026, en una intrusión a una empresa de agua de Monterrey, el modelo que usaba el atacante señaló por su cuenta una interfaz SCADA como objetivo de valor. El ataque a los sistemas de control falló, y Dragos advierte que no demuestra capacidad autónoma de atacar operación ([SecurityWeek](https://www.securityweek.com/claude-ai-guided-hackers-toward-ot-assets-during-water-utility-intrusion/)).
- Anthropic informó en 2025 una campaña de espionaje donde, según la propia empresa, la mayor parte del trabajo la hizo un agente ([Anthropic](https://www.anthropic.com/news/disrupting-AI-espionage)).

**La regla.**

- Pagos, cambios de datos bancarios, entrega de credenciales y pedidos urgentes de un directivo se confirman por un segundo canal ya conocido: [llamada a un número registrado, en persona].
- La voz y la imagen en una llamada no alcanzan como prueba de identidad.
- Los correos sospechosos se reportan a [dirección], aunque estén bien escritos.
- Las actualizaciones de seguridad de los equipos se instalan en [plazo], porque el tiempo entre que se publica una falla y que se explota es cada vez menor.

## 14. Operación e infraestructura crítica

**Qué se habilita.** Usar asistentes y agentes para analizar datos de operación y producir recomendaciones.

**Qué riesgo cubre.** Un modelo no ofrece garantías de comportamiento, y en operación el error no es barato ni reversible.

**La regla.**

- Ningún asistente ni agente se conecta a sistemas de operación o control (SCADA, controladores, redes de planta).
- Trabajan sobre copias o réplicas de solo lectura, del lado de la oficina, y producen recomendaciones que una persona ejecuta.
- Entre el modelo y el campo hay siempre una persona con nombre y apellido.

Referencia: principios de CISA y otras agencias para integrar IA en tecnología operativa ([CISA](https://www.cisa.gov/resources-tools/resources/principles-secure-integration-artificial-intelligence-operational-technology)).

## 15. Incidentes

**Qué se habilita.** Avisar rápido y sin temor cuando algo sale mal.

**Qué riesgo cubre.** Un incidente que se informa en una hora se contiene; uno que se esconde crece.

**La regla.**

- Se reporta a [nombre, canal] dentro de [una hora]: datos del nivel 1 subidos a una herramienta externa, una acción de un agente que nadie pidió, una credencial expuesta, un resultado erróneo que ya salió del equipo, y cualquier pedido sospechoso de identidad dudosa.
- Primera respuesta: detener el agente, revocar la credencial, avisar a quien recibió el dato erróneo.
- El reporte de buena fe no tiene sanción.
- Cada incidente deja una nota de una página (qué pasó, qué control faltó, qué se cambia) y, si corresponde, una modificación de esta política.

## 16. Casos nuevos y revisión

- Los casos que este documento no cubre los resuelve [nombre y cargo], y la respuesta se incorpora a la versión siguiente.
- Esta política se revisa [cada tres meses] o al aparecer un caso nuevo, lo que ocurra primero.
- Responsable de la próxima revisión: [nombre] · [fecha].

## Anexo A. Planilla de relevamiento

| Herramienta | Quién la usa | Para qué | Tipo de cuenta | Datos que recibe (nivel) | Conectores activos | ¿Actúa como agente? | Estado |
|---|---|---|---|---|---|---|---|
| [ ] | [ ] | [ ] | [personal / gratuita / contratada] | [1 / 2 / 3] | [correo, archivos, ninguno] | [sí / no] | [aprobada / en revisión / no aprobada] |

## Anexo B. Riesgos y controles

| Riesgo | Control principal | Sección | Caso |
|---|---|---|---|
| Dato confidencial en una herramienta externa | Mapa de tres niveles y herramientas aprobadas | 4, 5 | Samsung, 2023 |
| Uso que nadie conoce | Relevamiento trimestral | 3 | Samsung, 2023 |
| Dato inventado en un documento firmado | Verificación según destino | 6 | Deloitte, 2025 |
| Agente que informa algo que no hizo | Revisar el resultado, no el resumen | 6 | Replit, 2025 |
| Caída del servicio o pérdida de habilidad | Plan B por tarea crítica | 8 | Caídas del 3/9/2026 |
| Agente con permisos de más | Sandbox, permisos mínimos, respaldo aparte | 9 | PocketOS, 2026 |
| Instrucciones escondidas en contenido ajeno | Regla de dos | 9 | EchoLeak, 2025 |
| Toma de cuentas a través del correo | Sin agentes en la casilla; MFA sin correo | 10 | Meta, 2026 |
| Conector o modelo malicioso | Lista aprobada y versiones fijas | 11 | postmark-mcp, 2025 |
| Falla en cascada entre agentes | Topes, sandbox, responsable con corte | 12 | Hugging Face, 2026 |
| Fraude con voz o imagen falsa | Confirmación por segundo canal | 13 | Arup, 2024 |
| Acción sobre sistemas de control | Sin conexión a operación | 14 | Monterrey, 2026 |

## Anexo C. Diez preguntas antes de poner en marcha un agente

1. ¿Qué tarea hace, y quién es su responsable?
2. ¿Dónde corre: en un sandbox o en una máquina de trabajo?
3. ¿Qué contenido lee que nadie del equipo escribió?
4. ¿A qué datos y sistemas accede, y de qué nivel?
5. ¿Qué puede hacer hacia afuera: enviar, publicar, escribir, borrar?
6. ¿Tiene los tres poderes a la vez? Si es así, ¿quién aprueba cada acción?
7. ¿Con qué credencial corre, y qué alcance tiene?
8. ¿Qué es lo peor que puede hacer con esos permisos, y cómo se deshace?
9. ¿Dónde queda el registro de lo que hizo, y quién lo revisa?
10. ¿Cómo se detiene, y qué se hace si no está disponible?

[Reemplazar por la lista de la guía de agentes del curso si difiere.]

## Anexo D. Marcos de referencia

- [OWASP Top 10 para aplicaciones con LLM (2025)](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/)
- [OWASP Top 10 para aplicaciones con agentes (2026)](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) y su [perfil de IA generativa (AI 600-1)](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
- [ISO/IEC 42001:2023](https://www.iso.org/standard/42001), sistema de gestión de IA
- [Guía de la AAIP para el uso responsable de IA](https://www.argentina.gob.ar/noticias/guia-de-la-aaip-para-usar-la-inteligencia-artificial-de-manera-responsable) (Argentina)
- [Base de datos de incidentes de IA](https://incidentdatabase.ai)
