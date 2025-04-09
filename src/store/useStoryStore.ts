import api from '@/libs/axiosInstance'
import { GET_Stories } from '@/types/newIndex'
import { useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ReadStoriesState = {
  [storyId: string]: {
    read: boolean
    timestamp: number
  }
}

export interface StoryStore {
  readStories: ReadStoriesState
  markAsRead: (storyId: number, queryClient: ReturnType<typeof useQueryClient>) => void
  clearOldStories: () => void
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000

export const useStoryStore = create<StoryStore>()(
  persist(
    (set, get) => ({
      readStories: {},

      markAsRead: (storyId: number, queryClient) => {
        api.patch('/stories', { storyId })

        // toDo: 실시간 데이터를 반영하기 위해 invalidateQueries가 필요할지 고민
        queryClient.setQueryData(['stories'], (oldData: AxiosResponse) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            data: oldData.data.stories.map((story: GET_Stories) =>
              story.id === storyId ? { ...story, views: story.views + 1 } : story,
            ),
          }
        })

        const currentTime = Date.now()
        set((state) => ({
          readStories: {
            ...state.readStories,
            [storyId]: { read: true, timestamp: currentTime },
          },
        }))
      },

      clearOldStories: () => {
        const currentTime = Date.now()
        const filtered = Object.entries(get().readStories).reduce<ReadStoriesState>(
          (acc, [id, data]) => {
            if (currentTime - data.timestamp < ONE_DAY_MS) {
              acc[id] = data
            }
            return acc
          },
          {},
        )
        set({ readStories: filtered })
      },
    }),
    {
      name: 'read-stories-storage',
    },
  ),
)
