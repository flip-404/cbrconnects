'use client'

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import LikeIcon from '@/assets/like.svg'
import BoardControls from './BoardControls'
import { useSearchParams } from 'next/navigation'
import { boardLinks } from '../NewComponent/NewHeader'
import { useQuery } from '@tanstack/react-query'
import api from '@/libs/axiosInstance'
import SkeletonPosts from './SkeletonPosts'

function Board() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const [tab, setTab] = useState(category || 'FREEBOARD')
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['posts', tab],
    queryFn: ({ queryKey }) => api.get(`/posts?category=${queryKey[1]}`),
  })
  const posts = data?.data.posts || []

  useEffect(() => {
    refetch()
  }, [tab, refetch])

  return (
    <Container>
      <Tabs>
        {boardLinks.map((item) => (
          <Tab
            key={item.category}
            onClick={() => setTab(item.category)}
            $active={tab === item.category}
          >
            {item.label}
          </Tab>
        ))}
      </Tabs>
      <Posts>
        {isLoading ? (
          <SkeletonPosts />
        ) : (
          posts.map((post) => (
            <Post key={post.title}>
              <div>
                <span>{post.comment_count}</span>
                <div>
                  <a>{post.title}</a>
                </div>
                <p>
                  {post.search_author}
                  <span>{post.created_At}</span>
                </p>
              </div>
              <span>
                {Array.from({ length: post.like_count }).map((_, index) => (
                  <LikeIcon key={index} />
                ))}
              </span>
            </Post>
          ))
        )}
      </Posts>
      <BoardControls category={category}></BoardControls>
    </Container>
  )
}

const Post = styled.li`
  all: unset;
  display: flex;
  flex-direction: column;
  position: relative;

  & > div {
    display: flex;
    align-items: center;

    & > span {
      width: 50px;
      font-size: 17px;
      font-weight: 400;
    }
    & > div {
      margin-right: 25px;

      a {
        cursor: pointer;
        font-size: 22px;
        font-weight: 600;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    & > p {
      margin: 0;
      font-weight: 600;
      height: 22.5px;

      span {
        margin-left: 5px;
        font-size: 11px;
        font-weight: 400;
        color: #3c3c434d;
      }
    }
  }

  & > span {
    position: absolute;
    font-size: 13px;
    left: 50px;
    bottom: -15px;

    svg {
      width: 13px;
      height: 13px;
    }
  }
`

export default Board

const Posts = styled.ul`
  all: unset;
  margin-top: 40px;
  width: 1300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Tabs = styled.div`
  margin-top: 40px;
  width: 1300px;
  display: flex;
  gap: 25px;
  color: 3c3c434d;
`

const Tab = styled.h2<{ $active: boolean }>`
  margin: 0;
  font-size: 38px;
  font-weight: 800;
  color: ${(props) => (props.$active ? '#000' : '#3c3c434d')};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #3c3c4399;
  }
`
