<template>
    <div class="landing-page">
        <main>
            <div class="grid row-carousel">
                <Carousel :value="carouselItems" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions">
                    <template #item="slotProps">
                        <div class="carousel-item">
                            <img :src="slotProps.data.image" :alt="slotProps.data.alt" />
                            <div class="carousel-caption">
                                <h2>{{ slotProps.data.title }}</h2>
                                <router-link class="btn-carousel" to="/productos">Ver Productos</router-link>
                            </div>
                        </div>
                    </template>
                </Carousel>
            </div>
        </main>
    </div>
</template>

<script>
import Carousel from 'primevue/carousel';

export default {
    name: 'LandingPage',
    components: {
        Carousel,
    },
    data() {
        return {
            carouselItems: [
                { image: '/images/carrusel1.jpg', alt: 'Carrusel 1', title: 'Descubre la Magia del Crochet' },
                { image: '/images/carrusel2.jpg', alt: 'Carrusel 2', title: 'Productos hechos a mano con amor y dedicación' }
            ],
            responsiveOptions: [
				{ breakpoint: '1024px', numVisible: 1, numScroll: 1 },
				{ breakpoint: '600px', numVisible: 1, numScroll: 1 },
				{ breakpoint: '480px', numVisible: 1, numScroll: 1 }
			],
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


.row-carousel .btn-carousel {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    background-color: #252525; /* color secundario */
    border: none;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
                0px 2px 2px 0px rgba(0, 0, 0, 0.14),
                0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.row-carousel .btn-carousel:hover {
    background-color: #5a6268;
}

.row-carousel .btn-carousel:active {
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
                0px 8px 10px 1px rgba(0, 0, 0, 0.14),
                0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.row-carousel .btn-carousel:focus {
    outline: 0;
}
</style>