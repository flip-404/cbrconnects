'use client'

import styled from 'styled-components'
import { useState } from 'react'
import CommunityIcon from '@/assets/mainTabs/community_icon.svg'
import JobIcon from '@/assets/mainTabs/job_icon.svg'
import MarketIcon from '@/assets/mainTabs/market_icon.svg'
import RentShareIcon from '@/assets/mainTabs/rentshare_icon.svg'
import CalendarWidget from './_components/CalendarWidget'
import NotificationBox from './_components/NotificationBox'

const tabData = [
  { id: 0, icon: <CommunityIcon />, label: '커뮤니티' },
  { id: 1, icon: <JobIcon />, label: '구인/구직' },
  { id: 2, icon: <MarketIcon />, label: '쿼카마켓' },
  { id: 3, icon: <RentShareIcon />, label: '렌트/쉐어' },
]

export default function Home() {
  const [boardTab, setBoardTab] = useState(0)

  return (
    <LayoutWrapper>
      <BodySection>
        <EventSection>
          <FirstEventImage src="/FirstEventImage.png" alt="캔버라커넥트" />
          <SecondEventImage src="/SecondEventImage.png" alt="캔버라커넥트" />
        </EventSection>
        <BoardSection>
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
        </BoardSection>
      </BodySection>
      <SidebarSection>
        <NotificationBox />
        <CalendarWidget />
      </SidebarSection>
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 70px;
  padding-left: 320px;
`

const BodySection = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  padding-top: 32px;
  gap: 24px;
`

const SidebarSection = styled.div`
  margin-top: 24px;
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

const BoardSection = styled.div``

const Tabs = styled.div`
  display: flex;
  justify-content: center;
`

const Tab = styled.div<{ $isActive: boolean }>`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  padding: 0px 55px 16px 55px;
  font-family: Pretendard;
  font-size: 20px;
  text-align: center;
  font-weight: ${(props) => (props.$isActive ? '800' : '600')};
  color: ${(props) => (props.$isActive ? '#436AF5' : '#222222')};
  ${(props) => props.$isActive && 'border-bottom: 1.6px solid #7085EF'}
`
