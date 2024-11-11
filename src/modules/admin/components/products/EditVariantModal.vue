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
          <div>
            <FileUpload
              ref="fileUpload"
              name="images"
              :multiple="true"
              :accept="'image/*'"
              :maxFileSize="1000000"
              :customUpload="true"
              :auto="false"
              :showUploadButton="false"
              :fileLimit="5"
              :previewWidth="100"
              chooseLabel="Seleccionar"
              cancelLabel="Cancelar"
              :class="{ 'p-invalid': isImageInvalid }"
              @select="onSelect"
              @clear="onClear"
            >
              <template #empty>
                <p>Arrastra y suelta archivos aquí para subir o selecciona.</p>
              </template>
            </FileUpload>
          </div>
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
          label="Guardar"
          @click="submitForm"
          class="p-button"
          :disabled="isLoading"
          :loading="isLoading"
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
    variant: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localVisible: this.visible,
      price: null,
      stock: null,
      selectedColor: null,
      uploadedFiles: [],
      colors: [],
      isPriceInvalid: false,
      isStockInvalid: false,
      isImageInvalid: false,
      isColorInvalid: false,
      fileUploadKey: 0,
      isLoading: false,
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
        this.colors = [];
      }
    },
    closeModal() {
      this.localVisible = false;
      this.$emit("update:visible", false);
      this.resetForm();
    },
    resetForm() {
      this.price = null;
      this.stock = null;
      this.selectedColor = null;
      this.uploadedFiles = [];
      this.fileUploadKey++;
      this.isPriceInvalid = false;
      this.isColorInvalid = false;
      this.isStockInvalid = false;
      this.isImageInvalid = false;
    },
    onSelect(event) {
      this.uploadedFiles = [];
      this.uploadedFiles.push(...event.files);
      //falta algo
      console.log(event);
      console.log(this.uploadedFiles);
      this.validateImages();
    },
    onClear() {
      this.uploadedFiles = [];
      this.validateImages();
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
    validateImages() {
      this.isImageInvalid = this.uploadedFiles.length === 0;
    },
    async submitForm() {
      this.validatePrice();
      this.validateColor();
      this.validateStock();
      this.validateImages();

      if (
        !this.isPriceInvalid &&
        !this.isColorInvalid &&
        !this.isStockInvalid &&
        !this.isImageInvalid
      ) {
        this.isLoading = true;
        try {
          this.updateVariant().then(() => {
            this.$emit("variantUpdated");
          });
          this.closeModal();
        } catch (error) {
          console.log(error);
        } finally {
          this.isLoading = false;
        }
      }
    },
    async updateVariant() {
      try {
        const variantopc = {
          price: this.price,
          stock: this.stock,
          color: this.selectedColor ? this.selectedColor.name : null,
          images: this.uploadedFiles,
          numVariant: this.variant,
        };
        const response = await AdminServices.updateVariant(variantopc);

        if (response.statusCode === 200) {
          console.log("Variant updated successfully");
        }
      } catch (error) {
        console.error("Error updating variant:", error);
      }
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
          this.uploadedFiles = [];

          const files = await Promise.all(
            data.images.map((image, index) =>
              this.base64ToFileWithObjectURL(image.image, `image_${index}.jpeg`)
            )
          );

          this.addFilesToFileUpload(files);
        }
      } catch (error) {
        console.error(error);
      }
    },

    base64ToFileWithObjectURL(base64, filename) {
      return new Promise((resolve) => {
        const [header, data] = base64.split(",");
        const mime = header.match(/:(.*?);/)[1];
        const binary = atob(data);
        const array = new Uint8Array(binary.length);

        for (let i = 0; i < binary.length; i++) {
          array[i] = binary.charCodeAt(i);
        }

        const file = new File([array], filename, { type: mime });

        const objectURL = URL.createObjectURL(file);

        Object.defineProperty(file, "objectURL", {
          value: objectURL,
          writable: false,
          enumerable: true,
          configurable: true,
        });

        resolve(file);
      });
    },

    addFilesToFileUpload(files) {
      if (this.$refs.fileUpload) {
        const fileUpload = this.$refs.fileUpload;

        if (fileUpload.files) {
          fileUpload.files.push(...files);
        }

        fileUpload.$emit("select", { files });
      }
    },
  },
  mounted() {
    this.getAttributes();
    this.loadVariantData();
  },
  watch: {
    visible(newValue) {
      this.localVisible = newValue;
      if (newValue) {
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
