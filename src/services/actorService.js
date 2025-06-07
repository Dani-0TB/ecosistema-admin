const BASE_URL_ACTORS = `${import.meta.env.VITE_API_URL}/actores`;
const BASE_URL_CONTENT = `${import.meta.env.VITE_API_URL}/a_content`;

import { useSessionStore } from '@/stores/sessionStore';

function getAuthHeaders() {
  const session = useSessionStore();
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session.token}`,
  };
}

export async function getActors() {
  const res = await fetch(BASE_URL_ACTORS);
  if (!res.ok) throw new Error('Error al obtener actores');
  return await res.json();
}

export async function getActorContent(actor_id) {
  // El backend espera el actor_id en el query string para la petición GET
  const res = await fetch(`${BASE_URL_CONTENT}?actor_id=${actor_id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener contenido del actor');
  return await res.json();
}

export async function updateActorContent(actor_id, formData) {
  // Nota:
  // • "actor_id" se envía en la URL (por ejemplo, /a_content/5).
  // • "formData" es una instancia de FormData que contiene los campos (opcionales) y archivos.
  // • No incluimos 'Content-Type', ya que el navegador lo asigna correctamente.
  const session = useSessionStore();
  const headers = {
    Authorization: `Bearer ${session.token}`,
  };

  const res = await fetch(`${BASE_URL_CONTENT}/update/${actor_id}`, {
    method: 'PUT',
    headers,
    body: formData,
  });

  if (!res.ok) throw new Error('Error al actualizar contenido del actor');
  return await res.json();
}
