<script setup lang="ts">
import LayoutAside from './LayoutAside.vue';
import LayoutHeader from './LayoutHeader.vue'
</script>

<template>
  <el-container style="height: 100vh">
    <el-aside width="200px">
      <LayoutAside />
    </el-aside>
    <el-container>
      <el-header height="96">
        <LayoutHeader/>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>
