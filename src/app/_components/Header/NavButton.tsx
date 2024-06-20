import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { NavsDataType } from '@/mocks/NavsData'
import styled, { css } from 'styled-components'

function NavButton({ label, href, submenu = [] }: NavsDataType) {
  const pathname = usePathname()
  const isActive = pathname.includes(href)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  return (
    <NavButtonWrapper
      onMouseEnter={() => setIsDropdownVisible(true)}
      onMouseLeave={() => setIsDropdownVisible(false)}
    >
      <NavLink scroll={false} prefetch href={href} isActive={isActive}>
        {label}
      </NavLink>

      {submenu.length > 0 && isDropdownVisible && (
        <DropdownMenu>
          {submenu.map((item) => (
            <DropdownLink
              scroll={false}
              prefetch
              key={item.id}
              href={item.href}
              active={pathname === item.href}
            >
              {item.label}
            </DropdownLink>
          ))}
        </DropdownMenu>
      )}
    </NavButtonWrapper>
  )
}

export default NavButton

const NavButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`

const NavLink = styled(Link)<{ isActive: boolean }>`
  font-size: 1.5rem; /* Corresponds to text-xl */
  font-weight: 600;
  border-bottom: 3px solid black;
  color: inherit;
  text-decoration: none;
  position: relative;
  display: inline-block;
  transition: border-color 0.3s ease-in-out;

  ${(props) =>
    !props.isActive &&
    css`
      border-color: transparent;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: black;
        transform-origin: center;
        transform: scaleX(0);
        transition: transform 0.3s ease-in-out;
      }
      &:hover::after {
        transform: scaleX(1);
      }
    `}

  &:hover {
    text-decoration: none;
  }
`

const DropdownMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  z-index: 50;
`

const DropdownLink = styled(Link)<{ active: boolean }>`
  z-index: 50;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => (props.active ? '#01A69F' : 'black')};
  min-width: 0;
  padding: 8px 16px;
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    background-color: #e5e5e5;
  }
`
