<template>
    <div class="error-page">
        <img src="../../assets/images/logo.jpg" alt="Crochet Mart Logo" class="logo" />
        <h1>¡Oops!</h1>
        <p>Parece que hemos perdido el hilo. La página que buscas se ha deshilachado o no existe en nuestro tejido de
            crochet.</p>
        <button @click="goHome">Volver al inicio</button>
        <div class="wave"></div>
    </div>
</template>

<script>
export default {
    name: 'ErrorPage',
    methods: {
        goHome() {
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
.error-page {
    text-align: center;
    padding: 50px;
    font-family: Arial, sans-serif;
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    overflow: hidden;
}

.logo {
    width: 150px;
    margin-bottom: 20px;
}

h1 {
    color: #333;
}

p {
    color: #666;
    margin: 20px 0;
    max-width: 400px;
}

button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
}

button:hover {
    background-color: #218838;
}

.wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
    /*background: url('@/assets/wave.svg') repeat-x;*/
    background-size: contain;
    z-index: -1;
}
</style>