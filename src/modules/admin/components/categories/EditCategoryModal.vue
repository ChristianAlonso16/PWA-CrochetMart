<template>
    <Dialog
      class="font-bold"
      :containerStyle="{ width: '70vw' }"
      modal
      closable
      @hide="closeModal"
      header="Editar Categoría"
      :visible.sync="localVisible"
    >
      <div class="p-fluid mt-3">
        <div class="field">
          <label for="categoryName">Nombre de la Categoría</label>
          <InputText
            id="categoryName"
            v-model="categoryData.categoryName"
            :class="{ 'p-invalid': !isNameValid && attemptedSubmit }"
          />
          <small v-if="!isNameValid && attemptedSubmit" class="p-error">
            El nombre es obligatorio y debe tener menos de 100 caracteres
          </small>
        </div>
        <div class="field">
          <label for="categoryDescription">Descripción</label>
          <Textarea
            id="categoryDescription"
            v-model="categoryData.categoryDescription"
            rows="5"
            :class="{ 'p-invalid': !isDescriptionValid && attemptedSubmit }"
          />
          <small v-if="!isDescriptionValid && attemptedSubmit" class="p-error">
            La descripción es obligatoria
          </small>
        </div>
      </div>
      <template #footer>
        <Button
          label="Cancelar"
          class="p-button-text p-button-secondary"
          @click="closeModal"
        />
        <Button class="p-button" label="Guardar" @click="updateCategory" />
      </template>
    </Dialog>
  </template>
  
  <script>
  import Dialog from "primevue/dialog";
  import InputText from "primevue/inputtext";
  import Textarea from "primevue/textarea";
  import Button from "primevue/button";
  
  export default {
    components: {
      Dialog,
      InputText,
      Textarea,
      Button,
    },
    props: {
      category: Object,
      visible: Boolean,
    },
    data() {
      return {
        localVisible: this.visible,
        categoryData: { ...this.category },
        attemptedSubmit: false,
      };
    },
    watch: {
      visible(newVal) {
        this.localVisible = newVal;
        if (newVal) {
          this.categoryData = { ...this.category };
        }
      },
      localVisible(newVal) {
        this.$emit("update:visible", newVal);
      },
    },
    computed: {
      isNameValid() {
        return this.categoryData.categoryName && this.categoryData.categoryName.length <= 100;
      },
      isDescriptionValid() {
        return this.categoryData.categoryDescription && this.categoryData.categoryDescription.trim() !== "";
      },
    },
    methods: {
      closeModal() {
        this.localVisible = false;
        this.$emit("close");
      },
      updateCategory() {
        this.attemptedSubmit = true;
        if (this.isNameValid && this.isDescriptionValid) {
          this.$emit("update-category", this.categoryData);
          this.closeModal();
        }
      },
    },
  };
  </script>
  