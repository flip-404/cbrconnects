import styled from 'styled-components'
import type { SelectedOption } from './SearchBar'

// 완
function SearchFilterButton({
  handleOptionClick,
  handleKeyPress,
  searchType,
}: {
  handleOptionClick: (option: SelectedOption) => void
  handleKeyPress: (event: React.KeyboardEvent, option: SelectedOption) => void
  searchType: SelectedOption
}) {
  return (
    <DropdownWrapper>
      <DropdownMenu
        role="button"
        $isActive={searchType.type === 'default'}
        tabIndex={0}
        onClick={() =>
          handleOptionClick({
            label: '전체',
            type: 'default',
          })
        }
        onKeyDown={(event) =>
          handleKeyPress(event, {
            label: '전체',
            type: 'default',
          })
        }
      >
        전체
      </DropdownMenu>
      <DropdownMenu
        role="button"
        $isActive={searchType.type === 'title'}
        tabIndex={0}
        onClick={() =>
          handleOptionClick({
            label: '제목만',
            type: 'title',
          })
        }
        onKeyDown={(event) =>
          handleKeyPress(event, {
            label: '제목만',
            type: 'title',
          })
        }
      >
        제목만
      </DropdownMenu>
      <DropdownMenu
        role="button"
        $isActive={searchType.type === 'content'}
        tabIndex={0}
        onClick={() =>
          handleOptionClick({
            label: '내용만',
            type: 'content',
          })
        }
        onKeyDown={(event) =>
          handleKeyPress(event, {
            label: '내용만',
            type: 'content',
          })
        }
      >
        내용만
      </DropdownMenu>
    </DropdownWrapper>
  )
}

const DropdownWrapper = styled.div`
  z-index: 99;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 48px;
  background-color: white;
  width: 132px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 4px;
`

const DropdownMenu = styled.div<{ $isActive: boolean }>`
  z-index: 50;
  display: flex;
  align-items: center;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  white-space: nowrap;
  padding: 6px 4px;
  cursor: pointer;
  background-color: ${(props) => (props.$isActive ? '#EFEFEF' : 'transparent')};
  border-radius: 4px;
`

export default SearchFilterButton
