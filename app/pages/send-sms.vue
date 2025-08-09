<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-white">Отправка SMS</h1>
    <div class="space-y-4 max-w-lg w-xs ">
      <div class="flex flex-col w-xs">
        <UForm :state="state" :validate="validate" @submit="onSubmit" class="flex flex-col justify-between gap-3">
          <UFormField name="recieverNumber" label="Номер получателя">
            <UInput
              v-model="to"
              placeholder="+79997776655"
              icon="i-lucide-smartphone"
              size="lg"
            />
          </UFormField>
          <UFormField label="Текст сообщения">
            <UTextarea
              v-model="text"
              placeholder="Текст сообщения"
              autoresize
            />
          </UFormField>
          <UFormField label="Опционально: номер сим-карты отправителя">
            <UInput
              v-model="from"
              placeholder="+79997776655"
              icon="i-lucide-card-sim"
              size="lg"
            />
          </UFormField>
          <UButton :loading="loading" @click="sendSms" color="primary" class="max-w-45 w-35 flex items-center justify-center">Отправить SMS</UButton>
        </UForm>
      </div>
    </div>

    <div v-if="result" class="mt-6 text-white">
      <p v-if="result.status === 'Successfully Sent to Message Queue'" class="text-green-400">Сообщение успешно отправлено!</p>
      <p v-else class="text-red-400">Ошибка: {{ result.error }}</p>
    </div>
  </div>
</template>

<script setup>
const to = ref('')
const text = ref('')
const from = ref('')
const result = ref(null)
const loading = ref(false)

const sendSms = async () => {
  result.value = null
  loading.value = true

  try {
    const query = from.value ? `?from=${encodeURIComponent(from.value)}` : ''
    const res = await fetch(`/api/2fa/send-sms${query}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: to.value, text: text.value })
    })
    const data = await res.json()
    result.value = data
  } catch (e) {
    result.value = { error: 'Ошибка при выполнении запроса' }
  } finally {
    loading.value = false
  }
}
</script>
