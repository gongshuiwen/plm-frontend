<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { useLocaleStore } from '@/stores/locale'

const localeStore = useLocaleStore()

const locale = computed(() => (localeStore.locale === 'zh-CN' ? zhCn : en))
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>