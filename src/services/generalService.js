import { useSessionStore } from '@/stores/sessionStore'

const BASE_URL = `${import.meta.env.VITE_API_URL}/g_content`

// Obtener el contenido general
export async function getGeneralContent() {
  const store = useSessionStore()
  const response = await fetch(`${BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
  })
  if (!response.ok) throw new Error('Error al obtener contenido general')
  return await response.json()
}

// Crear nuevo contenido general (usa FormData para enviar imagen)
export async function createGeneralContent(formData) {
  const store = useSessionStore()
  const response = await fetch(`${BASE_URL}/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
    body: formData,
  })
  if (!response.ok) throw new Error('Error al crear contenido general')
  return await response.json()
}

// Actualizar contenido general (usa FormData para enviar imagen)
export async function updateGeneralContent(formData) {
  const store = useSessionStore()
  const response = await fetch(`${BASE_URL}/update`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
    body: formData,
  })
  if (!response.ok) throw new Error('Error al actualizar contenido general')
  return await response.json()
}

// Eliminar contenido general por ID
export async function deleteGeneralContent(contentId) {
  const store = useSessionStore()
  const response = await fetch(`${BASE_URL}/delete?content_id=${contentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
  })
  if (!response.ok) throw new Error('Error al eliminar contenido general')
  return await response.json()
}
