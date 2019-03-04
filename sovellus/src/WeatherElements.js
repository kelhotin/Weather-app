import React from 'react';

const Weather = (props) => {

	return (
		<div>
			{props.country && props.city && <p>Kaupunki: {props.city},  {props.country}</p>}
			{props.temp && <p>Lämpötila: {props.temp} &deg;C</p>}
			{props.error && <p>{props.error}</p>}

		</div>
	)
}

export default Weather
