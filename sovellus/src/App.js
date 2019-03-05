import React, { Component } from 'react';
import Weather from './WeatherElements.js';
import Titles from './titles.js';
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
		this.setState(
			{
				temp: res.main.temp,
				city: res.name,
				country: res.sys.country,
			}
		)
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
		// this.setState(
		// 	{
		// 		city: city,
		// 		country: country
		// 	}
		// )
		// console.log(this.state.city);
		if (toSave) {
			keksit.set('City', city);
			keksit.set('Country', country);
		}
		this.getData(city, country);

	}

	render() {
		return (
			<div>
				<Titles />
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
