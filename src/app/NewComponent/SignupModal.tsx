import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import KakaoIcon from '@/assets/desktop/kakao_icon.svg'
import GoogleIcon from '@/assets/desktop/google_icon.svg'
import CloseIcon from '@/assets/desktop/close_icon.svg'
import supabase from '@/libs/supabaseClient'
import api from '@/libs/axiosInstance'
import useUser from '@/app/hooks/useUser'
import { useEffect } from 'react'

function SignupModal({ closeModal }: { closeModal: () => void }) {
  const router = useRouter()
  const { user, login } = useUser()

  useEffect(() => {
    console.log('user,user')
  }, [user])

  const handleKakaoSignup = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    })
    if (!error) {
      login()
      closeModal()
    } else {
      alert('카카오 로그인에 실패했습니다.')
    }
  }

  const handleGoogleSignup = async () => {
    await signIn('google', {
      redirect: true,
      callbackUrl: '/',
    })
  }

  return (
    <ModalOverlay onClick={closeModal}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <IconWrapper>
          <CloseIcon onClick={closeModal} />
        </IconWrapper>
        <H1>캔버라 커넥트</H1>
        <ButtonContainer>
          <SocialSignupButton $socialType="kakao" onClick={handleKakaoSignup}>
            <KakaoIcon /> 카카오톡 계정으로 가입하기
          </SocialSignupButton>
          <SocialSignupButton $socialType="google" onClick={handleGoogleSignup}>
            <GoogleIcon /> 구글 계정으로 가입하기
          </SocialSignupButton>
          <SignUpButton
            onClick={() => {
              closeModal()
              router.push('/signup')
            }}
          >
            이메일 계정으로 가입하기
          </SignUpButton>
        </ButtonContainer>
      </Modal>
    </ModalOverlay>
  )
}

export default SignupModal

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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  gap: 16px;
`

const SocialSignupButton = styled.button<{ $socialType: string }>`
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
  font-weight: 700;
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
