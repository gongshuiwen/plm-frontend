<script lang="ts" setup>
import { Icon } from '@iconify/vue';
defineProps(['menuItem'])
</script>

<template>
  <el-sub-menu :index="menuItem.path">
    <template #title>
      <el-icon>
        <Icon :icon="menuItem.meta.icon" />
      </el-icon>
      <span>{{ menuItem.meta.title }}</span>
    </template>

    <template v-for="childMenuItem in menuItem.children" :key="childMenuItem.path">
      <el-menu-item v-if="!childMenuItem.children" :index="childMenuItem.path" :route="childMenuItem">
        <template #title>
          <el-icon>
            <Icon :icon="childMenuItem.meta.icon" />
          </el-icon>
          <span>{{ childMenuItem.meta.title }}</span>
        </template>
      </el-menu-item>
      <LayoutSubMenu v-else :menu-item="childMenuItem" />
    </template>
  </el-sub-menu>
</template>
