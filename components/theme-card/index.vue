<template>
  <div @click="handeleTheme" :class="theme">
    <div
      class="
        w-40
        h-60
        bg-primary
        flex flex-col
        ring-4 ring-gray-200
        rounded-xl
        cursor-pointer
      "
    >
      <div class="flex-shrink bg-inverse text-center rounded-t-2xl">
        Заголовок
      </div>
      <div class="flex-grow flex justify-center items-center">
        <div class="grid grid-cols-4 gap-2">
          <div
            class="w-5 h-5 bg-default rounded"
            v-for="(iten, index) in 20"
            :key="index"
          ></div>
        </div>
      </div>
      <div
        class="flex-shrink bg-inverse text-center rounded-b-2xl rounded-t-md"
      >
        Меню
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemeCard',
  props: {
    theme: {
      type: String,
      required: true,
      default: 'theme-elegant',
    },
  },
  methods: {
    handeleTheme() {
      this.$emit('chooseTheme', this.theme)
    },
  },
}
</script>

<style></style>
