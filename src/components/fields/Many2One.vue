<script setup lang="ts">
import { ref, onUpdated } from 'vue'
import type { RpcClient } from '@/utils/rpcClient'
import type { ElSelect } from 'element-plus';

interface Option {
  id: string
  displayName: string
}

const props = defineProps<{
  client: RpcClient<any>
}>()
const client = props.client

const selectRef = ref<InstanceType<typeof ElSelect>>()
const options = ref<Option[]>([])
const loading = ref(false)

onUpdated(async () => {
  if (selectRef.value?.modelValue === selectRef.value?.states.selected.value && selectRef.value?.modelValue) {
    selectRef.value.states.selectedLabel = (selectRef.value?.modelValue as any).displayName
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
    value-key="id"
    ref="selectRef"
    :remote-method="nameSearch"
    :loading="loading"
  >
    <el-option
      v-for="option in options"
      :key="option.id"
      :value="option"
      :label="option.displayName"
    />
  </el-select>
</template>
