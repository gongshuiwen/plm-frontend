<script lang="ts" setup>
import { ref } from 'vue';
import Department from '@/models/department';
import Role from '@/models/role';
import User from '@/models/user';

const fieldTypes = ref<FieldTypes>({
  "username": "string",
  "nickname": "string",
  "password": "string",
  "departmentId": "many2one",
  "roles": "many2many"
})
</script>

<template>
  <ListView :model-name="User.getModelName()" :field-types="fieldTypes">
    <template #columns>
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
    <template #form="{ form } : { form : User }">
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
        <el-form-item label="部门" required>
          <Many2One v-model="form.departmentId" :model-name="Department.getModelName()" />
        </el-form-item>
        <el-form-item label="角色" required>
          <Many2Many v-model="form.roles" :model-name="Role.getModelName()" />
        </el-form-item>
      </el-form>
    </template>
  </ListView>
</template>
@/models/department@/models/role@/models/user