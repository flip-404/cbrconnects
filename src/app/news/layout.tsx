'use client'

import LayoutByDepth from '@/layouts/LayoutByDepth'

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutByDepth href="/news">{children}</LayoutByDepth>
}
