import apisupport from "../services/apisupport"
import { useEffect } from 'react'

const api_key = import.meta.env.VITE_SOME_KEY
const FindCountry = (props) => {
    const countriesAllInfo = props.countriesFull
    //console.log(countriesAllInfo)
    const countries = props.countries
    let filteredCountries = countries.filter((country) => {
        return country.toLowerCase().includes(props.filterName.toLowerCase())
    })
    let focusedCountryName = props.focusedCountry
    let focusedCountry = null

    const renderWeather = (focusedCountry) => {
        useEffect(() => {
            apisupport.getWeather(Math.ceil(focusedCountry.latlng[0]), Math.ceil(focusedCountry.latlng[1]), api_key).then(response => {
                console.log(response)
            })
        }, [])
        return <div>
            {focusedCountry.name.common}
        </div>
    }

    //More than 10 countries
    const renderFocused = (renderCountry) =>{
        if(!focusedCountry){
            countriesAllInfo.forEach((country) => {
            if(country.name.common === renderCountry){
                focusedCountry = country
            }
        })
        }
        const languages = []
        for(const property in focusedCountry.languages){
            languages.push([focusedCountry.languages[property]])
        }        
        return <div>
            Filter by country name <input value={props.filterName} onChange={props.onChange}/>
            <h1>{focusedCountry.name.common}</h1>
            <div>Capital: {focusedCountry.capital}</div>
            <div>Area: {focusedCountry.area}</div>
            <h3>Languages</h3>
            <ul>
                {
                    languages.map((lang) => {
                        return <li>
                            {lang}
                        </li>
                    })
                }
            </ul>
            <div>
                <img src={focusedCountry.flags.png}/>
            </div>
            <h2>Weather Report</h2>
            <div>{renderWeather(focusedCountry)}</div>
        </div>
    }
    if(filteredCountries.length > 10){
        return <div>
            Filter by country name <input value={props.filterName} onChange={props.onChange}/>
            <div>Too many countries bro type a better filter</div>
        </div>
    }
    else if(filteredCountries.length === 1 && !focusedCountryName){
        //Identify which country we're working with
        return renderFocused(filteredCountries[0])
    }
    else if(focusedCountryName){
        return renderFocused(focusedCountryName)
    }
    else{
        return <div>
        Filter by country name <input value={props.filterName} onChange={props.onChange}/>
        <ul>
         {filteredCountries.map((country) => {
            return <li>{country} <button onClick={() => props.onClick(country)}>Show</button> </li>
        })}
        </ul>
        </div>
    }
}
export default FindCountry