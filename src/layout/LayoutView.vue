<script setup lang="ts">
import LayoutAside from './LayoutAside.vue';
import LayoutHeader from './LayoutHeader.vue'
</script>

<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" class="border-r">
      <LayoutAside />
    </el-aside>
    <el-container>
      <el-header height="48px">
        <LayoutHeader/>
      </el-header>
      <el-main class="border-t">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>
