<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white shadow px-4 py-3 flex items-center gap-3">
      <button @click="$router.back()" class="text-gray-600">←</button>
      <h1 class="text-lg font-medium">问诊聊天</h1>
    </div>

    <main class="p-4 flex flex-col h-[calc(100vh-56px)]">
      <div ref="scrollEl" class="flex-1 overflow-auto space-y-3">
        <ChatMessage v-for="(m, i) in store.messages" :key="i" :message="m" :isMine="m.from === user?.id" />
      </div>

      <div class="mt-2">
        <div class="flex gap-2">
          <input v-model="input" placeholder="请输入要咨询的问题" class="flex-1 p-2 rounded border" @keyup.enter="send" />
          <button @click="send" class="bg-blue-500 text-white px-4 py-2 rounded">发送</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import ChatMessage from '../components/ChatMessage.vue'
import { useUserStore } from '../stores/user'
import { useChatStore } from '../stores/chat'

export default {
  components: { ChatMessage },
  props: ['patientId', 'doctorId'],
  setup(props: any) {
    const userStore = useUserStore()
    userStore.load()
    const user = userStore.user
    const store = useChatStore()
    const input = ref('')
    const scrollEl = ref<HTMLElement | null>(null)

    onMounted(async () => {
      const doctorId = Number(props.doctorId)
      const patientId = Number(props.patientId) || user?.id || 0
      await store.loadChat(doctorId, patientId)
    })

    watch(() => store.messages.length, async () => {
      await nextTick()
      if (scrollEl.value) {
        scrollEl.value.scrollTop = scrollEl.value.scrollHeight
      }
    })

    function send() {
      if (!input.value) return
      const doctorId = Number(props.doctorId)
      const patientId = Number(props.patientId) || user?.id || 0
      store.send(doctorId, patientId, user?.id || 0, input.value)
      input.value = ''
    }

    return { input, store, user, send, scrollEl }
  }
}
</script>

<style scoped></style>
