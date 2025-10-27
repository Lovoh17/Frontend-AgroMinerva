import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/variables.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import { Chart, registerables } from 'chart.js'

import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'

import PrimeVue from 'primevue/config'
//import 'primevue/resources/themes/lara-light-green/theme.css' // Tema
//import 'primevue/resources/primevue.min.css'                  // Core CSS
import 'primeicons/primeicons.css'    

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import VueGoodTablePlugin from 'vue-good-table-next'
import 'vue-good-table-next/dist/vue-good-table-next.css'



// Iconos
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
})

Chart.register(...registerables)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia) 
app.use(router)
app.use(vuetify)
app.use(createVuestic())
app.use(VueGoodTablePlugin) 

app.mount('#app')


console.log('🚀 Aplicación iniciada')
