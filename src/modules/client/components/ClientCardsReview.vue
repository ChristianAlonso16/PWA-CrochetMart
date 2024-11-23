<template>
    <div class="col-12">
        <Card>
            <template #title>
                <div class="flex justify-content-between flex-wrap">
                     
                    <Rating 
                        v-model="localData.rating" 
                        :stars="5" 
                        :readonly="true" 
                        :cancel="false"
                    />
                    <div class="align-content-center" style="font-size: 14px;">
                        {{ formattedDate }}
                    </div>
                </div>
            </template>
            <template #content>
                <p class="m-0">
                    {{ localData.comment }}
                </p>
            </template>
        </Card>
    </div>
</template>

<script>
import Card from 'primevue/card';
import Rating from 'primevue/rating';

export default {
    components: {
        Card,
        Rating,
    },
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            localData: { ...this.data },
        };
    },
    computed: {
        formattedDate() {
            const date = new Date(this.localData.createdAt);
            return date.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            });
        },
    },
};
</script>
