import React, { useState } from 'react'
import search from './clouds/search.png'
import clearsky from './clouds/clear-sky.png'
import rain from './clouds/rain.png'
import thunder from './clouds/thunder.png'
import snow from './clouds/snow.png'
import windy from './clouds/windy.png'
import humi from './clouds/humidity.png'
import longi from './clouds/longitude.png'
import lati from './clouds/global.png'


const Weather = () => {


  const [input, setInput] = useState('');
  const [Image, setImage] = useState(clearsky);
  const [cloud, setcloud] = useState('-');
  const [degree, setDegree] = useState(0);
  const [wind, setWind] = useState(0);
  const [Humidity, setHumidity] = useState(0);
  const [lat,setlat]=useState(0);
  const [lon,setlon]=useState(0);
  const [country,setcountry]=useState("-");


  async function searchWeather(text) {
    if (!text) {
      alert("Please enter a city name.");
    }
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=d9e01fab6d6679df9c20fc771833ae53&units=Metric`);
        if (!res.ok) {
          throw new Error("Enter a valid city name");
        }
        else {
          const data = await res.json();
          if (data.weather[0].icon === "04d" || data.weather[0].icon === "01d" || data.weather[0].icon === "02d" || data.weather[0].icon === "03d" || data.weather[0].icon === "04n" || data.weather[0].icon === "01n" || data.weather[0].icon === "02n" || data.weather[0].icon === "03n") {
            setImage(clearsky)
          }
          else if (data.weather[0].icon === "09d" || data.weather[0].icon === "10d" || data.weather[0].icon === "09n" || data.weather[0].icon === "10n") {
            setImage(rain)
          }
          else if (data.weather[0].icon === "11d" || data.weather[0].icon === "11n") {
            setImage(thunder)
          }
          else {
            setImage(snow)
          }
          setcloud(data.weather[0].description);
          setDegree(data.main.temp);
          setWind(data.wind.speed)
          setHumidity(data.main.humidity)
          setlat(data.coord.lat);
          setlon(data.coord.lon);
          setcountry(data.sys.country)
        }
      }
      catch (error) {
        console.log(error.message);
      }
      


  }

  return (
    <div className='bg-transparent border-4 border-sky-700 outline-2 outline-offset-2 outline-sky-800 rounded-2xl  m-2'>

    {/* ------------------------------------ search bar --------------------------------- */}

      <div className='flex relative '>
        <input onChange={(e) => {
          setInput(e.target.value);
        }} value={input} className='w-[400px] text-xl border-2 border-gray-700 focus:border-sky-800 bg-white rounded-xl outline-none p-3 m-3' type='text' placeholder='Enter city name'></input>
        <img onClick={() => {
          return searchWeather(input);
        }} className='absolute right-2 top-1 cursor-pointer p-2' src={search}></img>
      </div>


      <div className='flex flex-col items-center'>
        <div className='p-2 m-2'>
          <p className='text-3xl'> {country}</p>
        </div>
          {/* ------------------------------------ cloud image  with cloud status--------------------------------- */}

        <img className='w-[190px]' src={Image}></img>
        <p className='text-4xl'>{degree}°C</p>
        <p className='p-3 m-3 text-3xl'>{cloud}</p>

            {/* ------------------------------------ wind speed and humidity--------------------------------- */}

        <div className=' text-xl flex justify-between w-[400px]  p-1'>
          <div className='flex flex-col p-2'>
            <div className='flex '>
              <p>Wind Speed</p>
              <img className='h-[30px] w-[30px] m-1 ' src={windy}></img>
            </div>
            <p className='text-center text-2xl'>{wind}</p>
          </div>
          <div className='flex flex-col p-2'>

            <div className='flex '>
              <p>Humidity</p>
              <img className='h-[30px] w-[30px] m-1 ' src={humi}></img>
            </div>
            <p className='text-center text-2xl'>{Humidity}</p>
          </div>
        </div>

            {/* ------------------------------------ longitude and latitude --------------------------------- */}

        <div className=' text-xl flex justify-between w-[400px] m-1 p-1'>
          <div className='flex flex-col p-2'>
              <div className='flex '>
              <p>Longitude</p>
              <img className='h-[30px] w-[30px] m-1 ' src={longi}></img>
            </div>
              <p className='text-center text-2xl'>{lon}</p>
          </div>
          <div className='flex flex-col p-2'>
              <div className='flex '>
              <p>Latitude</p>
              <img className='h-[30px] w-[30px] m-1 ' src={lati}></img>
            </div>
              <p className='text-2xl text-center'>{lat}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather