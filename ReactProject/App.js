import React, {Component} from 'react';
import {AppRegistry} from 'react-native';

import Router from './src/Router';

export default class ReactProject extends Component{
	render(){
		return(
            <Router/>
		);
	}
}

AppRegistry.registerComponent('ReactProject', ()=>ReactProject)