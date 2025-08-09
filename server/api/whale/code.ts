export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  if (!query.from) {
    return { error: 'Нужно указать from' }
  }

  const url = `http://gsm.whalepay.ru:7777/gsm/api/whale/code?from=${encodeURIComponent(query.from as string)}`

  try {
    const res = await fetch(url)
    const data = await res.json()
    return data
  } catch (e) {
    return { error: 'Ошибка при получении кода' }
  }
})
