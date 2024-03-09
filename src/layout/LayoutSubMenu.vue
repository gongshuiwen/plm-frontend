<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import type { RouteRecordRaw } from "vue-router";
import LayoutMenuItems from './LayoutMenuItems.vue';

defineProps<{
  menuItem: RouteRecordRaw
}>()
</script>

<template>
  <el-sub-menu :index="menuItem.path">
    <template #title>
      <el-icon>
        <Icon :icon="menuItem.meta?.icon || ''" />
      </el-icon>
      <span>{{ menuItem.meta?.title }}</span>
    </template>
    <LayoutMenuItems :menu-items="menuItem.children"/>
  </el-sub-menu>
</template>
