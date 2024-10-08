'use client'

import LayoutByDepth from '@/layouts/LayoutByDepth'

export default function JobLayout({ children }: { children: React.ReactNode }) {
  return <LayoutByDepth>{children}</LayoutByDepth>
}
