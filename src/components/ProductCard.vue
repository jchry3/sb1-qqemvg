<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import type { Product } from '../types';

const props = defineProps<{
  product: Product;
}>();

const router = useRouter();
const cart = useCartStore();

const addToCart = () => {
  cart.addToCart(props.product);
  router.push('/cart');
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover" />
    <div class="p-4">
      <span class="text-sm text-blue-600 font-medium">{{ product.category }}</span>
      <h3 class="text-lg font-semibold text-gray-900 mt-1">{{ product.name }}</h3>
      <p class="text-gray-600 text-sm mt-2">{{ product.description }}</p>
      <div class="mt-4 flex items-center justify-between">
        <span class="text-xl font-bold text-gray-900">${{ product.price.toFixed(2) }}</span>
        <button 
          @click="addToCart"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>