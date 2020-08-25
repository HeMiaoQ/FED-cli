export default {
  state: {
    loading: false,
    noNet: false
  },
  mutations: {
    SET_LOADING_STATUS (state, payload) {
      state.loading = payload
    },
    SET_NET_STATUS (state, payload) {
      state.noNet = payload
    }
  },
  actions: {
    UPDATE_LOADING_STATUS ({ commit }, payload) {
      commit('SET_LOADING_STATUS', payload)
    },
    UPDATE_NET_STATUS ({ commit }, payload) {
      commit('SET_NET_STATUS', payload)
    }
  }
}
