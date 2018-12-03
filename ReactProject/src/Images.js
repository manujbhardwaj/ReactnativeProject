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
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const styles = StyleSheet.create({
    img: {
        height: 400,
        width: 400,
    },
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default class Images extends Component {

    constructor() {
        super();
        this.state = {
            tgId: '',
            sessionId: '',
            userId: '',
            positiveColor: [],
            negativeColor: [],
            neutralColor: [],
            images: [],
            index: 0,
            loading: false,
            error: '',
            gestureName: 'none',
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

    onUpdate() {

    }

    onSwipeUp() {
        console.log("up");
        if (this.state.index === this.state.images.length - 1) {
            this.props.navigation.navigate('Game2', {
                tgId: this.state.tgId,
                sessionId: this.state.sessionId,
                userId: this.state.userId
            });
        }
        else {
            this.setState({
                index: this.state.index + 1,
            });
        }
    }

    onSwipeDown() {
        console.log("down");
        if (this.state.index === this.state.images.length - 1) {
            this.props.navigation.navigate('Game2', {
                tgId: this.state.tgId,
                sessionId: this.state.sessionId,
                userId: this.state.userId
            });
        }
        else {
            this.setState({
                index: this.state.index + 1,
            });
        }
    }

    render() {

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        this.state.positiveColor = this.props.navigation.state.params.positiveColor;
        this.state.negativeColor = this.props.navigation.state.params.negativeColor;
        this.state.neutralColor = this.props.navigation.state.params.neutralColor;
        this.state.sessionId = this.props.navigation.state.params.sessionId;
        this.state.tgId = this.props.navigation.state.params.tgId;
        this.state.userId = this.props.navigation.state.params.userId;

        if (this.state.loading) {
            return <Loader size='large'/>;
        }
        if (this.state.images.length !== 0) {
            if (this.state.images[this.state.index].imageType === 'Positive') {
                return (
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: this.state.positiveColor
                    }}>
                        <GestureRecognizer
                            onSwipeUp={() => this.onSwipeUp()}
                            onSwipeDown={() => this.onSwipeDown()}
                            config={config}
                        >
                            <Image style={styles.img}
                                   source={{uri: 'http://ec2-18-191-227-95.us-east-2.compute.amazonaws.com:8080/Psych-1/imageUpload?imagePath=' + this.state.images[this.state.index].imagePath + '&source=android'}}/>
                            <Text>{this.state.images[this.state.index].imagePath}</Text>
                            <Text>{this.state.index}</Text>
                        </GestureRecognizer>
                    </View>);

            }
            else {
                return (
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: this.state.negativeColor
                    }}>
                        <GestureRecognizer
                            onSwipeUp={() => this.onSwipeUp()}
                            onSwipeDown={() => this.onSwipeDown()}
                            config={config}
                        >
                            <Image style={styles.img}
                                   source={{uri: 'http://ec2-18-191-227-95.us-east-2.compute.amazonaws.com:8080/Psych-1/imageUpload?imagePath=' + this.state.images[this.state.index].imagePath + '&source=android'}}/>
                            <Text>{this.state.images[this.state.index].imagePath}</Text>
                            <Text>{this.state.index}</Text>
                        </GestureRecognizer>
                    </View>);
            }
        }
        else {
            return null;
        }
    }
}