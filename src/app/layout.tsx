import type { Metadata } from 'next'
import StyledComponentsRegistry from '@/libs/registry'
import './globals.css'
import { saira } from '@/fonts/fontConfig'
import Footer from '@/components/Desktop/DesktopFooter'
import AppProvider from '@/AppProvider'
import { headers } from 'next/headers'
import MobileFooter from '@/components/Mobile/MobileFooter'
import Header from '@/components/NewComponent/Header'

export const metadata: Metadata = {
  title: 'K-캔버라 | 호주 캔버라 한인 커뮤니티',
  description:
    '호주 캔버라에 거주하는 한인들을 위한 유일한 한인 커뮤니티 웹사이트. 케이캔버라에서 정보 공유와 소통의 장을 제공합니다.',
  keywords:
    '캔버라 한인, 호주 한인, 캔버라 커뮤니티, 한인 커뮤니티, 호주 캔버라, 캔버라 생활정보, K-캔버라, 케이캔버라, 케이 캔버라',
  openGraph: {
    title: 'K-캔버라(케이캔버라) | 호주 캔버라 한인 커뮤니티',
    description:
      '호주 캔버라에 거주하는 한인들을 위한 유일한 한인 커뮤니티 웹사이트. 정보 공유와 소통의 장을 제공합니다.',
    url: 'https://www.kcanberra.com',
    siteName: 'K-캔버라',
    images: [
      {
        url: 'https://www.kcanberra.com/CanberraLogo.png',
        width: 500,
        height: 500,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.kcanberra.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = headers()
  const isMobilePredefined = headersList.get('x-is-mobile') === 'true'

  return (
    <html lang="ko">
      <body className={saira.className}>
        <StyledComponentsRegistry>
          <AppProvider>
            {isMobilePredefined ? (
              <>
                <Header />
                {children}
                <MobileFooter />
              </>
            ) : (
              <>
                <Header />
                {children}
                <Footer />
              </>
            )}
          </AppProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
