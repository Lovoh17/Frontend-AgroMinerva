<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl md:text-4xl font-bold mb-3 text-primary-700">
          Contáctanos
        </h1>
        <p class="text-base text-neutral-600 max-w-2xl mx-auto">
          Estamos aquí para ayudarte. Completa el formulario o comunícate directamente con nosotros.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Formulario de Contacto -->
        <Card class="shadow-lg border-0 overflow-hidden">
          <template #content>
            <div class="p-5">
              <div class="flex items-center gap-2 mb-5 pb-3 border-b-2 border-primary-100">
                <div class="w-9 h-9 bg-primary-700 rounded-lg flex items-center justify-center">
                  <i class="pi pi-envelope text-white"></i>
                </div>
                <h2 class="text-xl font-bold text-neutral-800">
                  Envíanos un Mensaje
                </h2>
              </div>

              <div class="space-y-4">
                <!-- Nombre -->
                <div class="flex flex-col gap-1.5">
                  <label for="name" class="font-semibold text-neutral-700 text-sm">
                    Nombre Completo <span class="text-secondary-500">*</span>
                  </label>
                  <InputText 
                    id="name"
                    v-model="formData.name"
                    placeholder="Juan Pérez"
                    class="w-full"
                    :class="{ 'p-invalid': errors.name }"
                    @blur="validateField('name')"
                  />
                  <small v-if="errors.name" class="p-error">
                    {{ errors.name }}
                  </small>
                </div>

                <!-- Email -->
                <div class="flex flex-col gap-1.5">
                  <label for="email" class="font-semibold text-neutral-700 text-sm">
                    Correo Electrónico <span class="text-secondary-500">*</span>
                  </label>
                  <InputText 
                    id="email"
                    v-model="formData.email"
                    type="email"
                    placeholder="juan.perez@ejemplo.com"
                    class="w-full"
                    :class="{ 'p-invalid': errors.email }"
                    @blur="validateField('email')"
                  />
                  <small v-if="errors.email" class="p-error">
                    {{ errors.email }}
                  </small>
                </div>

                <!-- Teléfono -->
                <div class="flex flex-col gap-1.5">
                  <label for="phone" class="font-semibold text-neutral-700 text-sm">
                    Teléfono
                  </label>
                  <InputText 
                    id="phone"
                    v-model="formData.phone"
                    placeholder="7890-1234"
                    class="w-full"
                  />
                </div>

                <!-- Asunto -->
                <div class="flex flex-col gap-1.5">
                  <label for="subject" class="font-semibold text-neutral-700 text-sm">
                    Asunto <span class="text-secondary-500">*</span>
                  </label>
                  <Dropdown 
                    id="subject"
                    v-model="formData.subject"
                    :options="subjectOptions"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Selecciona un asunto"
                    class="w-full"
                    :class="{ 'p-invalid': errors.subject }"
                    @change="validateField('subject')"
                  />
                  <small v-if="errors.subject" class="p-error">
                    {{ errors.subject }}
                  </small>
                </div>

                <!-- Mensaje -->
                <div class="flex flex-col gap-1.5">
                  <label for="message" class="font-semibold text-neutral-700 text-sm">
                    Mensaje <span class="text-secondary-500">*</span>
                  </label>
                  <Textarea 
                    id="message"
                    v-model="formData.message"
                    rows="4"
                    placeholder="Escribe tu mensaje aquí..."
                    class="w-full"
                    :class="{ 'p-invalid': errors.message }"
                    @blur="validateField('message')"
                  ></Textarea>
                  <small v-if="errors.message" class="p-error">
                    {{ errors.message }}
                  </small>
                </div>

                <!-- Información adicional -->
                <div class="bg-primary-50 border border-primary-200 rounded-lg p-3">
                  <div class="flex items-start gap-2">
                    <i class="pi pi-send text-primary-600 mt-0.5"></i>
                    <div>
                      <p class="text-primary-800 text-sm font-medium">
                        Tu mensaje será enviado directamente
                      </p>
                      <p class="text-primary-700 text-xs mt-1">
                        Recibirás una confirmación al correo: <strong>{{ formData.email || 'tu email' }}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Botón Enviar -->
                <Button 
                  @click="handleSubmit"
                  label="Enviar Mensaje" 
                  icon="pi pi-send" 
                  :loading="loading"
                  class="w-full bg-primary-600 hover:bg-primary-700 border-primary-600 text-white font-semibold py-2.5 transition-all duration-300 shadow-md hover:shadow-lg"
                ></Button>
              </div>
            </div>
          </template>
        </Card>

        <!-- Información de Contacto -->
        <div class="space-y-5">
          <!-- Info Card -->
          <Card class="shadow-lg border-0">
            <template #content>
              <div class="p-5">
                <div class="flex items-center gap-2 mb-5 pb-3 border-b-2 border-primary-100">
                  <div class="w-9 h-9 bg-primary-700 rounded-lg flex items-center justify-center">
                    <i class="pi pi-info-circle text-white"></i>
                  </div>
                  <h2 class="text-xl font-bold text-neutral-800">
                    Información de Contacto
                  </h2>
                </div>

                <div class="space-y-4">
                  <!-- Dirección -->
                  <div class="flex gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-primary-50 transition-colors duration-300">
                    <div class="flex-shrink-0">
                      <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center shadow-md">
                        <i class="pi pi-map-marker text-white"></i>
                      </div>
                    </div>
                    <div>
                      <h3 class="font-bold text-neutral-800 mb-1 text-sm">Dirección</h3>
                      <p class="text-neutral-600 text-sm leading-relaxed">
                        Universidad de El Salvador<br>
                        San Miguel, El Salvador
                      </p>
                    </div>
                  </div>

                  <!-- Teléfono -->
                  <div class="flex gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-primary-50 transition-colors duration-300">
                    <div class="flex-shrink-0">
                      <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center shadow-md">
                        <i class="pi pi-phone text-white"></i>
                      </div>
                    </div>
                    <div>
                      <h3 class="font-bold text-neutral-800 mb-1 text-sm">Teléfono</h3>
                      <a href="tel:+50374833786" class="text-primary-600 hover:text-primary-700 font-medium hover:underline text-sm">
                        (+503) 7483-3786
                      </a>
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="flex gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-primary-50 transition-colors duration-300">
                    <div class="flex-shrink-0">
                      <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center shadow-md">
                        <i class="pi pi-envelope text-white"></i>
                      </div>
                    </div>
                    <div>
                      <h3 class="font-bold text-neutral-800 mb-1 text-sm">Email</h3>
                      <a href="mailto:agrominervafmo@gmail.com" class="text-primary-600 hover:text-primary-700 font-medium hover:underline break-all text-sm">
                        agrominervafmo@gmail.com
                      </a>
                    </div>
                  </div>

                  <!-- Horario -->
                  <div class="flex gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-primary-50 transition-colors duration-300">
                    <div class="flex-shrink-0">
                      <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center shadow-md">
                        <i class="pi pi-clock text-white"></i>
                      </div>
                    </div>
                    <div>
                      <h3 class="font-bold text-neutral-800 mb-1 text-sm">Horario de Atención</h3>
                      <p class="text-neutral-600 text-sm leading-relaxed">
                        Lunes a Viernes: 7:00 AM - 4:00 PM<br>
                        Sábado: 8:00 AM - 12:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Redes Sociales -->
                <div class="mt-5 pt-5 border-t-2 border-neutral-100">
                  <h3 class="font-bold text-neutral-800 mb-3 text-sm">Síguenos en Redes Sociales</h3>
                  <div class="flex gap-2 flex-wrap">
                    <Button 
                      icon="pi pi-facebook" 
                      rounded
                      class="w-10 h-10 bg-white border-2 border-primary-600 text-primary-700 hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                      @click="openSocialMedia('facebook')"
                    ></Button>
                    <Button 
                      icon="pi pi-instagram" 
                      rounded
                      class="w-10 h-10 bg-white border-2 border-primary-600 text-primary-700 hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                      @click="openSocialMedia('instagram')"
                    ></Button>
                    <Button 
                      icon="pi pi-whatsapp" 
                      rounded
                      class="w-10 h-10 bg-white border-2 border-primary-600 text-primary-700 hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                      @click="openWhatsApp"
                    ></Button>
                  </div>
                </div>
              </div>
            </template>
          </Card>

          <!-- Mapa -->
          <Card class="shadow-lg border-0">
            <template #content>
              <div class="p-5">
                <div class="flex items-center gap-2 mb-4">
                  <div class="w-9 h-9 bg-primary-700 rounded-lg flex items-center justify-center">
                    <i class="pi pi-map text-white"></i>
                  </div>
                  <h2 class="text-xl font-bold text-neutral-800">
                    Nuestra Ubicación
                  </h2>
                </div>

                <div class="aspect-video rounded-lg overflow-hidden border-2 border-neutral-200 shadow-md mb-4">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3880.5614742981975!2d-88.16159952664137!3d13.439449204451991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f7ad60898c04ae9%3A0x7ddb6f49a38c1b43!2sFacultad%20Multidisciplinaria%20Oriental%20UES!5e0!3m2!1ses!2ssv!4v1763762713687!5m2!1ses!2ssv"
                    width="100%" 
                    height="100%" 
                    style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade"
                    title="Ubicación de AgroMinerva - Facultad Multidisciplinaria Oriental UES"
                  ></iframe>
                </div>
                <Button 
                  label="Ver en Google Maps" 
                  icon="pi pi-external-link" 
                  class="w-full bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                  @click="openGoogleMaps"
                ></Button>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>

    <!-- Toast para mensajes -->
    <Toast />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useToast } from 'primevue/usetoast'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { emailService } from '@/services/emailService'

const toast = useToast()

// Estado del formulario
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const loading = ref(false)

// Opciones de asunto
const subjectOptions = [
  { label: 'Información sobre programas', value: 'programas' },
  { label: 'Inscripciones', value: 'inscripciones' },
  { label: 'Consulta sobre productos', value: 'productos' },
  { label: 'Visitas guiadas', value: 'visitas' },
  { label: 'Colaboraciones', value: 'colaboraciones' },
  { label: 'Otro', value: 'otro' }
]

// Función de validación individual
const validateField = (field) => {
  errors[field] = ''

  switch (field) {
    case 'name':
      if (!formData.name) {
        errors.name = 'El nombre es requerido'
      } else if (formData.name.length < 3) {
        errors.name = 'El nombre debe tener al menos 3 caracteres'
      }
      break

    case 'email':
      if (!formData.email) {
        errors.email = 'El correo electrónico es requerido'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Ingresa un correo electrónico válido'
      }
      break

    case 'subject':
      if (!formData.subject) {
        errors.subject = 'Selecciona un asunto'
      }
      break

    case 'message':
      if (!formData.message) {
        errors.message = 'El mensaje es requerido'
      } else if (formData.message.length < 10) {
        errors.message = 'El mensaje debe tener al menos 10 caracteres'
      }
      break
  }
}

// Validar todo el formulario
const validateForm = () => {
  validateField('name')
  validateField('email')
  validateField('subject')
  validateField('message')

  return !errors.name && !errors.email && !errors.subject && !errors.message
}

// Enviar formulario
const handleSubmit = async () => {
  if (!validateForm()) {
    toast.add({
      severity: 'error',
      summary: 'Error de Validación',
      detail: 'Por favor completa todos los campos requeridos correctamente',
      life: 3000
    })
    return
  }

  loading.value = true

  try {
    // Enviar email usando EmailJS
    await emailService.sendContactEmail(formData)
    
    toast.add({
      severity: 'success',
      summary: '¡Mensaje Enviado!',
      detail: 'Tu mensaje ha sido enviado exitosamente. Te responderemos pronto.',
      life: 5000
    })

    // Resetear formulario
    setTimeout(() => {
      Object.keys(formData).forEach(key => formData[key] = '')
      Object.keys(errors).forEach(key => errors[key] = '')
    }, 1500)
    
  } catch (error) {
    console.error('Error al enviar el correo:', error)
    
    toast.add({
      severity: 'error',
      summary: 'Error al Enviar',
      detail: error.message || 'No se pudo enviar el mensaje. Por favor intenta nuevamente.',
      life: 5000
    })
  } finally {
    loading.value = false
  }
}

// Abrir redes sociales
const openSocialMedia = (platform) => {
  const urls = {
    facebook: 'https://www.facebook.com/profile.php?id=61580325832835',
    instagram: 'https://www.instagram.com/agrominerva_'
  }
  window.open(urls[platform], '_blank')
}

const openWhatsApp = () => {
  const message = 'Hola, me gustaría obtener información sobre AgroMinerva'
  const encodedMessage = encodeURIComponent(message)
  window.open(`https://wa.me/50374833786?text=${encodedMessage}`, '_blank')
}

const openGoogleMaps = () => {
  // Usando el link compartido que proporcionaste
  window.open('https://maps.app.goo.gl/NOsC8YaoBOFdw5rcB', '_blank')
}
</script>

<style scoped>
.p-invalid {
  border-color: #ef4444 !important;
}

.p-error {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

/* Estilos personalizados para inputs y dropdowns */
:deep(.p-inputtext),
:deep(.p-dropdown) {
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
}

:deep(.p-inputtext:focus),
:deep(.p-dropdown:focus) {
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

:deep(.p-inputtext:hover),
:deep(.p-dropdown:hover) {
  border-color: #86efac;
}

:deep(.p-dropdown-panel) {
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
</style>