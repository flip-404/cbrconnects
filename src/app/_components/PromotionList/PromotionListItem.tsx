import styled from 'styled-components'
import Image, { StaticImageData } from 'next/image'
import SeparatorIcon from '@/assets/small_separetor_icon.svg'

type PostType = {
  imgSrc: StaticImageData
  title: string
  createdAt: string
}

export default function PromotionListItem({ post }: { post: PostType }) {
  return (
    <Container>
      <Thumbnail src={post.imgSrc} alt="업소 홍보 이미지" />
      <Title>{post.title}</Title>
      <Detail>
        업소홍보
        <SeparatorIcon />
        {post.createdAt}
      </Detail>
    </Container>
  )
}

const Container = styled.div`
  flex: 0.25;
`

const Thumbnail = styled(Image)`
  width: 204px;
  height: 115px;
  border-radius: 12px;
`

const Title = styled.span`
  margin-top: 12px;
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
