<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = useRouter();

const paths = ref(['home', 'home-1', 'home-1-1']);
const avatarUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
const userName = ref('admin');

function onLogout() {
  useUserStore().clearToken();
  router.push({ path: "/login" });
}
</script>

<template>
  <el-row class="w-full h-12">
    <el-col :span="16" class="flex items-center">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="font-size" v-for="path in paths" :key="path">
          {{path}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="8" class="flex items-center justify-end">
      <el-dropdown trigger="click">
        <div class="h-12 p-2 flex items-center hover:bg-gray-100">
          <el-avatar :size="22" :src="avatarUrl" />
          <span class="ml-2 block" v-text="userName"></span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="onLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>