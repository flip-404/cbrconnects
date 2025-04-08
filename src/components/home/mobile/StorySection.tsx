'use client'

import styled from 'styled-components'
import PlusIcon from '@/assets/mobile/plus.svg'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '@/libs/axiosInstance'
import { GET_Stories } from '@/types/newIndex'

import StoryEditor from './StoryEditor'
import { useStories } from '@/hooks/useStories'
import StoryViewer from './StoryViewer'

interface ReadStoryData {
  read: boolean
  timestamp: number
}

interface ReadStoriesState {
  [key: string]: ReadStoryData
}

export default function StorySection() {
  const [openStoryEditor, setOpenStoryEditor] = useState(false)
  const [activeStoryIndex, setActiveStoryIndex] = useState<null | number>(null)
  const { stories, markAsRead } = useStories()

  console.log('stories', stories)

  const closeEditor = () => {
    setOpenStoryEditor(false)
  }

  const closeViwer = () => {
    setActiveStoryIndex(null)
  }

  const handleStoryClick = (storyId: number, activeStoryIndex: number) => {
    markAsRead(storyId)
    setActiveStoryIndex(activeStoryIndex)
  }

  return (
    <Contaniner>
      {openStoryEditor && <StoryEditor closeEditor={closeEditor} />}
      {activeStoryIndex !== null && (
        <StoryViewer closeViwer={closeViwer} clickedIndex={activeStoryIndex} />
      )}
      <ul>
        {stories?.map((story, index: number) => (
          <li key={story.id}>
            <div>
              <button
                type="button"
                style={
                  story.author.profile_image
                    ? {
                        backgroundImage: `url(${story.author.profile_image})`,
                        opacity: story.read ? 0.5 : 1,
                      }
                    : {
                        opacity: story.read ? 0.5 : 1,
                      }
                }
                aria-label={`${story.author.nickname}의 스토리`}
                onClick={() => handleStoryClick(story.id, index)}
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
  overflow-x: auto;

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
