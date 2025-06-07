<script setup>
import { useTeamStore } from '@/stores/teamStore'

const store = useTeamStore()
defineEmits(['edit'])
</script>

<template>
  <div class="tabla-contenedor">
    <table class="tabla">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cargo</th>
          <th>Correo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in store.teamList" :key="m.tarjeta_id">
          <td>{{ m.nombre }}</td>
          <td>{{ m.cargo }}</td>
          <td>{{ m.correo }}</td>
          <td>
            <button class="btn edit" @click="$emit('edit', m)">Editar</button>
            <button class="btn delete" @click="store.delete(m.tarjeta_id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.tabla-contenedor {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #fefefe;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
  overflow-x: auto;
}

.tabla {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #2c3e50;
  color: white;
  padding: 0.75rem;
  text-align: left;
}

td {
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
  font-size: 0.95rem;
}

tr:hover {
  background-color: #f5f5f5;
}

.btn {
  width: 100%;
  padding: 0.4rem 0.8rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  transition: background 0.3s ease;
}

.btn.edit {
  background-color: #2980b9;
}

.btn.edit:hover {
  background-color: #21618c;
}

.btn.delete {
  background-color: #c0392b;
}

.btn.delete:hover {
  background-color: #992d22;
}
</style>
