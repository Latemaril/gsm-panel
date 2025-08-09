<template>
  <div class="h-full bg-[#0F172B] text-white shadow-md">
    <nav class="flex flex-col p-4 space-y-2">
      <NuxtLink
        v-for="item in items"
        :key="item.name"
        :to="item.to"
        class="px-4 py-2 rounded transition-colors duration-200 hover:bg-[#1E2A44]"
        active-class="bg-[#1E40AF] text-white font-semibold"
      >
        {{ item.name }}
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
const items = [
  { name: 'Получение смс', to: '/receive-sms' },
  { name: 'Отправка смс', to: '/send-sms' },
  { name: 'Получение кода', to: '/receive-code' },
  { name: 'Получение баланса', to: '/get-balance' },
  { name: 'Перезагрузка модемов', to: '/reboot-modems' },
  { name: 'Логи', to: '/logs' },
]
</script>
