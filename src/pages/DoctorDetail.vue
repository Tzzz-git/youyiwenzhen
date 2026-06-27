<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white shadow px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button @click="$router.back()" class="text-gray-600">←</button>
        <h1 class="text-lg font-medium">{{ doctor?.name || '医生详情' }}</h1>
      </div>
      <div>
        <router-link v-if="doctor" :to="`/chat/${user?.id || 0}/${doctor.id}`" class="text-blue-500">问诊</router-link>
      </div>
    </div>

    <main class="p-4" v-if="doctor">
      <div class="bg-white p-4 rounded-lg">
        <div class="flex gap-4 items-center">
          <img :src="doctor.avatar || '/placeholder-avatar.png'" class="w-20 h-20 rounded-full object-cover" />
          <div>
            <div class="font-medium text-lg">{{ doctor.name }}</div>
            <div class="text-sm text-gray-500">{{ doctor.title }} · {{ doctor.hospital }}</div>
            <div class="text-sm text-gray-600 mt-2">{{ doctor.brief }}</div>
          </div>
        </div>

        <div class="mt-4">
          <h4 class="font-medium">擅长</h4>
          <p class="text-sm text-gray-600 mt-1">{{ doctor.skills }}</p>
        </div>

        <div class="mt-4 flex gap-3">
          <button @click="openModal" class="flex-1 bg-white border text-center py-2 rounded">预约门诊</button>
          <router-link :to="`/chat/${user?.id || 0}/${doctor.id}`" class="flex-1 bg-blue-500 text-white text-center py-2 rounded">立即问诊</router-link>
        </div>
      </div>

      <div class="mt-4">
        <h3 class="text-md font-medium mb-2">用户评价</h3>
        <div class="space-y-3">
          <ReviewItem v-for="r in reviews" :key="r.id" :review="r" />
        </div>

        <div class="mt-4 bg-white p-3 rounded">
          <h4 class="font-medium mb-2">我要评价</h4>
          <textarea v-model="newReview" placeholder="写下你的评价" class="w-full p-2 border rounded mb-2"></textarea>
          <div class="flex gap-2">
            <input v-model.number="rating" type="number" min="1" max="5" class="w-24 p-2 border rounded" />
            <button @click="submitReview" class="flex-1 bg-blue-500 text-white py-2 rounded">提交评价</button>
          </div>
        </div>
      </div>
    </main>

    <AppointmentModal :show="showModal" :doctorId="doctor.id" :patientId="user?.id || 0" @cancel="showModal=false" @confirm="onConfirmAppointment" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { getDoctor, getReviewsByDoctor, postReview } from '../api'
import ReviewItem from '../components/ReviewItem.vue'
import AppointmentModal from '../components/AppointmentModal.vue'
import { useUserStore } from '../stores/user'
import { useAppointmentsStore } from '../stores/appointments'

export default {
  components: { ReviewItem, AppointmentModal },
  props: ['id'],
  setup(props: any) {
    const doctor = ref<any | null>(null)
    const userStore = useUserStore()
    userStore.load()
    const user = userStore.user
    const reviews = ref<any[]>([])
    const newReview = ref('')
    const rating = ref(5)
    const showModal = ref(false)
    const apptStore = useAppointmentsStore()

    onMounted(async () => {
      const res = await getDoctor(Number(props.id))
      doctor.value = res.data
      const r = await getReviewsByDoctor(Number(props.id))
      reviews.value = r.data
    })

    async function submitReview() {
      if (!user) return alert('请先登录（演示登陆）')
      const payload = { doctorId: doctor.value.id, userId: user.id, rating: rating.value, text: newReview.value }
      const res = await postReview(payload)
      reviews.value.unshift(res.data)
      newReview.value = ''
      rating.value = 5
    }

    function openModal() { showModal.value = true }
    async function onConfirmAppointment(payload: any) {
      if (!user) return alert('请先登录')
      await apptStore.create({ doctorId: doctor.value.id, patientId: user.id, date: payload.date, note: payload.note })
      showModal.value = false
      alert('预约已提交（演示）')
    }

    return { doctor, user, reviews, newReview, rating, submitReview, showModal, openModal, onConfirmAppointment }
  }
}
</script>

<style scoped></style>
