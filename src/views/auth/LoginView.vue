<script setup>
import { ref } from 'vue'
import { useSessionStore } from '@/stores/sessionStore'
import { useRouter } from 'vue-router'

const store = useSessionStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref(null)

const handleSubmit = async () => {
  error.value = null
  try {
    await store.login({ username: username.value, password: password.value })
    router.push({ name: 'home' }) // Cambia 'home' por la ruta principal
  } catch (err) {
    error.value = err.message || 'Error de inicio de sesión'
  }
}
</script>

<template>
  <div class="login-container">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Nombre de Usuario</label>
        <input id="username" type="text" v-model="username" required />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input id="password" type="password" v-model="password" required />
      </div>

      <button type="submit">Ingresar</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  color: #2c3e50;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #1a252f;
}

.error {
  color: red;
  margin-top: 0.5rem;
  text-align: center;
}
</style>
