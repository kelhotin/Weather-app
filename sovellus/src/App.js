// Yksinkertainen sääsovellus joka hakee openweathermapista dataa ja näyttää sen käyttäjälle.
//  Tyyliltään tarkoituksellisen simppeli. 
import React, { Component } from 'react';
import Weather from './WeatherElements.js';
import Form from './form.js';
import Cookies from 'universal-cookie';

const ApiKey = "c8abfa8a763fbe83481f4c8d4aab305a";
const keksit = new Cookies();

class App extends Component {
	constructor() {
		super();

		this.state = {
			temp: undefined,
			city: undefined,
			country: undefined,
			error: undefined
		}
	}

	//funktio hakee API:sta datan ja muuttaa tilat
	getData = async (city, country) => {

		if (!city && !country) {
			city = keksit.get('City');
			country = keksit.get('Country');
		}
		const apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${ApiKey}`);

		const res = await apiCall.json();
		console.log(res);
		if (res.main) {
			this.setState(
				{
					temp: res.main.temp,
					city: res.name,
					country: res.sys.country,
					error: ""
				}

			)
		} else {
			this.setState(
				{
					error: "Tarkista kaupunki ja maa"
				}
			)
		}
	}

	//Päivittää mahdollisesti tallennetun paikan sivun auetessa
	componentDidMount = async () => {
		this.getData(undefined, undefined);
	}


	//antaa syötetyt paikat eteenpäin
	setVariables = async (e) => {

		e.preventDefault();

		const city = e.target.elements.city.value;
		const country = e.target.elements.country.value;
		const toSave = e.target.elements.save.checked;
		console.log(city);
		if (toSave) {
			keksit.set('City', city);
			keksit.set('Country', country);
		}
		this.getData(city, country);

	}


	render() {
		return (
			<div>
				
				<Form loadWeather={this.setVariables} />
				<Weather
					temp={this.state.temp}
					city={this.state.city}
					country={this.state.country}
					error={this.state.error} />
			</div>
		)
	}
}

export default App;
