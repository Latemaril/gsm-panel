<template>
  <div class="flex h-screen">
    <Sidebar class="w-64 border-r border-gray-200" />
    <main class="flex-1 p-6">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '~/components/Sidebar.vue'
</script>
