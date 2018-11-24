import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

const styles = StyleSheet.create({
    fieldStyles:{
        height: 40,
    },
    buttonArea:{
        marginTop: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        width: 300,
        paddingBottom: 20
    },
    errorMessage:{
        marginTop: 15,
        fontSize: 15,
        color: 'red',
        alignSelf: 'center'
    },
});


export default class Register extends Component{
    static navigationOptions = { title: 'Welcome', header: null };
	render(){
        const {fieldStyles, buttonArea, errorMessage, container} = styles;
        const {navigate} = this.props.navigation;
		return(
			<View style={container}>
				<Text>
					"Register"
				</Text>
                <View style={buttonArea}>
                    <Button title='Go Back' onPress={() => navigate('Login')} />
                </View>
			</View>
		);
	}
}