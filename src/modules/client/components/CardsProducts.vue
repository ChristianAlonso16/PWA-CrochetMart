<template>
    <div class="product-card surface-card p-3 shadow-2 border-round mx-2">
      <img :src="product.image" alt="Producto" class="w-full border-round mb-3" />
      <div class="flex flex-column align-items-start">
        <h3 class="mt-0 mb-2">{{ product.name }}</h3>
        <p class="text-600 mb-3">{{ product.description }}</p>
        <div class="flex justify-content-between align-items-center w-full">
          <span class="text-xl font-bold">{{ formattedPrice }}</span>
          <Button 
            label="Añadir al carrito" 
            class="p-button-rounded p-button-sm"
            style="width: 150px;"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Button from 'primevue/button';
  
  export default {
    name: 'ProductCard',
    components: { 
        Button 
    },
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
    computed: {
      formattedPrice() {
        return `$${parseFloat(this.product.price).toFixed(2)}`;
      },
    },
  };
  </script>
  
  <style scoped>
  .product-card {
    width: 300px;
  }
  </style>
  