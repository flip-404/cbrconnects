'use client'

import Link from 'next/link'

function SubRouteBar() {
  return (
    <div className="flex justify-evenly bg-gray-50 rounded-xl py-[10px] px-[150px] shadow-lg  shadow-t-neutral-200">
      <Link
        href="/community"
        className="text-[16px] font-[600] text-[] hover:bg-slate-100 rounded-xl py-[10px] px-[20px]"
      >
        자유게시판
      </Link>
      <Link
        href="/community"
        className="text-[16px] font-[600] text-[] hover:bg-slate-100 rounded-xl py-[10px] px-[20px]"
      >
        업소 홍보
      </Link>
      <Link
        href="/community"
        className="text-[16px] font-[600] text-[] hover:bg-slate-100 rounded-xl py-[10px] px-[20px]"
      >
        한인 전문 택배
      </Link>
      <Link
        href="/community"
        className="text-[16px] font-[600] text-[] hover:bg-slate-100 rounded-xl py-[10px] px-[20px]"
      >
        동호회/모임
      </Link>
      <Link
        href="/community"
        className="text-[16px] font-[600] text-[] hover:bg-slate-100 rounded-xl py-[10px] px-[20px]"
      >
        최근글
      </Link>
    </div>
  )
}

export default SubRouteBar
