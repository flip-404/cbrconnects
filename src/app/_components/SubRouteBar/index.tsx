'use client'

import cls from '@/utils/cls'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type SubNav = { id: string; label: string; href: string }

interface SubNavsType {
  community: SubNav[]
  business: SubNav[]
  job: SubNav[]
  market: SubNav[]
  rentshare: SubNav[]
}

const subNavs: SubNavsType = {
  community: [
    { id: 'announcement', label: '공지사항', href: '/community/announcement' },
    { id: 'freeboard', label: '자유게시판', href: '/community/freeboard' },
    { id: 'club', label: '동호회/모임', href: '/community/club' },
    { id: 'news', label: '호주뉴스', href: '/community/news' },
    { id: 'yesmigration', label: '예스이민', href: '/community/yesmigration' },
    { id: 'parcel', label: '한인전문택배', href: '/community/parcel' },
  ],
  business: [],
  job: [
    { id: 'joboffer', label: '구인', href: '/job/joboffer' },
    { id: 'jobsearch', label: '구직', href: '/job/jobsearch' },
  ],
  market: [],
  rentshare: [
    { id: 'rent', label: '렌트', href: '/rentshare/rent' },
    { id: 'share', label: '쉐어', href: '/rentshare/share' },
  ],
}

function SubRouteBar() {
  const pathname = usePathname()

  const renderLinks = () => {
    const currentRouteKey = Object.keys(subNavs).find((key) =>
      pathname.startsWith(`/${key}`),
    ) as keyof SubNavsType | undefined

    if (currentRouteKey && subNavs[currentRouteKey].length !== 0) {
      return (
        <div className="flex justify-evenly bg-gray-50 rounded-xl py-[10px] px-[150px] shadow-lg  shadow-t-neutral-200">
          {subNavs[currentRouteKey].map((route) => (
            <Link
              key={route.id}
              href={route.href}
              className={cls(
                pathname === route.href ? 'text-[#01A69F]' : '',
                'text-[16px] font-[600] hover:bg-slate-100 rounded-xl py-[10px] px-[20px]',
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>
      )
    }
    return []
  }

  return renderLinks()
}

export default SubRouteBar
