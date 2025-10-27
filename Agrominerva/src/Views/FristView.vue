<template>
  <div class="test-page">
    <!-- Hero Section con Tailwind -->
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-xl mb-6">
      <h1 class="text-4xl font-bold mb-2">
        <i class="fas fa-check-circle mr-2"></i>
        Test de Integración
      </h1>
      <p class="text-xl">Vue 3 + Vite + Tailwind + Vuetify + Vuestic</p>
    </div>

    <!-- Grid con diferentes componentes -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <!-- Card 1: Tailwind + FontAwesome -->
      <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
        <h3 class="text-xl font-bold mb-3 flex items-center">
          <i class="fas fa-palette mr-2 text-blue-500"></i>
          Tailwind CSS
        </h3>
        <p class="text-gray-600 mb-3">Estilos funcionando correctamente</p>
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
          <i class="fas fa-thumbs-up mr-2"></i>
          Botón Tailwind
        </button>
      </div>

      <!-- Card 2: Vuetify -->
      <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
        <h3 class="text-xl font-bold mb-3 flex items-center">
          <i class="mdi mdi-vuetify mr-2 text-green-500"></i>
          Vuetify
        </h3>
        <v-btn color="success" prepend-icon="mdi-check" class="mb-2">
          Botón Vuetify
        </v-btn>
        <v-chip color="primary" class="mt-2">
          <i class="mdi mdi-star mr-1"></i>
          Chip Vuetify
        </v-chip>
      </div>

      <!-- Card 3: Vuestic -->
      <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
        <h3 class="text-xl font-bold mb-3 flex items-center">
          <i class="fas fa-rocket mr-2 text-purple-500"></i>
          Vuestic UI
        </h3>
        <va-button color="primary" icon="fa-heart" class="mb-2">
          Botón Vuestic
        </va-button>
        <va-badge text="5" color="danger">
          <va-button>Notificaciones</va-button>
        </va-badge>
      </div>

      <!-- Card 4: Chart.js -->
      <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
        <h3 class="text-xl font-bold mb-3 flex items-center">
          <i class="fas fa-chart-line mr-2 text-yellow-500"></i>
          Chart.js
        </h3>
        <canvas ref="chartCanvas" class="w-full h-32"></canvas>
      </div>

      <!-- Card 5: Pinia Store -->
      <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500">
        <h3 class="text-xl font-bold mb-3 flex items-center">
          <i class="fas fa-database mr-2 text-red-500"></i>
          Pinia Store
        </h3>
        <p class="text-gray-600 mb-2">Usuario: {{ authStore.user?.nombre || 'No autenticado' }}</p>
        <p class="text-gray-600 mb-2">Autenticado: 
          <span :class="authStore.isAuthenticated ? 'text-green-600' : 'text-red-600'">
            {{ authStore.isAuthenticated ? 'Sí' : 'No' }}
          </span>
        </p>
        <button 
          @click="toggleAuth"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          <i class="fas fa-user mr-2"></i>
          {{ authStore.isAuthenticated ? 'Logout' : 'Login' }}
        </button>
      </div>

      <!-- Card 6: Vue Router -->
      <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-indigo-500">
        <h3 class="text-xl font-bold mb-3 flex items-center">
          <i class="fas fa-route mr-2 text-indigo-500"></i>
          Vue Router
        </h3>
        <p class="text-gray-600 mb-3">Ruta actual: {{ $route.path }}</p>
        <router-link 
          to="/" 
          class="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition"
        >
          <i class="fas fa-home mr-2"></i>
          Ir al Home
        </router-link>
      </div>
    </div>

    <!-- Vue Good Table -->
    <div class="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h3 class="text-2xl font-bold mb-4 flex items-center">
        <i class="fas fa-table mr-2 text-teal-500"></i>
        Vue Good Table
      </h3>
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :search-options="{ enabled: true }"
        :pagination-options="{ enabled: true, perPage: 5 }"
      />
    </div>

    <!-- Loading Spinner Test -->
    <div class="bg-white p-6 rounded-lg shadow-lg mt-6 text-center">
      <h3 class="text-2xl font-bold mb-4">
        <i class="fas fa-spinner mr-2 text-blue-500"></i>
        Loading Spinner
      </h3>
      <LoadingSpinner v-if="showSpinner" />
      <button 
        @click="showSpinner = !showSpinner"
        class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition mt-4"
      >
        {{ showSpinner ? 'Ocultar' : 'Mostrar' }} Spinner
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart } from 'chart.js'

const authStore = useAuthStore()
const chartCanvas = ref(null)
const showSpinner = ref(false)

// Datos para Vue Good Table
const columns = [
  { label: 'ID', field: 'id' },
  { label: 'Nombre', field: 'nombre' },
  { label: 'Email', field: 'email' },
  { label: 'Rol', field: 'rol' },
]

const rows = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'Admin' },
  { id: 2, nombre: 'María García', email: 'maria@example.com', rol: 'Usuario' },
  { id: 3, nombre: 'Carlos López', email: 'carlos@example.com', rol: 'Editor' },
  { id: 4, nombre: 'Ana Martínez', email: 'ana@example.com', rol: 'Usuario' },
  { id: 5, nombre: 'Pedro Sánchez', email: 'pedro@example.com', rol: 'Admin' },
]

// Función para alternar autenticación
const toggleAuth = () => {
  if (authStore.isAuthenticated) {
    authStore.logout()
  } else {
    authStore.login(
      { 
        nombre: 'Usuario Demo', 
        email: 'demo@example.com',
        puestoId: 1 
      }, 
      'token-demo-123'
    )
  }
}

// Crear gráfico con Chart.js
onMounted(() => {
  if (chartCanvas.value) {
    new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
          label: 'Ventas 2024',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }
})
</script>

<style scoped>
.test-page {
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8fafc, #e2e8f0);
}
</style>