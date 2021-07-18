<template>
  <div>
    <radio-card :radioStation="getFavourite">
      <div class="py-2 px-4 bg-red-700 rounded-xl text-sm">Удалить</div>
    </radio-card>
    <div
      v-if="getFavourite.length === 0"
      class="p-8 text-inverse-soft text-2xl text-center mt-10"
    >
      У Вас нет избранных радиостанций
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    getFavourite() {
      return this.GET_ALL_RADIO
    },
    ...mapGetters({
      GET_ALL_RADIO: 'favourite/GET_ALL_RADIO',
    }),
  },
  methods: {
    ...mapActions({
      SET_RADIO: 'favourite/SET_RADIO',
    }),
  },
}
</script>

<style></style>
