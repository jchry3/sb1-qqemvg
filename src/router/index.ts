import { createRouter, createWebHistory } from 'vue-router';
import DeliveryForm from '../components/DeliveryForm.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/delivery',
      component: DeliveryForm
    },
    {
      path: '/search',
      component: () => import('../views/SearchResults.vue')
    },
    {
      path: '/cart',
      component: () => import('../views/CartPage.vue')
    },
    {
      path: '/booking/:serviceId',
      component: () => import('../views/BookingPage.vue')
    }
  ]
});

export default router;