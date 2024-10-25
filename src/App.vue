<script setup lang="ts">
import { RouterView } from 'vue-router';
import SearchBar from './components/SearchBar.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Delivery Platform</h1>
      </div>
    </header>
    <main>
      <SearchBar />
      <RouterView />
    </main>
  </div>
</template>