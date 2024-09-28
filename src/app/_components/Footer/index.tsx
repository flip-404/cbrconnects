'use client'

import styled from 'styled-components'

function Footer() {
  return (
    <Container>
      <Body>
        <Title>캔버라 커넥트</Title>
        <Tabs>
          <Tab>
            <Title>서비스</Title>
            <SubTab>커뮤니티</SubTab>
            <SubTab>구인/구직</SubTab>

            <SubTab>쿼카마켓</SubTab>
            <SubTab>렌트/쉐어</SubTab>
          </Tab>
          <Tab>
            <Title>서비스</Title>
            <SubTab>1:1문의하기</SubTab>
            <SubTab>앱 다운로드</SubTab>
            <SubTab>이용약관</SubTab>
            <SubTab>개인정보처리방침</SubTab>
          </Tab>
          <Tab>
            <Title>서비스</Title>
            <SubTab>1:1문의하기</SubTab>
            <SubTab>앱 다운로드</SubTab>
            <SubTab>이용약관</SubTab>
            <SubTab>개인정보처리방침</SubTab>
          </Tab>
        </Tabs>
      </Body>
    </Container>
  )
}
export default Footer

const Container = styled.div`
  border-top: 1px solid #bbbbbb;
  padding-top: 64px;
  padding-bottom: 44px;
`

const Body = styled.div`
  position: relative;
  height: 380px;
`

const Title = styled.div`
  position: absolute;
  white-space: nowrap;
  top: 64px;
  left: 84px;
`

const Tabs = styled.div``

const Tab = styled.div``

const SubTab = styled.div``
