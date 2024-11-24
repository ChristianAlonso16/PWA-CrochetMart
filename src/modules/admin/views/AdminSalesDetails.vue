<template lang="">
    <div class="mx-6 p-0">
        <ScrollPanel style="width: 100%; height: 85vh">
            <div class="grid">
                <div class="col-12">
                    <h2>Estado del pedido</h2>
                </div>
            </div>
            <ProgressOrder/>
            <div class="grid">
                <div class="col-12">
                    <h2>Detalles del pedido</h2>
                </div>
            </div>
            <DetailsOrder/>
            <div class="grid">
                <div class="col-12">
                    <h2>Productos del pedido</h2>
                </div>
            </div>
        <ProductsOrder/>
    </ScrollPanel>
    </div>
</template>
<script>
import ProgressOrder from '../components/orders/ProgressOrder.vue';
import DetailsOrder from '../components/orders/DetailsOrder.vue';
import ProductsOrder from '../components/orders/ProductsOrder.vue';
import ScrollPanel from 'primevue/scrollpanel';
export default {
    components: {
        ProgressOrder,
        DetailsOrder,
        ProductsOrder,
        ScrollPanel,
    },
    data() {
        return {
            
        }
    },
}
</script>