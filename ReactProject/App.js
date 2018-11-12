import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet} from 'react-native';
import Login from './src/Login';

export default class ReactProject extends Component{
	render(){
		return(
			<View style={styles.container}>
				<Login/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

AppRegistry.registerComponent('ReactProject', ()=>ReactProject)