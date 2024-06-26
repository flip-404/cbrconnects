'use client'

import LayoutByDepth from '@/layouts/LayoutByDepth'

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutByDepth href="/community">{children}</LayoutByDepth>
}
