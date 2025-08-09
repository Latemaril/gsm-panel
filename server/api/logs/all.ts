export default defineEventHandler(async () => {
  try {
    const res = await fetch('http://gsm.whalepay.ru:7777/gsm/api/logs?numbers=10000')
    const text = await res.text()
    return text
  } catch (err) {
    // вернём ошибку в понятном виде
    return { error: 'Ошибка при получении всех логов' }
  }
})
