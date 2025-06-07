import { defineStore } from 'pinia';
import { getActors, getActorContent, updateActorContent } from '@/services/actorService';

export const useActorContentStore = defineStore('actorContent', {
  state: () => ({
    actors: [],
    actorContents: {}, // Almacena el contenido por actor_id
    loading: false,
    error: null,
  }),

  actions: {
    async loadActors() {
      this.loading = true;
      this.error = null;
      try {
        const data = await getActors();
        if (data) {
          this.actors = data;
        }
      } catch (err) {
        this.error = err.message || 'Error al cargar actores';
      } finally {
        this.loading = false;
      }
    },

    async loadContent(actor_id) {
      this.loading = true;
      this.error = null;
      try {
        const data = await getActorContent(actor_id);
        // Almacena el primer ítem (o null si no hay datos)
        this.actorContents[actor_id] = data.length > 0 ? data[0] : null;
      } catch (err) {
        this.error = err.message || 'Error al cargar el contenido';
      } finally {
        this.loading = false;
        console.log(this.actorContents);
      }
    },

    async update(actor_id, formData) {
      this.loading = true;
      this.error = null;
      try {
        // Aquí se envía el actor_id y el formData al service, que ahora maneja la actualización
        const updatedContent = await updateActorContent(actor_id, formData);
        await this.loadContent(actor_id);
        return updatedContent;
      } catch (err) {
        this.error = err.message || 'Error al actualizar el contenido';
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
