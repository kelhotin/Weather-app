import React from 'react';

//täällä kirjoitetaan itse data auki HTMLksi
const Weather = (props) => {
	console.log("moroo");
	console.log(props.wind);
	return (
		<div>
			{props.country && props.city && <p>Kaupunki: {props.city},  {props.country}</p>}
			{props.temp && <p>Lämpötila: {props.temp} &deg;C</p>}

			{props.wind && <p>Tuuli: {props.wind} m/s, suunta: {props.dir} ({props.deg})	</p>}

			{props.error && <p>{props.error}</p>}

		</div>
	)
}

export default Weather
