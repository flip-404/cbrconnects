'use client'

import cls from '@/utils/cls'
import Link from 'next/link'

const Notifications = [
  {
    id: 1,
    postType: 'notification',
    title: '[알뜰요금제-중나유심] 이달의 독점 혜택 받기!',
    author: '운영자',
    createdAt: '2023.04.01',
    views: '3',
  },
  {
    id: 2,
    postType: 'event',
    title: '[알뜰요금제-중나유심] 이달의 독점 혜택 받기!',
    author: '운영자',
    createdAt: '2023.04.01',
    views: '3',
  },
  {
    id: 4,
    postType: 'notification',
    title: '[알뜰요금제-중나유심] 이달의 독점 혜택 받기!',
    author: '운영자',
    createdAt: '2023.04.01',
    views: '3',
  },
  {
    id: 5,
    postType: 'event',
    title: '[알뜰요금제-중나유심] 이달의 독점 혜택 받기!',
    author: '운영자',
    createdAt: '2023.04.01',
    views: '3',
  },
  {
    id: 6,
    postType: 'event',
    title: '[알뜰요금제-중나유심] 이달의 독점 혜택 받기!',
    author: '운영자',
    createdAt: '2023.04.01',
    views: '3',
  },
]

type FixedPostListProps = {
  href: string
  label: string
}

function FixedPostList({ href = '', label }: FixedPostListProps) {
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between text-[13px] font-[600]">
        <Link href={href} className="flex gap-[4px] ">
          {label}
          <span className="bg-red-500 py-[1px] px-[6px] rounded-xl text-white text-[12px] font-[700]">
            16
          </span>
        </Link>{' '}
        <Link href={href} className="text-[#8d919c]">
          전체보기
        </Link>
      </div>
      <table className="text-[13px] font-[700]">
        <tbody>
          {Notifications.map((notification) => (
            <tr className="flex justify-between" key={notification.id}>
              <td className="flex gap-2 w-[300px] text-left whitespace-nowrap overflow-hidden text-ellipsis">
                <span
                  className={cls(
                    'rounded-md px-[2px]',
                    notification.postType === 'notification'
                      ? 'border border-red-400 text-red-400 '
                      : 'border border-green-400 text-green-400',
                  )}
                >
                  {notification.postType === 'notification' ? '공지' : '이벤트'}
                </span>
                {notification.title}
              </td>
              <td className="w-[100px] text-right whitespace-nowrap overflow-hidden text-ellipsis">
                {notification.createdAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FixedPostList
