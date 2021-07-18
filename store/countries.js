const state = () => ({
  countryPage: '',
  country: '',
  countriesData: [
    {
      id: 1,
      country: 'Армения',
      img: 'flag_armeniya',
      country_eng: 'armeniya',
    },
    {
      id: 2,
      country: 'Азербайджан ',
      img: 'flag_azerbaidzan',
      country_eng: 'azerbaidzan',
    },
    {
      id: 3,
      country: 'Беларусь',
      img: 'flag_belorussija',
      country_eng: 'belorussija',
    },
    {
      id: 4,
      country: 'Казахстан',
      img: 'flag_kazahstan',
      country_eng: 'kazahstan',
    },
    {
      id: 5,
      country: 'Киргизия',
      img: 'flag_kirgizija',
      country_eng: 'kirgizija',
    },
    {
      id: 6,
      country: 'Молдавия',
      img: 'flag_moldavija',
      country_eng: 'moldavija',
    },
    {
      id: 7,
      country: 'Россия',
      img: 'flag_rus',
      country_eng: 'russia',
    },
    {
      id: 8,
      country: 'Таджикистан',
      img: 'flag_tadzikistan',
      country_eng: 'tadzikistan',
    },
    {
      id: 9,
      country: 'Туркменистан',
      img: 'flag_turkmenija',
      country_eng: 'turkmenija',
    },
    {
      id: 10,
      country: 'Узбекистан',
      img: 'flag_uzbekistan',
      country_eng: 'uzbekistan',
    },
    {
      id: 11,
      country: 'Украина',
      img: 'flag_ukraina',
      country_eng: 'ukraina',
    },
  ],
})
const mutations = {
  SET_COUNTRY(state, payload) {
    state.countryPage = payload
    localStorage.setItem('country', JSON.stringify(state.countryPage))
  },
  SET_COUNTRY_NAME(state, payload) {
    state.country = payload
    localStorage.setItem('country_rus', JSON.stringify(state.country))
  },
}

const getters = {
  GET_PAGE(state) {
    return state.countryPage
  },
  GET_COUNTRY(state) {
    return state.country
  },
}

export default {
  state,
  getters,
  mutations,
}
