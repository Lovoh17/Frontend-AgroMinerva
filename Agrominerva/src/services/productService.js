import { api } from './api.js'

const PRODUCTOS_BASE_URL = 'https://agro-minerva-productos-production.up.railway.app/api'

export const productService = {
  async getProducts() {
    try {
      const products = await api.get(`${PRODUCTOS_BASE_URL}/productos`)
      console.log('Productos obtenidos:', products) // Para debug
      return products
    } catch (error) {
      console.error('Error fetching products:', error)
      return []
    }
  },

  async getProductById(id) {
    try {
      return await api.get(`${PRODUCTOS_BASE_URL}/productos/${id}`)
    } catch (error) {
      console.error('Error fetching product:', error)
      throw error
    }
  },

  async getProductsByCategory(categoryId) {
    try {
      return await api.get(`${PRODUCTOS_BASE_URL}/productos/categoria/${categoryId}`)
    } catch (error) {
      console.error('Error fetching products by category:', error)
      return []
    }
  },

  async getCategories() {
    try {
      const categories = await api.get(`${PRODUCTOS_BASE_URL}/categorias`)
      console.log('Categorías obtenidas:', categories) // Para debug
      return categories
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }
}