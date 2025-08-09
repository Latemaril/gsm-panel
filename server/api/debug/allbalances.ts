export default defineEventHandler(async () => {
  const res = await fetch('http://gsm.whalepay.ru:7777/gsm/api/debug/allbalances')
  const data = await res.json()
  return data
})
