<script setup>
import { ref, watch } from 'vue'
import { useIdeaStore } from '@/stores/ideaStore'

const store = useIdeaStore()
const form = ref({
  idea_id: null,
  titulo: '',
  descripcion: '',
  boton: '',
  bg_img: '' // nombre del archivo actual
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
  <form @submit.prevent="handleSubmit" class="form">
    <div>
      <label>Título</label>
      <input v-model="form.titulo" type="text" required />
    </div>
    <div>
      <label>Descripción</label>
      <textarea v-model="form.descripcion" required></textarea>
    </div>
    <div>
      <label>Texto del Botón</label>
      <input v-model="form.boton" type="text" required />
    </div>
    <div>
      <label>Imagen actual:</label>
      <span>{{ form.bg_img }}</span>
    </div>
    <div>
      <label>Imagen nueva (opcional):</label>
      <input type="file" @change="handleFileChange" />
    </div>
    <button type="submit">Guardar</button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
