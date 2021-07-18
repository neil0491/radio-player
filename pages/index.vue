<template>
  <div>
    <h1
      class="
        text-center text-xl
        uppercase
        py-4
        text-primary
        bg-inverse
        font-bold
        mb-4
      "
    >
      Радио Стран СНГ
    </h1>

    <div class="container mx-auto px-4">
      <div class="flex flex-wrap">
        <div
          class="w-full p-2 sm:w-1/2 md:w-4/12 lg:w-3/12"
          v-for="country in $store.state.countries.countriesData"
          :key="country.id"
        >
          <nuxt-link to="/country">
            <div
              @click="handelCountry(country)"
              class="
                flex flex-row
                sm:flex-col
                items-center
                p-4
                bg-inverse
                rounded-3xl
                shadow-card
              "
            >
              <div
                class="h-10 w-16 sm:w-auto sm:h-auto rounded-xl overflow-hidden"
              >
                <img
                  class="h-full w-full"
                  :src="require(`~/assets/img/${country.img}.jpg`)"
                  :alt="country.country"
                />
              </div>
              <h5 class="mx-4 text-xl">
                {{ country.country }}
              </h5>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations({
      SET_COUNTRY: 'countries/SET_COUNTRY',
      SET_COUNTRY_NAME: 'countries/SET_COUNTRY_NAME',
    }),
    handelCountry(country) {
      this.SET_COUNTRY(country.country_eng)
      this.SET_COUNTRY_NAME(country.country)
    },
  },
}
</script>

<style scoped>
.shadow-card {
  @apply shadow-md hover:shadow-xl;
}
</style>
