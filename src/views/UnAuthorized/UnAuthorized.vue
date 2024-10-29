<template>
  <div class="access-denied">
    <img
      src="../../assets/images/logo.jpg"
      alt="Crochet Mart Logo"
      class="logo"
    />
    <i class="pi pi-lock lock-icon"></i>
    <h1>Acceso Denegado</h1>
    <p class="inline-paragraph">Lo sentimos, parece que no tienes los hilos</p>
    <p class="inline-paragraph">necesarios para tejer esta página. Tu acceso ha</p>
    <p class="inline-paragraph">sido bloqueado como un nudo apretado.</p>
    <button @click="goHome">Volver al inicio</button>
  </div>
</template>

<script>
export default {
  name: "UnAuthorized",
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.access-denied {
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
  color: #A93226;
}

.inline-paragraph {
  display: flex;
  color: #d9534f;
  margin: 0; 
}

p {
  color: #EC7063;
  margin: 20px;
}

button {
  background-color: #DC2626;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: small;
  margin: 20px;
}

button:hover {
  background-color: #c9302c;
}

.access-denied::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: #F1948A;
  z-index: -1;
  border-top-left-radius: 100% 50px;
  border-top-right-radius: 100% 50px;
}

.lock-icon {
  font-size: 40px;
  color: #E74C3C;
  margin: 10px;
}
</style>
