<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goTo = (name) => {
  router.push({ name })
}
</script>

<template>
  <div class="home-container">
    <h1 class="home-title">Panel de Administración</h1>
    <p class="home-subtitle">Selecciona una sección para comenzar:</p>

    <div class="card-section">
      <h2>Landing</h2>
      <div class="card-grid">
        <div class="card clickable" @click="goTo('team')">
          <h2>Equipo</h2>
          <p>Gestiona las tarjetas del equipo.</p>
        </div>

        <div class="card clickable" @click="goTo('general')">
          <h2>Contenido General</h2>
          <p>Textos e imágenes del landing principal.</p>
        </div>

        <div class="card clickable" @click="goTo('cifras')">
          <h2>Cifras</h2>
          <p>Indicadores clave y estadísticas del ecosistema.</p>
        </div>

        <div class="card disabled">
          <h2>Eventos</h2>
          <p>Administra el contenido de eventos pasados y futuros.</p>
        </div>

        <div class="card clickable" @click="goTo('idea')">
          <h2>Ideas</h2>
          <p>Modifica el contenido de la sección ideas</p>
        </div>
      </div>
    </div>

    <div class="card-section">
      <h2>Actores</h2>
      <div class="card-grid">
        <div class="card clickable" @click="goTo('actorContent')">
          <h2>Contenido por Actor</h2>
          <p>Contenido personalizado de cada entidad participante.</p>
        </div>

        <div class="card clickable" @click="goTo('projects')">
          <h2>Proyectos</h2>
          <p>Asocia proyectos a actores y administra su información.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  max-width: 1600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
}

.home-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
  color: #2c3e50;
}

.home-subtitle {
  text-align: center;
  color: #555;
  margin-bottom: 2rem;
}

.card-section {
  margin-bottom: 3rem;
}

.card-section>h2 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  border-left: 4px solid #3498db;
  padding-left: 0.75rem;
  color: #2c3e50;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

/* Tarjeta base */
.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  text-align: center;
}

.card h2 {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  color: #2c3e50;
}

.card p {
  font-size: 0.95rem;
  color: #555;
}

/* Tarjetas clickeables */
.card.clickable {
  cursor: pointer;
}

.card.clickable:hover {
  background-color: #eef1f5;
  transform: translateY(-2px);
}

/* Tarjetas deshabilitadas */
.card.disabled {
  opacity: 0.5;
  filter: grayscale(0.4);
  pointer-events: none;
}
</style>
