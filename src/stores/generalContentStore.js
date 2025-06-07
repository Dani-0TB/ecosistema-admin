import { defineStore } from 'pinia'
import {
  getGeneralContent,
  createGeneralContent,
  updateGeneralContent,
} from '@/services/generalService'

export const useGeneralContentStore = defineStore('generalContent', {
  state: () => ({
    generalContent: null, // Usamos solo el primer objeto del array que devuelve el backend
    loading: false,
    error: null,
  }),

  actions: {
    async loadContent() {
      this.loading = true
      this.error = null
      try {
        const data = await getGeneralContent()
        if (Array.isArray(data) && data.length > 0) {
          this.generalContent = data[0]
        } else {
          this.generalContent = null
        }
      } catch (err) {
        this.error = err.message || 'Error al cargar el contenido general'
      } finally {
        this.loading = false
        console.log(this.generalContent)
      }
    },

    async saveContent(formData) {
      this.loading = true
      this.error = null
      try {
        if (this.generalContent && this.generalContent.general_id) {
          await updateGeneralContent(formData)
        } else {
          await createGeneralContent(formData)
        }
        await this.loadContent() // Recargar después de actualizar o crear
      } catch (err) {
        this.error = err.message || 'Error al guardar el contenido general'
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
