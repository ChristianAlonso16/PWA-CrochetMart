<template lang="">
    <div class="col-12">
        <Card>
            <template #title>
                <div class="flex justify-content-between flex-wrap ">
                    <Rating v-model="rating" :stars="5" :readonly="true" :cancel="false"/>
                    <div class="align-content-center" style="font-size: 14px;">30 - Noviembre -2024</div>
                </div>
            </template>
            <template #content>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
            </template>
        </Card>
    </div>
</template>
<script>
import Card from 'primevue/card'
import Rating from 'primevue/rating';
export default {
    components: {
        Card,
        Rating,
    },
    data() {
        return {
            rating: 5,
        }
    },
}
</script>

<style lang="">
    
</style>