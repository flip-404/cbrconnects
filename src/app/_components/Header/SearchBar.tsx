'use client'

import styled from 'styled-components'
import SearchIcon from '@/assets/search_icon.svg'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SearchFilterButton from './SearchFilterButton'

export type SelectedOption = {
  label: string
  type: string
}

function SearchBar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [searchType, setSearchType] = useState<SelectedOption>({
    label: '전체',
    type: 'default',
  })
  const [searchTerm, setSearchTerm] = useState('')

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option: SelectedOption) => {
    setSearchType(option)
    setIsOpen(false)
  }

  const handleSearch = () => {
    router.push(
      `/search?searchTerm=${searchTerm}&searchType=${searchType.type}`,
    )
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleKeyPress = (
    event: React.KeyboardEvent,
    option: SelectedOption,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleOptionClick(option)
    }
  }

  return (
    <SearchContainer>
      <SelectedButton
        type="button"
        className="dropdown-toggle"
        onClick={toggleDropdown}
      >
        {searchType.label}

        {isOpen && (
          <SearchFilterButton
            handleOptionClick={handleOptionClick}
            handleKeyPress={handleKeyPress}
          />
        )}
      </SelectedButton>
      <SearchInput
        placeholder="검색어를 입력해주세요"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
        onKeyDown={handleKeyDown}
      />
      <SearchIcon />
    </SearchContainer>
  )
}

export default SearchBar

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  flex: 0.5;

  svg {
    cursor: pointer;
  }
`

const SearchInput = styled.input`
  flex: 1;
  outline: none;
  border: none;
`

const SelectedButton = styled.button`
  position: relative;
  z-index: 50;
  font-size: 1rem;
  font-weight: 600;
  padding: 8px 16px;
  white-space: nowrap;
  background-color: transparent;
  border: 1px solid black;
  cursor: pointer;
  &:hover {
    background-color: #e5e5e5;
  }
`
