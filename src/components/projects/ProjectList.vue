<script setup>
import { useProjectStore } from '@/stores/projectStore'
import { onMounted, ref } from 'vue'
import ProjectForm from '@/components/projects/ProjectForm.vue'

const props = defineProps({
  actorId: Number,
  actorName: String,
})

const store = useProjectStore()
const showForm = ref(false)
const isEditing = ref(false)
const currentProject = ref(null)

const openCreateForm = () => {
  currentProject.value = null
  isEditing.value = false
  showForm.value = true
}

const openEditForm = (project) => {
  currentProject.value = { ...project }
  isEditing.value = true
  showForm.value = true
}

onMounted(() => {
  store.loadByActor(props.actorId)
})
</script>

<template>
  <div class="project-section">
    <h2>Proyectos de {{ actorName }}</h2>

    <table class="project-table">
      <thead>
        <tr>
          <th>Título</th>
          <th>Descripción</th>
          <th>Enlace Youtube</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in store.projectLists[props.actorId] || []" :key="p.proyecto_id">
          <td>{{ p.titulo }}</td>
          <td>{{ p.descripcion }}</td>
          <td><a :href="p.youtube_link" target="_blank">Ir al enlace</a></td>
          <td class="actions-cell">
            <button class="edit-btn" @click="openEditForm(p)">Editar</button>
            <button class="delete-btn" @click="store.delete(props.actorId, p.proyecto_id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button class="add-btn" @click="openCreateForm">+ Agregar Proyecto</button>

    <ProjectForm v-if="showForm" :is-editing="isEditing" :project="currentProject" :actor-id="props.actorId"
      @close="showForm = false" />
  </div>
</template>

<style scoped>
.project-section {
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
}

h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.project-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

th,
td {
  padding: 0.75rem;
  border: 1px solid #ccc;
  text-align: left;
  vertical-align: top;
}

.actions-cell {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.edit-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn:hover {
  background-color: #2980b9;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.add-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #1a252f;
}
</style>
