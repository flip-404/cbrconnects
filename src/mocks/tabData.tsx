import RecentIcon from '@/assets/desktop/mainTabs/recent_icon.svg'
import CommunityIcon from '@/assets/desktop/mainTabs/community_icon.svg'
import JobIcon from '@/assets/desktop/mainTabs/job_icon.svg'
import MarketIcon from '@/assets/desktop/mainTabs/market_icon.svg'
import RentShareIcon from '@/assets/desktop/mainTabs/rentshare_icon.svg'

const tabData = [
  { id: 0, icon: <RecentIcon />, label: '최신글', category: 'all' },
  { id: 1, icon: <CommunityIcon />, label: '커뮤니티', category: 'community' },
  { id: 2, icon: <JobIcon />, label: '구인/구직', category: 'job' },
  { id: 3, icon: <MarketIcon />, label: '쿼카마켓', category: 'market' },
  { id: 4, icon: <RentShareIcon />, label: '렌트/쉐어', category: 'rentshare' },
  { id: 4, icon: <RentShareIcon />, label: '업소록', category: 'business' },
]

export default tabData
