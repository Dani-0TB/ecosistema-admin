<script setup>
import { ref, onMounted, computed } from 'vue';
import { useWidgetStore } from '@/stores/widgetStore';

const widgetStore = useWidgetStore();
const nueva = ref({ descripcion_cifra: '', cifra: null });

onMounted(() => {
  widgetStore.fetchWidget();
});

const widget = computed(() => widgetStore.widget);
const cifras = computed(() => widgetStore.cifras);

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    widget.value.widget_img = file;
  }
};

const guardarWidget = () => {
  if (!widget.value) return;
  widgetStore.saveWidget({
    titulo: widget.value.titulo,
    widget_img: widget.value.widget_img
  });
};

const guardarCifra = (cifra) => {
  widgetStore.saveCifra({
    cifra_id: cifra.cifra_id,
    descripcion_cifra: cifra.descripcion_cifra,
    cifra: cifra.cifra
  });
};

const eliminarCifra = (id) => {
  widgetStore.removeCifra(id);
};

const agregarCifra = () => {
  if (!nueva.value.descripcion_cifra || nueva.value.cifra == null) return;
  widgetStore.addNewCifra({ ...nueva.value });
  nueva.value = { descripcion_cifra: '', cifra: null };
};
</script>

<template>
  <div class="editor">
    <div v-if="!widget">
      <p>Cargando widget...</p>
    </div>

    <template v-else>
      <!-- Formulario del widget -->
      <form @submit.prevent="guardarWidget" class="form-section">
        <h2>Datos del Widget</h2>
        <div class="form-group">
          <label for="titulo">Título</label>
          <input id="titulo" v-model="widget.titulo" type="text" required />
        </div>
        <div class="form-group">
          <label for="imagen">Imagen</label>
          <input id="imagen" type="file" @change="handleFileUpload" />
        </div>
        <button type="submit">Guardar Widget</button>
      </form>

      <!-- Lista de cifras -->
      <div class="form-section" v-if="cifras">
        <h2>Cifras</h2>
        <div v-for="cifra in cifras" :key="cifra.cifra_id" class="cifra-box">
          <div class="form-group">
            <label>Descripción</label>
            <input v-model="cifra.descripcion_cifra" type="text" />
          </div>
          <div class="form-group">
            <label>Cifra</label>
            <input v-model="cifra.cifra" type="number" />
          </div>
          <div class="buttons">
            <button type="button" @click="guardarCifra(cifra)">Guardar</button>
            <button type="button" @click="eliminarCifra(cifra.cifra_id)">Eliminar</button>
          </div>
        </div>
      </div>

      <!-- Agregar nueva cifra -->
      <div class="form-section">
        <h3>Nueva Cifra</h3>
        <div class="form-group">
          <label>Descripción</label>
          <input v-model="nueva.descripcion_cifra" type="text" />
        </div>
        <div class="form-group">
          <label>Cifra</label>
          <input v-model="nueva.cifra" type="number" />
        </div>
        <button type="button" @click="agregarCifra">Agregar</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.editor {
  padding: 16px;
  max-width: 700px;
  margin: auto;
}

.form-section {
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 12px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
}

.cifra-box {
  margin-bottom: 16px;
  padding: 12px;
  border: 1px dashed #999;
  border-radius: 4px;
}

.buttons {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

button {
  padding: 6px 12px;
  cursor: pointer;
}
</style>
