<script setup>
import { ref, watch } from 'vue';
import { useActorContentStore } from '@/stores/actorContentStore';

const props = defineProps({
  actorId: Number,
  content: Object,
});

// Definir emisor de eventos para notificar cuando se guarde la actualización
const emit = defineEmits(['saved']);

const actorContentStore = useActorContentStore();

// Objeto reactivo para los campos de texto
const form = ref({
  desc_titulo: '',
  desc_body: '',
  youtube_link: '',
  desc_box: '',
  obj_box: '',
  resultados_box: '',
});

// Refs para las imágenes, ya que para archivos no usamos v-model
const cardImage = ref(null);
const homeImage = ref(null);

// Actualiza el formulario cuando cambia la prop "content"
watch(
  () => props.content,
  (newContent) => {
    if (newContent) {
      form.value = { ...newContent };
    }
  },
  { immediate: true }
);

const handleCardImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    cardImage.value = file;
  }
};

const handleHomeImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    homeImage.value = file;
  }
};

const handleSubmit = async () => {
  try {
    // Construimos el FormData para enviar todos los campos (texto y archivos)
    const formData = new FormData();
    formData.append('desc_titulo', form.value.desc_titulo);
    formData.append('desc_body', form.value.desc_body);
    formData.append('youtube_link', form.value.youtube_link);
    formData.append('desc_box', form.value.desc_box);
    formData.append('obj_box', form.value.obj_box);
    formData.append('resultados_box', form.value.resultados_box);

    // Adjuntamos imágenes si se han seleccionado
    if (cardImage.value) {
      formData.append('card_image', cardImage.value);
    }
    if (homeImage.value) {
      formData.append('home_image', homeImage.value);
    }

    // Llamamos a la acción update usando actorId y el FormData
    await actorContentStore.update(props.actorId, formData);
    alert('Contenido actualizado correctamente.');
    emit('saved');
  } catch (error) {
    console.error('Error al actualizar contenido:', error);
    alert('Ocurrió un error al actualizar.');
  }
};
</script>

<template>
  <div class="form-container">
    <h2>Editar Contenido del Actor</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Título:</label>
        <input v-model="form.desc_titulo" required />
      </div>
      <div class="form-group">
        <label>Descripción:</label>
        <textarea v-model="form.desc_body" required></textarea>
      </div>
      <div class="form-group">
        <label>Enlace de YouTube:</label>
        <input v-model="form.youtube_link" />
      </div>
      <div class="form-group">
        <label>Imagen Card:</label>
        <input type="file" @change="handleCardImageChange" />
      </div>
      <div class="form-group">
        <label>Imagen Home:</label>
        <input type="file" @change="handleHomeImageChange" />
      </div>
      <div class="buttons">
        <button type="submit">Guardar</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

input[type="text"],
input[type="url"],
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

button {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  background-color: #2c3e50;
  color: white;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1a252f;
}
</style>
