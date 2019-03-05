import React from 'react';

//Lomakkeen hallinta

const Form = (props) => {
	return (
		<form onSubmit={props.loadWeather}>
			<input type="text" name="city" placeholder="Kaupunki" />
			<input type="text" name="country" placeholder="Maa" />
			<button name="nappi">Hae sää</button>
			<input type="checkbox" name="save" /> Tallenna vakioksi
			</form>

	)
}
export default Form
