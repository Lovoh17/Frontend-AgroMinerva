import { createRouter, createWebHistory } from 'vue-router'
//import { authGuard } from './guards'
import publicRoutes from './publicRoutes'

const routes = [
  ...publicRoutes,
  {
    path: '/tests',
    name: 'tests',
    component: () => import('../views/Tests.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// SEO dinámico: título y descripción
router.afterEach((to) => {
  if (to.meta.title) document.title = to.meta.title

  if (to.meta.description) {
    const desc = document.querySelector('meta[name="description"]')
    if (desc) {
      desc.setAttribute('content', to.meta.description)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = to.meta.description
      document.head.appendChild(meta)
    }
  }

  // Console log que incluye keywords
  console.log('🔄 SEO Router - Ruta:', to.name)
  console.log('📝 Título:', to.meta.title || 'No definido')
  console.log('📄 Descripción:', to.meta.description || 'No definida')
  console.log('🔑 Keywords:', to.meta.keywords || 'No definidas')
  console.log('---------------------------------------------------------------')
})

export default router