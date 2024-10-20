import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

Vue.config.productionTip = false;
Vue.use(PrimeVue);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
