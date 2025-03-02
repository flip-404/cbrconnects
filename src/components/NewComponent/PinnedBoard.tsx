'use client'

import api from '@/libs/axiosInstance'
import { GET_Posts } from '@/types/newIndex'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import styled from 'styled-components'

function PinnedBoard({ category }: { category?: string }) {
  const { data } = useQuery({
    queryKey: ['posts', category],
    queryFn: ({ queryKey }) => api.get(`/posts?category=${queryKey[1]}`),
    enabled: !!category,
  })
  const posts = data?.data.posts || []

  return (
    <Container>
      {!posts ? (
        <></>
      ) : (
        <Board>
          {posts.slice(0, 3).map((post: GET_Posts) => (
            <Post key={post.id}>
              <Link href={`/post?postId=${post.id}`}>
                {category === 'NOTICE' ? '🇦🇺' : '🍒'} &nbsp; {post.title}{' '}
                <span>{post.comment_count}</span>
              </Link>
              <span>{post.created_at}</span>
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
    color: black;
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
