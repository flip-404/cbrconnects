/* eslint-disable import/no-extraneous-dependencies */

'use client'

import React from 'react'

import 'react-quill/dist/quill.snow.css'
import '@/styles/react-quill-custom.css'
import dynamic from 'next/dynamic'

const PostEditor = dynamic(() => import('./PostEditor'), {
  ssr: false,
})

function Write() {
  return <PostEditor />
}

export default Write
