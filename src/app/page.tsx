'use client'

import styled from 'styled-components'
import { useState } from 'react'
import CommunityIcon from '@/assets/mainTabs/community_icon.svg'
import JobIcon from '@/assets/mainTabs/job_icon.svg'
import MarketIcon from '@/assets/mainTabs/market_icon.svg'
import RentShareIcon from '@/assets/mainTabs/rentshare_icon.svg'
import PromotionList from './_components/PromotionList'
import Sidebar from './_components/Sidebar'

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
          <Board>
            <Post>
              <Number>1</Number>
              <Content>
                <Title>눈썹 시술 하는 곳 추천부탁드립니다!</Title>
                <Detail>
                  2024-08-12 <span>|</span> 13시간 전
                </Detail>
              </Content>
            </Post>
            <Post>
              <Number>2</Number>
              <Content>
                <Title>눈썹 시술 하는 곳 추천부탁드립니다!</Title>
                <Detail>
                  2024-08-12 <span>|</span> 13시간 전
                </Detail>
              </Content>
            </Post>
            <Post>
              <Number>3</Number>
              <Content>
                <Title>눈썹 시술 하는 곳 추천부탁드립니다!</Title>
                <Detail>
                  2024-08-12 <span>|</span> 13시간 전
                </Detail>
              </Content>
            </Post>
            <Post>
              <Number>4</Number>
              <Content>
                <Title>눈썹 시술 하는 곳 추천부탁드립니다!</Title>
                <Detail>
                  2024-08-12 <span>|</span> 13시간 전
                </Detail>
              </Content>
            </Post>
            <Post>
              <Number>5</Number>
              <Content>
                <Title>눈썹 시술 하는 곳 추천부탁드립니다!</Title>
                <Detail>
                  2024-08-12 <span>|</span> 13시간 전
                </Detail>
              </Content>
            </Post>
          </Board>
        </BoardSection>
        <PromotionList />
      </BodySection>
      <Sidebar />
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

const BoardSection = styled.div`
  margin-bottom: 22px;
`

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

const Board = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;

  padding: 15px 9px 15px 9px;
  border-radius: 16px;
  background: #f6f8ff;
`

const Post = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 0px 20px 18px;
`

const Number = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e2e8fd;
  width: 28px;
  height: 28px;
  border-radius: 999px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Title = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  color: #222222;
`

const Detail = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  color: #878787;
`
