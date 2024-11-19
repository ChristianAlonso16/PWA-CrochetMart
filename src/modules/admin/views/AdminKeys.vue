<template lang="">
    <div class="px-5 root-element">
        <div class="grid">
            <h4>Administrar stripe keys</h4>
        </div>
        <div class="grid">
            <div class="col-12 lg:col-6 xl:col-4">
                <Card>
                    <template #content>
                        <div class="grid px-5">
                            <div class="col-12 sm:col-6 md:col-6 lg:col-6 xl:col-6 flex flex-column justify-content-between flex-wrap">
                                <h3>Key Stripe</h3>
                                <h5>Modificado</h5>
                                <p>20/10/204</p>
                            </div>
                            <div class="col-12 sm:col-6 md:col-6 lg:col-6 xl:col-6 flex flex-column justify-content-between flex-wrap">
                                <div class="flex justify-content-end flex-wrap">
                                    <i class="pi pi-key" style="font-size: 2rem"></i>   
                                </div>
                                <div class="flex justify-content-end flex-wrap">
                                    <Button icon="pi pi-pencil" class="p-button-raised p-button-outlined "/>
                                </div>
                            </div>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
        <div class="grid">
            <h4>Administrar links app movil</h4>
        </div>
        <div class="grid">
            <CardsLinks title="Link Play Store" subtitle="https://play.google.com/"/> 
            <CardsLinks title="Link App Store" subtitle="https://www.apple.com/"/>
        </div>
    </div>
</template>
<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
import CardsLinks from '../components/keys/CardsLinks.vue';
export default {
    components: {
        Card,
        Button,
        CardsLinks,
    }
}
</script>
<style scoped>
.p-button  {
    border-radius: 100px !important;
    background-color: #ffff !important;
    border-color: #252525 !important;
    color: #252525 !important;
    height: 50px !important;
    width: 50px !important;
}
</style>