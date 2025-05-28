const FindCountry = (props) => {
    const countriesAllInfo = props.countriesFull
    //console.log(countriesAllInfo)
    const countries = props.countries
    //console.log(countries)
    let filteredCountries = countries.filter((country) => {
        //console.log(country.toLowerCase())
        return country.toLowerCase().includes(props.filterName.toLowerCase())
    })
    let focusedCountry = null
    //console.log(filteredCountries)
    //More than 10 countries
    const renderFocused = (renderCountry) =>{
        if(!focusedCountry){
            countriesAllInfo.forEach((country) => {
            //console.log(country.name.common === filteredCountries[0])
            if(country.name.common === renderCountry){
                focusedCountry = country
            }
        })
        }
        
        //console.log(focusedCountry)
        const languages = []
        for(const property in focusedCountry.languages){
            //console.log(focusedCountry.languages[property])
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
        </div>
    }

    if(filteredCountries.length > 10){
        return <div>
            Filter by country name <input value={props.filterName} onChange={props.onChange}/>
            <div>Too many countries bro type a better filter</div>
            
        </div>
    }
    else if(filteredCountries.length === 1 && !props.focusedCountry){
        //Identify which country we're working with
        return renderFocused(filteredCountries[0])
    }
    else if(props.focusedCountry){
        return renderFocused(props.focusedCountry)
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