<template>
  <div class="h-auto">
    <!-- Contenedor de tarjetas -->
    <div class="grid grid-nogutter">
      <div class="col-12 md:col-4 px-6 py-2">
        <DashboardCard title="Usuarios" count="490" icon="pi pi-users" />
      </div>
      <div class="col-12 md:col-4 px-6 py-2">
        <DashboardCard title="Productos" count="680" icon="pi pi-box" />
      </div>
      <div class="col-12 md:col-4 px-6 py-2">
        <DashboardCard title="Pedidos" count="130" icon="pi pi-shopping-cart" />
      </div>
    </div>

    <!-- Tabla de ventas recientes -->
    <div class="grid grid-nogutter px-6">
      <div class="col-12">
        <p class="text-lg font-bold my-6">Ventas recientes</p>
        <RecentSalesTable />
      </div>
    </div>
  </div>
</template>

<script>
import DashboardCard from "../components/DashboardCard.vue";
import RecentSalesTable from "../components/RecentSalesTable.vue";
export default {
  components: {
    DashboardCard,
    RecentSalesTable,
  },
};
</script>
