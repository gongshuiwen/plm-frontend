import type { RouteRecordRaw } from 'vue-router'

export default {
  path: '/login',
  name: 'login',
  component: () => import('@/views/LoginView.vue'),
  meta: {
    isMenu: false
  }
} as RouteRecordRaw
