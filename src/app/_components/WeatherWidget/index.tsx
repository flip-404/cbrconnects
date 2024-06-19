import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

// Styled Components
const WeatherWidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const TemperatureContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Temperature = styled.p`
  font-size: 48px;
  font-weight: 700;
`

const WeatherIconContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
`

const WeatherIcon = styled.img`
  width: 80px;
  height: 80px;
`

const WeatherDescription = styled.p`
  position: absolute;
  bottom: 0;
  font-size: 14px;
  font-weight: 600;
  color: #666;
`

const WeatherDetails = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 5px;
  font-size: 14px;
  font-weight: 600;
`

const WeatherDetail = styled.p`
  color: #333;
`

const Location = styled.p`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #3b4890;
`

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
        const cityName = 'Incheon' // 변경 가능
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY
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
    <WeatherWidgetContainer>
      <TemperatureContainer>
        <Temperature>{(weatherData.temp - 273.15).toFixed(0)}°</Temperature>

        <WeatherIconContainer>
          <WeatherIcon alt={weatherData.desc} src={imgSrc} />

          <WeatherDescription>{weatherData.desc}</WeatherDescription>
        </WeatherIconContainer>
      </TemperatureContainer>
      <WeatherDetails>
        <WeatherDetail>
          최고: {(weatherData.temp_max - 273.15).toFixed(0)}°
        </WeatherDetail>
        <WeatherDetail>
          최저: {(weatherData.temp_min - 273.15).toFixed(0)}°
        </WeatherDetail>
        <WeatherDetail>습도: {weatherData.humidity}%</WeatherDetail>
      </WeatherDetails>
      <Location>캔버라 날씨</Location>
    </WeatherWidgetContainer>
  )
}

export default WeatherWidget
