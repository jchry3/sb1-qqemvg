<script setup lang="ts">
import { ref } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import ServiceCard from '../components/ServiceCard.vue';
import { products } from '../data/products';
import { services } from '../data/services';

const activeTab = ref('products');
</script>

<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-semibold text-gray-900">Welcome to our Delivery Platform</h2>
        <p class="mt-4 text-gray-600">
          Search for delivery services, products, or professional services using the search bar above.
        </p>
      </div>

      <!-- Tab Navigation -->
      <div class="border-b border-gray-200 mb-8">
        <nav class="-mb-px flex justify-center space-x-8">
          <button
            @click="activeTab = 'products'"
            :class="[
              activeTab === 'products'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            Products
          </button>
          <button
            @click="activeTab = 'services'"
            :class="[
              activeTab === 'services'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            Services
          </button>
        </nav>
      </div>

      <!-- Products Grid -->
      <div v-if="activeTab === 'products'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>

      <!-- Services Grid -->
      <div v-if="activeTab === 'services'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServiceCard
          v-for="service in services"
          :key="service.id"
          :service="service"
        />
      </div>
    </div>
  </div>
</template>