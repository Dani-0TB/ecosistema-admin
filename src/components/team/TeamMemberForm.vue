<script setup>
import { ref, watch } from 'vue'
import { useTeamStore } from '@/stores/teamStore'

const props = defineProps({ isEditing: Boolean })
const emit = defineEmits(['close'])

const store = useTeamStore()

const nombre = ref('')
const cargo = ref('')
const correo = ref('')
const foto = ref(null)

watch(
  () => store.selectedCard,
  (val) => {
    if (val && props.isEditing) {
      nombre.value = val.nombre
      cargo.value = val.cargo
      correo.value = val.correo
    }
  },
  { immediate: true }
)

const submit = async () => {
  const formData = new FormData()
  if (props.isEditing) formData.append('tarjeta_id', store.selectedCard.tarjeta_id)
  formData.append('nombre', nombre.value)
  formData.append('cargo', cargo.value)
  formData.append('correo', correo.value)
  if (foto.value) formData.append('foto', foto.value)

  try {
    props.isEditing
      ? await store.update(formData)
      : await store.create(formData)
    emit('close')
  } catch (err) {
    console.error(err)
  }
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    foto.value = file
  }
}
</script>

<template>
  <form class="formulario" @submit.prevent="submit">
    <h2>{{ props.isEditing ? 'Editar' : 'Nuevo' }} miembro del equipo</h2>

    <label>
      Nombre:
      <input v-model="nombre" type="text" required />
    </label>

    <label>
      Cargo:
      <input v-model="cargo" type="text" required />
    </label>

    <label>
      Correo:
      <input v-model="correo" type="email" required />
    </label>

    <label>
      Foto:
      <input type="file" @change="handleFileUpload" accept="image/*" />
    </label>

    <div class="acciones">
      <button type="submit">{{ props.isEditing ? 'Actualizar' : 'Crear' }}</button>
      <button type="button" @click="$emit('close')">Cancelar</button>
    </div>
  </form>
</template>

<style scoped>
.formulario {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
}

h2 {
  margin-bottom: 1.5rem;
  text-align: center;
}

label {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  font-weight: 600;
}

input[type="text"],
input[type="email"],
input[type="file"] {
  padding: 0.5rem;
  font-size: 1rem;
  margin-top: 0.25rem;
  border: 1px solid #bbb;
  border-radius: 4px;
}

.checkbox-group {
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border: 1px dashed #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
}

.checkbox-group label {
  font-weight: normal;
  margin-bottom: 0.5rem;
  display: block;
}

.acciones {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
}

button {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background: #2c3e50;
  color: white;
  border-radius: 4px;
  transition: background 0.3s ease;
}

button:hover {
  background: #1a242f;
}
</style>
