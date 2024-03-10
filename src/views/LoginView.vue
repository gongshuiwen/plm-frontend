<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const loading = ref(false);
const loginFormRef = ref<FormInstance>();
const loginForm = reactive({
  username: "admin",
  password: "admin123"
});

const onLogin = async (formIns: FormInstance | undefined) => {
  loading.value = true;
  if (!formIns) return;
  await formIns.validate(async(valid, fields) => {
    if (valid) {
      try {
        await userStore.login(loginForm.username, loginForm.password);
        router.push('/home')
      } catch (error) {
        // ignore error
      } finally {
        loading.value = false;
      }
    } else {
      loading.value = false;
      return fields;
    }
  });
};

function onkeypress({ code }: KeyboardEvent) {
  if (code === "Enter") {
    onLogin(loginFormRef.value);
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>

<template>
  <div class="w-dvw h-dvh grid">
    <div class="flex items-center justify-center">
      <el-card>
        <template #header>
          <div class="font-bold text-gray-500 text-3xl text-center mt-4 mb-4">
            <span>MyAdmin</span>
          </div>
        </template>
        <el-form class="w-80"
          ref="loginFormRef"
          size="large"
          :model="loginForm"
        >
          <el-form-item prop="username"
            :rules="[
              {
                required: true,
                message: '请输入账号',
                trigger: 'blur'
              }
            ]">
          <el-input
              clearable
              placeholder="账 号"
              v-model="loginForm.username"
              :prefix-icon="UserFilled"
          />
          </el-form-item>

          <el-form-item prop="password"
          :rules="[
              {
                required: true,
                message: '请输入密码',
                trigger: 'blur'
              }
            ]">
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
          @click="onLogin(loginFormRef)"
          >
          登 录
          </el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
