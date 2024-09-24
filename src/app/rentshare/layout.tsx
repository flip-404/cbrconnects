'use client'

import LayoutByDepth from '@/layouts/LayoutByDepth'

export default function RentShareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutByDepth>{children}</LayoutByDepth>
}
