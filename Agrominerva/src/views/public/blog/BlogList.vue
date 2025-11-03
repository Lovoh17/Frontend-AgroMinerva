<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="bg-tertiary-600 text-white py-20 border-b-4 border-accent-500">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Blog Agrícola
          </h1>
          <p class="text-xl text-primary-100 leading-relaxed">
            Descubre las últimas tendencias, técnicas innovadoras y consejos expertos 
            para optimizar tu producción agrícola.
          </p>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="container mx-auto px-4 py-8">
      <div class="bg-gray-50 border-2 border-gray-200 p-6 mb-8">
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div class="flex flex-wrap gap-3">
            <Button 
              v-for="category in categories" 
              :key="category.id"
              :label="category.name"
              :severity="selectedCategory === category.id ? 'success' : 'secondary'"
              :outlined="selectedCategory !== category.id"
              @click="selectedCategory = category.id"
              class="filter-button"
            />
          </div>
          <div class="flex items-center gap-3 w-full md:w-auto border-2 border-gray-300 bg-white px-4 py-2">
            <span class="pi pi-search text-gray-400"></span>
            <input 
              v-model="searchQuery" 
              placeholder="Buscar artículos..."
              class="w-full md:w-64 outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Grid de Artículos -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <article 
          v-for="article in filteredArticles" 
          :key="article.id"
          class="bg-white border-2 border-gray-200 overflow-hidden hover:border-accent-500 transition-all duration-300 group"
        >
          <!-- Imagen -->
          <div class="relative overflow-hidden h-64">
            <img 
              :src="article.image" 
              :alt="article.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute top-0 left-0">
              <span class="bg-accent-500 text-white px-4 py-2 text-sm font-semibold">
                {{ article.category }}
              </span>
            </div>
          </div>

          <!-- Contenido -->
          <div class="p-6">
            <!-- Metadata -->
            <div class="flex items-center gap-4 text-sm text-gray-500 mb-3 pb-3 border-b border-gray-200">
              <div class="flex items-center gap-2">
                <i class="pi pi-calendar text-accent-500"></i>
                <span>{{ article.date }}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="pi pi-clock text-accent-500"></i>
                <span>{{ article.readTime }} min</span>
              </div>
            </div>

            <!-- Título -->
            <h2 class="text-2xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-accent-600 transition-colors">
              {{ article.title }}
            </h2>

            <!-- Descripción -->
            <p class="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {{ article.description }}
            </p>

            <!-- Autor -->
            <div class="flex items-center justify-between pt-4 border-t-2 border-gray-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-accent-500 text-white flex items-center justify-center font-bold">
                  {{ article.author.name[0] }}
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-800">{{ article.author.name }}</p>
                  <p class="text-xs text-gray-500">{{ article.author.role }}</p>
                </div>
              </div>
              <Button 
                label="Leer más" 
                icon="pi pi-arrow-right" 
                iconPos="right"
                text
                class="text-accent-600 hover:text-accent-700 font-semibold hover:underline"
                @click="goToArticle(article.id)"
              />
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-4">
              <span 
                v-for="tag in article.tags" 
                :key="tag"
                class="px-3 py-1 border border-gray-300 text-gray-700 text-xs font-medium hover:border-accent-500 hover:text-accent-600 transition-colors cursor-pointer"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- Paginación -->
      <div class="flex justify-center">
        <Paginator 
          v-model:first="first" 
          :rows="rows" 
          :totalRecords="totalRecords"
          :rowsPerPageOptions="[4, 8, 12]"
          class="custom-paginator"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

// Estado
const selectedCategory = ref('todos')
const searchQuery = ref('')
const first = ref(0)
const rows = ref(4)
const totalRecords = ref(12)

// Categorías
const categories = [
  { id: 'todos', name: 'Todos' },
  { id: 'cultivos', name: 'Cultivos' },
  { id: 'tecnologia', name: 'Tecnología' },
  { id: 'sostenibilidad', name: 'Sostenibilidad' },
  { id: 'consejos', name: 'Consejos' }
]

// Artículos de ejemplo
const articles = ref([
  {
    id: 1,
    title: 'Técnicas Avanzadas de Riego por Goteo para Maximizar Rendimientos',
    description: 'Descubre cómo implementar sistemas de riego por goteo inteligentes que pueden aumentar tu productividad hasta un 40% mientras reduces el consumo de agua significativamente.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
    category: 'Tecnología',
    categoryId: 'tecnologia',
    date: '15 Oct 2024',
    readTime: 8,
    author: {
      name: 'Dr. Carlos Méndez',
      role: 'Ingeniero Agrónomo',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    tags: ['riego', 'tecnología', 'ahorro-agua']
  },
  {
    id: 2,
    title: 'Agricultura Regenerativa: El Futuro de la Producción Sostenible',
    description: 'Explora las prácticas agrícolas que no solo producen alimentos, sino que también restauran la salud del suelo y mejoran los ecosistemas locales para las futuras generaciones.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
    category: 'Sostenibilidad',
    categoryId: 'sostenibilidad',
    date: '12 Oct 2024',
    readTime: 10,
    author: {
      name: 'Ing. María Torres',
      role: 'Especialista en Sostenibilidad',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    tags: ['sostenibilidad', 'suelo', 'regenerativo']
  },
  {
    id: 3,
    title: 'Optimización del Cultivo de Maíz: De la Siembra a la Cosecha',
    description: 'Una guía completa sobre las mejores prácticas para cultivar maíz de alta calidad, desde la selección de semillas hasta las técnicas de cosecha más eficientes.',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800',
    category: 'Cultivos',
    categoryId: 'cultivos',
    date: '08 Oct 2024',
    readTime: 12,
    author: {
      name: 'Ing. Roberto Campos',
      role: 'Especialista en Cereales',
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    tags: ['maíz', 'cultivos', 'siembra']
  },
  {
    id: 4,
    title: '10 Consejos para Combatir Plagas de Forma Natural y Efectiva',
    description: 'Aprende métodos orgánicos y ecológicos para proteger tus cultivos de las plagas más comunes, sin comprometer la salud de tu producción ni del medio ambiente.',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800',
    category: 'Consejos',
    categoryId: 'consejos',
    date: '05 Oct 2024',
    readTime: 6,
    author: {
      name: 'Dra. Ana Rodríguez',
      role: 'Fitopatóloga',
      avatar: 'https://i.pravatar.cc/150?img=9'
    },
    tags: ['plagas', 'orgánico', 'control']
  }
])

// Artículos filtrados
const filteredArticles = computed(() => {
  let filtered = articles.value

  // Filtrar por categoría
  if (selectedCategory.value !== 'todos') {
    filtered = filtered.filter(article => article.categoryId === selectedCategory.value)
  }

  // Filtrar por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
})

// Métodos
const goToArticle = (id) => {
  toast.add({
    severity: 'info',
    summary: 'Navegando al artículo',
    detail: `Abriendo artículo #${id}`,
    life: 3000
  })
}
</script>

<style scoped>
.filter-button {
  transition: all 0.3s ease;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(.custom-paginator) {
  background: white;
  border: 2px solid #e5e7eb;
  padding: 1rem;
}

:deep(.custom-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
  background: #8BC34A;
  border-color: #8BC34A;
}

:deep(.p-button) {
  font-weight: 600;
  transition: all 0.3s ease;
}
</style>