import React, {Component} from 'react';
import {
    Dimensions,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import Loader from "./Loader";
import GestureRecognizer from 'react-native-swipe-gestures';

const styles = StyleSheet.create({
    img: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        resizeMode: 'contain',
    },
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default class Images extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tgId: '',
            sessionId: '',
            userId: '',
            positiveColor: [],
            negativeColor: [],
            neutralColor: [],
            images: [],
            index: 0,
            resp: [],
            posShown: false,
            negShown: false,
            loading: false,
            error: '',
            correct: 0,
            incorrect: 0
        };

        this.state.positiveColor = props.navigation.state.params.positiveColor;
        this.state.negativeColor = props.navigation.state.params.negativeColor;
        this.state.neutralColor = props.navigation.state.params.neutralColor;
        this.state.sessionId = props.navigation.state.params.sessionId;
        this.state.tgId = props.navigation.state.params.tgId;
        this.state.userId = props.navigation.state.params.userId;
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
                console.log("images:" + JSON.stringify(responseJson));
                console.log("posColor:" + JSON.stringify(this.state.positiveColor));
                console.log("negColor:" + JSON.stringify(this.state.negativeColor));
                this.setState({
                    images: responseJson.images,
                    loading: false,
                });
            })
    }

    sendResp() {
        var formBody = [];
        var encodedKey = encodeURIComponent("participantId");
        var encodedValue = encodeURIComponent(this.state.userId);
        formBody.push(encodedKey + "=" + encodedValue);
        encodedKey = encodeURIComponent("sessionId");
        encodedValue = encodeURIComponent(this.state.sessionId);
        formBody.push(encodedKey + "=" + encodedValue);

        encodedKey = encodeURIComponent("responses");
        encodedValue = encodeURIComponent("[" + this.state.resp.join(",") + "]");
        formBody.push(encodedKey + "=" + encodedValue);

        formBody = formBody.join("&");

        console.log("send:" + formBody);

        fetch('http://ec2-18-191-227-95.us-east-2.compute.amazonaws.com:8080/Psych-1/imageData/ImageDataServlet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: formBody,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.save === 'successful') {
                    this.setState({
                        loading: false,
                        error: '',
                    });
                }
                else {
                    this.setState({
                        loading: false,
                        error: responseJson.save,
                    });
                }
                return responseJson;
            })
    }

    onSwipeUp(item) {
        console.log("up");

        var encodedKey = "imageTypeId";
        var encodedValue = item.imageTypeId;
        var val = "\"" + encodedKey + "\"" + ":" + "\"" + encodedValue + "\"" + ",";

        encodedKey = "responseTime";
        encodedValue = 0;
        val = val + "\"" + encodedKey + "\"" + ":" + "\"" + encodedValue + "\"" + ",";

        encodedKey = "backGroundColor";
        encodedValue = null;
        val = val + "\"" + encodedKey + "\"" + ":" + "\"" + encodedValue + "\"" + ",";

        encodedKey = "imageId";
        encodedValue = item.imageId;
        val = val + "\"" + encodedKey + "\"" + ":" + "\"" + encodedValue + "\"" + ",";

        encodedKey = "participantId";
        encodedValue = this.state.userId;
        val = val + "\"" + encodedKey + "\"" + ":" + "\"" + encodedValue + "\"" + ",";

        encodedKey = "correctness";
        encodedValue = item.imageType === 'Negative';
        val = val + "\"" + encodedKey + "\"" + ":" + "\"" + encodedValue + "\"" + ",";

        encodedKey = "imageCategoryId";
        encodedValue = item.imageCategoryId;
        val = val + "\"" + encodedKey + "\"" + ":" + "\"" + encodedValue + "\"" + ",";

        encodedKey = "isAttempted";
        encodedValue = true;
        val = val + "\"" + encodedKey + "\"" + ":" + "\"" + encodedValue + "\"";

        this.state.resp.push("{" + val + "}");

        if(item.imageType === 'Negative')
            this.state.correct++;
        else
            this.state.incorrect++;

        if (this.state.index === this.state.images.length - 1) {
            this.sendResp();
            this.props.navigation.navigate('Game2', {
                tgId: this.state.tgId,
                sessionId: this.state.sessionId,
                userId: this.state.userId,
                correct: this.state.correct,
                incorrect: this.state.incorrect
            });
        }
        else {
            this.setState({
                index: this.state.index + 1,
            });
        }
    }

    onSwipeDown(item) {
        console.log("down");

        var encodedKey = "imageTypeId";
        var encodedValue = item.imageTypeId;
        var val = "\"" + encodedKey + "\"" + ":" + "\"" + encodedValue + "\"" + ",";

        encodedKey = "responseTime";
        encodedValue = 0;
        val = val + "\"" + encodedKey + "\"" + ":" + "\"" + encodedValue + "\"" + ",";

        encodedKey = "backGroundColor";
        encodedValue = null;
        val = val + "\"" + encodedKey + "\"" + ":" + "\"" + encodedValue + "\"" + ",";

        encodedKey = "imageId";
        encodedValue = item.imageId;
        val = val + "\"" + encodedKey + "\"" + ":" + "\"" + encodedValue + "\"" + ",";

        encodedKey = "participantId";
        encodedValue = this.state.userId;
        val = val + "\"" + encodedKey + "\"" + ":" + "\"" + encodedValue + "\"" + ",";

        encodedKey = "correctness";
        encodedValue = item.imageType === 'Negative';
        val = val + "\"" + encodedKey + "\"" + ":" + "\"" + encodedValue + "\"" + ",";

        encodedKey = "imageCategoryId";
        encodedValue = item.imageCategoryId;
        val = val + "\"" + encodedKey + "\"" + ":" + "\"" + encodedValue + "\"" + ",";

        encodedKey = "isAttempted";
        encodedValue = true;
        val = val + "\"" + encodedKey + "\"" + ":" + "\"" + encodedValue + "\"";

        this.state.resp.push("{" + val + "}");

        if(item.imageType === 'Positive')
            this.state.correct++;
        else
            this.state.incorrect++;

        if (this.state.index === this.state.images.length - 1) {
            this.sendResp();
            this.props.navigation.navigate('Game2', {
                tgId: this.state.tgId,
                sessionId: this.state.sessionId,
                userId: this.state.userId,
                correct: this.state.correct,
                incorrect: this.state.incorrect
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
            velocityThreshold: 0.2,
            directionalOffsetThreshold: 90
        };

        if (this.state.loading) {
            return <Loader size='large'/>;
        }
        else if (!this.state.posShown) {
            return (
                <GestureRecognizer
                    onSwipeDown={() => {
                        console.log("fkjsahd");
                        this.setState({
                            posShown: true,
                        });
                    }}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: this.state.positiveColor
                    }}
                    config={config}
                >
                    <Text style={{color: 'white', fontSize: 15}}>Please swipe down if you see this color</Text>
                </GestureRecognizer>
            );
        }
        else if (!this.state.negShown) {
            return (
                <GestureRecognizer
                    onSwipeUp={() => {
                        console.log("poiuyt");
                        this.setState({
                            negShown: true,
                        });
                    }}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: this.state.negativeColor
                    }}
                    config={config}
                >

                    <Text style={{color: 'white', fontSize: 15}}>Please swipe up if you see this color</Text>
                </GestureRecognizer>
            );
        }
        else if (this.state.images.length !== 0) {
            if (this.state.images[this.state.index].imageType === 'Positive') {
                return (
                    <GestureRecognizer
                        onSwipeUp={() => this.onSwipeUp(this.state.images[this.state.index])}
                        onSwipeDown={() => this.onSwipeDown(this.state.images[this.state.index])}
                        config={config}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: this.state.positiveColor
                        }}
                    >
                        <Image style={styles.img}
                               source={{uri: 'http://ec2-18-191-227-95.us-east-2.compute.amazonaws.com:8080/Psych-1/imageUpload?imagePath=' + this.state.images[this.state.index].imagePath + '&source=android'}}/>
                    </GestureRecognizer>
                );
            }
            else {
                return (
                    <GestureRecognizer
                        onSwipeUp={() => this.onSwipeUp(this.state.images[this.state.index])}
                        onSwipeDown={() => this.onSwipeDown(this.state.images[this.state.index])}
                        config={config}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: this.state.negativeColor
                        }}
                    >
                        <Image style={styles.img}
                               source={{uri: 'http://ec2-18-191-227-95.us-east-2.compute.amazonaws.com:8080/Psych-1/imageUpload?imagePath=' + this.state.images[this.state.index].imagePath + '&source=android'}}/>
                    </GestureRecognizer>
                );
            }
        }
        else {
            return null;
        }
    }
}