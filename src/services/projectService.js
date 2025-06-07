import { useSessionStore } from '@/stores/sessionStore'

const BASE_URL = `${import.meta.env.VITE_API_URL}/projects`

function getAuthHeaders() {
  const store = useSessionStore()
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${store.token}`,
  }
}

export async function getProjectsByActor(actor_id) {
  const res = await fetch(`${BASE_URL}?actor_id=${actor_id}`)
  if (!res.ok) throw new Error('Error al obtener proyectos')
  return await res.json()
}

export async function createProject(data) {
  const res = await fetch(`${BASE_URL}/create`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al crear proyecto')
  return await res.json()
}

export async function updateProject(data) {
  const res = await fetch(`${BASE_URL}/update`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al actualizar proyecto')
  return await res.json()
}

export async function deleteProject(project_id) {
  const res = await fetch(`${BASE_URL}/delete?proyecto_id=${project_id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error('Error al eliminar proyecto')
  return await res.json()
}
