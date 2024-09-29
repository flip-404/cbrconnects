'use client'

// 완
import styled from 'styled-components'
import SearchIcon from '@/assets/search_icon.svg'
import DropdownIcon from '@/assets/dropdown_icon.svg'
import SeparatorIcon from '@/assets/separator_icon.svg'
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
    type: 'fulltext',
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
      <SearchInput
        placeholder="커넥트에서 검색해보세요."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
        onKeyDown={handleKeyDown}
      />
      <SearchIcon />
      <SeparatorIcon />
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
            searchType={searchType}
          />
        )}
        <DropdownIcon />
      </SelectedButton>
    </SearchContainer>
  )
}

export default SearchBar

const SearchContainer = styled.div`
  width: 373px;
  height: 38px;
  padding: 0px 10px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  background: #ecf0fe;
  gap: 10px;
  svg {
    cursor: pointer;
  }
`

const SearchInput = styled.input`
  background: inherit;
  outline: none;
  border: none;
  flex: 1;

  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;

  text-align: left;
  color: black;

  &::placeholder {
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;

    text-align: left;
    color: #929eca;
  }
`

const SelectedButton = styled.button`
  position: relative;
  padding: 0px;
  cursor: pointer;
  display: flex;
  gap: 4px;
  align-items: center;
  background: transparent;
  border: none;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
`
