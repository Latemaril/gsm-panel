export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const query = getQuery(event)

  if (!body.to || !body.text) {
    return { error: 'to и text обязательны' }
  }

  const queryStr = query.from ? `?from=${encodeURIComponent(query.from as string)}` : ''
  const url = `http://gsm.whalepay.ru:7777/gsm/api/2fa/send${queryStr}`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    return data
  } catch (e) {
    return { error: 'Ошибка при обращении к API отправки SMS' }
  }
})
