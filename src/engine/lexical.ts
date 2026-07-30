// Keyword search, so the RAG exercise can show what embeddings buy you.
//
// This is the honest baseline: plain TF-IDF over the corpus, computed in the
// browser. It is also the only thing that CAN run in the browser for a query
// the user types, because embedding free text would need the model — which is
// exactly the limitation the exercise surfaces.

const ACENTOS: Record<string, string> = {
  á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ü: 'u', ñ: 'n',
}

/** Spanish words that carry no retrieval signal. Without this list, "de" and
 *  "que" dominate every score and the comparison is not a fair fight. */
const VACIAS = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'al', 'a', 'ante', 'con',
  'contra', 'desde', 'en', 'entre', 'hacia', 'hasta', 'para', 'por', 'segun', 'sin', 'sobre',
  'tras', 'y', 'e', 'o', 'u', 'que', 'qué', 'cual', 'cuales', 'quien', 'como', 'cuando', 'donde',
  'cuanto', 'cada', 'es', 'son', 'ser', 'esta', 'este', 'esto', 'estos', 'estas', 'se', 'su',
  'sus', 'lo', 'le', 'les', 'me', 'mi', 'te', 'tu', 'no', 'si', 'mas', 'pero', 'ya', 'muy',
  'tengo', 'tiene', 'hay', 'hacer', 'hago', 'puedo', 'puede', 'debe', 'debo',
])

export function tokenizar(texto: string): string[] {
  return texto
    .toLowerCase()
    .replace(/[áéíóúüñ]/g, (c) => ACENTOS[c] ?? c)
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2 && !VACIAS.has(t))
}

export type Documento = { id: string; texto: string }
export type Resultado = { id: string; score: number; terminos: string[] }

/** TF-IDF cosine between the query and every document. `terminos` lists the
 *  query words the document actually contains, so the UI can show WHY a
 *  document scored — which is the whole point of showing the baseline. */
export function buscarPorPalabras(consulta: string, docs: Documento[]): Resultado[] {
  const N = docs.length
  if (N === 0) return []

  const docTokens = docs.map((d) => tokenizar(d.texto))
  const df = new Map<string, number>()
  for (const tokens of docTokens) {
    for (const t of new Set(tokens)) df.set(t, (df.get(t) ?? 0) + 1)
  }
  const idf = (t: string) => Math.log(1 + N / (1 + (df.get(t) ?? 0)))

  const qTokens = tokenizar(consulta)
  if (qTokens.length === 0) return docs.map((d) => ({ id: d.id, score: 0, terminos: [] }))

  const pesos = (tokens: string[]) => {
    const tf = new Map<string, number>()
    for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1)
    const v = new Map<string, number>()
    for (const [t, n] of tf) v.set(t, (1 + Math.log(n)) * idf(t))
    return v
  }

  const qv = pesos(qTokens)
  const qNorm = Math.hypot(...qv.values()) || 1

  return docs
    .map((d, i) => {
      const dv = pesos(docTokens[i])
      const dNorm = Math.hypot(...dv.values()) || 1
      let punto = 0
      const terminos: string[] = []
      for (const [t, w] of qv) {
        const wd = dv.get(t)
        if (wd) {
          punto += w * wd
          terminos.push(t)
        }
      }
      return { id: d.id, score: punto / (qNorm * dNorm), terminos }
    })
    .sort((a, b) => b.score - a.score)
}
