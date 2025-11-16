
<template>
  <div>
    <!-- QUIENES SOMOS -->
    <section class="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        
        <!-- TITULO DE QUINES SOMOS-->
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            ¿Quiénes  
            <span class="text-green-600">Somos</span>?
          </h2>
          <div class="w-24 h-1 bg-green-600 mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <!-- IMAGEN DEL REFERCIA -->
          <div class="relative">
            <div class="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="@/assets/images/campecinos_historia.png" 
                alt="Agricultor AgroMinerva" 
                class="w-full h-auto object-cover"
              />
            </div>
          </div>

          <!--CONTENIDO DESCRITIVO DE QUINES SOMOS -->
          <div class="space-y-6">
            <div>
              <p class="text-gray-600 text-lg leading-relaxed">
                Nacemos como una iniciativa para acercar la producción
                académica al entorno real, ofreciendo al público
                productos frescos, naturales y cultivados con criterios
                técnicos, éticos y sostenibles. Cada fruto, cada planta,
                cada producto que encuentras en nuestras estanterías, ha
                sido parte de un proceso formativo que conecta teoría,
                práctica y compromiso social.              
              </p>
            </div>

            <!-- CARDS DE CARACTIRITICAS DE LOS PRODUCTOS -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              
              <div class="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-800 mb-1">Calidad Garantizada</h3>
                  <p class="text-sm text-gray-600">Productos cultivados con estándares académicos</p>
                </div>
              </div>

              <div class="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-800 mb-1">Productos Frescos</h3>
                  <p class="text-sm text-gray-600">Directo del campo a tu mesa</p>
                </div>
              </div>

              <div class="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-800 mb-1">Sostenibilidad</h3>
                  <p class="text-sm text-gray-600">Cuidado del medio ambiente</p>
                </div>
              </div>

              <div class="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-800 mb-1">Libres de Químicos</h3>
                  <p class="text-sm text-gray-600">100% natural y saludable</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

  <!----------------SECION MISION Y VISION ----------------------->
<section class="p-6 md:p-12 bg-white">
  <div class="container mx-auto">
    
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Misión y Visión</h2>
      <div class="w-24 h-1 bg-green-600 mx-auto" ></div>
    </div>

    <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      
      <!-- CARD MISION -->
      <article class=" mb-bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
        
        <!-- ICONO DE CHECK -->
        <div class="w-24 h-24 mx-auto mt-6 mb-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-all duration-300 group-hover:scale-110">
          <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
            Misión
          </h3>

          <p class="text-gray-600 mb-4">
            Nuestra misión es promover y dar a conocer los productos agrícolas producidos en el campo experimental del Departamento de Ciencias Agronómicas, garantizando prácticas de agricultura orgánica, libres de contaminantes y sin uso de químicos.
          </p>
        </div>
      </article>

      <!-- CARD VISION -->
      <article class="bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
        
        <!-- ICONO OJO -->
        <div class="w-24 h-24 mx-auto mt-6  mb-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-all duration-300 group-hover:scale-110">
          <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
        </div>
       
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
            Visión
          </h3>

          <p class="text-gray-600 mb-4">
            Ser un referente regional en la producción agrícola sostenible, mostrando el potencial del trabajo académico y técnico aplicado, y demostrando que la agricultura orgánica puede generar productos de alta calidad y valor para la comunidad.
          </p>
        </div>
      </article>

    </div>

  </div>
</section>

>

    

  </div>
</template>


<script setup>
/*
 * @purpose: Página "Sobre Nosotros", cuenta la historia, misión y visión.
 * @tasks:
 * - [ ] Maquetar contenido estático (misión, visión, valores).
 * - [ ] Contar la historia de la empresa.
 * - [ ] (Opcional) Mostrar al equipo principal.
 */
</script> 