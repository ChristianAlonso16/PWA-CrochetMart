<template>
    <div class="p-0 m-0 landing-page">
        <Toast/>
        <main>
            <div class="grid flex flex-column justify-content-center align-items-start w-full row-carousel">
                <Carousel :value="carouselItems" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions">
                    <template #item="slotProps">
                        <div class="flex justify-content-center relative w-full">
                            <img class="w-full" :src="slotProps.data.image" :alt="slotProps.data.alt" />
                            <div class="absolute top-50 left-50 text-center text-white carousel-caption">
                                <h2 class="text-2xl lg:text-4xl">{{ slotProps.data.title }}</h2>
                                <h4 class="text-lg lg:text-2xl">{{ slotProps.data.text }}</h4>
                                <ButtonProductLink to="/productos">Ver Productos</ButtonProductLink>
                            </div>
                        </div>
                    </template>
                </Carousel>
            </div>
            <div v-if="products.length" class="p-3 gap-1">
                <div class="flex flex-column w-full p-3">
                    <div class="flex flex-row justify-content-between align-items-stretch mb-3 p-3">
                        <h1 class="text-4xl">Más Recientes</h1>
                        <ButtonProductLink class="m-4" to="/productos">Más productos</ButtonProductLink>
                    </div>
                    <div class="grid px-4 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <div class="flex justify-content-center align-items-center" v-for="(product, index) in products" :key="index">
                            <ClientCard :product="product" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="flex justify-content-center mt-4">
                <h4>No hay productos disponibles en este momento.</h4>
            </div>
            <div v-if="products.length" class="p-3 gap-1">
                <div class="flex flex-column w-full p-3">
                    <div class="flex flex-row justify-content-between align-items-stretch mb-3 p-3">
                        <h1 class="text-4xl">Por Categorías</h1>
                        <ButtonProductLink class="m-4" to="/productos">Más productos</ButtonProductLink>
                    </div>
                    <div class="grid px-4 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <div class="flex justify-content-center align-items-center" v-for="(product, index) in products" :key="index">
                            <ClientCard :product="product" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="flex justify-content-center mt-4">
                <h4>No hay productos disponibles en este momento.</h4>
            </div>
            <div v-if="products.length" class="p-3 gap-1">
                <div class="flex flex-column w-full p-3">
                    <div class="flex flex-row justify-content-between align-items-stretch mb-3 p-3">
                        <h1 class="text-4xl">Mejor Valorados</h1>
                        <ButtonProductLink class="m-4" to="/productos">Más productos</ButtonProductLink>
                    </div>
                    <div class="grid px-4 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <div class="flex justify-content-center align-items-center" v-for="(product, index) in products" :key="index">
                            <ClientRatingCard :product="product" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="flex justify-content-center mt-4">
                <h4>No hay productos disponibles en este momento.</h4>
            </div>
            <div v-if="comments.length" class="p-3 gap-1">
                <div class="flex flex-column w-full p-3">
                    <div class="flex flex-row justify-content-between align-items-center mb-3 p-3">
                        <h1 class="text-4xl">Comentarios Destacados</h1>
                    </div>
                    <div class="grid px-4 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <div class="flex justify-content-center align-items-center" v-for="(comment, index) in comments" :key="index">
                            <ClientCommentCard :comment="comment" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="flex justify-content-center mt-4">
                <h4>No hay comentarios disponibles en este momento.</h4>
            </div>
        </main>
    </div>
</template>

<script>
import Carousel from 'primevue/carousel';
import Toast from 'primevue/toast';
import ButtonProductLink from '../components/ButtonProductLink.vue';
import ClientCard from '../components/ClientCard.vue';
import ClientRatingCard from '../components/ClientRatingCard.vue';
import ClientCommentCard from '../components/ClientCommentCard.vue';
import ClientServices from '@/modules/client/services/ClientServices';

export default {
    name: 'LandingPage',
    components: {
        Carousel, Toast, ButtonProductLink, ClientCard, ClientRatingCard, ClientCommentCard
    },
    data() {
        return {
            carouselItems: [
                { image: '/images/carrusel1.jpg', alt: 'Carrusel 1', title: 'Descubre la Magia del Crochet', text: 'Productos hechos a mano con amor y dedicación' },
                { image: '/images/carrusel2.jpg', alt: 'Carrusel 2', title: 'Descubre la Magia del Crochet', text: 'Productos hechos a mano con amor y dedicación' }
            ],
            responsiveOptions: [
				{ breakpoint: '1024px', numVisible: 1, numScroll: 1 },
				{ breakpoint: '600px', numVisible: 1, numScroll: 1 },
				{ breakpoint: '480px', numVisible: 1, numScroll: 1 }
			],
            products: [],
            comments: []
        };
    },
    created() {
        this.fetchProducts();
        this.fetchComments();
    },
    methods: {
        async fetchProducts() {
            try {
                const response = await ClientServices.getProductsHome();
                const {data, statusCode} = response;
                if (statusCode === 200 && data.length > 0) {
                    this.products = data;
                    this.$toast.add({severity: 'success', summary: 'Productos cargados', detail: 'Los productos se han cargado correctamente.', life: 3000});
                } else {
                    this.$toast.add({severity: 'warn', summary: 'Sin productos', detail: 'No hay productos disponibles en este momento.', life: 3000});
                }
            } catch (error) {
                console.error(error);
                this.$toast.add({severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los productos.', life: 3000});
            }
        },
        fetchComments() {
            try {
                this.comments = [
                {
                        id: 1,
                        rating: 4,
                        date: '30 - Noviembre - 2024',
                        text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.'
                    },
                    {
                        id: 2,
                        rating: 5,
                        date: '30 - Noviembre - 2024',
                        text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.'
                    },
                    {
                        id: 3,
                        rating: 3,
                        date: '30 - Noviembre - 2024',
                        text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.'
                    }
                ];
                this.$toast.add({severity: 'success', summary: 'Comentarios cargados', detail: 'Los comentarios se han cargado correctamente.', life: 3000});
            } catch (error) {
                console.error('Error al cargar los comentarios:', error);
                this.$toast.add({severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los comentarios.', life: 3000});
            }
            console.log(this.comments);
        }
    }
};
</script>

<style scoped>
.landing-page {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, 
                Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.row-carousel {
    padding: 10px;
    gap: 10px;
}

.row-carousel img {
    height: 586px;
}

.row-carousel .carousel-caption {
    transform: translate(-50%, -50%);
    text-shadow: 2px 2px 4px rgba(0,0,0,1);
}
</style>