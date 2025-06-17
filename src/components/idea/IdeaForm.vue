<script setup>
import { ref, watch } from 'vue'
import { useIdeaStore } from '@/stores/ideaStore'

const store = useIdeaStore()
const form = ref({
  idea_id: null,
  titulo: '',
  descripcion: '',
  boton: '',
  bg_img: ''
})
const file = ref(null)

watch(() => store.idea, (newIdea) => {
  if (newIdea) {
    form.value = {
      idea_id: newIdea.idea_id,
      titulo: newIdea.titulo,
      descripcion: newIdea.descripcion,
      boton: newIdea.boton,
      bg_img: newIdea.bg_img
    }
  }
}, { immediate: true })

const handleFileChange = (e) => {
  file.value = e.target.files[0]
}

const handleSubmit = async () => {
  const formData = new FormData()
  for (const key in form.value) {
    formData.append(key, form.value[key])
  }
  if (file.value) {
    formData.append('file', file.value)
  }
  await store.updateIdea(formData)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="idea-form">
    <div class="form-group">
      <label for="titulo">Título</label>
      <input id="titulo" v-model="form.titulo" type="text" required />
    </div>

    <div class="form-group">
      <label for="descripcion">Descripción</label>
      <textarea id="descripcion" v-model="form.descripcion" required></textarea>
    </div>

    <div class="form-group">
      <label for="boton">Texto del Botón</label>
      <input id="boton" v-model="form.boton" type="text" />
    </div>

    <div class="form-group">
      <label for="file">Imagen de fondo</label>
      <input id="file" type="file" @change="handleFileChange" />
      <p v-if="form.bg_img">Archivo actual: {{ form.bg_img }}</p>
    </div>

    <button type="submit">Guardar</button>
  </form>
</template>

<style scoped>
.idea-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 4px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #aaa;
  border-radius: 4px;
  resize: vertical;
}

button {
  align-self: flex-start;
  padding: 8px 16px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
