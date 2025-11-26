<template>
  <section class="py-14 px-4 md:px-10 lg:px-16 bg-white">
    <div class="max-w-4xl mx-auto">

      <!-- ENCABEZADO TITULO PREGUNTAS FRECUENTES -->
      <header class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900">Preguntas Frecuentes (FAQ)</h1>
        <p class="hover-strong-dark mt-3 text-gray-500 text-sm italic cursor-pointer transition duration-300 hover:text-green-700 hover:tracking-wide">
          Última actualización: 16 de noviembre de 2025
        </p>
      </header>

      <article class="prose prose-gray lg:prose-lg max-w-none mb-12">
        <p>
          Encuentra las respuestas a las preguntas más frecuentes sobre nuestros productos, envíos, pagos y devoluciones.
        </p>
      </article>

      <!-- LISTA DE PREGUNTAS FRECUENTES CON EXPANSION -->
      <div class="space-y-3">

        <!-- PREGUNTA 1 -->
        <div class="border border-gray-200 rounded-lg overflow-hidden">
          <button 
            @click="alternarPregunta(1)"
            class="w-full flex items-center justify-between px-5 py-4 bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <div class="flex items-center gap-3">
              <span class="flex items-center justify-center w-8 h-8 bg-green-600 text-white text-sm font-bold rounded-full">
                1
              </span>
              <span class="text-left font-semibold text-gray-900">
                ¿Qué tipos de productos ofrecen?
              </span>
            </div>
            <svg 
              :class="{ 'rotate-180': preguntasAbiertas.includes(1) }"
              class="w-5 h-5 text-green-600 transition-transform duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div 
            v-show="preguntasAbiertas.includes(1)"
            class="px-5 py-4 bg-white text-gray-700 leading-relaxed"
          >
          En AgroMinerva ofrecemos productos frescos y de alta calidad, completamente 
          libres de contaminantes y sin pesticidas presentes. Contamos con una amplia 
          variedad de productos cuidadosamente seleccionados, incluyendo tomates, miel de abeja, 
          cuajada de terron, tilapia, limones frescos, arayanes y plantas ornamentales, garantizando 
          frescura, sabor y la mejor experiencia para nuestros clientes.
          </div>
        </div>

        <!-- PREGUNTA 2 -->
        <div class="border border-gray-200 rounded-lg overflow-hidden">
          <button 
            @click="alternarPregunta(2)"
            class="w-full flex items-center justify-between px-5 py-4 bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <div class="flex items-center gap-3">
              <span class="flex items-center justify-center w-8 h-8 bg-green-600 text-white text-sm font-bold rounded-full">
                2
              </span>
              <span class="text-left font-semibold text-gray-900">
                ¿Puedo solicitar un producto específico?
              </span>
            </div>
            <svg 
              :class="{ 'rotate-180': preguntasAbiertas.includes(2) }"
              class="w-5 h-5 text-green-600 transition-transform duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div 
            v-show="preguntasAbiertas.includes(2)"
            class="px-5 py-4 bg-white text-gray-700 leading-relaxed"
          >
            Sí, puedes contactarnos para verificar disponibilidad y tiempos de entrega de productos especiales.
          </div>
        </div>

        <!-- PREGUNTA 3 -->
        <div class="border border-gray-200 rounded-lg overflow-hidden">
          <button 
            @click="alternarPregunta(3)"
            class="w-full flex items-center justify-between px-5 py-4 bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <div class="flex items-center gap-3">
              <span class="flex items-center justify-center w-8 h-8 bg-green-600 text-white text-sm font-bold rounded-full">
                3
              </span>
              <span class="text-left font-semibold text-gray-900">
                ¿Cuánto tardan los envíos?
              </span>
            </div>
            <svg 
              :class="{ 'rotate-180': preguntasAbiertas.includes(3) }"
              class="w-5 h-5 text-green-600 transition-transform duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div 
            v-show="preguntasAbiertas.includes(3)"
            class="px-5 py-4 bg-white text-gray-700 leading-relaxed"
          >
            Los envíos se realizan en un plazo de 24 a 72 horas, dependiendo de la ubicación.
          </div>
        </div>

        <!-- PREGUNTA 4 -->
        <div class="border border-gray-200 rounded-lg overflow-hidden">
          <button 
            @click="alternarPregunta(4)"
            class="w-full flex items-center justify-between px-5 py-4 bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <div class="flex items-center gap-3">
              <span class="flex items-center justify-center w-8 h-8 bg-green-600 text-white text-sm font-bold rounded-full">
                4
              </span>
              <span class="text-left font-semibold text-gray-900">
                ¿Cuál es el costo del envío?
              </span>
            </div>
            <svg 
              :class="{ 'rotate-180': preguntasAbiertas.includes(4) }"
              class="w-5 h-5 text-green-600 transition-transform duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div 
            v-show="preguntasAbiertas.includes(4)"
            class="px-5 py-4 bg-white text-gray-700 leading-relaxed"
          >
            El costo de envío se calcula automáticamente según la dirección y cantidad de productos en tu pedido.
          </div>
        </div>

        <!-- PREGUNTA 5 -->
        <div class="border border-gray-200 rounded-lg overflow-hidden">
          <button 
            @click="alternarPregunta(5)"
            class="w-full flex items-center justify-between px-5 py-4 bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <div class="flex items-center gap-3">
              <span class="flex items-center justify-center w-8 h-8 bg-green-600 text-white text-sm font-bold rounded-full">
                5
              </span>
              <span class="text-left font-semibold text-gray-900">
                ¿Qué métodos de pago aceptan?
              </span>
            </div>
            <svg 
              :class="{ 'rotate-180': preguntasAbiertas.includes(5) }"
              class="w-5 h-5 text-green-600 transition-transform duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div 
            v-show="preguntasAbiertas.includes(5)"
            class="px-5 py-4 bg-white text-gray-700 leading-relaxed"
          >
            Aceptamos pagos con tarjeta de crédito, débito, PayPal y transferencias bancarias.
          </div>
        </div>

        <!-- PREGUNTA 6 -->
        <div class="border border-gray-200 rounded-lg overflow-hidden">
          <button 
            @click="alternarPregunta(6)"
            class="w-full flex items-center justify-between px-5 py-4 bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <div class="flex items-center gap-3">
              <span class="flex items-center justify-center w-8 h-8 bg-green-600 text-white text-sm font-bold rounded-full">
                6
              </span>
              <span class="text-left font-semibold text-gray-900">
                ¿Es seguro pagar en línea?
              </span>
            </div>
            <svg 
              :class="{ 'rotate-180': preguntasAbiertas.includes(6) }"
              class="w-5 h-5 text-green-600 transition-transform duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div 
            v-show="preguntasAbiertas.includes(6)"
            class="px-5 py-4 bg-white text-gray-700 leading-relaxed"
          >
            Sí, todos los pagos están protegidos mediante encriptación SSL y cumpliendo normas de seguridad.
          </div>
        </div>

        <!-- PREGUNTA 7 -->
        <div class="border border-gray-200 rounded-lg overflow-hidden">
          <button 
            @click="alternarPregunta(7)"
            class="w-full flex items-center justify-between px-5 py-4 bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <div class="flex items-center gap-3">
              <span class="flex items-center justify-center w-8 h-8 bg-green-600 text-white text-sm font-bold rounded-full">
                7
              </span>
              <span class="text-left font-semibold text-gray-900">
                ¿Puedo devolver un producto?
              </span>
            </div>
            <svg 
              :class="{ 'rotate-180': preguntasAbiertas.includes(7) }"
              class="w-5 h-5 text-green-600 transition-transform duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div 
            v-show="preguntasAbiertas.includes(7)"
            class="px-5 py-4 bg-white text-gray-700 leading-relaxed"
          >
            Sí, aceptamos devoluciones de productos dentro de los 7 días posteriores a la entrega, siempre que estén en buen estado.
          </div>
        </div>

        <!-- PREGUNTA 8 -->
        <div class="border border-gray-200 rounded-lg overflow-hidden">
          <button 
            @click="alternarPregunta(8)"
            class="w-full flex items-center justify-between px-5 py-4 bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <div class="flex items-center gap-3">
              <span class="flex items-center justify-center w-8 h-8 bg-green-600 text-white text-sm font-bold rounded-full">
                8
              </span>
              <span class="text-left font-semibold text-gray-900">
                ¿Cómo realizo una devolución?
              </span>
            </div>
            <svg 
              :class="{ 'rotate-180': preguntasAbiertas.includes(8) }"
              class="w-5 h-5 text-green-600 transition-transform duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div 
            v-show="preguntasAbiertas.includes(8)"
            class="px-5 py-4 bg-white text-gray-700 leading-relaxed"
          >
            Contacta a nuestro equipo de soporte, y te indicaremos los pasos a seguir para procesar la devolución.
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// ESTADO PARA CONTROLAR QUE PREGUNTAS ESTAN ABIERTAS
const preguntasAbiertas = ref([]);

// FUNCION PARA EXPANDIR O CONTRAER LA RESPUESTA DE LA PREGUNTA
const alternarPregunta = (idPregunta) => {
  const indice = preguntasAbiertas.value.indexOf(idPregunta);
  if (indice > -1) {
    preguntasAbiertas.value.splice(indice, 1);
  } else {
    preguntasAbiertas.value.push(idPregunta);
  }
};
</script>

<style scoped>
.hover-strong-dark:hover {
  font-weight: 700;      
  color: #10593b;        
  transition: all 0.2s ease-in-out;
}
</style>