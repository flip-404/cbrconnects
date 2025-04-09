import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useStoryStore } from '@/store/useStoryStore'
import api from '@/libs/axiosInstance'
import { GET_Stories } from '@/types/newIndex'

interface Story extends GET_Stories {
  read?: boolean
  timestamp?: number
}

export const useStories = () => {
  const { readStories, markAsRead, clearOldStories } = useStoryStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['stories'],
    queryFn: ({ queryKey }) => api.get(`/${queryKey[0]}`),
  })

  useEffect(() => {
    clearOldStories()
  }, [clearOldStories])

  const sortedStories = useMemo(() => {
    if (!data?.data?.stories) return []
    const stories = data?.data?.stories as GET_Stories[]

    const enrichedStories = stories.map((story: GET_Stories): Story => {
      const readData = readStories[story.id]
      return {
        ...story,
        read: readData?.read ?? false,
        timestamp: readData?.timestamp ?? 0,
      }
    })

    const unread = enrichedStories
      .filter((story) => !story.read)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    const read = enrichedStories
      .filter((story) => story.read)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return [...unread, ...read]
  }, [data, readStories])

  return {
    stories: sortedStories,
    markAsRead,
    isLoading,
    error,
  }
}
