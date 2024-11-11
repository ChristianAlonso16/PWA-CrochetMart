<template>
  <div>
    <div class="access-denied">
      <img src="../../assets/images/logo.jpg" alt="Crochet Mart Logo" class="logo" />
      <i class="pi pi-lock lock-icon"></i>
      <h1>Acceso Denegado</h1>
      <p class="inline-paragraph">Lo sentimos, parece que no tienes los hilos</p>
      <p class="inline-paragraph">necesarios para tejer esta página. Tu acceso ha</p>
      <p class="inline-paragraph">sido bloqueado como un nudo apretado.</p>
      <button @click="goHome">Volver al inicio</button>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="250" viewBox="0 0 1280 200" fill="none"
      class="decorative-svg">
      <path
        d="M926.467 13.6614C1117.94 -31.112 1280 57.2461 1280 57.2461V251H0V27.9255C0 27.9255 324.114 174.925 546.506 159.472C768.898 144.019 734.99 58.4347 926.467 13.6614Z"
        fill="#F1948A" stroke="#F1948A" stroke-width="1" />
    </svg>
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
  padding: 3vh 2rem;
  font-family: Arial, sans-serif;
  position: relative;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 40%;
  max-width: 350px;
}

h1 {
  color: #A93226;
  font-size: 1.5rem;
}

.inline-paragraph {
  display: flex;
  color: #d9534f;
  margin: 0;
  font-size: 0.9rem;
}

p {
  color: #EC7063;
  margin: 8px;
}

button {
  background-color: #DC2626;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-top: 15px;
}

button:hover {
  background-color: #c9302c;
}

.lock-icon {
  font-size: 1.5rem;
  color: #E74C3C;
  margin: 5px;
}

.decorative-svg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .access-denied {
    padding: 4vh 1rem;
  }

  .logo {
    width: 50%;
  }

  h1 {
    font-size: 1.3rem;
  }

  .inline-paragraph {
    font-size: 0.85rem;
  }

  button {
    font-size: 0.85rem;
    padding: 0.6rem 1.1rem;
  }

  .lock-icon {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .access-denied {
    padding: 4vh 0.5rem;
  }

  .logo {
    width: 60%;
  }

  h1 {
    font-size: 1.2rem;
  }

  .inline-paragraph {
    font-size: 0.75rem;
  }

  button {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }

  .lock-icon {
    font-size: 2rem;
  }
}
</style>
