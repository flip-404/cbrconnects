import NavsData from '@/mocks/NavsData'
import styled from 'styled-components'
import NavButton from './NavButton'

function NavBar() {
  return (
    <NavBarContainer>
      <NavButtonsContainer>
        {NavsData.map((link) => (
          <NavButton
            key={link.id}
            label={link.label}
            href={link.href}
            submenu={link.submenu}
          />
        ))}
      </NavButtonsContainer>
    </NavBarContainer>
  )
}

export default NavBar

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const NavButtonsContainer = styled.div`
  display: flex;
  height: 57px;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Tailwind's shadow-sm */
`
