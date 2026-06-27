import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 7000
})

// 简单错误拦截
api.interceptors.response.use(
  res => res,
  err => {
    console.error('[API ERROR]', err?.message || err)
    return Promise.reject(err)
  }
)

// Doctors
export const getDoctors = (params?: { _page?: number; _limit?: number; q?: string; title?: string }) =>
  api.get('/doctors', { params })

export const getDoctor = (id: number) => api.get(`/doctors/${id}`)

// Reviews
export const getReviewsByDoctor = (doctorId: number) =>
  api.get('/reviews', { params: { doctorId } })
export const postReview = (payload: { doctorId: number; userId: number; rating: number; text: string }) =>
  api.post('/reviews', payload)

// Appointments
export const createAppointment = (payload: { doctorId: number; patientId: number; date: string; note?: string }) =>
  api.post('/appointments', payload)
export const getAppointmentsByUser = (patientId: number) =>
  api.get('/appointments', { params: { patientId } })

// Chats: json-server data shape: chats: [{id, doctorId, patientId, messages: [{from, text, time}]}]
// Find chat by doctorId & patientId
export const findChat = async (doctorId: number, patientId: number) => {
  const res = await api.get('/chats', { params: { doctorId, patientId } })
  return res.data && res.data.length ? res.data[0] : null
}

// Create a new chat
export const createChat = (payload: { doctorId: number; patientId: number; messages?: any[] }) =>
  api.post('/chats', payload)

// Append message: uses PATCH to update the chat.messages array
export const appendMessageToChat = async (chatId: number, message: any) => {
  // fetch current chat
  const res = await api.get(`/chats/${chatId}`)
  const chat = res.data
  const messages = chat.messages ? [...chat.messages, message] : [message]
  return api.patch(`/chats/${chatId}`, { messages })
}

// Helper to send message to a chat (create chat if needed)
export const sendMessage = async (doctorId: number, patientId: number, message: any) => {
  const existing = await findChat(doctorId, patientId)
  if (existing) {
    await appendMessageToChat(existing.id, message)
    return existing.id
  } else {
    const res = await createChat({ doctorId, patientId, messages: [message] })
    return res.data.id
  }
}

export default api
