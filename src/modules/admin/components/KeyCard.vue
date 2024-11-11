<template>
  <div class="key-card">
    <div class="card-header">
      <h5><strong>{{ title }}</strong></h5>
        <i class="pi pi-link"></i>
    </div>
    <div class="description-container">
      <p>{{ description }}</p>
      <button  @click="$emit('edit')" class="icon-circle edit-btn">
        <i class="pi pi-pencil"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "KeyCard",
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
  padding: 40px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 350px; 
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

.description-container {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.description-container p {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
}

.icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid black;
  margin-left: 20px;
}

.icon-circle i {
  color: black;
  font-size: 0.8em; 
  line-height: 1;
}
</style>
