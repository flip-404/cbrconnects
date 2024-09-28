'use client'

import styled from 'styled-components'

export const fontSize = ['14px', '16px', '18px', '24px', '28px', '32px']

function Toolbar() {
  return (
    <Container id="toolbar">
      <span className="ql-formats">
        <select className="ql-size">
          {fontSize.map((val) => (
            <option key={val} value={val} defaultValue="16px">
              {val.replace(/[^0-9]/g, '')}
            </option>
          ))}
        </select>
      </span>
      <div className="ql-formats">
        <button type="button" className="ql-bold">
          굵게
        </button>
        <button type="button" className="ql-italic">
          기울임
        </button>
        <button type="button" className="ql-underline">
          밑줄
        </button>
        <button type="button" className="ql-strike">
          가로줄
        </button>
      </div>

      <div className="ql-formats">
        <button type="button" className="ql-list" value="ordered">
          순서 리스트
        </button>
        <button type="button" className="ql-list" value="bullet">
          Bullet 리스트
        </button>
        <button type="button" className="ql-indent" value="-1">
          오른쪽 Indent
        </button>
        <button type="button" className="ql-indent" value="+1">
          왼쪽 Indent
        </button>
      </div>
      <div className="ql-formats">
        <button type="button" className="ql-color">
          텍스트 색상
        </button>
        <button type="button" className="ql-background">
          택스트 배경색상
        </button>
        <button type="button" className="ql-align">
          텍스트 정렬
        </button>
      </div>
      <div className="ql-formats">
        <button type="button" className="ql-link">
          링크 첨부
        </button>
        <button type="button" className="ql-image">
          이미지
        </button>
      </div>
    </Container>
  )
}

export default Toolbar

const Container = styled.div`
  background-color: white;
`
