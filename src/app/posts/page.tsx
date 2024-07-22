'use client'

import { Suspense } from 'react'
import PostViewer from './PostViwer'

function Posts() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostViewer />
    </Suspense>
  )
}

export default Posts
