<script lang="ts" setup>
import { watch } from 'vue'
import { ElMessage } from 'element-plus'
import type { RpcClient } from '@/utils/rpcClient'

export type FORM_MODE = 'CREATE' | 'UPDATE'
export type FIELD_TYPE = 
  'boolean' |'integer' | 'float' |  'string' | 'date' |
  'many2one' | 'one2many' | 'many2many'
export type FIELD_TYPES = { [key: string]: FIELD_TYPE; }

const props = defineProps<{
  client: RpcClient<any>
  recordId: string
  fieldTypes: FIELD_TYPES
  mode: FORM_MODE
}>()

const client = props.client

const emit = defineEmits(['onDialogConfirm'])

const formData = defineModel<any>("formData", { default: {} })
const formVisible = defineModel<Boolean>("formVisible", { default: false })

// const dialogRef = ref<InstanceType<typeof ElDialog>>()
let formDataOld: any = {}

async function handleConfirm() {
  if (props.mode === 'CREATE') {
    await client.createOne(formData.value)
    ElMessage.success('创建成功')
  } else {
    const updateData: any = {}
    Object.keys(formData.value).forEach((field) => {
      if (props.fieldTypes[field] === undefined) {
        return
      } else if (props.fieldTypes[field] === 'many2one') {
        // TODO
      } else if (props.fieldTypes[field] === 'one2many') {
        // TODO
      } else if (props.fieldTypes[field] === 'many2many') {
        // TODO
      } else if (formData.value[field] !== formDataOld[field]) {
        updateData[field] = formData.value[field]
      }
    })
    console.log(updateData)
    await client.updateById(formData.value.id, updateData)
    ElMessage.success('更新成功')
  }

  formVisible.value = false
  emit('onDialogConfirm')
}

function handleClose() {
  formVisible.value = false
}

async function fetchData() {
  formDataOld = await client.selectById(props.recordId)
  formData.value = { ...formDataOld }
}

watch(formVisible, (newValue) => {
  if (newValue == true && props.recordId) {
    fetchData()
  } else {
    formData.value = {}
  }
})
</script>

<template>
  <el-dialog v-model="formVisible" :title="mode === 'CREATE' ? '新建' : '编辑'" :before-close="handleClose">
    <slot :form="formData"></slot>
    <template #footer>
      <div>
        <el-button @click="handleClose"> 取消 </el-button>
        <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
