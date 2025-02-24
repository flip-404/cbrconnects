import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/libs/registry'
import './globals.css'
import { saira } from '@/fonts/fontConfig'
import Footer from '@/app/_components/molcules/Footer'
import AppProvider from '@/AppProvider'
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
          <AppProvider>
            <NewHeader />
            {children}
            <Footer />
          </AppProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
