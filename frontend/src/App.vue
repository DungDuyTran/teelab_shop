<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
/* Reset cơ bản để 3D mượt mà */
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  background-color: #121212; /* Set sẵn nền đen cho mượt */
}

/* Hiệu ứng chuyển cảnh nhẹ nhàng giữa các trang */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
