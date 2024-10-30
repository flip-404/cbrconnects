'use client'

import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import TabData from '@/mocks/tabData'
import { Post } from '@prisma/client'
import { useState } from 'react'
import { findLabelById } from '@/utils/getCategoryInfo'

type PostsByCategoryType = {
  all: Post[]
  community: Post[]
  job: Post[]
  market: Post[]
  rentshare: Post[]
}

export default function MobileHomeBoard({
  postsByCategory,
  handleMoveToPost,
}: {
  postsByCategory: PostsByCategoryType
  handleMoveToPost: (PostId: number) => void
}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  return (
    <Container>
      <Title>
        {currentSlideIndex === 0
          ? '최근 올라온 게시글'
          : TabData[currentSlideIndex].label}
        {TabData[currentSlideIndex].icon}
      </Title>
      <StyledSlider
        afterChange={(index) => setCurrentSlideIndex(index)}
        slidesToShow={1}
        slidesToScroll={1}
        infinite
        draggable={false}
        autoplay={true}
        autoplaySpeed={5000}
        dots
      >
        {postsByCategory &&
          TabData.map((tab) => {
            return (
              <>
                {postsByCategory[tab.category as keyof PostsByCategoryType].map(
                  (post, postIndex) => (
                    <PostItem
                      key={post.id}
                      $category={post.subCategory}
                      onClick={() => handleMoveToPost(post.id)}
                    >
                      <Number>{postIndex + 1}</Number>
                      <span>
                        {post.subCategory
                          ? findLabelById(post.subCategory)
                          : findLabelById(post.mainCategory)}
                      </span>
                      {post.title}
                    </PostItem>
                  ),
                )}
              </>
            )
          })}
      </StyledSlider>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  font-family: NanumSquare Neo;
  font-size: 16px;
  font-weight: 700;
  color: #282e38;
`

const StyledSlider = styled(Slider)`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background: #f7f7f7;
  padding: 0px 16px;

  .slick-dots {
    bottom: -30px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .slick-dots li {
    width: 8px;
    height: 8px;
  }

  .slick-dots li button:before {
    font-size: 0;
    content: '';
    width: 8px;
    height: 8px;
    background-color: #a2acb9;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .slick-dots li.slick-active button:before {
    width: 12px;
    background-color: #64748b;
    border-radius: 12px;
  }
`

const PostItem = styled.div<{ $category: string | null }>`
  cursor: pointer;
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 400;

  span {
    margin-right: 4px;
    color: ${(props) => {
      switch (props.$category) {
        case 'freeboard':
          return '#AF52DE'
        case 'news':
          return '#5A75FF'
        case 'club':
          return '#4F4AE8'
        case 'yesmigration':
          return '#1836D1'
        case 'parcel':
          return '#0099FF'
        case 'business':
          return '#1196AD'
        case 'offer':
          return '#5A75FF'
        case 'search':
          return '#0099FF'
        case 'rent':
          return '#4F4AE8'
        case 'share':
          return '#AF52DE'

        default:
          return '#0099FF'
      }
    }};
  }
`

const Number = styled.div`
  margin-right: 10px;
  background: #d9e1fd;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-family: SUIT;
  font-size: 12px;
  font-weight: 600;
  color: #1b2a62;
`
