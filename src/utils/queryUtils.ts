const buildQuery = (
  paramsObject: Record<string, string | undefined | false | number>,
): string => {
  const params = new URLSearchParams()

  Object.entries(paramsObject).forEach(([key, value]) => {
    if (value) {
      params.append(key, value as string)
    }
  })

  return params.toString()
}

export default buildQuery
