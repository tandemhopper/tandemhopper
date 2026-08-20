export function imageUrl(src, width = 1400, quality = 82) {
  if (!src || !src.includes('cdn.sanity.io/images/')) return src
  const separator = src.includes('?') ? '&' : '?'
  return `${src}${separator}w=${width}&fit=max&auto=format&q=${quality}`
}
