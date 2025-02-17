'use client'

import Link from 'next/link'
import styled from 'styled-components'

function NewHeader() {
  return (
    <Container>
      <LeftSection />
      <CenterSection>
        <Logo>
          <Link href="/">캔버라커넥트</Link>
        </Logo>
        <Navigation>
          <Link href="/notice">공지사항</Link>
          <Link href="/freeboard">자유게시판</Link>
          <Link href="/market">쿼카마켓</Link>
          <Link href="/job">구인구직</Link>
          <Link href="/promotion">홍보</Link>
        </Navigation>
      </CenterSection>
      <RightSection>
        <Features>
          <Button>로그인</Button>
          <Button>회원가입</Button>
        </Features>
      </RightSection>
    </Container>
  )
}

export default NewHeader

const Container = styled.header`
  padding: 25px;
  display: flex;
  justify-content: space-between;

  border-bottom: 0.5px solid #eaeaea;
`

const LeftSection = styled.div`
  flex: 1;
`

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`

const Logo = styled.h1`
  display: flex;
  justify-content: center;
  margin: 0;
  a {
    all: unset;
    font-family: var(--font-saira);
    letter-spacing: 0.3rem;
  }
`

const Navigation = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;

  a {
    all: unset;
    font-size: 13px;
    font-weight: 600;
  }
`

const Features = styled.div``

const Button = styled.button`
  all: unset;
  font-size: 12px;
  font-weight: 400;
  margin-left: 20px;
`
