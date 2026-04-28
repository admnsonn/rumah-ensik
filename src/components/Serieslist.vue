<script setup>
import Seriescard from "./Seriescard.vue"
const {serial} = defineProps({
    serial: Array
})
</script>

<template>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4 lg:px-8">
        <Seriescard
        v-for="(series, index) in serial"
        :key="series.id"
        :series="series"
        :style="{ animationDelay: `${index * 0.1}s` }"
        class="animate-fade-in" />
    </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}
</style>