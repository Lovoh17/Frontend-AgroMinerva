<template>
  <Dialog
    :visible="visible" 
    :modal="true"
    :closable="false"
    :draggable="false"
    :style="{ width: '380px' }"
    @hide="cerrarModal"
    class="modal-confirmar"
  >
    <div class="flex flex-col items-center px-6 py-8">
      <!-- ICONO DE CHECK -->
      <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-bounce-in">
        <div class="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
          <i class="pi pi-check text-green-500 text-4xl font-bold"></i>
        </div>
      </div>

      <h2 class="text-xl font-bold text-gray-900 mb-3 text-center">
        {{ titulo }}
      </h2>

      <p class="text-gray-500 text-sm text-center leading-relaxed mb-8">
        {{ mensaje }}
      </p>

      <div class="flex gap-3 w-full">
        <button
          @click="cerrarModal"
          class="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 font-medium text-sm rounded-md hover:bg-gray-300 transition-all duration-200"
        >
          {{ textoCancelar }}
        </button>
        <button
          @click="alConfirmar"
          class="flex-1 px-4 py-2.5 bg-green-500 text-white font-medium text-sm rounded-md hover:bg-green-600 transition-all duration-200 shadow-lg"
        >
          {{ textoConfirmar }}
        </button>
      </div>
    </div>
  </Dialog>
</template>

<script setup>

// IMPORTA FUNCIONES PARA RECIBIR DATOS Y EMITIR DATOS AL COMPONENTE PADRE
import { defineProps, defineEmits } from 'vue';

// IMPORTA EL COMPONENTE DE DIÁLOGO DE PRIMEVUE PARA MODALES
import Dialog from 'primevue/dialog';

// DEFINE LAS PROPIEDADES QUE RECIBE EL COMPONENTE
const props = defineProps({
  visible: Boolean,
  titulo: { type: String, default: '¿Estás seguro?' },
  mensaje: { 
    type: String, 
    default: '¿Deseas continuar con esta acción? Los cambios se guardarán permanentemente.' 
  },
  textoConfirmar: { type: String, default: 'Confirmar' },
  textoCancelar: { type: String, default: 'Cancelar' },
});

// DEFINE LOS EVENTOS QUE EMITE EL COMPONENTE
const emits = defineEmits(['update:visible', 'confirmar']);

// FUNCION PARA CERRAR EL MODAL
const cerrarModal = () => {
  emits('update:visible', false);
};

// FUNCION PARA CONFIRMAR LA ACCIÓN
const alConfirmar = () => {
  emits('confirmar');
  cerrarModal();
};
</script>

<style scoped>
.modal-confirmar :deep(.p-dialog) {
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal-confirmar :deep(.p-dialog-header) {
  display: none;
}

.modal-confirmar :deep(.p-dialog-content) {
  padding: 0;
  border-radius: 12px;
}

/**ANIMACION */
@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-bounce-in {
  animation: bounce-in 0.5s ease-out;
}
</style>