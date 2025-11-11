<template>
  <div
    :class="[
      'bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col cursor-pointer',
      reversed ? 'md:flex-row-reverse' : 'md:flex-row'
    ]"
    @click="$emit('click', professor)"
  >
    <!-- Foto -->
    <div class="md:w-2/5 relative overflow-hidden bg-gray-200 h-64 md:h-auto">
      <img
        :src="professor.photo"
        :alt="professor.name"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Card Content -->
    <div class="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
      <!-- Nombre -->
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
        {{ professor.name }}
      </h2>

      <!-- Título -->
      <div class="mb-4">
        <div class="flex items-center gap-2 text-orange-500 mb-1">
          <i class="pi pi-graduation-cap text-base"></i>
          <span class="text-xs font-bold uppercase tracking-wider">TÍTULO</span>
        </div>
        <p class="text-lg font-semibold text-orange-500">
          {{ professor.title }}
        </p>
      </div>

      <!-- Experiencia -->
      <div class="mb-4">
        <div class="flex items-center gap-2 text-gray-700 mb-1">
          <i class="pi pi-briefcase text-base"></i>
          <span class="text-xs font-bold uppercase tracking-wider">EXPERIENCIA</span>
        </div>
        <p class="text-gray-800 leading-snug">
          {{ professor.experience }} años de experiencia en docencia e investigación. {{ professor.institution }}.
        </p>
      </div>

      <!-- Campo de Especialización -->
      <div class="mb-4">
        <div class="flex items-center gap-2 text-orange-500 mb-1">
          <i class="pi pi-bookmark text-base"></i>
          <span class="text-xs font-bold uppercase tracking-wider">CAMPO DE ESPECIALIZACIÓN</span>
        </div>
        <p class="text-gray-900 font-semibold">{{ professor.specialty }}</p>
      </div>

      <!-- Rol en el Departamento -->
      <div class="mb-5">
        <div class="flex items-center gap-2 text-gray-700 mb-1">
          <i class="pi pi-users text-base"></i>
          <span class="text-xs font-bold uppercase tracking-wider">ROL EN EL DEPARTAMENTO</span>
        </div>
        <p class="text-gray-900 font-semibold">{{ professor.role }}</p>
      </div>

      <!-- Indicadores de progreso -->
      <div class="flex gap-2 mb-4">
        <div class="progress-bar bg-orange-500"></div>
        <div class="progress-bar bg-yellow-400"></div>
        <div class="progress-bar-small bg-gray-900"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  professor: {
    type: Object,
    required: true
  },
  reversed: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
.progress-bar {
  width: 72px;
  height: 4px;
  border-radius: 2px;
}

.progress-bar-small {
  width: 40px;
  height: 4px;
  border-radius: 2px;
}
</style>