<template>
    <div class="landing-page">
        <Toast/>
        <main>
            <div class="grid row-carousel">
                <Carousel :value="carouselItems" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions">
                    <template #item="slotProps">
                        <div class="carousel-item">
                            <img :src="slotProps.data.image" :alt="slotProps.data.alt" />
                            <div class="carousel-caption">
                                <h2>{{ slotProps.data.title }}</h2>
                                <h4>{{ slotProps.data.text }}</h4>
                                <router-link class="btn-products" to="/productos">Ver Productos</router-link>
                            </div>
                        </div>
                    </template>
                </Carousel>
            </div>
            <div v-if="products.length" class="flex flex-row row-recientes">
                <div class="flex flex-column cres">
                    <div class="flex flex-row title-res">
                        <h1>Más Recientes</h1>
                        <router-link class="btn-products m-4" to="/productos">Más productos</router-link>
                    </div>
                    <div class="grid body-res">
                        <div class="card-wrapper" v-for="(product, index) in products" :key="index">
                            <ClientCard :product="product" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="flex justify-content-center">
                <h4>No hay productos disponibles en este momento.</h4>
            </div>
            <div v-if="products.length" class="flex flex-row row-recientes">
                <div class="flex flex-column cres">
                    <div class="flex flex-row title-res">
                        <h1>Por Categorías</h1>
                        <router-link class="btn-products m-4" to="/productos">Más productos</router-link>
                    </div>
                    <div class="grid body-res">
                        <div class="card-wrapper" v-for="(product, index) in products" :key="index">
                            <ClientCard :product="product" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="flex justify-content-center">
                <h4>No hay productos disponibles en este momento.</h4>
            </div>
            <div v-if="products.length" class="flex flex-row row-recientes">
                <div class="flex flex-column cres">
                    <div class="flex flex-row title-res">
                        <h1>Mejor Valorados</h1>
                        <router-link class="btn-products m-4" to="/productos">Más productos</router-link>
                    </div>
                    <div class="grid body-res">
                        <div class="card-wrapper" v-for="(product, index) in products" :key="index">
                            <ClientRatingCard :product="product" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="flex justify-content-center">
                <h4>No hay productos disponibles en este momento.</h4>
            </div>
            <div v-if="comments.length" class="flex flex-row row-comments">
                <div class="flex flex-column cres">
                    <div class="flex flex-row title-res">
                        <h1>Comentarios Destacados</h1>
                    </div>
                    <div class="grid body-res">
                        <div class="card-wrapper" v-for="(comment, index) in comments" :key="index">
                            <ClientCommentCard :comment="comment" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="flex justify-content-center">
                <h4>No hay comentarios disponibles en este momento.</h4>
            </div>
        </main>
    </div>
</template>

<script>
import Carousel from 'primevue/carousel';
import Toast from 'primevue/toast';
import ClientCard from '../components/ClientCard.vue';
import ClientRatingCard from '../components/ClientRatingCard.vue';
import ClientCommentCard from '../components/ClientCommentCard.vue';
import ClientServices from '@/modules/client/services/ClientServices';

export default {
    name: 'LandingPage',
    components: {
        Carousel, Toast, ClientCard, ClientRatingCard, ClientCommentCard
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
    padding: 0;
    margin: 0;
}

.row-carousel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    padding: 10px;
    gap: 10px;
}

.row-carousel .carousel-item {
    display: flex;
    justify-content: center;
    width: 100%;
    position: relative;
}

.row-carousel .carousel-item img {
    width: 100%;
    height: 586px;
}

.row-carousel .carousel-caption {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    text-shadow: 2px 2px 4px rgba(0,0,0,1);
}


.btn-products {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    background-color: #252525;
    border: none;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
                0px 2px 2px 0px rgba(0, 0, 0, 0.14),
                0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.btn-products:hover {
    background-color: #5a6268;
}

.btn-products:active {
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
                0px 8px 10px 1px rgba(0, 0, 0, 0.14),
                0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.btn-products:focus {
    outline: 0;
}

.row-recientes {
    width: 100%;
    padding: 10px;
    gap: 10px;
}

.row-recientes .cres {
    padding: 10px 30px;
    gap: 10px;
    flex: 1 0 0;
}

.row-recientes .title-res {
    padding: 10px;
    justify-content: space-between;
    align-self: stretch;
}

.row-recientes .body-res {
    padding: 0px 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 70px;
}

.row-recientes .card-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.row-comments {
    width: 100%;
    padding: 10px;
    gap: 10px;
}

.row-comments .cres {
    padding: 10px 30px;
    gap: 10px;
    flex: 1 0 0;
}

.row-comments .title-res {
    padding: 10px;
    justify-content: space-between;
    align-self: stretch;
}

.row-comments .body-res {
    padding: 0px 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr)); /* Cambiado de 250px a 30rem */
    gap: 70px;
}

.row-comments .card-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>