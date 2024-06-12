'use client'

import { marketData } from '@/mocks/PostList'
import FixedPostList from '../_components/FixedPostList'
import PostList from '../_components/PostList'

function Community() {
  return (
    <div className="flex flex-col gap-[40px] items-center mt-[40px]">
      <div className="w-[1100px] grid grid-cols-2 justify-items-center items-center gap-[20px]">
        <FixedPostList href="/community/announcement" label="공지사항" />
        <FixedPostList href="/community/announcement" label="최근 게시물" />
      </div>
      <div className="flex justify-center">
        <div className="w-[1100px] grid grid-cols-2 justify-items-center items-center gap-[20px]">
          <PostList
            href="/community/freeboard"
            label="자유게시판"
            data={marketData}
            displayAll={false}
          />
          <PostList
            href="/community/club"
            label="동호회/모임"
            data={marketData}
            displayAll={false}
          />
          <PostList
            href="/community/news"
            label="호주뉴스"
            data={marketData}
            displayAll={false}
          />
          <PostList
            href="/community/yesmigration"
            label="예스이민"
            data={marketData}
            displayAll={false}
          />
          <PostList
            href="/community/parcel"
            label="한인 전문 택배"
            data={marketData}
            displayAll={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Community
