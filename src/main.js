import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// Punto inicial de la app. Vue se encarga del resto.
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
