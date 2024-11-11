<template>
    <Menubar class="flex w-full align-items-center navbar">
        <template #start>
            <span class="text-white text-2xl md:text-4xl font-bold line-height-2">CrochetMart</span>
        </template>
        <template #end>
            <div class="flex flex-column sm:flex-row justify-content-end align-items-center gap-3 md:gap-5 sm:gap-2 nav-end">
                <span class="p-input-icon-left hidden md:inline-flex">
                    <i class="pi pi-search"/>
                    <InputText type="text" placeholder="Buscar producto" />
                </span>
                <router-link class="text-white no-underline navlink" to="/productos"><i class="pi pi-fw pi-shopping-bag"/>Productos</router-link>
                <router-link class="text-white no-underline navlink" to="/carrito"><i class="pi pi-fw pi-shopping-cart"/>Carrito</router-link>
                <router-link class="text-white no-underline navlink" to="/login"><i class="pi pi-fw pi-user"/>Iniciar Sesión</router-link>
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
    padding: 12px 32px;
    background: #252525;
}

.navbar .nav-end {
    padding: 10px;
}

.navbar .navlink {
    transition: color 0.3s ease, text-decoration 0.3s ease;
}

.navbar .navlink:hover {
    color: #d7dbdd ;
}
</style>