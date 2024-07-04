import styled from 'styled-components'
import NavsData, { NavsDataType } from '@/mocks/NavsData'
import { PostWithRelations } from '@/types'
import fetcher from '@/utils/fetcher'
import parse from 'html-react-parser'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import formatDate from '@/utils/formatData'
import CommentSection from '../_components/CommentSection'

function PostViewer() {
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')

  const { data: session } = useSession()

  const { data: post, error } = useSWR<PostWithRelations>(
    `/api/posts?postId=${postId}`,
    fetcher,
  )
  const { data: comments, mutate } = useSWR(
    `/api/comments?postId=${postId}`,
    fetcher,
  )

  const handdleWriteComment = (content: string, parentId?: number) => {
    const newComment = {
      author: { nickname: session?.user.nickname },
      content,
      createdAt: new Date(),
      likes: [],
    }
    mutate([...comments, newComment], false)

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
            <LikeAndCommentCount>
              좋아요 <span>{post.likes.length}</span>
            </LikeAndCommentCount>
            <LikeAndCommentCount>
              댓글 <span>{comments.length}</span>
            </LikeAndCommentCount>
          </ReactionSummary>
        </div>
        <CommentSection
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

const LikeAndCommentCount = styled.span`
  display: flex;

  font-size: 13px;
  font-weight: 400;

  span {
    margin-left: 0.3rem;
    font-weight: 700;
  }
`
