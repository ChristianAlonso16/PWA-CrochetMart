<template>
    <div class="access-denied">
      <img src="../../assets/images/logo.jpg" alt="Crochet Mart Logo" class="logo" />
      <h1>Acceso Denegado</h1>
      <p>Lo sentimos, parece que no tienes los hilos necesarios para tejer esta página. Tu acceso ha sido bloqueado como un nudo apretado.</p>
      <button @click="goHome">Volver al inicio</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UnAuthorized',
    methods: {
      goHome() {
        this.$router.push('/');
      }
    }
  }
  </script>
  
  <style scoped>
  .access-denied {
    text-align: center;
    padding: 50px;
    font-family: Arial, sans-serif;
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .logo {
    width: 150px;
    margin-bottom: 20px;
  }
  h1 {
    color: #d9534f;
  }
  p {
    color: #d9534f;
    margin: 20px 0;
  }
  button {
    background-color: #d9534f;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
  }
  button:hover {
    background-color: #c9302c;
  }
  .access-denied::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px;
    background: #f5a69c;
    z-index: -1;
    border-top-left-radius: 100% 50px;
    border-top-right-radius: 100% 50px;
  }
  </style>
  