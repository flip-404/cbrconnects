import styled from 'styled-components'
import NavsData, { NavsDataType } from '@/mocks/NavsData'
import { CommentWithRelations, PostWithRelations } from '@/types'
import fetcher from '@/utils/fetcher'
import parse from 'html-react-parser'
import { useRouter, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { formatDateToMonth } from '@/utils/formatDate'
import { CommentLike } from '@prisma/client'
import LikeIcon from '@/assets/like_icon.svg'
import CommentIcon from '@/assets/comment_icon.svg'
import ViewIcon from '@/assets/view_icon.svg'
import Link from 'next/link'
import { useState } from 'react'
import CommentSection from '../_components/CommentSection'
import NotificationModal from '../_components/NotificationModal'

function PostViewer() {
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const [requireLoginModal, setRequireLoginModal] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const [openMoreMenu, setOpenMoreMenu] = useState<null | number>(null)

  const {
    data: post,
    error,
    mutate: postMutate,
  } = useSWR<PostWithRelations>(`/api/posts?postId=${postId}`, fetcher)
  const { data: comments, mutate: commentMutate } = useSWR(
    `/api/comments?postId=${postId}`,
    fetcher,
  )

  const handleLikePost = async () => {
    if (!session || !post) {
      setRequireLoginModal(true)
      return
    }

    const isLiked = post.likes.find((like) => like.userId === session.user.id)
    const updatedLikes = isLiked
      ? post.likes.filter((like) => like.userId !== session.user.id)
      : [
          ...post.likes,
          { id: Math.random(), postId: post.id, userId: session.user.id },
        ]

    postMutate({ ...post, likes: updatedLikes }, false)
    // 광클시 서버에러 나는거 수정
    await fetch('/api/likePost', {
      method: isLiked ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postLikeId: isLiked ? isLiked.id : null,
        postId: post.id,
        userId: session.user.id,
      }),
    })

    postMutate()
  }

  const handleLikeComment = (commentId: number, parentId: null | number) => {
    if (!session || !comments) {
      setRequireLoginModal(true)
      return
    }

    let isLiked: CommentLike | undefined

    let updatedComments

    if (parentId) {
      const parentComment = comments.find(
        (comment: CommentWithRelations) => comment.id === parentId,
      )

      if (parentComment) {
        const targetReply = parentComment.replies.find(
          (reply: CommentWithRelations) => reply.id === commentId,
        )
        isLiked = targetReply?.likes.find(
          (like: CommentLike) => like.userId === session.user.id,
        )

        const updatedReplies = parentComment.replies.map(
          (reply: CommentWithRelations) => {
            if (reply.id === commentId) {
              const updatedLikes = isLiked
                ? reply.likes.filter((like) => like.userId !== session.user.id)
                : [
                    ...reply.likes,
                    { id: Math.random(), commentId, userId: session.user.id },
                  ]

              return { ...reply, likes: updatedLikes }
            }
            return reply
          },
        )

        updatedComments = comments.map((comment: CommentWithRelations) => {
          if (comment.id === parentId) {
            return { ...comment, replies: updatedReplies }
          }
          return comment
        })
      }
    } else {
      const targetComment = comments.find(
        (comment: CommentWithRelations) => comment.id === commentId,
      )
      isLiked = targetComment?.likes.find(
        (like: CommentLike) => like.userId === session.user.id,
      )

      updatedComments = comments.map((comment: CommentWithRelations) => {
        if (comment.id === commentId) {
          const updatedLikes = isLiked
            ? comment.likes.filter((like) => like.userId !== session.user.id)
            : [
                ...comment.likes,
                { id: Math.random(), commentId, userId: session.user.id },
              ]

          return { ...comment, likes: updatedLikes }
        }
        return comment
      })
    }

    commentMutate(updatedComments, false)

    fetch('/api/likeComment', {
      method: isLiked ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commentLikeId: isLiked ? isLiked.id : null,
        commentId,
        userId: session.user.id,
      }),
    })

    commentMutate()
  }
  const handleDeletePost = async () => {
    setDeleteModal(false)
    setLoadingModal(true)
    setTimeout(() => {
      setLoadingModal(false)
      router.back()
    }, 2000)

    await fetch(`/api/posts`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId: post?.id,
      }),
    })
  }

  const handleWriteComment = (content: string, parentId: number | null) => {
    const newComment = {
      author: { nickname: session?.user.nickname },
      content,
      createdAt: new Date(),
      likes: [],
      id: Math.random(),
      parentId,
    }

    if (parentId) {
      const updatedComments = comments!.map((comment: CommentWithRelations) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, newComment],
          }
        }
        return comment
      })
      commentMutate(updatedComments, false)
    } else commentMutate([...comments, newComment], false)

    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        postId: Number(postId),
        authorId: session?.user.id,
        parentId,
      }),
    })
  }

  const handleEditComment = (content: string, commentId: number) => {
    fetch('/api/comments', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commentId,
        content,
      }),
    }).then(() => {
      commentMutate()
    })
  }

  const handleMoreMenu = (targetId: number | null) => {
    setOpenMoreMenu(targetId === openMoreMenu ? null : targetId)
  }

  if (error) return <div>Failed to load post</div>
  if (!post) return <div>Loading...</div>

  const firstNavItem: NavsDataType = NavsData.find(
    (item) => item.id === post?.mainCategory,
  )!
  const secondNavItem: NavsDataType = firstNavItem.submenu!.find(
    (item) => item.id === post?.subCategory,
  )!

  return (
    <Container
      onClick={() => {
        handleMoreMenu(null)
      }}
    >
      {session?.user.id === post?.authorId && (
        <UDWrapper>
          <UDButton
            onClick={() => {
              router.push(
                `/write?postId=${post.id}&isEditMode=true&mainCategory=${post.mainCategory}${post.subCategory ? `&subCategory=${post.subCategory}` : ''}`,
              )
            }}
          >
            수정
          </UDButton>
          <UDButton
            onClick={() => {
              setDeleteModal(true)
            }}
          >
            삭제
          </UDButton>
        </UDWrapper>
      )}

      <ContentBox>
        <CategoryLink
          href={
            secondNavItem
              ? `/${firstNavItem.id}/${secondNavItem.id}`
              : `/${firstNavItem.id}`
          }
        >
          {`${firstNavItem.label}${secondNavItem ? ` > ${secondNavItem.label}` : ''}`}
        </CategoryLink>
        <Title>{post?.title}</Title>
        <PostDetail>
          {post.author.nickname} <span />
          {formatDateToMonth(post.createdAt)}
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
        </PostDetail>

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
            <ViewIcon />
            {comments?.length}
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
          onClose={() => {
            setRequireLoginModal(false)
          }}
          onCloseLabel="확인"
        />
      )}
      {loadingModal && (
        <NotificationModal label="삭제 중 입니다. 잠시만 기다려주세요." />
      )}
      {deleteModal && (
        <NotificationModal
          label="정말 삭제하시겠습니까?"
          onCheck={handleDeletePost}
          onCheckLabel="삭제"
          onClose={() => {
            setDeleteModal(false)
          }}
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

const UDButton = styled.button`
  all: unset;
  border-radius: 7px;
  display: flex;
  padding: 8px 18px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  background: #d9e1fd;
`

const ContentBox = styled.div`
  padding: 28px 18px;
  border: 1px solid #dfdfdf;
  border-radius: 16px;
`

const CategoryLink = styled(Link)`
  padding: 6px 8px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  color: #878787;
  text-decoration: none;
`
const Title = styled.h1`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  color: #222222;

  padding: 4px 8px;
  margin: 0;
`

const PostDetail = styled.div`
  padding: 6px 8px;
  display: flex;
  align-items: center;
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

const Content = styled.div`
  padding: 10px;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
  text-align: left;
  color: #444444;
  border-bottom: 1px solid #d9d9d9;
`

const ReactionSummary = styled.div`
  margin-top: 13px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
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
