'use client'

import api from '@/libs/axiosInstance'
import { GET_Posts } from '@/types/newIndex'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import styled from 'styled-components'

function PostBoard({ title, category }: { title: string; category: string }) {
  const { data } = useQuery({
    queryKey: ['posts', category],
    queryFn: ({ queryKey }) => api.get(`/posts?category=${queryKey[1]}`),
  })
  const posts = data?.data.posts || []

  return (
    <Container>
      <Title href="/freeboard">{title}</Title>
      <Posts>
        {posts.slice(0, 10).map((post: GET_Posts) => (
          <Post key={post.id}>
            <span>{post.comment_count}</span>
            <p>
              <Link href={`/post?postId=${post.id}`}>{post.title}</Link>
              <span>
                {post.author_name} · {post.created_at}
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
    margin-top: 4px;
    margin-right: 10px;
  }

  & > p {
    margin: 0;
    display: flex;
    flex-direction: column;
    width: 350px;

    a {
      all: unset;
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
