'use client'

import Link from 'next/link'
import styled from 'styled-components'
import HamburgerIcon from '@/assets/hamburger.svg'
import { useState } from 'react'

export default function MobileHeader() {
  const [isOpenNav, setIsOpenNav] = useState(false)

  // 뉴스 링크는 kbs로 할까..
  return (
    <Container>
      <Link href="/">캔버라커넥트</Link>
      <button type="button" aria-label="Open navigation" onClick={() => setIsOpenNav(!isOpenNav)}>
        <HamburgerIcon fill={isOpenNav ? '#007aff' : undefined} />
      </button>
      <NavDropdown $isOpen={isOpenNav}>
        <strong>새로운 소식</strong>
        <ul>
          <li>공지사항</li>
          <li>뉴스</li>
          <li>홍보</li>
          <li>채팅</li>
        </ul>
        <strong>게시판</strong>
        <ul>
          <li>자유게시판</li>
          <li>쿼카마켓</li>
          <li>구인구직</li>
        </ul>
        <strong>회원</strong>
        <ul>
          <li>로그인</li>
        </ul>
      </NavDropdown>
    </Container>
  )
}

const Container = styled.div`
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 50px;
  padding: 0 20px 0 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    all: unset;
    cursor: pointer;
    font-family: var(--font-saira);
    font-size: 20px;
    letter-spacing: 1.5px;
    font-weight: 700;
  }

  button {
    all: unset;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`

const NavDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  box-sizing: border-box;
  top: 50px;
  left: 0;
  width: 100%;
  padding: 30px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  transition:
    height 0.3s ease-in-out,
    opacity 0.3s ease-in-out;

  height: ${(props) => (props.$isOpen ? 'calc(100vh - 50px)' : '0')};
  opacity: ${(props) => (props.$isOpen ? '1' : '0')};
  transform-origin: top;

  strong {
    color: #3c3c4399;
    font-size: 13px;
    font-weight: 400;
  }

  ul {
    all: unset;
    margin-bottom: 20px;
    display: flex;
    gap: 20px;

    li {
      all: unset;
      font-size: 24px;
      font-weight: 700;
    }
  }
`
