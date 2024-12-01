'use client'

import styled from 'styled-components'
import CloseIcon from '@/assets/mobile/close.svg'
import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import MyInfoInput from '../_components/MyInfoInput'

type PasswordForm = {
  prevPassword: string
  newPassword: string
  newPasswordCheck: string
}

function EditPasswordModal({ onClose }: { onClose: () => void }) {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    setError,
  } = useForm<PasswordForm>({
    mode: 'onChange',
  })
  const { data: session } = useSession()
  const [disabled, setDisabled] = useState(false)
  const newPasswordRef = useRef<string>('')
  newPasswordRef.current = watch('newPassword')

  const onValid = async (formData: PasswordForm) => {
    setDisabled(true)
    const { prevPassword, newPassword } = formData
    const response = await fetch('/api/change-password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userAuthId: session?.user.id,
        prevPassword,
        newPassword,
      }),
    })

    const result = await response.json()
    if (!response.ok) {
      if (result.message === '기존 비밀번호가 잘못되었습니다.') {
        setError('prevPassword', {
          type: 'manual',
          message: result.message,
        })
        setDisabled(false)
      }
    } else {
      onClose()
    }
  }

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <Title>비밀번호 변경</Title>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <Description>안전한 비밀번호로 내정보를 보호하세요.</Description>
        <Content>
          <StyledForm onSubmit={handleSubmit(onValid)}>
            <MyInfoInput
              id="prevPassword"
              type="password"
              placeholder="기존 비밀번호를 입력해 주세요."
              register={register('prevPassword')}
              isError={Boolean(errors.prevPassword)}
              errorMessage={errors.prevPassword?.message || ''}
            />
            <InputWrapper>
              <MyInfoInput
                id="newPassword"
                label="비밀번호(PW) 변경"
                type="password"
                placeholder="변경할 비밀번호를 입력해 주세요."
                register={register('newPassword', {
                  required: '비밀번호는 필수 입력 사항입니다.',
                  minLength: {
                    value: 6,
                    message: '비밀번호는 최소 6자 이상이어야 합니다.',
                  },
                  maxLength: {
                    value: 15,
                    message: '비밀번호는 최대 15자 이하이어야 합니다.',
                  },
                  validate: {
                    hasLetter: (value) =>
                      /[a-zA-Z]/.test(value) ||
                      '영문자가 하나 이상 포함되어야 합니다.',
                    hasNumber: (value) =>
                      /\d/.test(value) || '숫자가 하나 이상 포함되어야 합니다.',
                  },
                })}
                isError={Boolean(errors.newPassword)}
                errorMessage={errors.newPassword?.message || ''}
              />
              <MyInfoInput
                id="newPasswordCheck"
                type="password"
                placeholder="변경할 비밀번호를 한번 더 입력해 주세요."
                register={register('newPasswordCheck', {
                  required: '변경할 비밀번호를 한번 더 입력해 주세요.',
                  validate: (newPasswordCheck) =>
                    newPasswordCheck === newPasswordRef.current ||
                    '비밀번호가 일치하지 않습니다.',
                })}
                isError={Boolean(errors.newPasswordCheck)}
                errorMessage={errors.newPasswordCheck?.message || ''}
              />
            </InputWrapper>
            <ButtonWrapper>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  onClose()
                }}
              >
                취소
              </Button>
              <Button disabled={disabled}>
                {disabled ? '비밀번호 변경 중..' : '변경'}
              </Button>
            </ButtonWrapper>
          </StyledForm>
        </Content>
      </ModalContainer>
    </Overlay>
  )
}

export default EditPasswordModal

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContainer = styled.div`
  background: white;
  min-width: 860px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 768px) {
    min-width: 375px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e3e8;
  padding-bottom: 10px;
`

const Title = styled.h2`
  margin: 0px;
  font-family: Apple SD Gothic Neo;
  font-size: 22px;
  font-weight: 700;
  line-height: 26.4px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`

const Content = styled.div`
  padding: 20px 0;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Description = styled.div`
  margin-top: 12px;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: 21.48px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 17px;
`

const Button = styled.button<{ disabled?: boolean }>`
  cursor: pointer;
  margin-top: 32px;
  flex: 1;
  background: #e0e3e8;
  padding: 18px 0px;
  border-radius: 7px;
  border: none;

  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.48px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  &:last-child {
    cursor: ${(props) => (props.disabled ? 'wait' : 'pointer')};
    color: ${(props) => (props.disabled ? 'black' : '#f7f7f7')};
    background: ${(props) => (props.disabled ? '#e0e3e8' : '#282e38')};
  }
`
