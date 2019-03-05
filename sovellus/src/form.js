import React from 'react';

//class Form extends Component {

const Form = (props) => {
	return (
		<form onSubmit={props.loadWeather}>
			<input type="text" name="city" placeholder="Kaupunki" />
			<input type="text" name="country" placeholder="Maa" />
			<button name="nappi">Hae sää</button>
			<input type="checkbox" id="tallenna" name="save" value="true" /> Tallenna
		</form>
	)
}
export default Form
