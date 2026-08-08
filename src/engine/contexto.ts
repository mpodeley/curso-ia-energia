// The context window: everything the model can look at to choose the next
// token. It has a size measured in tokens, and what does not fit is not
// "forgotten" — it was never there.
//
// Real systems drop the oldest turns first, which is the whole point of this
// exercise: the instruction you gave at the start is the first thing to go, and
// nothing warns you. The model keeps answering with what it has left.

export type MensajeContexto = {
  i: number
  rol: 'usuario' | 'modelo'
  texto: string
  tokens: number
  /** What this message contributes that the model will need later. Only the
   *  messages that hurt to lose carry one. */
  hecho?: string
}

export type Conversacion = { mensajes: MensajeContexto[]; total: number }

export type Recorte = {
  /** Indices still inside the window, in conversation order. */
  dentro: number[]
  tokensDentro: number
  tokensFuera: number
}

/** Fit as many messages as possible into `limite`, keeping the most recent. */
export function recortar(mensajes: MensajeContexto[], limite: number): Recorte {
  const dentro: number[] = []
  let usados = 0
  for (let i = mensajes.length - 1; i >= 0; i--) {
    // The last message always stays, even if it alone exceeds the budget: a
    // model that cannot read your question does not answer at all, and that is
    // a different failure than the one this exercise is about.
    if (dentro.length > 0 && usados + mensajes[i].tokens > limite) break
    dentro.push(i)
    usados += mensajes[i].tokens
  }
  dentro.reverse()
  const total = mensajes.reduce((s, m) => s + m.tokens, 0)
  return { dentro, tokensDentro: usados, tokensFuera: total - usados }
}

/** The facts stated in the conversation, and whether each is still visible. */
export function hechos(
  mensajes: MensajeContexto[],
  recorte: Recorte,
): { i: number; hecho: string; visible: boolean }[] {
  return mensajes
    .filter((m): m is MensajeContexto & { hecho: string } => Boolean(m.hecho))
    .map((m) => ({ i: m.i, hecho: m.hecho, visible: recorte.dentro.includes(m.i) }))
}
