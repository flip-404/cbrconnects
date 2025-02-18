'use client'

import styled from 'styled-components'
import Slider from 'react-slick'
import Image from 'next/image'

const MockImages = [
  '/AustImage/호주1.jpg',
  '/AustImage/호주2.jpg',
  '/AustImage/호주3.jpg',
  '/AustImage/호주4.jpg',
  '/AustImage/호주5.jpg',
  '/AustImage/호주6.jpg',
  '/AustImage/호주7.jpg',
  '/AustImage/호주8.jpg',
]

function Promotion() {
  return (
    <Container>
      {MockImages.map((image, index) => (
        <div key={index}>
          <img src={image} alt={index.toString()} />
        </div>
      ))}
    </Container>
  )
}

export default Promotion

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  width: 1300px;

  & > div {
    overflow: hidden;
    border-radius: 10px;
    height: 250px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`
