<template>
  <div>
    <Dialog
      header="Agregar variante"
      :visible.sync="localVisible"
      :containerStyle="{ width: '80vw' }"
      class="font-bold"
      @hide="closeModal"
      modal
      closable
    >
      <div class="flex flex-wrap md:flex-nowrap">
        <div class="col-12 md:col-8 mb-3 md:mb-0">
          <FileUpload
            :key="fileUploadKey"
            name="images"
            :multiple="true"
            accept="image/*"
            :maxFileSize="1000000"
            chooseLabel="Seleccionar"
            cancelLabel="Cancelar"
            :class="{ 'p-invalid': isImageInvalid }"
            @select="onSelect"
            @clear="onClear"
            @remove="onRemove"
            :showUploadButton="false"
            invalidFileSizeMessage="Tamaño de archivo excedido"
            invalidFileMessage="Tipo de archivo no permitido"
            invalidFileLimitMessage="Máximo número de archivos excedido"
            :fileLimit="5"
          >
            <template #empty>
              <p>Arrastra y suelta archivos aquí para subir.</p>
            </template>
          </FileUpload>
          <small v-if="isImageInvalid" class="p-error">
            Debe cargar al menos una imagen.
          </small>
        </div>
        <div class="col-12 md:col-4">
          <div class="p-fluid">
            <div class="field">
              <label for="price">Precio</label>
              <InputNumber
                id="price"
                v-model="price"
                mode="currency"
                currency="MXN"
                locale="es-MX"
                :class="{ 'p-invalid': isPriceInvalid }"
                @blur="validatePrice"
              />
              <small v-if="isPriceInvalid" class="p-error"
                >El precio es obligatorio.</small
              >
            </div>
            <div class="field">
              <label for="color">Color</label>
              <Dropdown
                id="color"
                v-model="selectedColor"
                :options="colors"
                optionLabel="name"
                appendTo="body"
                placeholder="Seleccione un color"
                :class="{ 'p-invalid': isColorInvalid }"
                @blur="validateColor"
              >
                <template #option="slotProps">
                  <div class="flex align-items-center">
                    <span
                      class="color-preview"
                      :style="{ backgroundColor: slotProps.option.value }"
                    ></span>
                    <span>{{ slotProps.option.name }}</span>
                  </div>
                </template>
              </Dropdown>
              <small v-if="isColorInvalid" class="p-error"
                >El color es obligatorio.</small
              >
            </div>
            <div class="field">
              <label for="stock">Existencia</label>
              <InputNumber
                id="stock"
                v-model="stock"
                :class="{ 'p-invalid': isStockInvalid }"
                @blur="validateStock"
                :min="0"
              />
              <small v-if="isStockInvalid" class="p-error"
                >Las existencias son obligatorias.</small
              >
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
        <Button
          label="Registrar"
          @click="submitForm"
          class="p-button"
          :loading="isSubmitting"
          :disabled="isSubmitting"
        />
      </template>
    </Dialog>
  </div>
</template>


<script>
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import AdminServices from "@/modules/admin/services/AdminServices";

export default {
  components: {
    FileUpload,
    Button,
    Dialog,
    InputNumber,
    Dropdown,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    numProduct: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localVisible: this.visible,
      price: null,
      colors: [],
      selectedColor: null,
      stock: null,
      uploadedFiles: [],
      isPriceInvalid: false,
      isColorInvalid: false,
      isStockInvalid: false,
      isImageInvalid: false,
      fileUploadKey: 0,
      isSubmitting: false,
    };
  },
  methods: {
    async getAttributes() {
      try {
        const response = await AdminServices.getAttributesByName("Color");
        this.colors = response.data.map((attr) => ({
          name: attr.name,
          value: "#" + attr.value,
        }));
      } catch (error) {
        console.error("Error fetching colors:", error);
        this.colors = [];
      }
    },
    openModal() {
      this.localVisible = true;
      this.$emit("update:visible", true);
    },
    closeModal() {
      this.localVisible = false;
      this.$emit("update:visible", false);
      this.resetForm();
    },
    resetForm() {
      this.price = null;
      this.selectedColor = null;
      this.stock = null;
      this.uploadedFiles = [];
      this.fileUploadKey++;
      this.isPriceInvalid = false;
      this.isColorInvalid = false;
      this.isStockInvalid = false;
      this.isImageInvalid = false;
    },
    onSelect(event) {
      this.uploadedFiles = [...event.files];

      event.files.forEach((file) => {
        if (
          !this.uploadedFiles.find(
            (uploadedFile) => uploadedFile.name === file.name
          )
        ) {
          this.uploadedFiles.push(file);
        }
      });

      console.log("Uploaded files:", this.uploadedFiles);
      this.validateImage();
    },
    onClear() {
      this.uploadedFiles = [];
      this.validateImage();
    },
    onRemove(event) {
      const fileIndex = this.uploadedFiles.findIndex(
        (file) => file.name === event.file.name
      );
      if (fileIndex !== -1) {
        this.uploadedFiles.splice(fileIndex, 1);
      }
      this.validateImage();
    },
    validatePrice() {
      this.isPriceInvalid = !this.price || this.price.toString().length > 10;
    },
    validateColor() {
      this.isColorInvalid = !this.selectedColor;
    },
    validateStock() {
      this.isStockInvalid = !this.stock || this.stock.toString().length > 10;
    },
    validateImage() {
      this.isImageInvalid = this.uploadedFiles.length === 0;
    },
    submitForm() {
      this.validatePrice();
      this.validateColor();
      this.validateStock();
      this.validateImage();

      if (
        !this.isPriceInvalid &&
        !this.isColorInvalid &&
        !this.isStockInvalid &&
        !this.isImageInvalid
      ) {
        try {
          this.isSubmitting = true;
          this.addVariant().then(() => {
            this.$emit("variantAdded");
            this.closeModal();
          });
        } catch (error) {
          console.log("Error adding variant:", error);
        } finally {
          this.isSubmitting = false;
        }
      } else {
        console.log("algo ta mal");
      }
    },
    async addVariant() {
      try {
        const response = await AdminServices.addVariant(
          this.price,
          this.selectedColor.name,
          this.stock,
          this.uploadedFiles,
          this.numProduct
        );
        console.log("Response:", response);
      } catch (error) {
        console.error("Error adding variant:", error);
      }
    },
  },
  mounted() {
    
    this.getAttributes();
  },
  watch: {
    visible(newValue) {
      this.localVisible = newValue;
    },
  },
};
</script>

<style scoped>
.color-preview {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border-radius: 4px;
}
.p-error {
  color: red;
}
</style>
