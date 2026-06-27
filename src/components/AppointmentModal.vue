<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-end">
    <div class="bg-white w-full p-4 rounded-t-lg">
      <h3 class="text-lg font-medium mb-2">预约门诊</h3>
      <input v-model="date" type="datetime-local" class="w-full p-2 border rounded mb-2" />
      <textarea v-model="note" placeholder="备注（可选）" class="w-full p-2 border rounded mb-2"></textarea>
      <div class="flex gap-2">
        <button @click="onCancel" class="flex-1 border py-2 rounded">取消</button>
        <button @click="onConfirm" class="flex-1 bg-blue-500 text-white py-2 rounded">确认预约</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: { show: { type: Boolean, required: true }, doctorId: { type: Number, required: true }, patientId: { type: Number, required: true } },
  emits: ['cancel', 'confirm'],
  setup(_, { emit }) {
    const date = ref('')
    const note = ref('')
    function onCancel() { emit('cancel') }
    function onConfirm() { emit('confirm', { date: date.value, note: note.value }) }
    return { date, note, onCancel, onConfirm }
  }
})
</script>

<style scoped></style>
