<template>
  <div class="container mx-auto p-4">
    <h1 class="uppercase text-xl my-4 text-center">Выберите тему</h1>
    <div class="flex flex-wrap justify-center gap-8">
      <theme-card
        v-for="(theme, index) in GET_ALL_THEME"
        :key="index"
        @chooseTheme="chooseTheme"
        :theme="theme"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapMutations({
      SET_THEME: 'theme/SET_THEME',
    }),
    chooseTheme(theme) {
      this.SET_THEME(theme)
    },
  },
  computed: {
    ...mapGetters({
      GET_ALL_THEME: 'theme/GET_ALL_THEME',
    }),
  },
}
</script>

<style></style>
