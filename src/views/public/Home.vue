<template>
  <div>
    <Head>
      <title>AgroMinerva - Escuela de Agronomía | Educación Agrícola de Excelencia</title>
      <meta name="description" content="AgroMinerva es la escuela líder en educación agronómica en El Salvador. Ofrecemos programas de formación técnica en agricultura sostenible, cultivos, manejo de suelos y tecnología agrícola moderna." />
      <meta name="keywords" content="agronomía, agricultura, educación agrícola, escuela de agricultura, cultivos, agronomía El Salvador, agricultura sostenible, formación técnica agrícola" />
      <meta name="author" content="AgroMinerva" />
      <meta property="og:title" content="AgroMinerva - Escuela de Agronomía" />
      <meta property="og:description" content="Formación técnica en agronomía y agricultura sostenible" />
      <meta property="og:type" content="website" />
    </Head>

    <HeroSection />

    <!-- Estadísticas -->
    <section class="bg-primary-600 text-white py-12" aria-label="Estadísticas de la institución">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold mb-2">30+</div>
            <div class="text-sm md:text-base text-primary-100">Años de Experiencia</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold mb-2">500+</div>
            <div class="text-sm md:text-base text-primary-100">Estudiantes Activos</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold mb-2">50+</div>
            <div class="text-sm md:text-base text-primary-100">Proyectos de Investigación</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold mb-2">15+</div>
            <div class="text-sm md:text-base text-primary-100">Docentes Especializados</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Productos Destacados de Temporada -->
    <section class="p-6 md:p-12 bg-neutral-50">
      <div class="container mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Productos de Temporada
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            Aprovecha nuestras ofertas especiales en herramientas y materiales esenciales
          </p>
        </div>

        <FeaturedProducts />

        <div class="text-center mt-12">
          <router-link to="/tienda">
            <Button 
              label="Ver Todos los Productos" 
              icon="pi pi-arrow-right" 
              iconPos="right"
              class="bg-neutral-900 text-white px-8 py-3 font-semibold hover:bg-neutral-800 transition-colors"
            ></Button>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Últimas Noticias del Blog -->
    <section class="p-6 md:p-12 bg-white">
      <div class="container mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Últimas Noticias del Blog
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            Mantente informado sobre las últimas tendencias en agronomía y agricultura sostenible
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="post in blogPosts" 
            :key="post.id"
            class="bg-white border border-neutral-200 rounded-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
          >
            <div class="relative overflow-hidden h-56 bg-neutral-200">
              <img 
                :src="post.image" 
                :alt="post.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <span class="text-white text-sm font-semibold bg-primary-600 px-3 py-1 rounded-sm">
                  {{ post.category }}
                </span>
              </div>
            </div>

            <div class="p-6">
              <div class="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                <div class="flex items-center gap-1">
                  <i class="pi pi-calendar"></i>
                  <span>{{ post.date }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <i class="pi pi-user"></i>
                  <span>{{ post.author }}</span>
                </div>
              </div>

              <h3 class="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                {{ post.title }}
              </h3>

              <p class="text-neutral-600 mb-4 line-clamp-3">
                {{ post.excerpt }}
              </p>

              <button class="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center gap-2 group">
                Leer más
                <i class="pi pi-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
          </article>
        </div>

        <div class="text-center mt-12">
          <Button 
            label="Ver Todas las Noticias" 
            icon="pi pi-arrow-right" 
            iconPos="right"
            class="bg-primary-600 text-white px-8 py-3 font-semibold hover:bg-primary-700 transition-colors"
          ></Button>
        </div>
      </div>
    </section>

    <!-- Sección de Llamada a la Acción con Testimonios y Fotos -->
    <section class="bg-gradient-to-r from-primary-700 to-primary-600 text-white py-20">
      <div class="container mx-auto px-4">
        <!-- Encabezado -->
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para Comenzar tu Carrera en Agronomía?
          </h2>
          <p class="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Únete a nuestra comunidad de estudiantes y profesionales comprometidos con el desarrollo agrícola sostenible
          </p>
        </div>

        <!-- Carrusel de Testimonios -->
        <div class="mb-16 max-w-5xl mx-auto custom-testimonial-wrapper">
          <Carousel 
            :value="testimonials" 
            :numVisible="1" 
            :numScroll="1" 
            :circular="true"
            :autoplayInterval="5000"
            :autoplay="true"
            :showNavigators="true"
            :showIndicators="true"
            class="custom-carousel-agro"
            :pt="{
              indicator: { class: 'custom-dot' },
              previousButton: { class: 'custom-nav-btn custom-prev-btn' },
              nextButton: { class: 'custom-nav-btn custom-next-btn' }
            }"
          >
            <template #item="slotProps">
              <div class="px-4">
                <Card class="bg-white backdrop-blur-md border-0 shadow-2xl">
                  <template #content>
                    <div class="text-center py-8 px-4">
                      <!-- Foto del testimonio -->
                      <div class="mb-6 flex justify-center">
                        <img 
                          :src="slotProps.data.image" 
                          :alt="slotProps.data.name"
                          class="w-24 h-24 rounded-full object-cover border-4 border-primary-500 shadow-xl"
                        />
                      </div>

                      <!-- Comillas -->
                      <i class="pi pi-quote-left text-4xl text-primary-500 mb-4 block"></i>

                      <!-- Testimonio -->
                      <p class="text-lg md:text-xl italic mb-6 leading-relaxed max-w-3xl mx-auto text-neutral-700">
                        "{{ slotProps.data.quote }}"
                      </p>

                      <!-- Nombre y rol -->
                      <div class="mt-6">
                        <h4 class="font-bold text-xl text-neutral-900 mb-1">{{ slotProps.data.name }}</h4>
                        <p class="text-primary-600 text-sm font-semibold">{{ slotProps.data.role }}</p>
                        <div class="flex justify-center items-center gap-1 mt-3">
                          <Rating :modelValue="5" :readonly="true" :cancel="false" class="text-sm" />
                        </div>
                      </div>
                    </div>
                  </template>
                </Card>
              </div>
            </template>
          </Carousel>
        </div>

        <!-- Grid de Fotos de Actividades -->
        <div class="mb-12">
          <h3 class="text-2xl md:text-3xl font-bold text-center mb-8">
            Vive la Experiencia AgroMinerva
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div 
              v-for="(photo, index) in activityPhotos" 
              :key="index"
              class="relative overflow-hidden rounded-xl aspect-square group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
            >
              <img 
                :src="photo.image" 
                :alt="photo.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                <p class="text-white font-semibold text-sm text-center">{{ photo.title }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Botones CTA -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            label="Inscríbete Ahora" 
            icon="pi pi-user-plus"
            class="bg-white text-primary-700 px-8 py-4 font-bold hover:bg-neutral-100 transition-colors text-lg border-0"
          ></Button>
          <Button 
            label="Conoce Más" 
            icon="pi pi-arrow-right"
            iconPos="right"
            outlined
            class="bg-transparent border-2 border-white text-white px-8 py-4 font-bold hover:text-primary-500 transition-colors text-lg"
          ></Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Head } from '@vueuse/head'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Carousel from 'primevue/carousel'
import Rating from 'primevue/rating'
import HeroSection from '@/components/public/HeroSection.vue'
import FeaturedProducts from '@/components/public/store/FeaturedProducts.vue'

const blogPosts = ref([
  {
    id: 1,
    title: 'Agricultura Sostenible: El Futuro de la Producción Alimentaria',
    excerpt: 'Descubre cómo las prácticas agrícolas sostenibles están transformando la producción de alimentos a nivel mundial y su impacto en el medio ambiente.',
    author: 'Ing. Marco Calderón',
    date: '15 Oct 2024',
    category: 'Sostenibilidad',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'Nuevas Técnicas de Control Biológico de Plagas',
    excerpt: 'Investigadores desarrollan métodos innovadores para el control de plagas sin químicos, utilizando organismos benéficos y técnicas naturales.',
    author: 'Dr. Nery Guevara',
    date: '12 Oct 2024',
    category: 'Investigación',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'Impacto del Cambio Climático en los Cultivos',
    excerpt: 'Análisis profundo sobre cómo el cambio climático está afectando los patrones de cultivo y qué estrategias de adaptación están implementando los agricultores.',
    author: 'Ing. Jaime Río',
    date: '08 Oct 2024',
    category: 'Clima',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&h=400&fit=crop'
  },
  {
    id: 4,
    title: 'Tecnología de Precisión en la Agricultura Moderna',
    excerpt: 'Drones, sensores y big data están revolucionando la forma en que los agricultores toman decisiones sobre sus cultivos.',
    author: 'Ing. Marco Calderón',
    date: '05 Oct 2024',
    category: 'Tecnología',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=400&fit=crop'
  },
  {
    id: 5,
    title: 'Manejo Integrado de Nutrientes en Suelos Tropicales',
    excerpt: 'Estrategias efectivas para optimizar el uso de fertilizantes y mejorar la fertilidad del suelo en regiones tropicales.',
    author: 'Dr. Nery Guevara',
    date: '01 Oct 2024',
    category: 'Suelos',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=400&fit=crop'
  },
  {
    id: 6,
    title: 'Economía Agrícola: Tendencias del Mercado 2024',
    excerpt: 'Análisis de las tendencias económicas que están moldeando el sector agrícola y oportunidades para pequeños y medianos productores.',
    author: 'Ing. Jaime Río',
    date: '28 Sep 2024',
    category: 'Economía',
    image: 'https://images.unsplash.com/photo-1444212477490-ca407925329e?w=600&h=400&fit=crop'
  }
])

// Testimonios de estudiantes y egresados
const testimonials = ref([
  {
    id: 1,
    name: 'María Rodríguez',
    role: 'Egresada 2023 - Ingeniera Agrónoma en CENTA',
    quote: 'AgroMinerva me dio las herramientas y el conocimiento necesario para destacar en mi carrera. Los profesores son excelentes y las prácticas de campo fueron fundamentales para mi formación profesional.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
  },
  {
    id: 2,
    name: 'Carlos Hernández',
    role: 'Estudiante de 4to Año - Investigador en Cultivos',
    quote: 'Lo mejor de estudiar aquí es la combinación entre teoría y práctica. He participado en proyectos reales que han impactado a comunidades rurales. Esta carrera cambió mi perspectiva sobre la agricultura.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
  },
  {
    id: 3,
    name: 'Ana López',
    role: 'Egresada 2022 - Emprendedora Agrícola',
    quote: 'Gracias a la formación integral que recibí, hoy tengo mi propia empresa de producción orgánica. Los valores de sostenibilidad que aprendí son la base de mi negocio exitoso.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
  },
  {
    id: 4,
    name: 'Roberto Martínez',
    role: 'Egresado 2021 - Asesor Técnico en MAG',
    quote: 'La preparación académica y las conexiones que hice en AgroMinerva abrieron muchas puertas para mi desarrollo profesional. Recomiendo totalmente esta carrera a quien quiera hacer un impacto real.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
  }
])

// Fotos de actividades
const activityPhotos = ref([
  {
    title: 'Prácticas de Campo',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop'
  },
  {
    title: 'Laboratorio de Suelos',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=400&fit=crop'
  },
  {
    title: 'Investigación Aplicada',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop'
  },
  {
    title: 'Cultivos Experimentales',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop'
  },
  {
    title: 'Tecnología Agrícola',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=400&fit=crop'
  },
  {
    title: 'Ceremonia de Graduación',
    image: 'https://images.unsplash.com/photo-1627556704302-624286467c65?w=400&h=400&fit=crop'
  }
])
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Estilos personalizados para el carrusel de testimonios */
.custom-testimonial-wrapper {
  overflow: hidden !important;
  max-width: 100% !important;
}

.custom-testimonial-wrapper :deep(.p-carousel) {
  overflow: hidden !important;
}

.custom-testimonial-wrapper :deep(.p-carousel-content) {
  overflow: hidden !important;
}

.custom-testimonial-wrapper :deep(.p-carousel-container) {
  overflow: hidden !important;
}

.custom-testimonial-wrapper :deep(.p-carousel-items-content) {
  overflow: hidden !important;
}

.custom-testimonial-wrapper :deep(.p-carousel-indicators) {
  padding: 1.5rem 0 !important;
  display: flex !important;
  gap: 0.75rem !important;
  justify-content: center !important;
  align-items: center !important;
}

.custom-testimonial-wrapper :deep(.p-carousel-indicator) {
  margin: 0 !important;
}

.custom-testimonial-wrapper :deep(.p-carousel-indicator button) {
  width: 10px !important;
  height: 10px !important;
  min-width: 10px !important;
  min-height: 10px !important;
  border-radius: 50% !important;
  background: rgba(250, 170, 33, 0.25) !important;
  border: 2px solid rgba(250, 170, 33, 0.35) !important;
  transition: all 0.3s ease !important;
  padding: 0 !important;
  margin: 0 !important;
  opacity: 0.6 !important;
}

.custom-testimonial-wrapper :deep(.p-carousel-indicator.p-highlight button),
.custom-testimonial-wrapper :deep(.p-carousel-indicator[data-p-active="true"] button),
.custom-testimonial-wrapper :deep(.p-carousel-indicator[data-p-highlight="true"] button) {
  width: 14px !important;
  height: 14px !important;
  min-width: 14px !important;
  min-height: 14px !important;
  background: #faaa21 !important;
  border: 2px solid #faaa21 !important;
  box-shadow: 0 0 15px rgba(250, 170, 33, 0.9) !important;
  transform: scale(1.4) !important;
  opacity: 1 !important;
}

/* Botones de navegación del carousel */
.custom-testimonial-wrapper :deep(.p-carousel-prev),
.custom-testimonial-wrapper :deep(.p-carousel-next),
.custom-testimonial-wrapper :deep(.custom-nav-btn),
.custom-testimonial-wrapper :deep(button.p-button) {
  background: transparent !important;
  background-color: transparent !important;
  color: #22c55e !important;
  border: 2px solid transparent !important;
  border-color: transparent !important;
  width: 2.5rem !important;
  height: 2.5rem !important;
  min-width: 2.5rem !important;
  min-height: 2.5rem !important;
  border-radius: 50% !important;
  transition: all 0.3s ease !important;
  box-shadow: none !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.custom-testimonial-wrapper :deep(.p-carousel-prev:enabled:hover),
.custom-testimonial-wrapper :deep(.p-carousel-next:enabled:hover),
.custom-testimonial-wrapper :deep(.custom-nav-btn:enabled:hover),
.custom-testimonial-wrapper :deep(button.p-button:enabled:hover) {
  background: white !important;
  background-color: white !important;
  color: #22c55e !important;
  border-color: white !important;
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3) !important;
  transform: scale(1.05) !important;
}

.custom-testimonial-wrapper :deep(.p-carousel-prev svg),
.custom-testimonial-wrapper :deep(.p-carousel-next svg),
.custom-testimonial-wrapper :deep(button.p-button svg) {
  width: 1.2rem !important;
  height: 1.2rem !important;
  fill: #22c55e !important;
  color: #22c55e !important;
}

.custom-testimonial-wrapper :deep(.p-carousel-prev:enabled:hover svg),
.custom-testimonial-wrapper :deep(.p-carousel-next:enabled:hover svg),
.custom-testimonial-wrapper :deep(button.p-button:enabled:hover svg) {
  fill: #22c55e !important;
  color: #22c55e !important;
}

/* Botón "Conoce Más" personalizado */
.custom-cta-buttons :deep(.custom-outline-btn),
.custom-cta-buttons :deep(.custom-outline-btn.p-button),
.custom-cta-buttons :deep(button.custom-outline-btn) {
  background: transparent !important;
  background-color: transparent !important;
  border: 2px solid white !important;
  border-color: white !important;
}

.custom-cta-buttons :deep(.custom-outline-btn:hover),
.custom-cta-buttons :deep(.custom-outline-btn.p-button:hover),
.custom-cta-buttons :deep(button.custom-outline-btn:hover) {
  background: transparent !important;
  background-color: transparent !important;
  border: 2px solid white !important;
  border-color: white !important;
}

.custom-cta-buttons :deep(.custom-outline-btn .p-button-label),
.custom-cta-buttons :deep(.custom-outline-btn .p-button-icon),
.custom-cta-buttons :deep(.custom-outline-btn span) {
  color: white !important;
}

.custom-cta-buttons :deep(.custom-outline-btn:hover .p-button-label),
.custom-cta-buttons :deep(.custom-outline-btn:hover .p-button-icon),
.custom-cta-buttons :deep(.custom-outline-btn:hover span) {
  color: #22c55e !important;
}
</style>