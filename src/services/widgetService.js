import { useSessionStore } from '@/stores/sessionStore'

const BASE_URL = import.meta.env.VITE_API_URL + '/numbers'

const authHeader = () => {
  const sessionStore = useSessionStore()
  return {
    Authorization: `Bearer ${sessionStore.token}`,
  }
}

export const getWidget = async () => {
  const response = await fetch(`${BASE_URL}/`, {
    method: 'GET',
    headers: authHeader(),
  })
  return await response.json()
}

export const updateWidget = async (formData) => {
  const response = await fetch(`${BASE_URL}/update/widget`, {
    method: 'PUT',
    headers: authHeader(),
    body: formData,
  })
  return await response.json()
}

export const addCifra = async (formData) => {
  const response = await fetch(`${BASE_URL}/create/description_widget`, {
    method: 'POST',
    headers: authHeader(),
    body: formData,
  })
  return await response.json()
}

export const updateCifra = async (formData) => {
  const response = await fetch(`${BASE_URL}/update/description_widget`, {
    method: 'PUT',
    headers: authHeader(),
    body: formData,
  })
  return await response.json()
}

export const deleteCifra = async (id) => {
  const response = await fetch(`${BASE_URL}/delete/description_widget`, {
    method: 'DELETE',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cifra_id: id }),
  })
  return await response.json()
}
