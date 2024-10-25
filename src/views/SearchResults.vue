<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import ServiceCard from '../components/ServiceCard.vue';
import { products } from '../data/products';
import { services } from '../data/services';

const route = useRoute();
const searchQuery = ref('');
const searchType = ref('all');

onMounted(() => {
  searchQuery.value = route.query.q as string || '';
  searchType.value = route.query.type as string || 'all';
});

const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  );
});

const filteredServices = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return services.filter(service =>
    service.name.toLowerCase().includes(query) ||
    service.category.toLowerCase().includes(query) ||
    service.description.toLowerCase().includes(query)
  );
});
</script>

<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <h2 class="text-2xl font-semibold text-gray-900 mb-6">
        Search Results for "{{ searchQuery }}"
      </h2>

      <div v-if="searchType === 'all' || searchType === 'products'">
        <h3 class="text-xl font-medium text-gray-900 mb-4">Products</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>

      <div v-if="searchType === 'all' || searchType === 'services'">
        <h3 class="text-xl font-medium text-gray-900 mb-4">Services</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            v-for="service in filteredServices"
            :key="service.id"
            :service="service"
          />
        </div>
      </div>

      <div v-if="filteredProducts.length === 0 && filteredServices.length === 0" class="text-center py-8">
        <p class="text-gray-600">No results found for your search.</p>
      </div>
    </div>
  </div>
</template>