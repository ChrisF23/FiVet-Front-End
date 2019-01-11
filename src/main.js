import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource';
import VueSession from 'vue-session'

Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(VueSession)
// Punto inicial de la app. Vue se encarga del resto.
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
