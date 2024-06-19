/* eslint-disable @typescript-eslint/no-explicit-any */

import styled from 'styled-components'

type PostListCardProps = {
  href: string
  lable: string
  data: any
}

function PostListCard({ href, lable, data }: PostListCardProps) {
  return (
    <CardContainer>
      <CardHeader>
        <TitleLink href={href}>{lable}</TitleLink>
        <ShortcutLink href={href}>바로가기 아이콘</ShortcutLink>
      </CardHeader>
      <Table>
        <TableBody>
          {data.map((val: any) => (
            <TableRow key={val.id}>
              <TableCell>
                {val.title}{' '}
                {val.date === '20분전' && <NewChip>&nbsp;[new]</NewChip>}
              </TableCell>
              <TableCell>{val.date}</TableCell>
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

const TitleLink = styled.a`
  font-size: 24px;
  color: #3b4890;
  font-weight: 700;
  margin-right: 10px;
`

const ShortcutLink = styled.a`
  font-size: 14px;
  color: #666;
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
