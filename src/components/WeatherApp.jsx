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
     document.title = `Weather => ${weather?.name ?? ""}`
  },[weather]);

async function loadInfo(city = "poznan") {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=88cb196bef03f1d8cd1cf5edda17621d`

    ).then((res)=> res.json())
    .then((data) =>{
      setTimeout(()=>{
        setWeather(data);

      },1000)
      console.log(data);
    })
}

console.log(weather);



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

