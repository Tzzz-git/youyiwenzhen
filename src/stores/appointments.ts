import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createAppointment, getAppointmentsByUser } from '../api'

export const useAppointmentsStore = defineStore('appointments', () => {
  const appointments = ref<any[]>([])
  const loading = ref(false)

  async function fetchByUser(patientId: number) {
    loading.value = true
    try {
      const res = await getAppointmentsByUser(patientId)
      appointments.value = res.data
    } finally {
      loading.value = false
    }
  }

  async function create(payload: { doctorId: number; patientId: number; date: string; note?: string }) {
    const res = await createAppointment(payload)
    appointments.value.push(res.data)
    return res.data
  }

  return { appointments, loading, fetchByUser, create }
})
