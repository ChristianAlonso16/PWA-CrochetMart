<template>
    <div class="grid">
        <div class="col-3">
            <h1>Filtros</h1>
            <Card class="flex flex-column">
                <template #content>
                    <!-- Categoría -->
                    <Fieldset legend="Categoría" class="mb-3">
                        <Dropdown v-model="selectedCategory" :options="categories" optionLabel="categoryName" placeholder="Selecciona categoría" class="w-full"/>
                    </Fieldset>
                    <!-- Precio -->
                    <Fieldset legend="Precio" class="mb-3">
                        <div class="mb-2">
                            <span>Precio: ${{priceRange[0]}} - ${{priceRange[1]}}</span>
                        </div>
                        <Slider v-model="priceRange" :min="minPrice" :max="maxPrice" :range="true" class="w-full mb-2" />
                    </Fieldset>
                    <!-- Color -->
                    <Fieldset legend="Color" class="mb-3">
                        <div class="flex flex-wrap justify-content-center gap-2">
                            <ButtonSelectColor  :colors="availableColors" :initialSelectedColor="selectedColor" @color-selected="handleColorSelection" class="w-full"/>
                        </div>
                    </Fieldset>
                    <!-- Botón para aplicar filtros -->
                    <Button label="Aplicar Filtros" @click="fetchFilteredProducts" class="w-full mt-3" />
                </template>
            </Card>
        </div>
        <div class="col-9 pl-5">
            <h1>Productos</h1>
            <div v-if="products.length > 0" class="mb-4">
                <div class="grid gap-5">
                    <CardsProducts v-for="(product, index) in filteredProducts" :key="index" :product="product" class="related-product-card"/>
                </div>
            </div>
            <div v-else>
                <p>No se encontraron productos con los filtros seleccionados.</p>
            </div>
        </div>
    </div>
</template>

<script>
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import Slider from 'primevue/slider';
import Fieldset from 'primevue/fieldset';
import Button from 'primevue/button';

import ButtonSelectColor from '../components/ButtonSelectColor.vue';
import CardsProducts from "../components/CardsProducts.vue";
import ClientService from "../services/ClientServices";

export default {
    components: {
        Card,
        Dropdown,
        Slider,
        Fieldset,
        Button,
        ButtonSelectColor,
        CardsProducts,
    },
    data() {
        return {
            categories: [],
            products: [],
            availableColors: [], // Ahora incluye { name, value }
            selectedCategory: null,
            priceRange: [0, 2000], // Rango inicial del slider
            minPrice: 0,
            maxPrice: 2000,
            selectedColor: null, // Aquí se guardará el name del color
        };
    },
    computed: {
        filteredProducts() {
            return this.products.filter(product => product && typeof product === 'object');
        }
    },
    methods: {
        removeCategory(index) {
            this.selectedCategories.splice(index, 1);
        },
        async getCategory() {
            try {
                const response = await ClientService.getCategoryByStatus("enable");
                if (response && response.data) {
                    this.categories = response.data;
                }
            } catch (error) {
                console.error("Error obteniendo categorías:", error);
            }
        },
        async getMinMaxPrice() {
            try {
                const response = await ClientService.getMinAndMaxPrice();
                if (response && response.data) {
                    this.minPrice = response.data.minPrice;
                    this.maxPrice = response.data.maxPrice;
                    this.priceRange = [this.minPrice, this.maxPrice]; // Sincroniza el rango inicial
                }
            } catch (error) {
                console.error('Error obteniendo precios:', error);
            }
        },
        async getColors() {
            try {
                const response = await ClientService.getAttributeByName("color");
                if (response && response.data) {
                    // Guardar la estructura { name, value }
                    this.availableColors = response.data.map(color => ({
                        name: color.name,
                        value: color.value, // Convertimos el valor a hexadecimal
                    }));
                }
            } catch (error) {
                console.error("Error obteniendo colores:", error);
            }
        },
        async fetchFilteredProducts() {
            try {
                // Preparamos los filtros
                const filters = {
                    color: this.selectedColor || null, // Ahora se usa el name
                    category: this.selectedCategory?.categoryName || null,
                    minPrice: this.priceRange[0],
                    maxPrice: this.priceRange[1],
                };
                // Eliminamos los filtros nulos o vacíos
                Object.keys(filters).forEach(key => {
                    if (!filters[key]) delete filters[key];
                });
                console.log("Filtros enviados:", filters); // <-- Depuración
                const response = await ClientService.getProductsByFilters(filters);
                if (response && response.data && Array.isArray(response.data)) {
                    console.log(response.data);
                    this.products = response.data; // Asignamos el array de productos
                } else {
                    console.error("El formato de respuesta no es válido.");
                    this.products = [];
                }
            } catch (error) {
                console.error("Error obteniendo productos filtrados:", error);
            }
        },
        handleColorSelection(color) {
            console.log("Color seleccionado:", color);
            this.selectedColor = color.name; // Actualizar el color seleccionado
        },
    },
    mounted() {
        this.getCategory();
        this.getMinMaxPrice();
        this.getColors(); // Consumir colores al montar la pantalla
        this.fetchFilteredProducts();
    },
};
</script>

<style scoped>
.horizontal-scroll-container {
    overflow-x: scroll;
    display: flex;
    scroll-behavior: smooth;
    padding-bottom: 1rem;
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
</style>