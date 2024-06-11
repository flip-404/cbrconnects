import React, { useState, useEffect } from 'react'
// import Image from 'next/image'

function WeatherWidget() {
  const [weatherData, setWeatherData] = useState({
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    humidity: 0,
    desc: '',
    icon: '',
    loading: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityName = 'Incheon'
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY
        console.log('apiKey:', apiKey)
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        setWeatherData({
          temp: data.main.temp,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
          humidity: data.main.humidity,
          desc: data.weather[0].description,
          icon: data.weather[0].icon,
          loading: false,
        })
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
      }
    }

    fetchData()
  }, [])

  const imgSrc = `https://openweathermap.com/img/w/${weatherData.icon}.png`

  if (weatherData.loading) {
    return <p>Loading</p>
  }
  return (
    <div>
      <div className="flex justify-around">
        <div>
          <p>{(weatherData.temp - 273.15).toFixed(0)}°</p>
        </div>
        <div>
          <div>
            <img alt={weatherData.desc} src={imgSrc} width={20} height={20} />
          </div>
          <p>{weatherData.desc}</p>
        </div>
      </div>

      <span className="m-[10px]" />
      <div className="flex justify-around">
        <p>
          최고: {(weatherData.temp_max - 273.15).toFixed(0)}° 최저:{' '}
          {(weatherData.temp_min - 273.15).toFixed(0)}°
        </p>
        <p>습도: {weatherData.humidity}</p>
      </div>
    </div>
  )
}

export default WeatherWidget
