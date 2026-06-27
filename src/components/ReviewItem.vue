<template>
  <div class="bg-white p-3 rounded shadow-sm">
    <div class="flex items-center justify-between">
      <div class="font-medium">{{ userName }}</div>
      <div class="text-sm text-gray-500">{{ shortTime }}</div>
    </div>
    <div class="mt-2 text-sm text-yellow-500">★ x {{ review.rating }}</div>
    <div class="mt-2 text-sm text-gray-700">{{ review.text }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  props: {
    review: { type: Object, required: true }
  },
  setup(props: any) {
    const shortTime = computed(() => {
      return props.review.time ? new Date(props.review.time).toLocaleDateString() : ''
    })
    const userName = computed(() => `用户 ${props.review.userId}`)
    return { shortTime, userName }
  }
})
</script>

<style scoped></style>
