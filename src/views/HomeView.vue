<script setup lang="ts">
import { useUserStore } from '@/stores/user';

function onLogout() {
  useUserStore().clearToken();
  window.location.href = "/login";
}
</script>

<template>
  <main>
    <route-link href="javascript:void(0);" @click="onLogout">退出登录</route-link>
  </main>
</template>
