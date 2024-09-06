import styled from 'styled-components'
import { SignInForm } from '@/app/api/(user)/signin/route'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import KakaoIcon from '@/assets/kakao_icon.svg'
import GoogleIcon from '@/assets/google_icon.svg'
import CloseIcon from '@/assets/close_icon.svg'
import LoginInput from './LoginInput'

function LoginModal({ toggleModal }: { toggleModal: () => void }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    mode: 'onBlur',
  })

  const handleCredentialsLogin = async (formData: SignInForm) => {
    await signIn('credentials', {
      userAuthId: formData.userAuthId,
      password: formData.password,
      redirect: true,
      callbackUrl: '/',
    })
  }

  const handleKakaoLogin = async () => {
    await signIn('kakao', {
      redirect: true,
      callbackUrl: '/complete-profile',
    })
  }

  const handleGoogleLogin = async () => {
    await signIn('google', {
      redirect: true,
      callbackUrl: '/',
    })
  }

  return (
    <ModalOverlay onClick={toggleModal}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <IconWrapper>
          <CloseIcon onClick={toggleModal} />
        </IconWrapper>
        <H1>캔버라 커넥트</H1>
        <LoginForm onSubmit={handleSubmit(handleCredentialsLogin)}>
          <LoginInput
            id="id"
            placeholder="아이디를 입력해 주세요"
            register={register('userAuthId', {
              required: '아이디를 입력해 주세요',
            })}
            isError={Boolean(errors.userAuthId)}
            errorMessage={errors.userAuthId?.message || ''}
          />
          <LoginInput
            id="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            register={register('password', {
              required: '비밀번호를 입력해 주세요',
            })}
            isError={Boolean(errors.password)}
            errorMessage={errors.password?.message || ''}
          />
          <ExtraFeatureContainer>
            <CheckboxWrapper>
              <Checkbox type="checkbox" id="rememberMe" />
              <CheckboxLabel htmlFor="rememberMe">
                로그인 상태 유지
              </CheckboxLabel>
            </CheckboxWrapper>
            <div>
              <FindFeature>아이디 · 비밀번호 찾기</FindFeature>
            </div>
          </ExtraFeatureContainer>{' '}
          <CredentialLoginButton type="submit">로그인</CredentialLoginButton>
        </LoginForm>
        <ButtonContainer>
          {' '}
          <SocialLoginButton $socialType="kakao" onClick={handleKakaoLogin}>
            <KakaoIcon /> 카카오톡으로 시작하기
          </SocialLoginButton>
          <SocialLoginButton $socialType="google" onClick={handleGoogleLogin}>
            <GoogleIcon /> Google로 시작하기
          </SocialLoginButton>
          <SignUpButton
            onClick={() => {
              toggleModal()
              router.push('/signup')
            }}
          >
            회원가입
          </SignUpButton>
        </ButtonContainer>
      </Modal>
    </ModalOverlay>
  )
}

export default LoginModal

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
`

const Modal = styled.div`
  z-index: 999;
  border-radius: 12px;
  background: white;
  width: 33vw;
  height: 70vh;
  padding: 36px 36px 80px 36px;
  overflow-x: hidden;
`
const IconWrapper = styled.div`
  display: flex;
  justify-content: end;

  svg {
    cursor: pointer;
  }
`

const H1 = styled.h1`
  text-align: center;
  font-family: Pretendard;
  font-size: 34.96px;
  font-weight: 800;
  line-height: 41.95px;
  margin: 31px 0px;
  color: #3e65f1;
`

const LoginForm = styled.form`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 24px;
  border-bottom: 0.87px solid #d2d2d2;
`

const ExtraFeatureContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;

  text-align: left;
  color: #787878;
  cursor: pointer;
`

const CheckboxWrapper = styled.div`
  display: flex;

  align-items: center;
  gap: 8px;
`

const Checkbox = styled.input`
  appearance: none;
  border: 1px solid #d8d8d8;
  margin: 0px;
  width: 18px;
  height: 18px;
  border-radius: 2px;

  &:checked {
    background-color: #363636;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
  }
`

const CheckboxLabel = styled.label``

const FindFeature = styled.div`
  text-decoration: underline;
`
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  gap: 16px;
`

const CredentialLoginButton = styled.button`
  cursor: pointer;
  position: relative;
  text-align: center;
  padding: 19px 22px;
  background: #363636;
  border: none;
  border-radius: 7px;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  color: #f1f1f1;
`

const SocialLoginButton = styled.button<{ $socialType: string }>`
  cursor: pointer;
  position: relative;
  text-align: center;
  padding: 19px 22px;
  background: ${(props) =>
    props.$socialType === 'kakao' ? '#FFEB02' : 'transparent'};
  border: ${(props) =>
    props.$socialType === 'kakao' ? 'none' : '0.87px solid #D8D8D8'};
  border-radius: 7px;

  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  color: #313131;

  svg {
    position: absolute;
    left: 22px;
    top: 50%;
    transform: translateY(-50%);
  }
`

const SignUpButton = styled.button`
  cursor: pointer;
  position: relative;
  text-align: center;
  padding: 19px 22px;
  background: transparent;
  border: 1px solid #c1c1c1;
  border-radius: 7px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  color: #222222;
`
