//  src/stores/cartStore.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + (item.quantity || 1), 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 1)), 0),
    itemCount: (state) => (productId) => {
      const item = state.items.find(item => item.id === productId)
      return item ? (item.quantity || 1) : 0
    }
  },

  actions: {
    // Agregar item al carrito 
    addItem(product) {
      // Validar que el producto tenga los datos mínimos
      if (!product || !product.id) {
        console.error(' Producto inválido:', product)
        return
      }

      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1
        this.showNotification('success', 'Producto actualizado', `${product.name || 'Producto'} cantidad aumentada a ${existingItem.quantity}`)
      } else {
        // Crear item con valores por defecto
        const newItem = {
          id: product.id,
          name: product.name || 'Producto sin nombre',
          price: product.price || 0,
          image: product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop',
          category: product.category || '',
          inStock: product.inStock !== false,
          unit: product.unit || 'unidad',
          quantity: 1
        }
        this.items.push(newItem)
        this.showNotification('success', 'Producto agregado', `${newItem.name} se añadió al carrito`)
      }
      
      this.saveToLocalStorage()
      console.log(' Carrito actualizado:', this.items)
    },

    // Actualizar cantidad
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId)
        } else {
          const oldQuantity = item.quantity || 1
          item.quantity = quantity
          this.showNotification('info', 'Cantidad actualizada', `${item.name || 'Producto'} actualizado de ${oldQuantity} a ${quantity}`)
        }
        this.saveToLocalStorage()
      }
    },

    // Eliminar item
    removeItem(productId) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        this.items = this.items.filter(item => item.id !== productId)
        this.showNotification('warn', 'Producto eliminado', `${item.name || 'Producto'} fue removido del carrito`)
        this.saveToLocalStorage()
      }
    },

    // Limpiar carrito
    clearCart() {
      this.items = []
      this.saveToLocalStorage()
      this.showNotification('info', 'Carrito vaciado', 'Todos los productos fueron removidos')
    },

    // Mostrar notificación 
    showNotification(severity, summary, detail) {
      console.log(` [${severity.toUpperCase()}] ${summary}: ${detail}`)
      
      // Buscar el toast service global
      if (typeof window !== 'undefined' && window.$toast) {
        window.$toast.add({ 
          group: 'app',
          severity: severity, 
          summary: summary, 
          detail: detail, 
          life: 3000 
        })
      } else {
        console.warn(' Toast no disponible, notificación no mostrada:', { severity, summary, detail })
      }
    },

    // Persistencia en localStorage 
    saveToLocalStorage() {
      try {
        // Filtrar items válidos antes de guardar
        const validItems = this.items.filter(item => 
          item && item.id && typeof item.quantity === 'number'
        )
        localStorage.setItem('agrominerva-cart', JSON.stringify(validItems))
      } catch (error) {
        console.error(' Error guardando carrito:', error)
      }
    },

    loadFromLocalStorage() {
      try {
        const saved = localStorage.getItem('agrominerva-cart')
        if (saved) {
          const parsed = JSON.parse(saved)
          // Validar y limpiar datos corruptos
          this.items = parsed.filter(item => 
            item && 
            item.id && 
            typeof item.quantity === 'number' &&
            item.quantity > 0
          )
          console.log(' Carrito cargado desde localStorage:', this.items)
        }
      } catch (error) {
        console.error(' Error cargando carrito:', error)
        this.items = []
        // Limpiar localStorage corrupto
        localStorage.removeItem('agrominerva-cart')
      }
    }
  }
})