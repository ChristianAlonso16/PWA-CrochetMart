<template>
    <footer>
        <div class="footer">
            <div class="grid">
                <div class="col-4">
                    <h3>Acerca de Nosotros</h3>
                    <p>Somos una tienda dedicada a ofrecer los mejores productos de crochet hechos a mano con amor y dedicación.</p>
                    <div class="grid">
                        <div class="col-2">
                            <div class="icon-circle">
                                <i class="pi pi-fw pi-facebook"/>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="icon-circle">
                                <i class="pi pi-fw pi-instagram"/>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="icon-circle">
                                <i class="pi pi-fw pi-twitter"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <h3>Enlaces Rápidos</h3>
                    <p><router-link class="footer-link" to="/productos">Inicio</router-link></p>
                    <p><router-link class="footer-link" to="/productos">Productos</router-link></p>
                </div>
                <div class="col-4">
                    <h3>Contáctanos</h3>
                    <p>Email: info@crochetmart.com</p>
                    <p>Teléfono: (123) 456-7890</p>
                </div>
            </div>
            <hr>
            <div class="grid">
                <div class="col-12 text-center">
                    <p>&copy; 2024 Crochet Creaciones. Todos los derechos reservados.</p>
                </div>
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
.footer {
    width: 100%;
    padding: 10px 32px;
    background: #EAEDED;
}

.footer .icon-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background-color: #f0f2f5;
    border-radius: 50%;
    font-size: 24px;
    color: #000000;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.footer .icon-circle:hover {
    background-color: #e0e3e7;
}

.footer .footer-link {
    color: #252525;
    text-decoration: none;
    transition: color 0.3s ease, text-decoration 0.3s ease;
}

.footer .footer-link:hover {
    color: black;
    text-decoration: underline;
}

.footer hr {
    border: none;
    height: 2px;
    background-color: #252525;
    margin: 1rem 0;
}
</style>