<script setup lang="ts">
import { ref } from 'vue';

interface DeliveryFormData {
  startingPoint: string;
  destination: string;
  deliveryType: string;
  weight: number;
}

const formData = ref<DeliveryFormData>({
  startingPoint: '',
  destination: '',
  deliveryType: 'standard',
  weight: 0
});

const deliveryTypes = [
  { id: 'standard', name: 'Standard Delivery', multiplier: 1 },
  { id: 'express', name: 'Express Delivery', multiplier: 1.5 },
  { id: 'same-day', name: 'Same Day Delivery', multiplier: 2 }
];

const baseRate = 10; // Base delivery rate in dollars
const pricePerKm = 0.5; // Additional price per km
const weightMultiplier = 0.1; // Additional price per kg

const calculateCost = () => {
  // This is a simplified calculation. In a real app, you'd use APIs for distance calculation
  const selectedType = deliveryTypes.find(type => type.id === formData.value.deliveryType);
  const basePrice = baseRate + (formData.value.weight * weightMultiplier);
  return basePrice * (selectedType?.multiplier || 1);
};

const estimatedCost = ref(0);

const handleSubmit = () => {
  estimatedCost.value = calculateCost();
};
</script>

<template>
  <div class="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-6">Delivery Request Form</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">Starting Point</label>
        <input
          v-model="formData.startingPoint"
          type="text"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Destination</label>
        <input
          v-model="formData.destination"
          type="text"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Delivery Type</label>
        <select
          v-model="formData.deliveryType"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option v-for="type in deliveryTypes" :key="type.id" :value="type.id">
            {{ type.name }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Parcel Weight (kg)</label>
        <input
          v-model.number="formData.weight"
          type="number"
          min="0"
          step="0.1"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Calculate Cost
      </button>
    </form>

    <div v-if="estimatedCost > 0" class="mt-6 p-4 bg-blue-50 rounded-md">
      <h3 class="text-lg font-medium text-blue-900">Estimated Delivery Cost</h3>
      <p class="mt-2 text-3xl font-bold text-blue-600">${{ estimatedCost.toFixed(2) }}</p>
    </div>
  </div>
</template>