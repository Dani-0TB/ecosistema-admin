<script setup>
import { onMounted } from 'vue'
import { useEventStore } from '@/stores/eventStore'

const emit = defineEmits(['editar'])
const store = useEventStore()

onMounted(async () => {
  await store.cargarEventos()
})

function editar(evento) {
  emit('editar', evento)
}

async function eliminar(id) {
  if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
    await store.eliminarEvento(id)
    await store.cargarEventos()
  }
}
</script>

<template>
  <div>
    <h2>Eventos</h2>
    <table class="event-table">
      <thead>
        <tr>
          <th>Título</th>
          <th>Fecha</th>
          <th>Ubicación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="evento in store.eventos" :key="evento.evento_id">
          <td>{{ evento.titulo }}</td>
          <td>{{ evento.fecha }}</td>
          <td>{{ evento.ubicacion }}</td>
          <td>
            <button class="btn btn-edit" @click="editar(evento)">Editar</button>
            <button class="btn btn-delete" @click="eliminar(evento.evento_id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.event-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.event-table th,
.event-table td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}

.event-table th {
  background: #f0f0f0;
}

.btn {
  padding: 0.4rem 0.8rem;
  margin-right: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 3px;
}

.btn-edit {
  background-color: #3366cc;
  color: white;
}

.btn-edit:hover {
  background-color: #254a99;
}

.btn-delete {
  background-color: #cc3333;
  color: white;
}

.btn-delete:hover {
  background-color: #992222;
}
</style>
