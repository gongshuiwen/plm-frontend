import type { RouteRecordRaw } from 'vue-router'
import LayoutView from '@/layout/LayoutView.vue'

export default {
  path: '/system',
  redirect: '/system/user',
  name: 'system',
  component: LayoutView,
  meta: {
    icon: 'ep:menu',
    title: '系统管理',
    requiresAuth: true,
    isMenu: true
  },
  children: [
    {
      path: '/system/user',
      name: 'user',
      component: () => import('@/views/user/ListView.vue'),
      meta: {
        icon: 'ep:user-filled',
        title: '用户管理',
        requiresAuth: true,
        isMenu: true
      }
    }
  ]
} as RouteRecordRaw
