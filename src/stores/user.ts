import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<{ id: number; name: string } | null>(null)

  function loginAsDemo() {
    user.value = { id: 1, name: '演示用户' }
    localStorage.setItem('youyi:user', JSON.stringify(user.value))
  }

  function load() {
    const raw = localStorage.getItem('youyi:user')
    if (raw) user.value = JSON.parse(raw)
  }

  function logout() {
    user.value = null
    localStorage.removeItem('youyi:user')
  }

  return { user, loginAsDemo, load, logout }
})
