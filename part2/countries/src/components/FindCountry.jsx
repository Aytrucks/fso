const FindCountry = (props) => {
    const countriesAllInfo = props.countriesFull
    console.log(countriesAllInfo)
    const countries = props.countries
    //console.log(countries)
    let filteredCountries = countries.filter((country) => {
        //console.log(country.toLowerCase())
        return country.toLowerCase().includes(props.filterName.toLowerCase())
    })
    let focusedCountry = null
    console.log(filteredCountries)
    //More than 10 countries

    if(filteredCountries.length > 10){
        return <div>
            Filter by country name <input value={props.filterName} onChange={props.onChange}/>
            <div>Too many countries bro type a better filter</div>
        </div>
    }
    else if(filteredCountries.length === 1){
        //Identify which country we're working with
        if(!focusedCountry){
            countriesAllInfo.forEach((country) => {
            //console.log(country.name.common === filteredCountries[0])
            if(country.name.common === filteredCountries[0]){
                focusedCountry = country
            }
        })
        }
        
        //console.log(focusedCountry)
        const languages = []
        for(const property in focusedCountry.languages){
            console.log(focusedCountry.languages[property])
            languages.push([focusedCountry.languages[property]])
        }
        languages.forEach((lang) => {
            console.log(lang)
        })
        console.log(languages)
        
        return <div>
            Filter by country name <input value={props.filterName} onChange={() => props.onChange()}/>
            <h1>{filteredCountries[0]}</h1>
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