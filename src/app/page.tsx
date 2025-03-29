import DesktopHome from '@/components/home/desktop/DesktopHome'
import MobileHome from '@/components/home/mobile/MobileHome'
import { headers } from 'next/headers'

export default function Home() {
  // toDo: 기기에 따른 데이터 페칭 및 캐싱 로직 추가
  const headersList = headers()
  const isMobile = headersList.get('x-is-mobile') === 'true'

  return isMobile ? <MobileHome /> : <DesktopHome />
}
