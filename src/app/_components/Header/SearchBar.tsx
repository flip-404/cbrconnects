'use client'

import styled from 'styled-components'
import SearchIcon from '@/assets/search_icon.svg'
import { useState } from 'react'

type SelectedOption = {
  label: string
  type: string
}

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<SelectedOption>({
    label: '전체',
    type: 'default',
  })

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option: SelectedOption) => {
    setSelectedOption(option)
    setIsOpen(false)
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
      <SearchIcon />
      <SelectedButton
        type="button"
        className="dropdown-toggle"
        onClick={toggleDropdown}
      >
        {selectedOption.label}

        {isOpen && (
          <DropdownWrapper>
            <DropdownMenu
              role="button"
              tabIndex={0}
              onClick={() =>
                handleOptionClick({
                  label: '전체',
                  type: 'default',
                })
              }
              onKeyDown={(event) =>
                handleKeyPress(event, {
                  label: '전체',
                  type: 'default',
                })
              }
            >
              전체
            </DropdownMenu>
            <DropdownMenu
              role="button"
              tabIndex={0}
              onClick={() =>
                handleOptionClick({
                  label: '제목만',
                  type: 'title',
                })
              }
              onKeyDown={(event) =>
                handleKeyPress(event, {
                  label: '제목만',
                  type: 'title',
                })
              }
            >
              제목만
            </DropdownMenu>
            <DropdownMenu
              role="button"
              tabIndex={0}
              onClick={() =>
                handleOptionClick({
                  label: '내용만',
                  type: 'content',
                })
              }
              onKeyDown={(event) =>
                handleKeyPress(event, {
                  label: '내용만',
                  type: 'content',
                })
              }
            >
              내용만
            </DropdownMenu>
          </DropdownWrapper>
        )}
      </SelectedButton>
      <SearchInput placeholder="검색어를 입력해주세요" />
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

const DropdownWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
  background-color: white;
  border: 1px solid #ccc;
  font-size: 14px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
`

const DropdownMenu = styled.div`
  z-index: 50;
  font-size: 1rem;
  font-weight: 600;
  padding: 8px 16px;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: #e5e5e5;
  }
`
