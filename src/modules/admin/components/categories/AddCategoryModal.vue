<template>
  <div>
    <Dialog
      header="Crear Categoría"
      :visible.sync="localVisible"
      :containerStyle="{ width: '50vw' }"
      class="font-bold"
      @hide="closeModal"
      modal
      closable
    >
      <div class="flex flex-wrap md:flex-nowrap">
        <div class="col-12">
          <div class="p-fluid">
            <div class="field">
              <label for="categoryName">Nombre de la Categoría</label>
              <InputText
                id="categoryName"
                v-model="categoryName"
                placeholder="Ingrese el nombre de la categoría"
                :class="{ 'p-invalid': isCategoryNameInvalid }"
                @blur="validateCategoryName"
              />
              <small v-if="isCategoryNameInvalid" class="p-error">
                El nombre de la categoría es obligatorio y debe tener menos de
                100 caracteres.
              </small>
            </div>
            <div class="field">
              <label for="categoryDescription">Descripción</label>
              <Textarea
                id="categoryDescription"
                v-model="categoryDescription"
                placeholder="Ingrese una descripción"
                rows="4"
              />
            </div>
            <div class="field">
              <label for="icono">Ícono</label>
              <AutoComplete
                id="icono"
                v-model="icono"
                :suggestions="filteredIcons"
                @complete="searchIcon"
                :dropdown="true"
                field="name"
                appendTo="body"
              >
                <template #item="slotProps">
                  <div class="icon-item">
                    <svg
                      :width="24"
                      :height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path :d="slotProps.item.path" />
                    </svg>
                    <span>{{ slotProps.item.name }}</span>
                  </div>
                </template>
              </AutoComplete>
              <small v-if="isIconInvalid" class="p-error">
                El ícono es obligatorio.
              </small>
              <div v-if="icono" class="mt-2">
                <span style="icon-item">Seleccionado: </span>
                <svg width="96" height="96" viewBox="0 0 32 32">
                  <path :d="icono.path" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <Button
          label="Cancelar"
          @click="closeModal"
          class="p-button-text p-button-secondary"
        />
        <Button label="Registrar" class="p-button" @click="submitForm" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import AutoComplete from "primevue/autocomplete";
import AdminServices from "@/modules/admin/services/AdminServices";
import * as mdiIcons from "@mdi/js";

export default {
  components: {
    Dialog,
    InputText,
    Textarea,
    Button,
    AutoComplete,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localVisible: this.visible,
      categoryName: "",
      categoryDescription: "",
      icono: null,
      isCategoryNameInvalid: false,
      isIconInvalid: false,
      icons: Object.entries(mdiIcons).map(([key, path]) => ({
        name: key
          .replace("mdi", "")
          .replace(/([A-Z])/g, " $1")
          .trim(),
        path,
      })),
      filteredIcons: [],
    };
  },
  methods: {
    closeModal() {
      this.localVisible = false;
      this.$emit("update:visible", false);
      this.resetForm();
    },
    resetForm() {
      this.categoryName = "";
      this.categoryDescription = "";
      this.icono = null;
      this.isCategoryNameInvalid = false;
      this.isIconInvalid = false;
    },
    validateCategoryName() {
      this.isCategoryNameInvalid =
        !this.categoryName || this.categoryName.length > 100;
    },
    validateIcon() {
      this.isIconInvalid = !this.icono;
    },
    searchIcon(event) {
      const query = event.query.toLowerCase();
      this.filteredIcons = this.icons.filter((icon) =>
        icon.name.toLowerCase().includes(query)
      );
    },
    async submitForm() {
      this.validateCategoryName();
      this.validateIcon();
      if (this.isCategoryNameInvalid || this.isIconInvalid) {
        return;
      }
      console.log(this.icono);
      const camelCaseIcon = this.icono.name
        .toLowerCase()
        .split(" ")
        .map((word, index) =>
          index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join("");

      this.addCategory(camelCaseIcon);
    },
    async addCategory(icon) {
      try {
        const response = await AdminServices.addCategory(
          this.categoryName,
          this.categoryDescription,
          icon
        );
        const { statusCode } = response;
        if (statusCode === 201) {
          this.$emit("category-added");
          this.closeModal();
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  watch: {
    visible(newVal) {
      this.localVisible = newVal;
    },
  },
};
</script>

<style scoped>
.p-error {
  color: red;
}

.icon-item {
  display: flex;
  align-items: center;
}
</style>
