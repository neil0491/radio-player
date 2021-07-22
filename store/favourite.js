const state = () => ({
  favouriteRadio: {},
})
const mutations = {
  SET_FAVOURITE(state, payload) {
    // const haveRadio = state.favouriteRadio.find(
    //   (item) => item.id === payload.id
    // )
    // const haveRadioFilter = state.favouriteRadio.filter(
    //   (item) => item.id === payload.id
    // )
    const haveRadio = state.favouriteRadio.some(
      (item) => item.id === payload.id
    )
    if (!haveRadio) {
      state.favouriteRadio.push(payload)
      localStorage.setItem('favourite', JSON.stringify(state.favouriteRadio))
    }
  },
  REMOVE_FAVOURITE(state, payload) {
    state.favouriteRadio = state.favouriteRadio.filter(
      (item) => item.id !== payload.id
    )
    localStorage.setItem('favourite', JSON.stringify(state.favouriteRadio))
  },

  SET_FAVOURITE_OF_LOCALSTORAGE(state, payload) {
    state.favouriteRadio = payload
  },
}
const actions = {
  nuxtServerInit(ctx) {
    console.log(ctx)
    console.log('SERVER INIT')
  },

  SET_RADIO({ commit }, payload) {
    commit('SET_FAVOURITE', payload)
  },
  REMOVE_RADIO({ commit }, payload) {
    commit('REMOVE_FAVOURITE', payload)
  },
}
const getters = {
  GET_ALL_RADIO(state) {
    return state.favouriteRadio
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
