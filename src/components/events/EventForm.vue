<script setup>
import { ref, watch, computed } from 'vue'
import { useEventStore } from '@/stores/eventStore'

const props = defineProps({
  visible: Boolean,
  evento: Object
})

const emit = defineEmits(['cerrar'])
const store = useEventStore()

const form = ref({
  evento_id: null,
  titulo: '',
  titulo_img: '',
  ubicacion: '',
  fecha: '',
  hora: '',
  descripcion: '',
  imagen: null
})

const esEditar = computed(() => !!form.value.evento_id)

watch(() => props.evento, (nuevo) => {
  if (nuevo) {
    form.value = { ...nuevo, imagen: null }
  }
})

function onFileChange(e) {
  form.value.imagen = e.target.files[0]
}

async function guardar() {
  const fd = new FormData()
  for (const [key, value] of Object.entries(form.value)) {
    if (value !== null) fd.append(key, value)
  }

  if (esEditar.value) {
    await store.actualizarEvento(fd)
  } else {
    await store.crearEvento(fd)
  }

  emit('cerrar')
  await store.cargarEventos()
}
</script>

<template>
  <div v-if="visible" class="form-wrapper">
    <h3 class="form-title">{{ esEditar ? 'Editar Evento' : 'Nuevo Evento' }}</h3>
    <form @submit.prevent="guardar">
      <div class="form-group">
        <label>Título</label>
        <input v-model="form.titulo" type="text" required />
      </div>

      <div class="form-group">
        <label>Título de Imagen</label>
        <input v-model="form.titulo_img" type="text" required />
      </div>

      <div class="form-group">
        <label>Ubicación</label>
        <input v-model="form.ubicacion" type="text" required />
      </div>

      <div class="form-group">
        <label>Fecha</label>
        <input v-model="form.fecha" type="date" required />
      </div>

      <div class="form-group">
        <label>Hora</label>
        <input v-model.number="form.hora" type="number" required placeholder="Ej: 930" />
      </div>

      <div class="form-group">
        <label>Descripción</label>
        <textarea v-model="form.descripcion" required></textarea>
      </div>

      <div class="form-group">
        <label>Imagen</label>
        <input type="file" @change="onFileChange" />
      </div>

      <div class="form-actions">
        <button type="submit">Guardar</button>
        <button type="button" @click="$emit('cerrar')">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem 0;
  background: #fafafa;
}

.form-title {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
</style>
