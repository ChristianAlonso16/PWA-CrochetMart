<template>
  <div class="grid grid-nogutter px-4 sm:px-6 lg:px-6">
    <div class="col-12 md:col-6 flex align-items-center py-2">
      <p class="text-lg font-bold">Administración de ventas</p>
    </div>
    <div class="col-12">
      <div>
        <DataTable
          :value="orders"
          :paginator="true"
          :rows="5"
          dataKey="orderNumber"
          responsiveLayout="scroll"
          :filters="filters"
          filterDisplay="menu"
        >
          <template #header>
            <div class="flex justify-content-end">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Buscar pedido"
                />
              </span>
            </div>
          </template>

          <Column field="numOrder" header="No. Pedido" :sortable="true" />
          <Column field="dateOrder" header="Fecha" :sortable="true" />
          <Column field="status" header="Estado">
            <template #body="{ data }">
              <Badge
                :value="data.status"
                :severity="getStatusSeverity(data.status)"
              />
            </template>
          </Column>
          <Column header="Acciones">
            <template #body="{ data }">
              <Button
                icon="pi pi-eye"
                class="p-button-rounded p-button-text"
                @click="viewOrder(data.orderNumber)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Badge from "primevue/badge";
import AdminServices from "../services/AdminServices";

export default {
  components: {
    Button,
    DataTable,
    Column,
    InputText,
    Badge,
  },
  data() {
    return {
      categories: [],
      filters: {
        global: { value: null },
      },
      selectedCategory: null,
      isEditModalVisible: false,
      orders: [],
    };
  },

  methods: {
    async getOrders() {
      try {
        const response = await AdminServices.getAllOrders();
        this.orders = response.data;
        console.log(this.orders);
      } catch (error) {
        console.error(error);
      }
    },
    getStatusSeverity(status) {
      console.log(status);
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
