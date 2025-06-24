import { defineStore } from 'pinia'
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '@/services/eventService'

export const useEventStore = defineStore('eventStore', {
  state: () => ({
    eventos: [],
    loading: false,
    error: null,
  }),

  actions: {
    async cargarEventos() {
      this.loading = true
      try {
        this.eventos = await fetchEvents()
        this.error = null
      } catch (err) {
        this.error = err.message || 'Error al cargar eventos'
      } finally {
        this.loading = false
      }
    },

    async crearEvento(datosFormulario) {
      this.loading = true
      try {
        const nuevo = await createEvent(datosFormulario)
        this.eventos.push(nuevo)
        this.error = null
      } catch (err) {
        this.error = err.message || 'Error al crear evento'
      } finally {
        this.loading = false
      }
    },

    async actualizarEvento(datosFormulario) {
      this.loading = true
      try {
        const actualizado = await updateEvent(datosFormulario)
        const index = this.eventos.findIndex((e) => e.evento_id === actualizado.evento_id)
        if (index !== -1) this.eventos[index] = actualizado
        this.error = null
      } catch (err) {
        this.error = err.message || 'Error al actualizar evento'
      } finally {
        this.loading = false
      }
    },

    async eliminarEvento(id) {
      this.loading = true
      try {
        await deleteEvent(id)
        this.eventos = this.eventos.filter((e) => e.evento_id !== id)
        this.error = null
      } catch (err) {
        this.error = err.message || 'Error al eliminar evento'
      } finally {
        this.loading = false
      }
    },
  },
})
