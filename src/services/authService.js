import { useSessionStore } from '@/stores/sessionStore'

const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`

export async function login(user) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Error during login: ${errorText}`)
  }

  return await res.json()
}

/**
 * Verifica si el token actual sigue siendo válido
 * Devuelve true si es válido, false si no lo es.
 */
export async function verifyToken() {
  const store = useSessionStore()
  if (!store.token) return false

  const res = await fetch(`${BASE_URL}/verify`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
  })

  return res.ok
}
