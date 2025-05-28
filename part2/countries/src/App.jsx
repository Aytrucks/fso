import { useState, useEffect } from 'react'
import axios from 'axios'
import FindCountry from './components/FindCountry'

function App() {
  const [countries, setCountries] = useState([])
  const [name, setName] = useState("")
  const [countriesInfo, setCountriesInfo] = useState([])
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

  useEffect(hook, [])
  

  return (
    
    <div>
      <FindCountry countries={countries} countriesFull={countriesInfo} filterName = {name} onChange={handleFilter}/>
      
    </div>
  )
}

export default App
