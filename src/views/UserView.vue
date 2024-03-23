<script lang="ts" setup>
import ListView from '@/components/ListView.vue'
import User from '@/models/user'
</script>

<template>
  <ListView :model="User">
    <template #columns>
      <el-table-column type="selection" width="32" />
      <el-table-column prop="username" label="用户名" sortable />
      <el-table-column prop="nickname" label="昵称" sortable />
      <el-table-column prop="avatar" label="头像">
        <template #default="scope">
          <el-avatar :size="22" :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="loginTime" label="最近登录" sortable />
      <el-table-column prop="createTime" label="创建时间" sortable />
    </template>
    <template #form="{ form }">
      <el-form :model="form" label-width="auto">
        <el-form-item label="用户名" required>
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="昵称" required>
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input type="password" show-password v-model="form.password" />
        </el-form-item>
      </el-form>
    </template>
  </ListView>
</template>
