import type { RouteRecordRaw } from 'vue-router'
import LayoutView from '@/layout/LayoutView.vue'

export default {
  path: '/',
  name: 'root',
  redirect: '/home',
  component: LayoutView,
  meta: {
    icon: 'ep:home-filled',
    title: '首页',
    requiresAuth: true,
    isMenu: true
  },
  children: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
} as RouteRecordRaw
