'use client'

import LayoutByDepth from '@/layouts/LayoutByDepth'

export default function NoticeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutByDepth>{children}</LayoutByDepth>
}
