import { defineStore } from 'pinia'
import {
  getProjectsByActor,
  createProject,
  updateProject,
  deleteProject,
} from '@/services/projectService'
import { getActors } from '@/services/actorService'

export const useProjectStore = defineStore('project', {
  state: () => ({
    projectLists: {}, // Clave: actor_id, Valor: lista de proyectos
    actors: [],
    selectedProject: null,
    loading: false,
    error: null,
    showForm: false,
    isEditing: false,
    activeActorId: null,
  }),

  actions: {
    async loadActors() {
      this.loading = true
      this.error = null
      try {
        const actors = await getActors()
        this.actors = actors
      } catch (err) {
        this.error = err.message || 'Error al cargar actores'
      } finally {
        this.loading = false
      }
    },

    async loadByActor(actor_id) {
      this.loading = true
      this.error = null
      try {
        const projects = await getProjectsByActor(actor_id)
        this.projectLists[actor_id] = projects
      } catch (err) {
        this.error = err.message || 'Error al cargar proyectos'
      } finally {
        this.loading = false
      }
    },

    async create(actor_id, formData) {
      this.loading = true
      this.error = null
      try {
        const result = await createProject(formData)
        await this.loadByActor(actor_id)
        return result
      } catch (err) {
        this.error = err.message || 'Error al crear proyecto'
        throw err
      } finally {
        this.loading = false
      }
    },

    async update(actor_id, formData) {
      this.loading = true
      this.error = null
      try {
        const result = await updateProject(formData)
        await this.loadByActor(actor_id)
        return result
      } catch (err) {
        this.error = err.message || 'Error al actualizar proyecto'
        throw err
      } finally {
        this.loading = false
      }
    },

    async delete(actor_id, project_id) {
      this.loading = true
      this.error = null
      try {
        await deleteProject(project_id)
        // Asegúrate de usar 'proyecto_id' (consistente con la base de datos)
        this.projectLists[actor_id] = this.projectLists[actor_id].filter(
          (p) => p.proyecto_id !== project_id,
        )
      } catch (err) {
        this.error = err.message || 'Error al eliminar proyecto'
        throw err
      } finally {
        this.loading = false
      }
    },

    clearSelected() {
      this.selectedProject = null
    },
  },
})
