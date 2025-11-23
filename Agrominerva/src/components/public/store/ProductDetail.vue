<template>
  <div class="product-detail max-w-7xl mx-auto px-4 py-8" v-if="product">
    <!-- Breadcrumb -->
    <nav class="mb-8">
      <Breadcrumb :home="home" :model="items" />
    </nav>

    <div class="grid lg:grid-cols-2 gap-12">
      <!-- Galería de imágenes -->
      <div class="space-y-4">
        <div class="aspect-square overflow-hidden rounded-xl border border-neutral-200">
          <img 
            :src="mainImage" 
            :alt="product.nombre"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Información del producto -->
      <div class="space-y-6">
        <div>
          <Tag :value="product.categoria?.nombre" severity="success" class="mb-4" />
          <h1 class="text-4xl font-bold text-neutral-900 mb-4">{{ product.nombre }}</h1>

          <div class="text-4xl font-bold text-primary-600 mb-2">
            ${{ product.precio?.toFixed(2) }}
          </div>
          <div class="text-sm text-neutral-500">
            por {{ product.unidad }}
          </div>
        </div>

        <Divider />

        <!-- Disponibilidad -->
        <div class="flex items-center gap-2">
          <i 
            :class="product.inStock ? 'pi pi-check-circle text-primary-600' : 'pi pi-times-circle text-secondary-600'"
            class="text-lg"
          ></i>
          <span class="font-medium" :class="product.inStock ? 'text-primary-600' : 'text-secondary-600'">
            {{ product.inStock ? `En stock (${product.stock} disponibles)` : 'Agotado' }}
          </span>
        </div>

        <!-- Descripción -->
        <div>
          <h3 class="text-lg font-semibold mb-3">Descripción</h3>
          <p class="text-neutral-700 leading-relaxed">{{ product.descripcion }}</p>
        </div>

        <Divider />

        <!-- Selector de cantidad y acciones -->
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <span class="font-medium">Cantidad:</span>
            <div class="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white">
              <Button 
                icon="pi pi-minus" 
                text
                class="px-4 py-3 hover:bg-neutral-100"
                :disabled="quantity <= 1"
                @click="quantity--"
              ></Button>
              <input 
                type="number"
                v-model.number="quantity"
                :min="1"
                :max="product.stock || 99"
                class="w-20 text-center border-0 focus:outline-none focus:ring-0 py-3"
              />
              <Button 
                icon="pi pi-plus" 
                text
                class="px-4 py-3 hover:bg-neutral-100"
                :disabled="quantity >= (product.stock || 99)"
                @click="quantity++"
              ></Button>
            </div>
          </div>

          <div class="flex gap-4">
            <Button 
              label="Añadir al Carrito" 
              icon="pi pi-shopping-cart" 
              class="flex-1 bg-primary-600 hover:bg-primary-700 border-0 py-3 text-lg"
              :disabled="!product.inStock"
              @click="addToCart"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Estado de carga -->
  <div v-else-if="loading" class="max-w-7xl mx-auto px-4 py-8 text-center">
    <ProgressSpinner style="width: 50px; height: 50px" />
    <p class="mt-4 text-neutral-600">Cargando producto...</p>
  </div>

  <!-- Estado de error -->
  <div v-else class="max-w-7xl mx-auto px-4 py-8 text-center">
    <i class="pi pi-exclamation-triangle text-6xl text-secondary-600 mb-4"></i>
    <h2 class="text-2xl font-bold text-neutral-900 mb-4">Producto no encontrado</h2>
    <Button label="Volver a la tienda" icon="pi pi-arrow-left" @click="$router.push('/tienda')" ></Button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../../../stores/cartStore'
import { productService } from '../../../services/productService'
import { inventoryService } from '../../../services/inventoryService'

// Components
import Breadcrumb from 'primevue/breadcrumb'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Divider from 'primevue/divider'
import ProgressSpinner from 'primevue/progressspinner'

// Route and router
const route = useRoute()
const router = useRouter()
const productId = route.params.id

// State
const product = ref(null)
const loading = ref(true)
const quantity = ref(1)
const mainImage = ref('')

// Stores
const cartStore = useCartStore()

// Breadcrumb items
const home = ref({
  icon: 'pi pi-home',
  route: '/'
})


const items = computed(() => [
  { label: 'Productos', route: '/tienda' }, 
  { label: product.value?.categoria?.nombre || 'Categoría', route: '/tienda' }, // CAMBIA /productos por /tienda
  { label: product.value?.nombre || 'Producto' }
])


// Cargar producto
const loadProduct = async () => {
  loading.value = true
  try {
    // Obtener producto
    product.value = await productService.getProductById(productId)
    
    // Obtener stock
    const stock = await inventoryService.getStockByProduct(productId)
    product.value.stock = stock
    product.value.inStock = stock > 0
    
    // Establecer imagen principal
    mainImage.value = product.value.imagenUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop'
    
  } catch (err) {
    console.error('Error loading product:', err)
  } finally {
    loading.value = false
  }
}

// Event handlers
const addToCart = () => {
  if (!product.value.inStock) {
    // Mostrar notificación de error si no hay stock
    if (window.$toast) {
      window.$toast.add({
        group: 'app',
        severity: 'error',
        summary: 'Producto no disponible',
        detail: `${product.value.nombre} está agotado`,
        life: 3000
      })
    }
    return
  }
  
  // Agregar la cantidad seleccionada al carrito
  for (let i = 0; i < quantity.value; i++) {
    cartStore.addItem({
      id: product.value.id,
      name: product.value.nombre,
      price: product.value.precio,
      image: mainImage.value,
      category: product.value.categoria?.nombre,
      inStock: product.value.inStock,
      unit: product.value.unidad
    })
  }
  
  // Mostrar notificación de éxito
  if (window.$toast && quantity.value > 1) {
    window.$toast.add({
      group: 'app',
      severity: 'success',
      summary: 'Productos agregados',
      detail: `${quantity.value} ${product.value.nombre} añadidos al carrito`,
      life: 3000
    })
  }
  
  // Reset quantity
  quantity.value = 1
}

// Watch for route changes
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadProduct()
  }
})

// Lifecycle
onMounted(() => {
  loadProduct()
})
</script>

<style scoped>
/* Ocultar controles nativos del input number */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>