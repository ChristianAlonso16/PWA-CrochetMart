<template>
    <div class="grid grid-nogutter px-4 sm:px-6 lg:px-6">
      <div class="col-12 md:col-6 flex align-items-center py-2">
        <p class="text-lg font-bold">Administrar Categorías</p>
      </div>
      <div class="col-12 md:col-6 flex justify-content-end py-2">
        <AddCategoryModal @refresh="getCategories" />
      </div>
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
            @row-click="handleRowClick"
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
  
            <Column field="categoryName" header="Nombre" :sortable="true" />
            <Column field="categoryDescription" header="Descripción" :sortable="true">
              <template>
                <InputText placeholder="Buscar por descripción" class="p-column-filter" />
              </template>
            </Column>
            <Column field="status.statusName" header="Estado" :sortable="true">
              <template #body="{ data }">
                <span>{{ data.status.statusName === 'enable' ? 'Activo' : 'Inactiva' }}</span>
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
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-danger"
                  @click="deleteCategory(data)"
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
        @close="selectedCategory = null"
        @refresh="getCategories"
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
      openEditModal(category) {
        this.selectedCategory = category;
        this.isEditModalVisible = true;
      },
      async deleteCategory(category) {
        try {
          await AdminServices.deleteCategory(category.categoryName);
          this.getCategories(); 
        } catch (error) {
          console.log(error);
        }
      },
      handleRowClick(rowData) {
        this.openEditModal(rowData);
      },
    },
    mounted() {
      this.getCategories();
    },
  };
  </script>
  