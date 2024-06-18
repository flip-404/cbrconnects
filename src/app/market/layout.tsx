'use client'

import LayoutByDepth from '@/layouts/LayoutByDepth'

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutByDepth href="/market">{children}</LayoutByDepth>
}
