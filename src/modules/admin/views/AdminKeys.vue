<template>
  <div class="grid grid-nogutter px-4 sm:px-6 lg:px-6">
    <div class="col-12 md:col-6 flex align-items-center py-2">
      <p class="text-lg font-bold">Administrar stripe keys</p>
    </div>
    <div class="col-12">
      <div class="col-12 lg:col-6 xl:col-4">
        <Card>
          <template #content>
            <div class="grid px-5">
              <div
                class="col-12 sm:col-6 md:col-6 lg:col-6 xl:col-6 flex flex-column justify-content-between flex-wrap"
              >
                <h3>Key Stripe</h3>
                <h5>Modificado</h5>
                <p>{{ stripeKeys }}</p>
              </div>
              <div
                class="col-12 sm:col-6 md:col-6 lg:col-6 xl:col-6 flex flex-column justify-content-between flex-wrap"
              >
                <div class="flex justify-content-end flex-wrap">
                  <i class="pi pi-key" style="font-size: 2rem"></i>
                </div>
                <div class="flex justify-content-end flex-wrap">
                  <Button
                    icon="pi pi-pencil"
                    class="p-button-raised p-button-outlined"
                  />
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <div class="col-12 md:col-6 flex align-items-center py-2">
      <p class="text-lg font-bold">Detalles del pedido</p>
    </div>
    <div class="col-12">
      <div class="grid">
        <CardsLinks title="Link Play Store" :subtitle="linkAndroid" />
        <CardsLinks title="Link App Store" :subtitle="linkIos" />
      </div>
    </div>
  </div>
</template>

<script>
import AdminServices from "../services/AdminServices";
import Card from "primevue/card";
import Button from "primevue/button";
import CardsLinks from "../components/keys/CardsLinks.vue";
import Utils from "@/core/utils/FunctionGlobals";

export default {
  components: {
    Card,
    Button,
    CardsLinks,
  },
  data() {
    return {
      stripeKeys: "",
      linkIos: "",
      linkAndroid: "",
    };
  },
  methods: {
    async getStripeKeys() {
      try {
        const response = await AdminServices.getKeyStripe();
        const { data, statusCode } = response;

        if (statusCode === 200) {
          this.stripeKeys = Utils.formatDate(data[0].updateAt);
        }
      } catch (error) {
        this.$toast.error("Error al obtener las keys de stripe");
      }
    },
    async getLinkIosApp() {
      try {
        const response = await AdminServices.getLinkIosApp();
        const { data, statusCode } = response;

        if (statusCode === 200) {
          this.linkIos = data.url;
        }
      } catch (error) {
        this.$toast.error("Error al obtener el link de la app de ios");
      }
    },
    async getLinkAndroidApp() {
      try {
        const response = await AdminServices.getLinkAndroindApp();
        const { data, statusCode } = response;

        if (statusCode === 200) {
          this.linkAndroid = data.url;
        }
      } catch (error) {
        this.$toast.error("Error al obtener el link de la app de android");
      }
    },
  },
  mounted() {
    this.getStripeKeys();
    this.getLinkIosApp();
    this.getLinkAndroidApp();
  },
};
</script>
<style scoped>
.p-button {
  border-radius: 100px !important;
  background-color: #ffff !important;
  border-color: #252525 !important;
  color: #252525 !important;
  height: 50px !important;
  width: 50px !important;
}
.p-card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
}
</style>