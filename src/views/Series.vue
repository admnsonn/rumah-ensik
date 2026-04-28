<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import getImage from "../lib/getImage";
const router = useRouter();
const seriesId = router.currentRoute.value.params.id;
const series = ref(null);

series.value = await fetch(
  `https://api.themoviedb.org/3/tv/${seriesId}?api_key=0b51a1ebc294f6b1df34c2a0c0406362&language=en-US`,
).then((res) => res.json());

const {
  original_name,
  overview,
  backdrop_path: background,
  poster_path: poster,
  release_date,
  vote_average: vote,
  popularity,
  runtime,
} = series.value;
const seriesDuration = Math.round(runtime / 60);

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div
    class="h-screen w-screen grayscale-0"
    :style="{
      backgroundImage: 'url(' + getImage(background) + ')',
    }"
  >
    <div class="w-full h-full bg-gradient-to-r from-black to-transparent">
      <div class="pt-20 w-full h-full grid grid-cols-2 items-center">
        <img class="w-[400px] mx-auto rounded-lg" :src="getImage(poster)" />
        <div>
          <h1 class="text-4xl font-semibold text-neutral-300 mb-4">
            {{ original_name }}
          </h1>
          <p class="text-sm text-neutral-300 w-2/3">{{ overview }}</p>
          <div class="flex flex-col text-sm gap-2 mt-3">
            <div class="flex items-center gap-2">
              <Icon icon="uiw:date" color="white" />
              <span class="text-neutral-300">{{ release_date }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="ic:round-star" color="white" />
              <span class="text-neutral-300">{{ Math.round(vote) }}/10</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="ion:people" color="white" />
              <span class="text-neutral-300">{{ popularity }} </span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="ic:twotone-access-time-filled" color="white" />
              <span class="text-neutral-300"
                >{{ seriesDuration }}h / {{ runtime }} minutes</span
              >
            </div>
          </div>
          <button
            @click="goBack"
            class="mt-4 px-4 py-2 rounded-md bg-blue-900 text-white hover:bg-blue-900"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
