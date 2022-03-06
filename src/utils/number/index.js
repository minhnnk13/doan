const formatNumber = (value, decimalLength, partLength, sectionDeLimiter, decimalDelimiter) => {
  if (typeof value === 'string') {
    const regex = /^-?\d+\.?\d*$/

    if (regex.test(value)) value = Number.parseFloat(value)
  }

  if (typeof value !== 'number') return false

  const regex = '\\d(?=(\\d{' + (partLength || 3) + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')'
  const num = value.toFixed(Math.max(0, ~~decimalLength))

  return (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(regex, 'g'), '$&' + (sectionDeLimiter || ','))
}

export default formatNumber
