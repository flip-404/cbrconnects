const buildQuery = (
  paramsObject: Record<string, string | undefined | false>,
): string => {
  const params = new URLSearchParams()

  Object.entries(paramsObject).forEach(([key, value]) => {
    if (value) {
      params.append(key, value)
    }
  })

  return params.toString()
}

export default buildQuery
