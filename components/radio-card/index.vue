<template>
  <div class="flex flex-wrap">
    <div
      class="w-full flex-1 px-2 py-4"
      v-for="radio in radioStation"
      :key="radio.id"
    >
      <div
        @click="playingRadio(radio)"
        class="
          flex flex-col
          items-center
          justify-center
          w-40
          mx-auto
          cursor-pointer
        "
      >
        <div
          class="
            w-full
            h-20
            bg-center bg-cover
            rounded-3xl
            shadow-md
            radiostation-image
          "
          :style="`background-image: url(${radio.stationImg});`"
        ></div>

        <div
          class="-mt-1 overflow-hidden rounded-xl shadow-lg dark:bg-gray-800"
        >
          <h3
            class="
              text-xs
              py-2
              px-4
              font-semibold
              text-center text-inverse
              bg-inverse
              uppercase
            "
          >
            {{ radio.stationName }}
          </h3>
        </div>
      </div>
      <div
        @click="REMOVE_RADIO(radio)"
        class="flex justify-center py-2 cursor-pointer"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'RadioCard',
  props: {
    radioStation: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    ...mapMutations({
      SET_PLAY: 'player/SET_PLAY',
      SET_PLAYING: 'player/SET_PLAYING',
    }),
    ...mapActions({
      REMOVE_RADIO: 'favourite/REMOVE_RADIO',
    }),

    playingRadio(radio) {
      this.SET_PLAY(radio)
      this.SET_PLAYING(true)
    },
  },
}
</script>

<style>
.radiostation-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
