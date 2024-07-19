'use client'

import styled from 'styled-components'
import NavBar from './NavBar'
import HeaderSection from './HeaderSection'

function Header() {
  return (
    <Container>
      <HeaderSection />
      <NavBar />
    </Container>
  )
}

export default Header

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
