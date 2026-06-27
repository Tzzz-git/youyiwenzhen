import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDoctors } from '../api'

export const useDoctorsStore = defineStore('doctors', () => {
  const doctors = ref<any[]>([])
  const page = ref(1)
  const limit = ref(10)
  const hasMore = ref(true)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const query = ref('')

  async function fetchPage(reset = false) {
    if (loading.value) return
    loading.value = true
    if (reset) {
      page.value = 1
      doctors.value = []
      hasMore.value = true
    }
    try {
      const res = await getDoctors({ _page: page.value, _limit: limit.value, q: query.value || undefined })
      const data = res.data
      if (Array.isArray(data)) {
        if (reset) doctors.value = data
        else doctors.value = doctors.value.concat(data)
        if (data.length < limit.value) hasMore.value = false
        else page.value += 1
      } else {
        hasMore.value = false
      }
    } catch (e: any) {
      error.value = e.message || '加载失败'
    } finally {
      loading.value = false
    }
  }

  function setQuery(q: string) {
    query.value = q
  }

  return { doctors, page, limit, hasMore, loading, error, query, fetchPage, setQuery }
})
