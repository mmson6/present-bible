import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nkjvData: null,
    rvr1960Data: null,
    kyhgData: null,
  },
  mutations: {
    setNKJVData (state, data) {
      state.nkjvData = data
    },
    setRVR1960Data (state, data) {
      state.rvr1960Data = data
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
