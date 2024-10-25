<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { products } from '../data/products';
import { services } from '../data/services';

const searchQuery = ref('');
const router = useRouter();

const handleSearch = () => {
  const query = searchQuery.value.toLowerCase();
  if (query.includes('delivery')) {
    router.push('/delivery');
  } else {
    const searchParams = new URLSearchParams();
    searchParams.set('q', query);
    
    // Check if the search matches any product or service category
    const matchesProducts = products.some(p => 
      p.category.toLowerCase().includes(query) || 
      p.name.toLowerCase().includes(query)
    );
    const matchesServices = services.some(s => 
      s.category.toLowerCase().includes(query) || 
      s.name.toLowerCase().includes(query)
    );
    
    if (matchesProducts) {
      searchParams.set('type', 'products');
    } else if (matchesServices) {
      searchParams.set('type', 'services');
    }
    
    router.push(`/search?${searchParams.toString()}`);
  }
};
</script>

<template>
  <div class="max-w-2xl mx-auto mt-8">
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for delivery, products, or services..."
        class="w-full px-4 py-2 text-gray-900 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        @keyup.enter="handleSearch"
      />
      <button
        @click="handleSearch"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  </div>
</template>