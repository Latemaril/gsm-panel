<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-white">Получение баланса</h1>

    <USelect
      v-model="mode"
      :items="items"
      class="w-48"
      color="white"
    />

    <div v-if="mode === 'Одна симкарта'" class="space-y-4">
      <UInput
        v-model="phone"
        placeholder="+79149996677"
        class="max-w-md mr-3"
      />
      <UButton :loading="loading" @click="fetchSingleBalance" color="primary" class="flex items-center justify-center">Получить баланс</UButton>

      <div v-if="result" class="text-white mt-4">
        <p v-if="result.balance">Баланс {{ result.phone }}: <b>{{ result.balance }} ₽</b></p>
        <p v-else class="text-red-400">Ошибка: {{ result.error }}</p>
      </div>
    </div>

    <div v-else class="space-y-4">
      <UButton :loading="loading" @click="fetchAllBalances" color="primary" class="flex items-center justify-center">Получить все балансы</UButton>

      <div v-if="allBalances" class="text-white mt-4 space-y-2">
        <div v-for="(balance, phone) in allBalances" :key="phone" class="border-b border-gray-600 pb-2">
          <p>
            {{ phone }}: 
            <span v-if="balance === 'busy'" class="text-yellow-400">Симкарта занята</span>
            <span v-else><b>{{ balance }} ₽</b></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'

const mode = ref('Одна симкарта')
const items = ref(['Одна симкарта', 'Все симкарты'])
const phone = ref('')
const result = ref(null)
const allBalances = ref(null)
const loading = ref(false)

const fetchSingleBalance = async () => {
  result.value = null
  loading.value = true
  try {
    const res = await fetch(`/api/debug/balance?from=${encodeURIComponent(phone.value)}`)
    const data = await res.json()
    result.value = data
  } catch (e) {
    result.value = { error: 'Ошибка запроса' }
  } finally {
    loading.value = false
  }
}

const fetchAllBalances = async () => {
  allBalances.value = null
  loading.value = true
  try {
    const res = await fetch('/api/debug/allbalances')
    console.log(res)
    const data = await res.json()
    allBalances.value = data
  } catch (e) {
    allBalances.value = { error: 'Ошибка запроса' }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
body {
  background-color: #0F172B;
}
</style>
