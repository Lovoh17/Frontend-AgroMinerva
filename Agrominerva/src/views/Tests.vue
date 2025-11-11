<template>
  <div class="p-6 bg-white shadow-xl rounded-lg max-w-4xl mx-auto my-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">🌐 Navegador de Vistas de AgroMinerva</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h2 class="text-xl font-semibold text-blue-800 mb-4 flex items-center">
          <i class="pi pi-globe mr-2"></i> Rutas Públicas
        </h2>
        <nav class="space-y-2">
          <router-link v-for="route in publicRoutes" :key="route.name" :to="route.path"
            class="block p-2 rounded-md transition-colors text-blue-700 hover:bg-blue-200 hover:text-blue-900 text-sm font-medium"
            active-class="bg-blue-300 font-bold text-blue-900">
            <i :class="getIcon(route.name)" class="mr-2 opacity-75"></i>
            {{ route.title }}
          </router-link>
        </nav>
      </div>

      <div class="bg-red-50 p-4 rounded-lg border border-red-200">
        <h2 class="text-xl font-semibold text-red-800 mb-4 flex items-center">
          <i class="pi pi-lock mr-2"></i> Rutas de Administrador
        </h2>
        <nav class="space-y-2">
          <router-link :to="adminRoute.path"
            class="block p-2 rounded-md transition-colors text-red-700 hover:bg-red-200 hover:text-red-900 text-sm font-medium"
            active-class="bg-red-300 font-bold text-red-900">
            <i class="pi pi-chart-line mr-2 opacity-75"></i>
            {{ adminRoute.title }}
          </router-link>
        </nav>
      </div>

      <div class="bg-green-50 p-4 rounded-lg border border-green-200">
        <h2 class="text-xl font-semibold text-green-800 mb-4 flex items-center">
          <i class="pi pi-user-plus mr-2"></i> Rutas de Empleado
        </h2>
        <nav class="space-y-2">
          <router-link :to="employeeRoute.path"
            class="block p-2 rounded-md transition-colors text-green-700 hover:bg-green-200 hover:text-green-900 text-sm font-medium"
            active-class="bg-green-300 font-bold text-green-900">
            <i class="pi pi-chart-bar mr-2 opacity-75"></i>
            {{ employeeRoute.title }}
          </router-link>
        </nav>
      </div>

    </div>
  </div>

  <EmailTemplate headerText="¡Bienvenido a AgroMinerva!" headerSubtext="Tu plataforma de gestión agrícola inteligente"
    greeting="Estimado Juan Pérez,"
    mainContent="Nos complace darte la bienvenida a AgroMinerva, la plataforma líder en gestión agrícola inteligente. Estamos comprometidos en ayudarte a optimizar tus cultivos, aumentar tu productividad y tomar decisiones basadas en datos precisos. Con AgroMinerva, tendrás acceso a herramientas avanzadas de monitoreo, análisis predictivo y recomendaciones personalizadas para tu finca."
    buttonText="Activar Mi Cuenta" buttonLink="https://agrominerva.com/activate"
    additionalInfo="Una vez que actives tu cuenta, podrás acceder a todas nuestras funcionalidades: monitoreo en tiempo real de tus cultivos, análisis detallado de suelos, predicciones meteorológicas precisas, alertas automáticas y reportes personalizados. Nuestro equipo de soporte está disponible 24/7 para ayudarte en cada paso del camino."
    closing="¡Bienvenido a la revolución agrícola!&#10;&#10;Atentamente,&#10;El equipo de AgroMinerva"
    companyAddress="Boulevard Los Próceres, San Salvador, El Salvador" companyPhone="+503 2222-3333"
    companyEmail="info@agrominerva.com"
    :socialLinks="{ Facebook: 'https://facebook.com/agrominerva', Instagram: 'https://instagram.com/agrominerva', LinkedIn: 'https://linkedin.com/company/agrominerva' }"
    footerMessage="Este correo fue enviado a juan.perez@email.com porque te registraste en AgroMinerva el 08 de noviembre de 2025."
    unsubscribeLink="https://agrominerva.com/unsubscribe" />

  <OrderShippingEmail :customerName="'María González'" :orderNumber="'VEG-2025-001'" :trackingNumber="'TRK-VEG-456789'"
    :carrier="'Transporte Fresco Express'" :estimatedDelivery="'10 de Noviembre, 2025 (Entrega en la mañana)'"
    :shippingAddress="'Avenida Las Flores #456\nColonia Escalón\nSan Salvador, El Salvador'"
    :trackingLink="'https://tracking.ejemplo.com/VEG-456789'" :products="vegetableProducts"
    :companyAddress="'Mercado Central de Verduras, San Salvador, El Salvador'" :companyPhone="'+503 2234-5678'"
    :companyEmail="'pedidos@agrominerva.com'" :closing="closingMessage" />
</template>

<script>
import { defineComponent, computed } from 'vue';
import EmailTemplate from '@/views/mail/EmailTemplate.vue';
import OrderShippingEmail from '@/views/mail/OrderMailTemplate.vue';

export default defineComponent({
  name: 'NavigatorView',
  components: {
    EmailTemplate,
    OrderShippingEmail
  },
  setup() {
    // --- Definición de Rutas (Hardcoded para el menú) ---
    const rawPublicRoutes = [
      { path: '/', name: 'Home', title: 'Home', icon: 'pi pi-home' },
      { path: '/tienda', name: 'Shop', title: 'Tienda', icon: 'pi pi-shopping-bag' },
      { path: '/producto/1', name: 'ProductDetail', title: 'Detalle de Producto (Ej.)', icon: 'pi pi-box' },
      { path: '/carrito', name: 'Cart', title: 'Carrito', icon: 'pi pi-shopping-cart' },
      { path: '/blog', name: 'BlogList', title: 'Blog', icon: 'pi pi-book' },
      { path: '/blog/ejemplo-articulo', name: 'BlogDetail', title: 'Artículo de Blog (Ej.)', icon: 'pi pi-bookmark' },
      { path: '/blog/actividad', name: 'ActivityFeed', title: 'Feed de Actividad', icon: 'pi pi-rss' },
      { path: '/agronomia/programas', name: 'Programs', title: 'Programas de Agronomía', icon: 'pi pi-list' },
      { path: '/agronomia/profesores', name: 'Professors', title: 'Profesores', icon: 'pi pi-users' },
      { path: '/agronomia/carrera', name: 'CareerInfo', title: 'Carrera', icon: 'pi pi-info-circle' },
      { path: '/agronomia/noticias', name: 'AgronomyNews', title: 'Noticias Agrícolas', icon: 'pi pi-newspaper' },
      { path: '/conocenos', name: 'About', title: 'Conócenos', icon: 'pi pi-building' },
      { path: '/contacto', name: 'Contact', title: 'Contacto', icon: 'pi pi-envelope' },
      { path: '/privacidad', name: 'Privacy', title: 'Política de Privacidad', icon: 'pi pi-shield' },
      { path: '/terminos', name: 'Terms', title: 'Términos y Condiciones', icon: 'pi pi-file' },
      { path: '/preguntas-frecuentes', name: 'FAQ', title: 'FAQ', icon: 'pi pi-question-circle' },
      { path: '/cookies', name: 'Cookies', title: 'Política de Cookies', icon: 'pi pi-sun' },
      { path: '/ruta-inexistente', name: 'NotFound', title: 'Error 404', icon: 'pi pi-exclamation-triangle' },
    ];

    const adminRoute = { path: '/admin/dashboard', name: 'Dashboard Admin', title: 'Dashboard Administrador' };
    const employeeRoute = { path: '/employee/dashboard', name: 'Dashboard Employee', title: 'Dashboard Empleado' };

    // Filtra la redirección de Agronomía para no mostrarla en el menú.
    const publicRoutes = computed(() => {
      return rawPublicRoutes.filter(route => route.name !== 'Agronomy');
    });

    // Función para obtener iconos dinámicamente
    const getIcon = (name) => {
      const route = rawPublicRoutes.find(r => r.name === name);
      return route ? route.icon : 'pi pi-link';
    };

    // Datos de productos de verduras
    const vegetableProducts = [
      {
        name: '🥬 Lechuga Romana Orgánica',
        quantity: 3,
        price: '2.50',
        image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=200&h=200&fit=crop'
      },
      {
        name: '🥕 Zanahorias Frescas (1 lb)',
        quantity: 2,
        price: '1.75',
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&h=200&fit=crop'
      },
      {
        name: '🍅 Tomates Cherry (Paquete)',
        quantity: 4,
        price: '3.25',
        image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=200&h=200&fit=crop'
      },
      {
        name: '🥒 Pepinos de Invernadero',
        quantity: 5,
        price: '1.50',
        image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=200&h=200&fit=crop'
      },
      {
        name: '🥦 Brócoli Fresco',
        quantity: 2,
        price: '2.80',
        image: 'https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=200&h=200&fit=crop'
      },
      {
        name: '🌶️ Chiles Verdes (½ lb)',
        quantity: 1,
        price: '2.00',
        image: 'https://images.unsplash.com/photo-1583658852992-0e8ce7f0e9e7?w=200&h=200&fit=crop'
      },
      {
        name: '🧅 Cebollas Blancas (1 lb)',
        quantity: 2,
        price: '1.25',
        image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=200&h=200&fit=crop'
      },
      {
        name: '🫑 Pimientos Morrones (Mix)',
        quantity: 3,
        price: '4.50',
        image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200&h=200&fit=crop'
      }
    ];

    const closingMessage = '¡Gracias por elegir verduras frescas de AgroMinerva!\n\nTus productos vienen directamente de nuestros agricultores locales.\n\nSaludos frescos,\nEl equipo de AgroMinerva 🌱';

    return {
      publicRoutes,
      adminRoute,
      employeeRoute,
      getIcon,
      vegetableProducts,
      closingMessage
    };
  }
});
</script>

<style scoped>
.vegetables-order-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
</style>