<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useTeamStore } from '@/stores/teamStore'
import TeamMemberList from '@/components/team/TeamMemberList.vue'
import TeamMemberForm from '@/components/team/TeamMemberForm.vue'

const store = useTeamStore()
const showForm = ref(false)
const isEditing = ref(false)
const formRef = ref(null)

onMounted(() => {
  store.loadAll()
})

const openCreateForm = () => {
  store.clearSelected()
  isEditing.value = false
  showForm.value = true
  scrollToForm()
}

const openEditForm = (member) => {
  store.selectedCard = { ...member }
  isEditing.value = true
  showForm.value = true
  scrollToForm()
}

const scrollToForm = async () => {
  await nextTick()
  if (formRef.value) {
    formRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div class="container">
    <h1 class="title">Miembros del Equipo</h1>

    <div v-if="store.loading">Cargando miembros...</div>
    <div v-else-if="store.error" class="error">{{ store.error }}</div>
    <div v-else>
      <TeamMemberList @edit="openEditForm" />
    </div>

    <button class="add-button" @click="openCreateForm">+ Agregar miembro</button>

    <div ref="formRef">
      <TeamMemberForm v-if="showForm" :is-editing="isEditing" @close="showForm = false" />
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.add-button {
  margin-top: 2rem;
  padding: 0.6rem 1rem;
  background-color: #2c3e50;
  color: white;
  font-size: 0.95rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #1a252f;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
