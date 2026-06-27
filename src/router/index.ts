import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import DoctorList from '../pages/DoctorList.vue'
import DoctorDetail from '../pages/DoctorDetail.vue'
import Chat from '../pages/Chat.vue'
import Auth from '../pages/Auth.vue'
import Profile from '../pages/Profile.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/doctors', name: 'DoctorList', component: DoctorList },
  { path: '/doctor/:id', name: 'DoctorDetail', component: DoctorDetail, props: true },
  { path: '/chat/:patientId/:doctorId', name: 'Chat', component: Chat, props: true },
  { path: '/auth', name: 'Auth', component: Auth },
  { path: '/profile', name: 'Profile', component: Profile }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
