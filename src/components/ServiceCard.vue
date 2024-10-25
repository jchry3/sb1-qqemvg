<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Service } from '../types';

const props = defineProps<{
  service: Service;
}>();

const router = useRouter();

const bookNow = () => {
  router.push(`/booking/${props.service.id}`);
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img :src="service.image" :alt="service.name" class="w-full h-48 object-cover" />
    <div class="p-4">
      <span class="text-sm text-green-600 font-medium">{{ service.category }}</span>
      <h3 class="text-lg font-semibold text-gray-900 mt-1">{{ service.name }}</h3>
      <p class="text-gray-600 text-sm mt-2">{{ service.description }}</p>
      <p class="text-sm text-gray-500 mt-2">Availability: {{ service.availability }}</p>
      <div class="mt-4 flex items-center justify-between">
        <span class="text-xl font-bold text-gray-900">From ${{ service.basePrice.toFixed(2) }}</span>
        <button 
          @click="bookNow"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Book Now
        </button>
      </div>
    </div>
  </div>
</template>