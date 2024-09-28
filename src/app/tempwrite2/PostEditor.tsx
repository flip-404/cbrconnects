/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import styled from 'styled-components'
import { useRouter, useSearchParams } from 'next/navigation'
import NavsData, { NavsDataType } from '@/mocks/NavsData'
import { useSession } from 'next-auth/react'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import ImageResize from 'quill-image-resize-module-react'
import { ImageDrop } from 'quill-image-drop-module'
import ReactQuill, { Quill } from 'react-quill'
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
import { PostWithRelations } from '@/types'
import NotificationModal from '../_components/NotificationModal'
import Toolbar from './Toolbar'

const fontSize = ['14px', '16px', '18px', '24px', '28px', '32px']
const Size = Quill.import('attributors/style/size')
Size.whitelist = fontSize
Quill.register(Size, true)

const DynamicReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')
    return function comp({
      forwardedRef,
      ...props
    }: {
      forwardedRef: any
      [key: string]: any
    }) {
      return <RQ ref={forwardedRef} {...props} />
    }
  },
  {
    ssr: false,
  },
)

function PostEditor() {
  const quillRef = useRef<ReactQuill>()
  const modules = useMemo(
    () => ({
      toolbar: {
        container: '#toolbar',
        handlers: {},
      },
    }),
    [],
  )

  const formats = [
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ]

  return (
    <Container>
      <QuillContainer>
        <Toolbar />
        <DynamicReactQuill
          forwardedRef={quillRef}
          theme="snow"
          modules={modules}
          formats={formats}
        />
      </QuillContainer>
    </Container>
  )
}

export default PostEditor

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100vw;
  height: 100vh;
  padding-top: 50px;
  align-items: center;
`

const Header = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  gap: 1rem;
`
const TitleLabel = styled.label``

const TitleInput = styled.input`
  flex: 1;
  font-size: 20px;
  font-weight: 700;
  padding: 1rem;
`

const CategoryWrapper = styled.div`
  font-size: 24px;
  font-weight: bold;
`

const WriteButton = styled.button`
  padding: 10px 15px;
  background-color: rgba(136, 137, 209, 0.12);
  color: #2a50da;
  font-size: 18px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;

  &:hover {
    opacity: 0.8;
  }
`

const QuillContainer = styled.div`
  width: 80%;
  height: 60%;

  .ql-editor {
    height: 40rem;
    overflow-y: scroll;
  }
`
