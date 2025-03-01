const buildQuery = (paramsObject: Record<string, string | undefined>): string => {
  const params = new URLSearchParams()

  Object.entries(paramsObject).forEach(([key, value]) => {
    if (value) {
      params.append(key, value as string)
    }
  })

  return params.toString()
}

export default buildQuery
