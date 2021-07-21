<template>
  <div :class="$store.getters['theme/GET_THEME']">
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
  mounted() {
    if (process.client) {
      const favourite = JSON.parse(localStorage.getItem('favourite'))

      const themeLocal = JSON.parse(localStorage.getItem('theme'))
      if (themeLocal) {
        this.$store.commit('theme/SET_THEME', themeLocal)
      }
      if (favourite) {
        this.$store.commit('favourite/SET_FAVOURITE_OF_LOCALSTORAGE', favourite)
      }
    }
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
