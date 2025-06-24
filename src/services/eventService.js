import { useSessionStore } from '@/stores/sessionStore'

const API_BASE = import.meta.env.VITE_API_URL || ''

export async function fetchEvents() {
  const session = useSessionStore()

  const res = await fetch(`${API_BASE}/events`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  })

  if (!res.ok) throw new Error('No se pudo obtener la lista de eventos')
  return await res.json()
}

export async function createEvent(formData) {
  const session = useSessionStore()

  const res = await fetch(`${API_BASE}/events/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
    body: formData,
  })

  if (!res.ok) throw new Error('No se pudo crear el evento')
  return await res.json()
}

export async function updateEvent(formData) {
  const session = useSessionStore()

  const res = await fetch(`${API_BASE}/events/update`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
    body: formData,
  })

  if (!res.ok) throw new Error('No se pudo actualizar el evento')
  return await res.json()
}

export async function deleteEvent(id) {
  const session = useSessionStore()

  const res = await fetch(`${API_BASE}/events/delete?evento_id=${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  })

  if (!res.ok) throw new Error('No se pudo eliminar el evento')
  return await res.json()
}
