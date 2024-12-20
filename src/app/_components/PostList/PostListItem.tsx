'use client'

import { PostWithRelations } from '@/types'
import { formatDateToMonth } from '@/utils/formatDate'
import styled from 'styled-components'
import SmallSeparatorIcon from '@/assets/desktop/small_separetor_icon.svg'
import ViewIcon from '@/assets/desktop/view_icon.svg'
import LikeIcon from '@/assets/desktop/like_icon.svg'
import NewIcon from '@/assets/desktop/new_icon.svg'
import CommentIcon from '@/assets/desktop/comment_icon.svg'
import isNew from '@/utils/isNew'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import PostModal from './PostModal'

function PostListItem({
  post,
  isBusiness = false,
}: {
  post: PostWithRelations
  isBusiness: boolean
}) {
  const router = useRouter()
  const handleMoveToPost = (postId: number) => {
    router.push(`/posts?postId=${postId}`)
  }
  const [postModal, setPostModal] = useState(false)
  console.log('post', post)
  return (
    <>
      {postModal && (
        <PostModal
          onClose={() => {
            setPostModal(false)
          }}
          postId={post.id}
        />
      )}
      <Container
        onClick={() => {
          if (isBusiness) setPostModal(true)
          else handleMoveToPost(post.id)
        }}
      >
        <Body>
          <Title>
            <CategoryChip
              $category={
                post.subCategory
                  ? post.subCategory.name
                  : post.mainCategory.name
              }
            >
              {post.subCategory
                ? post.subCategory.label
                : post.mainCategory.label}
            </CategoryChip>
            {post.title}
            {isNew(post.createdAt) && <NewIcon />}
          </Title>
          <PostDetail>
            <LeftWrapper>
              {post.author.nickname}
              <SmallSeparatorIcon />
              {formatDateToMonth(post.createdAt)}
            </LeftWrapper>
            <RightWrapper>
              <Counting>
                <ViewIcon />
                {post.viewCount}
              </Counting>
              <Counting>
                <LikeIcon />
                {post.likes.length}
              </Counting>
              <Counting>
                <CommentIcon />
                {post.comments.length}
              </Counting>
            </RightWrapper>
          </PostDetail>
        </Body>
        {post.thumbnail && (
          <Thumbnail src={post.thumbnail} width={70} height={48} />
        )}
      </Container>
    </>
  )
}

export default PostListItem

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-family: Pretendard;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #474747;
  font-size: 16px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`

const CategoryChip = styled.span<{ $category: string }>`
  color: ${(props) => {
    switch (props.$category) {
      case 'freeboard':
        return '#AF52DE'
      case 'news':
        return '#5A75FF'
      case 'club':
        return '#4F4AE8'
      case 'yesmigration':
        return '#1836D1'
      case 'parcel':
        return '#0099FF'
      case 'business':
        return '#1196AD'
      case 'offer':
        return '#5A75FF'
      case 'search':
        return '#0099FF'
      case 'rent':
        return '#4F4AE8'
      case 'share':
        return '#AF52DE'

      default:
        return '#0099FF'
    }
  }};
`

const PostDetail = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #878787;
  align-items: center;
  @media (max-width: 768px) {
    font-size: 12px;
    font-weight: 400;
    color: #a2acb9;
  }
`

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const Counting = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const Thumbnail = styled.img`
  width: 70px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
`
