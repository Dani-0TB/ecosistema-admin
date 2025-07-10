import { defineStore } from 'pinia'
import {
  getWidget,
  updateWidget,
  addCifra,
  updateCifra,
  deleteCifra,
} from '@/services/widgetService'

export const useWidgetStore = defineStore('widget', {
  state: () => ({
    widget: null,
    cifras: [],
  }),

  actions: {
    async fetchWidget() {
      try {
        const data = await getWidget()
        this.widget = data.widgetData[0] || null
        this.cifras = data.widgetDescriptionData || []
      } catch (error) {
        console.error('Error al obtener widget:', error)
      }
    },

    async saveWidget() {
      if (!this.widget) return
      try {
        const formData = new FormData()
        formData.append('widget_id', this.widget.widget_id)
        formData.append('titulo', this.widget.titulo)
        if (this.widget.widget_img instanceof File) {
          formData.append('widget_img', this.widget.widget_img)
        }
        await updateWidget(formData)
      } catch (error) {
        console.error('Error al actualizar widget:', error)
      }
    },

    async saveCifra(cifra) {
      try {
        const formData = new FormData()
        formData.append('descripcion_cifra', cifra.descripcion_cifra)
        formData.append('cifra', cifra.cifra)

        if (cifra.cifra_id) {
          formData.append('cifra_id', cifra.cifra_id)
          await updateCifra(formData)
        } else {
          await addCifra(formData)
        }

        await this.fetchWidget()
      } catch (error) {
        console.error('Error al guardar cifra:', error)
      }
    },

    async eliminarCifra(id) {
      try {
        await deleteCifra(id)
        this.cifras = this.cifras.filter((c) => c.cifra_id !== id)
      } catch (error) {
        console.error('Error al eliminar cifra:', error)
      }
    },
  },
})
