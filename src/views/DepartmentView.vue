<script lang="ts" setup>
import ListView from '@/components/ListView.vue'
import departmentClient from '@/clients/departmentClient'
</script>

<template>
  <ListView :client="departmentClient">
    <template #columns>
      <el-table-column prop="name" label="名称" sortable />
      <el-table-column prop="orderNum" label="序号" sortable />
    </template>

    <template #form="{ form }">
      <el-form :model="form" label-width="auto">
        <el-form-item label="名称" required>
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="序号">
          <el-input type="number" v-model="form.orderNum"/>
        </el-form-item>
      </el-form>
    </template>
  </ListView>
</template>
