'use client'

import styled from 'styled-components'

const mockData = [
  '눈썹 시술 하는 곳 추천부탁드립니다! 눈썹 시술 하는 곳 추천부탁드립니다!',
  '눈썹 시술 하는 곳 추천부탁드립니다!',
  '눈썹 시술 하는 곳 추천부탁드립니다!',
  '눈썹 시술 하는 곳 추천부탁드립니다!',
  '눈썹 시술 하는 곳 추천부탁드립니다!',
]

function RecentPost() {
  return (
    <Container>
      <Title>최근글</Title>
      <PostBox>
        {mockData.map((post, idx) => (
          <Post key={post}>
            <Number>{idx + 1}</Number>
            {post.length > 40 ? `${post.substring(0, 40)}...` : post}
          </Post>
        ))}
      </PostBox>
    </Container>
  )
}

export default RecentPost

const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Title = styled.div`
  color: #ffffff;
  font-family: NanumSquare Neo;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  text-align: left;
`

const PostBox = styled.div`
  padding: 14px 16px;
  background: #505d6f;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Post = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: white;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
`

const Number = styled.div`
  border-radius: 12px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8390a2;
  color: #1b2a62;
  font-family: SUIT;
  font-size: 12px;
  font-weight: 600;
  line-height: 14.98px;
  text-align: left;
`
