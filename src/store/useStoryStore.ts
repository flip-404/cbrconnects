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
  markAsRead: (storyId: number) => void
  clearOldStories: () => void
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000

export const useStoryStore = create<StoryStore>()(
  persist(
    (set, get) => ({
      readStories: {},

      markAsRead: (storyId: number) => {
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
