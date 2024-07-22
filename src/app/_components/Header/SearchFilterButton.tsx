import styled from 'styled-components'
import type { SelectedOption } from './SearchBar'

function SearchFilterButton({
  handleOptionClick,
  handleKeyPress,
}: {
  handleOptionClick: (option: SelectedOption) => void
  handleKeyPress: (event: React.KeyboardEvent, option: SelectedOption) => void
}) {
  return (
    <DropdownWrapper>
      <DropdownMenu
        role="button"
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
  background-color: white;
  border: 1px solid #ccc;
  font-size: 14px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
`

const DropdownMenu = styled.div`
  z-index: 50;
  font-size: 1rem;
  font-weight: 600;
  padding: 8px 16px;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: #e5e5e5;
  }
`

export default SearchFilterButton
