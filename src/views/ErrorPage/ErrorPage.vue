<template>
  <div class="error-page">
    <img
      src="../../assets/images/logo.jpg"
      alt="Crochet Mart Logo"
      class="logo"
    />
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

.error-page::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: #82e0aa;
  z-index: -1;
  border-top-left-radius: 100% 50px;
  border-top-right-radius: 100% 50px;
}
</style>
