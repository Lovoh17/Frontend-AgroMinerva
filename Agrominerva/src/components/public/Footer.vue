<template>
    <footer class="bg-tertiary-500 text-white mt-auto">
        <!-- Secciones Principales -->
        <div class="container mx-auto px-4 py-12">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                <!-- Columna 1: Logo y Descripción -->
                <div class="col-span-1 lg:col-span-2">
                    <div class="flex items-center space-x-3 mb-4">
                        <img src="../../assets/images/AGRO-MINERVA-VERTICAL-SIN-FONDO.png" alt="Logo AgroMinerva"
                            class="h-40 w-40" v-if="logo" />
                    </div>
                    <p class="text-primary-100 mb-6 max-w-md">
                        Líderes en soluciones agrícolas innovadoras. Ofrecemos productos de calidad, asesoramiento
                        experto
                        y el mejor servicio para el crecimiento de tu negocio agropecuario.
                    </p>

                    <!-- Redes Sociales -->
                    <div class="flex space-x-3">
                        <Button v-for="social in socialLinks" :key="social.name" :icon="social.icon" text
                            class="text-white hover:text-green-300 hover:bg-transparent rounded-full transition-colors"
                            severity="secondary" />
                    </div>

                </div>

                <!-- Columna 2: Navegación -->
                <div>
                    <h4 class="text-lg font-semibold mb-4 text-white">Navegación</h4>
                    <ul class="space-y-3">
                        <li v-for="item in navItems" :key="item.label">
                            <router-link :to="item.to" class="footer-link">
                                <i :class="item.icon" class="mr-2 text-sm"></i>
                                {{ item.label }}
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- Columna 3: Contacto -->
                <div>
                    <h4 class="text-lg font-semibold mb-4 text-white">Contacto</h4>
                    <div class="space-y-4">
                        <div class="flex items-start space-x-3">
                            <i class="pi pi-map-marker text-primary-200 mt-1"></i>
                            <span class="text-primary-100">*cambiar</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <i class="pi pi-phone text-primary-200"></i>
                            <span class="text-primary-100">*cambiar</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <i class="pi pi-envelope text-primary-200"></i>
                            <span class="text-primary-100">*cambiar</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <i class="pi pi-clock text-primary-200"></i>
                            <span class="text-primary-100">*cambiar</span>
                        </div>

                        <!-- Newsletter -->
                        <div class="mt-6 pt-4 border-t border-primary-600">
                            <p class="text-sm text-primary-200 mb-2">Suscríbete a nuestro newsletter agrícola</p>
                            <div class="flex space-x-2">
                                <InputText v-model="email" placeholder="Tu email"
                                    class="flex-1 bg-tertiary-600 border-tertiary-400 text-white placeholder-primary-300" />
                                <Button icon="pi pi-send"
                                    class="bg-accent-500 hover:bg-accent-600 border-accent-500 text-white"
                                    @click="subscribeNewsletter" :disabled="!email" />
                            </div>
                            <p class="text-xs text-primary-300 mt-2">
                                Recibe tips agrícolas y ofertas exclusivas
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Barra Inferior -->
        <div class="border-t border-primary-600 bg-tertiary-600">
            <div class="container mx-auto px-4 py-6">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <!-- Copyright -->
                    <p class="text-primary-200 text-sm mb-4 md:mb-0">
                        &copy; {{ currentYear }} AgroMinerva. Cultivando el futuro de la agricultura.
                    </p>

                    <!-- Enlaces Legales -->
                    <div class="flex flex-wrap justify-center space-x-6">
                        <router-link v-for="link in legalLinks" :key="link.label" :to="link.to" class="legal-link">
                            {{ link.label }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const email = ref('')
const logo = ref(true)
const currentYear = ref(new Date().getFullYear())

const navItems = [
    { label: 'Inicio', to: '/', icon: 'pi pi-home' },
    { label: 'Tienda', to: '/tienda', icon: 'pi pi-shopping-bag' },
    { label: 'Blog Agrícola', to: '/blog', icon: 'pi pi-book' },
    { label: 'Noticias', to: '/noticias', icon: 'pi pi-newspaper' },
    { label: 'Conócenos', to: '/conocenos', icon: 'pi pi-info-circle' }
]

const socialLinks = [
    { name: 'Facebook', icon: 'pi pi-facebook' },
    { name: 'Twitter', icon: 'pi pi-twitter' },
    { name: 'Instagram', icon: 'pi pi-instagram' },
    { name: 'LinkedIn', icon: 'pi pi-linkedin' },
    { name: 'YouTube', icon: 'pi pi-youtube' }
]

const legalLinks = [
    { label: 'Política de Privacidad', to: '/privacidad' },
    { label: 'Términos de Servicio', to: '/terminos' },
    { label: 'Política de Cookies', to: '/cookies' },
    { label: 'Aviso Legal', to: '/aviso-legal' }
]

const subscribeNewsletter = () => {
    if (email.value) {
        toast.add({
            severity: 'success',
            summary: '¡Suscrito Exitosamente!',
            detail: 'Gracias por unirte a nuestra comunidad agrícola.',
            life: 4000
        })
        email.value = ''
    }
}
</script>

<style scoped>
.footer-link {
    @apply flex items-center text-primary-200 hover:text-white hover:bg-primary-600 transition-colors no-underline py-2 px-3 rounded-lg;
}

.legal-link {
    @apply text-primary-200 hover:text-white text-sm transition-colors no-underline;
}

/* Estilos personalizados para el tema AgroMinerva */
:deep(.p-inputtext) {
    border-radius: 8px;
}

:deep(.p-button) {
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
}

:deep(.p-button:not(:disabled):hover) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>