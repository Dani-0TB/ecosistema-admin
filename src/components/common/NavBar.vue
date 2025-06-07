<script setup>
import { useSessionStore } from '@/stores/sessionStore';

const session = useSessionStore();
</script>

<template>
  <div class="titlebar">
    <div class="left">
      <span class="tb-title">Ecosistema iVARAS CMS</span>
      <span v-if="session.isLoggedIn" class="welcome">Hola {{ session.username }}!</span>
    </div>
    <div class="right">
      <router-link v-if="session.isLoggedIn" class="navlink" to="/">Inicio</router-link>
      <router-link v-if="session.isLoggedIn" class="navlink logout" to="/logout">
        Cerrar sesión
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.titlebar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
  border-bottom: 2px solid #1f2d3d;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tb-title {
  font-size: 1.2rem;
  font-weight: 700;
}

.right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.welcome {
  font-size: 0.95rem;
  opacity: 0.9;
  margin-left: 20px;
}

.navlink {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.navlink:hover {
  background-color: #1a252f;
}


.logout:hover {
  background-color: #9e232d;
}
</style>
