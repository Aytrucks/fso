import { useState, useEffect } from 'react'
import axios from 'axios'
import FindCountry from './components/FindCountry'

function App() {
  const [countries, setCountries] = useState([])
  const [name, setName] = useState("")
  const [countriesInfo, setCountriesInfo] = useState([])
  const [clicked, setClicked] = useState(false)
  const [proc, setProc] = useState(false)
  //const [focusedCountry, setFocusedCountry] = useState("")
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
  const handleFilter = (event) =>{
    setName(event.target.value)
    if(clicked){
      console.log()
      setCountries(totalCountriesName)
      setClicked(false)
      setProc(!proc)
    }
  }
  const clickCountry = (country) =>{
    console.log(country)
    setCountries([country])
    setClicked(true)
  }

  useEffect(hook, [proc])
  

  return (
    
    <div>
      <FindCountry countries={countries} countriesFull={countriesInfo} filterName = {name} onChange={handleFilter} onClick={clickCountry}/>
    </div>
  )
}

export default App
