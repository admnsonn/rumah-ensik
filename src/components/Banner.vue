<script setup>
import getImage from "../lib/getImage"
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';
const { banner } = defineProps(["banner"])
const {
    id,
    title,
    overview,
    backdrop_path: background,
} = banner
const description = overview.length <= 200 ? overview : overview.slice(0, 200)  
</script>

<template>
    <div class="w-screen h-screen relative overflow-hidden" :style="{
        backgroundImage: 'url(' + getImage(background) + ')',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
    }">
        <div class="absolute inset-0 bg-black bg-opacity-40"></div>
        <div
            class="text-white p-10 flex flex-col justify-center w-full h-full relative z-10 animate-slide-in-left">
            <h1 class="text-6xl lg:text-8xl font-bold mb-4 animate-bounce-in">{{ title }}</h1>
            <p class="mt-2 w-full lg:w-1/2 text-lg text-neutral-300 animate-fade-in-delay">{{ description }}</p>
            <RouterLink :to="`/movie/${id}`"
                class="flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 w-fit mt-6 transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold animate-pulse-on-hover">
                <span>View Details</span>
                <span>
                    <Icon icon="mingcute:right-fill" />
                </span>
            </RouterLink >
        </div>
    </div>
</template>

<style scoped>
@keyframes slideInLeft {
  from { transform: translateX(-100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes bounceIn {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes fadeInDelay {
  0% { opacity: 0; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

.animate-slide-in-left {
  animation: slideInLeft 1s ease-out;
}

.animate-bounce-in {
  animation: bounceIn 1.2s ease-out;
}

.animate-fade-in-delay {
  animation: fadeInDelay 1.5s ease-out;
}

.animate-pulse-on-hover:hover {
  animation: pulse 1s infinite;
}
</style>

