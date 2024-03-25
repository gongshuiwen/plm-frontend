import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLocaleStore = defineStore('locale', () => {
  const locale = ref("zh-CN")

  function setLocale(newLocale: string) {
    locale.value = newLocale
  }
  
  return { locale, setLocale }
})
