<template>
  <div class="filter-bar bg-white p-6 rounded-lg border border-neutral-200 shadow-soft sticky top-4">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold text-neutral-900">Filtros</h3>
      <Button 
        label="Limpiar" 
        icon="pi pi-filter-slash" 
        size="small"
        text
        @click="clearFilters"
      ></Button>
    </div>

    <!-- Filtro por Categoría -->
    <div class="mb-6">
      <h4 class="font-semibold text-neutral-800 mb-3 flex items-center gap-2">
        <i class="pi pi-tag text-primary-600"></i>
        Categorías
      </h4>
      <div class="flex flex-col gap-3" v-if="categories.length > 0">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="flex items-center"
        >
          <Checkbox 
            v-model="selectedCategories" 
            :inputId="category.id" 
            :value="category.id"
            @change="emitFilters"
          />
          <label 
            :for="category.id" 
            class="ml-2 text-neutral-700 cursor-pointer hover:text-primary-600 transition-colors"
          >
            {{ category.nombre }}
          </label>
        </div>
      </div>
      <div v-else class="text-sm text-neutral-500">
        Cargando categorías...
      </div>
    </div>

    <Divider />

    <!-- Filtro por Precio -->
    <div class="mb-6">
      <h4 class="font-semibold text-neutral-800 mb-3 flex items-center gap-2">
        <i class="pi pi-dollar text-primary-600"></i>
        Rango de Precio
      </h4>
      <div class="px-2">
        <Slider 
          v-model="priceRange" 
          :min="0" 
          :max="1000" 
          :step="10"
          range
          class="mb-4"
          @change="emitFilters"
        />
        <div class="flex justify-between text-sm text-neutral-600">
          <span class="font-semibold">${{ priceRange[0] }}</span>
          <span class="font-semibold">${{ priceRange[1] }}</span>
        </div>
      </div>
    </div>

    <Divider />

    <!-- Filtro por Disponibilidad -->
    <div class="mb-6">
      <h4 class="font-semibold text-neutral-800 mb-3 flex items-center gap-2">
        <i class="pi pi-shopping-bag text-primary-600"></i>
        Disponibilidad
      </h4>
      <div class="flex items-center">
        <Checkbox 
          v-model="inStockOnly" 
          inputId="inStock" 
          :binary="true"
          @change="emitFilters"
        />
        <label 
          for="inStock" 
          class="ml-2 text-neutral-700 cursor-pointer hover:text-primary-600 transition-colors"
        >
          Solo productos en stock
        </label>
      </div>
    </div>

    <!-- Botón Aplicar Filtros (móvil) -->
    <div class="mt-6 lg:hidden">
      <Button 
        label="Aplicar Filtros" 
        icon="pi pi-check" 
        class="w-full bg-primary-600 hover:bg-primary-700 border-0"
        @click="emitFilters"
      ></Button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { productService } from '../../../services/productService'
import Checkbox from 'primevue/checkbox'
import Slider from 'primevue/slider'
import Divider from 'primevue/divider'
import Button from 'primevue/button'

const emit = defineEmits(['filter-change'])

// Categorías desde la base de datos
const categories = ref([])

// Estado de filtros
const selectedCategories = ref([])
const priceRange = ref([0, 1000])
const inStockOnly = ref(false)

// Cargar categorías
const loadCategories = async () => {
  try {
    categories.value = await productService.getCategories()
    console.log('Categorías cargadas:', categories.value) // Debug
  } catch (error) {
    console.error('Error loading categories:', error)
    categories.value = []
  }
}

// Emitir cambios de filtros
const emitFilters = () => {
  emit('filter-change', {
    categories: selectedCategories.value,
    priceRange: priceRange.value,
    inStockOnly: inStockOnly.value
  })
}

// Limpiar todos los filtros
const clearFilters = () => {
  selectedCategories.value = []
  priceRange.value = [0, 1000]
  inStockOnly.value = false
  emitFilters()
}

// Watch para cambios automáticos 
watch([selectedCategories, priceRange, inStockOnly], () => {
  // Auto-aplicar filtros en desktop
  if (window.innerWidth >= 1024) {
    emitFilters()
  }
}, { deep: true })

// Lifecycle
onMounted(() => {
  loadCategories()
})
</script>

<style scoped>
/* Estilos para el slider de PrimeVue */
:deep(.p-slider) {
  background: #e5e7eb;
}

:deep(.p-slider .p-slider-range) {
  background: #22c55e;
}

:deep(.p-slider .p-slider-handle) {
  border-color: #22c55e;
}
</style>