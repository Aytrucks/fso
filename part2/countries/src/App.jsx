import { useState, useEffect } from 'react'
import axios from 'axios'
import FindCountry from './components/FindCountry'

const api_key = import.meta.env.VITE_SOME_KEY
//console.log(api_key)

function App() {
  const [countries, setCountries] = useState([])
  const [name, setName] = useState("")
  const [countriesInfo, setCountriesInfo] = useState([])
  const [focusedCountry, setFocusedCountry] = useState(null)
  const [flag, setFlag] = useState(0)

  //request to get all data about countries and then specifically only include the names
  let totalCountries = []
  let totalCountriesName = [];
  const hook = () => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => {
      
      response.data.forEach((thing) => {
        //console.log(thing)
        totalCountries = totalCountries.concat(thing)
        totalCountriesName = totalCountriesName.concat(thing.name.common)
      })
      setCountriesInfo(totalCountries)
      setCountries(totalCountriesName)
    })
  }
  //test
  const weatherHook = () =>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${47}&lon=${13}&appid=${api_key}`).then(response => {
      console.log(response.data)
    })
  }
  //useEffect(weatherHook, [])
  console.log(countriesInfo)
  const handleFilter = (event) =>{
    setName(event.target.value)
    setFocusedCountry(null)
  }
  const clickCountry = (country) =>{
    //Country just returns the name for now
    setFocusedCountry(country)
  }

  useEffect(hook, [])
  return (
    <div>
      <FindCountry countries={countries} countriesFull={countriesInfo} filterName = {name} 
      onChange={handleFilter} onClick={clickCountry} focusedCountry = {focusedCountry}
      />
    </div>
  )
}

export default App
