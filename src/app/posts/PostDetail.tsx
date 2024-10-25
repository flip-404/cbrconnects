import LikeIcon from '@/assets/desktop/like_icon.svg'
import ViewIcon from '@/assets/desktop/view_icon.svg'
import CommentIcon from '@/assets/desktop/comment_icon.svg'
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
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #878787;

  span {
    &::after {
      content: '|';
      margin: 0 6px;
      color: #d9d9d9;
    }
  }

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
