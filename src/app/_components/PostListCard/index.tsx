/* eslint-disable @typescript-eslint/no-explicit-any */

import styled from 'styled-components'
import Link from 'next/link'
import useSWR from 'swr'
import buildQuery from '@/utils/queryUtils'
import fetcher from '@/utils/fetcher'
import { PostWithRelations } from '@/types'
import { useRouter } from 'next/navigation'
import formatDate from '@/utils/formatData'

type PostListCardProps = {
  mainCategory?: string
  subCategory?: string
  href: string
  lable: string
}

function PostListCard({
  mainCategory,
  subCategory,
  href,
  lable,
}: PostListCardProps) {
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
  if (!posts) return <div>Loading...</div>
  return (
    <CardContainer>
      <CardHeader>
        <TitleLink scroll={false} href={href}>
          {lable}
        </TitleLink>
        <ShortcutLink scroll={false} href={href}>
          바로가기 아이콘
        </ShortcutLink>
      </CardHeader>
      <Table>
        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post.id}
              onClick={() => {
                handleMoveToPost(post.id)
              }}
            >
              <TableCell>
                {post.title}{' '}
                {post.createdAt.toString() === '20분전' && (
                  <NewChip>&nbsp;[new]</NewChip>
                )}
              </TableCell>
              <TableCell>{formatDate(post.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContainer>
  )
}

export default PostListCard

// Styled Components
const CardContainer = styled.div`
  margin-bottom: 20px;
`

const CardHeader = styled.div`
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

const Table = styled.table`
  font-size: 13px;
  font-weight: 700;
`

const TableBody = styled.tbody`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const TableRow = styled.tr`
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`

const TableCell = styled.td`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: ${({ width }) => width};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const NewChip = styled.span`
  color: red;
  font-size: 0.75rem;
`
