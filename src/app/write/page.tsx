/* eslint-disable import/no-extraneous-dependencies */

'use client'

import React, { Suspense } from 'react'

import 'react-quill/dist/quill.snow.css'
import '@/styles/react-quill-custom.css'
import PostEditor from './PostEditor'

function Write() {
  /* <Suspense>에 대해 공부 후 추후 개선 및 적용해야함 */
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostEditor />
    </Suspense>
  )
}

export default Write
