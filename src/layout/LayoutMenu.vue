<script lang="ts" setup>
import { ref } from 'vue';
import LayoutSubMenu from './LayoutSubMenu.vue';

const menus = ref([
  {
    path: '/home',
    meta: {
      title: 'home',
    },
    children: [
      {
        path: '/home/1',
        meta: {
          title: 'home-1',
        },
        children: [
          {
            path: '/home/1/1',
            meta: {
              title: 'home-1-1',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/about',
    meta: {
      title: '关于',
    },
  },
]);
</script>

<template>
  <el-scrollbar>
    <el-menu>
      <template v-for="menuItem in menus" :key="menuItem.path">
        <el-menu-item v-if="!menuItem.children" :index="menuItem.path">
          <template #title>{{ menuItem.meta.title }}</template>
        </el-menu-item>
        <LayoutSubMenu v-else :menu-item="menuItem" />
      </template>
    </el-menu>
  </el-scrollbar>
</template>
