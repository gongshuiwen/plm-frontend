import type { RouteRecordRaw } from 'vue-router'
import LayoutView from '@/layout/LayoutView.vue'

export default {
  path: '/submenu',
  redirect: '/submenu/submenu1',
  name: 'submenu',
  component: LayoutView,
  meta: {
    icon: 'ep:menu',
    title: '多级菜单',
    requiresAuth: true,
    isMenu: true
  },
  children: [
    {
      path: '/submenu/submenu1',
      name: 'submenu1',
      component: {
        template: '<div>多级菜单1</div>'
      },
      meta: {
        title: '多级菜单1',
        requiresAuth: true,
        isMenu: true
      }
    },
    {
      path: '/submenu/submenu2',
      name: 'submenu2',
      meta: {
        title: '多级菜单2',
        requiresAuth: true,
        isMenu: true
      },
      children: [
        {
          path: '/submenu/submenu2/submenu1',
          name: 'submenu2-1',
          component: {
            template: '<div>多级菜单2-1</div>'
          },
          meta: {
            title: '多级菜单2-1',
            requiresAuth: true,
            isMenu: true
          }
        },
        {
          path: '/submenu/submenu2/submenu2',
          name: 'submenu2-2',
          component: {
            template: '<div>多级菜单2-2</div>'
          },
          meta: {
            title: '多级菜单2-2',
            requiresAuth: true,
            isMenu: true
          }
        }
      ]
    }
  ]
} as RouteRecordRaw
