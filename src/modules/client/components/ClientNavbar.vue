<template>
    <Menubar class="navbar">
        <template #start>
            <span>CrochetMart</span>
        </template>
        <template #end>
            <div class="nav-end">
                <span class="p-input-icon-left">
                    <i class="pi pi-search"/>
                    <InputText type="text" placeholder="Buscar producto" />
                </span>
                <router-link class="navlink" to="/productos"><i class="pi pi-fw pi-shopping-bag"/>Productos</router-link>
                <router-link class="navlink" to="/carrito"><i class="pi pi-fw pi-shopping-cart"/>Carrito</router-link>
                <router-link class="navlink" to="/login"><i class="pi pi-fw pi-user"/>Iniciar Sesión</router-link>
            </div>
        </template>
    </Menubar>
</template>

<script>
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';

export default {
    name: 'ClientNavbar',
    components: {
        Menubar,
        InputText,
    },
};
</script>

<style scoped>
.navbar {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 12px 32px;
    gap: 25px;
    background: #252525;
}

.navbar span {
    color: white;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: 0.32px;
}

.navbar .nav-end {
    display: flex;
    padding: 10px;
    justify-content: flex-end;
    align-items: center;
    gap: 25px;
    flex-shrink: 0;
}

.navbar .navlink {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease, text-decoration 0.3s ease;
}

.navbar .navlink:hover {
    color: #d7dbdd ;
}
</style>