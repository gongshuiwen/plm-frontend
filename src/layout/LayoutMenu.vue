<script lang="ts" setup>
import LayoutMenuItems from './LayoutMenuItems.vue'
import { useRoutesStore } from '@/stores/routes'
import { refreshRoutes } from '@/router'

const routesStore = useRoutesStore()

refreshRoutes()
</script>

<template>
  <el-scrollbar>
    <el-menu :router="true" style="border-right: 0px;">
      <LayoutMenuItems :menu-items="routesStore.routes"/>
    </el-menu>
  </el-scrollbar>
</template>
