'use client'

import React from 'react'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import formatDate from '@/utils/formatData'
import { useRouter } from 'next/navigation'
import type { PostWithRelations } from '@/types'
import styled from 'styled-components'
import SkeletonPostItem from './SkeletonPostItem'

type PostListBodyProps = {
  query: string
}

function PostListBody({ query }: PostListBodyProps) {
  const router = useRouter()
  const { data: posts, error } = useSWR<Array<PostWithRelations>>(
    `/api/posts${query ? `?${query}` : ''}`,
    fetcher,
  )

  if (error) return <div>Failed to load posts</div>

  const handleMoveToPost = (postId: number) => {
    router.push(`/posts?postId=${postId}`)
  }

  return (
    <PostContainer>
      {posts ? (
        posts.map((post) => (
          <PostItem
            key={post.id}
            onClick={() => {
              handleMoveToPost(post.id)
            }}
          >
            <div>
              <PostTitle>
                {post.title}
                <span>{post.comments.length}</span>
              </PostTitle>
              <MetaInfo>
                <span>{post.author.nickname}</span>·
                <span>{formatDate(post.createdAt)}</span>·
                <span>조회수 {post.viewCount}</span>·
                <span>{post.likes.length}</span>
              </MetaInfo>
            </div>
            <div>
              {post.title && (
                <Thumbnail
                  width={100}
                  height={100}
                  alt="임시 사진"
                  src={post.thumbnail || undefined}
                />
              )}
            </div>
          </PostItem>
        ))
      ) : (
        <SkeletonPostItem />
      )}
    </PostContainer>
  )
}

export default PostListBody

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const PostItem = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e2e8f0;
  padding: 2px;
  padding-bottom: 5px;
  border-bottom: 1px solid #e2e8f0;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`

const PostTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
`

const MetaInfo = styled.div`
  display: flex;
  gap: 5px;
  color: #868e96;
  font-size: 14px;
`

const Thumbnail = styled.img``
