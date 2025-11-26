<template>
  <div class="featured-products">
    <h2 class="text-3xl font-bold text-neutral-900 mb-8">Productos de Temporada</h2>
    
    <div class="grid md:grid-cols-3 gap-8">
      <Card 
        v-for="product in featuredProducts" 
        :key="product.id"
        class="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-0"
      >
        <template #header>
          <div class="relative overflow-hidden h-64 bg-neutral-200">
            <img 
              :src="getProductImage(product)" 
              :alt="product.nombre"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div class="absolute top-4 right-4">
              <Tag :value="product.categoria?.nombre || 'General'" severity="success" class="font-semibold" />
            </div>
            <div class="absolute top-4 left-4">
              <Tag value="Temporada" severity="warning" class="font-bold" />
            </div>
          </div>
        </template>

        <template #title>
          <h3 class="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
            {{ product.nombre }}
          </h3>
        </template>

        <template #content>
          <p class="text-neutral-600 mb-4 line-clamp-2 text-sm">
            {{ product.descripcion || 'Sin descripción disponible' }}
          </p>

          <div class="flex items-center justify-between mb-4">
            <div class="text-2xl font-bold text-primary-600">
              ${{ (product.precio || 0).toFixed(2) }}
            </div>
            <div class="text-xs text-neutral-500">
              por {{ product.unidad || 'unidad' }}
            </div>
          </div>

          <div class="flex items-center justify-between">
            <Chip 
              v-if="product.inStock" 
              :label="`Stock: ${product.stock}`" 
              icon="pi pi-check-circle" 
              class="bg-primary-100 text-primary-700"
            />
            <Chip 
              v-else 
              label="Consultar stock" 
              icon="pi pi-question-circle" 
              severity="warning"
            />
          </div>
        </template>

        <template #footer>
          <!--  botón de agregar al carrito -->
          <Button 
            :label="product.inStock ? 'Añadir al Carrito' : 'No Disponible'" 
            icon="pi pi-shopping-cart" 
            class="w-full"
            :class="product.inStock ? 'bg-primary-600 hover:bg-primary-700 border-0' : 'bg-neutral-300 cursor-not-allowed'"
            :disabled="!product.inStock"
            @click="addToCart(product)"
          ></Button>
        </template>
      </Card>
    </div>

    <!-- Estado de carga -->
    <div v-if="loading" class="text-center py-8">
      <ProgressSpinner style="width: 50px; height: 50px" />
      <p class="mt-4 text-neutral-600">Cargando productos destacados...</p>
    </div>

    <!-- Estado vacío -->
    <div v-if="!loading && featuredProducts.length === 0" class="text-center py-8">
      <i class="pi pi-inbox text-4xl text-neutral-400 mb-4"></i>
      <p class="text-neutral-600">No hay productos destacados disponibles</p>
      <Button label="Reintentar" icon="pi pi-refresh" @click="loadFeaturedProducts" class="mt-4" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '../../../stores/cartStore'
import { productService } from '../../../services/productService'
import { inventoryService } from '../../../services/inventoryService'

// Components
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Chip from 'primevue/chip'
import ProgressSpinner from 'primevue/progressspinner'

// State
const featuredProducts = ref([])
const loading = ref(false)

// Stores
const cartStore = useCartStore()

// Cargar productos destacados - LOS 3 CON MÁS STOCK
const loadFeaturedProducts = async () => {
  loading.value = true
  try {
    console.log(' Cargando productos destacados...')
    
    const allProducts = await productService.getProducts()
    console.log(' Todos los productos:', allProducts)
    
    if (!allProducts || allProducts.length === 0) {
      featuredProducts.value = []
      return
    }
    
    // Obtener stock para TODOS los productos
    const productsWithStock = await Promise.all(
      allProducts.map(async (product) => {
        try {
          const stock = await inventoryService.getStockByProduct(product.id)
          console.log(` ${product.nombre} - Stock: ${stock}`)
          
          return {
            ...product,
            stock: stock,
            inStock: stock > 0,
            hasRealStock: true
          }
        } catch (error) {
          console.warn(` Sin stock info para ${product.nombre}, usando valor por defecto`)
          // Si no hay información de stock, asumimos que está disponible
          return {
            ...product,
            stock: 0, // Poner 0 para que no sea destacado si no tiene stock real
            inStock: false,
            hasRealStock: false
          }
        }
      })
    )
    
    // Filtrar solo productos con stock real y mayor a 0
    const productsWithRealStock = productsWithStock.filter(p => p.hasRealStock && p.inStock)
    
    console.log(` Productos con stock real: ${productsWithRealStock.length}`)
    
    if (productsWithRealStock.length > 0) {
      // Ordenar por stock descendente y tomar los 3 primeros
      featuredProducts.value = productsWithRealStock
        .sort((a, b) => b.stock - a.stock)
        .slice(0, 3)
      
      console.log(' Productos destacados (con stock real):', featuredProducts.value)
    } else {
      // Si no hay productos con stock real, usar los primeros 3 disponibles
      const availableProducts = productsWithStock
        .filter(p => p.inStock)
        .slice(0, 3)
      
      featuredProducts.value = availableProducts
      console.log(' Productos destacados (sin stock real):', featuredProducts.value)
    }
    
  } catch (error) {
    console.error(' Error crítico:', error)
    // Fallback: usar los primeros 3 productos
    try {
      const allProducts = await productService.getProducts()
      featuredProducts.value = allProducts.slice(0, 3).map(product => ({
        ...product,
        stock: 10,
        inStock: true,
        hasRealStock: false
      }))
    } catch (fallbackError) {
      featuredProducts.value = []
    }
  } finally {
    loading.value = false
  }
}

// Helper functions
const getProductImage = (product) => {
  return product.imagenUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop'
}

// Event handlers -  agregar al carrito
const addToCart = (product) => {
  if (!product.inStock) {
    if (window.$toast) {
      window.$toast.add({
        group: 'app',
        severity: 'error',
        summary: 'Producto no disponible',
        detail: `${product.nombre} está agotado`,
        life: 3000
      })
    }
    return
  }
  
  cartStore.addItem({
    id: product.id,
    name: product.nombre,
    price: product.precio || 0,
    image: getProductImage(product),
    category: product.categoria?.nombre,
    inStock: product.inStock,
    unit: product.unidad || 'unidad'
  })
}

// Lifecycle
onMounted(() => {
  loadFeaturedProducts()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>