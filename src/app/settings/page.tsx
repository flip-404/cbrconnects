'use client'

import styled from 'styled-components'
import EmptyImage from '@/assets/empty_profile.svg'
import { useForm } from 'react-hook-form'
import { useRef } from 'react'
import SettingInput from './SettingInput'
import ChangePassword from './ChangePassword'

export interface SettingsForm {
  email: string
  nickname: string
  profileImage: string | null
  password: string
  passwordCheck: string
}

function Settings() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SettingsForm>({
    mode: 'onBlur',
    defaultValues: {
      email: 'aka404365@gmail.com',
      nickname: '김태성',
      password: '비밀번호 변경은 이메일 로그인만 가능합니다.',
    },
    // defaultValues: { email: 'aka404365@gmail.com', nickname: '김태성' } || {},
    // ToDo: DefaultValue 받아오기
  })
  const passwordRef = useRef<string>('')
  passwordRef.current = watch('password')

  //   ToDo userProvider에 따라 비밀번호 변경 버튼 만든 후, disabled

  const onValid = async (formData: SettingsForm) => {
    console.log('formData', formData)
    // if provider === email 슈퍼베이스 업데이트
    // if (formData.password === '비밀번호 변경은 이메일 로그인만 가능합니다.') {
    //   delete formData.password
    //   delete formData.passwordCheck
    // }
    console.log('formData', formData)
  }

  return (
    <Container>
      <h3>프로필 수정</h3>
      <div>
        <ImageEdit>
          <EmptyImage />
          프로필 사진 변경
          <label htmlFor="profileImage">
            파일 선택
            <input id="profileImage" type="file" />
          </label>
          프로필 사진 삭제
        </ImageEdit>
        <DetailEdit onSubmit={handleSubmit(onValid)}>
          {/* 이메일 Default Value 추가 */}
          <SettingInput label="이메일" disabled register={register('email')} />
          <SettingInput
            label="닉네임"
            register={register('nickname', {
              required: '닉네임을 입력해 주세요.',
              //   validate: async (value) => {
              //     return (
              //       (await checkExists(value, 'nickname')) ||
              //       '이미 존재하는 닉네임입니다.'
              //     )
              //   },
            })}
            errorMessage={errors.nickname?.message || ''}
          />
          {false && (
            <Container>
              <SettingInput
                label="비밀번호 변경"
                type="password"
                register={register('password', {
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
                errorMessage={errors.password?.message || ''}
              />
              <SettingInput
                type="password"
                register={register('passwordCheck', {
                  required: '비밀번호를 한번 더 입력해 주세요.',
                  validate: (passwordCheck) =>
                    passwordCheck === passwordRef.current ||
                    '비밀번호가 일치하지 않습니다.',
                })}
                errorMessage={errors.passwordCheck?.message || ''}
              />
            </Container>
          )}
          <Controls>
            <button type="submit">저장</button>
            <button>캔버라커넥트 탈퇴</button>
          </Controls>
        </DetailEdit>
      </div>
    </Container>
  )
}

export default Settings

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > h3 {
    width: 1300px;
    font-size: 38px;
    font-weight: 800;
  }

  & > div {
    width: 1300px;
    display: flex;
  }
`

const ImageEdit = styled.div`
  width: 300px;
  margin-right: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  svg {
    width: 300px;
    height: 300px;
    background-color: #f0f0f0;
  }
`

const DetailEdit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
`

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 0 30px 0;

  button {
    all: unset;
    border-radius: 4px;
    padding: 10px 20px;
    background-color: #007aff;
    font-weight: 600;
    color: white;
  }
`
