<template>
  <div>
    <div class="bg-inverse sticky top-0 z-10">
      <div class="container mx-auto flex items-center px-4">
        <div class="w-10">
          <button @click="$router.go(-1)" type="button" class="text-primary">
            <span class="material-icons back-arrow w-10 overflow-hidden">
              arrow_back_ios_new
            </span>
          </button>
        </div>
        <div class="w-full">
          <h1 class="text-center uppercase text-xl font-semibold">
            {{ $store.getters['countries/GET_COUNTRY'] }}
          </h1>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4">
      <div
        class="flex justify-center items-center h-96"
        v-if="$fetchState.pending"
      >
        <loader />
      </div>
      <div
        class="flex justify-center items-center text-primary"
        v-else-if="$fetchState.error"
      >
        Ошибка подключения :(
      </div>
      <div v-else>
        <search />
        <radio-card :radioStation="radio" />

        <div class="flex w-full">
          <button
            v-show="showButton"
            @click="fetchRadio"
            class="
              bg-primary
              p-4
              rounded-2xl
              mx-auto
              text-primary
              font-extrabold
            "
          >
            Больше
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    radioStation: [],
    page: 0,
    limit: 30,
    lastRadioStations: 0,
  }),

  async fetch() {
    if (!process.client) return
    const savedData = JSON.parse(localStorage.getItem('country'))
    const country_rus = JSON.parse(localStorage.getItem('country_rus'))
    if (savedData) {
      this.$store.commit('countries/SET_COUNTRY', savedData)
      this.$store.commit('countries/SET_COUNTRY_NAME', country_rus)
    }

    this.radioStation = await this.fetchRadio()
  },
  fetchOnServer: false,
  computed: {
    radio() {
      return this.radioStation
    },
    showButton() {
      return this.lastRadioStations == this.limit
    },
  },
  methods: {
    async fetchRadio() {
      const radio = await this.$content(this.$store.state.countries.countryPage)
        .only([
          'id',
          'stationStream',
          'stationName',
          'stationImg',
          'stationGenres',
          'stationDescription',
        ])
        .skip(this.limit * this.page)
        .limit(this.limit)
        .fetch()
      this.lastRadioStations = radio.length
      this.page++
      return (this.radioStation = [...this.radioStation, ...radio])
    },

    async querySearch() {
      let radio = await this.$content(this.$store.state.countries.countryPage)
        .only([
          'id',
          'stationStream',
          'stationName',
          'stationImg',
          'stationGenres',
          'stationDescription',
        ])
        .fetch()
      radio = radio.filter((str) =>
        str.stationName.toLowerCase().includes(this.query.toLowerCase())
      )
      this.serchRadioStation = radio.slice(0, this.limit)
      this.isSearchOpen = true
      this.query = ''
    },
  },
}
</script>

<style scoped>
.back-arrow {
  font-size: 2rem;
  line-height: 1.5;
}
.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.slide-bottom-enter,
.slide-bottom-leave-to {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
}
</style>
