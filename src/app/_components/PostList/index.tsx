/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'

type PostListProps = {
  href: string
  label: string
  data: any
  displayAll: boolean
}

function PostList({ href, label, data, displayAll }: PostListProps) {
  const router = useRouter()

  return (
    <Container>
      <Header>
        <StyledLink scroll={false} href={href}>
          {label}
        </StyledLink>
        <ArrowLink scroll={false} href={href}>
          화살표 아이콘
        </ArrowLink>
      </Header>

      <PostContainer>
        {data.map((el: any) => (
          <PostItem key={el.id}>
            <div>
              <PostTitle>
                {el.title}
                <span>{el.comment.length}</span>
              </PostTitle>
              <MetaInfo>
                <span>{el.author}</span>·<span>{el.date}</span>·
                <span>조회수 {el.view}</span>·<span>{el.like}</span>
              </MetaInfo>
            </div>
            <div>
              {el.title && <Thumbnail alt="임시 사진" src={el.thumbnail} />}
            </div>
          </PostItem>
        ))}
      </PostContainer>
      {displayAll && (
        <WriteButtonWrapper>
          <WriteButton
            onClick={() => {
              router.push('/write')
            }}
          >
            글쓰기
          </WriteButton>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e2e8f0;
  padding: 2px;
  padding-bottom: 5px;
  border-bottom: 1px solid #e2e8f0;
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

const WriteButton = styled.button``
