<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-white py-20 border-b-2 border-gray-200">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Nuestro Equipo Docente
          </h1>
          <p class="text-xl text-gray-600 leading-relaxed">
            Profesionales altamente calificados con amplia experiencia en agronomía y educación,
            comprometidos con la excelencia académica de la Universidad de El Salvador.
          </p>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- Grid de Profesores -->
      <div class="space-y-8">
        <ProfessorCard v-for="(professor, index) in filteredProfessors" :key="professor.id" :professor="professor"
          :reversed="index % 2 !== 0" @click="openProfessorDetail(professor)" />
      </div>

      <!-- Mensaje si no hay resultados -->
      <div v-if="filteredProfessors.length === 0" class="text-center py-12">
        <i class="pi pi-search text-6xl text-gray-300 mb-4"></i>
        <p class="text-xl text-gray-500">No se encontraron profesores con esos criterios</p>
      </div>
    </div>

    <!-- Modal Detalle Profesor -->
    <ProfessorDetailModal v-if="showDetail && selectedProfessor" :professor="selectedProfessor"
      @close="showDetail = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProfessorCard from '@/components/public/agronomy/ProfessorCard.vue'
import ProfessorDetailModal from '@/components/public/agronomy/ProfessorDetailModal.vue'

const selectedSpecialty = ref(null)
const showDetail = ref(false)
const selectedProfessor = ref(null)

const specialties = [
  'Producción de Cultivos',
  'Educación y Desarrollo Rural',
  'Economía y Finanzas Agrícolas'
]

const professors = ref([
  {
    id: 1,
    name: 'Marco Vinicio Calderón Castellanos',
    title: 'Ingeniero Agrónomo',
    specialty: 'Fitotecnista - Producción de Plantas Cultivadas',
    role: 'Jefe del Departamento de Ciencias Agronómicas',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop',
    email: 'marco.calderon@ues.edu.sv',
    phone: '+503 2511-2000',
    experience: 30,
    yearGraduation: 2000,
    institution: 'Universidad de El Salvador',
    startYear: 1995,
    fullBio: 'Ingeniero Agrónomo graduado en el año 2000 de la Universidad de El Salvador. Con más de 30 años de experiencia como docente universitario desde mayo de 1995. Ha trabajado en diversos proyectos en Chalatenango y en el Instituto Cultural Oxford. Su especialización es en fitotecnia, enfocándose en la producción de plantas cultivadas, con particular interés en la producción de hortalizas debido a su ciclo corto y resultados a corto plazo.',
    education: [
      { degree: 'Ingeniero Agrónomo Fitotecnista', institution: 'Universidad de El Salvador', year: 2000 }
    ],
    researchAreas: ['Producción de Hortalizas', 'Mejoramiento de Plantas', 'Cultivos Extensivos', 'Entomología Agrícola', 'Sistemas Agroforestales'],
    courses: [
      'Mejoramiento de Plantas',
      'Cultivos Extensivos',
      'Entomología Agrícola',
      'Sistemas Agroforestales'
    ]
  },
  {
    id: 2,
    name: 'Nery Saúl Guevara',
    title: 'Doctor en Educación',
    specialty: 'Comunicación y Gestión del Desarrollo Local',
    role: 'Docente de Agronomía',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop',
    email: 'nery.guevara@ues.edu.sv',
    phone: '+503 2511-2001',
    experience: 41,
    yearGraduation: 1984,
    institution: 'Universidad de El Salvador',
    doctorado: 2025,
    fullBio: 'Doctor en Educación (2025) e Ingeniero Agrónomo (1984) graduado de la Universidad de El Salvador. Con más de 40 años de experiencia, su trabajo se centra en el campo de la comunicación y gestión del desarrollo local, donde contribuye a definir el perfil del profesional agrónomo en el campo laboral. Su experiencia combina la formación técnica agronómica con la educación y el desarrollo social rural.',
    education: [
      { degree: 'Doctor en Educación', institution: 'Universidad de El Salvador', year: 2025 },
      { degree: 'Ingeniero Agrónomo', institution: 'Universidad de El Salvador', year: 1984 }
    ],
    researchAreas: ['Comunicación para el Desarrollo', 'Gestión del Desarrollo Local', 'Sociología Rural', 'Metodología de Investigación Social'],
    courses: [
      'Métodos y Técnicas de Investigación Social',
      'Sociología Rural',
      'Agroclimatología',
      'Comunicación y Gestión del Desarrollo Local'
    ]
  },
  {
    id: 3,
    name: 'Jaime Cristóbal Río Molina',
    title: 'Ingeniero Agrónomo',
    specialty: 'Economía Agrícola y Finanzas',
    role: 'Docente Tiempo Completo',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    email: 'jaime.rio@ues.edu.sv',
    phone: '+503 2511-2002',
    experience: 18,
    yearGraduation: 2007,
    institution: 'Universidad de El Salvador - Facultad Multidisciplinaria Oriental',
    startYear: 2010,
    fullBio: 'Ingeniero Agrónomo graduado en 2007 de la Facultad Multidisciplinaria Oriental de la Universidad de El Salvador. Cuenta con experiencia profesional como Jefe de Crédito en Banco Momento Agropecuario, Agencia La Unión por 3 años. Desde 2010 se desempeña como docente tiempo completo, especializándose en las áreas de economía, finanzas y administración agropecuaria.',
    education: [
      { degree: 'Ingeniero Agrónomo', institution: 'Universidad de El Salvador - Facultad Multidisciplinaria Oriental', year: 2007 }
    ],
    researchAreas: ['Economía Agrícola', 'Finanzas Agropecuarias', 'Administración de Empresas Agropecuarias', 'Agronegocios'],
    courses: [
      'Administración Agropecuaria',
      'Formulación y Evaluación de Proyectos',
      'Agronegocios',
      'Economía Agrícola'
    ]
  }
])

const filteredProfessors = computed(() => {
  if (!selectedSpecialty.value) {
    return professors.value
  }
  return professors.value.filter(p =>
    p.specialty.toLowerCase().includes(selectedSpecialty.value.toLowerCase())
  )
})

const openProfessorDetail = (professor) => {
  selectedProfessor.value = professor
  showDetail.value = true
}
</script>ProfessorDetailModal.vue