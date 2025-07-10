import { useSessionStore } from '@/stores/sessionStore'

const BASE_URL = `${import.meta.env.VITE_API_URL}/teams`

function getAuthHeaders() {
  const store = useSessionStore()
  console.log(store.token)
  return {
    Authorization: `Bearer ${store.token}`,
  }
}

// Obtener todos los miembros del equipo (o uno si se da el ID)
export async function getTeamMembers(tarjeta_id = null) {
  const url = tarjeta_id ? `${BASE_URL}/?tarjeta_id=${tarjeta_id}` : `${BASE_URL}`
  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
  })
  if (!response.ok) throw new Error('Error al obtener los miembros del equipo')
  return await response.json()
}

// Crear un nuevo miembro del equipo con imagen
export async function createTeamMember(formData) {
  const token = useSessionStore().token
  const response = await fetch(`${BASE_URL}/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`, // solo este header
    },
    body: formData,
  })
  if (!response.ok) throw new Error('Error al crear el miembro del equipo')
  return await response.json()
}

// Actualizar un miembro del equipo (puede o no incluir nueva imagen)
export async function updateTeamMember(formData) {
  const token = useSessionStore().token
  const response = await fetch(`${BASE_URL}/update`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`, // solo este header
    },
    body: formData,
  })
  if (!response.ok) throw new Error('Error al actualizar el miembro del equipo')
  return await response.json()
}

// Eliminar un miembro por su tarjeta_id (vía query string)
export async function deleteTeamMember(tarjeta_id) {
  const url = `${BASE_URL}/delete?tarjeta_id=${tarjeta_id}`
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  if (!response.ok) throw new Error('Error al eliminar el miembro del equipo')
}
