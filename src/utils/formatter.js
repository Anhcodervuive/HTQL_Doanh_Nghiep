export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

export function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN')
}
