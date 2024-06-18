/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import Link from 'next/link'

// import PostListItem from './PostListItem'

type PostListProps = {
  href: string
  label: string
  data: any
  displayAll: boolean
}

function PostList({ href, label, data, displayAll }: PostListProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <Link href={href} className="text-[36px] text-[#3B4890] font-[700]">
          {label}
        </Link>
        <Link href={href} className="text-[#868E96] font-[500]">
          화살표 아이콘
        </Link>
      </div>
      <div className="flex flex-col">
        {data.map((el: any) => (
          <div
            key={el.id}
            className="flex justify-between items-center first:border-t px-[2px] py-[5px] border-b border-gray-200"
          >
            <div className="flex flex-col">
              <div>
                <h3 className="text-[16px] font-[500]">
                  {el.title}
                  <span>{el.comment.length}</span>
                </h3>
              </div>
              <div className="flex gap-[5px] text-[14px] text-[#868E96]">
                <span>{el.author}</span>·<span>{el.date}</span>·
                <span>조회수 {el.view}</span>·<span>{el.like}</span>
              </div>
            </div>
            <div>{el.title && <img alt="임시 사진" src={el.thumbnail} />}</div>
          </div>
        ))}
      </div>
      {/* <PostListItem> */}
    </div>
  )
}

export default PostList
