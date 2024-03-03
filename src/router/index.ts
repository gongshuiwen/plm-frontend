import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars 
router.beforeEach((to, from) => {
  const token = useUserStore().token;
  if (to.meta.requireAuth && !token) {
    return { name: 'login'}
  }
  return true;
});

export default router
