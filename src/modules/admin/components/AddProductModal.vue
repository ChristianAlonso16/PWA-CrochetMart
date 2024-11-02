<template>
  <div>
    <Button class="p-button-primary" @click="openModal"> Agregar </Button>
    <Dialog
      class="font-bold"
      :containerStyle="{ width: '60vw' }"
      modal
      closable
      @hide="closeModal"
      header="Agregar producto"
      :visible.sync="visible"
    >
      <div class="p-fluid mt-3">
        <div class="field">
          <label for="product-name">Nombre</label>
          <InputText
            id="product-name"
            v-model="product.name"
            :class="{ 'p-invalid': !isNameValid && attemptedSubmit }"
          />
          <small v-if="!isNameValid && attemptedSubmit" class="p-error"
            >El nombre es obligatorio y debe tener menos de 100
            caracteres</small
          >
        </div>
        <div class="field">
          <label for="product-description">Descripción</label>
          <Textarea
            id="product-description"
            v-model="product.description"
            :class="{ 'p-invalid': !isDescriptionValid && attemptedSubmit }"
            rows="5"
            cols="30"
          />
          <small v-if="!isDescriptionValid && attemptedSubmit" class="p-error"
            >La descripción es obligatoria</small
          >
        </div>
        <div class="field">
          <label for="product-categories">Categorías</label>
          <MultiSelect
            id="product-categories"
            v-model="selectedCategories"
            :options="categories"
            optionLabel="categoryName"
            placeholder="Seleccione una categoría"
            display="chip"
            class="multi-select-overflow"
            :class="{ 'p-invalid': !isCategoryValid && attemptedSubmit }"
            appendTo="body"
          />
          <small v-if="!isCategoryValid && attemptedSubmit" class="p-error"
            >Seleccione al menos una categoría</small
          >
        </div>
      </div>
      <template #footer>
        <div class="flex justify-content-end gap-2 p-2">
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
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import MultiSelect from "primevue/multiselect";
import AdminServices from "@/modules/admin/services/AdminServices";

export default {
  components: {
    Dialog,
    InputText,
    Button,
    Textarea,
    MultiSelect,
  },
  data() {
    return {
      visible: false,
      product: {
        name: "",
        description: "",
      },
      selectedCategories: null,
      categories: [],
      attemptedSubmit: false,
    };
  },
  computed: {
    isNameValid() {
      return this.product.name && this.product.name.length <= 100;
    },
    isDescriptionValid() {
      return this.product.description && this.product.description.trim() !== "";
    },
    isCategoryValid() {
      return this.selectedCategories && this.selectedCategories.length > 0;
    },
  },
  methods: {
    closeModal() {
      this.visible = false;
      this.resetForm();
    },
    openModal() {
      this.visible = true;
    },
    saveProduct() {
      this.attemptedSubmit = true;
      if (this.isNameValid && this.isDescriptionValid && this.isCategoryValid) {
        console.log("pa guardar");
      }
    },
    resetForm() {
      this.product = {
        name: "",
        description: "",
      };
      this.selectedCategories = null;
      this.attemptedSubmit = false;
    },
    async getCategories() {
      try {
        const response = await AdminServices.getCategories();
        const { data, statusCode } = response;

        if (statusCode === 200) {
          this.categories = data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>
