<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-md border-b border-gray-800 shadow-lg animate-slide-down">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
          <img src="../assets/logo.png" width="36" height="36" alt="Logo" class="animate-pulse">
          <span class="text-xl font-bold text-white hidden sm:block">Rumah Ensik</span>
        </RouterLink>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <!-- <RouterLink
            to="/"
            class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 relative group"
            active-class="text-white"
            exact
          >
            Home
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </RouterLink> -->
          <RouterLink
            to="/movies"
            class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 relative group"
            active-class="text-white"
          >
            Movies
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </RouterLink>
          <RouterLink
            to="/series"
            class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 relative group"
            active-class="text-white"
          >
            TV Series
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </RouterLink>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMenu"
            class="text-gray-300 hover:text-white p-2 rounded-md transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <Icon
              :icon="isMenuOpen ? 'mdi:close' : 'mdi:menu'"
              width="24"
              height="24"
            />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="isMenuOpen"
        class="md:hidden border-t border-gray-800 animate-fade-in"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <RouterLink
            to="/"
            @click="isMenuOpen = false"
            class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
            active-class="text-white bg-gray-800"
            exact
          >
            Home
          </RouterLink>
          <RouterLink
            to="/movies"
            @click="isMenuOpen = false"
            class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
            active-class="text-white bg-gray-800"
          >
            Movies
          </RouterLink>
          <RouterLink
            to="/series"
            @click="isMenuOpen = false"
            class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
            active-class="text-white bg-gray-800"
          >
            TV Series
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@keyframes slideDown {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slide-down {
  animation: slideDown 0.6s ease-out;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
</style>