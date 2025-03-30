import AnnounceSection from './AnnounceSection'
import ChatSection from './ChatSection'
import LinksSection from './LinksSection'
import LoginButton from './LoginButton'
import { root_container } from './MobileHome.css'
import NewsSection from './NewsSection'
import RecentSection from './RecentSection'
import StorySection from './StorySection'

// todo: StorySection 구현
// todo: NoticeSection 구현 -> 프로모션 같이?
export default function MobileHome() {
  return (
    <div className={root_container}>
      <LoginButton />
      <StorySection />
      <ChatSection />
      <NewsSection />
      <RecentSection />
      <AnnounceSection />
      <LinksSection />
    </div>
  )
}
