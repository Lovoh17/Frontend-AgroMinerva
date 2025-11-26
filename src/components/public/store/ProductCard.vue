<template>
  <Card class="product-card overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-0">
    <template #header>
      <div class="relative overflow-hidden h-56 bg-neutral-200">
        <img 
          :src="getProductImage(product)" 
          :alt="product.nombre"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        <!-- Badge de categoría -->
        <div class="absolute top-3 left-3">
          <Tag :value="product.categoria?.nombre || 'General'" severity="success" class="font-semibold" />
        </div>

        <!-- Badge de stock -->
        <div class="absolute top-3 right-3">
          <Tag 
            v-if="!product.inStock" 
            value="Agotado" 
            severity="danger" 
            icon="pi pi-times-circle"
          />
        </div>
      </div>
    </template>

    <template #content>
      <div class="p-4">
        <!-- Nombre del producto -->
        <h3 class="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {{ product.nombre }}
        </h3>

        <!-- Descripción -->
        <p class="text-sm text-neutral-600 mb-3 line-clamp-2">
          {{ product.descripcion }}
        </p>

        <!-- Precio -->
        <div class="flex items-center justify-between mb-4">
          <div class="text-2xl font-bold text-primary-600">
            ${{ product.precio?.toFixed(2) || '0.00' }}
          </div>
          <Chip 
            v-if="product.inStock" 
            label="Disponible" 
            icon="pi pi-check-circle" 
            class="bg-primary-100 text-primary-700 text-xs"
          />
        </div>

       
        <Button 
          :label="product.inStock ? 'Añadir al Carrito' : 'No Disponible'" 
          icon="pi pi-shopping-cart" 
          class="w-full"
          :class="product.inStock ? 'bg-primary-600 hover:bg-primary-700 border-0' : 'bg-neutral-300 cursor-not-allowed'"
          :disabled="!product.inStock"
          @click="addToCart"
        ></Button>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { useCartStore } from '../../../stores/cartStore'

// Components
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Chip from 'primevue/chip'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

// Helper functions
const getProductImage = (product) => {
  return product.imagenUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop'
}

// Event handlers - SOLO agregar al carrito
const addToCart = () => {
  if (!props.product.inStock) {
    // Mostrar notificación de error si no hay stock
    if (window.$toast) {
      window.$toast.add({
        group: 'app',
        severity: 'error',
        summary: 'Producto no disponible',
        detail: `${props.product.nombre} está agotado`,
        life: 3000
      })
    }
    return
  }
  
  cartStore.addItem({
    id: props.product.id,
    name: props.product.nombre,
    price: props.product.precio,
    image: getProductImage(props.product),
    category: props.product.categoria?.nombre,
    inStock: props.product.inStock,
    unit: props.product.unidad
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card :deep(.p-card-body) {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.product-card :deep(.p-card-content) {
  flex: 1;
  padding: 0;
}
</style>