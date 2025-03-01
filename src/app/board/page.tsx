'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import LikeIcon from '@/assets/like.svg'
import { useQuery } from '@tanstack/react-query'
import api from '@/libs/axiosInstance'
import Link from 'next/link'
import useCategoryStore from '@/store/useCategoryStore'
import SkeletonPosts from './SkeletonPosts'
import { boardLinks } from '../NewComponent/NewHeader'
import BoardControls from './BoardControls'

const limit = 16

function Board() {
  const { category, setCategory } = useCategoryStore()
  const [page, setPage] = useState(1)
  const { data, isLoading } = useQuery({
    queryKey: ['posts', category, page, limit],
    queryFn: ({ queryKey }) =>
      api.get(`/posts?category=${queryKey[1]}&page=${page}&limit=${limit}`),
  })

  const { data: totalPostData } = useQuery({
    queryKey: ['posts', category],
    queryFn: ({ queryKey }) => api.get(`/posts/count?category=${queryKey[1]}`),
  })

  const posts = data?.data.posts || []

  const onPageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <Container>
      <Tabs>
        {boardLinks.map((item) => (
          <Tab
            key={item.category}
            onClick={() => setCategory(item.category)}
            $active={category === item.category}
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
            <Post key={post.id}>
              <div>
                <span>{post.comment_count}</span>
                <div>
                  <Link href={`/post?postId=${post.id}`}>{post.title}</Link>
                </div>
                <p>
                  {post.search_author}
                  <span>{post.created_at}</span>
                </p>
              </div>
              <span>
                {post.likes.map((like) => (
                  <LikeIcon key={like.id} />
                ))}
              </span>
            </Post>
          ))
        )}
      </Posts>
      <BoardControls
        category={category}
        page={page}
        onPageChange={onPageChange}
        totalPosts={totalPostData?.data.totalPosts || 0}
        limit={limit}
      />
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
        color: black;
        text-decoration: none;
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
