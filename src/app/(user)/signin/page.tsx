'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'

function SignIn() {
  const router = useRouter()

  return (
    <SignInContainer>
      <SignInForm>
        <Title>로그인</Title>

        <FormGroup>
          <Label htmlFor="username">아이디</Label>
          <Input type="text" id="username" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">비밀번호</Label>
          <Input type="password" id="password" />
        </FormGroup>

        <CheckboxContainer>
          <div>
            <Checkbox type="checkbox" id="rememberMe" />
            <CheckboxLabel htmlFor="rememberMe">자동 로그인</CheckboxLabel>
          </div>
          <div>
            <StyledLink scroll={false} href="#">
              아이디 찾기
            </StyledLink>
            <span>|</span>
            <StyledLink scroll={false} href="#">
              비밀번호 찾기
            </StyledLink>
          </div>
        </CheckboxContainer>

        <SocialLoginContainer>
          <p>또는</p>
          <SocialLoginButton bgColor="#FFEB00" hoverColor="#FFC800">
            카카오로 간편로그인
          </SocialLoginButton>
          <SocialLoginButton bgColor="#EA4335" hoverColor="#CC3127">
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
      </SignInForm>
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
  padding: 16px;
`

const SignInForm = styled.div`
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

const FormGroup = styled.div`
  margin-bottom: 16px;
`

const Label = styled.label`
  display: block;
  color: #374151;
  margin-bottom: 8px;
`

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
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

const SocialLoginButton = styled.button<{
  bgColor: string
  hoverColor: string
}>`
  width: 100%;
  background-color: ${(props) => props.bgColor};
  color: #ffffff;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.hoverColor};
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
