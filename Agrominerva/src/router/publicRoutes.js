const publicRoutes = [
  {
    // Ruta padre que utiliza el PublicLayout
    path: '/',
    component: () => import('@/layouts/PublicLayout.vue'),

    children: [
      // ===== PÁGINA PRINCIPAL =====
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/public/Home.vue'),
        meta: {
          title: 'AgroMinerva | Soluciones Agrícolas - Universidad de El Salvador',
          description: 'Departamento de Agronomía de la Universidad de El Salvador. Formamos profesionales con excelencia académica para el desarrollo agrícola sostenible.',
          keywords: 'agronomía, universidad el salvador, agricultura, desarrollo sostenible, carrera agronómica, UES, facultad agronomía'
        }
      },

      // ===== TIENDA =====
      {
        path: 'tienda',
        name: 'Shop',
        component: () => import('@/views/public/store/Shop.vue'),
        meta: {
          title: 'Tienda de Productos Agrícolas | AgroMinerva UES',
          description: 'Compra semillas, herramientas y equipos agrícolas de calidad. Todo para tu proyecto agropecuario con garantía universitaria.',
          keywords: 'tienda agrícola, semillas, herramientas agrícolas, equipos agricultura, insumos agrícolas, comprar online'
        }
      },
      {
        path: 'producto/:id',
        name: 'ProductDetail',
        component: () => import('@/views/public/store/ProductDetail.vue'),
        props: true,
        meta: {
          title: 'Detalle del Producto Agrícola',
          description: 'Información completa, especificaciones técnicas y precios de productos agrícolas certificados.',
          keywords: 'detalle producto, especificaciones técnicas, precio, agricultura, calidad certificada'
        }
      },

      // ===== CARRITO Y PEDIDOS =====
      {
        path: 'carrito',
        name: 'Cart',
        component: () => import('@/views/public/store/Cart.vue'),
        meta: {
          title: 'Tu Carrito de Compras | AgroMinerva',
          description: 'Revisa y gestiona los productos agrícolas en tu carrito de compras. Finaliza tu pedido de forma segura.',
          keywords: 'carrito compras, pedidos agrícolas, checkout, compra segura, envíos'
        }
      },

      // ===== BLOG =====
      {
        path: 'blog',
        name: 'BlogList',
        component: () => import('@/views/public/blog/BlogList.vue'),
        meta: {
          title: 'Blog AgroMinerva | Artículos sobre Agricultura',
          description: 'Artículos especializados en agronomía, técnicas agrícolas, investigación y desarrollo rural. Conoce las últimas tendencias.',
          keywords: 'blog agrícola, artículos agronomía, investigación agrícola, técnicas cultivo, desarrollo rural'
        }
      },
      {
        path: 'blog/:slug',
        name: 'BlogDetail',
        component: () => import('@/views/public/blog/BlogDetail.vue'),
        props: true,
        meta: {
          title: 'Artículo Especializado en Agronomía',
          description: 'Lee nuestro artículo completo sobre técnicas agrícolas, investigación agronómica y mejores prácticas del sector.',
          keywords: 'artículo agrícola, investigación agronómica, técnicas cultivo, mejores prácticas, agricultura sostenible'
        }
      },
      {
        path: 'blog/actividad',
        name: 'ActivityFeed',
        component: () => import('@/views/public/blog/ActivityFeed.vue'),
        meta: {
          title: 'Feed de Actividad Agrícola | AgroMinerva',
          description: 'Mantente actualizado con las últimas actividades, eventos y noticias del departamento de agronomía UES.',
          keywords: 'actividad agrícola, eventos agronomía, noticias UES, actualidad agrícola, feed actividades'
        }
      },

      // ===== AGRONOMÍA  =====
      {
        path: 'agronomia',
        name: 'Agronomy',
        redirect: '/agronomia/programas'
      },
      {
        path: 'agronomia/programas',
        name: 'Programs',
        component: () => import('@/views/public/agronomy/Programs.vue'),
        meta: {
          title: 'Programas de Agronomía | Universidad de El Salvador',
          description: 'Conoce nuestros programas académicos en agronomía. Pregrado, posgrado y cursos de especialización agrícola.',
          keywords: 'programas agronomía, pregrado agronomía, posgrado agrícola, especialización, maestría agronomía'
        }
      },
      {
        path: 'agronomia/profesores',
        name: 'Professors',
        component: () => import('@/views/public/agronomy/Professors.vue'),
        meta: {
          title: 'Profesores de Agronomía | Equipo Docente UES',
          description: 'Conoce a nuestro equipo de profesores especializados en agronomía. Ingenieros agrónomos e investigadores con amplia experiencia.',
          keywords: 'profesores agronomía, equipo docente, ingenieros agrónomos, investigadores agrícolas, facultad UES'
        }
      },
      {
        path: 'agronomia/carrera',
        name: 'CareerInfo',
        component: () => import('@/views/public/agronomy/CareerInfo.vue'),
        meta: {
          title: 'Carrera de Agronomía | Plan de Estudios UES',
          description: 'Información completa sobre la carrera de Agronomía: plan de estudios, duración, perfil del egresado y campo laboral.',
          keywords: 'carrera agronomía, plan estudios, perfil egresado, campo laboral, duración carrera, malla curricular'
        }
      },

      // ===== INFORMACIÓN EMPRESARIAL =====
      {
        path: 'conocenos',
        name: 'About',
        component: () => import('@/views/public/About.vue'),
        meta: {
          title: 'Conócenos | Departamento de Agronomía UES',
          description: 'Historia, misión, visión y valores del Departamento de Agronomía de la Universidad de El Salvador. Más de 20 años formando profesionales.',
          keywords: 'sobre nosotros, historia agronomía, misión visión, valores UES, departamento agronomía'
        }
      },
      {
        path: 'contacto',
        name: 'Contact',
        component: () => import('@/views/public/Contact.vue'),
        meta: {
          title: 'Contacto | Departamento de Agronomía UES',
          description: 'Contáctanos para información sobre admisiones, programas académicos, investigación agrícola y proyectos de extensión.',
          keywords: 'contacto agronomía, admisiones UES, información programas, investigación agrícola, proyectos extensión'
        }
      },

      // ===== PÁGINAS LEGALES =====
      {
        path: 'privacidad',
        name: 'Privacy',
        component: () => import('@/views/public/legal/Privacy.vue'),
        meta: {
          title: 'Política de Privacidad | AgroMinerva UES',
          description: 'Política de privacidad y protección de datos personales del Departamento de Agronomía de la Universidad de El Salvador.',
          keywords: 'privacidad, protección datos, política privacidad, datos personales, legal UES'
        }
      },
      {
        path: 'terminos',
        name: 'Terms',
        component: () => import('@/views/public/legal/Terms.vue'),
        meta: {
          title: 'Términos y Condiciones | AgroMinerva UES',
          description: 'Términos y condiciones de uso del sitio web del Departamento de Agronomía de la Universidad de El Salvador.',
          keywords: 'términos condiciones, uso sitio web, condiciones servicio, legal agrícola, normativa UES'
        }
      },
      {
        path: 'preguntas-frecuentes',
        name: 'FAQ',
        component: () => import('@/views/public/legal/FAQ.vue'),
        meta: {
          title: 'Preguntas Frecuentes | AgroMinerva UES',
          description: 'Encuentra respuestas a las preguntas más comunes sobre admisiones, programas académicos y servicios del departamento de agronomía.',
          keywords: 'preguntas frecuentes, FAQ agronomía, admisiones UES, programas académicos, servicios departamento'
        }
      },
      {
        path: 'cookies',
        name: 'Cookies',
        component: () => import('@/views/public/legal/Cookies.vue'),
        meta: {
          title: 'Política de Cookies | AgroMinerva UES',
          description: 'Política de cookies y tecnologías de seguimiento utilizadas en el sitio web del Departamento de Agronomía UES.',
          keywords: 'política cookies, tecnologías seguimiento, cookies sitio web, privacidad online, legal UES'
        }
      },

      // ===== ERRORES =====
      {
        path: ':pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/public/errors/NotFound.vue'),
        meta: {
          title: '404 - Página No Encontrada | AgroMinerva',
          description: 'La página que buscas no existe. Regresa al inicio o navega por nuestro sitio del Departamento de Agronomía UES.',
          keywords: 'página no encontrada, error 404, enlace roto, sitio agronomía, UES'
        }
      },

      //MODAL PARA ELIMINAR
    {
      path: 'test-modal',
      name: 'TestModal',
      component: () => import('@/components/public/tests/TestModal.vue'),  
      meta: {
        title: 'Prueba de Modal | AgroMinerva',
        description: 'Página temporal para probar el componente Modal.',
        keywords: 'modal, prueba, confirmación'
      }
    }

    ]
  }
]

export default publicRoutes