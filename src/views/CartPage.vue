<script setup lang="ts">
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

const checkout = () => {
  // Implement checkout logic here
  alert('Checkout functionality will be implemented here')
}
</script>

<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 sm:px-0">
      <h2 class="text-2xl font-bold mb-6">Shopping Cart</h2>

      <div v-if="cart.items.length === 0" class="text-center py-12">
        <p class="text-gray-500">Your cart is empty</p>
        <button
          @click="router.push('/')"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>

      <div v-else class="space-y-4">
        <div v-for="item in cart.items" :key="item.product.id" 
          class="flex items-center justify-between p-4 bg-white rounded-lg shadow">
          <div class="flex items-center space-x-4">
            <img :src="item.product.image" :alt="item.product.name" 
              class="w-16 h-16 object-cover rounded-md" />
            <div>
              <h3 class="font-medium">{{ item.product.name }}</h3>
              <p class="text-gray-500">${{ item.product.price.toFixed(2) }}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <button
                @click="cart.updateQuantity(item.product.id, Math.max(0, item.quantity - 1))"
                class="px-2 py-1 bg-gray-100 rounded"
              >-</button>
              <span>{{ item.quantity }}</span>
              <button
                @click="cart.updateQuantity(item.product.id, item.quantity + 1)"
                class="px-2 py-1 bg-gray-100 rounded"
              >+</button>
            </div>
            <button
              @click="cart.removeFromCart(item.product.id)"
              class="text-red-600 hover:text-red-800"
            >Remove</button>
          </div>
        </div>

        <div class="mt-6 p-4 bg-white rounded-lg shadow">
          <div class="flex justify-between items-center mb-4">
            <span class="font-medium">Total:</span>
            <span class="text-xl font-bold">${{ cart.total.toFixed(2) }}</span>
          </div>
          <button
            @click="checkout"
            class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>