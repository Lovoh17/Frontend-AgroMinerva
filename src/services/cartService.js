import { api } from './api.js'

const VENTAS_BASE_URL = 'https://agrominerva-backend-venta-production.up.railway.app/api'

export const cartService = {
  // Crear pedido
  async createOrder(orderData) {
    try {
      return await api.post(`${VENTAS_BASE_URL}/pedidos`, orderData)
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  },

  // Estructura para crear pedido
  buildOrderData(clienteNombre, usuarioId, items) {
    return {
      clienteNombre: clienteNombre,
      creadoPorUsuarioId: usuarioId,
      items: items.map(item => ({
        productoId: item.id,
        cantidad: item.quantity,
        precioUnitario: item.price
      }))
    }
  }
}