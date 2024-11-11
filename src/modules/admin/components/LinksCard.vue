<template>
  <div class="key-card">
    <div class="card-header">
      <h5><strong>{{ title }}</strong></h5>
      <i class="pi pi-key"></i>
    </div>
    <div class="card-content">
      <div>
        <p><strong>Modificado</strong></p>
        <p class="modified-date">{{ modifiedDate }}</p>
      </div>
      <button @click="$emit('edit')" class="icon-circle edit-btn">
        <i class="pi pi-pencil"></i>
      </button>
    </div>
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
  padding: 40px;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 350px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modified-date {
  color: #888888;
}

.edit-btn {
  background: none;
  border: none;
  cursor: pointer;
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
