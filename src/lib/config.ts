// La única variable de entorno del sitio, y el interruptor general de todo lo
// que habla con el servidor del curso.
//
// Con VITE_API_URL vacío, `apiHabilitada` es false, ningún componente nuevo
// renderiza nada y el sitio queda exactamente como antes de que existiera el
// Worker: prosa, quiz y los nueve ejercicios, todo en el navegador. Eso hace que
// esta capa entera sea reversible sin tocar una línea de código.
//
// La URL no es un secreto: cualquiera la ve abriendo devtools. Los PIN sí lo
// son, y por eso no están acá ni en ningún otro lugar de src/ — se escriben a
// mano y los verifica el Worker.

const RAW = (import.meta.env.VITE_API_URL ?? '').trim()

export const API_URL = RAW.replace(/\/+$/, '')

export const apiHabilitada = API_URL !== ''
