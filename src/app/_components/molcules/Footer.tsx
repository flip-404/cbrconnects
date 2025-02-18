'use client'

import styled from 'styled-components'

const Footer = () => {
  return (
    <Container>
      <Board>
        <Content>
          <div>
            <h3>서비스</h3>
            <ul>
              <li>자유게시판</li>
              <li>쿼카마켓</li>
              <li>구인구직</li>
              <li>홍보</li>
            </ul>
          </div>
          <div>
            <h3>지원</h3>
            <ul>
              <li>이용약관</li>
              <li>개인정보처리방침</li>
            </ul>
          </div>
          <div>
            <h3>소셜</h3>
            <ul>
              <li>Instagram</li>
              <li>Kakaotalk</li>
            </ul>
          </div>
        </Content>
        <Visited>
          <p>20,571,588</p>
          <span>Visits since 20 Dec 2004</span>
        </Visited>
      </Board>
      <CopyRight>ⓒ CBRCONNECTS ─ Contact ─ Designed by Matdongsan</CopyRight>
    </Container>
  )
}

export default Footer

const Container = styled.div`
  padding: 100px 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Board = styled.div`
  width: 1000px;
  display: flex;
  justify-content: space-between;
`

const Content = styled.div`
  display: flex;

  & > div {
    width: 200px;
    h3 {
      margin: 0 0 25px;
      font-size: 17px;
      font-weight: 600;
      color: #3c3c434d;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        font-size: 13px;
        font-weight: 400;
        margin: 0 0 13px;
      }
    }
  }
`

const Visited = styled.div`
  margin-top: -21px;
  display: flex;
  flex-direction: column;
  color: #3c3c432e;

  p {
    white-space: nowrap;
    margin: 0;
    font-size: 60px;
    font-weight: 400;
  }

  span {
    font-size: 15px;
    font-weight: 600;
  }
`

const CopyRight = styled.div`
  margin-top: 50px;
  width: 1000px;
  color: #3c3c434d;
  font-size: 11px;
`
