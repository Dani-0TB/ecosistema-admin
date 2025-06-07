import { defineStore } from 'pinia'
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '@/services/teamService'

export const useTeamStore = defineStore('team', {
  state: () => ({
    teamList: [],
    selectedCard: null,
    loading: false,
    error: null,
  }),

  actions: {
    async loadAll() {
      this.loading = true
      this.error = null
      try {
        this.teamList = await getTeamMembers()
      } catch (err) {
        this.error = err.message || 'Error al cargar miembros del equipo'
      } finally {
        this.loading = false
      }
    },

    async loadById(tarjeta_id) {
      this.loading = true
      this.error = null
      try {
        const result = await getTeamMembers(tarjeta_id)
        this.selectedCard = Array.isArray(result) ? result[0] : result
      } catch (err) {
        this.error = err.message || 'Error al cargar el miembro'
      } finally {
        this.loading = false
      }
    },

    async create(formData) {
      this.loading = true
      this.error = null
      try {
        const result = await createTeamMember(formData)
        await this.loadAll() // Recargar la lista completa
        return result
      } catch (err) {
        this.error = err.message || 'Error al crear miembro'
        throw err
      } finally {
        this.loading = false
      }
    },

    async update(formData) {
      this.loading = true
      this.error = null
      try {
        const result = await updateTeamMember(formData)
        await this.loadAll() // Actualiza la lista
        return result
      } catch (err) {
        this.error = err.message || 'Error al actualizar miembro'
        throw err
      } finally {
        this.loading = false
      }
    },

    async delete(tarjeta_id) {
      this.loading = true
      this.error = null
      try {
        await deleteTeamMember(tarjeta_id)
        this.teamList = this.teamList.filter((card) => card.tarjeta_id !== tarjeta_id)
      } catch (err) {
        this.error = err.message || 'Error al eliminar miembro'
        throw err
      } finally {
        this.loading = false
      }
    },

    clearSelected() {
      this.selectedCard = null
    },
  },
})
