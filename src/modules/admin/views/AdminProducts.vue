<template>
  <div class="grid grid-nogutter px-4 sm:px-6 lg:px-8">
    <div class="col-12 md:col-6 flex align-items-center py-2">
      <p class="text-lg font-bold">Administrar productos</p>
    </div>
    <div class="col-12 md:col-6 flex justify-content-end py-2">
      <AddProductModal />
    </div>

    <div class="col-12">
      <div>
        <DataTable
          :value="products"
          :paginator="true"
          :rows="5"
          dataKey="numProduct"
          :filters.sync="filters"
          filterDisplay="menu"
          responsiveLayout="scroll"
          :globalFilterFields="['numProduct', 'name', 'categories']"
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

          <Column field="numProduct" header="Código" :sortable="true" />
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
                @click="openEditModal(data)"
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
    <EditProductModalVue
      :numProduct="selectedProduct?.numProduct"
      v-if="selectedProduct"
      :visible.sync="isEditModalVisible"
      @close="selectedProduct = null"
    />
  </div>
</template>

<script>
import AddProductModal from "../components/AddProductModal.vue";
import EditProductModalVue from "../components/EditProductModal.vue";
import AdminServices from "@/modules/admin/services/AdminServices";
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
    EditProductModalVue,
  },
  data() {
    return {
      products: [],
      filters: {
        global: { value: null },
        name: { value: null, matchMode: "contains" },
        categories: { value: null, matchMode: "contains" },
      },
      selectedProduct: null,
      isEditModalVisible: false,
    };
  },
  methods: {
    openEditModal(product) {
      this.selectedProduct = product;
      this.isEditModalVisible = true;
    },
    deleteProduct(product) {
      console.log("eliminar:", product);
    },
    async getProduct() {
      try {
        const response = await AdminServices.getProducts();
        const { data, statusCode } = response;

        if (statusCode === 200) {
          this.products = data.map((product) => ({
            ...product,
            categories: product.categories
              .map((category) => category.categoryName)
              .join(", "),
          }));
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
