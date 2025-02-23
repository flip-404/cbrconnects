'use client'

import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@/assets/refresh.svg'
import ArrowBackIcon from '@/assets/arrow_back.svg'
import ArrowForwardIcon from '@/assets/arrow_forward.svg'
import useUser from '../hooks/useUser'

function BoardControls() {
  const { user } = useUser()

  return (
    <Container>
      <div>
        <WriteButton isLogin={Boolean(user)} disabled={!user}>
          <AddIcon />
          글쓰기
        </WriteButton>
        <Button>
          <RefreshIcon />
        </Button>
        <Button>
          <ArrowBackIcon />
        </Button>
        <Button>
          <ArrowForwardIcon />
        </Button>
      </div>
      <div>
        {Array.from({ length: 10 }).map((_, index) => (
          <>{index + 1}</>
        ))}
      </div>
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
        <SearchButton style={{ color: 'rgba(60, 60, 67, 0.6)' }}>
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
`

const WriteButton = styled.button<{ isLogin: boolean }>`
  border: none;
  border-radius: 6px;
  margin-right: 30px;
  padding: 10px 22px;
  font-size: 17px;
  color: white;
  background-color: ${(props) => (props.isLogin ? '#007aff' : '#f2f2f7')};
  display: flex;
  align-items: center;
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
