<script setup>
import { ref, watch } from 'vue'
import { useGeneralContentStore } from '@/stores/generalContentStore'

const props = defineProps({
  content: Object
})

const store = useGeneralContentStore()

// Variables reactivas locales
const titulo = ref('')
const desc_body = ref('')
const youtube_link = ref('')
const desc_box = ref('')
const obj_box = ref('')
const resultados_box = ref('')
const home_image = ref(null)

// Watch para actualizar el formulario con el contenido del store cuando cambie
watch(
  () => props.content,
  (newContent) => {
    if (newContent) {
      titulo.value = newContent.desc_titulo || ''
      desc_body.value = newContent.desc_body || ''
      youtube_link.value = newContent.youtube_link || ''
      desc_box.value = newContent.desc_box || ''
      obj_box.value = newContent.obj_box || ''
      resultados_box.value = newContent.resultados_box || ''
    }
  },
  { immediate: true }
)

// Función para manejar el submit
const handleSubmit = async () => {
  const formData = new FormData()
  if (props.content && props.content.general_id) {
    formData.append('general_id', props.content.general_id)
  }
  formData.append('desc_titulo', titulo.value)
  formData.append('desc_body', desc_body.value)
  formData.append('youtube_link', youtube_link.value)
  formData.append('desc_box', desc_box.value)
  formData.append('obj_box', obj_box.value)
  formData.append('resultados_box', resultados_box.value)

  if (home_image.value) {
    formData.append('home_image', home_image.value)
  }

  await store.saveContent(formData)
  if (!store.error) {
    alert('Contenido actualizado con éxito')
  }
}
</script>

<template>
  <div class="form-container">
    <h2>Editar Contenido General</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="titulo">Título</label>
        <input id="titulo" v-model="titulo" type="text" />
      </div>

      <div class="form-group">
        <label for="desc_body">Descripción</label>
        <textarea id="desc_body" v-model="desc_body" rows="4"></textarea>
      </div>

      <div class="form-group">
        <label for="youtube_link">Enlace de Youtube</label>
        <input id="youtube_link" v-model="youtube_link" type="text" />
      </div>

      <div class="form-group">
        <label>Imagen Actual:</label>
        <p>{{ props.content?.home_image || 'No hay imagen' }}</p>
      </div>

      <div class="form-group">
        <label for="home_image">Imagen (opcional)</label>
        <input id="home_image" type="file" @change="e => home_image.value = e.target.files[0]" />
      </div>

      <button type="submit">Guardar</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
}

h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  color: #2c3e50;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.6rem 1rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #1a252f;
}
</style>
