const FindCountry = (props) => {
    const countries = props.countries
    //console.log(countries)
    let filteredCountries = countries.filter((country) => {
        //console.log(country.toLowerCase())
        return country.toLowerCase().includes(props.filterName.toLowerCase())
    })
    console.log(filteredCountries)
    return <div>
        Filter by country name <input value={props.filterName} onChange={props.onChange}/>
        <ul>
         {filteredCountries.map((country) => {
            return <li>{country}</li>
    })}
    </ul>
    </div>
}


export default FindCountry