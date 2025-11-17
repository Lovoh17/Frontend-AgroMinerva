<template>
  <Card class="product-card overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-0">
    <template #header>
      <div class="relative overflow-hidden h-56 bg-neutral-200">
        <img 
          :src="product.image" 
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        <!-- Badge de categoría -->
        <div class="absolute top-3 left-3">
          <Tag :value="product.category" severity="success" class="font-semibold" />
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

        <!-- Botones de acción rápida -->
        <div class="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            icon="pi pi-eye" 
            rounded
            severity="secondary"
            size="small"
            @click.stop="viewDetails"
            v-tooltip.top="'Ver detalles'"
          ></Button>
          <Button 
            icon="pi pi-heart" 
            rounded
            severity="secondary"
            size="small"
            @click.stop="addToWishlist"
            v-tooltip.top="'Agregar a favoritos'"
          ></Button>
        </div>
      </div>
    </template>

    <template #content>
      <div class="p-4">
        <!-- Nombre del producto -->
        <h3 class="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {{ product.name }}
        </h3>

        <!-- Descripción -->
        <p class="text-sm text-neutral-600 mb-3 line-clamp-2">
          {{ product.description }}
        </p>

        <!-- Rating y reviews -->
        <div class="flex items-center gap-2 mb-3">
          <Rating 
            :modelValue="product.rating" 
            :readonly="true" 
            :cancel="false"
            class="text-sm"
          />
          <span class="text-xs text-neutral-500">({{ product.reviews }})</span>
        </div>

        <!-- Precio -->
        <div class="flex items-center justify-between mb-4">
          <div class="text-2xl font-bold text-primary-600">
            ${{ product.price.toFixed(2) }}
          </div>
          <Chip 
            v-if="product.inStock" 
            label="Disponible" 
            icon="pi pi-check-circle" 
            class="bg-primary-100 text-primary-700 text-xs"
          />
        </div>

        <!-- Botón de agregar al carrito -->
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
import { defineProps } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Rating from 'primevue/rating'
import Chip from 'primevue/chip'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const addToCart = () => {
  if (props.product.inStock) {
    // TO-DO: Implementar con Pinia store
    console.log('Añadir al carrito:', props.product)
    // useCartStore().addItem(props.product)
  }
}

const addToWishlist = () => {
  // TO-DO: Implementar lógica de favoritos
  console.log('Añadir a favoritos:', props.product)
}

const viewDetails = () => {
  // TO-DO: Navegar a la página de detalles del producto
  console.log('Ver detalles de:', props.product)
  // router.push(`/producto/${props.product.id}`)
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