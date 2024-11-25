<template>
    <footer>
        <div class="footer-container">
            <div class="top-section">
                <div class="logo">
                    <img src="logo-placeholder.png" alt="Logo" class="logo-img">
                </div>
                <nav class="nav-links">
                    <a href="#" class="footer-link">Home</a>
                    <a href="#" class="footer-link">About</a>
                    <a href="#" class="footer-link">Services</a>
                    <a href="#" class="footer-link">Contact Us</a>
                </nav>
            </div>

            <div class="social-icons">
                <a href="#" class="icon-circle"><i class="pi pi-facebook"></i></a>
                <a href="#" class="icon-circle"><i class="pi pi-twitter"></i></a>
                <a href="#" class="icon-circle"><i class="pi pi-instagram"></i></a>
            </div>

            <div class="bottom-section">
                <p>&copy; 2024 Crochet Creaciones. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterComponent',
};
</script>

<style scoped>
.footer-container {
    padding: 20px;
    background: #F8F9FA;
    text-align: center;
    color: #252525;
}

.top-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.logo-img {
    width: 120px;
    height: auto;
}

.nav-links {
    display: flex;
    gap: 20px;
}

.footer-link {
    color: #252525;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.social-icons {
    margin: 20px 0;
}

.icon-circle {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    background-color: #EAEDED;
    color: #252525;
    margin: 0 10px;
    font-size: 18px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.icon-circle:hover {
    background-color: #007BFF;
    color: #FFFFFF;
}

.bottom-section {
    font-size: 14px;
    color: #6C757D;
}
</style>
