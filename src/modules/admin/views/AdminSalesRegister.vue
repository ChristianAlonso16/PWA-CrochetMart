<template>
    <div class="grid grid-nogutter px-4 sm:px-6 lg:px-6">
        <div class="col-12 md:col-6 flex align-items-center py-2">
            <p class="text-lg font-bold">Administración de ventas</p>
        </div>
        <div class="col-12">
            <div>
                <DataTable :value="orders" :paginator="true" :rows="5" dataKey="orderNumber" responsiveLayout="scroll"
                    :filters="filters" filterDisplay="menu">
                    <template #header>
                        <div class="flex justify-content-end">
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar pedido" />
                            </span>
                        </div>
                    </template>

                    <Column field="orderNumber" header="No. Pedido" :sortable="true" />
                    <Column field="date" header="Fecha" :sortable="true" />
                    <Column field="status" header="Estado">
                        <template #body="{ data }">
                            <Badge :value="data.status" :severity="getStatusSeverity(data.status)" />
                        </template>
                    </Column>
                    <Column header="Acciones">
                        <template #body="{ data }">
                            <Button icon="pi pi-eye" class="p-button-rounded p-button-text"
                                @click="viewOrder(data.orderNumber)" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Badge from "primevue/badge";

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

        };
    },

    setup() {

        const orders = ref([
            { orderNumber: "ORD-1001", date: "2024-10-10", status: "Aceptado" },
            { orderNumber: "ORD-1002", date: "2024-10-11", status: "En progreso" },
            { orderNumber: "ORD-1003", date: "2024-10-12", status: "Enviado" },
            { orderNumber: "ORD-1004", date: "2024-10-13", status: "Entregado" },
            { orderNumber: "ORD-1005", date: "2024-10-14", status: "Pago pendiente" },
            { orderNumber: "ORD-1006", date: "2024-10-15", status: "Aceptado" },
            { orderNumber: "ORD-1007", date: "2024-10-16", status: "En progreso" },
            { orderNumber: "ORD-1008", date: "2024-10-17", status: "Enviado" },
            { orderNumber: "ORD-1009", date: "2024-10-18", status: "Entregado" },
            { orderNumber: "ORD-1010", date: "2024-10-19", status: "Pago pendiente" },
        ]);


        const getStatusSeverity = (status) => {
            switch (status) {
                case "Aceptado":
                    return "info";
                case "En progreso":
                    return "primary";
                case "Enviado":
                    return "info";
                case "Entregado":
                    return "success";
                case "Pago pendiente":
                    return "danger";
                default:
                    return null;
            }
        };

        const viewOrder = (orderNumber) => {
            console.log(`Ver detalles de la orden: ${orderNumber}`);
        };

        return {
            orders,
            getStatusSeverity,
            viewOrder,
        };
    },
};
</script>

<style scoped></style>
