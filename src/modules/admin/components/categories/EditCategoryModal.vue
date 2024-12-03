<template>
  <Dialog
    header="Editar Categoría"
    :visible.sync="localVisible"
    :containerStyle="{ width: '50vw' }"
    class="font-bold"
    @hide="closeModal"
    modal
    closable
  >
    <div class="p-fluid">
      <div class="field">
        <label for="editCategoryName">Nombre de la Categoría</label>
        <InputText
          id="editCategoryName"
          v-model="localCategoryName"
          placeholder="Ingrese el nombre de la categoría"
          :class="{ 'p-invalid': isCategoryNameInvalid }"
          @blur="validateCategoryName"
          disabled
        />
        <small v-if="isCategoryNameInvalid" class="p-error">
          El nombre de la categoría es obligatorio y debe tener menos de 100
          caracteres.
        </small>
      </div>
      <div class="field">
        <label for="editCategoryDescription">Descripción</label>
        <Textarea
          id="editCategoryDescription"
          v-model="localCategoryDescription"
          placeholder="Ingrese una descripción"
          rows="4"
        />
      </div>
      <div class="field">
        <label for="editIcon">Ícono</label>
        <AutoComplete
          id="editIcon"
          v-model="localIcon"
          :suggestions="filteredIcons"
          @complete="searchIcon"
          :dropdown="true"
          field="name"
          appendTo="body"
        >
          <template #item="slotProps">
            <div>
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
        <div v-if="localIcon" class="mt-2">
          <span>Seleccionado: </span>
          <svg width="96" height="96" viewBox="0 0 32 32">
            <path :d="localIcon.path" />
          </svg>
        </div>
      </div>
    </div>
    <template #footer>
      <Button
        label="Cancelar"
        @click="closeModal"
        class="p-button-text p-button-secondary"
      />
      <Button
        label="Guardar"
        class="p-button"
        @click="submitEdit"
        :loading="isLoading"
        :disabled="isLoading"
      />
    </template>
  </Dialog>
</template>
<script>
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import AutoComplete from "primevue/autocomplete";
import Button from "primevue/button";
import * as mdiIcons from "@mdi/js";
import AdminServices from "@/modules/admin/services/AdminServices";

export default {
  components: {
    Dialog,
    InputText,
    Textarea,
    AutoComplete,
    Button,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localVisible: this.visible,
      localCategoryName: "",
      localCategoryDescription: "",
      localIcon: null,
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
      isLoading: false,
    };
  },
  methods: {
    closeModal() {
      this.localVisible = false;
      this.$emit("update:visible", false);
    },
    validateCategoryName() {
      this.isCategoryNameInvalid =
        !this.localCategoryName || this.localCategoryName.length > 100;
    },
    validateIcon() {
      this.isIconInvalid = !this.localIcon;
    },
    searchIcon(event) {
      const query = event.query.toLowerCase();
      this.filteredIcons = this.icons.filter((icon) =>
        icon.name.toLowerCase().includes(query)
      );
    },
    async update(name, description, icon) {
      try {
        const response = await AdminServices.updateCategory(
          name,
          description,
          icon
        );
        const { statusCode, message } = response;
        if (statusCode === 201) {
          this.closeModal();
          this.$toast.success(message);
        } else {
          this.$toast.error(message);
        }
      } catch (error) {
        this.$toast.error("Error al actualizar la categoría");
      }
    },
    findIconByName(iconName) {
      const formattedName = iconName
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^./, (str) => str.toUpperCase());
      return this.icons.find((icon) => icon.name === formattedName);
    },
    async submitEdit() {
      this.isLoading = true;
      this.validateCategoryName();
      this.validateIcon();
      if (this.isCategoryNameInvalid || this.isIconInvalid) {
        return;
      }

      await this.update(
        this.localCategoryName,
        this.localCategoryDescription,
        this.localIcon.name
      );
      this.$emit("update-category");
      this.isLoading = false;
    },
    syncCategoryData() {
      if (this.category) {
        this.localCategoryName = this.category.categoryName || "";
        this.localCategoryDescription = this.category.categoryDescription || "";
        this.localIcon = this.findIconByName(this.category.icono || "");
      }
    },
  },
  watch: {
    visible(newVal) {
      this.localVisible = newVal;
      if (newVal) {
        this.syncCategoryData();
      }
    },
    category: {
      handler() {
        this.syncCategoryData();
      },
      deep: true,
    },
  },
  mounted() {
    this.syncCategoryData();
  },
};
</script>
