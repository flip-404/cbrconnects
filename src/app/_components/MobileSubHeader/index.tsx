'use client'

import NavsData from '@/mocks/NavsData'
import styled from 'styled-components'
import Link from 'next/link'

function MobileSubHeader({ pathname }: { pathname: string }) {
  return (
    <Container>
      {NavsData.map((link) => (
        <NavButton
          $isActive={pathname === link.href}
          key={link.id}
          href={link.href}
          scroll={false}
        >
          {link.label}
        </NavButton>
      ))}
    </Container>
  )
}

export default MobileSubHeader

const Container = styled.div`
  z-index: 999;
  position: fixed;
  top: 56px;
  left: 0px;
  width: 100%;
  height: 52px;
  background: #282e38;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  box-sizing: border-box;
`

const NavButton = styled(Link)<{ $isActive: boolean }>`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  color: ${(props) => (props.$isActive ? 'white' : '#8390a2')};
  text-decoration: none;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  border-bottom: ${(props) =>
    props.$isActive ? '2px solid #436af5' : '2px solid transparent'};
`
