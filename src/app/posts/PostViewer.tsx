import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import styled from 'styled-components'
import parse from 'html-react-parser'
import LikeIcon from '@/assets/desktop/like_icon.svg'
import CommentIcon from '@/assets/desktop/comment_icon.svg'
import Link from 'next/link'
import NotificationModal from '../_components/NotificationModal'
import PostViewerSkeleton from './PostViewerSkeleton'
import usePost from '../hooks/usePost'
import useComment from '../hooks/useComment'
import PostDetail from './PostDetail'
import EditDeleteButtons from './EditDeleteButtons'
import useUser from '../hooks/useUser'
import NewCommentSection from './_components/CommentSection'
import { CommentProvider } from '@/contexts/commentContext'

function PostViewer({ modalPostId }: { modalPostId?: number }) {
  const searchParams = useSearchParams()
  const postId = modalPostId
    ? modalPostId.toString()
    : searchParams.get('postId')
  const { user } = useUser()

  const { post, error, handleLikePost, handleDeletePost, isPostLoading } =
    usePost(postId)
  const { comments, handleLikeComment, handleWriteComment, handleEditComment } =
    useComment(postId)

  console.log('post', post)

  const [requireLoginModal, setRequireLoginModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  if (isPostLoading || !post) return <PostViewerSkeleton />
  if (error) return <div>Failed to load post</div>

  return (
    <Container $isModal={Boolean(modalPostId)}>
      {user?.user_id === post?.authorId && (
        <UDWrapper>
          <EditDeleteButtons
            postId={post.id}
            onDelete={() => setDeleteModal(true)}
          />
        </UDWrapper>
      )}
      <ContentBox>
        <CategoryLink href={`${post?.mainCategory.href}`}>
          {`${post?.mainCategory.label}${post?.subCategory ? ` > ${post?.subCategory.label}` : ''}`}
        </CategoryLink>
        <Title>{post?.title}</Title>
        <PostDetail post={post} />
        <Content>{parse(post!.content)}</Content>
        <ReactionSummary>
          <LikeWrapper
            $isLiked={post.likes.some((like) => like.userId === user?.user_id)}
          >
            <LikeIcon onClick={handleLikePost} /> {post.likes.length}
          </LikeWrapper>
          <CommentCount>
            <CommentIcon /> {comments?.length}
          </CommentCount>
        </ReactionSummary>

        <CommentProvider>
          <NewCommentSection post={post} comments={comments} />
        </CommentProvider>
      </ContentBox>
      {requireLoginModal && (
        <NotificationModal
          label="로그인이 필요한 서비스 입니다"
          onClose={() => setRequireLoginModal(false)}
          onCloseLabel="확인"
        />
      )}
      {deleteModal && (
        <NotificationModal
          label="정말 삭제하시겠습니까?"
          onCheck={handleDeletePost}
          onCheckLabel="삭제"
          onClose={() => setDeleteModal(false)}
          onCloseLabel="취소"
        />
      )}
    </Container>
  )
}

export default PostViewer

const Container = styled.div<{ $isModal: boolean }>`
  padding-top: ${(props) => (props.$isModal ? '0px' : '24px')};

  @media (max-width: 768px) {
    padding: 0px;
  }
`
const UDWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 12px;
  margin-bottom: 14px;

  @media (max-width: 768px) {
    display: none; // 임시
  }
`

const ContentBox = styled.div`
  padding: 28px 18px;
  border: 1px solid #dfdfdf;
  border-radius: 16px;

  @media (max-width: 768px) {
    padding: 30px 16px;
    border: none;
    border-radius: 0px;
  }
`
const CategoryLink = styled(Link)`
  padding: 6px 8px;
  font-size: 14px;
  color: #878787;
  text-decoration: none;

  @media (max-width: 768px) {
    padding: 0px 10px;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    color: #8390a2;
  }
`
const Title = styled.h1`
  font-size: 20px;
  padding: 4px 8px;
  margin: 0;

  @media (max-width: 768px) {
    margin-top: 15px;
    padding: 0px 10px;
    font-family: NanumSquare Neo;
    font-size: 18px;
    font-weight: 700;
  }
`
const Content = styled.div`
  padding: 10px;
  font-size: 18px;
  line-height: 28px;
  text-align: left;
  color: #444444;
  border-bottom: 1px solid #d9d9d9;

  @media (max-width: 768px) {
    margin-top: 10px;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
  }
`
const ReactionSummary = styled.div`
  margin-top: 13px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: #878787;

  @media (max-width: 768px) {
    margin-top: 11px;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 500;
    line-height: 14.32px;
    text-align: left;
    color: #8390a2;
  }
`
const CommentCount = styled.span`
  display: flex;
  gap: 6px;
  align-items: center;

  @media (max-width: 768px) {
  }
`

const LikeWrapper = styled.div<{ $isLiked: boolean }>`
  display: flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;
  path {
    stroke: ${(props) => props.$isLiked && '#ff4d4d'};
    fill: ${(props) => props.$isLiked && '#ff4d4d'};
  }
  &:hover {
    path {
      stroke: #ff4d4d;
      fill: #ff4d4d;
    }
  }

  @media (max-width: 768px) {
  }
`
