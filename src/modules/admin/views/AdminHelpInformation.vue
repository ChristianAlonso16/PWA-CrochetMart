<template>
    <div class="w-full md:w-11 lg:w-10 xl:w-8 mx-auto p-3">
        <!-- Título principal -->
        <h1 class="text-center text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-3">Centro de Ayuda del Administrador</h1>
        <!-- Subtítulo -->
        <p class="text-center mb-3 md:mb-5 subtitle">Encuentra toda la información necesaria para gestionar tu tienda de Crochet</p>
        <!-- Barra de búsqueda -->
        <div class="flex justify-content-center mb-3 md:mb-5">
            <span class="p-input-icon-left w-full md:w-8 lg:w-6">
                <i class="pi pi-search" />
                <InputText type="text" placeholder="Buscar ayuda..." class="w-full" />
            </span>
        </div>
        <!-- Tabs de navegación -->
        <div class="mb-4 overflow-x-auto tabs-container">
            <ul class="flex flex-nowrap md:flex-wrap justify-content-start md:justify-content-around p-0 m-0 min-w-min tabs">
                <li v-for="(tab, index) in tabs" :key="index" :class="{'active-tab': activeTab === index}" @click="activeTab = index" class="text-sm md:text-base whitespace-nowrap">
                    {{ tab.label }}
                </li>
            </ul>
        </div>
        <!-- Contenido dinámico del tab seleccionado -->
        <div class="p-2 md:p-4 border-round-md tab-content">
            <div v-if="activeTab === 0">
                <h2 class="text-xl md:text-2xl mb-2">Gestión de Productos</h2>
                <p class="mb-3 md:mb-4 text-sm md:text-base section-subtitle">Aprende a administrar el catálogo de productos de tu tienda</p>
                <ul class="pl-0 content-list">
                    <li class="mb-3 md:mb-4">
                        <strong class="block font-bold mb-1 md:mb-2 text-sm md:text-base">Agregar Nuevos Productos</strong>
                        <p class="text-sm md:text-base">Guía paso a paso para agregar nuevos productos, incluyendo imágenes, precios y descripciones.</p>
                    </li>
                    <li class="mb-3 md:mb-4">
                        <strong class="block font-bold mb-1 md:mb-2 text-sm md:text-base">Editar Productos Existentes</strong>
                        <p class="text-sm md:text-base">Cómo modificar la información de productos ya publicados.</p>
                    </li>
                    <li class="mb-3 md:mb-4">
                        <strong class="block font-bold mb-1 md:mb-2 text-sm md:text-base">Gestión de Inventario</strong>
                        <p class="text-sm md:text-base">Control y actualización de stock de productos.</p>
                    </li>
                </ul>
            </div>
            <div v-if="activeTab === 1">
                <h2 class="text-xl md:text-2xl mb-2">Gestión de Categorías</h2>
                <p class="mb-3 md:mb-4 text-sm md:text-base section-subtitle">Organiza tus productos en categorías para una mejor navegación</p>
                <ul class="pl-0 content-list">
                    <li class="mb-3 md:mb-4">
                        <strong class="block font-bold mb-1 md:mb-2 text-sm md:text-base">Crear Categorías</strong>
                        <p class="text-sm md:text-base">Cómo crear y organizar nuevas categorías para tus productos.</p>
                    </li>
                    <li class="mb-3 md:mb-4">
                        <strong class="block font-bold mb-1 md:mb-2 text-sm md:text-base">Asignar Productos</strong>
                        <p class="text-sm md:text-base">Proceso para asignar productos a las categorías correspondientes.</p>
                    </li>
                </ul>
            </div>
            <div v-if="activeTab === 2">
                <h2 class="text-xl md:text-2xl mb-2">Historial de Usuarios</h2>
                <p class="mb-3 md:mb-4 text-sm md:text-base section-subtitle">Gestiona la información y actividad de los usuarios</p>
                <ul class="pl-0 content-list">
                    <li class="mb-3 md:mb-4">
                        <strong class="block font-bold mb-1 md:mb-2 text-sm md:text-base">Registro de Actividades</strong>
                        <p class="text-sm md:text-base">Visualiza el historial de acciones de los usuarios en la plataforma.</p>
                    </li>
                    <li class="mb-3 md:mb-4">
                        <strong class="block font-bold mb-1 md:mb-2 text-sm md:text-base">Gestión de Permisos</strong>
                        <p class="text-sm md:text-base">Administra los niveles de acceso y permisos de usuarios.</p>
                    </li>
                </ul>
            </div>
            <div v-if="activeTab === 3">
                <h2 class="text-xl md:text-2xl mb-2">Historial de Ventas</h2>
                <p class="mb-3 md:mb-4 text-sm md:text-base section-subtitle">Monitorea y gestiona todas las transacciones</p>
                <ul class="pl-0 content-list">
                    <li class="mb-3 md:mb-4">
                        <strong class="block font-bold mb-1 md:mb-2 text-sm md:text-base">Registro de Ventas</strong>
                        <p class="text-sm md:text-base">Visualiza el historial completo de ventas y transacciones.</p>
                    </li>
                    <li class="mb-3 md:mb-4">
                        <strong class="block font-bold mb-1 md:mb-2 text-sm md:text-base">Gestión de Pedidos</strong>
                        <p class="text-sm md:text-base">Proceso de seguimiento y actualización de estados de pedidos.</p>
                    </li>
                </ul>
            </div>
            <div v-if="activeTab === 4">
                <h2 class="text-xl md:text-2xl mb-2">Configuración de Keys</h2>
                <p class="mb-3 md:mb-4 text-sm md:text-base section-subtitle">Gestiona las claves de integración para diferentes servicios</p>
                <ul class="pl-0 content-list">
                    <li class="mb-3 md:mb-4">
                        <strong class="block font-bold mb-1 md:mb-2 text-sm md:text-base">Stripe</strong>
                        <p class="text-sm md:text-base">Configuración de claves API para procesamiento de pagos con Stripe.</p>
                    </li>
                    <li class="mb-3 md:mb-4">
                        <strong class="block font-bold mb-1 md:mb-2 text-sm md:text-base">Play Store</strong>
                        <p class="text-sm md:text-base">Gestión de credenciales para la aplicación en Google Play Store.</p>
                    </li>
                    <li class="mb-3 md:mb-4">
                        <strong class="block font-bold mb-1 md:mb-2 text-sm md:text-base">App Store</strong>
                        <p class="text-sm md:text-base">Configuración de claves para la aplicación en Apple App Store.</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
export default {
    components: {
        InputText
    },
    data() {
        return {
            activeTab: 0,
            tabs: [
                {label: 'Productos' },
                {label: 'Categorías' },
                {label: 'Usuarios' },
                {label: 'Ventas' },
                {label: 'Keys' },
            ]
        };
    }
}
</script>

<style scoped>
/* Título principal y subtítulo */
.subtitle {
    color: #666;
}

/* Contenedor de tabs */
.tabs-container {
    border-bottom: 1px solid #ddd;
}

.tabs {
    list-style: none;
}

.tabs li {
    padding: 10px 15px;
    cursor: pointer;
    font-weight: bold;
    color: #555;
    border-bottom: 2px solid transparent;
}

.tabs li.active-tab {
    border-bottom: 2px solid #007ad9;
    color: #007ad9;
}

/* Contenido de la sección seleccionada */
.tab-content {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
}

.section-subtitle {
    color: #666;
}

.content-list {
    list-style: none;
}

@media screen and (max-width: 768px) {
    .tabs li {
        padding: 0.5rem 0.75rem;
    }
}
</style>
