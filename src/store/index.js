import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nkjvData: null,
    rvrData: null,
    kyhgData: null,
  },
  mutations: {
    setNKJVData (state, data) {
      state.nkjvData = data
    },
    setRVRData (state, data) {
      state.rvrData = data
    },
    setKYHGData (state, data) {
      state.kyhgData = data
    }
  },
  actions: {
  },
  modules: {
  }
})
