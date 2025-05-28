import { useState, useEffect } from 'react'
import axios from 'axios'
import FindCountry from './components/FindCountry'

function App() {
  const [countries, setCountries] = useState([])
  const [name, setName] = useState("TEST")

  //request to get all data about countries and then specifically only include the names
  const hook = () => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => {
      let totalCountries = [];
      response.data.forEach((thing) => {
        //console.log(thing)
        
        totalCountries = totalCountries.concat(thing.name.common)
      })
      //console.log(totalCountries)
      setCountries(totalCountries)
    })
  }
  const handleFilter = (event) =>{
    setName(event.target.value)
  }

  useEffect(hook, [])
  //console.log(countries)

  return (
    
    <div>
      <FindCountry countries={countries} filterName = {name} onChange={handleFilter}/>
      
    </div>
  )
}

export default App
