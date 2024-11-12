'use client'

import LayoutByDepth from '@/layouts/LayoutByDepth'

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutByDepth>{children}</LayoutByDepth>
}
