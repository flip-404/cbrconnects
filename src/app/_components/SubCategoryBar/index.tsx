import NavsData, { NavsDataType } from '@/mocks/NavsData'
import styled from 'styled-components'

function SubCategoryBar({
  pathname,
  subCategory,
  changeSubCategory,
}: {
  pathname: string
  subCategory: string
  changeSubCategory: (subCategory: string) => void
}) {
  const firstNavItem: NavsDataType = NavsData.find(
    (item) => item.href === pathname,
  )!

  return (
    <Container>
      <SubCategory
        $isActive={subCategory === 'all'}
        onClick={() => {
          changeSubCategory('all')
        }}
      >
        전체
      </SubCategory>
      {firstNavItem.submenu?.length !== 0 &&
        firstNavItem.submenu!.map((secondNavItem) => (
          <SubCategory
            key={secondNavItem.id}
            $isActive={subCategory === secondNavItem.id}
            onClick={() => {
              changeSubCategory(secondNavItem.id)
            }}
          >
            {secondNavItem.label}
          </SubCategory>
        ))}
    </Container>
  )
}

export default SubCategoryBar

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const SubCategory = styled.div<{ $isActive: boolean }>`
  cursor: pointer;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  padding: 12px;
  color: ${(props) => (props.$isActive ? '#000000' : '#787878')};
  border-bottom: ${(props) =>
    props.$isActive ? '2px solid #000000' : '2px solid transparent'};
`
