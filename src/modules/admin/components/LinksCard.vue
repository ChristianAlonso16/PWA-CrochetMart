<template>
    <div class="key-card">
      <div class="card-header">
        <h3>{{ title }}</h3>
        <button @click="$emit('edit')" class="edit-btn">
          <i class="pi pi-key"></i>
        </button>
      </div>
      <p>{{ description }}</p>
      <p><strong>Modificado</strong>: {{ modifiedDate }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "LinksCard",
    props: {
      title: String,
      description: String,
      modifiedDate: String,
    },
  };
  </script>
  
  <style scoped>
  .key-card {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 300px;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .edit-btn {
    background: none;
    border: none;
    cursor: pointer;
  }
  </style>
  