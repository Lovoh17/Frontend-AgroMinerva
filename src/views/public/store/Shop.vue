<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-4">
        Nuestros Productos
      </h1>
      <p class="text-neutral-600 text-lg">
        Descubre nuestra selección de productos frescos y de calidad
      </p>
    </div>

    <!-- Productos destacados -->
    <FeaturedProducts />

    <div class="grid lg:grid-cols-4 gap-8 mt-12">
      <!-- Filtros -->
      <div class="lg:col-span-1">
        <ProductFilter @filter-change="applyFilters" />
      </div>

      <!-- Productos -->
      <div class="lg:col-span-3">
        <!-- Barra de herramientas -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div class="text-neutral-600">
            Mostrando {{ filteredProducts.length }} de {{ allProducts.length }} productos
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-neutral-600">Ordenar por:</span>
            <Dropdown 
              v-model="sortBy" 
              :options="sortOptions" 
              optionLabel="label"
              class="w-40"
              @change="applySorting"
            />
          </div>
        </div>

        <!-- Grid de productos -->
        <div v-if="filteredProducts.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard 
            v-for="product in filteredProducts" 
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- Estado vacío -->
        <div v-else class="text-center py-16">
          <i class="pi pi-search text-6xl text-neutral-300 mb-4"></i>
          <h3 class="text-xl font-semibold text-neutral-700 mb-2">No se encontraron productos</h3>
          <p class="text-neutral-500 mb-6">Intenta ajustar los filtros de búsqueda</p>
          <Button 
            label="Limpiar filtros" 
            icon="pi pi-filter-slash" 
            outlined
            @click="clearAllFilters"
          ></Button>
        </div>

        <!-- Estado de carga -->
        <div v-if="loading" class="text-center py-8">
          <ProgressSpinner style="width: 50px; height: 50px" />
          <p class="mt-4 text-neutral-600">Cargando productos...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { productService } from '../../../services/productService'
import { inventoryService } from '../../../services/inventoryService'
import ProductFilter from '../../../components/public/store/ProductFilter.vue'
import ProductCard from '../../../components/public/store/ProductCard.vue'
import FeaturedProducts from '../../../components/public/store/FeaturedProducts.vue' // IMPORTAR

// Components
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'

// State
const allProducts = ref([])
const filteredProducts = ref([])
const loading = ref(false)

// Filtros
const currentFilters = ref({
  categories: [],
  priceRange: [0, 1000],
  inStockOnly: false
})

// Ordenamiento
const sortBy = ref({ field: 'nombre', order: 'asc' })
const sortOptions = ref([
  { label: 'Nombre A-Z', field: 'nombre', order: 'asc' },
  { label: 'Nombre Z-A', field: 'nombre', order: 'desc' },
  { label: 'Precio: Menor a Mayor', field: 'precio', order: 'asc' },
  { label: 'Precio: Mayor a Menor', field: 'precio', order: 'desc' },
  { label: 'Stock: Mayor primero', field: 'stock', order: 'desc' }
])

// Cargar todos los productos
const loadAllProducts = async () => {
  loading.value = true
  try {
    console.log('Cargando todos los productos...')
    
    const products = await productService.getProducts()
    console.log('Productos obtenidos:', products)
    
    if (!products || products.length === 0) {
      console.warn('No se obtuvieron productos')
      allProducts.value = []
      filteredProducts.value = []
      return
    }
    
    // Obtener stock para todos los productos
    const productsWithStock = await Promise.all(
      products.map(async (product) => {
        try {
          const stock = await inventoryService.getStockByProduct(product.id)
          return {
            ...product,
            stock: stock,
            inStock: stock > 0
          }
        } catch (error) {
          console.error(`Error cargando stock para ${product.nombre}:`, error)
          return {
            ...product,
            stock: 0,
            inStock: false
          }
        }
      })
    )
    
    allProducts.value = productsWithStock.filter(product => product !== null)
    filteredProducts.value = [...allProducts.value]
    console.log(' Todos los productos cargados:', allProducts.value)
    
  } catch (error) {
    console.error(' Error cargando productos:', error)
    allProducts.value = []
    filteredProducts.value = []
  } finally {
    loading.value = false
  }
}

// Aplicar filtros
const applyFilters = (filters) => {
  currentFilters.value = filters
  filterProducts()
}

// Filtrar productos
const filterProducts = () => {
  let filtered = [...allProducts.value]

  // Filtrar por categorías
  if (currentFilters.value.categories.length > 0) {
    filtered = filtered.filter(product => 
      currentFilters.value.categories.includes(product.categoria?.id)
    )
  }

  // Filtrar por rango de precio
  filtered = filtered.filter(product => 
    product.precio >= currentFilters.value.priceRange[0] && 
    product.precio <= currentFilters.value.priceRange[1]
  )

  // Filtrar por disponibilidad
  if (currentFilters.value.inStockOnly) {
    filtered = filtered.filter(product => product.inStock)
  }

  // Aplicar ordenamiento
  applySortingToProducts(filtered)
}

// Aplicar ordenamiento
const applySorting = () => {
  filterProducts()
}

const applySortingToProducts = (products) => {
  const { field, order } = sortBy.value
  
  products.sort((a, b) => {
    let aValue = a[field] || 0
    let bValue = b[field] || 0
    
    // Para ordenamiento de texto
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    if (order === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
  
  filteredProducts.value = products
}

// Limpiar todos los filtros
const clearAllFilters = () => {
  currentFilters.value = {
    categories: [],
    priceRange: [0, 1000],
    inStockOnly: false
  }
  sortBy.value = { field: 'nombre', order: 'asc' }
  filteredProducts.value = [...allProducts.value]
}

// Lifecycle
onMounted(() => {
  loadAllProducts()
})
</script>

<style scoped>
</style>