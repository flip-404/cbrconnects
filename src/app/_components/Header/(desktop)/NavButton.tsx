// 완
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { NavsDataType } from '@/mocks/NavsData'
import styled from 'styled-components'
import DotIcon from '@/assets/desktop/dot_icon.svg'

function NavButton({ label, href }: NavsDataType) {
  const pathname = usePathname()
  const isActive = pathname.includes(href)

  return (
    <NavButtonWrapper>
      <NavLink scroll={false} prefetch href={href} $isActive={isActive}>
        {label}
        {isActive && <DotIcon />}
      </NavLink>
    </NavButtonWrapper>
  )
}

export default NavButton

const NavButtonWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
  width: 200px;
`

const NavLink = styled(Link)<{ $isActive: boolean }>`
  position: relative;
  text-decoration: none;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 800;

  text-align: left;
  color: ${(props) => (props.$isActive ? 'white' : '#a7a7a7')};

  &:hover {
    cursor: pointer;
  }

  svg {
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    visibility: ${(props) => (props.$isActive ? 'visible' : 'hidden')};
  }
`
