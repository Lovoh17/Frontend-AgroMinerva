<template>
  <div class="container mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-3xl md:text-4xl font-extrabold mb-2 text-neutral-900">
        Mi Carrito de Compras
      </h1>
      <p class="text-neutral-600">
        <i class="pi pi-shopping-cart mr-2"></i>
        {{ cartStore.items.length }} {{ cartStore.items.length === 1 ? 'producto' : 'productos' }} en tu carrito
      </p>
    </div>

    <div v-if="cartStore.items.length > 0" class="grid lg:grid-cols-3 gap-8">
      <!-- Lista de productos en el carrito -->
      <div class="lg:col-span-2">
        <Card class="mb-4">
          <template #content>
            <div class="divide-y divide-neutral-200">
              <CartItem 
                v-for="item in cartStore.items" 
                :key="item.id"
                :item="item"
                @update-quantity="cartStore.updateQuantity"
                @remove-item="cartStore.removeItem"
              />
            </div>
          </template>
        </Card>

        <!-- Acciones adicionales -->
        <div class="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <router-link to="/tienda">
            <Button 
              label="Continuar Comprando" 
              icon="pi pi-arrow-left" 
              outlined
              class="w-full sm:w-auto"
            ></Button>
          </router-link>
          
          <Button 
            label="Vaciar Carrito" 
            icon="pi pi-trash" 
            severity="danger" 
            outlined
            @click="confirmClearCart"
            class="w-full sm:w-auto"
          ></Button>
        </div>
      </div>

      <!-- Resumen del pedido -->
      <div class="lg:col-span-1">
        <div class="lg:sticky lg:top-4 space-y-4">
          <Card>
            <template #title>
              <h2 class="text-xl font-bold text-neutral-900">Resumen del Pedido</h2>
            </template>
            
            <template #content>
              <div class="space-y-4">
                <div class="flex justify-between text-neutral-700">
                  <span>Subtotal ({{ cartStore.totalItems }} productos)</span>
                  <span class="font-semibold">${{ cartStore.totalPrice.toFixed(2) }}</span>
                </div>

                <div v-if="discount > 0" class="flex justify-between text-green-600">
                  <span>Descuento</span>
                  <span class="font-semibold">-${{ discount.toFixed(2) }}</span>
                </div>

                <!-- ENVÍO GRATIS - RETIRO EN LOCAL -->
                <div class="flex justify-between text-neutral-700">
                  <span>Envío</span>
                  <span class="font-semibold text-green-600">Gratis</span>
                </div>

                <Divider />

                <div class="flex justify-between text-lg font-bold text-neutral-900">
                  <span>Total</span>
                  <span class="text-primary-600">${{ total.toFixed(2) }}</span>
                </div>

                <Divider />

                <!-- Información de retiro en local -->
                <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div class="flex items-start gap-3">
                    <i class="pi pi-map-marker text-green-600 text-lg mt-1"></i>
                    <div>
                      <p class="text-sm font-semibold text-green-800 mb-1">Retiro en Local</p>
                      <p class="text-xs text-green-700">
                        Facultad Multidisciplinaria Oriental<br>
                        Universidad de El Salvador, San Miguel
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  label="Confirmar Pedido por WhatsApp" 
                  icon="pi pi-whatsapp" 
                  class="w-full bg-[#25D366] hover:bg-[#20BA5A] border-0 text-white font-bold text-lg py-3"
                  @click="confirmOrderWhatsApp"
                  :disabled="cartStore.items.length === 0"
                ></Button>

                <div class="bg-primary-50 p-4 rounded-lg border border-primary-200">
                  <p class="text-sm text-neutral-700">
                    <i class="pi pi-info-circle text-primary-600 mr-2"></i>
                    Al confirmar, serás redirigido a WhatsApp para coordinar tu pedido
                  </p>
                </div>
              </div>
            </template>
          </Card>

          <!-- Información de contacto -->
          <Card>
            <template #content>
              <div class="space-y-3">
                <h3 class="font-semibold text-neutral-900 mb-3">Información de Contacto</h3>
                
                <div class="flex items-center gap-3 text-sm text-neutral-700">
                  <i class="pi pi-phone text-primary-600"></i>
                  <span><strong>WhatsApp:</strong> 7483-3786</span>
                </div>
                
                <div class="flex items-start gap-3 text-sm text-neutral-700">
                  <i class="pi pi-map-marker text-primary-600 mt-1"></i>
                  <div>
                    <strong>Dirección:</strong><br>
                    Facultad Multidisciplinaria Oriental<br>
                    Universidad de El Salvador<br>
                    Carretera al Cuco Km 144, San Miguel
                  </div>
                </div>

                <div class="flex items-center gap-3 text-sm text-neutral-700">
                  <i class="pi pi-clock text-primary-600"></i>
                  <span><strong>Horario:</strong> Lunes a Viernes 8:00 AM - 4:00 PM</span>
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
      <p class="text-neutral-500 mb-8 max-w-md mx-auto">
        Aún no has agregado productos a tu carrito. 
        Explora nuestro catálogo y descubre productos frescos y de calidad.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link to="/tienda">
          <Button 
            label="Explorar Productos" 
            icon="pi pi-shopping-bag" 
            class="bg-primary-600 hover:bg-primary-700 border-0 text-lg py-3 px-6"
          ></Button>
        </router-link>
        <router-link to="/">
          <Button 
            label="Volver al Inicio" 
            icon="pi pi-home" 
            outlined
            class="text-lg py-3 px-6"
          ></Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '../../../stores/cartStore'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import CartItem from '@/components/public/store/CartItem.vue'

const cartStore = useCartStore()
const confirm = useConfirm()
const toast = useToast()

// Configurar el toast global para el store
onMounted(() => {
  window.$toast = toast
  cartStore.loadFromLocalStorage()
})

const discount = ref(0)

// ENVÍO SIEMPRE GRATIS - RETIRO EN LOCAL
const shipping = computed(() => 0)

const total = computed(() => {
  return cartStore.totalPrice + shipping.value - discount.value
})

// Confirmar vaciar carrito
const confirmClearCart = () => {
  confirm.require({
    message: '¿Estás seguro de vaciar todo el carrito? Esta acción no se puede deshacer.',
    header: 'Confirmar Vaciar Carrito',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sí, vaciar carrito',
    rejectLabel: 'Cancelar',
    acceptClass: 'p-button-danger',
    accept: () => {
      cartStore.clearCart()
    }
  })
}

// Confirmar pedido por WhatsApp - SÍ LIMPIAR CARRITO
const confirmOrderWhatsApp = () => {
  if (cartStore.items.length === 0) {
    toast.add({ 
      severity: 'warn', 
      summary: 'Carrito vacío', 
      detail: 'Agrega productos al carrito antes de confirmar', 
      life: 3000 
    })
    return
  }

  let message = '¡Hola! Me gustaría confirmar mi pedido en AgroMinerva - UES San Miguel:\n\n'
  
  cartStore.items.forEach(item => {
    message += ` *${item.name}*\n`
    message += `   Cantidad: ${item.quantity} ${item.unit}\n`
    message += `   Precio unitario: $${item.price.toFixed(2)}\n`
    message += `   Subtotal: $${(item.price * item.quantity).toFixed(2)}\n\n`
  })
  
  message += ` *RESUMEN DEL PEDIDO:*\n`
  message += `Subtotal: $${cartStore.totalPrice.toFixed(2)}\n`
  message += `Envío: Gratis (Retiro en local)\n`
  if (discount.value > 0) {
    message += `Descuento: -$${discount.value.toFixed(2)}\n`
  }
  message += `*TOTAL: $${total.value.toFixed(2)}*\n\n`
  message += ` *Lugar de retiro:*\n`
  message += `Facultad Multidisciplinaria Oriental\n`
  message += `Universidad de El Salvador, San Miguel\n`
  message += `Carretera al Cuco Km 144\n\n`
  message += `Por favor, confirmen disponibilidad y coordinen el retiro. ¡Gracias!`

  const whatsappNumber = '50374833786'
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
  
  // Mostrar confirmación antes de redirigir
  confirm.require({
    message: '¿Estás listo para confirmar tu pedido? Serás redirigido a WhatsApp y el carrito se limpiará.',
    header: 'Confirmar Pedido',
    icon: 'pi pi-whatsapp',
    acceptLabel: 'Sí, confirmar y limpiar carrito',
    rejectLabel: 'Cancelar',
    acceptClass: 'p-button-success',
    accept: () => {
      //  SÍ LIMPIAR EL CARRITO 
      cartStore.clearCart()
      
      // Redirigir a WhatsApp
      window.open(whatsappUrl, '_blank')
      
      // Mostrar notificación de éxito
      toast.add({
        severity: 'success',
        summary: 'Pedido confirmado',
        detail: 'Tu pedido ha sido enviado por WhatsApp. El carrito se ha limpiado.',
        life: 5000
      })
    }
  })
}
</script>

<style scoped>
.container {
  min-height: 70vh;
}
</style>