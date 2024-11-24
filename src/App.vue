<template>
  <div class="main">
    <ConfirmDialog />
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  font-family: "Poppins", sans-serif;
}
</style>