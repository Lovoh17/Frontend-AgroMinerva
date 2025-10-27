<template>
  <v-app>
    <!-- Layout solo para rutas autenticadas -->
    <div v-if="showLayout" class="dashboard-layout">
      <!-- Sidebar -->
      <aside 
        class="sidebar"
        :class="{ 'sidebar-collapsed': sidebarCollapsed }"
      >
        <div class="sidebar-header">
          <i class="fas fa-leaf text-2xl text-green-500"></i>
          <h2 v-if="!sidebarCollapsed" class="ml-3 font-bold text-xl">AgroMinerva</h2>
        </div>

        <nav class="sidebar-nav">
          <router-link 
            v-for="item in menuItems" 
            :key="item.path"
            :to="item.path"
            class="nav-item"
            active-class="nav-item-active"
          >
            <i :class="item.icon"></i>
            <span v-if="!sidebarCollapsed">{{ item.title }}</span>
          </router-link>
        </nav>

        <div class="sidebar-footer">
          <button @click="handleLogout" class="nav-item text-red-500 hover:bg-red-50 w-full">
            <i class="fas fa-sign-out-alt"></i>
            <span v-if="!sidebarCollapsed">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Topbar -->
        <header class="topbar">
          <button 
            @click="sidebarCollapsed = !sidebarCollapsed"
            class="btn-icon"
          >
            <i class="fas fa-bars"></i>
          </button>

          <div class="flex-1"></div>

          <!-- Search -->
          <div class="search-box hidden md:flex">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Buscar..." />
          </div>

          <!-- Notifications -->
          <button class="btn-icon relative">
            <i class="fas fa-bell"></i>
            <span class="notification-badge">3</span>
          </button>

          <!-- User Menu -->
          <div class="user-menu" @click="userMenuOpen = !userMenuOpen">
            
            <div class="hidden md:block">
              <p class="font-semibold text-sm">Usuario</p>
              <p class="text-xs text-gray-500">Ingeniebro</p>
            </div>
            <i class="fas fa-chevron-down text-xs ml-2"></i>

            <!-- Dropdown -->
            <div v-if="userMenuOpen" class="user-dropdown">
              <a @click="goToProfile" class="dropdown-item">
                <i class="fas fa-user"></i>
                Mi Perfil
              </a>
              <a @click="goToSettings" class="dropdown-item">
                <i class="fas fa-cog"></i>
                Configuración
              </a>
              <hr class="my-2">
              <a @click="handleLogout" class="dropdown-item text-red-600">
                <i class="fas fa-sign-out-alt"></i>
                Cerrar Sesión
              </a>
            </div>
          </div>
        </header>

        <!-- Page Content - Aquí se renderizan las vistas -->
        <main class="page-content">
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </main>
      </div>
    </div>

    <!-- Sin layout para login, registro, etc -->
    <div v-else>
      <router-view />
    </div>
  </v-app>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const sidebarCollapsed = ref(false)
const userMenuOpen = ref(false)

// Rutas que NO deben mostrar el layout
const routesWithoutLayout = ['/login', '/register', '/forgot-password', '/']

// Mostrar layout solo si NO está en las rutas excluidas
const showLayout = computed(() => {
  return !routesWithoutLayout.includes(route.path)
})

const menuItems = [
  { title: 'Dashboard', icon: 'fas fa-home', path: '/dashboard' },
  { title: 'Procesos', icon: 'fas fa-cogs', path: '/procesos' },
  { title: 'Inventario', icon: 'fas fa-boxes', path: '/inventario' },
  { title: 'Empleados', icon: 'fas fa-users', path: '/empleados' },
  { title: 'Reportes', icon: 'fas fa-file-alt', path: '/reportes' },
  { title: 'Configuración', icon: 'fas fa-cog', path: '/settings' },
  { title: 'Test', icon: 'fas fa-vial', path: '/test' },
]

const goToProfile = () => {
  router.push('/profile')
  userMenuOpen.value = false
}

const goToSettings = () => {
  router.push('/settings')
  userMenuOpen.value = false
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
  userMenuOpen.value = false
}

// Cerrar menú de usuario al cambiar de ruta
watch(() => route.path, () => {
  userMenuOpen.value = false
})

// Cerrar menú de usuario al hacer clic fuera
watch(userMenuOpen, (isOpen) => {
  if (isOpen) {
    const closeMenu = (e) => {
      if (!e.target.closest('.user-menu')) {
        userMenuOpen.value = false
        document.removeEventListener('click', closeMenu)
      }
    }
    setTimeout(() => {
      document.addEventListener('click', closeMenu)
    }, 0)
  }
})
</script>

<style>
/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
}

.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: white;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  position: fixed;
  height: 100vh;
  z-index: 100;
}

.sidebar-collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.875rem 1.5rem;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s;
  gap: 0.75rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.95rem;
}

.nav-item:hover {
  background: #f3f4f6;
  color: #22c55e;
}

.nav-item-active {
  background: #dcfce7;
  color: #22c55e;
  border-right: 3px solid #22c55e;
}

.sidebar-footer {
  border-top: 1px solid #e5e7eb;
  padding: 1rem 0;
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: 280px;
  transition: margin-left 0.3s;
  display: flex;
  flex-direction: column;
}

.sidebar-collapsed ~ .main-content {
  margin-left: 80px;
}

/* Topbar */
.topbar {
  height: 70px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 50;
}

.btn-icon {
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-icon:hover {
  background: #f3f4f6;
}

.search-box {
  background: #f3f4f6;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 400px;
}

.search-box input {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
}

.notification-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 999px;
  font-weight: bold;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
}

.user-menu:hover {
  background: #f3f4f6;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  padding: 0.5rem;
  z-index: 1000;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
  text-decoration: none;
  color: #374151;
  transition: background 0.2s;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f3f4f6;
}

/* Page Content */
.page-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

/* Transiciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Scrollbar personalizado */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.sidebar-collapsed {
    transform: translateX(0);
    width: 100%;
  }

  .main-content {
    margin-left: 0 !important;
  }
}
</style>