import 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRoutesStore } from '@/stores/routes'
import { useUserStore } from '@/stores/user'
import type Menu from '@/entities/menu'
import menuClient from '@/clients/menuClient'
import LayoutView from '@/layout/LayoutView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    requiresAuth?: boolean
    isMenu?: boolean
    isDynamic?: boolean
  }
}

const modules: Record<string, any> = import.meta.glob(
  [
    './modules/**/*.ts'
    // './demo/**/*.ts' // for development use
  ],
  { eager: true }
)

const staicRoutes: RouteRecordRaw[] = []
Object.keys(modules).forEach((key) => {
  staicRoutes.push(modules[key].default)
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: staicRoutes
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !useUserStore().userId) {
    return { name: 'login' }
  }
  return true
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.afterEach((to, from) => {
  useBreadcrumbStore().refresh()
})

function convertMenuListToRouteList(menus: Menu[], isRoot: boolean = true): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  for (const menu of menus) {
    const meta = {
      title: menu.title,
      icon: menu.icon,
      requiresAuth: true,
      isMenu: true,
      isDynamic: true
    }

    if (isRoot || menu.component) {
      let component
      if (isRoot) {
        component = LayoutView
      } else {
        const componentName = '/src/views/' + menu.component + '.vue'
        component = () => import(componentName)
      }

      routes.push({
        path: menu.path || '',
        name: menu.name,
        component: component,
        meta: meta,
        children: convertMenuListToRouteList(menu.children || [], false)
      })
    } else if (menu.redirect) {
      routes.push({
        path: menu.path || '',
        name: menu.name,
        redirect: menu.redirect,
        meta: meta,
        children: convertMenuListToRouteList(menu.children || [], false)
      })
    }
  }
  return routes
}

export async function refreshRoutes() {
  const dynamicRoutes = convertMenuListToRouteList(await menuClient.tree())

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
