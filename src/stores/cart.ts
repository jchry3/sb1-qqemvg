import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '../types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Array<{ product: Product; quantity: number }>>([])

  const total = computed(() => {
    return items.value.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity)
    }, 0)
  })

  function addToCart(product: Product) {
    const existingItem = items.value.find(item => item.product.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
  }

  function removeFromCart(productId: string) {
    const index = items.value.findIndex(item => item.product.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(productId: string, quantity: number) {
    const item = items.value.find(item => item.product.id === productId)
    if (item) {
      item.quantity = quantity
    }
  }

  return { items, total, addToCart, removeFromCart, updateQuantity }
})