import React from 'react';

//class Form extends Component {

const Form = (props) => {
    return (
	    <form onSubmit = {props.loadWeather}>
	    <input type="text" name="city" placeholder="Kaupunki"/>
	    <input type="text" name="country" placeholder="Maa"/>
	    <button>Hae sää</button>
	    </form>
    )
    }
export default Form
