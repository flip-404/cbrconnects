'use client'

import useUser from '@/hooks/useUser'
import Link from 'next/link'
import { loginButton } from './MobileHome.css'

export default function LoginButton() {
  const { user } = useUser()

  return (
    <>
      {!user && (
        <Link href="/login" className={loginButton}>
          로그인
        </Link>
      )}
    </>
  )
}
