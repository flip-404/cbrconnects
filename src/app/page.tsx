'use client'

import Image from 'next/image'
import styled from 'styled-components'
import TempImage from './tempEventImg.png'
import PostListCard from './_components/PostListCard'
import BusinessSwiper from './_components/BusinessSwiper'
import FixedPostList from './_components/FixedPostList'
import CalendarWidget from './_components/CalendarWidget'

export default function Home() {
  return (
    <Container>
      <WidgetWrapper>
        {/* <WidgetBox>
          <WeatherWidget />
        </WidgetBox> */}
        <div>
          <FixedPostList href="/posts" label="공지사항" />
        </div>
      </WidgetWrapper>

      <WidgetWrapper>
        <ImageWrapper>
          <StyledImage
            alt="진행 중인 이벤트"
            src={TempImage}
            width={400}
            height={400}
          />
        </ImageWrapper>
        <ImageWrapper>
          <StyledImage
            alt="진행 중인 이벤트"
            src={TempImage}
            width={400}
            height={400}
          />
        </ImageWrapper>

        <CalendarWidget />
      </WidgetWrapper>

      <GridWrapper>
        <GridContainer>
          <PostListCard
            mainCategory="community"
            href="/community"
            lable="🏙️ 커뮤니티"
          />
          <PostListCard
            mainCategory="community"
            subCategory="business"
            href="/community/business"
            lable="🏘️ 업소록"
          />
          <PostListCard mainCategory="job" href="/job" lable="🙋🏻 구인/구직" />
        </GridContainer>
      </GridWrapper>

      <SectionWrapper>
        <BusinessSwiper />
      </SectionWrapper>

      <GridWrapper>
        <GridContainer>
          <PostListCard
            mainCategory="market"
            href="/market"
            lable="🍎 쿼카마켓"
          />
          <PostListCard
            mainCategory="rentshare"
            href="/rentshare"
            lable="🚗 렌트/쉐어"
          />
        </GridContainer>
      </GridWrapper>
    </Container>
  )
}
const Container = styled.div`
  background-color: #eff0f3;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const WidgetWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`

// const WidgetBox = styled.div`
//   padding: 10px;
//   background-color: #cbd5e0;
//   border-radius: 0.5rem;
// `

const ImageWrapper = styled.div`
  display: flex;
  border: 1px solid #e2e8f0;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 400px;
`

const StyledImage = styled(Image)`
  border: 1px solid #e2e8f0;
`

const GridWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  gap: 20px;
`

const SectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`
