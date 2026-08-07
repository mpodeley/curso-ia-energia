-- Esquema de la base del curso (Cloudflare D1 / SQLite).
--
-- Aplicar:
--   local:  npx wrangler d1 execute curso-energia-ypfb --local  --file=./sql/schema.sql
--   remoto: npx wrangler d1 execute curso-energia-ypfb --remote --file=./sql/schema.sql
--
-- Dos ideas sostienen el diseño:
--
--   1. El CONTENIDO no vive acá. El texto de la encuesta y de los pulsos está en
--      src/content/encuesta-s1.ts y src/content/pulsos.ts, versionado en git e
--      importado tanto por el widget del alumno como por el panel. La base
--      guarda solo estado y respuestas. Contenido en git, estado en la base.
--
--   2. La EDICION la estampa el Worker desde [vars], nunca el cliente. La
--      cohorte siguiente es cambiar una línea de wrangler.toml y deployar: las
--      filas viejas siguen consultables y no pueden colisionar por construcción.

CREATE TABLE IF NOT EXISTS alumno (
  edicion    TEXT NOT NULL,
  alumno_id  TEXT NOT NULL,   -- slug del nombre, lo calcula el Worker
  nombre     TEXT NOT NULL,   -- como lo escribió la persona
  creado     TEXT NOT NULL,
  visto      TEXT NOT NULL,
  PRIMARY KEY (edicion, alumno_id)
);

-- La PK compuesta es la que hace idempotente el reenvío: un alumno solo puede
-- pisar su propia fila, nunca duplicarla. No hace falta política antispam.
CREATE TABLE IF NOT EXISTS respuesta (
  edicion     TEXT NOT NULL,
  alumno_id   TEXT NOT NULL,
  tipo        TEXT NOT NULL,   -- encuesta | pulso | ejercicio | discusion | tarea
  ref         TEXT NOT NULL,   -- relevamiento-s1 | s1-palabra-ia | quiz:quiz_s1 | discusion-s1
  sesion      INTEGER NOT NULL,
  payload     TEXT NOT NULL,   -- JSON, validado y medido por src/validate.ts
  creado      TEXT NOT NULL,
  actualizado TEXT NOT NULL,
  PRIMARY KEY (edicion, alumno_id, tipo, ref)
);

-- El panel siempre consulta por (edicion, tipo, ref): es el índice que sostiene
-- el poll de 2 s del histograma proyectado.
CREATE INDEX IF NOT EXISTS idx_respuesta_ref ON respuesta (edicion, tipo, ref);

CREATE TABLE IF NOT EXISTS pulso (
  edicion    TEXT NOT NULL,
  pulso_id   TEXT NOT NULL,
  abierto    INTEGER NOT NULL DEFAULT 0,
  abierto_en TEXT,
  cerrado_en TEXT,
  PRIMARY KEY (edicion, pulso_id)
);

CREATE INDEX IF NOT EXISTS idx_pulso_abierto ON pulso (edicion, abierto);
