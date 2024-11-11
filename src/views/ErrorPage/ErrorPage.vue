<template>
  <div>
    <div class="error-page">
      <img src="../../assets/images/logo.jpg" alt="Crochet Mart Logo" class="logo" />
      <h1>¡Oops!</h1>
      <p class="inline-paragraph">
        Parece que hemos perdido el hilo. La página que
      </p>
      <p class="inline-paragraph">
        buscas se ha deshilachado o no existe en nuestro
      </p>
      <p class="inline-paragraph">tejido de crochet.</p>
      <button @click="goHome">Volver al inicio</button>

    </div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 251" class="svg-background">
      <path
        d="M353.533 13.6614C162.057 -31.112 0 57.2461 0 57.2461V251H1280V27.9255C1280 27.9255 955.886 174.925 733.494 159.472C511.102 144.019 545.01 58.4347 353.533 13.6614Z"
        fill="#82E0AA" stroke="#82E0AA" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.error-page {
  text-align: center;
  padding: 90px;
  font-family: Arial, sans-serif;
  position: relative;
  min-height: 97vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.logo {
  width: 350px;
}

h1 {
  color: #0c0c0c;
}

.inline-paragraph {
  display: flex;
  color: #45414a;
  margin: 0;
}

p {
  color: #45414a;
  margin: 20px;
}

button {
  background-color: #16a34a;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: small;
  margin: 20px;
}

button:hover {
  background-color: #82e0aa;
}

.svg-background {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  min-height: 250px;
  z-index: -1;
}
</style>
