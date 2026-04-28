<script setup>
import getImage from '../lib/getImage';
import { Icon } from '@iconify/vue';
import { RouterLink } from "vue-router"
const { series } = defineProps(["series"])
import Swal from 'sweetalert2';
const {
    id,
    original_name,
    overview,
    backdrop_path: background,
    poster_path: poster,
    release_date,
    vote_average: vote,
    original_language: language
} = series

const addToWatchlist = () => {
    Swal.fire({
        title: `Ditambahkan ke Watchlist`,
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
    });
    console.log(`Added ${original_name} to the watchlist`);
}

const openDeletePopup = () => {
    Swal.fire({
        title: `Apakah kamu ingin menghapus ${original_name} dari watchlist?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            confirmDelete();
        }
    });
}

const confirmDelete = () => {
    console.log(`Deleted ${original_name} from the watchlist`);
    showDeletePopup.value = false;
}
console.log(series)
const description = overview.length <= 60 ? overview : overview.slice(0, 60)
</script>

<template>
    <RouterLink :to="`/series/${id}`">
        <div class="w-full h-full bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
            <div class="relative group w-full h-64 lg:h-80">
                <img :src="getImage(poster)"
                    class="w-full h-full object-cover transition-all duration-500 group-hover:blur-sm cursor-pointer" />
                <div
                    class="group-hover:opacity-100 transition-opacity duration-300 opacity-0 absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <button class="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 hover:bg-opacity-30 transition-all duration-300">
                        <Icon icon="ic:round-play-arrow" width="40" class="text-white" />
                    </button>
                </div>
                <div class="absolute top-3 right-3 px-2 py-1 bg-yellow-500 rounded-full shadow-md">
                    <p class="flex items-center gap-1 text-sm font-semibold text-black">
                        <span>{{ Math.round(vote * 10) / 10 }}</span>
                        <Icon icon="material-symbols:star-rounded" />
                    </p>
                </div>
                <div class="absolute top-3 left-3 flex gap-2">
                    <button @click.stop="addToWatchlist" class="bg-green-500 hover:bg-green-600 p-2 rounded-full shadow-md transition-colors duration-300">
                        <Icon icon="mdi:playlist-plus" class="text-white" />
                    </button>
                    <button @click.stop="openDeletePopup" class="bg-red-500 hover:bg-red-600 p-2 rounded-full shadow-md transition-colors duration-300">
                        <Icon icon="mdi:playlist-remove" class="text-white" />
                    </button>
                </div>
            </div>
            <div class="p-4">
                <h1 class="text-lg font-semibold text-white mb-2 line-clamp-2">{{ original_name }}</h1>
                <p class="text-gray-400 text-sm line-clamp-3">{{ description }}</p>
            </div>
        </div>
    </RouterLink>
    <div v-if="showDeletePopup" class="popup-container">
        <div class="popup-content">
            <p>Are you sure you want to remove {{ original_name }} from the watchlist?</p>
            <button @click="confirmDelete" class="bg-red-500 text-white px-2 py-1 rounded-md">Confirm</button>
            <button @click="showDeletePopup = false" class="bg-gray-500 text-white px-2 py-1 rounded-md">Cancel</button>
        </div>
    </div>
</template>