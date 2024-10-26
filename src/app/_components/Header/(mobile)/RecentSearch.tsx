'use client'

import styled from 'styled-components'
import CloseIcon from '@/assets/mobile/close.svg'

type RecentSearchProps = {
  recentSearches: string[]
  deleteSearchTerm: (term: string) => void
}

function RecentSearch({ recentSearches, deleteSearchTerm }: RecentSearchProps) {
  return (
    <Container>
      <Title>최근 검색어</Title>
      <Keywords>
        {recentSearches.map((searchTerm) => (
          <KeywordChip key={searchTerm}>
            {searchTerm}{' '}
            <DeleteBtn
              onClick={() => {
                deleteSearchTerm(searchTerm)
              }}
            >
              <CloseIcon />
            </DeleteBtn>
          </KeywordChip>
        ))}
      </Keywords>
    </Container>
  )
}

export default RecentSearch

const Container = styled.div`
  padding: 24px;
`

const Title = styled.div`
  color: #ffffff;
  font-family: NanumSquare Neo;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  text-align: left;
`

const Keywords = styled.div`
  height: 50px;
  padding: 8px 0px 8px 0px;
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: scroll;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const KeywordChip = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 34px;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #c1c7d1;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
`
const DeleteBtn = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  border-radius: 999px;
  background: #c1c7d1;
  cursor: pointer;
`
