<template>
  <div class="bg-white shadow-md px-4 py-3 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <button @click="back" class="text-gray-600">←</button>
      <h1 class="text-lg font-medium">{{ title }}</h1>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: { title: { type: String, default: '' } },
  setup() {
    const router = useRouter()
    function back() {
      router.back()
    }
    return { back }
  }
})
</script>

<style scoped></style>
