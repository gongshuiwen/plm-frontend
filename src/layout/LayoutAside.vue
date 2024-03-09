<script lang="ts" setup>
import LayoutMenu from './LayoutMenu.vue'
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
  <a href="javascript:void(0)"
    @click="router.push('/home')"
    class="w-full h-12 flex justify-center items-center">
    <h1 class="inline-block font-bold text-center text-xl">MyAdmin</h1>
  </a>
  <LayoutMenu style="height: calc(100% - 50px)"/>
</template>

<style></style>
