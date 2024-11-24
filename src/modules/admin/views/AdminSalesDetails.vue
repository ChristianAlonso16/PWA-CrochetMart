<template lang="">
    <div class="mx-6 p-0">
        <ScrollPanel style="width: 100%; height: 85vh">
            <div class="grid">
                <div class="col-12">
                    <h2>Estado del pedido</h2>
                </div>
            </div>
            <ProgressOrder
                v-if="details?.status"
                :status="details?.status"
            />
            <div class="grid">
                <div class="col-12">
                    <h2>Detalles del pedido</h2>
                </div>
            </div>
            <DetailsOrder
                v-if="details?.total && details?.address"
                :total="details?.total" 
                :address="details?.address"
                
            />
            <div class="grid">
                <div class="col-12">
                    <h2>Productos del pedido</h2>
                </div>
            </div>
        <ProductsOrder
            v-if="details?.products"
            :products="details?.products"
        />
    </ScrollPanel>
    </div>
</template>
<script>
import ProgressOrder from '../components/orders/ProgressOrder.vue';
import DetailsOrder from '../components/orders/DetailsOrder.vue';
import ProductsOrder from '../components/orders/ProductsOrder.vue';
import ScrollPanel from 'primevue/scrollpanel';
import AdminServices from "../services/AdminServices";
export default {
    components: {
        ProgressOrder,
        DetailsOrder,
        ProductsOrder,
        ScrollPanel,
    },
    data() {
        return {
            details: {},
            order: null,
        }
    },
    methods: {
        async getDetailOrde(numOrder) {
            try {
                const response = await AdminServices.getOrderByNumOrder(numOrder);
                const { data, statusCode } = response;
                console.log(response);
                
                if (statusCode === 200) {
                    this.details = data;
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        const storedProduct = sessionStorage.getItem("selectedOrder");
        if (storedProduct) {
            this.order = JSON.parse(storedProduct);
            if (this.order) {
                this.$root.$emit("updateNavbarSubtitle", this.order.numOrder);
                this.getDetailOrde(this.order.numOrder);
            }
        }
    },
}
</script>