import styled from 'styled-components'
import LeftArrowIcon from '@/assets/desktop/leftArrow_icon.svg'
import RightArrowIcon from '@/assets/desktop/rightArrow_icon.svg'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  maxPageButtons?: number
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxPageButtons = 4,
}: PaginationProps) {
  const startPage =
    Math.floor((currentPage - 1) / maxPageButtons) * maxPageButtons + 1
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages)

  return (
    <PaginationContainer>
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <LeftArrowIcon />
      </PaginationButton>
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <PageNumberButton
          key={index}
          active={startPage + index === currentPage}
          onClick={() => onPageChange(startPage + index)}
        >
          {startPage + index}
        </PageNumberButton>
      ))}
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <RightArrowIcon />
      </PaginationButton>
    </PaginationContainer>
  )
}

export default Pagination

const PaginationContainer = styled.div`
  margin-top: 32px;
  padding: 8px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`

const PaginationButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    color: #d9d9d9;
  }
`

const PageNumberButton = styled(PaginationButton)<{ active: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 32px;
  font-family: Open Sans;
  font-size: 13px;
  font-weight: 600;
  color: #060606;

  background-color: ${({ active }) => (active ? '#e8e8e8' : '#ffffff')};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
`
