<script lang="ts" setup>
import ListView from '@/components/ListView.vue'
import Role from '@/models/role'
</script>

<template>
  <ListView :model="Role">
    <template #columns>
      <el-table-column type="selection" width="32" />
      <el-table-column prop="code" label="角色标识" sortable />
      <el-table-column prop="name" label="角色名称" sortable />
      <el-table-column prop="createTime" label="创建时间" sortable />
      <el-table-column prop="updateTime" label="更新时间" sortable />
    </template>
    <template #form="{ form }">
      <el-form :model="form" label-width="auto">
        <el-form-item label="角色标识" required>
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item label="角色名称" required>
          <el-input v-model="form.nickname"/>
        </el-form-item>
      </el-form>
    </template>
  </ListView>
</template>
