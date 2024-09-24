'use client'

import FirstDepthLayout from './FirstDepthLayout'

export default function LayoutByDepth({
  children,
}: {
  children: React.ReactNode
}) {
  return <FirstDepthLayout>{children}</FirstDepthLayout>
}
