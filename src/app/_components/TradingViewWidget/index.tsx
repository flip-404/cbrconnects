import React, { useEffect } from 'react'

function TradingViewWidget() {
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
    document
      .getElementsByClassName('tradingview-widget-container__widget')[0]
      .appendChild(script)

    return () => {
      document
        .getElementsByClassName('tradingview-widget-container__widget')[0]
        .removeChild(script)
    }
  }, [])

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget" />
      <div className="tradingview-widget-copyright" />
    </div>
  )
}

export default TradingViewWidget
