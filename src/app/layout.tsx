import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/libs/registry'
import './globals.css'
import { saira } from '@/fonts/fontConfig'
import Header from './_components/Header'
import Footer from './_components/Footer'
import Body from './_components/Body'
import SupabaseProvider from './_components/SupabaseProvider'
import NewHeader from './NewComponent/NewHeader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '캔버라커넥트',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={saira.className}>
        <StyledComponentsRegistry>
          <SupabaseProvider>
            <NewHeader />
            {/* <Header /> */}
            {/* <Body>{children}</Body> */}
            {children}
            <Footer />
          </SupabaseProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
