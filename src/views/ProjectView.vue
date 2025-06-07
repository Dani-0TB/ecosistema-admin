<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { useProjectStore } from '@/stores/projectStore'
import ProjectList from '@/components/projects/ProjectList.vue'

const store = useProjectStore()
const expandedActorId = ref(null)

onMounted(async () => {
  await store.loadActors()
  if (store.actors.length > 0) {
    const firstActorId = store.actors[0].actor_id
    expandedActorId.value = firstActorId
    await store.loadByActor(firstActorId)
  }
})

const toggleProjects = async (actorId) => {
  store.showForm = false
  if (expandedActorId.value === actorId) {
    expandedActorId.value = null
  } else {
    expandedActorId.value = actorId
    await store.loadByActor(actorId)
  }
}
</script>

<template>
  <div class="container">
    <h1>Gestión de Proyectos</h1>
    <div class="content-wrapper">
      <aside class="sidebar">
        <h2>Actores</h2>
        <ul>
          <li v-for="actor in store.actors" :key="actor.actor_id"
            :class="{ active: expandedActorId === actor.actor_id }">
            <button @click="toggleProjects(actor.actor_id)">
              {{ actor.nombre }}
            </button>
          </li>
        </ul>
      </aside>
      <main class="project-content">
        <div v-if="expandedActorId">
          <ProjectList :actor-id="expandedActorId"
            :actor-name="store.actors.find(a => a.actor_id === expandedActorId)?.nombre" />
        </div>
        <div v-else>
          <p>Selecciona un actor para ver sus proyectos.</p>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 1500px;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h1 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.content-wrapper {
  display: flex;
  gap: 2rem;
}

.sidebar {
  flex: 0 0 250px;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.sidebar h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin-bottom: 0.5rem;
}

.sidebar li.active button {
  background-color: #1a252f;
}

.sidebar button {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #2c3e50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
}

.sidebar button:hover {
  background-color: #1a252f;
}

.project-content {
  flex: 1;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
</style>
