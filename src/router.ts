import { useEffect, useState } from 'react'

// Hand-rolled hash routing: with base:'./' on GitHub Pages, hash URLs
// (#/sesion/3) deep-link without the 404.html SPA hack. ~11 routes total,
// so no router dependency.

export const N_SESIONES = 8

export type Route = { page: 'home' } | { page: 'sesion'; n: number } | { page: 'recursos' }

export function parseHash(hash: string): Route {
  const h = hash.replace(/^#\/?/, '').replace(/\/+$/, '')
  if (h.startsWith('sesion/')) {
    const n = Number(h.split('/')[1])
    if (Number.isInteger(n) && n >= 1 && n <= N_SESIONES) return { page: 'sesion', n }
  }
  if (h === 'recursos') return { page: 'recursos' }
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
