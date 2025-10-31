<template>
    <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
        @click="$router.push(`/producto/${product.id}`)">
        <div class="h-48 overflow-hidden">
            <img :src="product.image || 'https://static.wikia.nocookie.net/plantsvszombies/images/d/dd/Girasol2.png/revision/latest?cb=20160114201248&path-prefix=es'"
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
        </div>

        <div class="p-4 flex flex-col flex-grow">
            <h3 class="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
                {{ product.name }}
            </h3>

            <p class="text-sm text-primary-600 mb-3">{{ product.category }}</p>

            <div class="mt-auto flex items-center justify-between">
                <span class="text-xl font-extrabold text-green-700">
                    ${{ product.price.toFixed(2) }}
                </span>

                <Button icon="pi pi-shopping-cart" rounded severity="success" aria-label="Añadir al Carrito"
                    @click.stop="addToCart(product)" />
            </div>
        </div>
    </div>
</template>

<script setup>
/*
 * @purpose: Componente reutilizable para mostrar un solo producto en la vista de catálogo.
 * @tasks:
 * - [ ] Definir las propiedades (props) para recibir `product` (id, name, price, image, category).
 * - [ ] Implementar la función `addToCart` (debe llamar a la acción/mutación del store de Pinia/Vuex).
 * - [ ] Implementar la navegación a la vista `ProductDetail` al hacer clic en la tarjeta.
 * - [ ] Asegurar que el componente sea responsivo y la información se vea bien.
 */

import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
// Asumiendo que usas Pinia
// import { useCartStore } from '@/stores/cart'; 

const router = useRouter();
// const cartStore = useCartStore();

const props = defineProps({
    product: {
        type: Object,
        required: true,
        default: () => ({
            id: 1,
            name: 'Fertilizante Orgánico Premium x 5kg',
            price: 24.99,
            image: '',
            category: 'Fertilizantes',
        })
    }
});

const addToCart = (product) => {
    // Tarea: Implementar la lógica de añadir al carrito
    // console.log('Producto añadido al carrito:', product.name);
    // cartStore.addItem(product);
};
</script>

<style scoped>
/* Estilos adicionales */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>