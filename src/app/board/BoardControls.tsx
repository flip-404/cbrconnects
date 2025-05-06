'use client'

import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@/assets/refresh.svg'
import ArrowBackIcon from '@/assets/arrow_back.svg'
import ArrowForwardIcon from '@/assets/arrow_forward.svg'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material'

import useUser from '../../hooks/useUser'

function BoardControls({
  category,
  page,
  onPageChange,
  totalPosts,
  limit,
  updateSearchOptions,
  resetSearchOptions,
}: {
  category: string
  page: number
  onPageChange: (newPage: number) => void
  totalPosts: number
  limit: number
  updateSearchOptions: (
    filter: 'search_author' | 'search_title' | 'search_content' | 'search_full_text',
    keyword: string,
  ) => void
  resetSearchOptions: () => void
}) {
  const isMobile = useMediaQuery('(max-width: 1200px)')
  const queryClient = useQueryClient()
  const { user } = useUser()
  const router = useRouter()
  const totalPage = Math.floor(totalPosts / limit) + 1
  const pagePhases = Math.floor((page - 1) / 10)
  const [searchFilter, setSearchFilter] = useState<string[]>(['title'])
  const [searchKeyword, setSearchKeyword] = useState('')

  const handleFilterChange = (option: 'author' | 'title' | 'content') => {
    if (option === 'author') {
      setSearchFilter(['author'])
    } else {
      setSearchFilter((prev) =>
        prev.includes(option)
          ? prev.filter((f) => f !== option)
          : [...prev.filter((f) => f !== 'author'), option],
      )
    }
  }

  const onSearchButtonClick = () => {
    if (searchFilter.includes('author')) {
      updateSearchOptions('search_author', searchKeyword)
    } else if (searchFilter.includes('title') && searchFilter.includes('content')) {
      updateSearchOptions('search_full_text', searchKeyword)
    } else if (searchFilter.includes('title')) {
      updateSearchOptions('search_title', searchKeyword)
    } else if (searchFilter.includes('content')) {
      updateSearchOptions('search_content', searchKeyword)
    } else {
      alert('검색 조건을 선택해주세요')
    }
  }

  useEffect(() => {
    setSearchKeyword('')
  }, [category])

  return (
    <Container>
      {!isMobile && (
        <div>
          {(!['NOTICE', 'PROMOTION'].includes(category) || user?.user_group === 'Admin') && (
            <WriteButton
              $isLogin={Boolean(user)}
              disabled={!user}
              onClick={() => router.push(`/write?category=${category}`)}
            >
              <AddIcon />
              <span>글쓰기</span>
            </WriteButton>
          )}
          <Button
            onClick={() => {
              queryClient.invalidateQueries({ queryKey: ['posts', category, page, limit] })
            }}
          >
            <RefreshIcon />
          </Button>

          <Button onClick={() => page !== totalPage && onPageChange(page + 1)}>
            <ArrowForwardIcon />
          </Button>
        </div>
      )}

      <Pagination>
        {page > 10 && pagePhases !== 0 && (
          <button
            type="button"
            onClick={() => {
              onPageChange(1)
            }}
          >
            1...
          </button>
        )}
        {isMobile && (
          <Button onClick={() => page !== 1 && onPageChange(page - 1)}>
            <ArrowBackIcon />
          </Button>
        )}
        {Array.from({
          length: Math.min(
            isMobile ? 5 : 10,
            // eslint-disable-next-line no-nested-ternary
            pagePhases === Math.floor((totalPage - 1) / 10)
              ? totalPage % 10 || (isMobile ? 5 : 10)
              : isMobile
                ? 5
                : 10,
          ),
        }).map((_, index) => (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={`${index}`}
            type="button"
            onClick={() => onPageChange(pagePhases * 10 + index + 1)}
            style={{
              color: pagePhases * 10 + index + 1 === page ? '#007aff' : 'black',
            }}
          >
            {pagePhases * 10 + index + 1}
          </button>
        ))}
        {totalPage > 10 && pagePhases !== Math.floor((totalPage - 1) / 10) && (
          <button
            type="button"
            onClick={() => {
              onPageChange(totalPage)
            }}
          >
            ...{totalPage}
          </button>
        )}
        {isMobile && (
          <Button onClick={() => page !== totalPage && onPageChange(page + 1)}>
            <ArrowForwardIcon />
          </Button>
        )}
      </Pagination>
      <div>
        {!isMobile && (
          <>
            <Filter
              $isActive={searchFilter.includes('author')}
              onClick={() => handleFilterChange('author')}
            >
              작성자
            </Filter>
            <Filter
              $isActive={searchFilter.includes('title')}
              onClick={() => handleFilterChange('title')}
            >
              제목
            </Filter>
            <Filter
              $isActive={searchFilter.includes('content')}
              onClick={() => handleFilterChange('content')}
            >
              내용
            </Filter>
          </>
        )}

        <Input
          type="text"
          placeholder="검색어"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearchButtonClick()
          }}
        />
        <SearchButton
          style={{
            color: 'rgb(0, 122, 255)',
          }}
          onClick={() => {
            onSearchButtonClick()
          }}
        >
          검색
        </SearchButton>
        <SearchButton
          style={{ color: 'rgba(60, 60, 67, 0.6)' }}
          onClick={() => {
            resetSearchOptions()
          }}
        >
          취소
        </SearchButton>
      </div>
    </Container>
  )
}

export default BoardControls

const Container = styled.div`
  width: 1300px;
  margin-top: 60px;
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  border-top: rgb(198, 198, 200);
  border-top-style: solid;
  border-top-width: 0.5px;

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    justify-content: space-between;
  }
`

const WriteButton = styled.button<{ $isLogin: boolean }>`
  border: none;
  border-radius: 6px;
  margin-right: 30px;
  padding: 10px 27px 10px 22px;
  display: flex;
  align-items: center;
  color: white;
  background-color: ${(props) => (props.$isLogin ? '#007aff' : '#f2f2f7')};
  cursor: ${(props) => (props.$isLogin ? 'pointer' : 'auto')};

  span {
    margin-top: 2px;
    font-size: 17px;
  }
`

const Button = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 10px;

  &:hover {
    opacity: 0.5;
  }
`

const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    all: unset;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0px 5px;

    &:hover {
      border-radius: 4px;
      color: #007aff;
      background-color: #f2f2f7;
    }
  }
`

const Filter = styled.button<{ $isActive: boolean }>`
  all: unset;
  cursor: pointer;
  color: ${(props) => (props.$isActive ? '#007aff' : 'rgba(60, 60, 67, 0.3)')};
  font-size: 13px;
  font-weight: 600;
  transition: color 0.3s ease-in-out;
`

const Input = styled.input`
  width: 150px;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: #1c2025;
  border: 1px solid #dae2ed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &::placeholder {
    color: rgba(60, 60, 67, 0.3);
  }

  &:hover {
    border-color: #3399ff;
  }

  &:focus {
    border-color: #3399ff;
    box-shadow: 0 0 0 3px #b6daff;
  }

  /* firefox */
  &:focus-visible {
    outline: 0;
  }
`

const SearchButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 13px;
  font-weight: 600;
  background-color: rgba(116, 116, 128, 0.08);
  border-radius: 4px;
`
