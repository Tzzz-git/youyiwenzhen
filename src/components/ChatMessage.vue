<template>
  <div :class="['flex', isMine ? 'justify-end' : 'justify-start']">
    <div :class="['p-2 rounded-lg max-w-[70%]', isMine ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800']">
      <div v-if="message.text">{{ message.text }}</div>
      <div v-if="message.time" class="text-xs mt-1 text-gray-400">{{ message.time }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    message: { type: Object as PropType<any>, required: true },
    isMine: { type: Boolean, required: false }
  }
})
</script>

<style scoped></style>
