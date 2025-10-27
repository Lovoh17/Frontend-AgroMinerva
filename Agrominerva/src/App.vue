<template>
  <div class="layout-wrapper" :class="containerClass">
    <!-- Sidebar -->
    <div class="layout-sidebar" @click="onSidebarClick">
      <router-link to="/" class="layout-logo">
        <img src="https://ui-avatars.com/api/?name=AM&background=22c55e&color=fff&size=40" alt="Logo" />
        <span v-show="!sidebarMinimized" class="layout-logo-text">AgroMinerva</span>
      </router-link>

      <div class="layout-menu-container">
        <ul class="layout-menu">
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            :class="{ 'active-menuitem': isActiveRoute(item.to) }"
          >
            <router-link :to="item.to" class="layout-menuitem-link">
              <i :class="item.icon"></i>
              <span v-show="!sidebarMinimized" class="layout-menuitem-text">{{ item.label }}</span>
              <span v-show="item.badge && !sidebarMinimized" class="layout-menuitem-badge">{{ item.badge }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- Main Layout -->
    <div class="layout-main-container">
      <!-- Topbar -->
      <div class="layout-topbar">
        <button class="layout-menu-button" @click="toggleSidebar">
          <i class="pi pi-bars"></i>
        </button>

        <div class="layout-topbar-menu-section">
          <!-- Search -->
          <button class="layout-topbar-button" @click="searchVisible = !searchVisible">
            <i class="pi pi-search"></i>
          </button>

          <!-- Notifications -->
          <button 
            class="layout-topbar-button" 
            @click="toggleNotifications"
            v-badge.danger="3"
          >
            <i class="pi pi-bell"></i>
          </button>

          <!-- User Menu -->
          <button 
            class="layout-topbar-button layout-topbar-user-button" 
            @click="toggleUserMenu"
          >
            <img src="https://ui-avatars.com/api/?name=Usuario&background=22c55e&color=fff" alt="avatar" />
            <div class="layout-topbar-user-info">
              <span class="layout-topbar-user-name">Usuario Demo</span>
              <span class="layout-topbar-user-role">Administrador</span>
            </div>
            <i class="pi pi-angle-down"></i>
          </button>
        </div>

        <!-- Search Panel -->
        <transition name="fade">
          <div v-if="searchVisible" class="layout-search-panel">
            <div class="layout-search-input-wrapper">
              <i class="pi pi-search"></i>
              <input 
                type="text" 
                placeholder="Buscar..." 
                v-model="searchQuery"
                @keyup.enter="performSearch"
                ref="searchInput"
              />
              <button @click="searchVisible = false">
                <i class="pi pi-times"></i>
              </button>
            </div>
          </div>
        </transition>

        <!-- Notifications Panel -->
        <transition name="slide-down">
          <div v-if="notificationsVisible" class="layout-notifications-panel" @click.stop>
            <div class="layout-panel-header">
              <span>Notificaciones</span>
              <button @click="notificationsVisible = false">
                <i class="pi pi-times"></i>
              </button>
            </div>
            <div class="layout-panel-content">
              <div 
                v-for="notification in notifications" 
                :key="notification.id"
                class="notification-item"
              >
                <div class="notification-icon" :class="`notification-${notification.type}`">
                  <i :class="notification.icon"></i>
                </div>
                <div class="notification-content">
                  <h4>{{ notification.title }}</h4>
                  <p>{{ notification.message }}</p>
                  <span class="notification-time">{{ notification.time }}</span>
                </div>
              </div>
            </div>
            <div class="layout-panel-footer">
              <button>Ver todas las notificaciones</button>
            </div>
          </div>
        </transition>

        <!-- User Menu Panel -->
        <transition name="slide-down">
          <div v-if="userMenuVisible" class="layout-user-menu-panel" @click.stop>
            <div class="user-menu-header">
              <img src="https://ui-avatars.com/api/?name=Usuario&background=22c55e&color=fff&size=60" alt="avatar" />
              <div>
                <h3>Usuario Demo</h3>
                <p>demo@agrominerva.com</p>
              </div>
            </div>
            <ul class="user-menu-list">
              <li @click="goToProfile">
                <i class="pi pi-user"></i>
                <span>Mi Perfil</span>
              </li>
              <li @click="goToSettings">
                <i class="pi pi-cog"></i>
                <span>Configuración</span>
              </li>
              <li @click="goToHelp">
                <i class="pi pi-question-circle"></i>
                <span>Ayuda</span>
              </li>
            </ul>
            <div class="user-menu-footer">
              <button class="logout-button" @click="handleLogout">
                <i class="pi pi-sign-out"></i>
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </transition>
      </div>

      <!-- Main Content -->
      <div class="layout-main">
        <transition name="fade-slide" mode="out-in">
          <router-view />
        </transition>
      </div>

      <!-- Footer -->
      <div class="layout-footer">
        <span>© 2024 AgroMinerva - Sistema de Gestión de Procesos</span>
        <div class="layout-footer-links">
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
          <a href="#">Soporte</a>
        </div>
      </div>
    </div>

    <!-- Overlay para cerrar menús -->
    <div 
      v-if="notificationsVisible || userMenuVisible || searchVisible"
      class="layout-mask"
      @click="closeAllPanels"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const sidebarMinimized = ref(false)
const sidebarVisible = ref(true)
const searchVisible = ref(false)
const notificationsVisible = ref(false)
const userMenuVisible = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

const menuItems = ref([
  { label: 'Dashboard', icon: 'pi pi-home', to: '/dashboard' },
  { label: 'Procesos', icon: 'pi pi-cog', to: '/procesos', badge: '5' },
  { label: 'Inventario', icon: 'pi pi-box', to: '/inventario' },
  { label: 'Empleados', icon: 'pi pi-users', to: '/empleados' },
  { label: 'Reportes', icon: 'pi pi-chart-bar', to: '/reportes' },
  { label: 'Órdenes', icon: 'pi pi-shopping-cart', to: '/ordenes' },
  { label: 'Configuración', icon: 'pi pi-cog', to: '/settings' },
  { label: 'Test', icon: 'pi pi-check-square', to: '/test' },
])

const notifications = ref([
  {
    id: 1,
    type: 'info',
    icon: 'pi pi-info-circle',
    title: 'Nuevo proceso iniciado',
    message: 'El proceso #2847 ha sido iniciado correctamente',
    time: 'Hace 5 minutos'
  },
  {
    id: 2,
    type: 'success',
    icon: 'pi pi-check-circle',
    title: 'Inventario actualizado',
    message: 'Se agregaron 50 unidades al stock',
    time: 'Hace 15 minutos'
  },
  {
    id: 3,
    type: 'warning',
    icon: 'pi pi-exclamation-triangle',
    title: 'Stock bajo',
    message: 'El producto X tiene solo 5 unidades',
    time: 'Hace 1 hora'
  }
])

const containerClass = computed(() => ({
  'layout-sidebar-minimized': sidebarMinimized.value,
  'layout-sidebar-hidden': !sidebarVisible.value,
  'layout-static': true
}))

const toggleSidebar = () => {
  if (window.innerWidth <= 991) {
    sidebarVisible.value = !sidebarVisible.value
  } else {
    sidebarMinimized.value = !sidebarMinimized.value
  }
}

const toggleNotifications = () => {
  notificationsVisible.value = !notificationsVisible.value
  userMenuVisible.value = false
  searchVisible.value = false
}

const toggleUserMenu = () => {
  userMenuVisible.value = !userMenuVisible.value
  notificationsVisible.value = false
  searchVisible.value = false
}

const closeAllPanels = () => {
  notificationsVisible.value = false
  userMenuVisible.value = false
  searchVisible.value = false
}

const onSidebarClick = () => {
  // Mantener el sidebar abierto
}

const isActiveRoute = (path) => {
  return route.path === path
}

const performSearch = () => {
  console.log('Buscando:', searchQuery.value)
  searchVisible.value = false
  searchQuery.value = ''
}

const goToProfile = () => {
  router.push('/profile')
  closeAllPanels()
}

const goToSettings = () => {
  router.push('/settings')
  closeAllPanels()
}

const goToHelp = () => {
  router.push('/help')
  closeAllPanels()
}

const handleLogout = () => {
  router.push('/login')
  closeAllPanels()
}

// Auto-focus en search input
watch(searchVisible, async (value) => {
  if (value) {
    await nextTick()
    searchInput.value?.focus()
  }
})

// Cerrar sidebar en móvil al cambiar de ruta
watch(() => route.path, () => {
  if (window.innerWidth <= 991) {
    sidebarVisible.value = false
  }
})
</script>

<style>
/* Variables */
:root {
  --primary-color: #22c55e;
  --primary-color-dark: #16a34a;
  --surface-0: #ffffff;
  --surface-50: #f9fafb;
  --surface-100: #f3f4f6;
  --surface-200: #e5e7eb;
  --surface-300: #d1d5db;
  --surface-600: #4b5563;
  --surface-700: #374151;
  --surface-900: #111827;
  --text-color: #374151;
  --text-color-secondary: #6b7280;
  --border-color: #e5e7eb;
  --sidebar-width: 280px;
  --sidebar-minimized-width: 80px;
  --topbar-height: 70px;
  --transition-duration: 0.2s;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* Layout Wrapper */
.layout-wrapper {
  min-height: 100vh;
  background: var(--surface-50);
}

/* Sidebar */
.layout-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: var(--sidebar-width);
  background: var(--surface-0);
  border-right: 1px solid var(--border-color);
  transition: all var(--transition-duration);
  z-index: 999;
  overflow: hidden;
}

.layout-sidebar-minimized .layout-sidebar {
  width: var(--sidebar-minimized-width);
}

.layout-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  text-decoration: none;
  color: var(--text-color);
}

.layout-logo img {
  width: 40px;
  height: 40px;
  border-radius: 8px;
}

.layout-logo-text {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-color);
  white-space: nowrap;
}

.layout-menu-container {
  height: calc(100vh - 81px);
  overflow-y: auto;
  padding: 1rem 0;
}

.layout-menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.layout-menu li {
  position: relative;
}

.layout-menuitem-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: var(--text-color-secondary);
  text-decoration: none;
  transition: all var(--transition-duration);
  cursor: pointer;
  border-left: 3px solid transparent;
}

.layout-menuitem-link:hover {
  background: var(--surface-100);
  color: var(--primary-color);
}

.active-menuitem .layout-menuitem-link {
  background: #dcfce7;
  color: var(--primary-color);
  border-left-color: var(--primary-color);
}

.layout-menuitem-link i {
  font-size: 18px;
  min-width: 18px;
}

.layout-menuitem-text {
  font-size: 15px;
  font-weight: 500;
  white-space: nowrap;
}

.layout-menuitem-badge {
  margin-left: auto;
  background: var(--primary-color);
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 12px;
  min-width: 20px;
  text-align: center;
}

.layout-sidebar-minimized .layout-menuitem-text,
.layout-sidebar-minimized .layout-menuitem-badge {
  display: none;
}

/* Main Container */
.layout-main-container {
  margin-left: var(--sidebar-width);
  transition: margin-left var(--transition-duration);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-sidebar-minimized .layout-main-container {
  margin-left: var(--sidebar-minimized-width);
}

/* Topbar */
.layout-topbar {
  height: var(--topbar-height);
  background: var(--surface-0);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  padding: 0 2rem;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 998;
}

.layout-menu-button {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: var(--text-color);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-duration);
}

.layout-menu-button:hover {
  background: var(--surface-100);
}

.layout-topbar-menu-section {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.layout-topbar-button {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: var(--text-color);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all var(--transition-duration);
}

.layout-topbar-button:hover {
  background: var(--surface-100);
}

.layout-topbar-user-button {
  width: auto;
  padding: 0 12px;
  gap: 10px;
}

.layout-topbar-user-button img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.layout-topbar-user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.layout-topbar-user-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
}

.layout-topbar-user-role {
  font-size: 12px;
  color: var(--text-color-secondary);
}

/* Search Panel */
.layout-search-panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--surface-0);
  border-bottom: 1px solid var(--border-color);
  padding: 1.5rem 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.layout-search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  background: var(--surface-100);
  padding: 0.75rem 1rem;
  border-radius: 8px;
}

.layout-search-input-wrapper i {
  color: var(--text-color-secondary);
}

.layout-search-input-wrapper input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 15px;
  color: var(--text-color);
}

.layout-search-input-wrapper button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--text-color-secondary);
}

/* Notifications Panel */
.layout-notifications-panel,
.layout-user-menu-panel {
  position: absolute;
  top: calc(100% + 10px);
  right: 2rem;
  width: 360px;
  background: var(--surface-0);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.layout-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  font-size: 15px;
}

.layout-panel-header button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--text-color-secondary);
}

.layout-panel-content {
  max-height: 400px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  gap: 12px;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  transition: background var(--transition-duration);
  cursor: pointer;
}

.notification-item:hover {
  background: var(--surface-50);
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notification-info {
  background: #dbeafe;
  color: #1e40af;
}

.notification-success {
  background: #dcfce7;
  color: #15803d;
}

.notification-warning {
  background: #fef3c7;
  color: #a16207;
}

.notification-content h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
}

.notification-content p {
  margin: 0 0 4px 0;
  font-size: 13px;
  color: var(--text-color-secondary);
  line-height: 1.4;
}

.notification-time {
  font-size: 12px;
  color: var(--text-color-secondary);
}

.layout-panel-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.layout-panel-footer button {
  background: transparent;
  border: none;
  color: var(--primary-color);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

/* User Menu Panel */
.user-menu-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.user-menu-header img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.user-menu-header h3 {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
}

.user-menu-header p {
  margin: 0;
  font-size: 13px;
  color: var(--text-color-secondary);
}

.user-menu-list {
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
}

.user-menu-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background var(--transition-duration);
}

.user-menu-list li:hover {
  background: var(--surface-50);
}

.user-menu-list li i {
  color: var(--text-color-secondary);
}

.user-menu-list li span {
  font-size: 14px;
  color: var(--text-color);
}

.user-menu-footer {
  padding: 0.5rem 1rem 1rem 1rem;
  border-top: 1px solid var(--border-color);
}

.logout-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.75rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-duration);
}

.logout-button:hover {
  background: #fee2e2;
}

/* Main Content */
.layout-main {
  flex: 1;
  padding: 2rem;
}

/* Footer */
.layout-footer {
  background: var(--surface-0);
  border-top: 1px solid var(--border-color);
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: var(--text-color-secondary);
}

.layout-footer-links {
  display: flex;
  gap: 1.5rem;
}

.layout-footer-links a {
  color: var(--text-color-secondary);
  text-decoration: none;
  transition: color var(--transition-duration);
}

.layout-footer-links a:hover {
  color: var(--primary-color);
}

/* Mask */
.layout-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 997;
  animation: fadeIn 0.2s;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 991px) {
  .layout-sidebar {
    transform: translateX(-100%);
  }

  .layout-sidebar-hidden .layout-sidebar {
    transform: translateX(-100%);
  }

  .layout-wrapper:not(.layout-sidebar-hidden) .layout-sidebar {
    transform: translateX(0);
  }

  .layout-main-container {
    margin-left: 0 !important;
  }

  .layout-topbar-user-info {
    display: none;
  }

  .layout-notifications-panel,
  .layout-user-menu-panel {
    right: 1rem;
    width: calc(100vw - 2rem);
    max-width: 360px;
  }
}

@media (max-width: 576px) {
  .layout-topbar {
    padding: 0 1rem;
  }

  .layout-main {
    padding: 1rem;
  }

  .layout-footer {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>