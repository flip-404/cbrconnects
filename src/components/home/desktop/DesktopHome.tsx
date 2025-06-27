'use client'

import PostBoard from '@/components/NewComponent/PostBoard'
import PinnedBoard from '@/components/NewComponent/PinnedBoard'
import NewsBoard from '@/components/NewComponent/NewsBoard'
import { boardLinks } from '../../Desktop/DesktopHeader'

export default function DesktopHome() {
  return (
    <div className="flex flex-col justify-center items-center mt-0 max-[1200px]:mt-[50px]">
      <div className="grid grid-cols-2 w-[900px] pt-[15px]">
        <PinnedBoard category={boardLinks[0].category} />
        <PinnedBoard category={boardLinks[4].category} />
      </div>

      <NewsBoard />

      <div className="mt-[40px] grid grid-cols-3 w-[1300px]">
        <PostBoard title={boardLinks[1].label} category={boardLinks[1].category} />
        <PostBoard title={boardLinks[2].label} category={boardLinks[2].category} />
        <PostBoard title={boardLinks[3].label} category={boardLinks[3].category} />
      </div>
    </div>
  )
}
