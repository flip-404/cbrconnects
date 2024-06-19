'use client'

import styled from 'styled-components'
import NavBar from './NavBar'
import SearchBar from './SearchBar'

function Header() {
  return (
    <Container>
      <SearchBar />
      <NavBar />
    </Container>
  )
}

export default Header

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
