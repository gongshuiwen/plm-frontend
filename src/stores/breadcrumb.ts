import { ref} from 'vue'
import { defineStore } from 'pinia'

export const useBreadcrumbStore = defineStore('breadcrumb', () => {
  const items = ref<string[]>(['首页'])
  return { items }
})
