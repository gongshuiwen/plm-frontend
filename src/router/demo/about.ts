import type { RouteRecordRaw } from 'vue-router'
import LayoutView from '@/layout/LayoutView.vue'

export default {
  path: '/about',
  component: LayoutView,
  meta: {
    icon: 'ep:info-filled',
    title: '关于',
    requiresAuth: true,
    isMenu: true
  },
  children: [
    {
      path: '',
      name: 'about',
      component: {
        template: '<div>关于</div>'
      }
    }
  ]
} as RouteRecordRaw
