'use client'

import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@/assets/refresh.svg'
import ArrowBackIcon from '@/assets/arrow_back.svg'
import ArrowForwardIcon from '@/assets/arrow_forward.svg'
import useUser from '../../hooks/useUser'
import { useRouter } from 'next/navigation'

function BoardControls({
  category,
  page,
  onPageChange,
  totalPosts,
  limit,
}: {
  category: string
  page: number
  onPageChange: (newPage: number) => void
  totalPosts: number
  limit: number
}) {
  const { user } = useUser()
  const router = useRouter()
  const totalPage = Math.floor(totalPosts / limit) + 1
  const pagePhases = Math.floor((page - 1) / 10)

  return (
    <Container>
      <div>
        <WriteButton
          $isLogin={Boolean(user)}
          disabled={!user}
          onClick={() => router.push(`/write?category=${category}`)}
        >
          <AddIcon />
          <span>글쓰기</span>
        </WriteButton>
        <Button>
          <RefreshIcon />
        </Button>
        <Button onClick={() => page !== 1 && onPageChange(page - 1)}>
          <ArrowBackIcon />
        </Button>
        <Button onClick={() => page !== totalPage && onPageChange(page + 1)}>
          <ArrowForwardIcon />
        </Button>
      </div>
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
        {Array.from({
          length: pagePhases === Math.floor((totalPage - 1) / 10) ? totalPage % 10 : 10,
        }).map((_, index) => (
          <button
            key={index}
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
      </Pagination>
      <div>
        <Filter>작성자</Filter>
        <Filter>제목</Filter>
        <Filter>내용</Filter>
        <Input type="text" placeholder="검색어" />
        <SearchButton
          style={{
            color: 'rgb(0, 122, 255)',
          }}
        >
          검색
        </SearchButton>
        <SearchButton style={{ color: 'rgba(60, 60, 67, 0.6)' }}>취소</SearchButton>
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
  gap: 10px;

  button {
    all: unset;
    cursor: pointer;
    padding: 0px 5px;

    &:hover {
      border-radius: 4px;
      color: #007aff;
      background-color: #f2f2f7;
    }
  }
`

const Filter = styled.button`
  all: unset;
  cursor: pointer;
  color: rgba(60, 60, 67, 0.3);
  font-size: 13px;
  font-weight: 600;
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
