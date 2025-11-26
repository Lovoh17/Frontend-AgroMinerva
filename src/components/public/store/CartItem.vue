<template>
  <div class="cart-item py-6 first:pt-0 last:pb-0 transition-all duration-200 hover:bg-neutral-50 rounded-lg px-4">
    <div class="flex flex-col sm:flex-row gap-4">
      <!-- Imagen del producto -->
      <div class="flex-shrink-0">
        <img 
          :src="item.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop'" 
          :alt="item.name || 'Producto'"
          class="w-full sm:w-32 h-32 object-cover rounded-lg border border-neutral-200 shadow-sm"
        />
      </div>

      <!-- Información del producto -->
      <div class="flex-1 flex flex-col sm:flex-row justify-between gap-4">
        <div class="flex-1">
          <!-- Nombre y categoría -->
          <div class="mb-2">
            <h3 class="text-lg font-bold text-neutral-900 mb-1 hover:text-primary-600 cursor-pointer transition-colors">
              {{ item.name || 'Producto sin nombre' }}
            </h3>
            <Tag v-if="item.category" :value="item.category" severity="success" class="text-xs" />
          </div>

          <!-- Precio unitario -->
          <div class="text-sm text-neutral-600 mb-3">
            <span class="font-semibold text-primary-600">${{ (item.price || 0).toFixed(2) }}</span> 
            <span class="text-neutral-500" v-if="item.unit"> cada {{ item.unit }}</span>
          </div>

          <!-- Controles de cantidad (móvil) -->
          <div class="flex items-center gap-4 sm:hidden">
            <div class="flex items-center gap-2">
              <span class="text-sm text-neutral-600 font-medium">Cantidad:</span>
              <div class="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white shadow-sm">
                <Button 
                  icon="pi pi-minus" 
                  text
                  size="small"
                  class="px-3 py-2 hover:bg-neutral-100 flex-shrink-0 transition-colors"
                  :disabled="item.quantity <= 1"
                  @click="decreaseQuantity"
                ></Button>
                <span class="w-12 text-center py-2 text-sm font-semibold text-neutral-800">
                  {{ item.quantity || 1 }}
                </span>
                <Button 
                  icon="pi pi-plus" 
                  text
                  size="small"
                  class="px-3 py-2 hover:bg-neutral-100 flex-shrink-0 transition-colors"
                  @click="increaseQuantity"
                ></Button>
              </div>
            </div>

            <!-- Botón eliminar (móvil) -->
            <Button 
              icon="pi pi-trash" 
              severity="danger"
              text
              size="small"
              @click="confirmRemove"
              v-tooltip.top="'Eliminar del carrito'"
              class="hover:bg-red-50 transition-colors"
            ></Button>
          </div>

          <!-- Disponibilidad -->
          <div class="flex items-center gap-2 mt-2">
            <i 
              :class="(item.inStock !== false) ? 'pi pi-check-circle text-green-600' : 'pi pi-times-circle text-red-600'"
            ></i>
            <span 
              class="text-sm font-medium"
              :class="(item.inStock !== false) ? 'text-green-600' : 'text-red-600'"
            >
              {{ (item.inStock !== false) ? 'Disponible' : 'No disponible' }}
            </span>
          </div>
        </div>

        <!-- Controles de cantidad y precio (desktop) -->
        <div class="hidden sm:flex flex-col items-end justify-between min-w-[200px]">
          <!-- Controles de cantidad -->
          <div class="flex items-center gap-3 mb-4">
            <span class="text-sm text-neutral-600 font-medium">Cantidad:</span>
            <div class="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white shadow-sm">
              <Button 
                icon="pi pi-minus" 
                text
                size="small"
                class="px-3 py-2 hover:bg-neutral-100 flex-shrink-0 transition-colors"
                :disabled="item.quantity <= 1"
                @click="decreaseQuantity"
              ></Button>
              <span class="w-12 text-center py-2 text-sm font-semibold text-neutral-800">
                {{ item.quantity || 1 }}
              </span>
              <Button 
                icon="pi pi-plus" 
                text
                size="small"
                class="px-3 py-2 hover:bg-neutral-100 flex-shrink-0 transition-colors"
                @click="increaseQuantity"
              ></Button>
            </div>
          </div>

          <!-- Subtotal del producto -->
          <div class="text-right mb-4">
            <div class="text-sm text-neutral-600 mb-1">Subtotal</div>
            <div class="text-2xl font-bold text-primary-600">
              ${{ itemSubtotal.toFixed(2) }}
            </div>
          </div>

          <!-- Botón eliminar -->
          <Button 
            label="Eliminar" 
            icon="pi pi-trash" 
            severity="danger"
            outlined
            size="small"
            @click="confirmRemove"
            class="hover:bg-red-50 transition-colors"
          ></Button>
        </div>
      </div>
    </div>

    <!-- Subtotal (móvil) -->
    <div class="sm:hidden mt-4 pt-4 border-t border-neutral-200">
      <div class="flex justify-between items-center">
        <span class="text-neutral-600 font-medium">Subtotal:</span>
        <span class="text-xl font-bold text-primary-600">${{ itemSubtotal.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      name: 'Producto',
      price: 0,
      image: '',
      category: '',
      inStock: true,
      unit: 'unidad',
      quantity: 1
    })
  }
})

const emit = defineEmits(['update-quantity', 'remove-item'])
const confirm = useConfirm()

// Subtotal del item 
const itemSubtotal = computed(() => {
  const price = props.item.price || 0
  const quantity = props.item.quantity || 1
  return price * quantity
})

// Funciones de cantidad
const increaseQuantity = () => {
  const currentQuantity = props.item.quantity || 1
  if (currentQuantity < 99) {
    emit('update-quantity', props.item.id, currentQuantity + 1)
  }
}

const decreaseQuantity = () => {
  const currentQuantity = props.item.quantity || 1
  if (currentQuantity > 1) {
    emit('update-quantity', props.item.id, currentQuantity - 1)
  }
}

// Confirmar eliminación
const confirmRemove = () => {
  confirm.require({
    message: `¿Estás seguro de eliminar "${props.item.name || 'este producto'}" del carrito?`,
    header: 'Confirmar Eliminación',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sí, eliminar',
    rejectLabel: 'Cancelar',
    acceptClass: 'p-button-danger',
    accept: () => {
      emit('remove-item', props.item.id)
    }
  })
}
</script>

<style scoped>
.cart-item {
  transition: all 0.2s ease-in-out;
}

.cart-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
}
</style>