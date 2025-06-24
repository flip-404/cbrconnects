import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import KakaoIcon from '@/assets/desktop/kakao_icon.svg'
import GoogleIcon from '@/assets/desktop/google_icon.svg'
import CloseIcon from '@/assets/desktop/close_icon.svg'
import useUser from '@/hooks/useUser'
import supabase, { siteUrl } from '@/libs/supabaseClient'
import LoginInput from './LoginInput'

type SignInCredentials = { email: string; password: string }

function LoginModal({ closeModal }: { closeModal: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInCredentials>({ mode: 'onBlur' })
  const { login } = useUser()

  const handleCredentialsLogin = async (formData: SignInCredentials) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })
    if (!error) {
      login()
      closeModal()
    } else {
      alert('로그인 정보가 올바르지 않습니다.')
    }
  }

  const handleKakaoLogin = async () => {
    console.log('kakao login 디버깅 siteUrl', siteUrl)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: { redirectTo: `${siteUrl}/auth/callback` },
    })
    if (!error) {
      login()
      closeModal()
    } else {
      alert('카카오 로그인에 실패했습니다.')
    }
  }

  const handleGoogleLogin = async () => {
    console.log('google login 디버깅 siteUrl', siteUrl)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${siteUrl}/auth/callback` },
    })
    if (!error) {
      login()
      closeModal()
    } else {
      alert('카카오 로그인에 실패했습니다.')
    }
  }

  return (
    <ModalOverlay onClick={closeModal}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <IconWrapper>
          <CloseIcon onClick={closeModal} />
        </IconWrapper>
        <H1>캔버라 커넥트</H1>
        <LoginForm onSubmit={handleSubmit(handleCredentialsLogin)}>
          <LoginInput
            id="id"
            placeholder="이메일을 입력해 주세요"
            register={register('email', {
              required: '이메일을 입력해 주세요.',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: '올바른 이메일 주소를 입력하세요.',
              },
            })}
            isError={Boolean(errors.email)}
            errorMessage={errors.email?.message || ''}
          />
          <LoginInput
            id="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            register={register('password', { required: '비밀번호를 입력해 주세요' })}
            isError={Boolean(errors.password)}
            errorMessage={errors.password?.message || ''}
          />
          <ExtraFeatureContainer>
            <CheckboxWrapper>
              <Checkbox type="checkbox" id="rememberMe" />
              <CheckboxLabel htmlFor="rememberMe">로그인 상태 유지</CheckboxLabel>
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
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Modal = styled.div`
  border-radius: 12px;
  background: white;
  width: 33vw;
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

const SocialLoginButton = styled.button<{ $socialType: string; disabled?: boolean }>`
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  position: relative;
  text-align: center;
  padding: 19px 22px;
  background: ${(props) => (props.$socialType === 'kakao' ? '#FFEB02' : 'transparent')};
  border: ${(props) => (props.$socialType === 'kakao' ? 'none' : '0.87px solid #D8D8D8')};
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
