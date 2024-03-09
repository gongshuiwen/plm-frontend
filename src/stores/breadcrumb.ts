import { ref} from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

export const useBreadcrumbStore = defineStore('breadcrumb', () => {
  const items = ref<string[]>(['首页'])

  function refresh() {
    const initItems: string[] = []
    router.currentRoute.value.matched.forEach((route) => {
      if (route.meta.title) {
        initItems.push(route.meta.title as string)
      }
    })
    items.value = initItems
  }

  return { items, refresh}
})
