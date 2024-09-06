/* eslint-disable @typescript-eslint/no-explicit-any */

import styled from 'styled-components'
import Link from 'next/link'
import useSWR from 'swr'
import buildQuery from '@/utils/queryUtils'
import fetcher from '@/utils/fetcher'
import { PostWithRelations } from '@/types'
import { useRouter } from 'next/navigation'
import formatDate from '@/utils/formatData'
import isNew from '@/utils/isNew'
import EmptyBox from '../PostList/EmptyBox'
import SkeletonPostItem from './SkeletonMainPostItem'

type MainPostListProps = {
  mainCategory?: string
  subCategory?: string
  href: string
  lable: string
}

function MainPostList({
  mainCategory,
  subCategory,
  href,
  lable,
}: MainPostListProps) {
  const router = useRouter()
  const query = buildQuery({
    mainCategory,
    subCategory,
  })

  const { data: posts, error } = useSWR<Array<PostWithRelations>>(
    `/api/posts${query ? `?${query}` : ''}`,
    fetcher,
  )

  const handleMoveToPost = (postId: number) => {
    router.push(`/posts?postId=${postId}`)
  }

  if (error) return <div>Failed to load posts</div>
  let content

  // if (!posts) {
  //   content = <SkeletonPostItem />
  // } else if (posts.length === 0) {
  //   content = <EmptyBox />
  // } else {
  //   content = posts.map((post) => (
  //     <ListItem
  //       key={post.id}
  //       onClick={() => {
  //         handleMoveToPost(post.id)
  //       }}
  //     >
  //       <Title>
  //         {post.title} {isNew(post.createdAt) && <NewChip>&nbsp;[new]</NewChip>}
  //       </Title>
  //       <CreatedAt>{formatDate(post.createdAt)}</CreatedAt>
  //     </ListItem>
  //   ))
  // }

  return (
    <CardContainer>
      <Header>
        <TitleLink scroll={false} href={href}>
          {lable}
        </TitleLink>
        <ShortcutLink scroll={false} href={href}>
          바로가기
        </ShortcutLink>
      </Header>
      <PostListWrapper>{content}</PostListWrapper>
    </CardContainer>
  )
}

export default MainPostList

const CardContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  height: 200px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TitleLink = styled(Link)`
  font-size: 24px;
  color: #3b4890;
  font-weight: 700;
  margin-right: 10px;
  text-decoration: none;
`

const ShortcutLink = styled(Link)`
  font-size: 14px;
  color: #666;
  text-decoration: none;
`

const PostListWrapper = styled.div`
  font-size: 13px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 2px;
  width: 100%;

  &:hover {
    background-color: #f1f1f1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`

const Title = styled.div`
  width: 300px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const CreatedAt = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const NewChip = styled.span`
  color: red;
  font-size: 0.75rem;
`
