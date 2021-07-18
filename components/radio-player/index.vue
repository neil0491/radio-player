<template>
  <div
    class="
      flex flex-col
      items-center
      fixed
      left-1/2
      transform
      -translate-x-1/2
      bottom-0
      w-full
      bg-primary
      text-primary
      rounded-t-3xl
    "
  >
    <audio
      ref="player"
      :src="GET_STREAM.stationStream"
      autoplay
      readyState
      preload="none"
    ></audio>
    <div
      v-if="Object.entries(GET_STREAM).length !== 0"
      class="flex justify-between items-center px-8 my-2 w-full"
      :class="layout ? 'full-height-player flex-col' : 'normal-player'"
    >
      <button
        @click="layout = false"
        class="cursor-pointer bg-transparent outline-none"
        :class="layout ? '' : 'hidden'"
      >
        <span class="material-icons"> keyboard_arrow_down </span>
      </button>

      <div
        class="flex cursor-pointer flex-grow"
        :class="
          layout
            ? 'flex-col my-2 md:my-8 justify-center items-center md:w-8/12 space-y-4'
            : ''
        "
        @click="layout = true"
      >
        <div
          :class="
            layout
              ? 'hidden'
              : 'h-8 w-8 bg-gray-100 rounded-full overflow-hidden'
          "
        >
          <img
            class="h-full w-full object-fill"
            :src="`https:${GET_STREAM.stationImg}`"
            :alt="GET_STREAM.stationName"
          />
        </div>
        <div :class="layout ? 'hidden' : 'text-xl mx-4 text-inline'">
          {{ GET_STREAM.stationName }}
        </div>

        <!-- Flip Card -->
        <flip-card :layout="layout" :data="GET_STREAM" />
      </div>
      <div
        class="flex"
        :class="layout ? 'justify-center w-full mb-6 items-center' : ''"
      >
        <div class="flex items-center justify-around w-full">
          <div class="flex-1 flex justify-center" v-if="layout">
            <button @click="toogleMute">
              <span v-if="GET_MUTE == true" class="material-icons icon-size">
                volume_off
              </span>
              <span v-if="GET_MUTE == false" class="material-icons icon-size">
                volume_up
              </span>
            </button>
          </div>
          <div class="flex-1 flex justify-center self-end">
            <button @click="tooglePlay">
              <span
                v-if="GET_PLAYING === false"
                class="material-icons icon-size"
              >
                play_arrow
              </span>
              <span
                v-if="GET_PLAYING === true"
                class="material-icons icon-size"
              >
                pause_arrow
              </span>
            </button>
          </div>
          <div class="flex-1 flex justify-center" v-if="layout">
            <button @click="addToFavourite">
              <span
                v-if="!isContainStation(GET_STREAM.id)"
                class="material-icons icon-size text-gray-100"
              >
                favorite
              </span>
            </button>
            <button @click="removeToFavourite">
              <span
                v-if="isContainStation(GET_STREAM.id)"
                class="material-icons icon-size text-red-700"
              >
                favorite
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      @click="layout = false"
      class="w-full bg-inverse rounded-t-2xl flex justify-around items-center"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data: () => ({
    layout: false,
  }),
  computed: {
    ...mapGetters({
      GET_STREAM: 'player/GET_STREAM',
      GET_PLAYING: 'player/GET_PLAYING',
      GET_MUTE: 'player/GET_MUTE',
      GET_ALL_RADIO: 'favourite/GET_ALL_RADIO',
    }),
  },
  methods: {
    ...mapActions({
      SET_RADIO: 'favourite/SET_RADIO',
      REMOVE_RADIO: 'favourite/REMOVE_RADIO',
    }),
    ...mapMutations({
      SET_PLAYING: 'player/SET_PLAYING',
      SET_MUTE: 'player/SET_MUTE',
    }),

    addToFavourite() {
      this.SET_RADIO(this.GET_STREAM)
    },
    removeToFavourite() {
      this.REMOVE_RADIO(this.GET_STREAM)
    },
    isContainStation(radioId) {
      // console.log(this.$refs.player.loadstart.getAudioTracks())
      return this.GET_ALL_RADIO.some((item) => item.id === radioId)
    },

    toogleMute() {
      // console.log(this.$refs.player.muted)
      if (this.GET_MUTE === false) {
        this.$refs.player.muted = true
        this.SET_MUTE(true)
      } else {
        this.$refs.player.muted = false
        this.SET_MUTE(false)
      }
    },

    // PLAYER
    async tooglePlay() {
      try {
        if (this.GET_PLAYING === false) {
          this.$refs.player.play()
          this.SET_PLAYING(true)
        } else {
          this.$refs.player.pause()
          this.SET_PLAYING(false)
        }
      } catch (e) {
        console.log(e)
        alert('Web Audio API не поддерживается данным браузером')
      }
    },
  },
}
</script>
<style scoped>
.full-height-player {
  height: calc(100vh - 200px);
  transition: 0.3s ease-in-out;
}
.normal-player {
  height: 30px;
  transition: 0.3s ease-in-out;
}
.text-inline {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
