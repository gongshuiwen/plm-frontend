<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import LayoutMenuItems from './LayoutMenuItems.vue';
import { useRoutesStore } from '@/stores/routes';

const routesStore = useRoutesStore();

onBeforeMount(() => {
  routesStore.refreshRoutes();
})
</script>

<template>
  <el-scrollbar>
    <el-menu :router="true">
      <LayoutMenuItems :menu-items="routesStore.routes"/>
    </el-menu>
  </el-scrollbar>
</template>
