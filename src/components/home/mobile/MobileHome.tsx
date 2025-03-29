import ChatSection from './ChatSection'
import LoginButton from './LoginButton'
import { root_container } from './MobileHome.css'
import NewsSection from './NewsSection'
import RecentSection from './RecentSection'

export default function MobileHome() {
  return (
    <div className={root_container}>
      <LoginButton />
      <ChatSection />
      <NewsSection />
      <RecentSection />
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
