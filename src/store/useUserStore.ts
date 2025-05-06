import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  profile_image: string | null
  nickname: string
  description: string | null
  user_group: 'User' | 'Admin'
}

interface UserState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    },
  ),
)

export default useUserStore
