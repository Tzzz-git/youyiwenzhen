<template>
  <div class="bg-white p-4 rounded-lg shadow-sm flex gap-4">
    <img :src="doctor.avatar || '/placeholder-avatar.png'" class="w-16 h-16 rounded-full object-cover" />
    <div class="flex-1">
      <div class="flex items-center justify-between">
        <div>
          <div class="font-medium">{{ doctor.name }}</div>
          <div class="text-sm text-gray-500">{{ doctor.title }} · {{ doctor.hospital }}</div>
        </div>
        <div class="text-sm text-blue-500">{{ doctor.price }} 元</div>
      </div>
      <div class="mt-2 text-sm text-gray-600">{{ doctor.brief }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    doctor: { type: Object as PropType<any>, required: true }
  }
})
</script>

<style scoped></style>
