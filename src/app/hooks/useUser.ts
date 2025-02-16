import { useEffect } from 'react'
import useUserStore from '@/store/useUserStore'

export function useUser() {
  const { user, setUser, clearUser } = useUserStore()

  useEffect(() => {
    const storedUser = localStorage.getItem('user-storage')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser).state.user
        if (!parsedUser) clearUser()
        else setUser(parsedUser)
      } catch (error) {
        clearUser()
      }
    } else {
      clearUser()
    }
  }, [clearUser, setUser])

  return {
    user,
    isLoggedIn: !!user,
    login: setUser,
    logout: clearUser,
  }
}

export default useUser
