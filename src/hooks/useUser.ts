import { useEffect } from 'react'
import useUserStore from '@/store/useUserStore'
import supabase from '@/libs/supabaseClient'

export function useUser() {
  const { user, setUser, clearUser } = useUserStore()

  const login = async () => {
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user?.id

    if (!userId) {
      clearUser()
      return
    }

    const { data: userInfo, error } = await supabase
      .from('userinfo')
      .select('*')
      .eq('id', userId)
      .single()

    if (error || !userInfo) {
      clearUser()
    } else {
      setUser(userInfo)
      localStorage.setItem('user-storage', JSON.stringify({ state: { user: userInfo } }))
    }
  }
  useEffect(() => {
    login()
  }, [])

  return {
    user,
    isLoggedIn: !!user,
    login: login,
    logout: clearUser,
  }
}

export default useUser
