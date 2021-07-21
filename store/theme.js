const state = () => ({
  theme: '',
  allTheme: ['theme-startup', 'theme-boring', 'theme-elegant'],
})
const mutations = {
  SET_THEME(state, payload) {
    state.theme = payload
    localStorage.setItem('theme', JSON.stringify(state.theme))
  },
}
// const actions = {}
const getters = {
  GET_THEME(state) {
    return state.theme
  },
  GET_ALL_THEME(state) {
    return state.allTheme
  },
}

export default {
  state,
  getters,
  // actions,
  mutations,
}
