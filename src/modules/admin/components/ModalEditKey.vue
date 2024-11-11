<template>
  <b-modal v-model="isModalVisible" title="Actualizar stripe key" @hide="closeModal" dialog-class="no-header-gap">
    <template #modal-header>
      <h5 class="modal-title"><strong>Actualizar stripe key</strong></h5>
      <b-button variant="close" @click="closeModal" aria-label="Close"></b-button>
    </template>

    <form @submit.prevent="saveChanges">
      <div class="form-group spacing">
        <label class="space" for="name"><strong>Nombre</strong></label>
        <input 
          id="name" 
          v-model="formData.name" 
          class="form-control" 
          placeholder="Key stripe"
          :class="{'is-invalid': errors.name}"
        />
        <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
      </div>

      <div class="form-group spacing">
        <label class="space" for="publicKey"><strong>Llave Pública</strong></label>
        <input 
          id="publicKey" 
          v-model="formData.publicKey" 
          class="form-control" 
          placeholder="Llave Pública"
          :class="{'is-invalid': errors.publicKey}"
        />
        <div v-if="errors.publicKey" class="invalid-feedback">{{ errors.publicKey }}</div>
      </div>

      <div class="form-group spacing">
        <label class="space" for="privateKey"><strong>Llave Privada</strong></label>
        <input 
          id="privateKey" 
          v-model="formData.privateKey" 
          class="form-control" 
          placeholder="Llave Privada"
          :class="{'is-invalid': errors.privateKey}"
        />
        <div v-if="errors.privateKey" class="invalid-feedback">{{ errors.privateKey }}</div>
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
  name: "ModalEditKey",
  props: {
    isVisible: Boolean,
    keyData: Object,
  },
  data() {
    return {
      formData: { ...this.keyData },
      isModalVisible: this.isVisible,
      errors: {},
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
    validate() {
      this.errors = {};

      if (!this.formData.name) {
        this.errors.name = "El nombre es obligatorio";
      } else if (this.formData.name.length > 50) {
        this.errors.name = "El nombre no puede tener más de 50 caracteres";
      }

      if (!this.formData.publicKey) {
        this.errors.publicKey = "La llave pública es obligatoria";
      }

      if (!this.formData.privateKey) {
        this.errors.privateKey = "La llave privada es obligatoria";
      }

      return Object.keys(this.errors).length === 0;
    },
    saveChanges() {
      if (this.validate()) {
        this.$emit("save", this.formData);
        this.closeModal();
      }
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

.invalid-feedback {
  color: red;
  font-size: 0.875em;
}
</style>
