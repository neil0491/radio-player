<template>
  <div class="text-primary w-full my-4">
    <form class="flex h-12 relative z-0" @submit.prevent="querySearch">
      <input
        class="w-full text-default px-4 rounded-2xl focus:outline-none"
        type="text"
        placeholder="Поиск Радиостанции"
        v-model="query"
      />
      <button
        class="bg-primary px-8 h-full absolute -right-1 rounded-r-2xl"
        type="submit"
      >
        Поиск
      </button>
    </form>
    <div v-if="isSearchOpen" class="text-default-soft w-full relative">
      <ul
        @click="isSearchOpen = false"
        v-if="serchRadioStation.length > 0"
        class="
          absolute
          top-0
          bg-white
          w-full
          p-4
          mt-6
          h-96
          rounded-2xl
          shadow
          overflow-y-auto
        "
      >
        <li
          @click="playingRadio(radio)"
          class="
            flex
            items-center
            p-2
            space-x-4
            hover:bg-gray-200
            transition-colors
            delay-150
            ease-linear
            cursor-pointer
            rounded-xl
            overflow-y-auto
          "
          v-for="radio in serchRadioStation"
          :key="radio.id"
        >
          <img
            class="w-16 h-10 object-cover"
            :src="radio.stationImg"
            :alt="radio.stationName"
          />
          <div>
            {{ radio.stationName }}
          </div>
        </li>
      </ul>
      <div
        class="
          flex flex-col
          justify-center
          items-center
          absolute
          top-0
          bg-white
          w-full
          p-4
          mt-6
          h-96
          rounded-2xl
          shadow
          overflow-y-auto
        "
        v-else
      >
        <div>Ничего не найдено :(</div>

        <button
          @click="isSearchOpen = false"
          class="my-4 px-4 py-2 bg-secondary text-primary rounded-2xl shadow-lg"
        >
          Закрыть
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Search',
  data: () => ({
    query: '',
    limit: 30,
    serchRadioStation: [],
    isSearchOpen: false,
  }),
  methods: {
    ...mapMutations({
      SET_PLAY: 'player/SET_PLAY',
      SET_PLAYING: 'player/SET_PLAYING',
    }),
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
    playingRadio(radio) {
      this.SET_PLAY(radio)
      this.SET_PLAYING(true)
    },
  },
}
</script>

<style></style>
