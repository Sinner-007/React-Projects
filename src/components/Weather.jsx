import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import searchi from '../assets/searchi.png'
import cloud_rain from '../assets/cloud_rain.png'
import humid from '../assets/humid.png'

import sun_cloud_mist from '../assets/sun_cloud_mist.png'
import sun_cloud_rain from '../assets/sun_cloud_rain.png'
import sun_cloud from '../assets/sun_cloud.png'
import sun from '../assets/sun.png'
import wind from '../assets/wind.png'
import cloud from '../assets/cloud.png'
import snow from '../assets/snow.png'

const Weather = () => {

  const[weatherdata,setweatherdata] = useState(false)
  const inputRef = useRef()

  const allicons = {
    "01d": sun,
    "01n": sun,
    "02d": sun_cloud,
    "02n": sun_cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": cloud,
    "04n": cloud,
    "09d": cloud_rain,
    "09n": cloud_rain,
    "10d": sun_cloud_mist,
    "10n": sun_cloud_mist,
    "11d": sun_cloud_rain,
    "11n": sun_cloud_rain,
    "13d": snow,
    "13n": snow,
    "50d": humid,
    "50n": humid
  }

  const search = async(city) => {
    if(city===""){
      alert("Enter city name!!")
      return
    }
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return
      }

      console.log(data);
      const icon = allicons[data.weather[0].icon] || clear;
      setweatherdata({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } catch(error){
      setweatherdata(false)
      console.error("Error in fetching weather data")

    }
  }

  useEffect(() => {
    search("kanpur");
  },[])

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      search(inputRef.current.value);
    }
  };
  
  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref = {inputRef} type='text' placeholder='Search' onKeyUp={handleKeyPress}/>
        <img src={searchi} alt='' onClick={()=>search(inputRef.current.value)}/>
      </div>
      {weatherdata?<>
      <img src={weatherdata.icon} alt='' className='weather_icon'/>
      <p className='temp'>{weatherdata.temperature}°c</p>
      <p className='location'>{weatherdata.location}</p>
      <div className='weather-data'>
        <div className='col'>
          <img src={humid} alt=''/>
          <div>
            <p>{weatherdata.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='col'>
          <img src={wind} alt=''/>
          <div>
            <p>{weatherdata.windspeed}km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      </>:<></>}
      
    </div>
    
  )
}

export default Weather