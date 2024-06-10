'use client'

import NavBar from './NavBar'
import SearchBar from './SearchBar'

function Header() {
  return (
    <div className="flex flex-col ">
      <SearchBar />
      <NavBar />
    </div>
  )
}

export default Header
