'use client'

import styled from 'styled-components'
import CloseIcon from '@/assets/mobile/story_close.svg'
import AddPhotoIcon from '@/assets/mobile/add_photo.svg'
import { useRef, useState } from 'react'
import api from '@/libs/axiosInstance'
import useUser from '@/hooks/useUser'
import { useQueryClient } from '@tanstack/react-query'

export default function StoryEditor({ closeEditor }: { closeEditor: () => void }) {
  const { user } = useUser()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [link, setLink] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    let imageURL = ''
    if (selectedImage) {
      const formData = new FormData()
      formData.append('file', selectedImage)
      const { data } = await api.post('/image', formData)
      imageURL = data.imageURL
    }

    const response = await api.post('/stories', {
      author_id: user?.id,
      content,
      link,
      image: imageURL,
    })

    if (response.status === 201) {
      queryClient.invalidateQueries({
        queryKey: ['stories'],
      })
      alert('스토리가 등록되었습니다')
    } else alert('스토리 등록에 실패했습니다')

    closeEditor()
  }

  return (
    <Contaniner
      onClick={stopPropagation}
      style={imagePreview ? { backgroundImage: `url(${imagePreview})` } : {}}
    >
      <Header>
        <span>캔버라커넥트</span>
        <button type="button" aria-label="close storyeditor" onClick={closeEditor}>
          <CloseIcon fill="white" />
        </button>
      </Header>
      <Body>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageSelect}
          accept="image/*"
          style={{ display: 'none' }}
        />
        {!selectedImage && (
          <button type="button" className="add-photo" onClick={openFileSelector}>
            <AddPhotoIcon />
            <span>사진 선택</span>
          </button>
        )}
        <div className="mention">
          <p>다양한 스토리를 사진과 함께 공유해보세요</p>
          <span>스토리는 24시간 뒤 자동으로 사라집니다</span>
        </div>
        <div className="input-wrapper">
          <input
            placeholder="링크"
            value={link}
            onChange={(e) => {
              setLink(e.target.value)
            }}
          />
          <input
            placeholder="내용"
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
            }}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            if (!content) alert('내용을 입력해주세요')
            else handleSubmit()
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? '스토리 등록 중...' : '등록'}
        </button>
      </Body>
    </Contaniner>
  )
}

const Contaniner = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0);
`

const Header = styled.div`
  z-index: 100;
  background-color: transparent;
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 50px;
  padding: 0 20px 0 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: white;
    font-family: var(--font-saira);
    font-size: 20px;
    letter-spacing: 1.5px;
    font-weight: 700;
  }

  button {
    all: unset;
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const Body = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 30px;

  .add-photo {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    margin-bottom: 20px;
  }

  .mention {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      margin: 0;
      color: white;
    }

    span {
      color: white;
      font-size: 11px;
    }
  }

  input {
    all: unset;
    box-sizing: border-box;
    border-bottom: 0.5px solid #ffffff2e;
    width: 100%;
    display: flex;
    padding: 10px;
    color: white;
    font-size: 14px;
    font-weight: 400;

    &::placeholder {
      color: white;
      font-size: 14px;
      font-weight: 400;
    }

    &:first-child {
      border-top: 0.5px solid #ffffff2e;
    }

    &:focus {
      border-bottom-color: white;
    }
  }

  .input-wrapper {
    width: 100%;
    margin-bottom: 20px;
  }

  button {
    all: unset;
    background-color: #ffffffcc;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    padding: 10px;
    font-size: 13px;
    font-weight: 600;
    width: 100px;
  }
`
