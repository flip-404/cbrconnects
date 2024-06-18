'use client'

import { marketData } from '@/mocks/PostList'
import FixedPostList from '@/app/_components/FixedPostList'
import PostList from '@/app/_components/PostList'
import NavsData, { NavsDataType } from '@/mocks/NavsData'
import { usePathname } from 'next/navigation'

export default function SecondDepthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const communityPath = pathname.split('/')[1]
  const firstNavItem: NavsDataType = NavsData.find(
    (item) => item.href === `/${communityPath}`,
  )!

  const secondNavItem: NavsDataType = firstNavItem.submenu!.find(
    (item) => item.href === pathname,
  )!

  return (
    <div className="flex flex-col gap-[40px] items-center mt-[40px]">
      <div className="w-[1100px] grid grid-cols-2 justify-items-center items-center gap-[20px]">
        <FixedPostList href="/community/announcement" label="공지사항" />
        <FixedPostList href="/community/announcement" label="최근 게시물" />
      </div>
      <div className="flex justify-center">
        <div className="w-[1100px] grid grid-cols-1 justify-items-center items-center gap-[20px]">
          <PostList
            href={secondNavItem?.href}
            label={secondNavItem?.label}
            data={marketData}
            displayAll={false}
          />
        </div>
      </div>
      {children}
    </div>
  )
}
