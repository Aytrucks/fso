import axios from "axios";

const countries_url = "https://studies.cs.helsinki.fi/restcountries/api/all"

const getCountries = () => {
    const request = axios.get(countries_url)
    return request.then((response) => response.data)
}

const getWeather = (lat, long, api_key) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`)
    return request.then(response => response.data)
    
}

export default { getCountries, getWeather }