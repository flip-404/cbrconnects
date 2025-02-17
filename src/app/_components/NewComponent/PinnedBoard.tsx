'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { comment } from 'stylis'

const MockData = [
  {
    title: '3월 7일 쿼카마켓 이벤트 안내',
    date: '16일 전',
    commentCount: 3,
  },
  {
    title: '구인구직 게시판 오픈',
    date: '20일 전',
    commentCount: 3,
  },
  {
    title: '캔버라 커넥트 리뉴얼 안내',
    date: '2021-10-11',
    commentCount: 10,
  },
]

function PinnedBoard({ isEmpty }: { isEmpty?: boolean }) {
  return (
    <Container>
      {isEmpty ? (
        <></>
      ) : (
        <Board>
          {MockData.map((data, index) => (
            <Post>
              <a href="/">
                🇦🇺&nbsp; {data.title} <span>{data.commentCount}</span>
              </a>
              <span>{data.date}</span>
            </Post>
          ))}
        </Board>
      )}
    </Container>
  )
}

export default PinnedBoard

const Container = styled.div`
  padding: 0 20px;
  border-right: 0.5px solid #eaeaea;

  &:last-child {
    border-right: none;
  }
`

const Board = styled.ul`
  list-style-type: none;
  padding: 0;
`

const Post = styled.li`
  display: flex;
  justify-content: space-between;

  & > a {
    text-decoration: none;
    font-size: 13px;
    font-weight: 400;

    &:hover {
      text-decoration: underline;
    }

    span {
      margin-left: 4px;
      font-size: 11px;
      font-weight: 600;
    }
  }

  & > span {
    color: #3c3c4399;
    font-size: 11px;
    font-weight: 400;
  }
`
