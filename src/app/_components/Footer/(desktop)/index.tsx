'use client'

import styled from 'styled-components'
import InstaIcon from '@/assets/desktop/footer_insta_icon.svg'
import KakaoIcon from '@/assets/desktop/footer_kakao_icon.svg'

function DesktopFooter() {
  return (
    <Container>
      <Body>
        <SubBody>
          <Title>캔버라 커넥트</Title>
          <Tabs>
            <Tab>
              <Category>서비스</Category>
              <SubTab>커뮤니티</SubTab>
              <SubTab>구인/구직</SubTab>

              <SubTab>쿼카마켓</SubTab>
              <SubTab>렌트/쉐어</SubTab>
            </Tab>
            <Tab>
              <Category>지원</Category>
              <SubTab>1:1 문의하기</SubTab>
              <SubTab>앱 다운로드</SubTab>
              <SubTab>이용약관</SubTab>
              <SubTab>개인정보처리방침</SubTab>
            </Tab>
            <Tab>
              <Category>소셜</Category>
              <SubTab>
                <InstaIcon /> Instagram
              </SubTab>
              <SubTab>
                <KakaoIcon />
                Kakaotalk
              </SubTab>
            </Tab>
          </Tabs>
        </SubBody>
        <SubFooter>
          Copyright © 2024 캔버라커넥트 All rights reserved.
        </SubFooter>
      </Body>
    </Container>
  )
}
export default DesktopFooter

const Container = styled.div`
  border-top: 1px solid #bbbbbb;
  display: flex;
  justify-content: center;
`

const Body = styled.div`
  position: relative;
`

const SubBody = styled.div`
  padding: 24px 34px;
  display: flex;

  gap: 100px;
  min-width: 1200px;
`

const Title = styled.div`
  font-family: NanumSquare Neo;
  font-size: 24px;
  font-weight: 800;
`

const Tabs = styled.div`
  display: flex;
  gap: 80px;
`

const Tab = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Category = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`

const SubTab = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  gap: 11px;
  align-items: center;
`

const SubFooter = styled.div`
  border-top: 1px solid #dfdfdf;
  padding: 22px 34px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  color: #787878;
`
