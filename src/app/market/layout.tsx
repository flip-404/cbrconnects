'use client'

import LayoutByDepth from '@/layouts/LayoutByDepth'

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutByDepth>{children}</LayoutByDepth>
}
