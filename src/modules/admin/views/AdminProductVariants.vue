<template>
  <div>
    <h1>Variantes para {{ product.name }}</h1>
    <Button class="p-button-primary" @click="openModal"> Agregar </Button>

    <AddVariantModalVue :visible.sync="isEditModalVisible" />
  </div>
</template>

<script>
import Button from "primevue/button";
import AddVariantModalVue from "../components/AddVariantModal.vue";
export default {
  components: {
    Button,
    AddVariantModalVue,
  },
  props: {
    numProduct: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      product: {},
      isEditModalVisible: false,
    };
  },
  mounted() {
    console.log("aca el numero:", this.numProduct);
    this.fetchProductDetails();
  },
  methods: {
    fetchProductDetails() {},
    openModal() {
      this.isEditModalVisible = true;
    },
  },
};
</script>
