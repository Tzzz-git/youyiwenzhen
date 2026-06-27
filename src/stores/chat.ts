import { defineStore } from 'pinia'
import { ref } from 'vue'
import { findChat, createChat, appendMessageToChat, sendMessage } from '../api'
import { formatTime } from '../utils/time'

export const useChatStore = defineStore('chat', () => {
  const currentChatId = ref<number | null>(null)
  const messages = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadChat(doctorId: number, patientId: number) {
    loading.value = true
    error.value = null
    try {
      const existing = await findChat(doctorId, patientId)
      if (existing) {
        currentChatId.value = existing.id
        messages.value = existing.messages || []
      } else {
        // create empty chat
        const res = await createChat({ doctorId, patientId, messages: [] })
        currentChatId.value = res.data.id
        messages.value = []
      }
    } catch (e: any) {
      error.value = e.message || '加载聊天失败'
    } finally {
      loading.value = false
    }
  }

  async function send(doctorId: number, patientId: number, from: number, text: string) {
    if (!text) return
    const msg = { from, text, time: formatTime(new Date()) }
    try {
      // sendMessage handles create-or-append
      const chatId = await sendMessage(doctorId, patientId, msg)
      currentChatId.value = chatId
      // append locally for immediate UX
      messages.value.push(msg)

      // simulate doctor reply after delay
      setTimeout(async () => {
        const reply = { from: doctorId, text: '收到你的症状描述，请补充一下发作频率与伴随症状。', time: formatTime(new Date()) }
        await appendMessageToChat(chatId, reply)
        messages.value.push(reply)
      }, 1200)
    } catch (e: any) {
      error.value = e.message || '发送失败'
    }
  }

  return { currentChatId, messages, loading, error, loadChat, send }
})
