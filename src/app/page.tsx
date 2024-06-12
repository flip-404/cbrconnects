'use client'

import Image from 'next/image'
import {
  recruitmentData,
  marketData,
  rentData,
  businessData,
  yesmigrationData,
  parcelData,
  clubData,
} from '@/mocks/PostList'
import TempImage from './tempEventImg.png'
import PostListCard from './_components/PostListCard'
import BusinessSwiper from './_components/BusinessSwiper'
import WeatherWidget from './_components/WeatherWidget'
import NotificationBar from './_components/NotificationBar'
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
          <NotificationBar />
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
          <PostListCard lable="📋 자유게시판" data={recruitmentData} />
          <PostListCard lable="🚴🏻 동호회/모임" data={recruitmentData} />
          <PostListCard lable="📰 호주뉴스" data={recruitmentData} />
          <PostListCard
            lable="🙋🏻 예스이민 & 호주형 유학"
            data={recruitmentData}
          />
          <PostListCard lable="📦 한인 전문 택배 " data={recruitmentData} />
          <PostListCard lable="📢 업소 홍보" data={recruitmentData} />
          <PostListCard lable="🔎 구인" data={recruitmentData} />
          <PostListCard lable="🙋🏻 구직" data={recruitmentData} />
          <PostListCard lable="🍎 쿼카마켓" data={recruitmentData} />
          <PostListCard lable="🚗 렌트" data={recruitmentData} />
          <PostListCard lable="🏘️ 쉐어" data={recruitmentData} />
        </div>
      </div>
    </div>
  )
}
