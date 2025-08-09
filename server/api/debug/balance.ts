export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  if (!query.from) {
    return { error: 'Параметр "from" обязателен' }
  }

  const url = `http://gsm.whalepay.ru:7777/gsm/api/debug/balance?from=${encodeURIComponent(query.from as string)}`

  try {
    const res = await fetch(url)
    const data = await res.json()
    return data
  } catch (error) {
    return { error: 'Ошибка при запросе к API баланса' }
  }
})
