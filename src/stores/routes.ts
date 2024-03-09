import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'

export const useRoutesStore = defineStore('routes', () => {
  const routes = ref<RouteRecordRaw[]>([])

  function setRoutes(newRoutes: RouteRecordRaw[]) {
    routes.value = newRoutes
  }
  
  return { routes, setRoutes }
})
