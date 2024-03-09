import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'

import router from '@/router'
import { staicRoutes } from '@/router'

export const useRoutesStore = defineStore('routes', () => {
  const routes = ref<RouteRecordRaw[]>(staicRoutes)

  function refreshRoutes() {
    // TODO: Get dynamic routes
    const dynamicRoutes: RouteRecordRaw[] = []

    // Remove all dynamic routes
    router.getRoutes().forEach((route) => {
      if (route.meta.dynamic) {
        router.removeRoute(route.name as string)
      }
    })

    // Add new dynamic routes
    for (const route of dynamicRoutes) {
      router.addRoute(route)
    }

    // Update routes store
    routes.value = [...staicRoutes, ...dynamicRoutes]
  }
  return { routes, refreshRoutes }
})
