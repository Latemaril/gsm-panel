export default defineEventHandler(async (event) => {
  const { page } = getQuery(event)

  if (!page) {
    return { error: 'Укажите номер страницы' }
  }

  try {
    const res = await fetch(`http://gsm.whalepay.ru:7777/gsm/api/logs?page=${encodeURIComponent(String(page))}`)
    const text = await res.text()
    return text
  } catch (err) {
    return { error: 'Ошибка при получении логов страницы' }
  }
})
