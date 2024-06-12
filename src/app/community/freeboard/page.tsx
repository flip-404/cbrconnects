'use client'

import FixedPostList from '@/app/_components/FixedPostList'
import PostList from '@/app/_components/PostList'
import { marketData } from '@/mocks/PostList'

function FreeBoard() {
  return (
    <div className="flex flex-col gap-[40px] items-center mt-[40px]">
      <div className="w-[1100px] grid grid-cols-2 justify-items-center items-center gap-[20px]">
        <FixedPostList href="/community/announcement" label="공지사항" />
        <FixedPostList href="/community/announcement" label="최근 게시물" />
      </div>
      <div className="flex justify-center">
        <div className="w-[1100px] grid grid-cols-1 justify-items-center items-center gap-[20px]">
          <PostList
            href="/community/freeboard"
            label="자유게시판"
            data={marketData}
            displayAll={false}
          />
        </div>
      </div>
    </div>
  )
}

export default FreeBoard
