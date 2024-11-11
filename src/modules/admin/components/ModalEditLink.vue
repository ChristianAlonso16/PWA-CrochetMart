<template>
  <b-modal v-model="isModalVisible" title="Actualizar link" @hide="closeModal" dialog-class="no-header-gap no-footer-gap">
    <template #modal-header>
      <h5 class="modal-title"><strong>Actualizar link</strong> </h5>
      <b-button variant="close" @click="closeModal" aria-label="Close"></b-button>
    </template>

    <form @submit.prevent="saveChanges">
      <div class="form-group spacing">
        <label class="space" for="name"><strong>Nombre</strong></label>
        <input
          id="name"
          v-model="formData.name"
          class="form-control"
          :class="{ 'is-invalid': !formData.name && formData.name !== undefined, 'is-valid': formData.name && formData.name.length <= 50 }"
          placeholder="Link Play Store"
        />
        <div v-if="!formData.name && formData.name !== undefined" class="invalid-feedback">
          El nombre no puede estar vacío.
        </div>
        <div v-if="formData.name && formData.name.length > 50" class="invalid-feedback">
          El nombre no puede ser mayor de 50 caracteres.
        </div>
      </div>

      <div class="form-group spacing">
        <label class="space" for="link"><strong>Link</strong></label>
        <input
          id="link"
          v-model="formData.link"
          class="form-control"
          :class="{ 'is-invalid': !formData.link && formData.link !== undefined }"
          placeholder="Link"
        />
        <div v-if="!formData.link && formData.link !== undefined" class="invalid-feedback">
          El link no puede estar vacío.
        </div>
      </div>
    </form>

    <template #modal-footer>
      <b-button class="save-button" type="button" @click="saveChanges">Guardar</b-button>
      <b-button class="cancel-button" @click="closeModal">Cancelar</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "ModalEditLink",
  props: {
    isVisible: Boolean,
    keyData: Object,
  },
  data() {
    return {
      formData: { ...this.keyData },
      isModalVisible: this.isVisible,
    };
  },
  watch: {
    isVisible(newVal) {
      this.isModalVisible = newVal;
    },
    keyData(newData) {
      this.formData = { ...newData };
    },
  },
  methods: {
    closeModal() {
      this.isModalVisible = false;
      this.$emit("close");
    },
    saveChanges() {
      if (!this.formData.name || this.formData.name.length > 50) {
        return; 
      }
      if (!this.formData.link) {
        return; 
      }
      
      this.$emit("save", this.formData);
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.no-header-gap .modal-header,
.no-footer-gap .modal-footer {
  padding-top: 0;
  padding-bottom: 0;
}

.spacing {
  padding: 20px var(--Stroke-Border, 1px);
}

.space {
  padding: 10px 0px 10px 0px;
}

.cancel-button {
  background-color: black;
  color: white;
  border: none;
}

.save-button {
  background-color: white;
  color: black;
  border: 1px solid black;
}

.is-invalid {
  border-color: red;
}

.is-valid {
  border-color: green;
}

.invalid-feedback {
  display: block;
  color: red;
  font-size: 0.875em;
}
</style>
