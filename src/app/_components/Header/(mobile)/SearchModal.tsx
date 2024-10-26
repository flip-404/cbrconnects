'use client'

import styled from 'styled-components'
import SearchIcon from '@/assets/mobile/search.svg'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import RecentSearch from './RecentSearch'
import RecentPost from './RecentPost'

function SearchModal({ offSearchModal }: { offSearchModal: () => void }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  const router = useRouter()

  const handleSearch = () => {
    if (!searchTerm) return

    const updatedSearches = [
      searchTerm,
      ...recentSearches.filter((term) => term !== searchTerm),
    ]
    setRecentSearches(updatedSearches)
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
    router.push(`/search?searchTerm=${searchTerm}&searchType=fulltext`)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      offSearchModal()
      handleSearch()
    }
  }

  const deleteSearchTerm = (term: string) => {
    const updatedSearches = recentSearches.filter((search) => search !== term)
    setRecentSearches(updatedSearches)
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
  }

  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches')
    const parsedSearches = storedSearches ? JSON.parse(storedSearches) : []
    setRecentSearches(parsedSearches)
  }, [])

  return (
    <Container>
      <Header>
        <InputWrapper>
          <Input
            onKeyDown={handleKeyDown}
            placeholder="검색어를 입력하세요."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
          />
          <SearchButton onClick={handleSearch}>
            <SearchIcon />
          </SearchButton>
        </InputWrapper>
        <CancelButton onClick={offSearchModal}>취소</CancelButton>
      </Header>
      {recentSearches.length && (
        <RecentSearch
          recentSearches={recentSearches}
          deleteSearchTerm={deleteSearchTerm}
        />
      )}

      <RecentPost />
    </Container>
  )
}

export default SearchModal

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #282e38;
`

const Header = styled.div`
  box-sizing: border-box;
  padding: 9px 11px 9px 21px;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
`

const InputWrapper = styled.div`
  flex: 1;
  border-radius: 999px;
  background: #c1c7d1;
  height: 38px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  gap: 10px;
`

const Input = styled.input`
  flex: 1;
  background-color: transparent;
  border: none;
  outline: none;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  text-align: left;
  ::placeholder {
    background: #64748b;
  }
`

const SearchButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const CancelButton = styled.div`
  cursor: pointer;
  padding: 10px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 19.09px;
  color: white;
`
