'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import AuthInput from '@/app/_components/AuthInput'
import { useForm } from 'react-hook-form'
import { SignInForm } from '@/app/api/(user)/signin/route'
import ErrorMessage from '@/app/_components/ErrorMessage'
import { getProviders, signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'

function SignIn() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    mode: 'onBlur',
  })

  const [providers, setProviders] = useState(null)

  useEffect(() => {
    ;(async () => {
      const res: any = await getProviders()
      console.log(res)
      setProviders(res)
    })()
  }, [])

  const handdleCredentialsLogin = async (formData: SignInForm) => {
    await signIn('credentials', {
      userId: formData.userId,
      password: formData.password,
      redirect: true,
      callbackUrl: '/',
    })
  }

  const handleKakao = async () => {
    await signIn('kakao', {
      redirect: true,
      callbackUrl: '/',
    })
  }

  return (
    <SignInContainer>
      <SignInBox>
        <Title>로그인</Title>
        <LoginForm onSubmit={handleSubmit(handdleCredentialsLogin)}>
          <div>
            <AuthInput
              id="id"
              label="아이디"
              placeholder="아이디를 입력해 주세요"
              required
              register={register('userId', {
                required: '아이디를 입력해 주세요',
              })}
              isError={Boolean(errors.userId)}
            />
            {errors.userId && <ErrorMessage message={errors.userId.message!} />}
          </div>
          <div>
            <AuthInput
              id="password"
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해 주세요"
              required
              register={register('password', {
                required: '비밀번호를 입력해 주세요',
              })}
              isError={Boolean(errors.password)}
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message!} />
            )}
          </div>
          <ExtraFeatureContainer>
            <CheckboxWrapper>
              <Checkbox type="checkbox" id="rememberMe" />
              <CheckboxLabel htmlFor="rememberMe">자동 로그인</CheckboxLabel>
            </CheckboxWrapper>
            <div>
              <StyledLink scroll={false} href="#">
                아이디 찾기
              </StyledLink>
              <span>|</span>
              <StyledLink scroll={false} href="#">
                비밀번호 찾기
              </StyledLink>
            </div>
          </ExtraFeatureContainer>
          <CredentialLoginButton type="submit">로그인</CredentialLoginButton>
        </LoginForm>

        <SocialLoginContainer>
          <p>또는</p>
          <SocialLoginButton
            onClick={handleKakao}
            $bgColor="#FFEB00"
            $hoverColor="#FFC800"
          >
            카카오로 간편로그인
          </SocialLoginButton>
          <SocialLoginButton $bgColor="#EA4335" $hoverColor="#CC3127">
            구글로 간편로그인
          </SocialLoginButton>
        </SocialLoginContainer>

        <SignUpButton
          onClick={() => {
            router.push('/signup')
          }}
        >
          회원가입
        </SignUpButton>
      </SignInBox>
    </SignInContainer>
  )
}

export default SignIn

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  padding: 5rem 0rem;
`

const SignInBox = styled.div`
  background-color: #ffffff;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ExtraFeatureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`

const CheckboxLabel = styled.label`
  color: #374151;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
`

const Checkbox = styled.input`
  margin-right: 8px;
`

const StyledLink = styled(Link)`
  color: #3b82f6;
  font-size: 0.875rem;
  margin: 0 4px;
`

const SocialLoginContainer = styled.div`
  text-align: center;
  margin-bottom: 24px;
`

const CredentialLoginButton = styled.button`
  width: 100%;
  font-weight: 700;

  padding: 8px;
  border-radius: 4px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`
const SocialLoginButton = styled.button<{
  $bgColor: string
  $hoverColor: string
}>`
  width: 100%;
  background-color: ${(props) => props.$bgColor};
  color: #ffffff;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.$hoverColor};
  }
`

const SignUpButton = styled.button`
  width: 100%;
  background-color: #3b82f6;
  color: #ffffff;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2563eb;
  }
`
