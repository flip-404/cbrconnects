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
  justify-content: space-between;
  border-bottom: 1px solid #d8d8d8;

  @media (max-width: 768px) {
    padding-left: 16px;
    justify-content: start;
    gap: 8px;
    background: #eef1f6;
    border: none;
    width: 100%;
    height: 49px;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

const SubCategory = styled.div<{ $isActive: boolean }>`
  white-space: nowrap;
  cursor: pointer;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  padding: 12px;
  color: ${(props) => (props.$isActive ? '#000000' : '#787878')};
  border-bottom: ${(props) =>
    props.$isActive ? '2px solid #000000' : '2px solid transparent'};

  @media (max-width: 768px) {
    padding: 8px 12px;

    border-radius: 999px;
    border: ${(props) =>
      props.$isActive ? '0.7px solid #d9e1fd' : '0.7px solid transparent'};
    background: ${(props) => (props.$isActive ? 'white' : 'transparent')};
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    color: #14171c;
    display: flex;
    align-items: center;
  }
`
