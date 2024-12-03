<template>
  <div class="pt-5">
    <div class="col-12 search-container">
      <span class="p-input-icon-left">
        <i class="pi pi-search"></i>
        <InputText type="text" class="p-inputtext-lg" placeholder="Busca en CrochetMart" />
      </span>
    </div>
    <div class="col-12">
      <Galleria :value="images" :numVisible="5" :circular="true" :showItemNavigators="true" :showThumbnails="false"
        :showIndicators="true">
        <template #item="slotProps">
          <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="
              width: 100%;
              display: block;
              object-fit: contain;
              border-radius: 28px;
              object-position: center;
            " />
        </template>
      </Galleria>
    </div>
    <div class="px-4">
      <div class="grid pt-3">
        <h1>¡Nuevos productos!</h1>
      </div>
      <div class="mb-4">
        <div class="flex">
          <CardsProducts v-for="(product, index) in newProducts" :key="index" :product="product"
            @click="redirectToProduct(product.numProduct)" class="related-product-card" />
        </div>
      </div>
      <div class="grid pt-5">
        <h1>Categorías</h1>
      </div>
      <div>
        <div class="flex">
          <CategoryCard v-for="(category, index) in categories" :key="index" :category="category" class="p-4" />
        </div>
      </div>
      <div class="grid pt-5">
        <h1>Mejor Valorados</h1>
      </div>
      <div>
        <div class="flex">
          <CardsProducts v-for="(product, index) in topRatedProducts" :key="index" :product="product"
          @click="redirectToProduct(product.numProduct)" class="related-product-card" />
        </div>
      </div>
      <div class="grid pt-5">
        <h1>Comentarios Destacados</h1>
      </div>
      <div class="mb-4">
        <div class="grid">
          <div v-for="(review, index) in productReviews" :key="index" class="col-12 lg:col-6 xl:col-6">
            <ClientCardsReview :data="review" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Galleria from "primevue/galleria";
import InputText from "primevue/inputtext";
import CardsProducts from "../components/CardsProducts.vue";
import ClientCardsReview from "../components/ClientCardsReview.vue";
import CategoryCard from "../components/ClientCardCategory.vue";
import carouselImage1 from "@/assets/images/Banner-1.png";
import carouselImage2 from "@/assets/images/Banner-2.png";
import carouselImage3 from "@/assets/images/Banner-3.png";
import carouselImage4 from "@/assets/images/Banner-4.png";
import ClientService from "../services/ClientServices";
export default {
  components: {
    Galleria,
    CardsProducts,
    ClientCardsReview,
    CategoryCard,
    InputText,
  },
  data() {
    return {
      images: [
        {
          itemImageSrc: carouselImage1,
          alt: "Image 1",
        },
        {
          itemImageSrc: carouselImage2,
          alt: "Image 2",
        },
        {
          itemImageSrc: carouselImage3,
          alt: "Image 3",
        },
        {
          itemImageSrc: carouselImage4,
          alt: "Image 4",
        },
      ],
      topRatedProducts: [],
      newProducts: [],
      categories: [],
      productReviews: [],
    };
  },
  methods: {
    async getNewProducts() {
      try {
        const response = await ClientService.getNewProducts();
        this.newProducts = response.data.slice(0, 5);
      } catch (error) {
        console.log(error);
      }
    },
    async getTopRatedProducts() {
      try {
        const response = await ClientService.getTopRatedProducts();
        this.topRatedProducts = response.data.slice(0, 5);
      } catch (error) {
        console.log(error);
      }
    },
    async getCategories() {
      try {
        const response = await ClientService.getCategories();
        this.categories = response.data.slice(0, 10);
      } catch (error) {
        console.log(error);
      }
    },
    async getTopRatedComments() {
      try {
        const response = await ClientService.getTopRatedComments();
        this.productReviews = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    redirectToProduct(numProduct) {
      localStorage.setItem("selectedProduct", JSON.stringify(numProduct));
      this.$router.push({ name: "DetailsProduct" });
    },
  },
  mounted() {
    this.getNewProducts();
    this.getTopRatedProducts();
    this.getCategories();
    this.getTopRatedComments();
  },
};
</script>

<style lang="css">
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

.search-container {
  width: 100%;
}

.p-input-icon-left {
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid #d3d3d3;
}

.p-input-icon-left .p-inputtext {
  flex: 1;
  border: none;
  box-shadow: none;
  outline: none;
  width: 100%;
}
</style>