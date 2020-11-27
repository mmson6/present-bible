import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

// Read data from bible.json and store 
import nkjvData from './data/nkjv.json'
store.commit('setNKJVData', nkjvData)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
