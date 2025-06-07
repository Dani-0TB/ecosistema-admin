<script setup>
import { useGeneralContentStore } from '@/stores/generalContentStore'

const store = useGeneralContentStore()
</script>

<template>
  <div class="content-list">
    <div v-if="store.generalContentList.length > 0">
      <h3>{{ store.generalContentList[0].titulo }}</h3>
      <p>{{ store.generalContentList[0].descripcion }}</p>
      <div v-if="store.generalContentList[0].imagen">
        <p><strong>Archivo de imagen:</strong> {{ store.generalContentList[0].imagen }}</p>
      </div>
    </div>
    <div v-else>
      <p>No hay contenido general disponible. Por favor, créalo a continuación.</p>
    </div>
  </div>
</template>

<style scoped>
.content-list {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
}
</style>
