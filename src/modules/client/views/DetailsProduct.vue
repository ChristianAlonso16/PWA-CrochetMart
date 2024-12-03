<template lang="">
    <div>
        <div class="grid pt-5">
            <div class="col-12 lg:col-6 xl:col-6">
                <div :class="paddingPosition == 'px-4' ? 'px-0' : 'pl-8'">
                    <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="4" :thumbnailsPosition="thumbnailsPosition"
                    :showItemNavigatorsOnHover="true" :showItemNavigators="true" :circular="true">
                        <template #item="slotProps">
                            <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; height: 500px; display: block; object-fit: cover;" />
                        </template>
                        <template #thumbnail="slotProps">
                            <div class="grid grid-nogutter justify-content-center">
                                <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="width: 60px; height: 60px; display: block; object-fit: cover;" />
                            </div>
                        </template>
                    </Galleria>
                </div>
            </div>
            <div class="col-12 lg:col-6 xl:col-6">
                <div :class="paddingPosition == 'px-8' ? 'pr-8' : paddingPosition">
                    <h2 class="m-0">{{productDetails.productVariant.product.name}}</h2>
                    <div class="flex align-items-center justify-content-start">
                        <Rating v-model="rating.avgProductReviews" :stars="5" :readonly="true" :cancel="false" />
                        <p class="m-2">({{rating.totalProductReviews}})</p>
                    </div>
                    <h1>${{productDetails.productVariant.price}}</h1>
                    <h3>Color</h3>
                    <ButtonSelectColor :colors="productDetails.attributeHasValue" @color-selected="handleColorSelected"/>
                    <h3>Cantidad</h3>
                    <div class="flex flex-row flex-wrap">
                        <div class="flex align-items-center justify-content-center mr-4 mb-4">
                            <ButtonCounter/>
                        </div>
                        <div class="flex align-items-center justify-content-center mb-4">
                            <Button label="Agregar al carrito" class="p-button"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="paddingPosition">
            <div class="pt-5">
                <h1>Descripcion</h1>
                <div>
                    <p class="m-0" style="font-size: 20px;">
                        {{productDetails.productVariant.product.productDescription}}
                    </p>
                </div>             
            </div>
            <div class="grid pt-5">
                <h1>Reseñas del producto</h1>
            </div>
            <div class="grid">
                <div class="col-12 lg:col-4 xl:col-3">
                    <TableReview :avgProductReviews="rating.avgProductReviews" :totalProductReviews="rating.totalProductReviews"/>
                </div>
                <div class="col-12 lg:col-8 xl:col-9" v-for="(comment, index) in comments" :key="index">
                    <ClientCardsReview :data="comment"/>
                </div>
            </div>
            <div class="grid pt-5">
                <h1>Productos relacionados</h1>
            </div>
            <div class="horizontal-scroll-container">
                <div class="flex">
                    <CardsProducts v-for="(product, index) in relatedProducts" :key="index" :product="product" class="related-product-card"/>
                </div>
            </div>
            <div class="grid pt-5">
                <h1>Productos con 4 estrellas o más</h1>
            </div>
            <div class="horizontal-scroll-container">
                <div class="flex">
                    <CardsProducts v-for="(product, index) in relatedProducts" :key="index" :product="product" class="related-product-card"/>
                </div>
            </div>
            <div class="grid pt-5">
                <h1>Tambien te puede interesar</h1>
            </div>
            <div class="horizontal-scroll-container">
                <div class="flex">
                    <CardsProducts v-for="(product, index) in relatedProducts" :key="index" :product="product" class="related-product-card"/>
                </div>
            </div>
        </div>      
    </div>
</template>

<script>
import Galleria from 'primevue/galleria';
import Rating from 'primevue/rating';
import Button from 'primevue/button';

import ClientCardsReview from '../components/ClientCardsReview.vue';
import ButtonCounter from '../components/ButtonCounter.vue';
import ButtonSelectColor from '../components/ButtonSelectColor.vue';
import TableReview from '../components/TableReview.vue';
import CardsProducts from '../components/CardsProducts.vue';
import ClientService from "../services/ClientServices";

export default {
    components: {
        Galleria,
        Rating,
        Button,

        ButtonCounter,
        ButtonSelectColor,
        ClientCardsReview,
        TableReview,
        CardsProducts,
    },
    data() {
        return {
            rating: [],
            images: [
                {
                    "itemImageSrc": "https://m.media-amazon.com/images/I/81Vx5EVsNNL._UF1000,1000_QL80_.jpg",
                    "thumbnailImageSrc": "https://m.media-amazon.com/images/I/81Vx5EVsNNL._UF1000,1000_QL80_.jpg",
                    "alt": "Description for Image 1",
                    "title": "Title 1"
                },
                {
                    "itemImageSrc": "https://cositaseva.es/wp-content/uploads/tulipan-patron-gratuito-crochet-cositaseva-hazloquetedelalana-1.jpg",
                    "thumbnailImageSrc": "https://cositaseva.es/wp-content/uploads/tulipan-patron-gratuito-crochet-cositaseva-hazloquetedelalana-1.jpg",
                    "alt": "Description for Image 2",
                    "title": "Title 2"
                },
                {
                    "itemImageSrc": "https://m.media-amazon.com/images/I/81Vx5EVsNNL._UF1000,1000_QL80_.jpg",
                    "thumbnailImageSrc": "https://m.media-amazon.com/images/I/81Vx5EVsNNL._UF1000,1000_QL80_.jpg",
                    "alt": "Description for Image 1",
                    "title": "Title 1"
                },
                {
                    "itemImageSrc": "https://cositaseva.es/wp-content/uploads/tulipan-patron-gratuito-crochet-cositaseva-hazloquetedelalana-1.jpg",
                    "thumbnailImageSrc": "https://cositaseva.es/wp-content/uploads/tulipan-patron-gratuito-crochet-cositaseva-hazloquetedelalana-1.jpg",
                    "alt": "Description for Image 2",
                    "title": "Title 2"
                },
                {
                    "itemImageSrc": "https://cositaseva.es/wp-content/uploads/tulipan-patron-gratuito-crochet-cositaseva-hazloquetedelalana-1.jpg",
                    "thumbnailImageSrc": "https://cositaseva.es/wp-content/uploads/tulipan-patron-gratuito-crochet-cositaseva-hazloquetedelalana-1.jpg",
                    "alt": "Description for Image 2",
                    "title": "Title 2"
                },
            ],
            responsiveOptions: [
                {
                    breakpoint: '1024px',
                    numVisible: 4
                },
                {
                    breakpoint: '768px',
                    numVisible: 4
                },
                {
                    breakpoint: '560px',
                    numVisible: 4
                }
            ],
            comments: [], // Contendrá las reseñas del producto
            relatedProducts: [],
            thumbnailsPosition: 'left',
            paddingPosition: 'px-8',
            home: {icon: 'pi pi-home', to: '/'},
            items: [
                {label: 'Peluches de flores'},
            ],
            productDetails: null, // Para los detalles del producto
            selectedColor: null, // Color seleccionado
        }
    },
    methods: {
        handleColorSelected(color) {
            this.selectedColor = color;
            console.log("Color seleccionado:", color);
        },
        updateThumbnailsPosition() {
            this.thumbnailsPosition = window.innerWidth <= 768 ? 'bottom' : 'left';
        },
        updatePadingPosition() {
            this.paddingPosition = window.innerWidth <= 768 ? 'px-4' : 'px-8';
        },
        async getVariationAttributes(productNum) {
            try {
                const response = await ClientService.getVariationAttributes(productNum);
                if (!response.error) {
                    this.productDetails = response.data[0]; // Guardamos los detalles del producto
                    // Ahora obtenemos las imágenes
                    // await this.fetchProductImages(this.productDetails.productVariant.idProductVariant);
                }
            } catch (error) {
                console.error("Error obteniendo atributos de variación:", error);
            }
        },
        // async fetchProductImages(variantId) {
        //     try {
        //         const response = await ClientService.getProductVariantImages(variantId);
        //         if (!response.error) {
        //             this.images = response.data.map(img => ({
        //                 itemImageSrc: img.url,
        //                 thumbnailImageSrc: img.url,
        //                 alt: img.description || "Product Image",
        //             }));
        //         }
        //     } catch (error) {
        //         console.error("Error obteniendo imágenes de producto:", error);
        //     }
        // },
        async getCommentsProduct(productNum) {
            try {
                const response = await ClientService.getReviewProduct(productNum);
                if (!response.error) {
                    this.comments = response.data.productReviews; // Accede a las reseñas
                    this.rating = response.data; // Accede a las estrellas
                }
            } catch (error) {
                console.error("Error obteniendo comentarios:", error);
            }
        },
        async getNewProducts() {
            try {
                const response = await ClientService.getNewProducts();
                this.relatedProducts = response.data.slice(0, 5);
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.getVariationAttributes("P008");
        this.getCommentsProduct("P008");
        this.getNewProducts();
        this.updateThumbnailsPosition();
        window.addEventListener('resize', this.updateThumbnailsPosition);
        this.updatePadingPosition();
        window.addEventListener('resize', this.updatePadingPosition);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateThumbnailsPosition);
        window.removeEventListener('resize', this.updatePadingPosition);
    }
}
</script>

<style lang="css">
.p-button {
    width: 257px;
    border-radius: 12%;
}

.horizontal-scroll-container {
    overflow-x: scroll;
    display: flex;
    scroll-behavior: smooth;
    padding-bottom: 1rem;
}

.horizontal-scroll-content {
    display: flex;
    gap: 1rem;
    scroll-snap-type: x mandatory;
}

.related-product-card {
    scroll-snap-align: start;
    flex: 0 0 auto;
    width: 220px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

.related-product-card:hover {
    transform: translateY(-5px);
}

.horizontal-scroll-container::-webkit-scrollbar {
    height: 8px;
}

.horizontal-scroll-container::-webkit-scrollbar-thumb {
    background-color: #252525;
    border-radius: 10px;
}
</style>