<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-white">Получение кода аутентификации банка</h1>

    <div class="space-y-4 max-w-lg w-xs">
      <UForm :state="state" :validate="validate" @submit="onSubmit" class="flex flex-col gap-4">
        <UFormField name="simNumber" label="Номер сим-карты">
          <UInput
            v-model="from"
            placeholder="+79141234567"
            icon="i-lucide-card-sim"
            size="lg"
          />
        </UFormField>

        <UButton :loading="loading" @click="fetchSms" color="primary" class="w-fit">Получить код</UButton>
      </UForm>
    </div>

    <div v-if="result" class="mt-6 text-white">
      <div v-if="result" class="space-y-2">
        <p><span class="font-semibold">Код банка:</span> {{ result }}</p>
      </div>
      <p v-else class="text-red-400">Ошибка: {{ result.error }}</p>
    </div>
  </div>
</template>

<script setup>
const from = ref('')
const result = ref(null)
const loading = ref(false)

const fetchSms = async () => {
  result.value = null
  loading.value = true
  try {
    const res = await fetch(`/api/whale/code?from=${encodeURIComponent(from.value)}`)
    const data = await res.json()
    result.value = data
  } catch (e) {
    result.value = { error: 'Ошибка при выполнении запроса' }
  } finally {
    loading.value = false
  }
}
</script>
