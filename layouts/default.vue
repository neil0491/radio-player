<template>
  <div :class="theme">
    <div class="pb-28 bg-secondary text-primary min-h-screen">
      <Nuxt />
    </div>
    <radio-player v-if="$store.state.player.radioPlaying">
      <template>
        <NuxtLink to="/"
          ><span class="material-icons icon-size"> home </span>
        </NuxtLink>
        <NuxtLink to="/favourite">
          <span class="material-icons icon-size"> favorite </span>
        </NuxtLink>
        <NuxtLink to="/theme">
          <span class="material-icons icon-size">settings </span>
        </NuxtLink>
      </template>
    </radio-player>
  </div>
</template>

<script>
export default {
  computed: {
    theme() {
      if (!process.client) return
      const savedData = JSON.parse(localStorage.getItem('theme'))
      if (savedData) {
        this.$store.commit('theme/SET_THEME', savedData)
      }
      return this.$store.getters['theme/GET_THEME']
    },
  },
  mounted() {
    if (!process.client) return
    const getData = JSON.parse(localStorage.getItem('favourite'))
    if (getData) {
      this.$store.commit('favourite/SET_FAVOURITE_OF_LOCALSTORAGE', getData)
    }
    console.log(localStorage.getItem('favourite'))
  },
}
</script>

<style>
.icon-size {
  font-size: 2.2rem;
  line-height: 1.6;
  @apply block w-10;
}
</style>
