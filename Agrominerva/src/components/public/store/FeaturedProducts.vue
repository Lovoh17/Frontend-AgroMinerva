<template>
  <div class="featured-products">
    <div class="grid md:grid-cols-3 gap-8">
      <Card 
        v-for="product in seasonalProducts" 
        :key="product.id"
        class="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-0"
      >
        <template #header>
          <div class="relative overflow-hidden h-64 bg-neutral-200">
            <img 
              :src="product.image" 
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div class="absolute top-4 right-4">
              <Tag :value="product.category" severity="success" class="font-semibold" />
            </div>
            <div v-if="product.discount" class="absolute top-4 left-4">
              <Tag :value="`-${product.discount}%`" severity="danger" class="font-bold text-lg" />
            </div>
          </div>
        </template>

        <template #title>
          <h3 class="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
            {{ product.name }}
          </h3>
        </template>

        <template #content>
          <p class="text-neutral-600 mb-4 line-clamp-2 text-sm">
            {{ product.description }}
          </p>

          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-1">
              <Rating :modelValue="product.rating" :readonly="true" :cancel="false" class="text-sm" />
              <span class="text-neutral-500 text-sm ml-2">({{ product.reviews }})</span>
            </div>
          </div>

          <div class="flex items-center justify-between mb-4">
            <div>
              <div v-if="product.discount" class="text-sm text-neutral-400 line-through">
                ${{ product.originalPrice.toFixed(2) }}
              </div>
              <div class="text-2xl font-bold text-primary-600">
                ${{ product.price.toFixed(2) }}
              </div>
              <div class="text-xs text-neutral-500 mt-1">
                por {{ product.unit }}
              </div>
            </div>
            <Chip 
              v-if="product.inStock" 
              label="En Stock" 
              icon="pi pi-check-circle" 
              class="bg-primary-100 text-primary-700"
            />
            <Chip 
              v-else 
              label="Agotado" 
              icon="pi pi-times-circle" 
              severity="danger"
            />
          </div>
        </template>

        <template #footer>
          <div class="flex gap-2">
            <Button 
              label="Añadir al Carrito" 
              icon="pi pi-shopping-cart" 
              class="flex-1 bg-primary-600 hover:bg-primary-700 border-0"
              :disabled="!product.inStock"
              @click="addToCart(product)"
            />
            <Button 
              icon="pi pi-heart" 
              severity="secondary"
              outlined
              @click="addToWishlist(product)"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Rating from 'primevue/rating'
import Chip from 'primevue/chip'

// Productos de temporada de AgroMinerva (máximo 3)
const seasonalProducts = ref([
  {
    id: 101,
    name: 'Carne de Conejo Fresca',
    description: 'Carne de conejo de alta calidad, criada en nuestras instalaciones. Rica en proteínas y baja en grasas. Ideal para una alimentación saludable.',
    price: 2.50,
    originalPrice: 3.00,
    discount: 17,
    rating: 4.9,
    reviews: 87,
    category: 'Temporada',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&h=400&fit=crop',
    inStock: true,
    unit: 'libra'
  },
  {
    id: 102,
    name: 'Pepino Fresco',
    description: 'Pepinos frescos cultivados de manera orgánica en nuestros invernaderos. Crujientes, jugosos y perfectos para ensaladas.',
    price: 0.20,
    originalPrice: 0.25,
    discount: 20,
    rating: 4.7,
    reviews: 145,
    category: 'Temporada',
    image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=600&h=400&fit=crop',
    inStock: true,
    unit: 'unidad'
  },
  {
    id: 103,
    name: 'Miel de Abeja Pura',
    description: 'Miel 100% natural producida por nuestras abejas. Sin aditivos ni conservantes. Endulza naturalmente y aporta beneficios para la salud.',
    price: 8.50,
    originalPrice: 10.00,
    discount: 15,
    rating: 5.0,
    reviews: 203,
    category: 'Temporada',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=400&fit=crop',
    inStock: true,
    unit: 'frasco 16oz'
  }
])

const addToCart = (product) => {
  // TODO: Implementar lógica con Pinia store
  console.log('Añadir al carrito:', product)
  // useCartStore().addItem(product)
}

const addToWishlist = (product) => {
  // TODO: Implementar lógica de favoritos
  console.log('Añadir a favoritos:', product)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>