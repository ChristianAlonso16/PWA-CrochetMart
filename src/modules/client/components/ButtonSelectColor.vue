<template>
  <div class="color-picker">
    <div class="colors">
      <div
        v-for="(color, index) in colors"
        :key="index"
        :style="{ backgroundColor: color.value }"
        class="color-circle"
        :class="{ selected: selectedColor?.value === color.value }"
        @click="selectColor(color)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    colors: {
      type: Array,
      required: true, // Array de objetos { name, value }
    },
    initialSelectedColor: {
      type: [Object, String],
      default: null, // Objeto { name, value } inicial
    },
  },
  data() {
    return {
      selectedColor: this.initialSelectedColor, // Color seleccionado actual
    };
  },
  methods: {
    selectColor(colorValue) {
      this.selectedColor = colorValue; // Actualizar el color seleccionado
      this.$emit("color-selected", colorValue); // Emitir el objeto { name, value } al componente padre
    },
  },
};
</script>

<style scoped>
.color-picker {
  color: #252525;
  font-size: 18px;
}

.colors {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.color-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.color-circle.selected {
  border-color: #252525;
}
</style>