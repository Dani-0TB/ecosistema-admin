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

export const updateWidget = async (payload) => {
  const sessionStore = useSessionStore()
  const formData = new FormData()

  formData.append('titulo', payload.titulo)
  if (payload.widget_img instanceof File) {
    formData.append('widget_img', payload.widget_img)
  }

  const response = await fetch(`${BASE_URL}/update/widget`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${sessionStore.token}`,
    },
    body: formData,
  })

  return await response.json()
}

export const addCifra = async (payload) => {
  const response = await fetch(`${BASE_URL}/create/description_widget`, {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  return await response.json()
}

export const updateCifra = async (payload) => {
  const response = await fetch(`${BASE_URL}/update/description_widget`, {
    method: 'PUT',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  return await response.json()
}

export const deleteCifra = async (cifra_id) => {
  const response = await fetch(`${BASE_URL}/delete/description_widget`, {
    method: 'DELETE',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cifra_id }),
  })
  return await response.json()
}
