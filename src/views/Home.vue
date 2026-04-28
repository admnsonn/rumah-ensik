<template>
  <div class="home min-h-screen bg-black">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"
        ></div>
        <p class="text-white text-lg">Loading movies and TV series...</p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex items-center justify-center min-h-screen"
    >
      <div class="text-center max-w-md mx-auto px-4">
        <svg
          class="w-16 h-16 mx-auto mb-4 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
          ></path>
        </svg>
        <h2 class="text-white text-xl font-bold mb-2">
          Oops! Something went wrong
        </h2>
        <p class="text-gray-400 mb-6">{{ error }}</p>
        <button
          @click="retryLoad"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else>
      <AsyncBanner :banner="bannerFilm" />
      <div class="container mx-auto px-4 py-8">
        <div class="search-section animate-fade-in-up mb-12">
          <h2
            class="text-white text-3xl lg:text-4xl font-bold mb-6 text-center"
          >
            Search Movies & TV Series
          </h2>
          <div class="flex justify-center mb-8">
            <div class="relative w-full max-w-2xl lg:max-w-4xl">
              <input
                v-model="searchQuery"
                @input="search"
                id="searchInput"
                type="text"
                class="w-full h-14 pl-14 pr-12 rounded-full border-2 border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-lg"
                placeholder="Search for movies, TV series..."
              />
              <div
                class="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <!-- <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg> -->
              </div>
              <button
                v-if="searchQuery"
                @click="clearSearch"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Search Results -->
          <div
            v-if="
              searchQuery &&
              (searchResults.movies.length > 0 ||
                searchResults.series.length > 0)
            "
            class="mb-8"
          >
            <h3 class="text-white text-2xl font-semibold mb-4">
              Search Results for "{{ searchQuery }}"
            </h3>
            <Movielist
              v-if="searchResults.movies.length > 0"
              :film="searchResults.movies"
              class="animate-stagger"
            />
            <Serieslist
              v-if="searchResults.series.length > 0"
              :serial="searchResults.series"
              class="animate-stagger"
            />
          </div>

          <!-- No Results -->
          <div
            v-else-if="
              searchQuery &&
              searchResults.movies.length === 0 &&
              searchResults.series.length === 0
            "
            class="text-center text-gray-400 py-8"
          >
            <svg
              class="w-16 h-16 mx-auto mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <p class="text-lg">No results found for "{{ searchQuery }}"</p>
            <p class="text-sm mt-2">
              Try searching for a different movie or TV series
            </p>
          </div>
        </div>
      </div>
      <div class="popular-section">
        <h2
          class="text-white text-3xl lg:text-4xl font-bold mb-6 text-center lg:text-left animate-slide-in-right"
        >
          Popular Movies
        </h2>
        <Movielist :film="film" class="animate-stagger" />
        <h2
          class="text-white text-3xl lg:text-4xl font-bold mb-6 mt-12 text-center lg:text-left animate-slide-in-right"
        >
          Popular TV Series
        </h2>
        <Serieslist :serial="serial" class="animate-stagger" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, defineAsyncComponent } from "vue";
import Movielist from "../components/Movielist.vue";
import Serieslist from "../components/Serieslist.vue";
import Recomlist from "../components/Recomlist.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const film = ref([]);
const serial = ref([]);
const recom = ref([]);
const searchQuery = ref("");
const searchResults = ref({ movies: [], series: [] });
const recomId = router.currentRoute.value.params.id;
const bannerFilm = ref(null);
const isLoading = ref(true);
const error = ref(null);
const AsyncBanner = defineAsyncComponent(() => {
  return import("../components/Banner.vue");
});

const getMovies = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=0b51a1ebc294f6b1df34c2a0c0406362&language=en-US",
    );
    if (!response.ok) throw new Error("Failed to fetch movies");
    film.value = await response.json().then((res) => res.results);
  } catch (err) {
    error.value = err.message;
    console.error("Error fetching movies:", err);
  }
};

const getTVSeries = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=0b51a1ebc294f6b1df34c2a0c0406362&language=en-US",
    );
    if (!response.ok) throw new Error("Failed to fetch TV series");
    serial.value = await response.json().then((res) => res.results);
  } catch (err) {
    error.value = err.message;
    console.error("Error fetching TV series:", err);
  }
};

const getRecomended = async () => {
  recom.value = await fetch(
    `https://api.themoviedb.org/3/movie/${recomId}/recommendations?api_key=0b51a1ebc294f6b1df34c2a0c0406362&language=en-US`,
  )
    .then((res) => res.json())
    .then((res) => res.results);
};

const search = async () => {
  if (searchQuery.value.trim() === "") {
    searchResults.value = { movies: [], series: [] };
    return;
  }

  const searchMovies = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=0b51a1ebc294f6b1df34c2a0c0406362&language=en-US&query=${searchQuery.value}`,
  )
    .then((res) => res.json())
    .then((res) => res.results);

  const searchSeries = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=0b51a1ebc294f6b1df34c2a0c0406362&language=en-US&query=${searchQuery.value}`,
  )
    .then((res) => res.json())
    .then((res) => res.results);

  searchResults.value = { movies: searchMovies, series: searchSeries };
};

const clearSearch = () => {
  searchQuery.value = "";
  searchResults.value = { movies: [], series: [] };
};

const retryLoad = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    await getMovies();
    await getTVSeries();
    if (recomId) await getRecomended();
    // Get banner film
    if (film.value.length > 0) {
      bannerFilm.value =
        film.value[Math.floor(Math.random() * film.value.length)];
    }
  } catch (err) {
    error.value = "Failed to load content. Please refresh the page.";
    console.error("Error loading content:", err);
  } finally {
    isLoading.value = false;
  }
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

onBeforeMount(async () => {
  isLoading.value = true;
  error.value = null;

  try {
    await Promise.all([getMovies(), getTVSeries()]);

    if (film.value.length > 0) {
      bannerFilm.value = film.value[getRandomInt(0, film.value.length - 1)];
    }
  } catch (err) {
    error.value = "Failed to load data. Please refresh the page.";
    console.error("Error loading data:", err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.home {
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes stagger {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out;
}

.animate-stagger > * {
  animation: stagger 0.6s ease-out;
}

.animate-stagger > *:nth-child(1) {
  animation-delay: 0.1s;
}
.animate-stagger > *:nth-child(2) {
  animation-delay: 0.2s;
}
.animate-stagger > *:nth-child(3) {
  animation-delay: 0.3s;
}
.animate-stagger > *:nth-child(4) {
  animation-delay: 0.4s;
}
.animate-stagger > *:nth-child(5) {
  animation-delay: 0.5s;
}
.animate-stagger > *:nth-child(6) {
  animation-delay: 0.6s;
}
.animate-stagger > *:nth-child(7) {
  animation-delay: 0.7s;
}
.animate-stagger > *:nth-child(8) {
  animation-delay: 0.8s;
}

.animate-pulse-on-focus:focus {
  animation: pulse 1s infinite;
}
</style>
