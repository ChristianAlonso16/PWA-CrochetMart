<template>
  <b-modal v-model="isModalVisible" title="Actualizar link" @hide="closeModal" dialog-class="no-header-gap no-footer-gap">
    <template #modal-header>
      <h5 class="modal-title"><strong>Actualizar link</strong> </h5>
      <b-button variant="close" @click="closeModal" aria-label="Close"></b-button>
    </template>

    <form @submit.prevent="saveChanges">
      <div class="form-group spacing">
        <label class="space" for="name"><strong>Nombre</strong></label>
        <input id="name" v-model="formData.name" class="form-control" placeholder="Link Play Store" />
      </div>
      <div class="form-group spacing">
        <label class="space" for="link"><strong>Link</strong></label>
        <input id="link" v-model="formData.link" class="form-control" placeholder="Link" />
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

.space{
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
</style>
