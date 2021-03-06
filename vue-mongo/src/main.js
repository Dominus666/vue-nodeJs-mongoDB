import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,

  created () {
    this.$store.dispatch('fetchPost')
  }
}).$mount('#app')
