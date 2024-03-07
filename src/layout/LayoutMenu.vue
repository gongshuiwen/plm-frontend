<script lang="ts" setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import LayoutSubMenu from './LayoutSubMenu.vue';

const menus = ref([
  {
    path: '/home',
    meta: {
      icon: 'ep:home-filled',
      title: 'home',
    },
    children: [
      {
        path: '/home/1',
        meta: {
          icon: 'ep:select',
          title: 'home-1',
        },
        children: [
          {
            path: '/home/1/1',
            meta: {
              icon: 'ep:coffee-cup',
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
      icon: 'ep:info-filled',
      title: '关于',
    },
  },
]);
</script>

<template>
  <el-scrollbar>
    <el-menu>
      <template v-for="menuItem in menus" :key="menuItem.path">
        <el-menu-item v-if="!menuItem.children" :index="menuItem.path" :route="menuItem">
          <template #title>
            <el-icon>
              <Icon :icon="menuItem.meta.icon" />
            </el-icon>
            <span>{{ menuItem.meta.title }}</span>
          </template>
        </el-menu-item>
        <LayoutSubMenu v-else :menu-item="menuItem" />
      </template>
    </el-menu>
  </el-scrollbar>
</template>
