<template>
  <div class="professors-container bg-surface-50 py-12 px-4 sm:px-6 lg:px-8">
    <!-- Encabezado -->
    <div class="max-w-7xl mx-auto mb-12 text-center">
      <h1 class="text-4xl font-bold text-primary-600 mb-4">
        Nuestro Equipo Académico
      </h1>
      <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
        Profesionales destacados comprometidos con la excelencia académica y el desarrollo agrícola sostenible
      </p>
    </div>

    <!-- Lista de Profesores -->
    <div class="max-w-7xl mx-auto space-y-16">
      <div
        v-for="(professor, index) in professors"
        :key="professor.id"
        class="professor-card"
      >
        <!-- Card con distribución alternada -->
        <div
          class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col"
          :class="index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'"
        >
          <!-- Imagen -->
          <div class="lg:w-1/3 relative">
            <div class="aspect-square lg:aspect-auto lg:h-full relative overflow-hidden">
              <img
                :src="professor.image"
                :alt="professor.name"
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>

          <!-- Contenido -->
          <div class="lg:w-2/3 p-8 lg:p-12 flex flex-col justify-center">
            <!-- 1. Nombre -->
            <div class="mb-4">
              <h2 class="text-3xl font-bold text-neutral-900">
                {{ professor.name }}
              </h2>
            </div>

            <!-- 2. Título -->
            <div class="mb-5">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
                <h3 class="text-sm font-semibold text-neutral-700 uppercase tracking-wide">
                  Título
                </h3>
              </div>
              <p class="text-lg text-primary-600 font-medium">
                {{ professor.title }}
              </p>
            </div>

            <!-- 3. Experiencia -->
            <div class="mb-5">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-5 h-5 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                </svg>
                <h3 class="text-sm font-semibold text-neutral-700 uppercase tracking-wide">
                  Experiencia
                </h3>
              </div>
              <p class="text-neutral-600 leading-relaxed">
                {{ professor.experience }}
              </p>
            </div>

            <!-- 4. Campo de Especialización -->
            <div class="mb-5">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
                </svg>
                <h3 class="text-sm font-semibold text-neutral-700 uppercase tracking-wide">
                  Campo de Especialización
                </h3>
              </div>
              <p class="text-neutral-800 font-medium">
                {{ professor.specialization }}
              </p>
            </div>

            <!-- 5. Rol en el Departamento -->
            <div class="mb-4">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-5 h-5 text-tertiary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                </svg>
                <h3 class="text-sm font-semibold text-neutral-700 uppercase tracking-wide">
                  Rol en el Departamento
                </h3>
              </div>
              <p class="text-tertiary-600 font-semibold">
                {{ professor.role }}
              </p>
            </div>

            <!-- Decoración visual -->
            <div class="flex items-center gap-3 pt-4 border-t border-neutral-200">
              <div class="w-12 h-1 bg-primary-500 rounded-full"></div>
              <div class="w-8 h-1 bg-accent-500 rounded-full"></div>
              <div class="w-4 h-1 bg-tertiary-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const professors = ref([
  {
    id: 1,
    name: 'Dr. Carlos Méndez Rivera',
    title: 'Doctor en Ciencias Agrícolas',
    experience: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    specialization: 'Agricultura Sostenible y Manejo de Suelos',
    role: 'Director del Departamento',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop'
  },
  {
    id: 2,
    name: 'Dra. María Elena Castillo',
    title: 'Doctora en Fitotecnia',
    experience: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    specialization: 'Mejoramiento Genético y Biotecnología Vegetal',
    role: 'Coordinadora de Investigación',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop'
  },
  {
    id: 3,
    name: 'Ing. Roberto Sandoval',
    title: 'Máster en Protección Vegetal',
    experience: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    specialization: 'Control Biológico de Plagas y Enfermedades',
    role: 'Jefe de Laboratorio',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop'
  },
  {
    id: 4,
    name: 'Dra. Ana Lucía Hernández',
    title: 'Doctora en Economía Agrícola',
    experience: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
    specialization: 'Desarrollo Rural y Economía de Recursos Naturales',
    role: 'Coordinadora de Extensión',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=800&fit=crop'
  },
  {
    id: 5,
    name: 'Ing. Miguel Ángel Torres',
    title: 'Máster en Sistemas de Riego',
    experience: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa.',
    specialization: 'Ingeniería de Riego y Recursos Hídricos',
    role: 'Especialista en Hidráulica Agrícola',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop'
  }
]);
</script>

<style scoped>
/* Estilos adicionales usando las variables CSS personalizadas */
.professors-container {
  min-height: 100vh;
}

.professor-card {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive para tablet y desktop */
@media (min-width: 1024px) {
  .professor-card > div {
    display: flex !important;
    min-height: 400px;
  }
}

/* Mejora de accesibilidad */
.professor-card:focus-within {
  outline: 3px solid var(--primary-color);
  outline-offset: 4px;
  border-radius: 12px;
}

/* Transición suave para hover */
.professor-card img {
  transition: transform var(--transition-slow);
}
</style>