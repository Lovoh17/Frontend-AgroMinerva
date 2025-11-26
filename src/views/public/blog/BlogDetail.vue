<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-10" v-if="article">
      <!-- Imagen destacada -->
      <div class="mb-6">
        <img
          v-if="article.featuredImage"
          :src="article.featuredImage"
          :alt="article.title"
          class="w-full h-72 md:h-96 object-cover rounded-2xl shadow"
        />
      </div>

      <!-- Meta / título / autor -->
      <div class="mb-8">
        <p class="text-sm text-accent-600 font-semibold mb-2">
          {{ article.metadata.category }} ·
          {{ formatDate(article.metadata.publishedAt) }} ·
          {{ article.metadata.readTime }}
        </p>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {{ article.title }}
        </h1>
        <p class="text-gray-600 mb-4">
          {{ article.excerpt }}
        </p>
        <div class="flex items-center gap-3">
          <img
            v-if="article.author.avatar"
            :src="article.author.avatar"
            :alt="article.author.name"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p class="font-semibold text-gray-800">
              {{ article.author.name }}
            </p>
            <p class="text-sm text-gray-500">
              {{ article.author.role }}
            </p>
          </div>
        </div>
      </div>

      <!-- Contenido -->
      <div class="bg-white rounded-2xl shadow p-6 md:p-8 mb-8">
        <div class="prose max-w-none text-gray-800" v-html="article.content"></div>
      </div>

      <!-- Galería -->
      <div
        v-if="article.gallery && article.gallery.length"
        class="mb-8"
      >
        <h2 class="text-xl font-semibold text-gray-900 mb-4">
          Galería
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <figure
            v-for="item in article.gallery"
            :key="item.src"
            class="bg-white rounded-xl shadow overflow-hidden"
          >
            <img
              :src="item.src"
              :alt="item.caption"
              class="w-full h-40 object-cover"
            />
            <figcaption class="p-3 text-sm text-gray-600">
              {{ item.caption }}
            </figcaption>
          </figure>
        </div>
      </div>

      <!-- Descargas -->
      <div
        v-if="article.downloads && article.downloads.length"
        class="mb-8"
      >
        <h2 class="text-xl font-semibold text-gray-900 mb-4">
          Descargas
        </h2>
        <ul class="space-y-2">
          <li
            v-for="file in article.downloads"
            :key="file.label"
          >
            <a
              :href="file.url"
              class="inline-flex items-center gap-2 text-accent-600 hover:underline"
            >
              <i class="pi pi-download"></i>
              <span>{{ file.label }}</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Llamado a la acción -->
      <div
        v-if="article.callToAction"
        class="mb-10 bg-tertiary-50 border border-tertiary-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4"
      >
        <div class="flex-1">
          <h2 class="text-xl font-bold text-tertiary-800 mb-2">
            {{ article.callToAction.title }}
          </h2>
          <p class="text-gray-700">
            {{ article.callToAction.text }}
          </p>
        </div>
        <a
          :href="article.callToAction.buttonLink"
          class="inline-flex items-center justify-center px-5 py-2 rounded-full bg-tertiary-600 text-white font-semibold hover:bg-tertiary-700 transition"
        >
          {{ article.callToAction.buttonText }}
        </a>
      </div>

      <!-- Relacionados (simple) -->
      <div
        v-if="relatedPosts.length"
        class="border-t border-gray-200 pt-8 mt-8"
      >
        <h2 class="text-xl font-semibold text-gray-900 mb-4">
          También te puede interesar
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article
  v-for="post in relatedPosts"
  :key="post.slug"
  class="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-md transition"
  @click="goToRelated(post.slug)"
>

            <p class="text-xs text-accent-600 font-semibold mb-1">
              {{ post.metadata.category }}
            </p>
            <h3 class="text-lg font-bold text-gray-900 mb-1">
              {{ post.title }}
            </h3>
            <p class="text-sm text-gray-600 line-clamp-2">
              {{ post.excerpt }}
            </p>
            <p class="mt-2 text-xs text-gray-400">
              {{ formatDate(post.metadata.publishedAt) }} ·
              {{ post.metadata.readTime }}
            </p>
          </article>
        </div>
      </div>
    </div>

    <!-- Si por alguna razón no se encuentra el artículo -->
    <div
      v-else
      class="min-h-[50vh] flex items-center justify-center text-gray-500"
    >
      Artículo no encontrado.
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

/*
 * @purpose: Mostrar un artículo completo del blog.
 * @tasks:
 * - [x] Obtener el slug del post desde la ruta (usar `useRoute()`).
 * - [x] Cargar datos del post (mock local por ahora, luego se puede cambiar a GET /api/blog/:slug).
 * - [x] Mostrar el título, imagen principal, autor y fecha.
 * - [x] Renderizar el contenido del post.
 */

const route = useRoute()

// 🔹 Mock de artículos de ejemplo. reemplazar por una petición la API.
const articles = [
  {
    slug: 'tecnicas-avanzadas-riego-goteo',
    title: 'Técnicas Avanzadas de Riego por Goteo para Maximizar Rendimientos',
    featuredImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200',
    excerpt:
      'Implementa sistemas de riego inteligentes para aumentar productividad y reducir el consumo de agua.',
    content: `
      <p>El riego por goteo es una de las técnicas más eficientes para el uso del agua en agricultura.</p>
      <p>Permite aplicar el agua directamente en la zona radicular, reduciendo evaporación y escorrentía.</p>
      <p>En este artículo revisamos consideraciones de diseño, mantenimiento y ventajas productivas.</p>
    `,
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1600093463592-9f61807aef11?w=800',
        caption: 'Sistema de riego por goteo en hortalizas.'
      }
    ],
    downloads: [
      {
        label: 'Guía PDF de riego por goteo',
        url: '#'
      }
    ],
    callToAction: {
      title: '¿Necesitas asesoría en riego?',
      text: 'Visita AgroMinerva para recibir acompañamiento técnico de estudiantes y docentes.',
      buttonText: 'Contactar AgroMinerva',
      buttonLink: '#'
    },
    author: {
      name: 'Dr. Carlos Méndez',
      role: 'Ingeniero Agrónomo',
      avatar: 'https://i.pravatar.cc/150?img=12',
      bio: 'Especialista en sistemas de riego y manejo eficiente del agua en cultivos intensivos.'
    },
    metadata: {
      category: 'Tecnología',
      readTime: '7 min',
      publishedAt: '2024-10-15'
    },
    relatedArticles: [
      'agricultura-regenerativa-produccion-sostenible'
    ]
  },
  {
    slug: 'agricultura-regenerativa-produccion-sostenible',
    title: 'Agricultura Regenerativa: El Futuro de la Producción Sostenible',
    featuredImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200',
    excerpt:
      'Prácticas que restauran la salud del suelo y aumentan la resiliencia del sistema agrícola.',
    content: `
      <p>La agricultura regenerativa busca ir más allá de la sostenibilidad.</p>
      <p>Su objetivo es mejorar activamente la salud del suelo, la biodiversidad y los servicios ecosistémicos.</p>
      <p>Rotación de cultivos, abonos verdes y reducción del laboreo son prácticas clave.</p>
    `,
    gallery: [],
    downloads: [],
    callToAction: null,
    author: {
      name: 'Ing. María Torres',
      role: 'Especialista en Sostenibilidad',
      avatar: 'https://i.pravatar.cc/150?img=5',
      bio: 'Trabaja en proyectos de transición hacia modelos agroecológicos y regenerativos.'
    },
    metadata: {
      category: 'Sostenibilidad',
      readTime: '6 min',
      publishedAt: '2024-10-12'
    },
    relatedArticles: ['tecnicas-avanzadas-riego-goteo']
  },
  {
  slug: 'optimizacion-cultivo-maiz-siembra-cosecha',
  title: 'Optimización del Cultivo de Maíz: De la Siembra a la Cosecha',
  featuredImage: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1200',
  excerpt:
    'Buenas prácticas para mejorar el rendimiento y calidad del maíz desde la siembra hasta la cosecha.',
  content: `
    <p>El cultivo de maíz continúa siendo uno de los pilares de la agricultura en América Latina.</p>
    <p>Implementar prácticas eficientes desde la selección de semillas, fertilización, manejo hídrico y control de plagas es fundamental para obtener cosechas saludables.</p>
    <p>En este artículo revisamos los puntos críticos del ciclo productivo del maíz y cómo optimizarlos paso a paso.</p>
  `,
  gallery: [
    {
      src: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800',
      caption: 'Plantación de maíz en etapa temprana.'
    }
  ],
  downloads: [
    {
      label: 'Guía técnica del cultivo de maíz (PDF)',
      url: '#'
    }
  ],
  callToAction: {
    title: '¿Necesitas ayuda con tu proyecto de maíz?',
    text: 'En AgroMinerva encontrarás asesoría técnica para el manejo y productividad de cultivos de cereales.',
    buttonText: 'Solicitar asesoría',
    buttonLink: '#'
  },
  author: {
    name: 'Ing. Roberto Campos',
    role: 'Especialista en Cereales',
    avatar: 'https://i.pravatar.cc/150?img=8',
    bio: 'Investigador en manejo de cultivos y optimización de rendimientos agrícolas.'
  },
  metadata: {
    category: 'Cultivos',
    readTime: '8 min',
    publishedAt: '2024-10-08'
  },
  relatedArticles: [
    'tecnicas-avanzadas-riego-goteo',
    'agricultura-regenerativa-produccion-sostenible'
  ]
},
{
  slug: 'consejos-combatir-plagas-forma-natural',
  title: '10 Consejos para Combatir Plagas de Forma Natural y Efectiva',
  featuredImage: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200',
  excerpt:
    'Métodos orgánicos para controlar las plagas más comunes sin comprometer el medio ambiente.',
  content: `
    <p>El control ecológico de plagas es una tendencia en crecimiento dentro de la agricultura sostenible.</p>
    <p>El uso de extractos naturales, control biológico y manejo integrado permite reducir el uso de agroquímicos sin afectar la productividad.</p>
    <p>En este artículo presentamos técnicas prácticas que puedes aplicar de forma inmediata.</p>
  `,
  gallery: [
    {
      src: 'https://images.unsplash.com/photo-1581579188871-45ea61f2de71?w=800',
      caption: 'Control biológico usando insectos benéficos.'
    }
  ],
  downloads: [
    {
      label: 'Guía de control natural de plagas (PDF)',
      url: '#'
    }
  ],
  callToAction: {
    title: '¿Quieres implementar control biológico?',
    text: 'Conoce los servicios y asesorías de AgroMinerva sobre manejo integrado de plagas.',
    buttonText: 'Ver asesorías',
    buttonLink: '#'
  },
  author: {
    name: 'Dra. Ana Rodríguez',
    role: 'Fitopatóloga',
    avatar: 'https://i.pravatar.cc/150?img=9',
    bio: 'Experta en control de plagas y manejo orgánico de enfermedades en cultivos.'
  },
  metadata: {
    category: 'Consejos',
    readTime: '5 min',
    publishedAt: '2024-10-05'
  },
  relatedArticles: [
    'optimizacion-cultivo-maiz-siembra-cosecha',
    'agricultura-regenerativa-produccion-sostenible'
  ]
}

]

// slug desde la ruta
const slug = computed(() => route.params.slug)

// artículo actual
const article = computed(() => {
  const found = articles.find(a => a.slug === slug.value)

  if (!found) {
    return null
  }

  // aseguramos estructura completa
  return {
    gallery: [],
    downloads: [],
    callToAction: null,
    author: {
      name: '',
      role: '',
      avatar: '',
      bio: ''
    },
    metadata: {
      category: '',
      readTime: '',
      publishedAt: ''
    },
    relatedArticles: [],
    ...found
  }
})

//Navegar a otro articulo
const goToRelated = (slug) => {
  router.push({
    name: 'BlogDetail',
    params: { slug }
  })
}


// posts relacionados
const relatedPosts = computed(() => {
  if (!article.value || !article.value.relatedArticles?.length) return []
  return articles.filter(a => article.value.relatedArticles.includes(a.slug))
})

const formatDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('es-SV', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  })
}
</script>

<style scoped>
.prose p {
  margin-bottom: 0.75rem;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

