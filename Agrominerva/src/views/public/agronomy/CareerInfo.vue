<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero / Encabezado -->
    <section class="bg-tertiary-600 text-white py-16 md:py-20 border-b-4 border-accent-500">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl">
          <p class="uppercase text-sm tracking-widest text-primary-100 mb-2">
            Carrera de Agronomía
          </p>
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Información sobre la carrera de Agronomía
          </h1>
          <p class="text-base md:text-lg text-primary-100 leading-relaxed">
            Conoce la cultura, los valores y la formación integral que reciben los futuros profesionales
            de la agronomía, orientados a la producción sostenible de alimentos y al desarrollo rural.
          </p>
        </div>
      </div>
    </section>

    <!-- Contenido principal -->
    <section class="container mx-auto px-4 py-10 space-y-10">
      <!-- Generalidades + Cultura y valores -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Generalidades -->
        <Card class="lg:col-span-2 shadow-sm">
          <template #title>
            <div class="flex items-center gap-3">
              <i class="pi pi-book text-tertiary-600 text-xl"></i>
              <span class="text-xl font-semibold text-gray-900">
                Generalidades de la carrera
              </span>
            </div>
          </template>
          <template #content>
            <p class="text-gray-700 mb-4">
              La carrera de Agronomía forma profesionales capaces de diseñar, gestionar y mejorar sistemas
              de producción agrícola, combinando ciencias biológicas, tecnológicas y sociales.
            </p>
            <ul class="space-y-2 text-gray-700 text-sm md:text-base">
              <li class="flex items-start gap-2">
                <i class="pi pi-check text-accent-600 mt-1"></i>
                <span>
                  Formación <strong>teórico-práctica</strong> con énfasis en trabajo de campo, laboratorios
                  y proyectos aplicados.
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check text-accent-600 mt-1"></i>
                <span>
                  Enfoque en la <strong>producción sostenible de alimentos</strong> y el uso responsable
                  de los recursos naturales.
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check text-accent-600 mt-1"></i>
                <span>
                  Vinculación con productores, comunidades rurales, instituciones públicas y empresas
                  del sector agropecuario.
                </span>
              </li>
            </ul>
          </template>
        </Card>

        <!-- Cultura y valores -->
        <Card class="shadow-sm">
          <template #title>
            <div class="flex items-center gap-3">
              <i class="pi pi-heart text-accent-600 text-xl"></i>
              <span class="text-xl font-semibold text-gray-900">Cultura y valores</span>
            </div>
          </template>
          <template #content>
            <p class="text-gray-700 mb-4 text-sm md:text-base">
              La cultura de la carrera se basa en el trabajo colectivo, la responsabilidad social y el compromiso
              con el desarrollo rural sostenible.
            </p>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center gap-2">
                <Tag value="Responsabilidad ambiental" severity="success" />
              </li>
              <li class="flex items-center gap-2">
                <Tag value="Ética profesional" severity="info" />
              </li>
              <li class="flex items-center gap-2">
                <Tag value="Trabajo en equipo" severity="warning" />
              </li>
              <li class="flex items-center gap-2">
                <Tag value="Compromiso social" severity="help" />
              </li>
              <li class="flex items-center gap-2">
                <Tag value="Respeto a las comunidades rurales" severity="secondary" />
              </li>
            </ul>
          </template>
        </Card>
      </div>

      <Divider />

      <!-- Áreas en las que se destaca -->
      <div>
        <div class="flex items-center gap-3 mb-4">
          <i class="pi pi-star text-tertiary-600 text-2xl"></i>
          <div>
            <h2 class="text-2xl font-semibold text-gray-900">
              Áreas en las que se destaca la carrera
            </h2>
            <p class="text-gray-600 text-sm md:text-base">
              A lo largo de la formación, el estudiantado desarrolla capacidades en distintas áreas clave
              de la agronomía.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card class="shadow-sm h-full">
            <template #title>
              <span class="text-lg font-semibold text-gray-900">Producción de cultivos</span>
            </template>
            <template #content>
              <p class="text-sm text-gray-700 mb-3">
                Manejo de cultivos agrícolas, selección de variedades, densidades de siembra y manejo nutricional.
              </p>
              <Chip label="Manejo de suelos" class="mb-1" />
              <Chip label="Nutrición vegetal" class="mb-1" />
            </template>
          </Card>

          <Card class="shadow-sm h-full">
            <template #title>
              <span class="text-lg font-semibold text-gray-900">Protección vegetal</span>
            </template>
            <template #content>
              <p class="text-sm text-gray-700 mb-3">
                Diagnóstico y manejo de plagas, enfermedades y malezas con enfoques sostenibles.
              </p>
              <Chip label="Manejo integrado de plagas" class="mb-1" />
              <Chip label="Control biológico" class="mb-1" />
            </template>
          </Card>

          <Card class="shadow-sm h-full">
            <template #title>
              <span class="text-lg font-semibold text-gray-900">Recursos naturales</span>
            </template>
            <template #content>
              <p class="text-sm text-gray-700 mb-3">
                Conservación de suelos y agua, planificación del uso del territorio y adaptación al cambio climático.
              </p>
              <Chip label="Conservación" class="mb-1" />
              <Chip label="Sostenibilidad" class="mb-1" />
            </template>
          </Card>

          <Card class="shadow-sm h-full">
            <template #title>
              <span class="text-lg font-semibold text-gray-900">Gestión e innovación</span>
            </template>
            <template #content>
              <p class="text-sm text-gray-700 mb-3">
                Gestión de proyectos agropecuarios, emprendimientos rurales y uso de tecnologías en el campo.
              </p>
              <Chip label="Proyectos" class="mb-1" />
              <Chip label="Tecnología aplicada" class="mb-1" />
            </template>
          </Card>
        </div>
      </div>

      <Divider />

      <!-- Prácticas y competencias -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <!-- Prácticas -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <i class="pi pi-map-marker text-accent-600 text-2xl"></i>
            <div>
              <h2 class="text-2xl font-semibold text-gray-900">
                Prácticas y experiencias formativas
              </h2>
              <p class="text-gray-600 text-sm md:text-base">
                La carrera combina espacios teóricos con experiencias prácticas en contextos reales.
              </p>
            </div>
          </div>

          <ul class="space-y-3 text-sm md:text-base text-gray-700">
            <li class="flex items-start gap-3">
              <i class="pi pi-compass mt-1 text-tertiary-600"></i>
              <div>
                <p class="font-semibold text-gray-900">Trabajo de campo</p>
                <p>
                  Visitas a parcelas experimentales, fincas y comunidades rurales para aplicar conocimientos en
                  situaciones reales de producción.
                </p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <i class="pi pi-flask mt-1 text-tertiary-600"></i>
              <div>
                <p class="font-semibold text-gray-900">Laboratorios especializados</p>
                <p>
                  Prácticas en laboratorios de suelos, fitopatología, entomología, biotecnología y otros espacios
                  científicos.
                </p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <i class="pi pi-users mt-1 text-tertiary-600"></i>
              <div>
                <p class="font-semibold text-gray-900">Vinculación con comunidades</p>
                <p>
                  Proyectos participativos con productores, cooperativas y organizaciones rurales para fortalecer
                  capacidades y transferir tecnología.
                </p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <i class="pi pi-chart-line mt-1 text-tertiary-600"></i>
              <div>
                <p class="font-semibold text-gray-900">Investigación aplicada</p>
                <p>
                  Desarrollo de ensayos, trabajos de grado y experiencias de investigación orientadas a resolver
                  problemas concretos del sector agrícola.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Competencias -->
        <Card class="shadow-sm">
          <template #title>
            <div class="flex items-center gap-3">
              <i class="pi pi-lightbulb text-tertiary-600 text-2xl"></i>
              <span class="text-xl font-semibold text-gray-900">
                Competencias que se adquieren
              </span>
            </div>
          </template>
          <template #content>
            <p class="text-gray-700 text-sm md:text-base mb-4">
              Al finalizar la carrera, la persona egresada está preparada para enfrentar retos técnicos y humanos
              del sector agrícola.
            </p>

            <h3 class="text-sm font-semibold text-gray-900 mb-2">
              Competencias técnicas
            </h3>
            <div class="flex flex-wrap gap-2 mb-4">
              <Chip label="Manejo de cultivos" />
              <Chip label="Diagnóstico fitosanitario" />
              <Chip label="Manejo de suelos y agua" />
              <Chip label="Diseño de sistemas de riego" />
              <Chip label="Gestión de proyectos" />
            </div>

            <h3 class="text-sm font-semibold text-gray-900 mb-2">
              Competencias transversales
            </h3>
            <div class="flex flex-wrap gap-2">
              <Chip label="Trabajo en equipo" />
              <Chip label="Comunicación efectiva" />
              <Chip label="Pensamiento crítico" />
              <Chip label="Liderazgo" />
              <Chip label="Ética y responsabilidad social" />
            </div>
          </template>
        </Card>
      </div>

      <Divider />

      <!-- Links a Profesores y Programas -->
      <div class="bg-white rounded-2xl shadow p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">
            Explora más sobre la carrera
          </h2>
          <p class="text-gray-700 text-sm md:text-base">
            Conoce al cuerpo docente y revisa los programas académicos completos para profundizar en tu formación.
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <!-- Ajusta los `to` según tus rutas reales -->
          <RouterLink to="/agronomy/profesores">
            <Button
              label="Ver Profesores"
              icon="pi pi-users"
              class="p-button-sm p-button-outlined p-button-secondary"
            />
          </RouterLink>
          <RouterLink to="/agronomy/programas">
            <Button
              label="Ver Programas"
              icon="pi pi-list"
              class="p-button-sm p-button-primary"
            />
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/*
 * @purpose: Página informativa sobre la carrera de agronomía.
 * @tasks:
 * - [x] Maquetar el contenido estático (cultura, áreas, prácticas, competencias).
 * - [x] Agregar links a Profesores y Programas.
 */

import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Chip from 'primevue/chip'
import Divider from 'primevue/divider'
import Button from 'primevue/button'
</script>
