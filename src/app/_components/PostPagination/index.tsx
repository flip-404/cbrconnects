'use client'

import LeftArrowIcon from '@/assets/leftArrow_icon.svg'
import RightArrowIcon from '@/assets/rightArrow_icon.svg'
import styled from 'styled-components'

export default function PostPagination({
  curPage,
  totalCount,
  handlePageChange,
}: {
  curPage: number
  totalCount: number
  handlePageChange: (newPage: number) => void
}) {
  return (
    <Pagination>
      <PaginationButton
        type="button"
        disabled={curPage === 1}
        onClick={() => handlePageChange(curPage - 1)}
      >
        <LeftArrowIcon />
      </PaginationButton>
      {[...Array(4)].map((_, idx) => {
        const pageNumber = Math.floor((curPage - 1) / 4) * 4 + idx + 1
        if (Math.floor(totalCount / 10 + 1) >= pageNumber)
          return (
            <PaginationNumber
              key={pageNumber}
              type="button"
              disabled={curPage === pageNumber}
              onClick={() => {
                handlePageChange(pageNumber)
              }}
            >
              {pageNumber}
            </PaginationNumber>
          )
        return null
      })}

      <PaginationButton
        disabled={curPage === Math.floor(totalCount / 10 + 1)}
        type="button"
        onClick={() => handlePageChange(curPage + 1)}
      >
        <RightArrowIcon />
      </PaginationButton>
    </Pagination>
  )
}

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;

  padding-bottom: 100px;
`

const PaginationButton = styled.button<{ disabled: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0px;
`

const PaginationNumber = styled.button<{ disabled: boolean }>`
  background: ${(props) => (props.disabled ? '#E8E8E8' : 'transparent')};
  border: transparent;
  border-radius: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: Open Sans;
  font-size: 13px;
  font-weight: 600;
  padding: 3px 8px;
`
