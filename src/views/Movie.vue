<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { Icon } from "@iconify/vue"
import getImage from "../lib/getImage"
const router = useRouter()
const movieId = router.currentRoute.value.params.id
const movie = ref(null)

movie.value = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=0b51a1ebc294f6b1df34c2a0c0406362&language=en-US`)
    .then(res => res.json())

const {
    title,
    overview,
    backdrop_path: background,
    poster_path: poster,
    release_date,
    vote_average: vote,
    popularity,
    runtime
} = movie.value
const movieDuration = Math.round(runtime / 60);

</script>

<template>
    <div class="min-h-screen w-full bg-cover bg-center bg-no-repeat relative" :style="{
        backgroundImage: 'url(' + getImage(background) + ')'
    }">
        <!-- Overlay untuk readability -->
        <div class="absolute inset-0 bg-black bg-opacity-60"></div>

        <!-- Back Button -->
        <RouterLink to="/" class="absolute top-4 left-4 z-10 px-4 py-2 bg-black bg-opacity-50 text-white rounded-lg hover:bg-opacity-70 transition-all duration-300 flex items-center gap-2 animate-bounce-in">
            <Icon icon="mdi:arrow-left" />
            Back to Home
        </RouterLink>

        <!-- Main Content -->
        <div class="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 lg:p-8 animate-fade-in-up">
            <!-- Poster -->
            <div class="flex-shrink-0 mb-6 lg:mb-0 lg:mr-8">
                <img class="w-64 lg:w-80 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300" :src="getImage(poster)" alt="Poster" />
            </div>

            <!-- Details -->
            <div class="bg-black bg-opacity-70 backdrop-blur-sm rounded-xl p-6 lg:p-8 max-w-2xl w-full text-white shadow-2xl">
                <h1 class="text-3xl lg:text-5xl font-bold mb-4 text-white">{{ title }}</h1>
                <p class="text-gray-300 text-base lg:text-lg leading-relaxed mb-6">{{ overview }}</p>

                <!-- Info Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div class="flex items-center gap-3">
                        <Icon icon="uiw:date" class="text-blue-400" />
                        <span class="text-gray-300">{{ release_date }}</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <Icon icon="ic:round-star" class="text-yellow-400" />
                        <span class="text-gray-300">{{ Math.round(vote) }}/10</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <Icon icon="ion:people" class="text-green-400" />
                        <span class="text-gray-300">{{ Math.round(popularity) }} views</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <Icon icon="ic:twotone-access-time-filled" class="text-purple-400" />
                        <span class="text-gray-300">{{ movieDuration }}h / {{ runtime }} minutes</span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-4">
                    <button class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2">
                        <Icon icon="mdi:play" />
                        Watch Now
                    </button>
                    <button class="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2">
                        <Icon icon="mdi:heart-outline" />
                        Favorite
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounceIn {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.animate-bounce-in {
  animation: bounceIn 0.6s ease-out;
}
</style>

