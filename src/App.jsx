import { useEffect, useState } from "react";
import "./App.css";

function App() {
  //create state⬇️
  const [weatherData, setWeatherData] = useState("");
  const [userEnteredCity, setUserInputCity] = useState("");
  const [currentCity,setCurrentCity] = useState("London")

  // function fetchData() {
   
  // }

  useEffect(() => {
    //fetch the data from API endpoint
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=650ad8fb3c6e4ecab3190253232706&q=${currentCity}&aqi=no`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("API DATA: ", result);
        //console the city name & the temerature⬇️
        // console.log("Location", result.location)
        console.log("city name: ", result.location.name);
        // console.log("Current: ", result.current)
        console.log("Temperature: ", result.current.temp_c);
        setWeatherData(result);
      })
      .catch((err) => console.log(err));
  },[currentCity])

  const handleChange = (event) => {
    // console.log(event.target.value)
    // set userInputCity state
    setUserInputCity(event.target.value);
  }
  const handleClick = () => {
    //when click it, store user input into currentCity state
    setCurrentCity(userEnteredCity)
  }

//Monitor the state value
  useEffect(() => {
    console.log(weatherData, userEnteredCity);
  }, [weatherData, userEnteredCity]);

  return (
    <>
      <h1>Weather App</h1>
      <label>Enter your City: </label>
      <input onChange={handleChange} />
      {/* <button onClick={fetchData}>Fetch to page</button> */}
      <button onClick={handleClick}>Search!!</button>
      <p>
        {weatherData && weatherData.location.name}'s teamperature is{" "}
        {weatherData && weatherData.current.temp_c}℃.
      </p>
      <p>It's {weatherData && weatherData.current.condition.text}</p>
      <img src={weatherData && weatherData.current.condition.icon} alt="icon"/>
    </>
  );
}

export default App;
