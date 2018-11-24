import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
	
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		width: 300,
		paddingBottom: 20
	},
});

export default class Register extends Component{
	render(){
        const {container} = styles;
		return(
			<View style={container}>
				<Text>
					"Register"
				</Text>
			</View>
		);
	}
}