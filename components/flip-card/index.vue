<template>
  <div :class="layout ? 'px-4 flip-card' : 'hidden'">
    <div class="flip-card-inner">
      <div class="flip-card-front space-y-4 mt-4">
        <div class="overflow-hidden rounded-xl">
          <img
            class="h-full w-full object-fill"
            :src="`https:${data.stationImg}`"
            :alt="data.stationName"
          />
        </div>
        <div class="text-xl">{{ data.stationName }}</div>
        <div class="text-base">
          <div class="font-semibold">
            Жанр:
            <span
              class="mr-2"
              v-for="(genr, index) in data.stationGenres"
              :key="index"
              >{{ genr }}</span
            >
          </div>
        </div>
      </div>

      <div class="flip-card-back">
        {{ data.stationDescription }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlipCard',
  props: {
    layout: {
      type: Boolean,
      required: true,
      default: false,
    },
    data: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
}
</script>

<style>
/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  perspective: 1500px; /* Remove this if you don't want the 3D effect */
  @apply overflow-hidden w-80 md:w-96  h-full bg-transparent;
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  transform-style: preserve-3d;
}
.flip-card-front {
  @apply flex flex-col items-center;
}
/* Style the back side */
.flip-card-back {
  transform: rotateY(180deg);
}
</style>
