<script setup>
import Recomcard from "./Recomcard.vue"
const {recom} = defineProps({
    recom: Array
})
</script>

<template>
    <div class="grid grid-cols-4 gap-4 mx-20 my-10">
        <Recomcard
        v-for="rekom in recom"
        :key="Math.random() * 10000"
        :rekom="rekom" />
    </div>
</template>