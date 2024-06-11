'use client'

const Notifications = [
  {
    id: 1,
    title: '[예스이민 세미나 안내] 6월 12일/ 점수제 방식 변화 발표 분석',
    author: '호주형',
    createdAt: '2024.05.29',
    views: '3',
  },
  {
    id: 2,
    title: '[예스이민 세미나 안내] 6월 12일/ 점수제 방식 변화 발표 분석',
    author: '호주형',
    createdAt: '2024.05.29',
    views: '3',
  },
  {
    id: 3,
    title: '[예스이민 세미나 안내] 6월 12일/ 점수제 방식 변화 발표 분석',
    author: '호주형',
    createdAt: '2024.05.29',
    views: '3',
  },
  {
    id: 4,
    title: '[예스이민 세미나 안내] 6월 12일/ 점수제 방식 변화 발표 분석',
    author: '호주형',
    createdAt: '2024.05.29',
    views: '3',
  },
  {
    id: 5,
    title: '[예스이민 세미나 안내] 6월 12일/ 점수제 방식 변화 발표 분석',
    author: '호주형',
    createdAt: '2024.05.29',
    views: '3',
  },
]

function RecentPostBar() {
  return (
    <div className="w-[400px] flex flex-col">
      <div className="flex w-full items-center justify-between text-[13px] font-[600]">
        <span className="flex gap-[4px] ">
          최신글{' '}
          <span className="bg-red-500 py-[1px] px-[6px] rounded-xl text-white text-[12px] font-[700]">
            5
          </span>
        </span>{' '}
        <span className="text-[#8d919c]">전체보기</span>
      </div>
      <table className="text-[13px] font-[700]">
        <tbody>
          {Notifications.map((notification) => (
            <tr className="flex justify-between" key={notification.id}>
              <td className="w-[300px] text-left whitespace-nowrap overflow-hidden text-ellipsis">
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

export default RecentPostBar
