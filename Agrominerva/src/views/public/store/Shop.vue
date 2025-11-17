<template>
  <div class="container mx-auto p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl md:text-4xl font-extrabold mb-4 text-neutral-900">
        Tienda AgroMinerva
      </h1>
      <p class="text-lg text-neutral-600">
        Encuentra todo lo que necesitas para tu formación agronómica
      </p>
    </div>

    <!-- Productos Destacados de Temporada -->
    <div class="mb-12 bg-primary-50 p-6 rounded-lg border border-primary-200">
      <div class="flex items-center gap-2 mb-4">
        <i class="pi pi-star-fill text-accent-500 text-2xl"></i>
        <h2 class="text-2xl font-bold text-neutral-900">Ofertas de Temporada</h2>
      </div>
      <FeaturedProducts />
    </div>

    <!-- Filtros y Ordenamiento -->
    <div class="flex flex-col lg:flex-row gap-6 mb-8">
      <!-- Barra de Filtros -->
      <div class="lg:w-1/4">
        <ProductFilter 
          @filter-change="handleFilterChange"
          @sort-change="handleSortChange"
        />
      </div>

      <!-- Grid de Productos -->
      <div class="lg:w-3/4">
        <!-- Barra de Información y Ordenamiento -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div class="text-neutral-600">
            Mostrando {{ paginatedProducts.length }} de {{ filteredProducts.length }} productos
          </div>
          
          <div class="flex items-center gap-2">
            <label for="sort-select" class="text-sm text-neutral-600">Ordenar por:</label>
            <Dropdown 
              id="sort-select"
              v-model="sortBy" 
              :options="sortOptions" 
              optionLabel="label" 
              optionValue="value"
              placeholder="Seleccionar"
              class="w-48"
              @change="applySorting"
            />
          </div>
        </div>

        <!-- Grid de Productos -->
        <div v-if="paginatedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <ProductCard 
            v-for="product in paginatedProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>

        <!-- Sin Resultados -->
        <div v-else class="text-center py-12">
          <i class="pi pi-inbox text-6xl text-neutral-300 mb-4"></i>
          <h3 class="text-xl font-bold text-neutral-700 mb-2">No se encontraron productos</h3>
          <p class="text-neutral-500">Intenta ajustar los filtros de búsqueda</p>
          <Button 
            label="Limpiar Filtros" 
            icon="pi pi-filter-slash" 
            class="mt-4"
            outlined
            @click="clearFilters"
          ></Button>
        </div>

        <!-- Paginación -->
        <div v-if="totalPages > 1" class="mt-10 flex justify-center">
          <Paginator 
            v-model:first="first"
            :rows="itemsPerPage"
            :totalRecords="filteredProducts.length"
            @page="onPageChange"
            template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import ProductCard from '@/components/public/store/ProductCard.vue'
import ProductFilter from '@/components/public/store/ProductFilter.vue'
import FeaturedProducts from '@/components/public/store/FeaturedProducts.vue'
import Dropdown from 'primevue/dropdown'
import Paginator from 'primevue/paginator'
import Button from 'primevue/button'

// Mock de productos (Reemplazar con API call)
const allProducts = ref([
  // Productos de Temporada
  { 
    id: 101, 
    name: 'Carne de Conejo Fresca', 
    price: 2.50, 
    category: 'Productos Frescos',
    rating: 4.9,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop',
    description: 'Carne de conejo de alta calidad, criada en nuestras instalaciones',
    inStock: true
  },
  { 
    id: 102, 
    name: 'Pepino Fresco', 
    price: 0.20, 
    category: 'Productos Frescos',
    rating: 4.7,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&h=300&fit=crop',
    description: 'Pepinos frescos cultivados de manera orgánica',
    inStock: true
  },
  { 
    id: 103, 
    name: 'Miel de Abeja Pura 16oz', 
    price: 8.50, 
    category: 'Productos Frescos',
    rating: 5.0,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=400&fit=crop',
    description: 'Miel 100% natural producida por nuestras abejas',
    inStock: true
  },
  { 
    id: 104, 
    name: 'Papaya Fresca', 
    price: 1.50, 
    category: 'Productos Frescos',
    rating: 4.8,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=400&h=300&fit=crop',
    description: 'Papayas maduras y dulces de nuestra plantación',
    inStock: true
  },
  { 
    id: 105, 
    name: 'Plátanos', 
    price: 0.75, 
    category: 'Productos Frescos',
    rating: 4.6,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=300&fit=crop',
    description: 'Plátanos frescos y nutritivos',
    inStock: true
  },
  { 
    id: 106, 
    name: 'Tilapia Fresca', 
    price: 3.25, 
    category: 'Productos Frescos',
    rating: 4.9,
    reviews: 76,
    image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop',
    description: 'Tilapias frescas de nuestro estanque de acuicultura',
    inStock: true
  },
  { 
    id: 107, 
    name: 'Limón Criollo', 
    price: 0.15, 
    category: 'Productos Frescos',
    rating: 4.8,
    reviews: 134,
    image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&h=300&fit=crop',
    description: 'Limones criollos jugosos y aromáticos',
    inStock: true
  },
  
  // Productos Educativos y Herramientas
  { 
    id: 1, 
    name: 'Kit de Análisis de Suelos', 
    price: 89.99, 
    category: 'Laboratorio',
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=300&fit=crop',
    description: 'Kit completo para análisis de pH y nutrientes del suelo',
    inStock: true
  },
  { 
    id: 2, 
    name: 'Manual de Cultivos Extensivos', 
    price: 45.00, 
    category: 'Libros',
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    description: 'Guía completa sobre técnicas de cultivo y manejo de plagas',
    inStock: true
  },
  { 
    id: 3, 
    name: 'Set de Herramientas Agrícolas', 
    price: 125.50, 
    category: 'Herramientas',
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    description: 'Conjunto profesional de herramientas para trabajo de campo',
    inStock: true
  },
  { 
    id: 4, 
    name: 'Microscopio Digital USB', 
    price: 199.99, 
    category: 'Tecnología',
    rating: 4.6,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
    description: 'Microscopio de alta resolución para análisis de tejidos',
    inStock: false
  },
  { 
    id: 5, 
    name: 'Semillas Certificadas Premium', 
    price: 35.00, 
    category: 'Semillas',
    rating: 4.9,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
    description: 'Semillas certificadas de maíz, frijol y sorgo',
    inStock: true
  },
  { 
    id: 6, 
    name: 'Sistema de Riego por Goteo', 
    price: 275.00, 
    category: 'Riego',
    rating: 4.8,
    reviews: 92,
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=400&h=300&fit=crop',
    description: 'Sistema completo de riego con temporizador automático',
    inStock: true
  },
  { 
    id: 7, 
    name: 'Fertilizante Orgánico 25kg', 
    price: 42.50, 
    category: 'Fertilizantes',
    rating: 4.5,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
    description: 'Fertilizante orgánico de liberación lenta',
    inStock: true
  },
  { 
    id: 8, 
    name: 'Medidor de pH y Humedad', 
    price: 65.00, 
    category: 'Herramientas',
    rating: 4.4,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop',
    description: 'Medidor digital de pH, humedad y luz solar',
    inStock: true
  },
  { 
    id: 9, 
    name: 'Guía de Plagas y Enfermedades', 
    price: 38.00, 
    category: 'Libros',
    rating: 4.7,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    description: 'Manual ilustrado de identificación y control',
    inStock: true
  },
  { 
    id: 10, 
    name: 'Invernadero Portátil', 
    price: 189.99, 
    category: 'Herramientas',
    rating: 4.6,
    reviews: 34,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    description: 'Invernadero desmontable de 2x3 metros',
    inStock: true
  }
])

// Estado de filtros y ordenamiento
const filters = ref({
  categories: [],
  priceRange: [0, 2000],
  inStockOnly: false
})

const sortBy = ref('featured')
const sortOptions = [
  { label: 'Destacados', value: 'featured' },
  { label: 'Precio: Menor a Mayor', value: 'price-asc' },
  { label: 'Precio: Mayor a Menor', value: 'price-desc' },
  { label: 'Mejor Valorados', value: 'rating' },
  { label: 'Más Populares', value: 'popularity' }
]

// Paginación
const first = ref(0)
const itemsPerPage = ref(9)

// Productos filtrados
const filteredProducts = computed(() => {
  let products = [...allProducts.value]

  // Filtrar por categoría
  if (filters.value.categories.length > 0) {
    products = products.filter(p => filters.value.categories.includes(p.category))
  }

  // Filtrar por rango de precio
  products = products.filter(p => 
    p.price >= filters.value.priceRange[0] && 
    p.price <= filters.value.priceRange[1]
  )

  // Filtrar por stock
  if (filters.value.inStockOnly) {
    products = products.filter(p => p.inStock)
  }

  return products
})

// Aplicar ordenamiento
const sortedProducts = computed(() => {
  const products = [...filteredProducts.value]

  switch (sortBy.value) {
    case 'price-asc':
      return products.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return products.sort((a, b) => b.price - a.price)
    case 'rating':
      return products.sort((a, b) => b.rating - a.rating)
    case 'popularity':
      return products.sort((a, b) => b.reviews - a.reviews)
    default:
      return products
  }
})

// Productos paginados
const paginatedProducts = computed(() => {
  const start = first.value
  const end = start + itemsPerPage.value
  return sortedProducts.value.slice(start, end)
})

// Total de páginas
const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage.value)
})

// Handlers
const handleFilterChange = (newFilters) => {
  filters.value = newFilters
  first.value = 0 // Reset pagination
}

const handleSortChange = (sort) => {
  sortBy.value = sort
}

const applySorting = () => {
  first.value = 0 // Reset pagination
}

const onPageChange = (event) => {
  first.value = event.first
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const clearFilters = () => {
  filters.value = {
    categories: [],
    priceRange: [0, 2000],
    inStockOnly: false
  }
  sortBy.value = 'featured'
  first.value = 0
}
</script>

<style scoped>

</style>