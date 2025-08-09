export default defineEventHandler(async () => {
  try {
    const res = await fetch('http://gsm.whalepay.ru:7777/gsm/api/logs-length')
    const data = await res.json()
    return data
  } catch {
    return { error: 'Ошибка при получении количества логов' }
  }
})
