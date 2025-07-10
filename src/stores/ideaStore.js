// src/stores/ideaStore.js
import { defineStore } from 'pinia'
import { getIdea, updateIdea } from '@/services/ideaService'

export const useIdeaStore = defineStore('idea', {
  state: () => ({
    idea: null,
    loading: false,
    error: null,
  }),

  actions: {
    async loadIdea() {
      this.loading = true
      this.error = null
      try {
        const data = await getIdea()
        this.idea = data.length > 0 ? data[0] : null
      } catch (err) {
        this.error = err.message || 'Error al cargar idea'
      } finally {
        this.loading = false
      }
    },

    async updateIdea(data) {
      this.loading = true
      this.error = null
      try {
        await updateIdea(data)
      } catch (err) {
        this.error = err.message || 'Error al actualizar contenido de Idea'
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
