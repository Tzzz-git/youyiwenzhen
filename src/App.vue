<template>
  <div>
    <router-view />
    <BottomNav />
  </div>
</template>

<script lang="ts">
import BottomNav from './components/BottomNav.vue'
export default {
  components: { BottomNav }
}
</script>

<style></style>
