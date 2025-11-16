<template>
  <section class="py-14 px-4 md:px-10 lg:px-16 bg-white">
    <div class="max-w-4xl mx-auto">

      <!-- ENCbeZADO TITULO -->
      <header class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900">Política de Privacidad</h1>

        <p
          class=" hover-strong-dark hover-strong mt-3 text-gray-500 text-sm italic cursor-pointer transition duration-300 hover:text-green-700 hover:tracking-wide">
          Última actualización: 15 de noviembre de 2025
        </p>

        <div class="w-20 h-[3px] bg-green-600 mx-auto mt-5 rounded-full"></div>
      </header>

      <!-- TEXTO DE INTRODUCCION  -->
      <article class="prose prose-gray lg:prose-lg max-w-none mb-12">
        <p>
          En <strong>AgroMinerva</strong> estamos comprometidos con la protección de los datos personales
          de nuestros usuarios, clientes y comunidad. Esta Política de Privacidad explica de manera clara y
          transparente cómo gestionamos la información relacionada con la venta de productos agrícolas y
          agroindustriales elaborados por estudiantes del Departamento de Agronomía de la UES FMO.
        </p>

        <p class="hover-strong-dark">
          Al utilizar nuestra plataforma, usted acepta los lineamientos descritos en este documento.
        </p>
      </article>

      <!-- ACOOORDES -->
      <Accordion class="clean-accordion" multiple>

        <!-- ACUERDO 1 -->
        <AccordionTab header="1. Información que recopilamos">
          <div class="prose prose-gray lg:prose-lg listas">
            <span class="text-left font-semibold text-gray-900">1. Información que recopilamos</span>
            <ul>
              <li><strong>Datos personales:</strong> nombre, teléfono, correo electrónico.</li>
              <li><strong>Datos de compra:</strong> productos adquiridos, historial de pedidos.</li>
              <li><strong>Datos técnicos:</strong> IP, navegador, tiempos de visita.</li>
              <li><strong>Mensajes:</strong> consultas, formularios o retroalimentación enviada.</li>
            </ul>
          </div>
        </AccordionTab>

        <br>
        <!-- CAUREDO 2 COMO UTLIZAMOS LA INFOMACION  -->
        <AccordionTab header="2. Cómo utilizamos la información">
          <div class="prose prose-gray lg:prose-lg listas">
          <span class="text-left font-semibold text-gray-900">2. Cómo utilizamos la información</span>

            <p class="hover-strong-dark">Utilizamos los datos recopilados para los siguientes propósitos:</p>
            <ul class="">
              <li>Procesar pedidos, pagos y entregas.</li>
              <li>Mejorar la experiencia general del usuario.</li>
              <li>Enviar notificaciones sobre productos o promociones.</li>
              <li>Garantizar la seguridad técnica del sitio.</li>
              <li>Proporcionar soporte y atención al cliente.</li>
            </ul>
          </div>
        </AccordionTab>

        <br>
        <!-- ACUERDO 3 MEDIDAD DE SEGURUDAD -->
        <AccordionTab header="3. Medidas de seguridad">
          <article class="prose prose-gray lg:prose-lg max-w-none mb-12">
         <span class="text-left font-semibold text-gray-900">3. Medidas de seguridad</span>

            <p>
              Implementamos medidas de protección técnicas y administrativas diseñadas para evitar accesos no
              autorizados, pérdidas o alteración de los datos personales. Aunque ningún sistema es totalmente
              infalible, trabajamos continuamente para fortalecer la seguridad de la información.
            </p>
          </article>
        </AccordionTab>

        <!-- ACUERDO 4 NO  COMPOATIMOS INFOMACION -->
        <AccordionTab header="4. Compartición de datos">
          <div class="prose prose-gray lg:prose-lg listas">
          <span class="text-left font-semibold text-gray-900">4. Compartición de datos</span>
            <p><strong>AgroMinerva no vende ni comercializa información personal.</strong></p>
            <p class="hover-strong-dark">Podemos compartir datos únicamente con:</p>
            <ul class="litas">
              <li>Servicios de mensajería para completar entregas.</li>
              <li>Proveedores tecnológicos que soportan la plataforma.</li>
            </ul>
          </div>
        </AccordionTab>

        <br>
        <!-- ACUERDO 5 DERECHOS DEL USUARIO -->
        <AccordionTab header="5. Derechos del usuario">
          <div class="prose prose-gray lg:prose-lg listas">
          <span class="text-left font-semibold text-gray-900">5. Derechos del usuario</span>
            <p class="hover-strong-dark">Usted puede solicitar:</p>
            <ul>
              <li>Acceso a los datos almacenados sobre usted.</li>
              <li>Corrección de información incorrecta.</li>
              <li>Eliminación de datos, según aplique la ley.</li>
              <li>Restricción del tratamiento de su información.</li>
            </ul>
          </div>
        </AccordionTab>

        <br> 
        <!-- ACUERDO 6 USO DE COKKIE-->
        <AccordionTab header="6. Uso de cookies">
          <article class="prose prose-gray lg:prose-lg max-w-none mb-12">
          <span class="text-left font-semibold text-gray-900">6. Uso de cookies</span>
            <p>
              Utilizamos cookies para mejorar la navegación, analizar el rendimiento y recordar preferencias del
              usuario. Puede deshabilitarlas desde su navegador, aunque algunas funciones podrían verse afectadas.
            </p>
          </article>
        </AccordionTab>

        <!-- ACUERDO 7 MODIDIFCACIONES DE POLITICAS  -->
        <AccordionTab header="7. Modificaciones a esta política">
          <article class="prose prose-gray lg:prose-lg max-w-none mb-12">
          <span class="text-left font-semibold text-gray-900">7. Modificaciones a esta política</span>
            <p class="hover">
              Podemos actualizar esta Política de Privacidad cuando sea necesario. La fecha de última
              modificación siempre estará visible en la parte superior de esta página.
            </p>
          </article>
        </AccordionTab>

      </Accordion>

    </div>
  </section>
</template>

<style scoped>
/* ANIMACIONE ” */
.hover-strong:hover {
  color: #16a34a;
  font-weight: 700;
  transition: all 0.25s ease-in-out;
}

.listas ul li {
  margin-top: 2px !important;
  margin-bottom: 2px !important;
  padding-left: 0;
  list-style-position: inside;
}
.listas ul li {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

.hover-strong-dark:hover {
  font-weight: 700;      
  color: #10593b;        
  transition: all 0.2s ease-in-out;
}
</style>

<script setup>
/*
 * @purpose: Mostrar la Política de Privacidad.
 * @tasks:
 * - [ ] Cargar y maquetar el contenido legal estático.
 * - [ ] (Recomendado) Usar clases de tipografía usar @tailwindcss/typography para formatear el texto.
 */
</script>