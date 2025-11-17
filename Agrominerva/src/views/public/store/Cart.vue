<template>
  <div class="container mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-3xl md:text-4xl font-extrabold mb-2 text-neutral-900">
        Mi Carrito de Compras
      </h1>
      <p class="text-neutral-600">
        <i class="pi pi-shopping-cart mr-2"></i>
        {{ cartItems.length }} {{ cartItems.length === 1 ? 'producto' : 'productos' }} en tu carrito
      </p>
    </div>

    <div v-if="cartItems.length > 0" class="grid lg:grid-cols-3 gap-8">
      <!-- Lista de productos en el carrito -->
      <div class="lg:col-span-2">
        <Card class="mb-4">
          <template #content>
            <div class="divide-y divide-neutral-200">
              <CartItem 
                v-for="item in cartItems" 
                :key="item.id"
                :item="item"
                @update-quantity="updateQuantity"
                @remove-item="removeItem"
              />
            </div>
          </template>
        </Card>

        <!-- Botón continuar comprando -->
        <router-link to="/tienda">
          <Button 
            label="Continuar Comprando" 
            icon="pi pi-arrow-left" 
            outlined
            class="w-full md:w-auto"
          ></Button>
        </router-link>
      </div>

      <!-- Resumen del pedido (sticky en desktop) -->
      <div class="lg:col-span-1">
        <div class="lg:sticky lg:top-4 space-y-4">
          <!-- Card de Resumen -->
          <Card>
            <template #title>
              <h2 class="text-xl font-bold text-neutral-900">Resumen del Pedido</h2>
            </template>
            
            <template #content>
              <div class="space-y-4">
                <!-- Subtotal -->
                <div class="flex justify-between text-neutral-700">
                  <span>Subtotal ({{ totalItems }} productos)</span>
                  <span class="font-semibold">${{ subtotal.toFixed(2) }}</span>
                </div>

                <!-- Descuentos (si aplica) -->
                <div v-if="discount > 0" class="flex justify-between text-secondary-600">
                  <span>Descuento</span>
                  <span class="font-semibold">-${{ discount.toFixed(2) }}</span>
                </div>

                <!-- Envío -->
                <div class="flex justify-between text-neutral-700">
                  <span>Envío</span>
                  <span class="font-semibold">{{ shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}` }}</span>
                </div>

                <Divider />

                <!-- Total -->
                <div class="flex justify-between text-lg font-bold text-neutral-900">
                  <span>Total</span>
                  <span class="text-primary-600">${{ total.toFixed(2) }}</span>
                </div>

                <!-- Código de descuento -->
                <div class="pt-4">
                  <div class="flex gap-2">
                    <InputText 
                      v-model="couponCode" 
                      placeholder="Código de descuento"
                      class="flex-1"
                    />
                    <Button 
                      label="Aplicar" 
                      @click="applyCoupon"
                      outlined
                    ></Button>
                  </div>
                  <p v-if="couponMessage" class="text-sm mt-2" :class="couponValid ? 'text-primary-600' : 'text-secondary-600'">
                    <i :class="couponValid ? 'pi pi-check-circle' : 'pi pi-times-circle'" class="mr-1"></i>
                    {{ couponMessage }}
                  </p>
                </div>

                <Divider />

                <!-- Botón de WhatsApp para confirmar orden -->
                <Button 
                  label="Confirmar Pedido por WhatsApp" 
                  icon="pi pi-whatsapp" 
                  class="w-full bg-[#25D366] hover:bg-[#20BA5A] border-0 text-white font-bold text-lg py-3"
                  @click="confirmOrderWhatsApp"
                ></Button>

                <!-- Información adicional -->
                <div class="bg-primary-50 p-4 rounded-lg border border-primary-200 mt-4">
                  <p class="text-sm text-neutral-700">
                    <i class="pi pi-info-circle text-primary-600 mr-2"></i>
                    Al confirmar, serás redirigido a WhatsApp para completar tu orden
                  </p>
                </div>
              </div>
            </template>
          </Card>

          <!-- Métodos de pago aceptados -->
          <Card>
            <template #content>
              <div class="text-center">
                <p class="text-sm text-neutral-600 mb-3">Métodos de pago aceptados</p>
                <div class="flex justify-center gap-3 flex-wrap">
                  <i class="pi pi-credit-card text-2xl text-neutral-400"></i>
                  <i class="pi pi-paypal text-2xl text-neutral-400"></i>
                  <i class="pi pi-wallet text-2xl text-neutral-400"></i>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>

    <!-- Carrito vacío -->
    <div v-else class="text-center py-16">
      <div class="mb-6">
        <i class="pi pi-shopping-cart text-8xl text-neutral-300"></i>
      </div>
      <h2 class="text-2xl font-bold text-neutral-700 mb-4">Tu carrito está vacío</h2>
      <p class="text-neutral-500 mb-8">
        Explora nuestro catálogo y encuentra los productos perfectos para ti
      </p>
      <router-link to="/tienda">
        <Button 
          label="Ir a la Tienda" 
          icon="pi pi-shopping-bag" 
          class="bg-primary-600 hover:bg-primary-700 border-0"
        ></Button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'
import CartItem from '@/components/public/store/CartItem.vue'

// Mock de items en el carrito (Reemplazar con Pinia store)
const cartItems = ref([
  {
    id: 101,
    name: 'Carne de Conejo Fresca',
    price: 2.50,
    quantity: 4,
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=200&h=200&fit=crop',
    category: 'Productos Frescos',
    inStock: true
  },
  {
    id: 102,
    name: 'Pepino Fresco',
    price: 0.20,
    quantity: 12,
    image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=200&h=200&fit=crop',
    category: 'Productos Frescos',
    inStock: true
  },
  {
    id: 103,
    name: 'Miel de Abeja Pura 16oz',
    price: 8.50,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=400&fit=crop',
    category: 'Productos Frescos',
    inStock: true
  },
  {
    id: 107,
    name: 'Limón Criollo',
    price: 0.15,
    quantity: 20,
    image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=200&h=200&fit=crop',
    category: 'Productos Frescos',
    inStock: true
  }
])

// Estado del cupón
const couponCode = ref('')
const couponMessage = ref('')
const couponValid = ref(false)
const discount = ref(0)

// Cálculos
const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const shipping = computed(() => {
  // Envío gratis para compras mayores a $100
  return subtotal.value > 100 ? 0 : 10.00
})

const total = computed(() => {
  return subtotal.value + shipping.value - discount.value
})

// Funciones
const updateQuantity = (itemId, newQuantity) => {
  const item = cartItems.value.find(i => i.id === itemId)
  if (item && newQuantity > 0) {
    item.quantity = newQuantity
  }
}

const removeItem = (itemId) => {
  const index = cartItems.value.findIndex(i => i.id === itemId)
  if (index > -1) {
    cartItems.value.splice(index, 1)
  }
}

const applyCoupon = () => {
  // Mock de validación de cupón
  const validCoupons = {
    'AGRO10': 10,
    'VERANO20': 20,
    'ESTUDIANTE15': 15
  }

  if (validCoupons[couponCode.value.toUpperCase()]) {
    const discountPercent = validCoupons[couponCode.value.toUpperCase()]
    discount.value = (subtotal.value * discountPercent) / 100
    couponValid.value = true
    couponMessage.value = `¡Cupón aplicado! ${discountPercent}% de descuento`
  } else {
    discount.value = 0
    couponValid.value = false
    couponMessage.value = 'Cupón inválido o expirado'
  }
}

const confirmOrderWhatsApp = () => {
  // Generar mensaje para WhatsApp
  let message = '¡Hola! Me gustaría confirmar mi pedido:\n\n'
  
  cartItems.value.forEach(item => {
    message += `• ${item.name}\n  Cantidad: ${item.quantity}\n  Precio: $${(item.price * item.quantity).toFixed(2)}\n\n`
  })
  
  message += `*Subtotal:* $${subtotal.value.toFixed(2)}\n`
  
  if (discount.value > 0) {
    message += `*Descuento:* -$${discount.value.toFixed(2)}\n`
  }
  
  message += `*Envío:* ${shipping.value === 0 ? 'Gratis' : `$${shipping.value.toFixed(2)}`}\n`
  message += `*Total:* $${total.value.toFixed(2)}`

  // Número de WhatsApp de la tienda 
  const whatsappNumber = '50312345678' // Ejemplo: +503 1234-5678
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
  
  window.open(whatsappUrl, '_blank')
}
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>