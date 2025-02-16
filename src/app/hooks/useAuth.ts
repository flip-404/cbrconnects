import { useEffect, useState } from 'react'
import SupabaseClient from '@supabase/supabase-js'

export default function useAuth() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await SupabaseClient.auth.getSession()
      setSession(data.session)
    }

    getSession()

    const { data: authListener } = SupabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      },
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return { session, SupabaseClient }
}
