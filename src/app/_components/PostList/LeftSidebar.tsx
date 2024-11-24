import styled from 'styled-components'
import NavsData from '@/mocks/NavsData'
import type { NavsDataType } from '@/mocks/NavsData'

function LeftSidebar({
  onChangeSubCate,
  subCategory,
}: {
  onChangeSubCate?: (subCate: null | NavsDataType) => void
  subCategory?: null | NavsDataType
}) {
  return (
    <Container>
      <CateItem
        $isSelected={subCategory === null}
        onClick={() => {
          if (onChangeSubCate) {
            onChangeSubCate(null)
          }
        }}
      >
        업소 전체
      </CateItem>
      {NavsData[4].submenu.map((category) => (
        <CateItem
          key={category.id}
          $isSelected={category.id === subCategory?.id}
          onClick={() => {
            if (onChangeSubCate) {
              onChangeSubCate(category)
            }
          }}
        >
          {category.label}
        </CateItem>
      ))}
    </Container>
  )
}

export default LeftSidebar

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const CateItem = styled.div<{ $isSelected: boolean }>`
  padding: 8px;
  gap: 4px;
  border-radius: 4px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: ${(props) => (props.$isSelected ? '#436AF5' : '#3E3E3E')};
  background-color: ${(props) =>
    props.$isSelected ? '#F3F6FF' : 'transparent'};
`
