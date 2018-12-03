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
    errorMessage: {
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
        height: 200,
        width: 200,
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
            images: [],
            loading: false,
            error: '',
        };
    }

    static navigationOptions = {title: 'Welcome', header: null};

    componentDidMount() {
        this.setState({error: '', loading: true});

        fetch('http://ec2-18-191-227-95.us-east-2.compute.amazonaws.com:8080/Psych-1/imageData/ImageFetcher?tgId=' + this.state.tgId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    images: responseJson.images,
                    loading: false,
                });
            })
    }

    render() {
        this.state.positiveColor = this.props.navigation.state.params.positiveColor;
        this.state.negativeColor = this.props.navigation.state.params.negativeColor;
        this.state.neutralColor = this.props.navigation.state.params.neutralColor;
        this.state.sessionId = this.props.navigation.state.params.sessionId;
        this.state.tgId = this.props.navigation.state.params.tgId;

        const {buttonArea, container, outerContainer} = styles;
        if (this.state.loading) {
            return <Loader size='large'/>;
        }
        return (
            <View style={outerContainer}>
                <View style={container}>
                    <Image style={styles.img} source={{uri: 'http://ec2-18-191-227-95.us-east-2.compute.amazonaws.com:8080/Psych-1/imageUpload?imagePath=1/5cc92d16-b832-11e6-80f5-76304dec7eb7.jpg&source=android'}}/>
                </View>
            </View>
        );
    }
}