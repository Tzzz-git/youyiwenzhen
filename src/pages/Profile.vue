<template>
  <div class="min-h-screen bg-gray-100 pb-16">
    <!-- Header with gradient and avatar -->
    <div class="relative">
      <div class="h-40 bg-gradient-to-b from-teal-200 to-white flex items-end p-4">
        <div class="flex items-center gap-4 w-full">
          <img :src="avatar" alt="avatar" class="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover" />
          <div>
            <div class="text-white font-semibold text-lg">{{ user?.name || '测试用户' }}</div>
            <div class="text-teal-800 text-sm mt-1">个人简介或签名放这里</div>
          </div>
          <div class="ml-auto text-right text-white">
            <div class="text-sm">会员等级</div>
            <div class="font-semibold text-base">VIP</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="p-4 -mt-8">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex justify-between text-center">
          <div class="flex-1">
            <div class="text-2xl font-semibold">0</div>
            <div class="text-sm text-gray-500">收藏</div>
          </div>
          <div class="flex-1">
            <div class="text-2xl font-semibold">792</div>
            <div class="text-sm text-gray-500">关注</div>
          </div>
          <div class="flex-1">
            <div class="text-2xl font-semibold">0</div>
            <div class="text-sm text-gray-500">积分</div>
          </div>
          <div class="flex-1">
            <div class="text-2xl font-semibold">0</div>
            <div class="text-sm text-gray-500">优惠券</div>
          </div>
        </div>
      </div>

      <!-- Orders card -->
      <div class="mt-4 bg-white rounded-lg shadow p-4">
        <div class="flex items-center justify-between">
          <div class="font-medium">药品订单</div>
          <router-link to="/doctors" class="text-sm text-gray-400">全部订单 &gt;</router-link>
        </div>
        <div class="mt-3 grid grid-cols-4 gap-3">
          <div v-for="item in orderItems" :key="item.label" class="flex flex-col items-center">
            <div :class="['w-12 h-12 flex items-center justify-center rounded-full', item.bg]">
              <svg v-html="item.icon" class="w-6 h-6 text-white"></svg>
            </div>
            <div class="text-sm text-gray-600 mt-2">{{ item.label }}</div>
          </div>
        </div>
      </div>

      <!-- Quick Tools -->
      <div class="mt-4 bg-white rounded-lg shadow">
        <div class="p-3 border-b">
          <div class="font-medium">快捷工具</div>
        </div>
        <div>
          <div v-for="tool in tools" :key="tool.label" class="flex items-center justify-between p-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100">
                <svg v-html="tool.icon" class="w-5 h-5 text-teal-500"></svg>
              </div>
              <div class="text-sm">{{ tool.label }}</div>
            </div>
            <div class="text-gray-300">›</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom nav injected by App.vue as global component (also present) -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '../stores/user'

export default defineComponent({
  setup() {
    const user = useUserStore()
    user.load()
    const avatar = '/placeholder-avatar.svg'

    const orderItems = [
      { label: '待付款', bg: 'bg-yellow-400', icon: `<path fill-rule="evenodd" d="M10 2a2 2 0 00-2 2v6H6l4 4 4-4h-2V4a2 2 0 00-2-2z" clip-rule="evenodd"/>` },
      { label: '待发货', bg: 'bg-blue-400', icon: `<path d="M3 3h18v2H3V3z"/>` },
      { label: '待收货', bg: 'bg-red-400', icon: `<path d="M12 2l4 4H8l4-4z"/>` },
      { label: '已完成', bg: 'bg-green-400', icon: `<circle cx="12" cy="12" r="3"/>` }
    ]

    const tools = [
      { label: '我的问诊', icon: `<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/>` },
      { label: '我的处方', icon: `<path d="M3 7h14v10H3z"/>` },
      { label: '家庭档案', icon: `<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4"/>` },
      { label: '地址管理', icon: `<path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1118 0z"/>` },
      { label: '我的评价', icon: `<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>` }
    ]

    return { user: user.user, avatar, orderItems, tools }
  }
})
</script>

<style scoped>
/* small shadow for the header */
.bg-gradient-to-b {
  background: linear-gradient(180deg, rgba(164, 235, 231, 1) 0%, rgba(248, 249, 249, 1) 100%);
}
</style>
