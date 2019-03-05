import App from '../App';
import Adapter from 'enzyme-adapter-react-16';
import  Weather from '../WeatherElements.js';
import React from 'react';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});
describe('snapshot1', () => {
    it('should match snapshot', () => {
	const res = shallow(<div/>);
	expect(res).toMatchSnapshot;
    });
