/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import styled from 'styled-components'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import ImageResize from 'quill-image-resize-module-react'
import { ImageDrop } from 'quill-image-drop-module'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import api from '@/libs/axiosInstance'
import formats from './default'
import useUser from '../../hooks/useUser'
import { boardLinks } from '../NewComponent/NewHeader'
import { useMutation, useQueryClient } from '@tanstack/react-query'

Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)

type NewPostType = {
  user: any
  title: string
  content: string
  category: string
  thumbnail: string | undefined
}

export type Category = {
  id: number
  label: string
  name: string
  subCategories?: Category[]
}

const DynamicReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')
    return function comp({ forwardedRef, ...props }: { forwardedRef: any; [key: string]: any }) {
      return <RQ ref={forwardedRef} {...props} />
    }
  },
  {
    ssr: false,
  },
)

function PostEditor() {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || 'FREEBOARD'
  const { user } = useUser()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const quillRef = useRef<ReactQuill>()
  const [thumbnail, setThumbnail] = useState(null)

  const { mutate: writePost } = useMutation({
    mutationFn: async (newPost: NewPostType) => await api.post('/posts', newPost),
    onSuccess: ({ data: post }) => {
      queryClient.invalidateQueries({
        queryKey: ['posts', category],
      })
      router.push('post?postId=' + post.id)
    },
  })

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
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
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

  const onClickWrite = async () => {
    if (!title || !content) {
      alert(title ? '본문은 필수 입력입니다.' : '제목은 필수 입력입니다.')
      return
    }
    writePost({
      user,
      title,
      content,
      category,
      thumbnail: thumbnail || undefined,
    })
  }

  const handleChange = (value: string) => {
    setContent(value)
  }

  return (
    <Container>
      <QuillContainer>
        <h1>{boardLinks.find((link) => link.category === category)?.label} 글쓰기</h1>
        <input placeholder="제목" onChange={(e) => setTitle(e.target.value)} value={title}></input>
        <DynamicReactQuill
          forwardedRef={quillRef}
          theme="snow"
          modules={modules}
          formats={formats}
          value={content}
          onChange={handleChange}
        />
        <WriteButton onClick={onClickWrite}>완료</WriteButton>
      </QuillContainer>
    </Container>
  )
}

export default PostEditor

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const QuillContainer = styled.div`
  width: 700px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding-top: 50px;

  h1 {
    margin: 0 0 20px 0;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 1px;
  }

  input {
    margin-bottom: 20px;
    font-weight: 400px;
    font-size: 20px;
    padding: 10px 15px;
  }

  .ql-editor {
    height: 430px;
    overflow-y: scroll;
  }
`

const WriteButton = styled.button`
  cursor: pointer;
  border: none;
  margin-top: 15px;
  background-color: #007aff;
  font-size: 17px;
  font-weight: 700;
  color: white;
  border-radius: 6px;
  width: 180px;
  height: 44px;
`
