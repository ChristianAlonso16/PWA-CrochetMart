<template lang="">
    <div class="grid">
        <div class="col-12">
            <Card>
                <template #content>
                    <div class="grid px-5">
                        <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex justify-content-center flex-wrap">
                            <ImagePreview src="https://www.elsoldemorelia.com.mx/gossip/funx8q-crochet/ALTERNATES/LANDSCAPE_1140/crochet" alt="Image" width="150" height="150" />
                        </div>
                        <div class="col-12 md:col-6 lg:col-5 xl:col-5">
                            <p class="text-black">Estambre</p>
                            <p class="text-gray">Color:  Blanco</p>
                            <p class="text-gray">Cantidad:  1</p>
                        </div>
                        <div class="col-12 lg:col-3 xl:col-4 flex justify-content-end flex-wrap">
                            <p class="text-black">Total: $66.00</p>
                        </div>
                    </div>
                </template>
            </Card>
        </div>     
    </div>
</template>
<script>
import Card from 'primevue/card'
import ImagePreview from 'primevue/imagepreview';
export default {
    components: {
        Card,
        ImagePreview,
    },
    data() {
        return {
            
        }
    },
}
</script>

<style scoped>
p {
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
}
.text-black{
    color: #252525;
}
.text-gray{
    color: #7D7D7D;
}
</style>