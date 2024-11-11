import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import "@/assets/styles/main.css";
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import store from './store/store';

Vue.config.productionTip = false;
Vue.use(PrimeVue);
Vue.use(store);
Vue.use(ToastService);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
