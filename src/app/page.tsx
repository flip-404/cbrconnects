'use client'

import Image from 'next/image'
import { jobData } from '@/mocks/PostList'
import TempImage from './tempEventImg.png'
import PostListCard from './_components/PostListCard'
import BusinessSwiper from './_components/BusinessSwiper'
import WeatherWidget from './_components/WeatherWidget'
import FixedPostList from './_components/FixedPostList'
import TradingViewWidget from './_components/TradingViewWidget'
import CalendarWidget from './_components/CalendarWidget'

export default function Home() {
  return (
    <div className="mt-[20px] flex flex-col gap-[20px]">
      <div className="flex gap-[20px] justify-center">
        <div className="px-[5px] py-[10px] bg-slate-100 rounded-lg">
          <WeatherWidget />
        </div>
        <div className="relative px-[5px] py-[10px] bg-slate-100 rounded-lg">
          <TradingViewWidget />
        </div>
        <div className="px-[5px] py-[10px] ">
          <FixedPostList href="/community/announcement" label="공지사항" />
        </div>
        <div />
        <div />
      </div>
      <div className="flex justify-center">
        <div className="flex border items-center justify-center w-[400px] h-[400px]">
          <Image
            alt="진행 중인 이벤트"
            src={TempImage}
            width={400}
            height={400}
          />
        </div>
        <div className="flex border items-center justify-center w-[400px] h-[400px]">
          <Image
            alt="진행 중인 이벤트"
            src={TempImage}
            width={400}
            height={400}
          />
        </div>
        <div className="flex border items-center justify-center w-[400px] h-[400px]">
          <CalendarWidget />
        </div>
      </div>
      <div className="flex justify-center">
        <BusinessSwiper />
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 justify-items-center items-center gap-[20px]">
          <PostListCard href="/community" lable="📋 커뮤니티" data={jobData} />
          <PostListCard href="/business" lable="🚴🏻 업소록" data={jobData} />
          <PostListCard href="/job" lable="📰 구인/구직" data={jobData} />
          <PostListCard href="/market" lable="📦 쿼카마켓" data={jobData} />
          <PostListCard href="/rentshare" lable="📢 렌트/쉐어" data={jobData} />
        </div>
      </div>
    </div>
  )
}
