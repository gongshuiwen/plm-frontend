<script lang="ts" setup>
import LayoutMenuItems from './LayoutMenuItems.vue'
import { useRoutesStore } from '@/stores/routes'

const routesStore = useRoutesStore()
</script>

<template>
  <el-scrollbar>
    <el-menu :router="true" style="border-right: 0px;">
      <LayoutMenuItems :menu-items="routesStore.routes"/>
    </el-menu>
  </el-scrollbar>
</template>
