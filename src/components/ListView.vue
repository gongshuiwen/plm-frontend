<script lang="ts" setup>
import { ref } from 'vue'
import { ElTable, ElMessage } from 'element-plus';
import type { Rpclient } from '@/utils/rpcClient';
import { Icon } from '@iconify/vue';

const CREATE_MODE = "CREATE"
const UPDATE_MODE = "UPDATE"
type FORM_MODE = typeof CREATE_MODE | typeof UPDATE_MODE

// const tableRef = ref<InstanceType<typeof ElTable>>()
const tableData = ref<any[]>([])
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const selections = ref<any[]>([])
const dialogVisible = ref(false)
const formTitle = ref('')
const formMode = ref<FORM_MODE>()
const formData = ref<any>({})

let formDataOld: any = {}

const props = defineProps<{
  client: Rpclient<any>,
}>()

const client = props.client

fetchData()

async function fetchData() {
  const data = await client.page(currentPage.value, pageSize.value)
  tableData.value = data.records
  total.value = data.total
}

// control panel events
function handleCreate() {
  formTitle.value = '新建'
  formMode.value = CREATE_MODE
  formData.value = {}
  dialogVisible.value = true
}

function handleRefresh() {
  fetchData()
}

async function handleDeleteBatch() {
  if (selections.value.length > 0) {
    await client.deleteByIds(selections.value.filter(x => x.id).map(x => (x.id)))
    ElMessage.success('删除成功')
    fetchData()
  }
}

// table row events
async function handleUpdate(scope: { row: any }) {
  formTitle.value = '编辑'
  formMode.value = UPDATE_MODE
  const data = await client.selectById(scope.row.id)
  formDataOld = data
  formData.value = await client.selectById(scope.row.id)
  dialogVisible.value = true
}

async function handleDeleteOne(scope: { row: any }) {
  await client.deleteById(scope.row.id)
  ElMessage.success('删除成功')
  fetchData()
}

// pagination events
function handleSizeChange() {
  fetchData()
}

function handleCurrentChange() {
  fetchData()
}

// selection events
function handleSelectionChange(val: any[]) {
  selections.value = val
}

// dialog events
async function handleConfirm() {
  if (formMode.value == CREATE_MODE) {
    await client.createOne(formData.value)
    ElMessage.success('创建成功')
  } else {
    const updateData:any = {}
    Object.keys(formData.value).forEach(x => {
      if (formData.value[x] !== formDataOld[x]) {
        updateData[x] = formData.value[x]
      }
    })

    await client.updateById(formData.value.id, updateData)
    ElMessage.success('更新成功')
  }

  formData.value = {}
  formDataOld = {}
  fetchData()
  dialogVisible.value = false
}

function handleClose() {
  formData.value = {}
  dialogVisible.value = false
}
</script>

<template>
  <div>
    <el-button type="primary" @click="handleCreate">
      <el-icon>
        <Icon :icon="'ep:plus'"/>
      </el-icon>
      <div>
        &nbsp;新建
      </div>
    </el-button>
    <el-button type="success" @click="handleRefresh">
      <el-icon>
        <Icon :icon="'ep:refresh'"/>
      </el-icon>
      <div>
        &nbsp;刷新
      </div>
    </el-button>
    <el-button type="danger" v-show="selections.length > 0" @click="handleDeleteBatch">
      <el-icon>
        <Icon :icon="'ep:delete'"/>
      </el-icon>
      <div>
        &nbsp;删除
      </div>
    </el-button>
  </div>
  <el-table :data="tableData" class="w-full h-full"
    @selection-change="handleSelectionChange">
    <slot name="columns"></slot> 
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" size="small" circle @click="handleUpdate(scope)">
          <el-icon>
            <Icon :icon="'ep:edit'"/>
          </el-icon>
        </el-button>
        <el-button type="danger" size="small" circle @click="handleDeleteOne(scope)">
          <el-icon>
            <Icon :icon="'ep:delete'"/>
          </el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="pt-2 pr-2"
    layout="prev, pager, next, jumper, ->, sizes, total"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    :page-sizes="[10, 20, 40, 80, 160]"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
  <el-dialog
    v-model="dialogVisible"
    :title="formMode == CREATE_MODE ? '新建' : '编辑'"
    :before-close="handleClose"
  >
  <slot name="form" :form="formData"></slot> 
  <template #footer>
    <div>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleConfirm">
        确认
      </el-button>
    </div>
  </template>
  </el-dialog>
</template>
