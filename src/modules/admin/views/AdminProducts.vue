<template>
  <div class="grid grid-nogutter px-6">
    <div class="col-12 flex align-items-center py-2">
      <p class="text-lg font-bold col-10">Administrar productos</p>
      <Button
        class="col-2 p-button-primary"
        @click="showAddProductModal = true"
      >
        Agregar
      </Button>
    </div>

    <AddProductModal
      :visible="showAddProductModal"
      @close="showAddProductModal = false"
    />
    <div class="col-12">
      <div>
        <DataTable
          :value="products"
          :paginator="true"
          :rows="5"
          dataKey="code"
          :filters.sync="filters"
          filterDisplay="menu"
          responsiveLayout="scroll"
          :globalFilterFields="['code', 'name', 'categories']"
        >
          <template #header>
            <div class="flex justify-content-end">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Buscar producto"
                />
              </span>
            </div>
          </template>

          <Column field="code" header="Código" :sortable="true" />
          <Column field="name" header="Nombre" :sortable="true">
            <template>
              <InputText placeholder="Search by name" class="p-column-filter" />
            </template>
          </Column>
          <Column field="categories" header="Categorías" :sortable="true">
            <template>
              <InputText
                placeholder="Search by category"
                class="p-column-filter"
              />
            </template>
          </Column>
          <Column field="reviews" header="Reseñas" :sortable="true">
            <template #body="{ data }">
              {{ data.reviews }}
            </template>
          </Column>

          <Column header="Acciones">
            <template #body="{ data }">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="editProduct(data)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-danger"
                @click="deleteProduct(data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import AddProductModal from "../components/AddProductModal.vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  components: {
    AddProductModal,
    Button,
    DataTable,
    Column,
    InputText,
  },
  data() {
    return {
      products: [
        {
          code: "001",
          name: "Producto A",
          categories: "Categoría 1",
          reviews: 10,
        },
        {
          code: "002",
          name: "Producto B",
          categories: "Categoría 2",
          reviews: 5,
        },
      ],
      filters: {
        global: { value: null },
        name: { value: null, matchMode: "contains" },
        categories: { value: null, matchMode: "contains" },
      },

      showAddProductModal: false,
    };
  },
  methods: {
    editProduct(product) {
      console.log("editar:", product);
    },
    deleteProduct(product) {
      console.log("eliminar:", product);
    },
  },
};
</script>
