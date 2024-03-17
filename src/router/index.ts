import 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRoutesStore } from '@/stores/routes'
import { useUserStore } from '@/stores/user'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    isMenu?: boolean
    icon?: string
    requiresAuth?: boolean
    isDynamic?: boolean
  }
}

const modules: Record<string, any> = import.meta.glob(
  [
    './modules/**/*.ts',
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

export function refreshRoutes () {
    // TODO: Get dynamic routes by api
  const dynamicRoutes: RouteRecordRaw[] = []

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
