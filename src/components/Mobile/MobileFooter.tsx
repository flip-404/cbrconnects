import CanberraIcon from '@/assets/canberra.svg'
import { container } from './Footer.css'

export default function MobileFooter() {
  return (
    <div className={container}>
      <CanberraIcon width={24} height={24} />
      <p
        style={{
          margin: '5px 0 0 0',
          fontSize: '13px',
          fontWeight: '700',
          letterSpacing: '0.2px',
        }}
      >
        K-Canberra CONNECT
      </p>
      <span
        style={{
          fontSize: '9px',
          fontWeight: '600',
        }}
      >
        Since 28th Feb 2025
      </span>
      <a
        href="mailto:aka404365@gmail.com"
        style={{ margin: '15px 0 0 0', color: '#c7c7cc', textDecoration: 'none' }}
      >
        email us.
      </a>
    </div>
  )
}
