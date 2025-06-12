<!-- src/views/IdeaView.vue -->
<script setup>
import { onMounted } from 'vue'
import { useIdeaStore } from '@/stores/ideaStore'
import IdeaForm from '@/components/idea/IdeaForm.vue'

const store = useIdeaStore()

onMounted(async () => {
  await store.loadIdea()
})
</script>

<template>
  <div class="idea-container">
    <h1>Gestión de Contenido: Idea Central</h1>
    <div v-if="store.loading">Cargando contenido...</div>
    <div v-else-if="store.error" class="error">{{ store.error }}</div>
    <div v-else>
      <IdeaForm />
    </div>
  </div>
</template>

<style scoped>
.idea-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h1 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
