import LikeIcon from '@/assets/like_icon.svg'
import ViewIcon from '@/assets/view_icon.svg'
import CommentIcon from '@/assets/comment_icon.svg'
import styled from 'styled-components'
import { formatDateToMonth } from '@/utils/formatDate'
import { PostWithRelations } from '@/types'

export default function PostDetail({ post }: { post: PostWithRelations }) {
  return (
    <PostDetailWrapper>
      {post.author.nickname} <span /> {formatDateToMonth(post.createdAt)}
      <div>
        <CountWrapper>
          <ViewIcon /> {post.viewCount}
        </CountWrapper>
        <CountWrapper>
          <LikeIcon /> {post.likes.length}
        </CountWrapper>
        <CountWrapper>
          <CommentIcon /> {post.comments.length}
        </CountWrapper>
      </div>
    </PostDetailWrapper>
  )
}

const PostDetailWrapper = styled.div`
  padding: 6px 8px;
  display: flex;
  font-size: 14px;
  color: #878787;
  & > div {
    margin-left: 16px;
    display: flex;
    gap: 12px;
  }
`
const CountWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`
