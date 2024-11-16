<template>
    <div class="color-picker">
      <div class="colors">
        <div
          v-for="(color, index) in colors"
          :key="index"
          :style="{ backgroundColor: color }"
          class="color-circle"
          :class="{ selected: selectedColor === color }"
          @click="selectColor(color)"
        ></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        colors: ['#6e7b8a', '#2ecc71', '#3498db'],
        selectedColor: '#6e7b8a'
      };
    },
    methods: {
      selectColor(color) {
        this.selectedColor = color;
      }
    }
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
  