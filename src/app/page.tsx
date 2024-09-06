'use client'

import Image from 'next/image'
import styled from 'styled-components'
import TempImage from './tempEventImg.png'

import CalendarWidget from './_components/CalendarWidget'

export default function Home() {
  return (
    <Container>
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
