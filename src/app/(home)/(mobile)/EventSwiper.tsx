/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const images = [
  '/SecondEventImage.png',
  '/FirstEventImage.png',
  '/SecondEventImage.png',
  '/FirstEventImage.png',
  '/SecondEventImage.png',
]

export default function EventSwiper() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    startAutoPlay()
    return () => stopAutoPlay()
  }, [currentSlide])

  const startAutoPlay = () => {
    stopAutoPlay()
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length)
    }, 3000)
  }

  const stopAutoPlay = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current)
    }
  }

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length)

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)

  return (
    <SliderContainer onMouseEnter={stopAutoPlay} onMouseLeave={startAutoPlay}>
      <SlideWrapper
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((src, index) => (
          <Slide key={src}>
            <EventImage src={src} alt={`이벤트 이미지 ${index + 1}`} />
          </Slide>
        ))}
      </SlideWrapper>
      <NavButton onClick={prevSlide}>‹</NavButton>
      <NavButton onClick={nextSlide}>›</NavButton>
      <Pagination>
        {currentSlide + 1} / {images.length}
      </Pagination>
    </SliderContainer>
  )
}

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  overflow: hidden;
  margin: auto;
  height: 300px;
  display: flex;
`

const SlideWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: ${images.length * 100}%;
`

const Slide = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const EventImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  &:first-of-type {
    left: 10px;
  }
  &:last-of-type {
    right: 10px;
  }
`

const Pagination = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;
  display: flex;
  justify-content: center;
  background: #ffffff47;
  border-radius: 999px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 32px;
  text-align: left;
  padding: 0px 18px;
  color: #ffffff;
`
