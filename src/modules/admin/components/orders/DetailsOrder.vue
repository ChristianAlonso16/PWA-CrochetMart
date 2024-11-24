<template lang="">
    <div class="grid">
        <div class="col-12">
            <Card>
                <template #content>
                    <div class="grid px-5">
                        <div class="col-12 sm:col-12 md:col-12 lg:col-6">
                            <h3>Direccion</h3>
                            <h3 class="color-text">Calle89Localidad396 01, Vysočina Region, okres Pelhřimov, Humpolec, SvětlicePaísCzechia, CZ (CZE)SubregiónEastern.</h3>
                        </div>
                        <div class="col-12 sm:col-12 md:col-12 lg:col-6">
                            <h3>Resumen</h3>
                            <div class="flex justify-content-between flex-wrap">
                                <h3 class="color-text m-0 mb-5">Subtotal</h3>
                                <h3 class="color-text m-0 mb-5">$36.00</h3>
                            </div>
                            <div class="flex justify-content-between flex-wrap">
                                <h3 class="color-text m-0 mb-5">Total</h3>
                                <h3 class="color-text m-0 mb-5">$72.00</h3>
                            </div>
                        </div>
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>
<script>
import Card from "primevue/card";
export default {
    components:{
        Card,
    },
    data() {
        return {
            
        }
    },
}
</script>

<style scoped>
.color-text {
    color: #7D7D7D;
}
</style>