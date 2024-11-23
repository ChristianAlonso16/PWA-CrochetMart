<template>
  <div class="grid grid-nogutter px-4 sm:px-6 lg:px-6">
    <div class="col-12 md:col-6 flex align-items-center py-2">
      <p class="text-lg font-bold">Administrar Categorías</p>
    </div>
    <div class="col-12 md:col-6 flex justify-content-end py-4">
      <Button class="" style="border-radius: 6px !important" @click="openModal">
        Agregar
      </Button>
    </div>
    <AddCategoryModal :visible.sync="modalVisible" @refresh="getCategories" />

    <div class="col-12">
      <div>
        <DataTable
          :value="categories"
          :paginator="true"
          :rows="5"
          dataKey="categoryName"
          :filters.sync="filters"
          filterDisplay="menu"
          responsiveLayout="scroll"
          :globalFilterFields="['categoryName', 'categoryDescription']"
        >
          <template #header>
            <div class="flex justify-content-end">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Buscar categoría"
                />
              </span>
            </div>
          </template>
          <Column field="icono" header="Ícono">
            <template #body="{ data }">
              <div v-if="data.icono">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path :d="findIconPath(data.icono)" />
                </svg>
              </div>
            </template>
          </Column>

          <Column field="categoryName" header="Nombre" :sortable="true" />
          <Column
            field="categoryDescription"
            header="Descripción"
            :sortable="true"
          >
            <template>
              <InputText
                placeholder="Buscar por descripción"
                class="p-column-filter"
              />
            </template>
          </Column>

          <Column header="Acciones">
            <template #body="{ data }">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="openEditModal(data)"
              />
              <Button
                :icon="
                  data.status.statusName === 'enable'
                    ? 'pi pi-check'
                    : 'pi pi-times'
                "
                class="p-button-rounded"
                :class="
                  data.status.statusName === 'enable'
                    ? 'p-button-success'
                    : 'p-button-danger'
                "
                @click="toggleStatus(data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <EditCategoryModal
      :category="selectedCategory"
      v-if="selectedCategory"
      :visible.sync="isEditModalVisible"
      @update-category="updateCategory"
      @close="selectedCategory = null"
    />
  </div>
</template>
  
  <script>
import AddCategoryModal from "../components/categories/AddCategoryModal.vue";
import EditCategoryModal from "../components/categories/EditCategoryModal.vue";
import AdminServices from "@/modules/admin/services/AdminServices";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import * as mdiIcons from "@mdi/js";

export default {
  components: {
    AddCategoryModal,
    EditCategoryModal,
    Button,
    DataTable,
    Column,
    InputText,
  },
  data() {
    return {
      categories: [],
      filters: {
        global: { value: null },
      },
      selectedCategory: null,
      isEditModalVisible: false,
      modalVisible: false,
    };
  },
  methods: {
    async getCategories() {
      try {
        const response = await AdminServices.getAllCategories();
        const { data, statusCode } = response;
        if (statusCode === 200) {
          this.categories = data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    findIconPath(iconName) {
      const formattedName = iconName
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^./, (str) => str.toUpperCase());
      const icon = Object.entries(mdiIcons).find(
        ([key]) =>
          key
            .replace("mdi", "")
            .replace(/([A-Z])/g, " $1")
            .trim() === formattedName
      );
      return icon ? icon[1] : "";
    },
    openEditModal(category) {
      this.selectedCategory = { ...category };
      this.isEditModalVisible = true;
    },
    async updateCategory() {
      try {
        await this.getCategories();
        this.isEditModalVisible = false;
        this.selectedCategory = null;
      } catch (error) {
        console.error(error);
      }
    },
    async toggleStatus(category) {
      try {
        const newStatus =
          category.status.statusName === "enable" ? "disabled" : "enable";
        await AdminServices.deleteCategory(category.categoryName, newStatus);
        this.getCategories();
      } catch (error) {
        console.error("Error al cambiar el estado:", error);
      }
    },
    async deleteCategory(name, status) {
      try {
        await AdminServices.deleteCategory(name, status);
        this.getCategories();
      } catch (error) {
        console.log(error);
      }
    },
    openModal() {
      this.modalVisible = true;
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<style scoped>
.p-button {
  border-radius: 100px !important;
}
</style>