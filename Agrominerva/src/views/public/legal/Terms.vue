<template>
  <section class="py-16 px-4 md:px-8 lg:px-16 bg-white">
    <div class="max-w-5xl mx-auto">

      <!-- ENCABEZADO O TITULO -->
      <header class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900">Terminos y Condiciones</h1>

        <p
          class=" hover-strong-dark hover-strong mt-3 text-gray-500 text-sm italic cursor-pointer transition duration-300 hover:text-green-700 hover:tracking-wide">
          Última actualización: 15 de noviembre de 2025
        </p>

        <div class="w-20 h-[3px] bg-green-600 mx-auto mt-5 rounded-full"></div>
      </header>

      <!-- CONTENIDO INFOMATIVO TEXTUAL -->
      <div class="prose prose-gray max-w-none mb-10">
        <p class="text-gray-700 text-lg leading-relaxed">
          Bienvenido a AgroMinerva. Estos Términos y Condiciones regulan el uso de nuestro sitio web,
          productos y servicios. Al acceder o utilizar este sitio, usted acepta cumplir con lo aquí establecido.
        </p>
      </div>

      <!-- USO DEL SISTIO WEB -->
      <Accordion multiple class="shadow-lg rounded-xl border border-gray-200">
        <!-- 1 DESCRIPCION DEL USO DEL SITIO -->
        <AccordionTab header="1. Uso del sitio web" class="text-lg">
          <div class="prose prose-gray max-w-none">
            <p>
              El contenido de AgroMinerva está destinado para fines informativos y de venta de productos 
              agrícolas producidos por estudiantes del Departamento de Agronomía de la UES FMO.
            </p>
            <p>
              Usted se compromete a utilizar el sitio de forma responsable y evitar acciones que comprometan
              su funcionamiento o seguridad.
            </p>
          </div>
        </AccordionTab>

        <BR></BR>

        <!-- 2 DESCRIPCION DE LOS PRODUCTOS  disponibles -->
        <AccordionTab header="2. Productos y disponibilidad">
          <div class="prose prose-gray max-w-none">
            <p>
              Todos los productos ofrecidos provienen del campo experimental y prácticas académicas. 
              Debido a la naturaleza agrícola, la disponibilidad puede variar según las temporadas de cosecha.
            </p>
          </div>
        </AccordionTab>

        <BR></BR>

        <!-- 3 CONDICIONES DE LA COMPRA -->
        <AccordionTab header="3. Condiciones de compra">
          <div class="prose prose-gray max-w-none">
            <p>
              Al realizar una compra, el usuario acepta proporcionar información verdadera y actualizada. 
              Los precios están sujetos a cambios sin previo aviso.
            </p>
          </div>
        </AccordionTab>

        <BR></BR>

        <!-- 4 DECRIPCION DE PROTECCION DE DATOS -->
        <AccordionTab header="4. Protección de datos y privacidad">
          <div class="prose prose-gray max-w-none">
            <p>
              Los datos proporcionados por los usuarios serán utilizados únicamente para fines administrativos, 
              académicos y de contacto. No compartimos información con terceros sin consentimiento.
            </p>
          </div>
        </AccordionTab>

        <BR></BR>

        <!-- 5 ,I,ITACION Y REPSOSABILIDAD -->
        <AccordionTab header="5. Limitación de responsabilidad">
          <div class="prose prose-gray max-w-none">
            <p>
              AgroMinerva no se hace responsable por daños derivados del mal uso del sitio web, 
              fallos técnicos o información proporcionada por terceros.
            </p>
          </div>
        </AccordionTab>

        <BR></BR>

        <!-- 6 DESCRICICION DE CAMBIOS -->
        <AccordionTab header="6. Modificaciones a los términos">
          <div class="prose prose-gray max-w-none">
            <p>
              Nos reservamos el derecho de actualizar o modificar estos Términos y Condiciones en cualquier momento. 
              Las modificaciones entrarán en vigor al ser publicadas en esta página.
            </p>
          </div>
        </AccordionTab>
        
        <BR></BR>

        <!-- 7 CONTACTOS -->
        <AccordionTab header="7. Contacto">
          <div class="prose prose-gray max-w-none">
            <p>
              Si tiene preguntas o solicitudes relacionadas con estos términos, puede contactarnos a través 
              de los canales oficiales del proyecto AgroMinerva.
            </p>
          </div>
        </AccordionTab>

      </Accordion>

    </div>
  </section>
</template>


<script setup>
/*
 * @purpose: Mostrar los Términos y Condiciones del servicio.
 * @tasks:
 * - [ ] Cargar y maquetar el contenido legal estático.
 * - [ ] (Recomendado) Usar clases de tipografía (como @tailwindcss/typography) para formatear el texto.
 */
</script>

<style scoped>
.brillo-flotante {
  position: relative;
  transition: color 0.3s ease;
}

.brillo-flotante:hover {
  color: #16a34a; 
  text-shadow: 0 0 6px rgba(22, 163, 74, 0.5);
}

/* Subrayado animado */
/*.brillo-flotante::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 0%;
  height: 2px;
  background-color: #16a34a;
  transition: width 0.3s ease;
}*/

.brillo-flotante::after {
  width: 100%;
}
</style>
