'use client'

import Link from 'next/link'
import styled from 'styled-components'
import type { CategoryLink } from '@/types'
import buildQuery from '@/utils/queryUtils'
import RightArrowIcon from '@/assets/right_arrow_icon.svg'
import PostListBody from './PostListBody'

type PostListProps = {
  href: string
  label: string
  displayAll: boolean
  mainCategoryLink: CategoryLink
  subCategoryLink?: CategoryLink
}

function PostList({
  href,
  label,
  displayAll,
  mainCategoryLink,
  subCategoryLink,
}: PostListProps) {
  const query = buildQuery({
    mainCategory: mainCategoryLink?.id,
    subCategory: subCategoryLink?.id,
  })

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

      <PostListBody query={query} />

      <Footer>
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
      </Footer>
    </Container>
  )
}

export default PostList

const Container = styled.div`
  width: 100%;
`

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
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;

  path {
    fill: #8d919c;
  }

  &:hover {
    path {
      fill: black;
    }
  }
`

const WriteButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`

const Footer = styled.div``
