<template>
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto" 
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b border-gray-200 p-6 md:p-8 flex items-start justify-between z-10">
        <div class="flex items-start gap-4 flex-1">
          <img
            :src="professor.photo"
            :alt="professor.name"
            class="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover flex-shrink-0"
          />
          <div class="flex-1 min-w-0">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{{ professor.name }}</h3>
            <p class="text-orange-500 font-semibold text-base md:text-lg">{{ professor.title }}</p>
          </div>
        </div>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none ml-4 flex-shrink-0"
        >
          ×
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 md:p-8 space-y-8">
        <!-- Contacto e Información Básica -->
        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-gray-50 p-5 border border-gray-200 rounded-lg">
            <div class="flex items-center gap-2 text-gray-700 mb-3">
              <i class="pi pi-bookmark text-orange-500"></i>
              <span class="text-xs font-bold uppercase tracking-wider">ESPECIALIDAD</span>
            </div>
            <p class="text-sm font-semibold text-gray-900 leading-snug">{{ professor.specialty }}</p>
          </div>
          <div class="bg-gray-50 p-5 border border-gray-200 rounded-lg">
            <div class="flex items-center gap-2 text-gray-700 mb-3">
              <i class="pi pi-envelope text-orange-500"></i>
              <span class="text-xs font-bold uppercase tracking-wider">EMAIL</span>
            </div>
            <p class="text-sm text-gray-900 break-words">{{ professor.email }}</p>
          </div>
          <div class="bg-gray-50 p-5 border border-gray-200 rounded-lg">
            <div class="flex items-center gap-2 text-gray-700 mb-3">
              <i class="pi pi-phone text-orange-500"></i>
              <span class="text-xs font-bold uppercase tracking-wider">TELÉFONO</span>
            </div>
            <p class="text-sm text-gray-900">{{ professor.phone }}</p>
          </div>
        </div>

        <!-- Biografía -->
        <div class="border border-gray-200 p-6 bg-white rounded-lg">
          <div class="flex items-center gap-2 text-orange-500 mb-4">
            <i class="pi pi-user text-lg"></i>
            <h4 class="text-xs font-bold uppercase tracking-wider">BIOGRAFÍA</h4>
          </div>
          <p class="text-gray-800 leading-relaxed">{{ professor.fullBio }}</p>
        </div>

        <!-- Formación Académica -->
        <div class="border border-gray-200 p-6 bg-white rounded-lg">
          <div class="flex items-center gap-2 text-orange-500 mb-5">
            <i class="pi pi-graduation-cap text-lg"></i>
            <h4 class="text-xs font-bold uppercase tracking-wider">FORMACIÓN ACADÉMICA</h4>
          </div>
          <ul class="space-y-5">
            <li v-for="(edu, index) in professor.education" :key="index" class="flex items-start gap-4">
              <div class="w-3 h-3 bg-orange-500 mt-1.5 flex-shrink-0 rounded-sm"></div>
              <div>
                <p class="font-bold text-gray-900 text-lg mb-1">{{ edu.degree }}</p>
                <p class="text-sm text-gray-600">{{ edu.institution }} • {{ edu.year }}</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Áreas de Investigación -->
        <div class="border border-gray-200 p-6 bg-white rounded-lg">
          <div class="flex items-center gap-2 text-orange-500 mb-5">
            <i class="pi pi-bookmark text-lg"></i>
            <h4 class="text-xs font-bold uppercase tracking-wider">ÁREAS DE INVESTIGACIÓN</h4>
          </div>
          <div class="flex flex-wrap gap-3">
            <span
              v-for="area in professor.researchAreas"
              :key="area"
              class="px-4 py-2 bg-orange-50 text-orange-700 border border-orange-200 text-sm font-semibold rounded"
            >
              {{ area }}
            </span>
          </div>
        </div>

        <!-- Materias que imparte -->
        <div class="border border-gray-200 p-6 bg-white rounded-lg">
          <div class="flex items-center gap-2 text-orange-500 mb-5">
            <i class="pi pi-book text-lg"></i>
            <h4 class="text-xs font-bold uppercase tracking-wider">MATERIAS QUE IMPARTE</h4>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div
              v-for="course in professor.courses"
              :key="course"
              class="px-4 py-3 bg-gray-50 border border-gray-200 rounded font-semibold text-gray-800"
            >
              {{ course }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  professor: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])
</script>