import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/vue-clipboard2'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

// Read data from bible.json and store 
import nkjvData from './data/nkjv.json'
import rvrData from './data/rvr1960.json'
import kyhgData from './data/kyhg.json'
import router from './router'
store.commit('setNKJVData', nkjvData)
store.commit('setRVRData', rvrData)
store.commit('setKYHGData', kyhgData)

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
