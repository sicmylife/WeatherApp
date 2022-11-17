import { useEffect, useState } from 'react'
import React from 'react'
import WeatherForm from './WeatherForm'
import WeatherMainInfo from './WeatherMainInfo'
import styles from './WeatherApp.module.css'
import Loading from './Loading'

const WeatherApp = () => {

    const [weather, setWeather] = useState(null)

    useEffect(()=>{
        loadInfo();
    },[]);

    useEffect(()=>{
     document.title = `Weather => ${weather?.location.name ?? ""}`
  },[weather]);

async function loadInfo(city = "london") {
    await fetch(
      `https://api.weatherapi.com/v1/current.json?key=9afe2505103b45da9f3120812221611&q=${city}&aqi=no`
    ).then((res)=> res.json())
    .then((data) =>{
      setTimeout(()=>{
        setWeather(data);

      },1000)
      console.log(data);
    })
}


    function handleChangeCity(city) {
        setWeather(null);
        loadInfo(city);
      }
  return (
    <div className={styles.weatherContainer}>
<WeatherForm   onChangeCity={handleChangeCity}/>
{weather ? <WeatherMainInfo weather={weather}/> : <Loading />}

    </div>
  )
}

export default WeatherApp

