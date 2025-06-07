<script setup>
import { ref, onMounted, computed } from 'vue';
import { useActorContentStore } from '@/stores/actorContentStore';
import ActorContentForm from '@/components/actor/ActorContentForm.vue';

const actorContentStore = useActorContentStore();
const expandedActorId = ref(null);

// Al montar la vista se cargan los actores y se expande el primero (si existe)
onMounted(async () => {
  await actorContentStore.loadActors();
  if (actorContentStore.actors.length > 0) {
    const firstActorId = actorContentStore.actors[0].actor_id;
    expandedActorId.value = firstActorId;
    await actorContentStore.loadContent(firstActorId);
  }
});

// Cambia el actor expandido, cargando su contenido si es necesario
const toggleContent = async (actorId) => {
  if (expandedActorId.value === actorId) {
    expandedActorId.value = null;
  } else {
    expandedActorId.value = actorId;
    await actorContentStore.loadContent(actorId);
  }
};

// Computed para obtener el contenido del actor actualmente seleccionado
const currentContent = computed(() => actorContentStore.actorContents[expandedActorId.value]);
</script>

<template>
  <div class="container">
    <!-- Título en su propia fila -->
    <h1>Gestión de Contenido por Actor</h1>

    <!-- Diseño principal: Sidebar y área de contenido -->
    <div class="main-layout">
      <div class="sidebar">
        <ul>
          <li
            v-for="actor in actorContentStore.actors"
            :key="actor.actor_id"
            :class="{ active: expandedActorId === actor.actor_id }"
            @click="toggleContent(actor.actor_id)"
          >
            {{ actor.nombre }}
          </li>
        </ul>
      </div>
      <div class="content-area" v-if="expandedActorId">
        <!-- Se pasa expandedActorId (que Vue unwrapea) y el contenido obtenido -->
        <ActorContentForm
          :actorId="expandedActorId"
          :content="currentContent"
          @saved="() => actorContentStore.loadContent(expandedActorId)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 2rem auto;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 2rem;
}

/* El título ocupa su propia fila */
.container > h1 {
  text-align: center;
  margin-bottom: 2rem;
}

/* Layout principal con dos columnas */
.main-layout {
  display: flex;
  gap: 2rem;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.sidebar li:hover {
  background: #eef1f5;
}

.sidebar li.active {
  background: #2c3e50;
  color: white;
}

/* Área de contenido */
.content-area {
  flex: 1;
}
</style>
