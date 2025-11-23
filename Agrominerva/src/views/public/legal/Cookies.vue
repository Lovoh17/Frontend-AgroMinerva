<template>
  <section class="py-14 px-4 md:px-10 lg:px-16 bg-white">
    <div class="max-w-4xl mx-auto">

      <!-- ENCABEZADO TITULO POLITICA DE COOKIES -->
      <header class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900">Política de Cookies</h1>
        <p class="hover-strong-dark mt-3 text-gray-500 text-sm italic cursor-pointer transition duration-300 hover:text-green-700 hover:tracking-wide">
          Última actualización: 16 de noviembre de 2025
        </p>
      </header>

      <!-- INTRIDUCCION PARRAFO -->
      <article class="prose prose-gray lg:prose-lg max-w-none mb-12">
        <p>
          En <strong>AgroMinerva</strong> utilizamos cookies para mejorar tu experiencia, analizar el tráfico del sitio
          y personalizar contenido de acuerdo a tus preferencias.
        </p>

        <p>
          Esta política de cookies explica qué son las cookies, por qué se utilizan y cuáles son tus opciones con respecto a su uso.
        </p>
        <p class="hover-strong-dark">
          Al continuar navegando por nuestra plataforma, aceptas el uso de cookies descrito en esta política.
        </p>
      </article>

      <!-- PREGUNTA: QUE SON LAS COOKIES -->
      <div class="prose prose-gray lg:prose-lg listas max-w-none">
        <h2 class="text-[#16a34a]">1. ¿Qué son las cookies?</h2>
        <p>
          Una cookie es un pequeño archivo de texto emitido por un sitio web y 
          almacenada en el navegador del usuario, que contiene información sobre la
          actividad del usuario en el mismo sitio web, de manera que el sitio web puede 
          consultar la actividad previa del usuario en dicho sitio web.
        </p>

        <!-- 2. TIPOS DE COOKIES QUE UTILIZAMOS-->
        <h2 class="text-[#16a34a]">2. Tipos de cookies que utilizamos</h2>
        <table class="table-auto border-collapse border border-gray-300 w-full mb-6">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-4 py-2 text-left">Tipo</th>
              <th class="border px-4 py-2 text-left">Propósito</th>
              <th class="border px-4 py-2 text-left">Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">Esenciales</td>
              <td class="border px-4 py-2">Permiten que el sitio funcione correctamente.</td>
              <td class="border px-4 py-2">Sesión</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border px-4 py-2">Analíticas</td>
              <td class="border px-4 py-2">Miden el tráfico y comportamiento del usuario.</td>
              <td class="border px-4 py-2">1 año</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Preferencias</td>
              <td class="border px-4 py-2">Guardan tu configuración personalizada.</td>
              <td class="border px-4 py-2">6 meses</td>
            </tr>
          </tbody>
        </table>

      <!-- APARTADO 3. PARA QUE USAMOS LA COOKIES -->
        <h2 class="text-[#16a34a]">3. Para qué usamos cookies</h2>
        <ul>
          <li>Analizar el rendimiento del sitio.</li>
          <li>Mejorar la experiencia del usuario.</li>
          <li>Recordar configuraciones personalizadas.</li>
          <li>Mostrar contenido acorde a tus intereses.</li>
        </ul>

        <!--4. COMO GESTIONAR TUS COOKIES -->
        <h2 class="text-[#16a34a]">4. Cómo gestionar tus cookies</h2>
        <p>Puedes permitir, bloquear o eliminar las cookies desde la configuración de tu navegador. Accesos rápidos:</p>
        <ul>
          <li><strong>Google Chrome:</strong> Configuración - Privacidad - Cookies.</li>
          <li><strong>Firefox:</strong> Preferencias - Privacidad - Cookies.</li>
          <li><strong>Safari:</strong> Preferencias - Privacidad - Cookies.</li>
        </ul>

        <!--4. MODIFICACIONES DE POLIITCSS -->
        <h2 class="text-[#16a34a]">5. Modificaciones a esta política</h2>
        <p class="hover-strong-dark">
          Podemos actualizar esta Política de Cookies cuando sea necesario. La fecha de última modificación
          estará siempre visible en la parte superior de esta página.
        </p>

      </div>

    </div>
  </section>
</template>

<script setup>
import { useHead } from '@vueuse/head'

//  SEO META TAGS Y STRUCTURED DATA 
useHead({
  title: 'Política de Cookies - AgroMinerva | Gestión y Privacidad de Cookies',
  meta: [
    {
      name: 'description',
      content: 'Política de Cookies de AgroMinerva. Conoce qué son las cookies, cómo las utilizamos, tipos de cookies y cómo gestionar tus preferencias de privacidad.'
    },
    {
      name: 'keywords',
      content: 'política de cookies, cookies sitio web, privacidad cookies, gestionar cookies, cookies navegador, cookies terceros, protección datos, consentimiento cookies, desactivar cookies, AgroMinerva'
    },
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'AgroMinerva' },
    // Open Graph para redes sociales
    { property: 'og:title', content: 'Política de Cookies - AgroMinerva' },
    { property: 'og:description', content: 'Información sobre el uso de cookies en nuestro sitio web. Transparencia y control de tu privacidad.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://agrominerva.com/politica-cookies' },
    { property: 'og:locale', content: 'es_ES' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'Política de Cookies - AgroMinerva' },
    { name: 'twitter:description', content: 'Conoce cómo utilizamos cookies y gestiona tus preferencias de privacidad.' }
  ],
  link: [
    { rel: 'canonical', href: 'https://agrominerva.com/politica-cookies' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Política de Cookies",
        "description": "Política de uso de cookies de AgroMinerva",
        "url": "https://agrominerva.com/politica-cookies",
        "dateModified": "2025-11-16",
        "inLanguage": "es",
        "publisher": {
          "@type": "Organization",
          "name": "AgroMinerva",
          "url": "https://agrominerva.com"
        },
        "mainEntity": {
          "@type": "Article",
          "@id": "https://agrominerva.com/politica-cookies#main",
          "headline": "Política de Cookies de AgroMinerva",
          "datePublished": "2025-11-16",
          "dateModified": "2025-11-16",
          "author": {
            "@type": "Organization",
            "name": "AgroMinerva"
          },
          "about": {
            "@type": "Thing",
            "name": "Cookies Web",
            "description": "Archivos de datos almacenados por sitios web en navegadores"
          }
        }
      })
    }
  ]
})


</script>

<style scoped>
/*AL PSAR EL MUSE CAMBIA D COLOR */
.hover-strong-dark:hover {
  font-weight: 700;      
  color: #10593b;        
  transition: all 0.2s ease-in-out;
}

/*ESTILO PARA QUE LAS LISTAS NO SE VENA TAN SEPARADASS */
.listas ul li {
  margin-top: 2px !important;
  margin-bottom: 2px !important;
  padding-left: 0;
  list-style-position: inside;
}
</style>