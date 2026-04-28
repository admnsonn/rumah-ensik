<script setup>
import { RouterView } from "vue-router"
import Navbar from "./components/Navbar.vue"
</script>

<template>
  <div class="main min-h-screen bg-black pt-20">
    <Navbar />
    <div class="animate-fade-in">
      <Suspense>
        <RouterView />
      </Suspense>
    </div>
  </div>
</template>

<style>
.main{
  background-color: black;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
</style>