<script lang="ts" setup>
defineProps(['menuItem'])
</script>

<template>
  <el-sub-menu :index="menuItem.path">
    <template #title>
      <span>{{ menuItem.meta.title }}</span>
    </template>

    <template v-for="childMenuItem in menuItem.children" :key="childMenuItem.path">
      <el-menu-item v-if="!childMenuItem.children" :index="childMenuItem.path">
        <template #title>{{ childMenuItem.meta.title }}</template>
      </el-menu-item>
      <LayoutSubMenu v-else :menu-item="childMenuItem" />
    </template>
  </el-sub-menu>
</template>
