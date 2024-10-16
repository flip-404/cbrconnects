import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import styled from 'styled-components'
import parse from 'html-react-parser'
import LikeIcon from '@/assets/like_icon.svg'
import CommentIcon from '@/assets/comment_icon.svg'
import Link from 'next/link'
import { findLabelById } from '@/utils/getCategoryInfo'
import CommentSection from '../_components/CommentSection'
import NotificationModal from '../_components/NotificationModal'
import PostViewerSkeleton from './PostViewerSkeleton'
import usePost from '../hooks/usePost'
import useComment from '../hooks/useComment'
import PostDetail from './PostDetail'
import EditDeleteButtons from './EditDeleteButtons'

function PostViewer() {
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const { data: session } = useSession()

  const { post, error, handleLikePost, handleDeletePost, isPostLoading } =
    usePost(postId)
  const { comments, handleLikeComment, handleWriteComment, handleEditComment } =
    useComment(postId)

  const [requireLoginModal, setRequireLoginModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  if (isPostLoading) return <PostViewerSkeleton />
  if (!post) return <div>Loading...</div>
  if (error) return <div>Failed to load post</div>

  const mainCategory = findLabelById(post?.mainCategory)
  const subCategory = findLabelById(post?.subCategory)

  return (
    <Container>
      {session?.user.id === post?.authorId && (
        <UDWrapper>
          <EditDeleteButtons
            postId={post.id}
            onDelete={() => setDeleteModal(true)}
          />
        </UDWrapper>
      )}

      <ContentBox>
        <CategoryLink
          href={`/${post?.mainCategory}/${post?.subCategory ?? ''}`}
        >
          {`${mainCategory}${subCategory ? ` > ${subCategory}` : ''}`}
        </CategoryLink>
        <Title>{post?.title}</Title>
        <PostDetail post={post} />

        <Content>{parse(post!.content)}</Content>
        <ReactionSummary>
          <LikeWrapper
            $isLiked={post.likes.some(
              (like) => like.userId === session?.user.id,
            )}
          >
            <LikeIcon onClick={handleLikePost} /> {post.likes.length}
          </LikeWrapper>
          <CommentCount>
            <CommentIcon /> {comments?.length}
          </CommentCount>
        </ReactionSummary>

        <CommentSection
          handleLikeComment={handleLikeComment}
          comments={comments}
          handleWriteComment={handleWriteComment}
          handleEditComment={handleEditComment}
          isLoggedIn={Boolean(session?.user.accessToken)}
        />
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

const Container = styled.div`
  padding-top: 24px;
`
const UDWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 12px;
  margin-bottom: 14px;
`

const ContentBox = styled.div`
  padding: 28px 18px;
  border: 1px solid #dfdfdf;
  border-radius: 16px;
`
const CategoryLink = styled(Link)`
  padding: 6px 8px;
  font-size: 14px;
  color: #878787;
  text-decoration: none;
`
const Title = styled.h1`
  font-size: 20px;
  padding: 4px 8px;
  margin: 0;
`
const Content = styled.div`
  padding: 10px;
  font-size: 18px;
  line-height: 28px;
  text-align: left;
  color: #444444;
  border-bottom: 1px solid #d9d9d9;
`
const ReactionSummary = styled.div`
  margin-top: 13px;
  display: flex;
  gap: 12px;
  font-size: 16px;
  color: #878787;
`
const CommentCount = styled.span`
  display: flex;
  gap: 6px;
  align-items: center;
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
`
