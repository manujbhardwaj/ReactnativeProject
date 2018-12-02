import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Slider,
    Button,
} from 'react-native';
import Loader from "./Loader";

const styles = StyleSheet.create({
    buttonArea: {
        marginBottom: 20,
    },
    errorMessage:{
        marginTop: 15,
        fontSize: 15,
        color: 'red',
        alignSelf: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        width: 350,
        paddingBottom: 20,
        paddingTop: 20
    },
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        height: 20,
        width: 20,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
});

export default class Images extends Component {

    constructor() {
        super();
        this.state = {
            tgId: '',
            sessionId: '',
            positiveColor: [],
            negativeColor: [],
            neutralColor: [],
            loading: false,
            error: '',
        };
    }

    static navigationOptions = {title: 'Welcome', header: null};

    render() {
        this.state.positiveColor = this.props.navigation.state.params.positiveColor;
        this.state.negativeColor = this.props.navigation.state.params.negativeColor;
        this.state.neutralColor = this.props.navigation.state.params.neutralColor;
        this.state.sessionId = this.props.navigation.state.params.sessionId;

        const {buttonArea, container, outerContainer} = styles;
        if (this.state.loading) {
            return <Loader size='large'/>;
        }
        return (
            <View style={outerContainer}>
                <View style={container}>
                    <Text>Images</Text>
                    <Text>{this.state.positiveColor}</Text>
                    <Text>{this.state.negativeColor}</Text>
                    <Text>{this.state.neutralColor}</Text>
                    <Text>{this.state.sessionId}</Text>
                </View>
            </View>
        );
    }
}