<script setup lang="ts">
import { ref, onUpdated } from 'vue'
import type { RpcClient } from '@/utils/rpcClient'
import type { ElSelect } from 'element-plus';

interface Option {
  id: string
  displayName: string
}

const selectRef = ref<InstanceType<typeof ElSelect>>()
const options = ref<Option[]>([])
const loading = ref(false)

const props = defineProps<{
  client: RpcClient<any>
}>()

const client = props.client

onUpdated(async () => {
  if (selectRef.value?.modelValue === selectRef.value?.states.selectedLabel) {
    options.value = [await client.selectById(selectRef.value?.modelValue)]
  }
})

const nameSearch = async (name: string) => {
  loading.value = true
  options.value = await client.nameSearch(name)
  loading.value = false
}
</script>

<template>
  <el-select
    filterable
    remote
    remote-show-suffix
    default-first-option
    ref="selectRef"
    :remote-method="nameSearch"
    :loading="loading"
  >
    <el-option
      v-for="option in options"
      :key="option.id"
      :value="option.id"
      :label="option.displayName"
    />
  </el-select>
</template>
