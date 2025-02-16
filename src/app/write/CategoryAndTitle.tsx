import styled from 'styled-components'
import { useEffect } from 'react'
import CategorySelect from './CategorySelect'
import type { Category } from './PostEditor'

function CategoryAndTitle({
  categories,
  mainCategory,
  subCategory,
  title,
  onMainCgChange,
  onSubCgChange,
  onTitleChange,
}: {
  categories: any
  mainCategory: Category | null
  subCategory: Category | null
  title: string
  onMainCgChange: (value: null | Category) => void
  onSubCgChange: (value: null | Category) => void
  onTitleChange: (value: string) => void
}) {
  useEffect(() => {
    onSubCgChange(null)
  }, [mainCategory])

  return (
    <Container>
      <SelectWrapper>
        <CategorySelect
          categories={categories}
          defaultLabel="게시판을 선택해 주세요."
          type="mainCategory"
          mainCategory={mainCategory}
          subCategory={subCategory}
          onCgChange={onMainCgChange}
        />
        <CategorySelect
          categories={categories}
          defaultLabel="카테고리를 선택해 주세요."
          type="subCategory"
          mainCategory={mainCategory}
          subCategory={subCategory}
          onCgChange={onSubCgChange}
        />
      </SelectWrapper>
      <TitleWrapper>
        <TitleInput
          value={title}
          placeholder="제목을 입력해 주세요."
          onChange={(e) => {
            if (e.target.value.length < 100) onTitleChange(e.target.value)
          }}
        />
      </TitleWrapper>
    </Container>
  )
}

export default CategoryAndTitle

const Container = styled.div`
  width: 80vw;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0px 0px 10px 0px #0000000d;
`

const SelectWrapper = styled.div`
  display: flex;
  gap: 45px;
  margin: 25px 33px;
`

const TitleWrapper = styled.div`
  flex: 1;
  margin: 25px 32px;
  padding: 15px 19px;
  background: #f3f6ff;
`

const TitleInput = styled.input`
  all: unset;
  display: flex;
  width: 100%;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 400;
  color: black;
  border-radius: 6px;

  &::placeholder {
    color: #787878;
  }
`
