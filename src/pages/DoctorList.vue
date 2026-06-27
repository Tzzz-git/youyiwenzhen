<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white shadow px-4 py-3 flex items-center gap-3">
      <button @click="$router.back()" class="text-gray-600">←</button>
      <input v-model="q" @keyup.enter="onSearch" placeholder="搜索医生/科室" class="flex-1 p-2 rounded border" />
      <button @click="onSearch" class="text-blue-500">搜索</button>
    </div>

    <main class="p-4">
      <div class="space-y-3">
        <router-link v-for="d in store.doctors" :key="d.id" :to="`/doctor/${d.id}`">
          <DoctorCard :doctor="d" />
        </router-link>
      </div>

      <div class="mt-4 text-center">
        <button v-if="store.hasMore && !store.loading" @click="loadMore" class="bg-white border px-4 py-2 rounded">加载更多</button>
        <div v-if="store.loading" class="text-gray-500">加载中...</div>
        <div v-if="!store.hasMore && !store.loading" class="text-gray-400">没有更多了</div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import DoctorCard from '../components/DoctorCard.vue'
import { useDoctorsStore } from '../stores/doctors'

export default {
  components: { DoctorCard },
  setup() {
    const store = useDoctorsStore()
    const q = ref('')
    onMounted(() => {
      store.fetchPage(true)
    })
    function onSearch() {
      store.setQuery(q.value)
      store.fetchPage(true)
    }
    function loadMore() {
      store.fetchPage(false)
    }
    return { store, q, onSearch, loadMore }
  }
}
</script>

<style scoped></style>
