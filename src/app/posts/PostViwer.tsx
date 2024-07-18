import styled from 'styled-components'
import NavsData, { NavsDataType } from '@/mocks/NavsData'
import { CommentWithRelations, PostWithRelations } from '@/types'
import fetcher from '@/utils/fetcher'
import parse from 'html-react-parser'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import formatDate from '@/utils/formatData'
import { CommentLike } from '@prisma/client'
import LikeIcon from '@/assets/like_icon.svg'
import Link from 'next/link'
import CommentSection from '../_components/CommentSection'

function PostViewer() {
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')

  const { data: session } = useSession()

  const {
    data: post,
    error,
    mutate: postMutate,
  } = useSWR<PostWithRelations>(`/api/posts?postId=${postId}`, fetcher)
  const { data: comments, mutate: commentMutate } = useSWR(
    `/api/comments?postId=${postId}`,
    fetcher,
  )

  const handdleLikePost = async () => {
    if (!session || !post) return

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

  const handdleLikeComment = (commentId: number, parentId: null | number) => {
    if (!session || !comments) return

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

  const handdleWriteComment = (content: string, parentId: number | null) => {
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

  if (error) return <div>Failed to load post</div>
  if (!post) return <div>Loading...</div>

  const firstNavItem: NavsDataType = NavsData.find(
    (item) => item.id === post?.mainCategory,
  )!
  const secondNavItem: NavsDataType = firstNavItem.submenu!.find(
    (item) => item.id === post?.subCategory,
  )!

  return (
    <Container>
      <ContentBox>
        <div>
          <CategoryLink
            href={
              secondNavItem
                ? `/${firstNavItem.id}/${secondNavItem.id}`
                : `/${firstNavItem.id}`
            }
          >
            {`${firstNavItem.label}${secondNavItem ? ` - ${secondNavItem.label}` : ''} >`}
          </CategoryLink>
          <Title>{post?.title}</Title>
          <PostDetail>
            <AuthorProfile />
            <InfoWrapper>
              <AuthorNickname>{post.author.nickname}</AuthorNickname>
              <DetailInfo>
                <CreatedAt>{formatDate(post.createdAt)}</CreatedAt>
                <ViewCount>조회 {post.viewCount}</ViewCount>
              </DetailInfo>
            </InfoWrapper>
          </PostDetail>
        </div>

        <div>
          {parse(post!.content)}
          <ReactionSummary>
            <LikeWrapper
              $isLiked={post.likes.some(
                (like) => like.userId === session?.user.id,
              )}
            >
              <LikeIcon onClick={handdleLikePost} width={24} height={24} />{' '}
              <span>{post.likes.length}</span>
            </LikeWrapper>

            <CommentCount>
              댓글 <span>{comments?.length}</span>
            </CommentCount>
          </ReactionSummary>
        </div>
        <CommentSection
          handdleLikeComment={handdleLikeComment}
          comments={comments}
          handdleWriteComment={handdleWriteComment}
          isLoggedIn={Boolean(session?.user.accessToken)}
        />
      </ContentBox>
    </Container>
  )
}

export default PostViewer

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const ContentBox = styled.div`
  margin: 4rem 0rem;
  width: 80%;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 3rem;
`

const CategoryLink = styled(Link)`
  font-size: 13px;
  font-weight: 400;
  color: #3b4890;

  text-decoration: none;
`
const Title = styled.h1`
  margin: 0;
`

const PostDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const AuthorNickname = styled.div`
  font-size: 13px;
  font-weight: 700;
`

const DetailInfo = styled.div`
  display: flex;

  font-size: 12px;
  color: #979797;
  gap: 1rem;
`
const CreatedAt = styled.span`
  display: flex;
`

const ViewCount = styled.span`
  display: flex;
  font-size: 12px;
`

const AuthorProfile = styled.div`
  width: 36px;
  height: 36px;
  background-color: #e1e1e1;

  border-radius: 990px;
`

const ReactionSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const CommentCount = styled.span`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 400;

  span {
    margin-left: 0.3rem;
    font-weight: 700;
  }
`

const LikeWrapper = styled.div<{ $isLiked: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  span {
    font-size: 13px;
    margin-left: 0.3rem;
    font-weight: 700;
  }

  path {
    stroke: ${(props) => props.$isLiked && 'red'};
    fill: ${(props) => props.$isLiked && 'red'};
  }

  &:hover {
    path {
      stroke: red;
      fill: red;
    }
  }
`
