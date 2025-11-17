<template>
  <div class="cart-item py-6 first:pt-0 last:pb-0">
    <div class="flex flex-col sm:flex-row gap-4">
      <!-- Imagen del producto -->
      <div class="flex-shrink-0">
        <img 
          :src="item.image" 
          :alt="item.name"
          class="w-full sm:w-32 h-32 object-cover rounded-lg border border-neutral-200"
        />
      </div>

      <!-- Información del producto -->
      <div class="flex-1 flex flex-col sm:flex-row justify-between gap-4">
        <div class="flex-1">
          <!-- Nombre y categoría -->
          <div class="mb-2">
            <h3 class="text-lg font-bold text-neutral-900 mb-1">
              {{ item.name }}
            </h3>
            <Tag :value="item.category" severity="success" class="text-xs" />
          </div>

          <!-- Precio unitario -->
          <div class="text-sm text-neutral-600 mb-3">
            Precio unitario: <span class="font-semibold text-neutral-900">${{ item.price.toFixed(2) }}</span>
          </div>

          <!-- Controles de cantidad (móvil) -->
          <div class="flex items-center gap-4 sm:hidden">
            <div class="flex items-center gap-2">
              <span class="text-sm text-neutral-600 font-medium">Cantidad:</span>
              <div class="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white">
                <Button 
                  icon="pi pi-minus" 
                  text
                  size="small"
                  class="px-2 py-2 hover:bg-neutral-100 flex-shrink-0"
                  :disabled="item.quantity <= 1"
                  @click="decreaseQuantity"
                />
                <input 
                  type="number"
                  v-model.number="localQuantity"
                  :min="1"
                  :max="99"
                  class="w-14 text-center border-0 focus:outline-none focus:ring-0 py-2 text-sm"
                  @blur="updateQuantityValue"
                  @input="handleInput"
                />
                <Button 
                  icon="pi pi-plus" 
                  text
                  size="small"
                  class="px-2 py-2 hover:bg-neutral-100 flex-shrink-0"
                  @click="increaseQuantity"
                />
              </div>
            </div>

            <!-- Botón eliminar (móvil) -->
            <Button 
              icon="pi pi-trash" 
              severity="danger"
              text
              size="small"
              @click="confirmRemove"
              v-tooltip.top="'Eliminar'"
            />
          </div>

          <!-- Disponibilidad -->
          <div class="flex items-center gap-2 mt-2">
            <i 
              :class="item.inStock ? 'pi pi-check-circle text-primary-600' : 'pi pi-times-circle text-secondary-600'"
            ></i>
            <span 
              class="text-sm font-medium"
              :class="item.inStock ? 'text-primary-600' : 'text-secondary-600'"
            >
              {{ item.inStock ? 'En stock' : 'No disponible' }}
            </span>
          </div>
        </div>

        <!-- Controles de cantidad y precio (desktop) -->
        <div class="hidden sm:flex flex-col items-end justify-between min-w-[200px]">
          <!-- Controles de cantidad -->
          <div class="flex items-center gap-2 mb-4">
            <span class="text-sm text-neutral-600 font-medium">Cantidad:</span>
            <div class="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white">
              <Button 
                icon="pi pi-minus" 
                text
                size="small"
                class="px-2 py-2 hover:bg-neutral-100 flex-shrink-0"
                :disabled="item.quantity <= 1"
                @click="decreaseQuantity"
              />
              <input 
                type="number"
                v-model.number="localQuantity"
                :min="1"
                :max="99"
                class="w-14 text-center border-0 focus:outline-none focus:ring-0 py-2 text-sm"
                @blur="updateQuantityValue"
                @input="handleInput"
              />
              <Button 
                icon="pi pi-plus" 
                text
                size="small"
                class="px-2 py-2 hover:bg-neutral-100 flex-shrink-0"
                @click="increaseQuantity"
              />
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
            text
            size="small"
            @click="confirmRemove"
          />
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
import { ref, computed, watch } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-quantity', 'remove-item'])
const confirm = useConfirm()

// Cantidad local para el input
const localQuantity = ref(props.item.quantity)

// Watch para sincronizar con cambios externos
watch(() => props.item.quantity, (newValue) => {
  localQuantity.value = newValue
})

// Subtotal del item
const itemSubtotal = computed(() => {
  return props.item.price * props.item.quantity
})

// Funciones de cantidad
const increaseQuantity = () => {
  if (localQuantity.value < 99) {
    localQuantity.value++
    emit('update-quantity', props.item.id, localQuantity.value)
  }
}

const decreaseQuantity = () => {
  if (localQuantity.value > 1) {
    localQuantity.value--
    emit('update-quantity', props.item.id, localQuantity.value)
  }
}

const handleInput = (e) => {
  let value = parseInt(e.target.value) || 1
  if (value < 1) value = 1
  if (value > 99) value = 99
  localQuantity.value = value
}

const updateQuantityValue = () => {
  if (localQuantity.value < 1) {
    localQuantity.value = 1
  } else if (localQuantity.value > 99) {
    localQuantity.value = 99
  }
  emit('update-quantity', props.item.id, localQuantity.value)
}

// Confirmar eliminación
const confirmRemove = () => {
  confirm.require({
    message: `¿Estás seguro de eliminar "${props.item.name}" del carrito?`,
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
  transition: background-color 0.2s;
}

.cart-item:hover {
  background-color: rgba(0, 0, 0, 0.01);
}

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