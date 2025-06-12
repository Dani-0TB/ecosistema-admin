import { useSessionStore } from '@/stores/sessionStore'

const BASE_URL = `${import.meta.env.VITE_API_URL}/idea`

function getAuthHeaders(isFormData = false) {
  const session = useSessionStore()
  return {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    Authorization: `Bearer ${session.token}`
  }
}

export async function getIdea() {
  const res = await fetch(BASE_URL, {
    headers: getAuthHeaders()
  })
  if (!res.ok) throw new Error('Error al obtener datos de la idea')
  return await res.json()
}

export async function updateIdea(formData) {
  const res = await fetch(`${BASE_URL}/update`, {
    method: 'PUT',
    headers: getAuthHeaders(true), // No seteamos 'Content-Type' con FormData
    body: formData
  })
  if (!res.ok) throw new Error('Error al actualizar la idea')
  return await res.json()
}
