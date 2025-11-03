<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="bg-tertiary-600 text-white py-20 border-b-4 border-accent-500">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Nuestro Equipo Docente
          </h1>
          <p class="text-xl text-primary-100 leading-relaxed">
            Profesionales altamente calificados con amplia experiencia en agronomía y educación, 
            comprometidos con la excelencia académica y el desarrollo de futuros ingenieros agrónomos.
          </p>
        </div>
      </div>
    </div>

    <!-- Estadísticas -->
    <div class="container mx-auto px-4 -mt-12">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div class="bg-white border-4 border-accent-500 p-6 text-center">
          <p class="text-4xl font-bold text-accent-600 mb-2">{{ professors.length }}</p>
          <p class="text-sm font-semibold text-gray-600">Profesores</p>
        </div>
        <div class="bg-white border-4 border-tertiary-500 p-6 text-center">
          <p class="text-4xl font-bold text-tertiary-600 mb-2">95%</p>
          <p class="text-sm font-semibold text-gray-600">Con Posgrado</p>
        </div>
        <div class="bg-white border-4 border-accent-500 p-6 text-center">
          <p class="text-4xl font-bold text-accent-600 mb-2">20+</p>
          <p class="text-sm font-semibold text-gray-600">Años Experiencia</p>
        </div>
        <div class="bg-white border-4 border-tertiary-500 p-6 text-center">
          <p class="text-4xl font-bold text-tertiary-600 mb-2">50+</p>
          <p class="text-sm font-semibold text-gray-600">Publicaciones</p>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="container mx-auto px-4 mb-8">
      <div class="bg-gray-50 border-2 border-gray-200 p-6">
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <p class="text-sm font-semibold text-gray-600 mb-2">Filtrar por especialidad:</p>
            <div class="flex flex-wrap gap-3">
              <Button 
                label="Todos"
                :severity="selectedSpecialty === null ? 'success' : 'secondary'"
                :outlined="selectedSpecialty !== null"
                @click="selectedSpecialty = null"
                class="filter-button"
              />
              <Button 
                v-for="specialty in specialties" 
                :key="specialty"
                :label="specialty"
                :severity="selectedSpecialty === specialty ? 'success' : 'secondary'"
                :outlined="selectedSpecialty !== specialty"
                @click="selectedSpecialty = specialty"
                class="filter-button"
              />
            </div>
          </div>
          <div class="flex items-center gap-3 w-full md:w-auto border-2 border-gray-300 bg-white px-4 py-2">
            <span class="pi pi-search text-gray-400"></span>
            <input 
              v-model="searchQuery" 
              placeholder="Buscar profesor..."
              class="w-full md:w-64 outline-none"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Grid de Profesores -->
    <div class="container mx-auto px-4 pb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="professor in filteredProfessors" 
          :key="professor.id"
          class="bg-white border-2 border-gray-200 hover:border-accent-500 transition-all duration-300 overflow-hidden group cursor-pointer"
          @click="openProfessorDetail(professor)"
        >
          <!-- Foto -->
          <div class="relative overflow-hidden bg-gray-200 h-80">
            <img 
              :src="professor.photo" 
              :alt="professor.name"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-tertiary-600 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
              <div class="text-center text-white p-6">
                <i class="pi pi-user text-4xl mb-4"></i>
                <p class="font-bold text-lg">Ver Perfil Completo</p>
              </div>
            </div>
          </div>

          <!-- Información -->
          <div class="p-6">
            <!-- Nombre y Título -->
            <h3 class="text-xl font-bold text-gray-800 mb-2">
              {{ professor.name }}
            </h3>
            <p class="text-sm font-semibold text-accent-600 mb-4">
              {{ professor.title }}
            </p>

            <!-- Especialidad -->
            <div class="mb-4">
              <span class="px-3 py-1 bg-tertiary-100 text-tertiary-700 text-xs font-semibold border border-tertiary-300">
                {{ professor.specialty }}
              </span>
            </div>

            <!-- Bio corta -->
            <p class="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {{ professor.bio }}
            </p>

            <!-- Experiencia y Contacto -->
            <div class="pt-4 border-t-2 border-gray-200 space-y-2">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <i class="pi pi-briefcase text-accent-600"></i>
                <span><strong>{{ professor.experience }}</strong> años de experiencia</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <i class="pi pi-book text-accent-600"></i>
                <span><strong>{{ professor.publications }}</strong> publicaciones</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <i class="pi pi-envelope text-accent-600"></i>
                <span class="truncate">{{ professor.email }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensaje si no hay resultados -->
      <div v-if="filteredProfessors.length === 0" class="text-center py-12">
        <i class="pi pi-search text-6xl text-gray-300 mb-4"></i>
        <p class="text-xl text-gray-500">No se encontraron profesores con esos criterios</p>
      </div>
    </div>

    <!-- Modal Detalle Profesor -->
    <Dialog v-model:visible="showDetail" modal :style="{ width: '60rem' }" :breakpoints="{ '960px': '85vw', '640px': '95vw' }">
      <template #header>
        <div class="flex items-center gap-4">
          <img 
            :src="selectedProfessor?.photo" 
            :alt="selectedProfessor?.name"
            class="w-20 h-20 object-cover border-4 border-accent-500"
          />
          <div>
            <h3 class="text-2xl font-bold text-gray-800">{{ selectedProfessor?.name }}</h3>
            <p class="text-accent-600 font-semibold">{{ selectedProfessor?.title }}</p>
          </div>
        </div>
      </template>

      <div v-if="selectedProfessor" class="space-y-6">
        <!-- Especialidad y Contacto -->
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-gray-50 p-4 border-2 border-gray-200">
            <p class="text-sm font-semibold text-gray-600 mb-2">Especialidad</p>
            <p class="text-lg font-bold text-gray-800">{{ selectedProfessor.specialty }}</p>
          </div>
          <div class="bg-gray-50 p-4 border-2 border-gray-200">
            <p class="text-sm font-semibold text-gray-600 mb-2">Contacto</p>
            <p class="text-sm text-gray-800">{{ selectedProfessor.email }}</p>
            <p class="text-sm text-gray-600">{{ selectedProfessor.phone }}</p>
          </div>
        </div>

        <!-- Biografía -->
        <div class="border-2 border-gray-200 p-6">
          <h4 class="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
            <i class="pi pi-user text-accent-600"></i>
            Biografía
          </h4>
          <p class="text-gray-700 leading-relaxed">{{ selectedProfessor.fullBio }}</p>
        </div>

        <!-- Formación Académica -->
        <div class="border-2 border-gray-200 p-6">
          <h4 class="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <i class="pi pi-graduation-cap text-accent-600"></i>
            Formación Académica
          </h4>
          <ul class="space-y-3">
            <li v-for="(edu, index) in selectedProfessor.education" :key="index" class="flex items-start gap-3">
              <div class="w-2 h-2 bg-accent-500 mt-2"></div>
              <div>
                <p class="font-semibold text-gray-800">{{ edu.degree }}</p>
                <p class="text-sm text-gray-600">{{ edu.institution }} - {{ edu.year }}</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Áreas de Investigación -->
        <div class="border-2 border-gray-200 p-6">
          <h4 class="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <i class="pi pi-microscope text-accent-600"></i>
            Áreas de Investigación
          </h4>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="area in selectedProfessor.researchAreas" 
              :key="area"
              class="px-4 py-2 bg-accent-100 text-accent-700 border border-accent-300 font-medium"
            >
              {{ area }}
            </span>
          </div>
        </div>

        <!-- Materias que imparte -->
        <div class="border-2 border-gray-200 p-6">
          <h4 class="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <i class="pi pi-book text-accent-600"></i>
            Materias que Imparte
          </h4>
          <div class="grid md:grid-cols-2 gap-2">
            <div 
              v-for="course in selectedProfessor.courses" 
              :key="course"
              class="px-4 py-3 bg-gray-50 border-2 border-gray-200 font-medium text-gray-700"
            >
              {{ course }}
            </div>
          </div>
        </div>

        <!-- Reconocimientos -->
        <div v-if="selectedProfessor.awards && selectedProfessor.awards.length > 0" class="border-2 border-gray-200 p-6">
          <h4 class="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <i class="pi pi-trophy text-accent-600"></i>
            Reconocimientos y Premios
          </h4>
          <ul class="space-y-2">
            <li v-for="award in selectedProfessor.awards" :key="award" class="flex items-start gap-3">
              <i class="pi pi-check-circle text-accent-600 mt-1"></i>
              <p class="text-gray-700">{{ award }}</p>
            </li>
          </ul>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

// Estado
const selectedSpecialty = ref(null)
const searchQuery = ref('')
const showDetail = ref(false)
const selectedProfessor = ref(null)

// Especialidades
const specialties = [
  'Cultivos',
  'Suelos',
  'Fitopatología',
  'Zootecnia',
  'Riego',
  'Biotecnología',
  'Economía Agrícola'
]

// Profesores
const professors = ref([
  {
    id: 1,
    name: 'Dr. Carlos Alberto Méndez',
    title: 'Doctor en Ciencias Agrícolas',
    specialty: 'Cultivos',
    photo: 'https://i.pravatar.cc/400?img=12',
    email: 'carlos.mendez@agrominerva.edu',
    phone: '+503 2345-6789',
    experience: 25,
    publications: 45,
    bio: 'Especialista en manejo de cultivos extensivos con enfoque en producción sostenible y agricultura de precisión.',
    fullBio: 'Doctor en Ciencias Agrícolas con más de 25 años de experiencia en docencia e investigación. Ha liderado múltiples proyectos de investigación en cultivos de granos básicos y ha publicado más de 45 artículos en revistas científicas internacionales. Su trabajo se centra en la optimización de sistemas de producción agrícola sostenible.',
    education: [
      { degree: 'Doctorado en Ciencias Agrícolas', institution: 'Universidad Nacional Autónoma', year: 2005 },
      { degree: 'Maestría en Producción Agrícola', institution: 'Universidad de Costa Rica', year: 1998 },
      { degree: 'Ingeniería Agronómica', institution: 'Universidad de El Salvador', year: 1994 }
    ],
    researchAreas: ['Agricultura de Precisión', 'Cultivos Extensivos', 'Sostenibilidad Agrícola', 'Manejo de Suelos'],
    courses: ['Cultivos Extensivos', 'Mejoramiento de Plantas', 'Fisiología Vegetal'],
    awards: ['Premio Nacional de Investigación Agrícola 2020', 'Mejor Docente del Año 2018']
  },
  {
    id: 2,
    name: 'Dra. María Elena Torres',
    title: 'Doctora en Fitopatología',
    specialty: 'Fitopatología',
    photo: 'https://i.pravatar.cc/400?img=5',
    email: 'maria.torres@agrominerva.edu',
    phone: '+503 2345-6790',
    experience: 18,
    publications: 38,
    bio: 'Experta en enfermedades de plantas y control biológico, con amplia experiencia en manejo integrado de plagas.',
    fullBio: 'Doctora en Fitopatología con especialización en control biológico de enfermedades. Ha desarrollado protocolos innovadores para el manejo de enfermedades en cultivos de alto valor comercial. Su investigación se enfoca en alternativas sostenibles al uso de agroquímicos.',
    education: [
      { degree: 'Doctorado en Fitopatología', institution: 'Universidad de California, Davis', year: 2008 },
      { degree: 'Maestría en Protección Vegetal', institution: 'Universidad Autónoma de México', year: 2003 },
      { degree: 'Ingeniería Agronómica', institution: 'Universidad de El Salvador', year: 1999 }
    ],
    researchAreas: ['Control Biológico', 'Enfermedades Fungosas', 'MIP', 'Agricultura Orgánica'],
    courses: ['Fitopatología', 'Manejo Integrado de Plagas', 'Microbiología Agrícola'],
    awards: ['Premio Internacional de Fitopatología 2019', 'Reconocimiento a la Excelencia Docente 2021']
  },
  {
    id: 3,
    name: 'Ing. Roberto José Campos',
    title: 'Máster en Ciencias del Suelo',
    specialty: 'Suelos',
    photo: 'https://i.pravatar.cc/400?img=8',
    email: 'roberto.campos@agrominerva.edu',
    phone: '+503 2345-6791',
    experience: 22,
    publications: 32,
    bio: 'Especialista en fertilidad de suelos y nutrición vegetal, enfocado en prácticas de conservación.',
    fullBio: 'Máster en Ciencias del Suelo con amplia experiencia en fertilidad y conservación. Ha implementado programas de manejo sostenible de suelos en diversas regiones agrícolas. Sus investigaciones se centran en la optimización del uso de fertilizantes y mejoramiento de la salud del suelo.',
    education: [
      { degree: 'Maestría en Ciencias del Suelo', institution: 'Universidad de Florida', year: 2006 },
      { degree: 'Ingeniería Agronómica', institution: 'Universidad de El Salvador', year: 2000 }
    ],
    researchAreas: ['Fertilidad de Suelos', 'Nutrición Vegetal', 'Conservación de Suelos', 'Química del Suelo'],
    courses: ['Edafología', 'Fertilidad de Suelos', 'Manejo de Suelos'],
    awards: ['Mejor Investigador en Ciencias del Suelo 2017']
  },
  {
    id: 4,
    name: 'Dra. Ana Patricia Rodríguez',
    title: 'Doctora en Zootecnia',
    specialty: 'Zootecnia',
    photo: 'https://i.pravatar.cc/400?img=9',
    email: 'ana.rodriguez@agrominerva.edu',
    phone: '+503 2345-6792',
    experience: 20,
    publications: 41,
    bio: 'Especialista en producción animal y nutrición, con énfasis en sistemas ganaderos sostenibles.',
    fullBio: 'Doctora en Zootecnia especializada en sistemas de producción animal sostenible. Ha liderado proyectos de mejoramiento genético y nutrición en ganado bovino y porcino. Su trabajo contribuye al desarrollo de sistemas ganaderos más eficientes y amigables con el medio ambiente.',
    education: [
      { degree: 'Doctorado en Zootecnia', institution: 'Universidad de São Paulo', year: 2009 },
      { degree: 'Maestría en Producción Animal', institution: 'Universidad de Costa Rica', year: 2004 },
      { degree: 'Ingeniería Agronómica', institution: 'Universidad de El Salvador', year: 2000 }
    ],
    researchAreas: ['Nutrición Animal', 'Mejoramiento Genético', 'Producción Sostenible', 'Sistemas Silvopastoriles'],
    courses: ['Nutrición Animal', 'Ganado Vacuno', 'Ganado Porcino', 'Avicultura'],
    awards: ['Premio Nacional de Zootecnia 2018', 'Reconocimiento a la Innovación Pecuaria 2020']
  },
  {
    id: 5,
    name: 'Ing. Luis Fernando Gómez',
    title: 'Máster en Ingeniería de Riego',
    specialty: 'Riego',
    photo: 'https://i.pravatar.cc/400?img=13',
    email: 'luis.gomez@agrominerva.edu',
    phone: '+503 2345-6793',
    experience: 16,
    publications: 28,
    bio: 'Experto en sistemas de riego y drenaje, especializado en tecnologías de ahorro de agua.',
    fullBio: 'Máster en Ingeniería de Riego con enfoque en tecnologías eficientes de uso del agua. Ha diseñado e implementado sistemas de riego tecnificado en diversos proyectos agrícolas. Su investigación se centra en la optimización del recurso hídrico en la agricultura.',
    education: [
      { degree: 'Maestría en Ingeniería de Riego', institution: 'Universidad Politécnica de Madrid', year: 2010 },
      { degree: 'Ingeniería Agronómica', institution: 'Universidad de El Salvador', year: 2005 }
    ],
    researchAreas: ['Sistemas de Riego', 'Hidráulica Agrícola', 'Uso Eficiente del Agua', 'Tecnología de Riego'],
    courses: ['Hidráulica', 'Riegos y Drenaje', 'Topografía'],
    awards: ['Premio a la Innovación en Riego 2019']
  },
  {
    id: 6,
    name: 'Dra. Sofía Beatriz Hernández',
    title: 'Doctora en Biotecnología Vegetal',
    specialty: 'Biotecnología',
    photo: 'https://i.pravatar.cc/400?img=10',
    email: 'sofia.hernandez@agrominerva.edu',
    phone: '+503 2345-6794',
    experience: 14,
    publications: 36,
    bio: 'Especialista en biotecnología aplicada a mejoramiento genético y cultivo de tejidos vegetales.',
    fullBio: 'Doctora en Biotecnología Vegetal con experiencia en técnicas moleculares aplicadas al mejoramiento de cultivos. Ha desarrollado protocolos de propagación in vitro y caracterización genética de variedades agrícolas. Su trabajo contribuye a la generación de materiales vegetales mejorados.',
    education: [
      { degree: 'Doctorado en Biotecnología Vegetal', institution: 'Universidad Nacional de Colombia', year: 2012 },
      { degree: 'Maestría en Genética', institution: 'Universidad de Costa Rica', year: 2008 },
      { degree: 'Ingeniería Agronómica', institution: 'Universidad de El Salvador', year: 2005 }
    ],
    researchAreas: ['Biotecnología Vegetal', 'Cultivo de Tejidos', 'Genética Molecular', 'Mejoramiento Genético'],
    courses: ['Genética', 'Mejoramiento de Plantas', 'Biotecnología Agrícola'],
    awards: ['Premio Joven Investigador 2016', 'Mejor Publicación Científica 2020']
  },
  {
    id: 7,
    name: 'Ing. Jorge Enrique Ramírez',
    title: 'Máster en Economía Agrícola',
    specialty: 'Economía Agrícola',
    photo: 'https://i.pravatar.cc/400?img=14',
    email: 'jorge.ramirez@agrominerva.edu',
    phone: '+503 2345-6795',
    experience: 19,
    publications: 30,
    bio: 'Experto en análisis económico agrícola, mercados y gestión de agronegocios.',
    fullBio: 'Máster en Economía Agrícola con amplia experiencia en análisis de mercados y evaluación de proyectos agropecuarios. Ha asesorado numerosas empresas agrícolas en planificación estratégica y análisis financiero. Su investigación se enfoca en competitividad y desarrollo rural.',
    education: [
      { degree: 'Maestría en Economía Agrícola', institution: 'Universidad de Chile', year: 2007 },
      { degree: 'Ingeniería Agronómica', institution: 'Universidad de El Salvador', year: 2003 }
    ],
    researchAreas: ['Economía Agrícola', 'Agronegocios', 'Mercados Agrícolas', 'Desarrollo Rural'],
    courses: ['Economía Agrícola', 'Administración Agropecuaria', 'Agronegocios', 'Formulación de Proyectos'],
    awards: ['Reconocimiento al Liderazgo Académico 2018']
  },
  {
    id: 8,
    name: 'Ing. Claudia Isabel Morales',
    title: 'Máster en Horticultura',
    specialty: 'Cultivos',
    photo: 'https://i.pravatar.cc/400?img=16',
    email: 'claudia.morales@agrominerva.edu',
    phone: '+503 2345-6796',
    experience: 15,
    publications: 25,
    bio: 'Especialista en producción de hortalizas y fruticultura, con énfasis en tecnologías de invernadero.',
    fullBio: 'Máster en Horticultura especializada en sistemas protegidos de producción. Ha implementado proyectos de producción intensiva de hortalizas bajo invernadero. Su trabajo se centra en la optimización de la producción hortícola y la adopción de tecnologías modernas.',
    education: [
      { degree: 'Maestría en Horticultura', institution: 'Universidad Autónoma de México', year: 2011 },
      { degree: 'Ingeniería Agronómica', institution: 'Universidad de El Salvador', year: 2007 }
    ],
    researchAreas: ['Horticultura Protegida', 'Fruticultura', 'Producción Intensiva', 'Tecnología de Invernaderos'],
    courses: ['Producción de Hortalizas', 'Fruticultura', 'Cultivos Extensivos'],
    awards: ['Premio a la Innovación en Horticultura 2020']
  },
  {
    id: 9,
    name: 'Dr. Fernando Alonso Castro',
    title: 'Doctor en Agroclimatología',
    specialty: 'Riego',
    photo: 'https://i.pravatar.cc/400?img=15',
    email: 'fernando.castro@agrominerva.edu',
    phone: '+503 2345-6797',
    experience: 21,
    publications: 42,
    bio: 'Especialista en cambio climático y su impacto en la agricultura, modelación climática aplicada.',
    fullBio: 'Doctor en Agroclimatología con experiencia en análisis del impacto del cambio climático en sistemas agrícolas. Ha desarrollado modelos de predicción climática para la agricultura. Su investigación contribuye a la adaptación de la agricultura al cambio climático.',
    education: [
      { degree: 'Doctorado en Agroclimatología', institution: 'Universidad de Barcelona', year: 2008 },
      { degree: 'Maestría en Meteorología Agrícola', institution: 'Universidad de Buenos Aires', year: 2003 },
      { degree: 'Ingeniería Agronómica', institution: 'Universidad de El Salvador', year: 1999 }
    ],
    researchAreas: ['Cambio Climático', 'Agroclimatología', 'Modelación Climática', 'Adaptación Agrícola'],
    courses: ['Agroclimatología', 'Meteorología Agrícola', 'Diseños Experimentales'],
    awards: ['Premio Internacional en Cambio Climático 2017', 'Investigador Destacado 2021']
  }
])

// Profesores filtrados
const filteredProfessors = computed(() => {
  let filtered = professors.value

  // Filtrar por especialidad
  if (selectedSpecialty.value) {
    filtered = filtered.filter(p => p.specialty === selectedSpecialty.value)
  }

  // Filtrar por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.specialty.toLowerCase().includes(query) ||
      p.title.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Métodos
const openProfessorDetail = (professor) => {
  selectedProfessor.value = professor
  showDetail.value = true
}
</script>

<style scoped>
.filter-button {
  transition: all 0.3s ease;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(.p-dialog) {
  border: 2px solid #e5e7eb;
}

:deep(.p-dialog .p-dialog-header) {
  background: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
}

:deep(.p-button) {
  font-weight: 600;
  transition: all 0.3s ease;
}
</style>