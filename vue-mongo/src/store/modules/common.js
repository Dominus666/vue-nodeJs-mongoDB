    
export default {
  state: {
    loading: false,
    error: null
  },
  mutations: {
    SET_LOADING (state, payload) {
      state.loading = payload
    },
    SET_ERROR (state, payload) {
      state.error = payload
    },
    CLEAR_ERROR (state) {
      state.error = null
    }
  },
  actions: {
    setLoading ({commit}, payload) {
      commit('SET_LOADING', payload)
    },
    setError ({commit}, payload) {
      commit('SET_ERROR', payload)
    },
    clearError ({commit}) {
      commit('CLEAR_ERROR')
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
}
  