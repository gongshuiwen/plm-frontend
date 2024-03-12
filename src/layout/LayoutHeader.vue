<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useBreadcrumbStore } from '@/stores/breadcrumb'

const router = useRouter()
const userStore = useUserStore()
const breadcrumbStore = useBreadcrumbStore()

function onLogout() {
  userStore.logout()
  router.push({ path: '/login' })
}

onBeforeMount(() => {
  userStore.refreshUserInfo()
})
</script>

<template>
  <el-row class="w-full h-12">
    <el-col :span="16" class="flex items-center">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="font-size" v-for="item, index in breadcrumbStore.items" :key="index">
          {{ item }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="8" class="flex items-center justify-end">
      <el-dropdown trigger="click">
        <div class="h-12 p-2 flex items-center hover:bg-gray-100">
          <el-avatar :size="22" :src="userStore.avatar" />
          <span class="ml-2 block" v-text="userStore.nickname"></span>
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
