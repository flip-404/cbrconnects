/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import ImageResize from 'quill-image-resize-module-react'
import { ImageDrop } from 'quill-image-drop-module'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import useUser from '../hooks/useUser'

Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)

export type Category = {
  id: number
  label: string
  name: string
  subCategories?: Category[]
}

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
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const quillRef = useRef<ReactQuill>()
  const [thumbnail, setThumbnail] = useState(null)

  const imageHandler = async () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file: any = input.files ? input.files[0] : null
      if (!file) return

      const formData = new FormData()
      formData.append('file', file)

      const quillObj = quillRef.current?.getEditor()
      if (quillObj) {
        const range = quillObj.getSelection()!

        quillObj.insertEmbed(range.index, 'image', '/ImageLoading.gif')

        const { imageURL } = await fetch(`/api/image`, {
          method: 'POST',
          body: formData,
        }).then((res) => {
          quillObj.deleteText(range.index, 1)
          return res.json()
        })
        quillObj?.insertEmbed(range.index, 'image', `${imageURL}`)
        quillObj.setSelection(range.index + 1, 1)
        if (!thumbnail) {
          setThumbnail(imageURL)
        }
      }
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }], // 텍스트 크기 옵션 추가
          ['bold', 'italic', 'underline', 'strike'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          [{ align: [] }, { color: [] }, { background: [] }],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      imageDrop: imageHandler,
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
    }),
    [],
  )

  const handleChange = (value: string) => {
    setContent(value)
  }

  return (
    <Container>
      <h2></h2>
      <QuillContainer>
        <DynamicReactQuill
          forwardedRef={quillRef}
          theme="snow"
          modules={modules}
          value={content}
          onChange={handleChange}
        />
      </QuillContainer>
    </Container>
  )
}

export default PostEditor

const Container = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  min-height: 80vh;
  padding-bottom: 100px;
`

const QuillContainer = styled.div`
  width: 80vw;
  height: 60%;
  background-color: white;

  .ql-editor {
    height: 40rem;
    overflow-y: scroll;
  }
`
