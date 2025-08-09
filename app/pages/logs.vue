<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-white">Просмотр логов</h1>

    <div class="flex gap-4 items-center">
      <div class="text-sm text-gray-300">
        Всего логов: {{ totalLogs }} — Страниц: {{ totalPages }}
      </div>
    </div>

    <div class="bg-gray-900 rounded-lg p-4 max-h-max  overflow-auto border border-gray-700">
      <div v-if="loading" class="text-gray-400">Загрузка...</div>
      <div v-else-if="error" class="text-red-400">{{ error }}</div>
      <div v-else>
        <div v-for="(log, i) in displayedLogs" :key="`${page}-${i}`">
          <pre class="text-sm text-white m-0 p-0 font-mono">{{ log }}</pre>
        </div>
        <div v-if="!displayedLogs.length" class="text-gray-400">Нет логов для показа</div>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <UPagination
        v-model="page"
        :items-per-page="itemsPerPage"
        :total="totalLogs"
        @update:page="loadPage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'

const page = ref(1)
const itemsPerPage = 30

const totalLogs = ref(0)
const logs = ref([])
const loading = ref(false)
const error = ref(null)

const ws = ref(null)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(totalLogs.value / itemsPerPage))
)

async function fetchTotalLogs() {
  try {
    const res = await fetch('/api/logs/length')
    const data = await res.json()
    if (data.error) throw new Error(data.error)
    totalLogs.value = Number(data) || 0
  } catch (e) {
    error.value = e.message || 'Ошибка при получении количества логов'
  }
}

async function fetchLogsForPage(p) {
  try {
    const res = await fetch(`/api/logs/page?page=${p}`)
    const text = await res.text()
    logs.value = text.split(/\r?\n/).filter(Boolean)
  } catch (e) {
    error.value = e.message || 'Ошибка при получении логов страницы'
    logs.value = []
  }
}

async function loadPage(p = page.value) {
  loading.value = true
  error.value = null
  await fetchTotalLogs()
  await fetchLogsForPage(p)
  loading.value = false
  setupWebSocketIfNeeded()
}

function setupWebSocketIfNeeded() {
  closeWebSocket()
  if (page.value !== 1) return

  ws.value = new WebSocket('ws://45.152.170.77:7710')

  ws.value.onmessage = (event) => {
  // Разбиваем входящее сообщение на строки
  const newLogs = event.data
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean)

  if (!newLogs.length) return

  // Добавляем в начало массива
  logs.value.unshift(...newLogs)

  // Если стало больше, чем itemsPerPage — обрезаем
  if (logs.value.length > itemsPerPage) {
    logs.value = logs.value.slice(0, itemsPerPage)
  }
}

  ws.value.onerror = () => {
    console.error('Ошибка WebSocket')
  }

  ws.value.onclose = () => {
    console.log('WebSocket закрыт')
  }
}

function closeWebSocket() {
  if (ws.value) {
    ws.value.close()
    ws.value = null
  }
}

onMounted(() => {
  loadPage(1)
})

watch(page, (newPage) => {
  loadPage(newPage)
})

onBeforeUnmount(() => {
  closeWebSocket()
})

const displayedLogs = computed(() => logs.value)
</script>
