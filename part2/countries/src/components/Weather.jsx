import { useState, useEffect } from "react";
import apisupport from "../services/apisupport";
const api_key = import.meta.env.VITE_SOME_KEY
const RenderWeather = (props) => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        apisupport.getWeather((props.focusedCountry.capitalInfo.latlng[0]), (props.focusedCountry.capitalInfo.latlng[1]), api_key).then(response => {
            setWeather(response)
        })
    }, [])  
    
    if(weather !== null){
        
        return <div>
            <div> Weather in {props.focusedCountry.capital} is {(weather.main.temp - 273.15).toFixed(2)} deg Celsius</div>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
            <div>Wind speed is {weather.wind.speed}</div>
        
    </div>
    }
}

export default RenderWeather