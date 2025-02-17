'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { comment } from 'stylis'

const MockData = [
  {
    title: '새로 가입했습니다. 인사드립니다 안녕하세요. 안녕하세요.',
    nickname: '캔버라커넥트',
    date: '2021-10-11',
    commentCount: 13,
  },
  {
    title: '새로 가입했습니다. 인사드립니다 안녕하세요.',
    nickname: '캔버라커넥트',
    date: '2021-10-11',
    commentCount: 13,
  },
  {
    title: '새로 가입했습니다. 인사드립니다 안녕하세요.',
    nickname: '캔버라커넥트',
    date: '2021-10-11',
    commentCount: 13,
  },
  {
    title: '새로 가입했습니다. 인사드립니다 안녕하세요.',
    nickname: '캔버라커넥트',
    date: '2021-10-11',
    commentCount: 13,
  },
  {
    title: '새로 가입했습니다. 인사드립니다 안녕하세요.',
    nickname: '캔버라커넥트',
    date: '2021-10-11',
    commentCount: 13,
  },
  {
    title: '새로 가입했습니다. 인사드립니다 안녕하세요.',
    nickname: '캔버라커넥트',
    date: '2021-10-11',
    commentCount: 13,
  },
  {
    title: '새로 가입했습니다. 인사드립니다 안녕하세요.',
    nickname: '캔버라커넥트',
    date: '2021-10-11',
    commentCount: 13,
  },
  {
    title: '새로 가입했습니다. 인사드립니다 안녕하세요.',
    nickname: '캔버라커넥트',
    date: '2021-10-11',
    commentCount: 13,
  },
  {
    title: '새로 가입했습니다. 인사드립니다 안녕하세요.',
    nickname: '캔버라커넥트',
    date: '2021-10-11',
    commentCount: 13,
  },
]

function PostBoard({ title }: { title: string }) {
  return (
    <Container>
      <Title href="/freeboard">{title}</Title>
      <Posts>
        {MockData.map((data, index) => (
          <Post>
            <span>{data.commentCount}</span>
            <p>
              <a>{data.title}</a>
              <span>
                {data.nickname} · {data.date}
              </span>
            </p>
          </Post>
        ))}
      </Posts>
    </Container>
  )
}

export default PostBoard

const Container = styled.div`
  padding: 0 40px;
  border-right: 0.5px solid #eaeaea;

  &:first-child {
    padding: 0 40px 0 0;
  }

  &:last-child {
    padding: 0 0 0 40px;
    border-right: none;
  }
`

const Title = styled(Link)`
  font-family: var(--font-saira);
  all: unset;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 20px;
`

const Posts = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  margin-bottom: 0;
  padding: 0;
`

const Post = styled.li`
  display: flex;
  margin-bottom: 18px;
  & > span {
    width: 20px;
    font-size: 12px;
    color: #3c3c4399;
    margin-right: 10px;
  }

  & > p {
    margin: 0;
    display: flex;
    flex-direction: column;
    width: 350px;

    a {
      font-size: 20px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    span {
      font-size: 11px;
      font-weight: 500;
      color: #3c3c4399;
    }
  }
`
