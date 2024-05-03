<script setup lang="ts">
import { ref, onUpdated } from 'vue'
import { useRpcClient } from '@/utils/rpcClient'
import type { ClassWithGetModelName } from '@/utils/rpcClient'
import type { ElSelect } from 'element-plus'
import type { Option } from './types'

const props = defineProps<{
  entityClass: ClassWithGetModelName<any>
}>()

const client = useRpcClient(props.entityClass)

const selectRef = ref<InstanceType<typeof ElSelect>>()
const options = ref<Option[]>([])
const loading = ref(false)

onUpdated(async () => {
  if (selectRef.value?.states.selected) {
    selectRef.value.states.selected.forEach((selected: any) => {
      selected.currentLabel = (selected.value as any).displayName
    })
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
    multiple
    filterable
    clearable
    remote
    remote-show-suffix
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
