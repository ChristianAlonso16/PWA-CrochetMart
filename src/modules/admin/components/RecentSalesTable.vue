<template>
  <div>
    <DataTable
      :value="customers"
      :paginator="true"
      :rows="5"
      responsiveLayout="scroll"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10]"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
    >
      <Column field="name" header="Nombre" sortable></Column>
      <Column field="products" header="Productos" sortable></Column>
      <Column field="total" header="Total" sortable></Column>
      <Column field="status" header="Estado" sortable>
        <template #body="slotProps">
          <span
            class="status-badge font-bold"
            :style="statusStyles[slotProps.data.status]"
          >
            {{ statusTexts[slotProps.data.status] || "Desconocido" }}
          </span>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  components: {
    DataTable,
    Column,
  },
  data() {
    return {
      customers: [
        {
          name: "Karel Mendoza Salgado",
          products: 64,
          total: 1999.0,
          status: "accepted",
        },
        {
          name: "Ana López",
          products: 12,
          total: 299.99,
          status: "in_progress",
        },
        { name: "Carlos Sánchez", products: 8, total: 150.0, status: "sent" },
        {
          name: "María García",
          products: 45,
          total: 1200.5,
          status: "delivered",
        },
        {
          name: "Jorge Pérez",
          products: 20,
          total: 450.75,
          status: "pending_payment",
        },
        { name: "Víctor Noé", products: 64, total: 1999.0, status: "accepted" },
        {
          name: "Ana López",
          products: 12,
          total: 299.99,
          status: "in_progress",
        },
        { name: "Carlos Sánchez", products: 8, total: 150.0, status: "sent" },
        {
          name: "María García",
          products: 45,
          total: 1200.5,
          status: "delivered",
        },
        {
          name: "Jorge Pérez",
          products: 20,
          total: 450.75,
          status: "pending_payment",
        },
        { name: "Víctor Noé", products: 64, total: 1999.0, status: "accepted" },
        {
          name: "Ana López",
          products: 12,
          total: 299.99,
          status: "in_progress",
        },
        { name: "Carlos Sánchez", products: 8, total: 150.0, status: "sent" },
        {
          name: "María García",
          products: 45,
          total: 1200.5,
          status: "delivered",
        },
        {
          name: "Jorge Pérez",
          products: 20,
          total: 450.75,
          status: "pending_payment",
        },
      ],
      statusTexts: {
        accepted: "Aceptado",
        in_progress: "En Proceso",
        sent: "Enviado",
        delivered: "Entregado",
        pending_payment: "Pago Pendiente",
      },
      statusStyles: {
        accepted: { backgroundColor: "#c9fdd4" },
        in_progress: { backgroundColor: "#fff3cd" },
        sent: { backgroundColor: "#ddc9fd" },
        delivered: { backgroundColor: "#c9e1fd" },
        pending_payment: { backgroundColor: "#fdc9c9" },
      },
    };
  },
  methods: {},
};
</script>

<style scoped>
.status-badge {
  padding: 0.5em 1em;
  border-radius: 10px;
  width: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 0 auto;
}
</style>
