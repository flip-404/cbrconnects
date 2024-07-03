'use client'

import NavsData, { NavsDataType } from '@/mocks/NavsData'
import { PostWithRelations } from '@/types'
import fetcher from '@/utils/fetcher'
import parse from 'html-react-parser'
import { useSearchParams } from 'next/navigation'
import styled from 'styled-components'
import useSWR from 'swr'
import CommentSection from '../_components/CommentSection'

function Posts() {
  const searchParams = useSearchParams()

  const postId = searchParams.get('postId')
  const { data: post, error } = useSWR<PostWithRelations>(
    `/api/posts?postId=${postId}`,
    fetcher,
  )

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
          <CategoryWrapper>
            {`${firstNavItem.label} - ${secondNavItem.label} >`}
          </CategoryWrapper>
          <Title>{post?.title}</Title>
          <PostDetail>
            <AuthorProfile />
            <InfoWrapper>
              <AuthorNickname>{post.author.nickname}</AuthorNickname>
              <DetailInfo>
                <CreatedAt>{post.createdAt.toString()}</CreatedAt>
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
              댓글 <span>{post.comments.length}</span>
            </LikeAndCommentCount>
          </ReactionSummary>
        </div>
        <CommentSection postId={post.id} />
      </ContentBox>
    </Container>
  )
}

export default Posts

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
