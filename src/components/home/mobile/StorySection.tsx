'use client'

import styled from 'styled-components'
import PlusIcon from '@/assets/mobile/plus.svg'
import { useEffect, useState } from 'react'
import StoryEditor from './StoryEditor'
import { useQuery } from '@tanstack/react-query'
import api from '@/libs/axiosInstance'
import { GET_Stories } from '@/types/newIndex'

interface ReadStoryData {
  read: boolean
  timestamp: number
}

interface ReadStoriesState {
  [key: string]: ReadStoryData
}

export default function StorySection() {
  const [openStoryEditor, setOpenStoryEditor] = useState(false)
  const [readStories, setReadStories] = useState<ReadStoriesState>({})
  const { data } = useQuery({
    queryKey: ['stories'],
    queryFn: ({ queryKey }) => api.get(`/${queryKey[0]}`),
  })

  const {
    data: { stories },
  } = data || { data: { stories: [] } }

  console.log('stories', stories)

  const closeEditor = () => {
    setOpenStoryEditor(false)
  }

  const isStoryRead = (storyId: string): boolean => {
    return readStories[storyId]?.read === true
  }

  const handleStoryClick = (storyId: string) => {
    const currentTime = new Date().getTime()
    const updatedReadStories: ReadStoriesState = {
      ...readStories,
      [storyId]: { read: true, timestamp: currentTime },
    }
    setReadStories(updatedReadStories)
    localStorage.setItem('readStories', JSON.stringify(updatedReadStories))
  }

  useEffect(() => {
    const storedReadStories = localStorage.getItem('readStories')
    if (storedReadStories) {
      try {
        const parsedStories = JSON.parse(storedReadStories) as ReadStoriesState
        const currentTime = new Date().getTime()
        const ONE_DAY_MS = 24 * 60 * 60 * 1000

        const filteredStories = Object.entries(parsedStories).reduce<ReadStoriesState>(
          (acc, [storyId, storyData]) => {
            if (currentTime - storyData.timestamp < ONE_DAY_MS) {
              acc[storyId] = storyData
            }
            return acc
          },
          {},
        )

        setReadStories(filteredStories)
        localStorage.setItem('readStories', JSON.stringify(filteredStories))
      } catch (error) {
        setReadStories({})
        localStorage.setItem('readStories', JSON.stringify({}))
      }
    }
  }, [])

  return (
    <Contaniner>
      {openStoryEditor && <StoryEditor closeEditor={closeEditor} />}
      <ul>
        {stories?.map((story: GET_Stories) => (
          <li key={story.id}>
            <div>
              <button
                type="button"
                style={
                  story.author.profile_image
                    ? {
                        backgroundImage: `url(${story.author.profile_image})`,
                        opacity: isStoryRead(story.id.toString()) ? 0.5 : 1,
                      }
                    : {
                        opacity: isStoryRead(story.id.toString()) ? 0.5 : 1,
                      }
                }
                aria-label={`${story.author.nickname}의 스토리`}
                onClick={() => handleStoryClick(story.id.toString())}
              />
            </div>
          </li>
        ))}
        <li>
          <div>
            <button
              type="button"
              onClick={() => {
                setOpenStoryEditor(true)
              }}
              aria-label="새로운 스토리 추가"
            >
              <PlusIcon />
            </button>
          </div>
        </li>
      </ul>
    </Contaniner>
  )
}

const Contaniner = styled.div`
  box-sizing: border-box;
  padding: 20px;
  display: flex;

  ul {
    all: unset;
    display: flex;
    align-items: center;
    gap: 10px;

    li {
      list-style: none;

      div {
        width: 68px;
        height: 68px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        border: 1px dashed #d1d1d6;
        padding: 2.5px;

        button {
          all: unset;
          width: 100%;
          height: 100%;
          border-radius: 100%;
          background-color: #f2f2f7;
          display: flex;
          justify-content: center;
          align-items: center;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }
      }
    }
  }
`
