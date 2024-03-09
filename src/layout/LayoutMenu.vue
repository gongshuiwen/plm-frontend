<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import LayoutMenuItems from './LayoutMenuItems.vue'
import { useRoutesStore } from '@/stores/routes'
import { refreshRoutes } from '@/router'

const routesStore = useRoutesStore()

onBeforeMount(() => {
  refreshRoutes()
})
</script>

<template>
  <el-scrollbar>
    <el-menu :router="true">
      <LayoutMenuItems :menu-items="routesStore.routes"/>
    </el-menu>
  </el-scrollbar>
</template>
