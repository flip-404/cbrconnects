import styled from 'styled-components'
import Image, { StaticImageData } from 'next/image'
import SeparatorIcon from '@/assets/desktop/small_separetor_icon.svg'

type PostType = {
  imgSrc: StaticImageData
  title: string
  createdAt: string
}

export default function PromotionListItem({ post }: { post: PostType }) {
  return (
    <Container>
      <Thumbnail src={post.imgSrc} alt="업소 홍보 이미지" />
      <Content>
        <Title>{post.title}</Title>
        <Detail>
          업소홍보
          <SeparatorIcon />
          {post.createdAt}
        </Detail>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 12px;
  }
`

const Thumbnail = styled(Image)`
  width: 100%;
  height: 115px;
  border-radius: 12px;
  @media (max-width: 768px) {
    height: 100%;
    width: 130px;
  }
`

const Content = styled.div`
  padding-top: 12px;
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`

const Title = styled.span`
  font-family: Apple SD Gothic Neo;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  color: #222222;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`

const Detail = styled.span`
  margin-top: 4px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  display: flex;
  gap: 9px;
  color: #949494;
`
