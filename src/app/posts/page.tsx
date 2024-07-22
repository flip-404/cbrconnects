'use client'

import { Suspense } from 'react'
import SearchResult from '../search/SearchResult'

function Posts() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResult />
    </Suspense>
  )
}

export default Posts
