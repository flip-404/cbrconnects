/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import Link from 'next/link'
import styled from 'styled-components'
import type { CategoryLink, PostWithRelations } from '@/types'
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
import buildQuery from '@/utils/queryUtils'
import { useRouter } from 'next/navigation'
import formatDate from '@/utils/formatData'
import RightArrowIcon from '@/assets/right_arrow_icon.svg'

type PostListProps = {
  href: string
  label: string
  data: any
  displayAll: boolean
  mainCategoryLink: CategoryLink
  subCategoryLink?: CategoryLink
}

function PostList({
  href,
  label,
  data,
  displayAll,
  mainCategoryLink,
  subCategoryLink,
}: PostListProps) {
  const query = buildQuery({
    mainCategory: mainCategoryLink?.id,
    subCategory: subCategoryLink?.id,
  })

  const router = useRouter()
  const { data: posts, error } = useSWR<Array<PostWithRelations>>(
    `/api/posts${query ? `?${query}` : ''}`,
    fetcher,
  )

  const handleMoveToPost = (postId: number) => {
    router.push(`/posts?postId=${postId}`)
  }

  if (error) return <div>Failed to load posts</div>
  if (!posts) return <div>Loading...</div>

  return (
    <Container>
      <Header>
        <StyledLink scroll={false} href={href}>
          {label}
        </StyledLink>
        <ArrowLink scroll={false} href={href}>
          <RightArrowIcon width={24} height={24} />
        </ArrowLink>
      </Header>

      <PostContainer>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            onClick={() => {
              handleMoveToPost(post.id)
            }}
          >
            <div>
              <PostTitle>
                {post.title}
                <span>{post.comments.length}</span>
              </PostTitle>
              <MetaInfo>
                <span>{post.author.nickname}</span>·
                <span>{formatDate(post.createdAt)}</span>·
                <span>조회수 {post.viewCount}</span>·
                <span>{post.likes.length}</span>
              </MetaInfo>
            </div>
            <div>
              {post.title && (
                <Thumbnail
                  width={100}
                  height={100}
                  alt="임시 사진"
                  src={post.thumbnail || undefined}
                />
              )}
            </div>
          </PostItem>
        ))}
      </PostContainer>
      {displayAll && (
        <WriteButtonWrapper>
          <Link
            href={{
              pathname: '/write',
              query: {
                mainCategory: mainCategoryLink.id,
                ...(subCategoryLink && { subCategory: subCategoryLink.id }),
              },
            }}
          >
            글쓰기
          </Link>
        </WriteButtonWrapper>
      )}
    </Container>
  )
}

export default PostList

const Container = styled.div``

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledLink = styled(Link)`
  font-size: 36px;
  color: #3b4890;
  font-weight: 700;
  text-decoration: none;
`

const ArrowLink = styled(Link)`
  color: #868e96;
  font-weight: 500;
  text-decoration: none;
`

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const PostItem = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e2e8f0;
  padding: 2px;
  padding-bottom: 5px;
  border-bottom: 1px solid #e2e8f0;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`

const PostTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
`

const MetaInfo = styled.div`
  display: flex;
  gap: 5px;
  color: #868e96;
  font-size: 14px;
`

const Thumbnail = styled.img``

const WriteButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`
