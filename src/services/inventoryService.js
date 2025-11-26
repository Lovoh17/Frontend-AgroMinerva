import { api } from './api.js'

const INVENTARIO_BASE_URL = 'https://agro-minerva-inventario-production.up.railway.app/inventario'

export const inventoryService = {
  async getStockByProduct(productId) {
    try {
      console.log(` Haciendo GET a: ${INVENTARIO_BASE_URL}/producto/${productId}`)
      const response = await api.get(`${INVENTARIO_BASE_URL}/producto/${productId}`)
      console.log(` Respuesta para ${productId}:`, response)
      return response
    } catch (error) {
      console.error(` Error en getStockByProduct para ${productId}:`, error)
      console.log(` Detalles del error:`, {
        message: error.message,
        status: error.status,
        url: `${INVENTARIO_BASE_URL}/producto/${productId}`
      })
      throw error
    }
  }
}