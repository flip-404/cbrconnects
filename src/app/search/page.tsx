'use client'

import { Suspense } from 'react'
import SearchResult from './SearchResult'

function Search() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResult />
    </Suspense>
  )
}

export default Search
