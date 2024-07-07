import styled from 'styled-components'
import NavsData, { NavsDataType } from '@/mocks/NavsData'
import { CommentWithRelations, PostWithRelations } from '@/types'
import fetcher from '@/utils/fetcher'
import parse from 'html-react-parser'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import formatDate from '@/utils/formatData'
import { Comment, CommentLike } from '@prisma/client'
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
      : [...post.likes, { id: -1, postId: post.id, userId: session.user.id }]

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

  const handdleLikeComment = (commentId: number) => {
    if (!session || !comments) return

    const isLiked = comments
      .find((comment: Comment) => comment.id === commentId)
      ?.likes.find((like: CommentLike) => like.userId === session.user.id)

    const updatedComments = comments.map((comment: CommentWithRelations) => {
      if (comment.id === commentId) {
        const updatedLikes = isLiked
          ? comment.likes.filter((like) => like.userId !== session.user.id)
          : [...comment.likes, { id: -1, commentId, userId: session.user.id }]

        return {
          ...comment,
          likes: updatedLikes,
        }
      }
      return comment
    })

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

  const handdleWriteComment = (content: string, parentId?: number) => {
    const newComment = {
      author: { nickname: session?.user.nickname },
      content,
      createdAt: new Date(),
      likes: [],
    }
    commentMutate([...comments, newComment], false)

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

  /* <Suspense>에 대해 공부 후 추후 개선 및 적용해야함 */
  return (
    <Container>
      <ContentBox>
        <div>
          <CategoryWrapper>
            {`${firstNavItem.label} - ${secondNavItem.label} >`}
          </CategoryWrapper>
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
            <LikeCount onClick={handdleLikePost}>
              좋아요 <span>{post.likes.length}</span>
            </LikeCount>
            <CommentCount>
              댓글 <span>{comments.length}</span>
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

const CategoryWrapper = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: #3b4890;
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
  gap: 1rem;
`

const LikeCount = styled.span`
  display: flex;
  cursor: pointer;
  font-size: 13px;
  font-weight: 400;

  &:hover {
    color: red;
  }

  span {
    margin-left: 0.3rem;
    font-weight: 700;
  }
`

const CommentCount = styled.span`
  display: flex;

  font-size: 13px;
  font-weight: 400;

  span {
    margin-left: 0.3rem;
    font-weight: 700;
  }
`
