<script setup>
import { ref, watch, onMounted } from 'vue'
import { useProjectStore } from '@/stores/projectStore'

const props = defineProps({
  isEditing: Boolean,
  project: Object,
  actorId: Number
})

const emit = defineEmits(['close'])

const store = useProjectStore()

const form = ref({
  titulo: '',
  descripcion: '',
  youtube_link: '',
})

const initializeForm = () => {
  if (props.isEditing && props.project) {
    form.value = {
      titulo: props.project.titulo || '',
      descripcion: props.project.descripcion || '',
      youtube_link: props.project.youtube_link || '',
    }
  } else {
    form.value = {
      titulo: '',
      descripcion: '',
      youtube_link: '',
    }
  }
}

onMounted(() => {
  initializeForm()
})

watch(() => props.project, () => {
  initializeForm()
})

const handleSubmit = async () => {
  try {
    const payload = {
      actor_id: props.actorId,
      titulo: form.value.titulo,
      descripcion: form.value.descripcion,
      youtube_link: form.value.youtube_link,
    }

    if (props.isEditing && props.project?.proyecto_id) {
      payload.proyecto_id = props.project.proyecto_id
      await store.update(props.actorId, payload)
    } else {
      await store.create(props.actorId, payload)
    }

    emit('close')
  } catch (error) {
    console.error('Error al enviar el proyecto:', error)
  }
}
</script>

<template>
  <div class="form-container">
    <h2 class="form-title">{{ isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="titulo">Título:</label>
        <input id="titulo" v-model="form.titulo" required />
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" v-model="form.descripcion" required></textarea>
      </div>

      <div class="form-group">
        <label for="youtube_link">Enlace de YouTube:</label>
        <input id="youtube_link" v-model="form.youtube_link" />
      </div>

      <div class="buttons">
        <button type="submit" class="btn-submit">
          {{ isEditing ? 'Actualizar' : 'Crear' }}
        </button>
        <button type="button" class="btn-cancel" @click="$emit('close')">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  max-width: 700px;
  margin: 0 auto;
}

.form-title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

input[type="text"],
input[type="url"],
textarea {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  border-top: 1px solid #ddd;
  padding-top: 1rem;
}

.checkboxes label {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 0.95rem;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-submit {
  background-color: #2980b9;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #21618c;
}

.btn-cancel {
  background-color: #c0392b;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.3s ease;
}

.btn-cancel:hover {
  background-color: #992d22;
}
</style>
