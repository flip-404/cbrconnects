/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import ImageResize from 'quill-image-resize-module-react'
import { ImageDrop } from 'quill-image-drop-module'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import api from '@/libs/axiosInstance'
import formats from './default'
import Header from './Header'
import CategoryAndTitle from './CategoryAndTitle'
import NotificationModal from '../_components/NotificationModal'
import useUser from '../hooks/useUser'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'

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
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useUser()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const quillRef = useRef<ReactQuill>()
  const [thumbnail, setThumbnail] = useState(null)
  const [mainCategory, setMainCateogy] = useState<Category | null>(null)
  const [subCategory, setSubCategory] = useState<Category | null>(null)
  const [errorModal, setErrorModal] = useState<null | string>(null)
  const { data } = useSWR(`/api/category`, fetcher)
  const categories = data?.categories

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

  const handleWritePost = async () => {
    if (!title) {
      setErrorModal('제목은 필수 입력입니다.')
      return
    }
    if (!content) {
      setErrorModal('본문은 필수 입력입니다.')
      return
    }
    if (mainCategory?.label !== '쿼카마켓' && (!mainCategory || !subCategory)) {
      setErrorModal('게시판을 선택해 주세요.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.back()
    }, 2000)

    try {
      const res = await api.post('/posts', {
        title,
        content,
        userId: user?.id,
        mainCategoryId: mainCategory.id,
        subCategoryId: subCategory?.id,
        thumbnail: thumbnail || undefined,
        isNotice: false,
      })
    } catch (e) {}
  }

  const handleChange = (value: string) => {
    setContent(value)
  }

  return (
    <Container>
      <Header onClickWrite={handleWritePost} />
      <CategoryAndTitle
        categories={categories}
        mainCategory={mainCategory}
        subCategory={subCategory}
        title={title}
        onMainCgChange={setMainCateogy}
        onSubCgChange={setSubCategory}
        onTitleChange={setTitle}
      />
      <QuillContainer>
        <DynamicReactQuill
          forwardedRef={quillRef}
          theme="snow"
          modules={modules}
          formats={formats}
          value={content}
          onChange={handleChange}
        />
      </QuillContainer>
      {errorModal && (
        <NotificationModal
          label={errorModal}
          onCheck={() => {
            setErrorModal(null)
          }}
          onCheckLabel="확인"
        />
      )}
    </Container>
  )
}

export default PostEditor

const Container = styled.div`
  margin-top: 80px;
  background-color: #fafafa;
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
