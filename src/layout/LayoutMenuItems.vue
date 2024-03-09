<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import type { RouteRecordRaw } from "vue-router";
import LayoutSubMenu from './LayoutSubMenu.vue';

defineProps<{
  menuItems?: RouteRecordRaw[]
}>()
</script>

<template>
  <template v-for="menuItem in menuItems" :key="menuItem.path">
    <el-menu-item 
      v-if="menuItem.meta?.isMenu && (!menuItem.children || menuItem.children?.filter(item => item.meta?.isMenu).length === 0)"
      :index="menuItem.path" :route="menuItem">
      <template #title>
        <el-icon>
          <Icon :icon="menuItem.meta?.icon || ''" />
        </el-icon>
        <span>{{ menuItem.meta.title }}</span>
      </template>
    </el-menu-item>
    <LayoutSubMenu v-else-if="menuItem.meta?.isMenu && menuItem.children" :menu-item="menuItem" />
  </template>
</template>
