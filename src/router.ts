import { useEffect, useState } from 'react'

// Hand-rolled hash routing: with base:'./' on GitHub Pages, hash URLs
// (#/sesion/3) deep-link without the 404.html SPA hack. ~11 routes total,
// so no router dependency.

export const N_SESIONES = 8

// 'panel' es el tablero del instructor. No está en la navegación del masthead
// —nadie lo encuentra sin que se lo digan— pero tampoco es secreto: lo que lo
// protege es el PIN que verifica el Worker, no el hecho de estar sin enlazar.
export type Route =
  | { page: 'home' }
  | { page: 'sesion'; n: number }
  | { page: 'recursos' }
  | { page: 'preguntas' }
  | { page: 'agentes-nube' }
  | { page: 'ia-reservorios' }
  | { page: 'guia-agentes' }
  | { page: 'repaso' }
  | { page: 'panel' }

export function parseHash(hash: string): Route {
  const h = hash.replace(/^#\/?/, '').replace(/\/+$/, '')
  if (h.startsWith('sesion/')) {
    const n = Number(h.split('/')[1])
    if (Number.isInteger(n) && n >= 1 && n <= N_SESIONES) return { page: 'sesion', n }
  }
  if (h === 'recursos') return { page: 'recursos' }
  if (h === 'preguntas') return { page: 'preguntas' }
  if (h === 'agentes-nube') return { page: 'agentes-nube' }
  if (h === 'ia-reservorios') return { page: 'ia-reservorios' }
  if (h === 'guia-agentes') return { page: 'guia-agentes' }
  if (h === 'repaso') return { page: 'repaso' }
  if (h === 'panel') return { page: 'panel' }
  return { page: 'home' }
}

export function hrefFor(route: Route): string {
  switch (route.page) {
    case 'home':
      return '#/'
    case 'sesion':
      return `#/sesion/${route.n}`
    case 'recursos':
      return '#/recursos'
    case 'preguntas':
      return '#/preguntas'
    case 'agentes-nube':
      return '#/agentes-nube'
    case 'ia-reservorios':
      return '#/ia-reservorios'
    case 'guia-agentes':
      return '#/guia-agentes'
    case 'repaso':
      return '#/repaso'
    case 'panel':
      return '#/panel'
  }
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))
  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(window.location.hash))
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}
