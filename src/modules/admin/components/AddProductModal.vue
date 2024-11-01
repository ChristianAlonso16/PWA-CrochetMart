<template>
  <Dialog
    header="Agregar Producto"
    class="font-bold"
    :visible="visible"
    :containerStyle="{ width: '50vw' }"
    modal
    @hide="closeModal"
  >
    <div class="p-fluid mt-3">
      <div class="field">
        <label for="productName">Nombre</label>
        <InputText id="productName" v-model="product.name" />
      </div>
      <div class="field">
        <label for="productCategory">Descripción</label>
        <Textarea v-model="product.description" rows="5" cols="30" />
      </div>
      <div class="field">
        <label for="productReviews">Categorías</label>
        <MultiSelect
          v-model="selectedCategories"
          :options="cities"
          optionLabel="name"
          placeholder="Seleccione una categoría"
          display="chip"
          class="multi-select-overflow"
        />
      </div>
    </div>
    <template #footer>
      <Button
        label="Cancelar"
        @click="closeModal"
        class="p-button-text p-button-secondary"
      />
      <Button
        class="p-button"
        label="Registrar"
        @click="saveProduct"
        autofocus
      />
    </template>
  </Dialog>
</template>
<script>
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import MultiSelect from "primevue/multiselect";

export default {
  components: {
    Dialog,
    InputText,
    Button,
    Textarea,
    MultiSelect,
  },
  props: {
    visible: Boolean,
  },
  data() {
    return {
      product: {
        name: "",
        description: "",
      },
      selectedCategories: null,
      cities: [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
      this.resetForm();
    },
    saveProduct() {
      console.log("para guardar");
    },
    resetForm() {
      this.product = {
        name: "",
        description: "",
      };
      this.selectedCategories = null;
    },
  },
};
</script>
