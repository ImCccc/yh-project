export const formatTime = (date?: Date) => {
  date = date || new Date()
  // const year = date.getFullYear()
  // const month = date.getMonth() + 1
  // const day = date.getDate()
  // const second = date.getSeconds()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return `${hour}:${formatNumber(minute)}`
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}
