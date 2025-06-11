export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

export function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN')
}

export function formatUrl(baseUrl, queryParams = {}) {
  const url = new URL(baseUrl)

  for (const [key, value] of Object.entries(queryParams)) {
    url.searchParams.set(key, value)
  }

  return url.toString()
}