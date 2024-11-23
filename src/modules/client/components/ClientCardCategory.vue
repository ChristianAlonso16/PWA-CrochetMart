<template>
  <div class="category-card">
    <div class="icon-container">
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
      >
        <path :d="iconPath" />
      </svg>
    </div>
    <p class="category-name font-bold">{{ category.categoryName }}</p>
  </div>
</template>

<script>
import * as mdiIcons from "@mdi/js";

export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  computed: {
    iconPath() {
      const iconKey = `mdi${this.category.icono
        .charAt(0)
        .toUpperCase()}${this.category.icono.slice(1)}`;
      return mdiIcons[iconKey] || mdiIcons.mdiHelpCircle;
    },
  },
};
</script>

<style scoped>
.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.icon-container {
  background-color: #1e1e1e;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
}

.category-name {
  font-size: 1rem;
  color: #252525;
  margin-top: 1rem;
}
</style>
