<template>
  <section class="relative bg-gray-800 text-white min-h-[60vh] md:min-h-[70vh] flex items-center justify-center">
    
    <div class="absolute inset-0 bg-cover bg-center z-0 opacity-40 hero-background"></div>
    
    <div class="relative z-10 container mx-auto px-4 text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-4 leading-tight">
        Bienvenido a AgroMinerva
      </h1>
      <p class="text-lg md:text-2xl mb-8 max-w-3xl mx-auto">
        hola, mey sorprendeme.
      </p>
      
      <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button 
          label="Ir a la Tienda" 
          icon="pi pi-shopping-bag" 
          @click="$router.push('/tienda')"
          class="p-button-lg"
        />
        <Button 
          label="Conócenos" 
          severity="secondary" 
          outlined 
          @click="$router.push('/conocenos')"
          class="p-button-lg p-button-outlined"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
/*
 * @purpose: Componente reutilizable para el banner principal (Hero). Muestra el
 * eslogan principal de la empresa y los botones de Call to Action (CTA).
 * @tasks:
 * - [ ] Reemplazar la imagen de fondo en el tag <style> (clase .hero-background).
 * - [ ] Ajustar el título (h1) y la descripción (p) con el eslogan final de marketing.
 * - [ ] (Hecho) Conectar los botones de CTA a las rutas correctas (/tienda y /conocenos).
 * - [ ] (Opcional) Ajustar la opacidad (opacity-40) para mejorar la legibilidad del texto.
 * - [ ] (Opcional) Ajustar la altura mínima (min-h-[70vh]) según el diseño final.
 */

// Se asume que 'Button' está registrado globalmente en main.js, 
// de lo contrario, importarlo:
// import Button from 'primevue/button';
</script>

<style scoped>
.hero-background {
  /* Tarea: Reemplaza esta URL por la imagen de fondo deseada.
    Puedes usar una imagen local desde /src/assets/images/
  */
  background-image: url('https://images.unsplash.com/photo-1597916819313-08f0f0f81831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEyfHxhZ3JpY3VsdHVyZXxlbnwwfHx8fDE2Mjk0NzYyNzk&ixlib=rb-1.2.1&q=80&w=1920');
}
</style>