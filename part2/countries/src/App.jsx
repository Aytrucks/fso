import { useState, useEffect } from 'react'
import axios from 'axios'
import FindCountry from './components/FindCountry'

function App() {
  const [countries, setCountries] = useState([])
  const [name, setName] = useState("")
  const [countriesInfo, setCountriesInfo] = useState([])
  const [focusedCountry, setFocusedCountry] = useState("")
  //request to get all data about countries and then specifically only include the names
  const hook = () => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => {
      let totalCountries = []
      let totalCountriesName = [];
      response.data.forEach((thing) => {
        //console.log(thing)
        totalCountries = totalCountries.concat(thing)
        totalCountriesName = totalCountriesName.concat(thing.name.common)
      })
      setCountriesInfo(totalCountries)
      setCountries(totalCountriesName)
    })
  }
  const handleFilter = (event) =>{
    setName(event.target.value)
  }
  const clickCountry = (country) =>{
    console.log(country)
    let returnedCountry = null
    countriesInfo.forEach((countryInfo) =>{
      if(countryInfo.name.common === country){
        //console.log(true)
        returnedCountry = countryInfo
      }
    })
    console.log(returnedCountry)
  }

  useEffect(hook, [])
  

  return (
    
    <div>
      <FindCountry countries={countries} countriesFull={countriesInfo} filterName = {name} onChange={handleFilter} onClick={clickCountry}/>
    </div>
  )
}

export default App
