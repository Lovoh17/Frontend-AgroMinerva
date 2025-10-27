import { createRouter, createWebHistory } from 'vue-router'

const routes = [
   {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../Views/FristView.vue'),
    meta: { requiresAuth: true } // Requiere autenticación
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router