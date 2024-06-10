'use client'

import NotificationBar from '../_components/NotificationBar'
import RecentPostBar from '../_components/RecentPostBar'

function Community() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex mt-[20px] p-[4px] rounded-xl gap-[20px] ">
        <NotificationBar />
        <RecentPostBar />
      </div>
    </div>
  )
}

export default Community
