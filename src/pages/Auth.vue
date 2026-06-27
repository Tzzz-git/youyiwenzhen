<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="w-[92%] max-w-md bg-white p-6 rounded-lg">
      <h2 class="text-lg font-medium mb-4">登录（演示）</h2>
      <button @click="login" class="w-full bg-blue-500 text-white py-2 rounded">演示登录</button>
      <div class="mt-4 text-sm text-gray-500">本示例使用本地模拟登录</div>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const user = useUserStore()
    const router = useRouter()
    function login() {
      user.loginAsDemo()
      router.push('/')
    }
    return { login }
  }
}
</script>

<style scoped></style>
