<script lang="ts" setup>
import LayoutMenu from './LayoutMenu.vue'
</script>

<template>
  <a href="/home" class="w-full h-12 flex justify-center items-center">
    <h1 class="inline-block font-bold text-center text-xl">MyAdmin</h1>
  </a>
  <div style="height: cacl(100% - 50px)">
    <LayoutMenu />
  </div>
</template>

<style></style>
