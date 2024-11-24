<template lang="">
    <div class="col-12 lg:col-6 xl:col-4">
        <Card>
            <template #content>
                <div class="grid px-5">
                    <div class="col-12 sm:col-6 md:col-6 lg:col-6 xl:col-6 flex flex-column justify-content-between flex-wrap">
                        <h3>{{ title }}</h3>
                        <h5>{{ subtitle }}</h5>
                    </div>
                    <div class="col-12 sm:col-6 md:col-6 lg:col-6 xl:col-6 flex flex-column justify-content-between flex-wrap">
                        <div class="flex justify-content-end flex-wrap">
                            <i class="pi pi-link" style="font-size: 2rem"></i>  
                        </div>
                        <div class="flex justify-content-end flex-wrap">
                            <Button icon="pi pi-pencil" class="p-button-raised p-button-outlined "/>
                        </div>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>
<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
export default {
    components: {
        Card,
        Button,
    },
    props: { 
        title: { 
            type: String, 
            required: true 
        }, 
        subtitle: { 
            type: String, 
            required: true 
        } 
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
.p-card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
}
</style>