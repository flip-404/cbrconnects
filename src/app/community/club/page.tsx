'use client'

import { useSession } from 'next-auth/react'

function Club() {
  const data = useSession()
  console.log('data', data)
  return <div />
}

export default Club
