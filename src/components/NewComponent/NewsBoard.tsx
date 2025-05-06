'use client'

import styled from 'styled-components'
import api from '@/libs/axiosInstance'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { NewsItem } from '@/app/api/news/route'

function NewsBoard() {
  const { data } = useQuery({
    queryKey: ['news'],
    queryFn: () => api.get(`/news`),
  })
  const newsList = data?.data.newsList || []

  return (
    <Container>
      {newsList.slice(0, 8).map((news: NewsItem) => (
        <News key={news.link} style={{ backgroundImage: `url(${news.image})` }}>
          <Link href={news.link} target="_blank">
            {news.title}
          </Link>
        </News>
      ))}
    </Container>
  )
}

export default NewsBoard

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  width: 1300px;
  list-style: none;
  margin: 0;
  padding: 0;
`

const News = styled.li`
  height: 250px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: all 0.3s ease; /* Smooth transition for hover effect */
  a {
    all: unset;
    cursor: pointer;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: end;
    font-size: 22px;
    font-weight: 700;
    color: white;
    padding: 20px;
    text-shadow: 0 0 10px rgba(0, 0, 0, 1);
  }

  &:hover {
    box-shadow: inset 0 -20px 200px rgba(0, 0, 0, 0.4);
  }
`
