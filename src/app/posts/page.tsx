'use client'

import { Suspense } from 'react'
import PostViewer from './PostViewer'

function Posts() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostViewer />
    </Suspense>
  )
}

export default Posts
