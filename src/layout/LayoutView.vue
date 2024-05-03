<script setup lang="ts">
import LayoutAside from './LayoutAside.vue';
import LayoutHeader from './LayoutHeader.vue'
</script>

<template>
  <el-container class="h-screen">
    <el-aside width="200px" class="border-r">
      <LayoutAside />
    </el-aside>
    <el-container class="h-full">
      <el-header height="48px" class="border-b">
        <LayoutHeader/>
      </el-header>
      <el-main class="h-full">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-main {
  --el-main-padding: 0
}
</style>
