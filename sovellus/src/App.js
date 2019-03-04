import React, { Component } from 'react';
import Weather from './WeatherElements.js';
import Titles from './titles.js';
import Form from './form.js';

const ApiKey = "c8abfa8a763fbe83481f4c8d4aab305a";
	 
class App extends Component {

    state = {
	temp: undefined,
	city: undefined,
	country: undefined,
	error: undefined
    }

    getWeather = async (e) => {
	e.preventDefault();
	
	const city = e.target.elements.city.value;
	const country = e.target.elements.country.value;
	const apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${ApiKey}`);
			
	const res = await apiCall.json();
				    
				    console.log(res);
				    
				    if(city && country) {
					this.setState({
					temp: res.main.temp,
					city: res.name,
				     	country: res.sys.country,
				     	error: ""
					})
				    }
				    else {
					this.setState({
					    error: "Anna kaupunki"
					})}
    }
       
    render() {
	return (
	   
		<div>
		  <Titles />
		  <Form loadWeather={this.getWeather}/>
		  <Weather
		     temp={this.state.temp}
		     city={this.state.city}
		     country={this.state.country}
		     error={this.state.error}/>
		  
		</div>
	)
    }
}

export default App;
