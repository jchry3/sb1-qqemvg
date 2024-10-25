<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Service, BookingSlot } from '../types'
import { services } from '../data/services'

const route = useRoute()
const router = useRouter()

const service = ref<Service | undefined>(
  services.find(s => s.id === route.params.serviceId)
)

const selectedDate = ref(new Date().toISOString().split('T')[0])
const selectedSlot = ref<string | null>(null)

// Mock available time slots
const timeSlots = ref<BookingSlot[]>([
  { id: '1', time: '09:00 AM', available: true },
  { id: '2', time: '10:00 AM', available: true },
  { id: '3', time: '11:00 AM', available: true },
  { id: '4', time: '02:00 PM', available: true },
  { id: '5', time: '03:00 PM', available: true },
  { id: '6', time: '04:00 PM', available: true },
])

const handleBooking = () => {
  if (!selectedSlot.value) {
    alert('Please select a time slot')
    return
  }
  
  // Implement booking logic here
  alert('Booking confirmed! We will contact you shortly.')
  router.push('/')
}
</script>

<template>
  <div class="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 sm:px-0">
      <div v-if="service" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-6">
          <div class="flex items-center mb-6">
            <img :src="service.image" :alt="service.name" 
              class="w-24 h-24 object-cover rounded-lg" />
            <div class="ml-4">
              <h2 class="text-2xl font-bold text-gray-900">{{ service.name }}</h2>
              <p class="text-gray-600">{{ service.category }}</p>
              <p class="text-lg font-semibold text-gray-900">
                Starting from ${{ service.basePrice.toFixed(2) }}
              </p>
            </div>
          </div>

          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Select Date</label>
              <input
                v-model="selectedDate"
                type="date"
                :min="new Date().toISOString().split('T')[0]"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
              <div class="grid grid-cols-3 gap-3">
                <button
                  v-for="slot in timeSlots"
                  :key="slot.id"
                  @click="selectedSlot = slot.id"
                  :class="[
                    'px-4 py-2 text-sm font-medium rounded-md',
                    selectedSlot === slot.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  ]"
                  :disabled="!slot.available"
                >
                  {{ slot.time }}
                </button>
              </div>
            </div>

            <div class="pt-4">
              <button
                @click="handleBooking"
                class="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12">
        <p class="text-gray-500">Service not found</p>
        <button
          @click="router.push('/')"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Return to Home
        </button>
      </div>
    </div>
  </div>
</template>