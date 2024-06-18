'use client'

import { marketData } from '@/mocks/PostList'
import FixedPostList from '@/app/_components/FixedPostList'
import PostList from '@/app/_components/PostList'
import NavsData, { NavsDataType } from '@/mocks/NavsData'
import { usePathname } from 'next/navigation'

export default function FirstDepthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const firstNavItem: NavsDataType = NavsData.find(
    (item) => item.href === pathname,
  )!

  return (
    <div className="flex flex-col gap-[40px] items-center mt-[40px]">
      <div className="w-[1100px] grid grid-cols-2 justify-items-center items-center gap-[20px]">
        <FixedPostList href="/community/announcement" label="공지사항" />
        <FixedPostList href="/community/announcement" label="최근 게시물" />
      </div>
      <div className="flex justify-center">
        <div className="w-[1100px] grid grid-cols-2 justify-items-center items-center gap-[20px]">
          {firstNavItem.submenu!.map((nav) => (
            <PostList
              key={nav.id}
              href={nav.href}
              label={nav.label}
              data={marketData}
              displayAll={false}
            />
          ))}
          {children}
        </div>
      </div>
    </div>
  )
}
