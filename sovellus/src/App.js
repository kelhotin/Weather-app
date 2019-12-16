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
			wind: undefined,
			windDeg: undefined,
			windDir: "" 	,
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
					wind: res.wind.speed,
					windDeg: res.wind.deg,
					city: res.name,
					country: res.sys.country,
					error: ""
				}
			)
			await this.windDirection(res.wind.deg);


		} else {
			this.setState(
				{
					error: "Tarkista kaupunki ja maa"
				}
			)
		}

	}

	windDirection = (dir) => {
		var a = '';
		console.log("---------------");
		console.log(dir);
		console.log("---------------");
		if(330 >= dir || dir < 30) {
			a = 'N'
		}
		else if(30 <= dir || 60 > dir) {
			a = 'NE'
		}
		else if(60 <=dir || 120 > dir ) {
			a = 'E'
		}
		else if(120 <=dir || 150 > dir ) {
			a = 'SE'
		}
		else if(150 <=dir || 210 > dir ) {
			a = 'S'
		}
		else if(210 <=dir || 240 > dir ) {
			a = 'SW'
		}
		else if(240 <=dir || 300 > dir ) {
			console.log("Lännestä");
			a = 'W'
		}
		else if(300 <=dir || 330 > dir ) {
			a = 'NW'
		}
		console.log(a);

		this.setState(
			{
				windDir: a
			}
		)
		console.log(this.windDir)

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
		console.log("morooooo");

	}



	render() {

		return (
			<div>

				<Form loadWeather={this.setVariables} />
				<Weather
					wind={this.state.wind}
					dir={this.state.windDir}
					deg={this.state.windDeg}
					temp={this.state.temp}
					city={this.state.city}
					country={this.state.country}
					error={this.state.error} />
			</div>
		)
	}
}

export default App;
