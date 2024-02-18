<script setup lang="ts">
import type { FormInstance, ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import { ref, reactive} from "vue";

import { UserFilled, Lock } from '@element-plus/icons-vue'

const loading = ref(false);
const ruleFormRef = ref<FormInstance>();
const loginForm = reactive({
  username: "admin",
  password: "admin123"
});
</script>

<template>
  <div class="w-dvw h-dvh grid">
    <div class="flex items-center justify-center">
      <el-card>
        <template #header>
          <div class="font-bold text-gray-500 text-3xl text-center mt-4 mb-4">
            <span>XXX后台管理系统</span>
          </div>
        </template>
        <el-form class="w-80"
          ref="ruleFormRef"
          size="large"
          :model="loginForm"
        >
          <el-form-item prop="username">
          <el-input
              clearable
              placeholder="账 号"
              v-model="loginForm.username"
              :prefix-icon="UserFilled"
          />
          </el-form-item>

          <el-form-item prop="password">
          <el-input
              clearable
              show-password
              placeholder="密 码"
              v-model="loginForm.password"
              :prefix-icon="Lock"
          />
          </el-form-item>

          <el-button
          class="w-full mt-4 mb-4"
          size="default"
          type="primary"
          :loading="loading"
          >
          登 录
          </el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
