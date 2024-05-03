<script lang="ts" setup>
import Menu from '@/entities/menu'
import { Icon } from '@iconify/vue';
</script>

<template>
  <ListView :entity-class="Menu">
    <template #columns>
      <el-table-column prop="name" label="名称" sortable />
      <el-table-column prop="title" label="标题" sortable />
      <el-table-column prop="path" label="路径" sortable />
      <el-table-column prop="orderNum" label="序号" sortable />
      <el-table-column prop="icon" label="图标">
        <template #default="scope">
          <el-icon>
            <Icon :icon="scope.row.icon" />
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="component" label="组件" sortable />
      <el-table-column prop="redirect" label="重定向" sortable />
    </template>

    <template #form="{ form }">
      <el-form :model="form" label-width="auto">
        <el-form-item label="名称" required>
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="标题" required>
          <el-input v-model="form.title"/>
        </el-form-item>
        <el-form-item label="路径" required>
          <el-input v-model="form.path"/>
        </el-form-item>
        <el-form-item label="序号">
          <el-input type="number" v-model="form.orderNum"/>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="form.icon"/>
        </el-form-item>
        <el-form-item label="组件">
          <el-input v-model="form.component"/>
        </el-form-item>
        <el-form-item label="重定向">
          <el-input v-model="form.redirect"/>
        </el-form-item>
      </el-form>
    </template>
  </ListView>
</template>
