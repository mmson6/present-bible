import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    c: null,
  },
  mutations: {
    setNKJVData (state, data) {
      state.nkjvData = data
    }
  },
  actions: {
  },
  modules: {
  }
})
