'use client'

import Link from 'next/link'
import styled from 'styled-components'
import HamburgerIcon from '@/assets/hamburger.svg'
import { useState } from 'react'

export default function MobileHeader() {
  const [isOpenNav, setIsOpenNav] = useState(false)

  return (
    <Container>
      <Link href="/">캔버라커넥트</Link>
      <button type="button" aria-label="Open navigation" onClick={() => setIsOpenNav(!isOpenNav)}>
        <HamburgerIcon fill={isOpenNav ? '#007aff' : undefined} />
      </button>
      <NavDropdown $isOpen={isOpenNav}>링크들</NavDropdown>
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
  top: 50px;
  left: 0;
  width: 100%;
  background-color: #de9a9a;
  overflow: hidden;

  transition:
    height 0.3s ease-in-out,
    opacity 0.3s ease-in-out;

  height: ${(props) => (props.$isOpen ? 'calc(100vh - 50px)' : '0')};
  opacity: ${(props) => (props.$isOpen ? '1' : '0')};
  transform-origin: top;
`
