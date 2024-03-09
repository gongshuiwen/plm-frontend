import 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useRoutesStore } from '@/stores/routes'
import { useUserStore } from '@/stores/user'
import LayoutView from '@/layout/LayoutView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    isMenu?: boolean
    icon?: string
    requiresAuth?: boolean
    isDynamic?: boolean
  }
}

export const staicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      requireAuth: true,
      isMenu: false
    }
  },
  {
    path: '/',
    name: 'root',
    redirect: '/home',
    component: LayoutView,
    meta: {
      icon: 'ep:home-filled',
      title: '首页',
      requireAuth: true,
      isMenu: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: {
          template: '<div>首页</div>'
        },
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/submenu',
    redirect: '/submenu/submenu1',
    name: 'submenu',
    component: LayoutView,
    meta: {
      icon: 'ep:menu',
      title: '多级菜单',
      requireAuth: true,
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
          requireAuth: true,
          isMenu: true
        }
      },
      {
        path: '/submenu/submenu2',
        name: 'submenu2',
        meta: {
          title: '多级菜单2',
          requireAuth: true,
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
              requireAuth: true,
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
              requireAuth: true,
              isMenu: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/about',
    component: LayoutView,
    meta: {
      icon: 'ep:info-filled',
      title: '关于',
      requireAuth: true,
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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: staicRoutes
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.beforeEach((to, from) => {
  const token = useUserStore().token
  if (to.meta.requiresAuth && !token) {
    return { name: 'login' }
  }
  return true
})

export function refreshRoutes () {
    // TODO: Get dynamic routes by api
  const dynamicRoutes: RouteRecordRaw[] = []
  console.log(router.getRoutes())    

  // remove old dynamic routes
  router.getRoutes().forEach((route) => {
    if (route.meta.isDynamic) {
      router.removeRoute(route.name as string)
    }
  })

  // Add new dynamic routes
  for (const route of dynamicRoutes) {
    router.addRoute(route)
  }

  // set routes store
  useRoutesStore().setRoutes([...staicRoutes, ...dynamicRoutes])
}

export default router
