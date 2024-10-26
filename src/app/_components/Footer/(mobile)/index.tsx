'use client'

import styled from 'styled-components'
import InstaIcon from '@/assets/mobile/footer/instagram.svg'
import KakaoIcon from '@/assets/mobile/footer/kakao.svg'

function MobileFooter() {
  return (
    <FooterContainer>
      <Logo>캔버라커넥트</Logo>
      <IconGroup>
        <InstaIcon />
        <KakaoIcon />
      </IconGroup>
      <Section>
        <SectionTitle>지원</SectionTitle>
        <LinkGroup>
          <LinkWrapper>
            <LinkItem>
              이용약관 <Separator />
            </LinkItem>
            <LinkItem>개인정보처리방침</LinkItem>
          </LinkWrapper>
          <LinkWrapper>
            <LinkItem>
              1:1문의하기 <Separator />
            </LinkItem>
            <LinkItem>앱다운로드</LinkItem>
          </LinkWrapper>
        </LinkGroup>
      </Section>
      <Section>
        <SectionTitle>서비스</SectionTitle>
        <LinkGroup>
          <LinkWrapper>
            <LinkItem>
              커뮤니티 <Separator />
            </LinkItem>
            <LinkItem>
              구인구직 <Separator />
            </LinkItem>
            <LinkItem>
              쿼카마켓 <Separator />
            </LinkItem>
            <LinkItem>렌트쉐어</LinkItem>
          </LinkWrapper>
        </LinkGroup>
      </Section>
      <FooterText>
        Copyright © 2024 캔버라커넥트 All rights reserved.
      </FooterText>
    </FooterContainer>
  )
}

export default MobileFooter

const FooterContainer = styled.div`
  padding: 46px;
  background: #f6f7f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`

const Logo = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  color: #64748b;
  text-align: center;
`

const IconGroup = styled.div`
  display: flex;
  gap: 6px;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
`

const SectionTitle = styled.div`
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 600;
  color: #87888c;
  text-align: center;
`

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const LinkItem = styled.div`
  font-family: Pretendard;
  font-size: 13px;
  color: #87888c;
  display: flex;
  align-items: center;
`

const Separator = styled.span`
  &::after {
    content: '|';
    margin: 0 6px;
    color: #c1c7d1;
  }
`

const FooterText = styled.div`
  margin-top: 6px;
  font-family: Pretendard;
  font-size: 12px;
  color: #a2acb9;
  text-align: center;
`
