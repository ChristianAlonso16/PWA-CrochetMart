<template>
  <Dialog
    class="font-bold"
    :containerStyle="{ width: '70vw' }"
    modal
    closable
    @hide="closeModal"
    header="Actualizar producto"
    :visible.sync="localVisible"
  >
    <div class="p-fluid mt-3">
      <div class="field">
        <label for="productName">Nombre</label>
        <InputText
          id="productName"
          v-model="product.name"
          :class="{ 'p-invalid': !isNameValid && attemptedSubmit }"
        />
        <small v-if="!isNameValid && attemptedSubmit" class="p-error">
          El nombre es obligatorio y debe tener menos de 100 caracteres
        </small>
      </div>
      <div class="field">
        <label for="productDescription">Descripción</label>
        <Textarea
          id="productDescription"
          v-model="product.productDescription"
          :class="{ 'p-invalid': !isDescriptionValid && attemptedSubmit }"
          rows="5"
          cols="30"
        />
        <small v-if="!isDescriptionValid && attemptedSubmit" class="p-error">
          La descripción es obligatoria
        </small>
      </div>
      <div class="field">
        <label for="productCategories">Categorías</label>
        <MultiSelect
          id="productCategories"
          v-model="selectedCategories"
          :options="categories"
          optionLabel="categoryName"
          placeholder="Seleccione una categoría"
          display="chip"
          class="multi-select-overflow"
          :class="{ 'p-invalid': !isCategoryValid && attemptedSubmit }"
          appendTo="body"
        />
        <small v-if="!isCategoryValid && attemptedSubmit" class="p-error">
          Seleccione al menos una categoría
        </small>
      </div>
    </div>
    <template #footer>
      <Button
        label="Cancelar"
        @click="closeModal"
        class="p-button-text p-button-secondary"
      />
      <Button class="p-button" label="Actualizar" @click="updateProduct" />
    </template>
  </Dialog>
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
  props: {
    numProduct: {
      type: String,
      default: "P0",
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localVisible: this.visible,
      product: {
        name: "",
        productDescription: "",
      },
      selectedCategories: null,
      categories: [],
      attemptedSubmit: false,
    };
  },
  watch: {
    visible(newVal) {
      this.localVisible = newVal;
    },
  },
  computed: {
    isNameValid() {
      return this.product.name && this.product.name.length <= 100;
    },
    isDescriptionValid() {
      return (
        this.product.productDescription &&
        this.product.productDescription.trim() !== ""
      );
    },
    isCategoryValid() {
      return this.selectedCategories && this.selectedCategories.length > 0;
    },
  },
  methods: {
    closeModal() {
      this.localVisible = false;
      this.$emit("close");
      this.resetForm();
    },
    async getProductDetails() {
      try {
        const response = await AdminServices.getProductDetails(this.numProduct);
        const { data, statusCode } = response;
        if (statusCode === 200) {
          this.product = data;
          this.selectedCategories = data.categories || [];
        }
      } catch (error) {
        console.log(error);
      }
    },
    updateProduct() {
      this.attemptedSubmit = true;
      if (this.isNameValid && this.isDescriptionValid && this.isCategoryValid) {
        console.log(" atualizar");
      }
    },
    resetForm() {
      this.product = { name: "", productDescription: "" };
      this.selectedCategories = null;
      this.attemptedSubmit = false;
    },
    async getCategories() {
      try {
        const response = await AdminServices.getCategoriesByStatus();
        if (response.statusCode === 200) {
          this.categories = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getProductDetails();
    this.getCategories();
  },
};
</script>
