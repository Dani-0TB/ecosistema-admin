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
    widget: null, // { widget_id, titulo, widget_img }
    cifras: [], // [{ cifra_id, cifra, descripcion_cifra }]
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

    async saveWidget(payload) {
      if (!this.widget?.widget_id) return
      try {
        await updateWidget(this.widget.widget_id, payload)
        this.widget = { ...this.widget, ...payload }
      } catch (error) {
        console.error('Error al actualizar widget:', error)
      }
    },

    async addNewCifra(payload) {
      try {
        const result = await addCifra(this.widget.widget_id, payload)
        this.cifras.push(result)
      } catch (error) {
        console.error('Error al agregar cifra:', error)
      }
    },

    async saveCifra(cifra_id, payload) {
      try {
        await updateCifra(cifra_id, payload)
        const idx = this.cifras.findIndex((c) => c.cifra_id === cifra_id)
        if (idx !== -1) this.cifras[idx] = { ...this.cifras[idx], ...payload }
      } catch (error) {
        console.error('Error al actualizar cifra:', error)
      }
    },

    async removeCifra(cifra_id) {
      try {
        await deleteCifra(cifra_id)
        this.cifras = this.cifras.filter((c) => c.cifra_id !== cifra_id)
      } catch (error) {
        console.error('Error al eliminar cifra:', error)
      }
    },
  },
})
