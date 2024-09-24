'use client'

import LayoutByDepth from '@/layouts/LayoutByDepth'

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutByDepth>{children}</LayoutByDepth>
}
