'use client'

import styled from 'styled-components'
import { useState } from 'react'
import RecentIcon from '@/assets/desktop/mainTabs/recent_icon.svg'
import CommunityIcon from '@/assets/desktop/mainTabs/community_icon.svg'
import JobIcon from '@/assets/desktop/mainTabs/job_icon.svg'
import MarketIcon from '@/assets/desktop/mainTabs/market_icon.svg'
import RentShareIcon from '@/assets/desktop/mainTabs/rentshare_icon.svg'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import { PostWithRelations } from '@/types'
import { useRouter } from 'next/navigation'
import PromotionList from '../../_components/PromotionList'
import Sidebar from '../../_components/Sidebar'
import MainPost from '../../_components/MainPost'
import MainPostSkeleton from '../../_components/MainPost/MainPostSkeleton'

const tabData = [
  { id: 0, icon: <RecentIcon />, label: '최신글', category: 'all' },
  { id: 1, icon: <CommunityIcon />, label: '커뮤니티', category: 'community' },
  { id: 2, icon: <JobIcon />, label: '구인/구직', category: 'job' },
  { id: 3, icon: <MarketIcon />, label: '쿼카마켓', category: 'market' },
  { id: 4, icon: <RentShareIcon />, label: '렌트/쉐어', category: 'rentshare' },
]

export default function DesktopHome() {
  const [boardTab, setBoardTab] = useState(0)
  const { data: postsByCategory, isLoading } = useSWR(
    `/api/main?limit=5`,
    fetcher,
  )

  const router = useRouter()

  const handleMoveToPost = (postId: number) => {
    router.push(`/posts?postId=${postId}`)
  }

  return (
    <LayoutWrapper>
      <BodySection>
        <EventSection>
          <FirstEventImage src="/FirstEventImage.png" alt="캔버라커넥트" />
          <SecondEventImage src="/SecondEventImage.png" alt="캔버라커넥트" />
        </EventSection>
        <BoardSection>
          <BoardTitle>
            최근 올라온 게시글 <span>오늘 00시 기준</span>
          </BoardTitle>
          <BoardBody>
            <Tabs>
              {tabData.map((tab) => (
                <Tab
                  key={tab.id}
                  onClick={() => setBoardTab(tab.id)}
                  $isActive={boardTab === tab.id}
                >
                  {tab.icon}
                  {tab.label}
                </Tab>
              ))}
            </Tabs>
            <Board>
              {isLoading ? (
                <MainPostSkeleton />
              ) : (
                postsByCategory[tabData[boardTab].category].map(
                  (post: PostWithRelations, index: number) => (
                    <MainPost
                      key={post.id}
                      handleMoveToPost={handleMoveToPost}
                      post={post}
                      index={index}
                    />
                  ),
                )
              )}
            </Board>
          </BoardBody>
        </BoardSection>
        <PromotionList />
      </BodySection>
      <Sidebar />
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled.div`
  margin-top: 80px;
  display: flex;
  gap: 70px;
  padding-left: 320px;
  padding-bottom: 100px;
`

const BodySection = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  padding-top: 32px;
  gap: 24px;
`

const EventSection = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const FirstEventImage = styled.img`
  object-fit: cover;
  width: 306px;
  height: 366px;
`

const SecondEventImage = styled.img`
  object-fit: cover;
  width: 520px;
  height: 366px;
`

const BoardSection = styled.div`
  margin-top: 20px;
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const BoardTitle = styled.div`
  display: flex;
  align-items: end;
  font-family: Apple SD Gothic Neo;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  gap: 16px;

  span {
    color: #949494;
    font-size: 14px;
    font-weight: 400;
  }
`

const BoardBody = styled.div`
  display: flex;
  gap: 20px;
`

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  gap: 20px;
  width: 220px;
`

const Tab = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  color: ${(props) => (props.$isActive ? '#436AF5' : '#222222')};
  background-color: ${(props) => (props.$isActive ? '#F5F7FF' : 'transparent')};
`

const Board = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px 9px 15px 9px;
  border-radius: 16px;
  border: 1px solid #e4e4e4;
`
