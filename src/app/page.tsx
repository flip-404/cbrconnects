'use client'

import Image from 'next/image'
import styled from 'styled-components'
import TempImage from './tempEventImg.png'
import MainPostList from './_components/MainPostList'
import FixedPostList from './_components/FixedPostList'
import CalendarWidget from './_components/CalendarWidget'

export default function Home() {
  return (
    <Container>
      <FixedPostList href="/posts" label="공지사항" />
      <MainBannerSection>
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
      </MainBannerSection>
      <GridSection>
        <GridContainer>
          <MainPostList
            mainCategory="community"
            href="/community"
            lable="커뮤니티"
          />
          <MainPostList mainCategory="job" href="/job" lable="구인/구직" />
          <MainPostList mainCategory="market" href="/market" lable="쿼카마켓" />
          <MainPostList
            mainCategory="rentshare"
            href="/rentshare"
            lable="렌트/쉐어"
          />
        </GridContainer>
      </GridSection>
    </Container>
  )
}

const Container = styled.div`
  background-color: #eff0f3;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-bottom: 100px;
`

const MainBannerSection = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`

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
const GridSection = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 25px;
  width: 100%;
  max-width: 1200px;
`
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 30px;
  width: 100%;
  max-width: 1200px;
`
