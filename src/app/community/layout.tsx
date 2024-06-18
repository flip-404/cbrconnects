'use client'

import FirstDepthLayout from '@/layouts/FirstDepthLayout'
import SecondDepthLayout from '@/layouts/SecondDepthLayout'
import { usePathname } from 'next/navigation'

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return pathname === '/community' ? (
    <FirstDepthLayout>{children}</FirstDepthLayout>
  ) : (
    <SecondDepthLayout>{children}</SecondDepthLayout>
  )
}
