<template>
  <div>
    <Dialog
      header="Editar variante"
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
            name="demo[]"
            url="./upload.php"
            @upload="onUpload"
            :multiple="true"
            accept="image/*"
            :maxFileSize="1000000"
            chooseLabel="Seleccionar"
            uploadLabel="Subir"
            cancelLabel="Cancelar"
            :class="{ 'p-invalid': isImageInvalid }"
          >
            <template #empty>
              <p>Arrastra y suelta archivos aquí para subir.</p>
            </template>
          </FileUpload>
          <small v-if="isImageInvalid" class="p-error"
            >Debe cargar al menos una imagen.</small
          >
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
                >El precio es obligatorio y no debe exceder los 10
                caracteres.</small
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
              />
              <small v-if="isStockInvalid" class="p-error"
                >Las existencias son obligatorias y no deben exceder los 10
                caracteres.</small
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
        <Button label="Guardar cambios" @click="submitForm" class="p-button" />
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
    Button,
    Dialog,
    FileUpload,
    InputNumber,
    Dropdown,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    variant: {
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
    };
  },
  methods: {
    openModal() {
      this.localVisible = true;
      this.loadVariantData();
      this.$emit("update:visible", true);
    },
    closeModal() {
      this.localVisible = false;
      this.$emit("update:visible", false);
      this.resetForm();
    },
    resetForm() {
      this.isPriceInvalid = false;
      this.isColorInvalid = false;
      this.isStockInvalid = false;
      this.isImageInvalid = false;
    },
    async loadVariantData() {
      try {
        const response = await AdminServices.getVariantDetails(this.variant);
        const { data, statusCode } = response;
        if (statusCode === 200) {
          this.price = data.price;
          this.stock = data.stock;
          const colorAttribute = data.attributes.find(
            (attr) => attr.name === "Color"
          );
          if (colorAttribute) {
            this.selectedColor =
              this.colors.find(
                (color) => color.name === colorAttribute.value
              ) || null;
          } else {
            this.selectedColor = null;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    onUpload(event) {
      this.uploadedFiles = event.files;
      this.validateImage();
    },
    async getAttributes() {
      try {
        const attribute = "Color";
        const response = await AdminServices.getAttributesByName(attribute);
        const { data, statusCode } = response;
        if (statusCode === 200) {
          this.colors = data.map((item) => ({
            name: item.name,
            value: "#" + item.value,
          }));
        }
      } catch (error) {
        console.error(error);
      }
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
        console.log("actualizar");
      }
    },
  },
  mounted() {
    this.getAttributes();
    this.loadVariantData();
  },
  watch: {
    selectedColor() {
      this.isColorInvalid = false;
    },
    visible(newVal) {
      this.localVisible = newVal;
    },
    variant() {
      if (this.localVisible) {
        this.loadVariantData();
      }
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
