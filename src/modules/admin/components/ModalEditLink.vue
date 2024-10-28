<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <header class="modal-header">
          <h3>Actualizar link</h3>
          <button @click="closeModal" class="close-btn">✕</button>
        </header>
        <form @submit.prevent="saveChanges">
          <div class="form-group">
            <label>Nombre</label>
            <input v-model="formData.name" placeholder="Link Play Store" />
          </div>
          <div class="form-group">
            <label>Link</label>
            <input v-model="formData.link" placeholder="Link" />
          </div>
          <div class="modal-actions">
            <button type="submit" class="save-btn">Guardar</button>
            <button type="button" class="cancel-btn" @click="closeModal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
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
      };
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
      saveChanges() {
        this.$emit("save", this.formData);
        this.closeModal();
      },
    },
    watch: {
      keyData(newData) {
        this.formData = { ...newData };
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .modal-actions {
    display: flex;
    justify-content: space-between;
  }
  .save-btn {
    background: black;
    color: white;
    padding: 8px 15px;
    border: none;
    cursor: pointer;
  }
  .cancel-btn {
    background: #ddd;
    padding: 8px 15px;
    border: none;
    cursor: pointer;
  }
  </style>
  