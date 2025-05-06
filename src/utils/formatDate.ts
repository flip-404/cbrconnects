export function formatPostDate(isoString: string): string {
  const postDate = new Date(isoString)
  const now = new Date()

  const KST_OFFSET = 9 * 60 * 60 * 1000
  const kstPostDate = new Date(postDate.getTime() + KST_OFFSET)
  const kstNow = new Date(now.getTime() + KST_OFFSET)

  const diffMs = kstNow.getTime() - kstPostDate.getTime()
  const diffMinutes = Math.floor(diffMs / 1000 / 60)
  const diffHours = Math.floor(diffMinutes / 60)

  const startOfToday = new Date(kstNow.getFullYear(), kstNow.getMonth(), kstNow.getDate())
  const startOfPostDate = new Date(
    kstPostDate.getFullYear(),
    kstPostDate.getMonth(),
    kstPostDate.getDate(),
  )
  const diffDays = Math.floor(
    (startOfToday.getTime() - startOfPostDate.getTime()) / (1000 * 60 * 60 * 24),
  )

  if (diffDays === 0) {
    if (diffMinutes < 60) {
      return `${diffMinutes}분 전`
    }
    return `${diffHours}시간 전`
  }
  if (diffDays === 1) {
    return '어제'
  }
  if (diffDays === 2) {
    return '2일 전'
  }
  return kstPostDate.toISOString().slice(0, 10) // YYYY-MM-DD
}
