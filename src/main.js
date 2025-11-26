// main.js
import './assets/main.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import { createPinia } from 'pinia';
import { Chart, registerables } from 'chart.js';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import BadgeDirective from 'primevue/badgedirective';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';
import Toast from 'primevue/toast';

// Componentes PrimeVue
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Breadcrumb from 'primevue/breadcrumb';
import Menu from 'primevue/menu';
import Avatar from 'primevue/avatar';
import Sidebar from 'primevue/sidebar';
import Badge from 'primevue/badge';
import Ripple from 'primevue/ripple';

// Importar head para SEO
import { head } from '@/utils/seo';

Chart.register(...registerables);

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(head);

// Configurar PrimeVue
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false,
    },
  },
  ripple: true,
});

app.use(ToastService);
app.use(ConfirmationService);

// Registrar componentes
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Breadcrumb', Breadcrumb);
app.component('Menu', Menu);
app.component('Avatar', Avatar);
app.component('Sidebar', Sidebar);
app.component('Badge', Badge);
app.component('Toast', Toast);

app.directive('badge', BadgeDirective);
app.directive('ripple', Ripple);
app.directive('tooltip', Tooltip);

import { useCartStore } from './stores/cartStore';
const cartStore = useCartStore();
cartStore.loadFromLocalStorage();

app.mount('#app');
