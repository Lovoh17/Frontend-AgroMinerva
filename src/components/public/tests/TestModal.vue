<template>
  <section class="py-14 px-4 md:px-10 lg:px-16 bg-white min-h-screen">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Prueba de Modales</h1>
      <p class="text-gray-600 mb-8">Prueba los modales de confirmacion y eliminacion.</p>
      
      <div class="grid md:grid-cols-2 gap-6">
        <!-- CARR DE TEST PARA PROBAR EL MODAL DE ELIMINACION-->
        <div class="p-6 bg-red-50 rounded-xl border-2 border-red-200 shadow-sm">
          <div class="flex items-center gap-3 mb-4">
            <i class="pi pi-times-circle text-3xl text-red-500"></i>
            <h3 class="text-xl font-bold text-red-800">Modal de Eliminación</h3>
          </div>
          <p class="text-red-600 mb-6 text-sm">
            Para acciones destructivas como eliminar registros.
          </p>
          <Button 
            label="Abrir DeleteModal" 
            icon="pi pi-trash" 
            @click="showDeleteModal = true"
            severity="danger"
            class="w-full"
          />
        </div>

        <!-- CARD DE TEST PARA PRIBAR EL MODAL DE CONFIRMACION-->
        <div class="p-6 bg-green-50 rounded-xl border-2 border-green-200 shadow-sm">
          <div class="flex items-center gap-3 mb-4">
            <i class="pi pi-check-circle text-3xl text-green-500"></i>
            <h3 class="text-xl font-bold text-green-800">Modal de Confirmación</h3>
          </div>
          <p class="text-green-600 mb-6 text-sm">
            Para acciones positivas como guardar o aprobar.
          </p>
          <Button 
            label="Abrir ConfirmModal" 
            icon="pi pi-check" 
            @click="showConfirmModal = true"
            severity="success"
            class="w-full"
          />
        </div>
      </div>

      <!-- ELIMINAR -->
      <DeleteModal 
        :visible="showDeleteModal"
        @update:visible="showDeleteModal = $event"
        @confirm="handleDelete"
      />

      <!--CONFIRMA -->
      <ConfirmModal 
        :visible="showConfirmModal"
        @update:visible="showConfirmModal = $event"
        @confirm="handleConfirm"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import DeleteModal from '@/components/common/DeleteModal.vue';
import ConfirmModal from '@/components/common/ConfirmModal.vue';

const showDeleteModal = ref(false);
const showConfirmModal = ref(false);

const handleDelete = () => {
  console.log('Test Modal: de eliminar');
};

const handleConfirm = () => {
  console.log('Test Modal: de confirmar');
};
</script>