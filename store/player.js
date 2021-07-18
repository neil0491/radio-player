const state = () => ({
  radioPlaying: {},
  playing: false,
  mute: false,
})
const mutations = {
  SET_PLAY(state, payload) {
    state.radioPlaying = payload
  },
  SET_PLAYING(state, payload) {
    state.playing = payload
  },
  SET_MUTE(state, payload) {
    state.mute = payload
  },
}
// const actions = {}
const getters = {
  GET_STREAM(state) {
    return state.radioPlaying
  },
  GET_PLAYING(state) {
    return state.playing
  },
  GET_MUTE(state) {
    return state.mute
  },
}

export default {
  state,
  getters,
  // actions,
  mutations,
}
