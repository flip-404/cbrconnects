'use client'

import styled from 'styled-components'
import CloseIcon from '@/assets/mobile/story_close.svg'
import { useStories } from '@/hooks/useStories'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useState } from 'react'

export default function StoryViewer({
  closeViwer,
  clickedIndex,
}: {
  closeViwer: () => void
  clickedIndex: null | number
}) {
  const [currentIndex, setCurrentIndex] = useState<null | number>(clickedIndex)
  const { stories, markAsRead } = useStories()

  //   todo: 스토리 읽음처리 고도화

  if (currentIndex === null) return null
  return (
    <Contaniner
      onClick={(e) => {
        e.stopPropagation()
      }}
      //   style={
      //     stories[currentIndex].image
      //       ? { backgroundImage: `url(${stories[currentIndex].image})` }
      //       : {}
      //   }
    >
      <Header>
        <span>캔버라커넥트</span>
        <button type="button" aria-label="close storyViewer" onClick={closeViwer}>
          <CloseIcon fill="white" />
        </button>
      </Header>

      <Body>
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          initialSlide={currentIndex}
          navigation
          onSlideChange={(swiper) => {
            const currentIndex = swiper.activeIndex
            if (stories[currentIndex]) {
              markAsRead(stories[currentIndex].id)
            }
          }}
        >
          {stories.map((story, index) => (
            <SwiperSlide
              key={story.id}
              id="slide122"
              style={story.image ? { backgroundImage: `url(${story.image})` } : {}}
            >
              <p>{story.content}</p>
              {story.link && (
                <div className="link">
                  <a href={story.link}>링크 이동</a>
                  <span>{story.author.nickname}님이 첨부한 링크가 있어요!</span>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </Body>
    </Contaniner>
  )
}

const Contaniner = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  background-color: #4a4646;
`

const Header = styled.div`
  z-index: 100;
  background-color: transparent;
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 50px;
  padding: 0 20px 0 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: white;
    font-family: var(--font-saira);
    font-size: 20px;
    letter-spacing: 1.5px;
    font-weight: 700;
  }

  button {
    all: unset;
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const Body = styled.div`
  box-sizing: border-box;
  height: 100%;

  width: 100%;

  .swiper-wrapper {
    height: 100vh;
    width: 100vw;
  }

  .swiper-slide {
    box-sizing: border-box;
    height: 100vh;
    width: 100vw;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 60px;

    & > p {
      box-sizing: border-box;

      margin: 0;
      word-break: keep-all;
      color: white;
      font-size: 20px;
      font-weight: 400;
    }

    .link {
      box-sizing: border-box;

      padding: 5px 10px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      & > a {
        color: white;
        font-size: 14px;
        font-weight: 400;
      }

      & > span {
        all: unset;
        text-decoration: none;
        color: white;
        font-size: 10px;
        font-weight: 400;
      }
    }
  }
`
