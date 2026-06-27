<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
    <router-link to="/" class="flex flex-col items-center text-sm text-gray-600">
      <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm10 8h8V3h-8v18zM3 21h8v-6H3v6z"/></svg>
      首页
    </router-link>
    <router-link to="/doctors" class="flex flex-col items-center text-sm text-gray-600">
      <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l4 4H8l4-4z"/></svg>
      预约
    </router-link>
    <router-link to="/chat/1/1" class="flex flex-col items-center text-sm text-gray-600">
      <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M21 6h-2v9H5v2h14l4 4V6z"/></svg>
      问诊
    </router-link>
    <router-link to="/profile" class="flex flex-col items-center text-sm text-teal-600">
      <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM4 20v-1c0-2.21 3.58-4 8-4s8 1.79 8 4v1H4z"/></svg>
      我的
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {}
</script>

<style scoped>
nav { z-index: 40; }
</style>
