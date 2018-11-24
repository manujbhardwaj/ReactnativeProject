import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';

const styles = StyleSheet.create({
    buttonArea:{
        marginTop: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        width: 300,
        paddingBottom: 20
    },
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default class Game extends Component{
    static navigationOptions = { title: 'Welcome', header: null };

    render(){
        const {buttonArea, container, outerContainer} = styles;
        const {navigate} = this.props.navigation;
        return(
            <View style={outerContainer}>
                <View style={container}>
                    <View style={buttonArea}>
                        <Text>Game</Text>
                    </View>
                </View>
            </View>
        );
    }
}