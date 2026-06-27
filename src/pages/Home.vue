<template>
  <div class="min-h-screen bg-gray-50">
    <Header title="优医问诊" />
    <main class="p-4">
      <div class="bg-white rounded-lg p-4 mb-4">
        <h2 class="text-lg font-medium">快速问诊</h2>
        <p class="text-sm text-gray-500 mt-1">AI 辅助 + 专家在线</p>
        <div class="mt-3">
          <router-link to="/doctors" class="inline-block bg-blue-500 text-white px-4 py-2 rounded">找医生</router-link>
          <router-link to="/auth" class="ml-3 inline-block border px-4 py-2 rounded">登录</router-link>
        </div>
      </div>

      <div>
        <h3 class="text-md font-medium mb-2">推荐医生</h3>
        <div class="space-y-3">
          <router-link v-for="d in sample" :key="d.id" :to="`/doctor/${d.id}`">
            <DoctorCard :doctor="d" />
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Header from '../components/Header.vue'
import DoctorCard from '../components/DoctorCard.vue'
const sample = [
  { id: 1, name: '张医生', title: '主治医师', hospital: '市人民医院', price: 30, brief: '擅长内科常见病' },
  { id: 2, name: '李医生', title: '主任医师', hospital: '省中医院', price: 60, brief: '心血管方向' }
]
export default {
  components: { Header, DoctorCard },
  data() { return { sample } }
}
</script>

<style scoped></style>
