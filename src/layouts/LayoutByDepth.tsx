'use client'

import { usePathname } from 'next/navigation'
import FirstDepthLayout from './FirstDepthLayout'
import SecondDepthLayout from './SecondDepthLayout'

export default function LayoutByDepth({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) {
  const pathname = usePathname()

  return pathname === href ? (
    <FirstDepthLayout>{children}</FirstDepthLayout>
  ) : (
    <SecondDepthLayout>{children}</SecondDepthLayout>
  )
}
