<script setup>
import { onMounted } from 'vue'
import { useGeneralContentStore } from '@/stores/generalContentStore'
import GeneralForm from '@/components/general/GeneralForm.vue'

const store = useGeneralContentStore()

onMounted(async () => {
  await store.loadContent()
})
</script>

<template>
  <div class="container">
    <h1>Contenido General</h1>

    <div v-if="store.loading">Cargando contenido...</div>
    <div v-else-if="store.error" class="error">{{ store.error }}</div>
    <div v-else>
      <GeneralForm :content="store.generalContent" @save="store.saveContent" />
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
