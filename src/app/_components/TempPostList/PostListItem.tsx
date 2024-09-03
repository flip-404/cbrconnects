'use client'

import { PostWithRelations } from '@/types'
import formatDate from '@/utils/formatData'
import styled from 'styled-components'
import SmallSeparatorIcon from '@/assets/small_separetor_icon.svg'
import ViewIcon from '@/assets/view_icon.svg'
import LikeIcon from '@/assets/like_icon.svg'
import NewIcon from '@/assets/new_icon.svg'
import CommentIcon from '@/assets/comment_icon.svg'
import isNew from '@/utils/isNew'

function PostListItem({ post }: { post: PostWithRelations }) {
  return (
    <Container>
      <Body>
        <Title>
          <CategoryChip>
            {post.subCategory ? post.subCategory : post.mainCategory}
          </CategoryChip>
          {post.title}
          {isNew(post.createdAt) && <NewIcon />}
        </Title>
        <PostDetail>
          <LeftWrapper>
            {post.author.nickname}
            <SmallSeparatorIcon />
            {formatDate(post.createdAt)}
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
  )
}

export default PostListItem

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 13px 0px;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #474747;
  font-size: 16px;
  font-weight: 500;
`

const CategoryChip = styled.span`
  color: #3e65f1;
`

const PostDetail = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #878787;
  align-items: center;
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
