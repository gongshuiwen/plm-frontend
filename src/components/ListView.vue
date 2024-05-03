<script lang="ts" setup>
import { ref } from 'vue'
import { useRpcClient } from '@/utils/rpcClient'
import { Icon } from '@iconify/vue'
import { ElMessage } from 'element-plus';
import type { ClassWithGetModelName } from '@/utils/rpcClient'
import type { FORM_MODE } from './DialogFormView.vue'

const props = defineProps<{
  entityClass: ClassWithGetModelName<any>
  fieldTypes: FIELD_TYPES
}>()

const client = useRpcClient(props.entityClass)

// const tableRef = ref<InstanceType<typeof ElTable>>()
const loading = ref(false)
const tableData = ref<any[]>([])
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const selections = ref<any[]>([])

// Dialog form states
const formRecordId = ref('')
const formData = ref<any>({})
const formMode = ref<FORM_MODE>("CREATE")
const formVisible = ref(false)

fetchData()

async function fetchData() {
  loading.value = true
  const data = await client.page(currentPage.value, pageSize.value)
  tableData.value = data.records
  total.value = data.total
  loading.value = false
}

function openDialogForm(mode: FORM_MODE, recordId?: string) {
  if (mode === "UPDATE" && recordId) {
    formRecordId.value = recordId
  } else {
    formRecordId.value = ''
  }
  formMode.value = mode
  formVisible.value = true
}

// control panel events
function handleCreate() {
  openDialogForm("CREATE")
}

function handleRefresh() {
  fetchData()
}

async function handleDeleteBatch() {
  if (selections.value.length > 0) {
    await client.deleteByIds(selections.value.filter((x) => x.id).map((x) => x.id))
    ElMessage.success('删除成功')
    fetchData()
  }
}

// table row events
async function handleUpdate(scope: { row: any }) {
  openDialogForm("UPDATE", scope.row.id)
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
</script>

<template>
  <div class="border-b pt-2 pb-2 pl-4 pr-4">
    <el-button type="success" @click="handleCreate">
      <el-icon>
        <Icon :icon="'ep:plus'" />
      </el-icon>
      <div>&nbsp;新建</div>
    </el-button>
    <el-button type="info" @click="handleRefresh">
      <el-icon>
        <Icon :icon="'ep:refresh'" />
      </el-icon>
      <div>&nbsp;刷新</div>
    </el-button>
    <el-popconfirm title="是否确认删除?" @confirm="handleDeleteBatch">
      <template #reference>
        <el-button type="danger" v-show="selections.length > 0">
          <el-icon>
            <Icon :icon="'ep:delete'" />
          </el-icon>
          <div>&nbsp;删除</div>
        </el-button>
      </template>
    </el-popconfirm>
  </div>

  <el-table v-loading="loading" :data="tableData" class="w-full" @selection-change="handleSelectionChange">
    <el-table-column fixed type="selection" width="40" />
    <el-table-column fixed type="index" class="text-right">
      <template #header>No.</template>
    </el-table-column>
    <slot name="columns"></slot>
    <el-table-column fixed="right" label="操作" width="96" class="mr-2">
      <template #default="scope">
        <el-button type="primary" size="small" circle @click="handleUpdate(scope)">
          <el-icon>
            <Icon :icon="'ep:edit'" />
          </el-icon>
        </el-button>
        <el-popconfirm title="是否确认删除?" @confirm="handleDeleteOne(scope)">
          <template #reference>
            <el-button type="danger" size="small" circle>
              <el-icon>
                <Icon :icon="'ep:delete'" />
              </el-icon>
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    class="pt-2 pb-2 pl-4 pr-4"
    layout="prev, pager, next, jumper, ->, sizes, total"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    v-show="total > 0"
    :total="total"
    :page-sizes="[10, 20, 40, 80, 160]"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />

  <DialogFormView
    v-model:form-data="formData"
    v-model:form-visible="formVisible"
    :entity-class="entityClass"
    :field-types="fieldTypes"
    :record-id="formRecordId"
    :mode="formMode"
    @on-dialog-confirm="fetchData">
    <slot name="form" :form="formData"></slot>
  </DialogFormView>
</template>

<style lang="scss" scoped>
.el-table {
  height: calc(100% - 96.2px);
}
</style>