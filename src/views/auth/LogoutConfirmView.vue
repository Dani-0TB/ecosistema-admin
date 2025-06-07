<script setup>
import { useSessionStore } from '@/stores/sessionStore'
import { useRouter } from 'vue-router'

const store = useSessionStore()
const router = useRouter()

const confirmLogout = () => {
  store.logout()
  router.push({ name: 'login' })
}

const cancelLogout = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="logout-container">
    <h1>¿Deseas cerrar sesión?</h1>
    <div class="buttons">
      <button class="confirm" @click="confirmLogout">Sí, cerrar sesión</button>
      <button class="cancel" @click="cancelLogout">Cancelar</button>
    </div>
  </div>
</template>

<style scoped>
.logout-container {
  max-width: 500px;
  margin: 4rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

button {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.confirm {
  background-color: #c0392b;
  color: white;
}

.confirm:hover {
  background-color: #992d22;
}

.cancel {
  background-color: #3498db;
  color: white;
}

.cancel:hover {
  background-color: #21618c;
}
</style>
