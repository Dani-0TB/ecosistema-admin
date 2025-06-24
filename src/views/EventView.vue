<script setup>
import { ref, watch } from 'vue'
import EventList from '@/components/events/EventList.vue'
import EventForm from '@/components/events/EventForm.vue'
import { useEventStore } from '@/stores/eventStore'

const mostrarForm = ref(false)
const eventoSeleccionado = ref(null)
const store = useEventStore()

function agregar() {
  eventoSeleccionado.value = null
  mostrarForm.value = true
}

function editar(evento) {
  eventoSeleccionado.value = { ...evento }
  mostrarForm.value = true
}

watch(() => store.error, (nueva) => {
  if (nueva) alert(`Error: ${nueva}`)
})
</script>

<template>
  <div class="container">
    <h1>Gestor de Eventos</h1>

    <button @click="agregar">+ Agregar Evento</button>

    <EventList @editar="editar" />

    <EventForm :visible="mostrarForm" :evento="eventoSeleccionado" @cerrar="mostrarForm = false" />
  </div>
</template>

<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
}

button {
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  background-color: #3366cc;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #254a99;
}
</style>
