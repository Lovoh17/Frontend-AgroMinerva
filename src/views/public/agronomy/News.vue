<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero -->
    <section class="bg-tertiary-600 text-white py-14 md:py-18 border-b-4 border-accent-500">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl">
          <p class="uppercase text-sm tracking-widest text-primary-100 mb-2">
            AgroNews
          </p>
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Noticias y actividades de Agronomía
          </h1>
          <p class="text-base md:text-lg text-primary-100 leading-relaxed">
            Mantente al día con los eventos, proyectos, publicaciones y logros de la comunidad académica
            y estudiantil de Agronomía.
          </p>
        </div>
      </div>
    </section>

    <!-- Contenido principal -->
    <section class="container mx-auto px-4 py-10">
      <!-- Resumen -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6 text-sm text-gray-600">
        <p>
          Mostrando
          <span class="font-semibold text-tertiary-700">
            {{ paginatedNews.length }}
          </span>
          de
          <span class="font-semibold text-tertiary-700">
            {{ news.length }}
          </span>
          noticias en orden cronológico.
        </p>
      </div>

      <!-- Timeline vertical -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-0 bg-white border border-gray-200 rounded-2xl shadow-sm">
  
  <!-- LADO IZQUIERDO DECORATIVO -->
  <div class="hidden md:flex flex-col items-center justify-center bg-tertiary-50 border-r border-gray-200 p-6 space-y-4">
    <i class="pi pi-globe text-tertiary-600 text-4xl"></i>

    <h3 class="text-lg font-semibold text-tertiary-700 text-center">
      AgroNews
    </h3>

    <p class="text-sm text-gray-500 text-center px-3">
      Actualidad agrícola, investigación, jornadas de campo y vida estudiantil.
    </p>

    <div class="w-1 h-40 bg-tertiary-300 rounded-full opacity-50"></div>
  </div>

  <!-- TIMELINE A LA DERECHA -->
  <div class="col-span-1 md:col-span-4 p-4 md:p-6">
    <Timeline
  :value="paginatedNews"
  align="left"
  class="custom-timeline timeline-compact"
>
  <template #marker>
    <span class="flex items-center justify-center w-8 h-8 rounded-full bg-tertiary-50 border-2 border-tertiary-500">
      <i class="pi pi-calendar text-tertiary-600 text-sm"></i>
    </span>
  </template>

  <template #content="slotProps">
    <div class="ml-2 mb-10"> <!-- antes tenías ml-4 -->
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-50 border border-tertiary-200 text-xs font-medium text-tertiary-700 mb-3"
      >
        <i class="pi pi-clock text-[11px]"></i>
        <span>{{ formatDate(slotProps.item.date) }}</span>
      </div>

      <NewsCard :news="slotProps.item" />
    </div>
  </template>
</Timeline>

  </div>
</div>


      <!-- Paginación -->
      <div class="flex justify-center mt-8">
        <Paginator
          v-model:first="first"
          :rows="rows"
          :totalRecords="news.length"
          :rowsPerPageOptions="[3, 4, 6]"
          class="custom-paginator"
          @page="onPageChange"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Timeline from 'primevue/timeline'
import Paginator from 'primevue/paginator'
import NewsCard from '@/components/public/agronomy/NewsCard.vue'

/*
 * @purpose: Sección AgroNews con línea de tiempo cronológica y paginación.
 */

const news = ref([
  {
    id: 1,
    title: 'Jornada de campo sobre manejo de suelos',
    date: '2024-11-10',
    category: 'Eventos',
    excerpt:
      'Estudiantes y docentes realizaron una demostración práctica sobre conservación de suelos y manejo de materia orgánica.',
    location: 'Parcela experimental UES',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800',
    tags: ['suelo', 'jornada de campo', 'conservación']
  },
  {
    id: 2,
    title: 'Presentación de resultados de investigación en maíz',
    date: '2024-10-28',
    category: 'Investigación',
    excerpt:
      'Se presentaron avances de proyectos de mejoramiento de rendimiento en maíz con enfoque en adaptación al cambio climático.',
    location: 'Auditorio Facultad de Agronomía',
    image: 'https://images.unsplash.com/photo-1603888892170-ffc02594c2c2?w=800',
    tags: ['maíz', 'investigación', 'rendimiento']
  },
  {
    id: 3,
    title: 'Capacitación en riego tecnificado para productores',
    date: '2024-10-15',
    category: 'Extensión',
    excerpt:
      'Productores de la zona rural participaron en talleres sobre diseño y manejo de sistemas de riego por goteo.',
    location: 'Comunidad El Porvenir',
    image: 'https://images.unsplash.com/photo-1600093463592-9f61807aef11?w=800',
    tags: ['riego', 'extensión', 'productores']
  },
  {
    id: 4,
    title: 'Feria de proyectos estudiantiles en Agronomía',
    date: '2024-10-02',
    category: 'Vida estudiantil',
    excerpt:
      'Estudiantes presentaron prototipos, ensayos y propuestas innovadoras orientadas a la producción sostenible de alimentos.',
    location: 'Plaza central Facultad',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
    tags: ['estudiantes', 'feria', 'innovación']
  },
  {
    id: 5,
    title: 'Visita técnica a cooperativa de café',
    date: '2024-09-20',
    category: 'Visitas técnicas',
    excerpt:
      'Se realizó un recorrido por fincas cafetaleras para conocer procesos de producción, beneficiado y comercialización.',
    location: 'Cooperativa cafetalera Los Pinos',
    image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=800',
    tags: ['café', 'visita técnica', 'cooperativa']
  },
  {
    id: 6,
    title: 'Taller sobre agricultura regenerativa',
    date: '2024-09-05',
    category: 'Formación',
    excerpt:
      'Docentes invitados compartieron conceptos y experiencias sobre agricultura regenerativa y salud del suelo.',
    location: 'Sala de conferencias',
    image: 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?w=800',
    tags: ['agricultura regenerativa', 'taller', 'formación']
  }
])

// ordenar por fecha (más reciente primero)
const sortedNews = computed(() => {
  return [...news.value].sort((a, b) => (a.date < b.date ? 1 : -1))
})

// paginación
const first = ref(0)
const rows = ref(3)

const paginatedNews = computed(() => {
  const start = first.value
  const end = start + rows.value
  return sortedNews.value.slice(start, end)
})

const onPageChange = (event) => {
  first.value = event.first
  rows.value = event.rows
}

const formatDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('es-SV', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  })
}
</script>

<style scoped>
:deep(.custom-paginator) {
  background: white;
  border: 1px solid #e5e7eb;
  padding: 0.75rem 1rem;
  border-radius: 9999px;
}

:deep(.custom-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
  background: #8bc34a;
  border-color: #8bc34a;
  color: #fff;
}

:deep(.p-paginator .p-paginator-page) {
  border-radius: 9999px;
}

/* timeline más limpio */
:deep(.custom-timeline .p-timeline-event) {
  margin-bottom: 0;
}

:deep(.custom-timeline .p-timeline-event-connector) {
  background: #d1d5db; /* gris claro para la línea */
}


:deep(.timeline-compact .p-timeline-event-opposite) {
  flex: 0 0 0;
  padding: 0;
  margin: 0;
}


:deep(.timeline-compact .p-timeline-event-content) {
  margin-left: 0;
}

</style>

