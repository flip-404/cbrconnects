import React, { useEffect, useRef } from 'react'

function TradingViewWidget() {
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbol: 'FX_IDC:AUDKRW',
      width: '300',
      isTransparent: true,
      colorTheme: 'light',
      locale: 'en',
      largeChartUrl: 'https://kr.tradingview.com/symbols/AUDKRW/',
    })
    scriptRef.current = script
    const container = document.getElementsByClassName(
      'tradingview-widget-container__widget',
    )[0]
    if (container) {
      container.appendChild(script)
    }

    return () => {
      if (
        container &&
        scriptRef.current &&
        container.contains(scriptRef.current)
      )
        container.removeChild(scriptRef.current)
    }
  }, [])

  return (
    <>
      <div
        className="tradingview-widget-container"
        style={{ position: 'relative' }}
      >
        <div className="tradingview-widget-container__widget" />
        <div className="tradingview-widget-copyright" />
      </div>
      <p className="text-center text-[14px] font-[600] text-[#3b4890]">
        호주 환율
      </p>
    </>
  )
}

export default TradingViewWidget
