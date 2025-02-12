<script lang="ts" setup>
import { watch } from 'vue'
import { getFieldInfos } from '@/utils/model'
import { useRpcClient } from '@/utils/rpcClient'
import { ElMessage } from 'element-plus'

export type FORM_MODE = 'CREATE' | 'UPDATE'

const baseFields: FieldType[] =
  ['boolean', 'integer', 'float', 'string', 'text', 'date', 'time', 'datetime']

const props = defineProps<{
  modelName: string
  recordId: string
  mode: FORM_MODE
}>()

const client = useRpcClient<any>(props.modelName)
const fieldInfos = getFieldInfos(props.modelName)

const emit = defineEmits(['onDialogConfirm'])

const formData = defineModel<any>("formData", { default: {} })
const formVisible = defineModel<Boolean>("formVisible", { default: false })

// const dialogRef = ref<InstanceType<typeof ElDialog>>()
let formDataOld: any = {}

async function handleConfirm() {
  if (props.mode === 'CREATE') {
    const createData: any = {}
    Object.keys(formData.value).forEach((field) => {
      if (!fieldInfos[field]) {
        return
      } else if (baseFields.indexOf(fieldInfos[field].type) > -1) {
        createData[field] = formData.value[field]
      } else if (fieldInfos[field].type === 'many2one') {
        if (formData.value[field]?.id) {
          createData[field] = formData.value[field]?.id
        }
      } else if (fieldInfos[field].type === 'one2many') {
        // TODO
      } else if (fieldInfos[field].type === 'many2many') {
        if (formData.value[field] && formData.value[field].length > 0) {
          createData[field] = [[0, formData.value[field].map((x: any) => x.id)]]
        }
      } else {
        return
      }
    })
    console.log(createData)
    await client.createOne(createData)
    ElMessage.success('创建成功')
  } else {
    const updateData: any = {}
    Object.keys(formData.value).forEach((field) => {
      if (!fieldInfos[field]) {
        return
      } else if (baseFields.indexOf(fieldInfos[field].type) > -1) {
        if (formData.value[field] !== formDataOld[field]) {
          updateData[field] = formData.value[field]
        }
      } else if (fieldInfos[field].type === 'many2one') {
        if (formData.value[field]?.id !== formDataOld[field]?.id) {
          updateData[field] = formData.value[field]?.id || 0
        }
      } else if (fieldInfos[field].type === 'one2many') {
        // TODO
      } else if (fieldInfos[field].type === 'many2many') {
        const oldIds: string[] = formDataOld[field]?.map((x: any) => x.id) || []
        const newIds: string[] = formData.value[field]?.map((x: any) => x.id) || []
        console.log(oldIds, newIds)
        if (oldIds.length === 0 && newIds.length === 0) {
          return
        } else if (oldIds.length === 0) {
          updateData[field] = [[0, newIds]]
        } else if (newIds.length === 0) {
          updateData[field] = [[1, oldIds]]
        } else {
          const commands = []

          // get added ids
          const addedIds = newIds.filter((x) => oldIds.indexOf(x) == -1)
          if (addedIds.length > 0) {
            commands.push([0, addedIds])
          }
          
          // get removed ids
          const removedIds = oldIds.filter((x) => newIds.indexOf(x) == -1)
          if (removedIds.length > 0) {
            commands.push([1, removedIds])
          }

          if (commands.length === 2) {
            updateData[field] = [[2, newIds]]
          } else if (commands.length === 1) {
            updateData[field] = commands
          }
        }
      } else {
        return
      }
    })
    console.log(updateData)
    updateData.id = formData.value.id
    await client.updateById(updateData)
    ElMessage.success('更新成功')
  }

  formVisible.value = false
  emit('onDialogConfirm')
}

function handleClose() {
  formVisible.value = false
}

async function fetchData() {
  formDataOld = await client.getById(props.recordId)
  console.log(formDataOld)
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
  <el-dialog 
    v-model="formVisible" 
    :title="mode === 'CREATE' ? '新建' : '编辑'" 
    :before-close="handleClose">
    <slot :form="formData"></slot>
    <template #footer>
      <div>
        <el-button @click="handleClose"> 取消 </el-button>
        <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
