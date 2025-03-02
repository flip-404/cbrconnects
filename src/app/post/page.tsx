import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const PostViewer = dynamic(() => import('./PostViewer'), {
  ssr: false,
})

function PostPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostViewer />
    </Suspense>
  )
}

export default PostPage
