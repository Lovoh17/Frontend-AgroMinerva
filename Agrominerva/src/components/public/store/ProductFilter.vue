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
      <div class="flex flex-col gap-3">
        <div 
          v-for="category in categories" 
          :key="category.value"
          class="flex items-center"
        >
          <Checkbox 
            v-model="selectedCategories" 
            :inputId="category.value" 
            :value="category.value"
            @change="emitFilters"
          />
          <label 
            :for="category.value" 
            class="ml-2 text-neutral-700 cursor-pointer hover:text-primary-600 transition-colors"
          >
            {{ category.label }} ({{ category.count }})
          </label>
        </div>
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
          :max="2000" 
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

    <Divider />

    <!-- Filtro por Calificación -->
    <div class="mb-6">
      <h4 class="font-semibold text-neutral-800 mb-3 flex items-center gap-2">
        <i class="pi pi-star text-primary-600"></i>
        Calificación Mínima
      </h4>
      <div class="flex flex-col gap-2">
        <div 
          v-for="rating in [5, 4, 3]" 
          :key="rating"
          class="flex items-center cursor-pointer hover:bg-neutral-50 p-2 rounded transition-colors"
          @click="selectRating(rating)"
        >
          <RadioButton 
            v-model="minRating" 
            :inputId="`rating-${rating}`" 
            :value="rating"
            @change="emitFilters"
          />
          <label 
            :for="`rating-${rating}`" 
            class="ml-2 flex items-center gap-2 cursor-pointer"
          >
            <Rating 
              :modelValue="rating" 
              :readonly="true" 
              :cancel="false"
              class="text-sm"
            />
            <span class="text-neutral-600 text-sm">y más</span>
          </label>
        </div>
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
import { ref, watch } from 'vue'
import Checkbox from 'primevue/checkbox'
import Slider from 'primevue/slider'
import Divider from 'primevue/divider'
import RadioButton from 'primevue/radiobutton'
import Rating from 'primevue/rating'
import Button from 'primevue/button'

const emit = defineEmits(['filter-change', 'sort-change'])

// Categorías disponibles (mock - obtener del backend)
const categories = ref([
  { label: 'Productos Frescos', value: 'Productos Frescos', count: 7 },
  { label: 'Laboratorio', value: 'Laboratorio', count: 5 },
  { label: 'Libros', value: 'Libros', count: 8 },
  { label: 'Herramientas', value: 'Herramientas', count: 12 },
  { label: 'Tecnología', value: 'Tecnología', count: 6 },
  { label: 'Semillas', value: 'Semillas', count: 10 },
  { label: 'Riego', value: 'Riego', count: 7 },
  { label: 'Fertilizantes', value: 'Fertilizantes', count: 9 }
])

// Estado de filtros
const selectedCategories = ref([])
const priceRange = ref([0, 2000])
const inStockOnly = ref(false)
const minRating = ref(null)

// Emitir cambios de filtros
const emitFilters = () => {
  emit('filter-change', {
    categories: selectedCategories.value,
    priceRange: priceRange.value,
    inStockOnly: inStockOnly.value,
    minRating: minRating.value
  })
}

// Limpiar todos los filtros
const clearFilters = () => {
  selectedCategories.value = []
  priceRange.value = [0, 2000]
  inStockOnly.value = false
  minRating.value = null
  emitFilters()
}

// Seleccionar calificación
const selectRating = (rating) => {
  minRating.value = rating
  emitFilters()
}

// Watch para cambios automáticos 
watch([selectedCategories, priceRange, inStockOnly, minRating], () => {
  // Auto-aplicar filtros en desktop
  if (window.innerWidth >= 1024) {
    emitFilters()
  }
}, { deep: true })
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