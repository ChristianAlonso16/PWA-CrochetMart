<template>
  <div class="grid grid-nogutter px-4 sm:px-6 lg:px-6">
    <div class="col-12 md:col-6 flex align-items-center py-2">
      <p class="text-lg font-bold">Administrar Usuarios</p>
    </div>

    <div class="col-12">
      <div class="flex justify-content-end">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="filters.global.value"
            placeholder="Buscar usuario"
          />
        </span>
      </div>
    </div>

    <div class="col-12">
      <DataTable :value="filteredUsers" class="p-datatable-gridlines">
        <Column field="nombre" header="Nombre"></Column>
        <Column field="apellidos" header="Apellidos"></Column>
        <Column field="email" header="Correo electrónico"></Column>
        <Column header="Estado">
          <template #body="{ data }">
            <Button
              :icon="data.status.statusName === 'enable' ? 'pi pi-check' : 'pi pi-times'"
              class="p-button-rounded"
              :class="data.status.statusName === 'enable' ? 'p-button-success' : 'p-button-danger'"
              @click="toggleStatus(data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import AdminServices from "@/modules/admin/services/AdminServices";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

export default {
  components: {
    DataTable,
    Column,
    Button,
    InputText,
  },
  data() {
    return {
      users: [],
      filters: {
        global: { value: null },
      },
    };
  },
  computed: {
    filteredUsers() {
      const query = this.filters.global.value ? this.filters.global.value.toLowerCase() : '';
      return this.users.filter(user => {
        const name = user.nombre.toLowerCase();
        const surname = user.apellidos.toLowerCase();
        const email = user.email.toLowerCase();
        return name.includes(query) || surname.includes(query) || email.includes(query);
      });
    },
  },
  methods: {
    async getUsers() {
      try {
        const response = await AdminServices.getAllUsers();
        const { data, statusCode } = response;
        if (statusCode === 200) {
          this.users = data.map((user) => ({
            nombre: user.userInfo?.name || "N/A",
            apellidos: `${user.userInfo?.lastname || ""} ${user.userInfo?.surname || ""}`.trim() || "N/A",
            email: user.email || "N/A",
            status: user.status || "N/A",
          }));
        }
      } catch (error) {
        console.log(error);
      }
    },
    async toggleStatus(user) {
      try {
        const newStatus = user.status.statusName === "enable" ? "disabled" : "enable";
        const response = await AdminServices.updateStatusUser(user.email, newStatus);
        const { statusCode, message } = response;
        if (statusCode === 200) {
          const userIndex = this.users.findIndex((u) => u.email === user.email);
          if (userIndex !== -1) {
            this.users[userIndex].status = { statusName: newStatus };
          }
          this.$toast.success(message);
        } else {
          this.$toast.error(message);
        }
      } catch (error) {
        this.$toast.error("Error al cambiar el estado.");
      }
    },
  },
  mounted() {
    this.getUsers(); 
  },
};
</script>
