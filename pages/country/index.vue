<template>
  <div>
    <div class="bg-inverse sticky top-0">
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
      <div v-else-if="$fetchState.error">An error occurred :(</div>
      <div v-else>
        <radio-card :radioStation="radioStation" />
        <div class="flex w-full">
          <button
            v-show="showButton"
            @click="fetchMore"
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
    page: 1,
    limit: 30,
    lastRadioStation: 0,
  }),

  async fetch() {
    if (!process.client) return
    const savedData = JSON.parse(localStorage.getItem('country'))
    const country_rus = JSON.parse(localStorage.getItem('country_rus'))
    if (savedData) {
      this.$store.commit('countries/SET_COUNTRY', savedData)
      this.$store.commit('countries/SET_COUNTRY_NAME', country_rus)
    }

    this.radioStation = await this.$content(
      this.$store.state.countries.countryPage
    )
      .only([
        'id',
        'stationStream',
        'stationName',
        'stationImg',
        'stationGenres',
        'stationDescription',
      ])
      .limit(this.limit)
      .fetch()
    this.lastRadioStation = this.radioStation.length
  },
  fetchOnServer: false,
  computed: {
    showButton() {
      return this.lastRadioStation == this.limit
    },
  },
  methods: {
    async fetchMore() {
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
      this.lastRadioStation = radio.length
      this.page++
      this.radioStation = [...this.radioStation, ...radio]
    },
  },
}
</script>

<style scoped>
.back-arrow {
  font-size: 2rem;
  line-height: 1.5;
}
</style>
