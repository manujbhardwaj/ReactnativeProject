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

export default class Game extends Component {

    constructor() {
        super();
        this.state = {
            tgId: '',
            participantId: '',
            questions: [],
            checked: [],
            slider: [],
            loading: false,
            error: '',
        };
    }

    onUpdate(item, index) {
        let a = this.state.checked;
        a[index] = item;
        this.setState({
            checked: a,
        });
    }

    renderIf(item, index) {
        if (item.responseType === 'Categorical') {
            return (
                <View>
                    <View style={styles.btn}>
                        {this.state.checked[index] == item.startLabel ?
                            <TouchableOpacity>
                                <Image style={styles.img} source={{uri: 'https://i.stack.imgur.com/OWcpX.png'}}/>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => {
                                this.onUpdate(item.startLabel, index)
                            }}>
                                <Image style={styles.img} source={{uri: 'https://i.stack.imgur.com/Kn8zA.png'}}/>
                            </TouchableOpacity>}
                        <Text> {item.startLabel}</Text>
                    </View>
                    <View style={styles.btn}>
                        {this.state.checked[index] == item.endLabel ?
                            <TouchableOpacity>
                                <Image style={styles.img} source={{uri: 'https://i.stack.imgur.com/OWcpX.png'}}/>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => {
                                this.onUpdate(item.endLabel, index)
                            }}>
                                <Image style={styles.img} source={{uri: 'https://i.stack.imgur.com/Kn8zA.png'}}/>
                            </TouchableOpacity>}
                        <Text> {item.endLabel}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.btn}>
                    <Text style={{marginLeft:-10}}> {item.startLabel}</Text>
                    <View>
                        <Slider style={{width: 200}}
                                step={1}
                                minimumValue={0}
                                maximumValue={5}
                                value={this.state.slider[index]}
                                onValuechange={val => {
                                    let a = this.state.checked;
                                    a[index] = val;
                                    this.setState({
                                        checked: a,
                                    });
                                }}
                                onSlidingComplete={val => {
                                    let a = this.state.checked;
                                    a[index] = val;
                                    this.setState({
                                        checked: a,
                                    });
                                }}/>
                    </View>
                    <Text> {item.endLabel}</Text>
                </View>
            );
        }
    }

    componentDidMount() {
        this.setState({error: '', loading: true});

        fetch('http://ec2-18-191-227-95.us-east-2.compute.amazonaws.com:8080/Psych-1/question?targetGroupId=' + this.state.tgId + '&source=android', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === '200') {
                    this.setState({
                        questions: responseJson.results,
                        error: ''
                    });
                    var a = [];
                    var b = [];
                    for (var i = 0; i < this.state.questions.length; i++) {
                        a.push(this.state.questions[i].startLabel);
                        b.push(0);
                    }
                    this.setState({
                        checked: a,
                        slider: b,
                        loading: false,
                    });
                }
                else {
                    this.setState({
                        loading: false,
                        error: 'Could not fetch questions.',
                    });
                }
            });
    }

    static navigationOptions = {title: 'Welcome', header: null};

    renderLoader() {
        if (this.state.loading) {
            return <Loader size='large'/>
        }
        else {
            return <Button title='Next' onPress={this.sendResp.bind(this)}/>
        }
    }

    sendResp(){

        var formBody = [];
        var encodedKey = encodeURIComponent("tgId");
        var encodedValue = encodeURIComponent(this.state.tgId);
        formBody.push(encodedKey + "=" + encodedValue);
        encodedKey = encodeURIComponent("participantId");
        encodedValue = encodeURIComponent(this.state.participantId);
        formBody.push(encodedKey + "=" + encodedValue);
        encodedKey = encodeURIComponent("sessionId");
        encodedValue = encodeURIComponent(null);
        formBody.push(encodedKey + "=" + encodedValue);
        encodedKey = encodeURIComponent("questionSession");
        encodedValue = encodeURIComponent("0");
        formBody.push(encodedKey + "=" + encodedValue);

        var formBody1 = [];
        for (var i = 0; i < this.state.questions.length; i++) {

            var encodedKey = "questionId";
            var encodedValue = this.state.questions[i].questionId;

            var val = "\""+encodedKey+"\"" + ":" + "\""+encodedValue+"\""+ ",";

            if(this.state.questions[i].responseType === 'Categorical'){
                encodedKey = "response";
                encodedValue = this.state.checked[i];
            }else{
                encodedKey = "response";
                encodedValue = this.state.slider[i];
            }

            val = val + "\""+encodedKey+"\"" + ":" + "\""+encodedValue+"\"" + ",";

            encodedKey = "responseType";
            encodedValue = this.state.questions[i].responseType;

            val = val + "\""+encodedKey +"\""+ ":" + "\""+encodedValue+"\"";

            formBody1.push("{"+val+"}");
        }
        formBody1 = formBody1.join(",");

        encodedKey = encodeURIComponent("responses");
        encodedValue = encodeURIComponent("["+formBody1+"]");
        formBody.push(encodedKey + "=" + encodedValue);

        formBody = formBody.join("&");

        fetch('http://ec2-18-191-227-95.us-east-2.compute.amazonaws.com:8080/Psych-1/Questionnaire', {
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
                    this.props.navigation.navigate('Images', {tgId: this.state.tgId, positiveColor: responseJson.positiveColor, negativeColor: responseJson.negativeColor, neutralColor: responseJson.neutralColor, sessionId: responseJson.sessionId});
                }
                else {
                    this.setState({
                        loading: false,
                        error: responseJson.save,
                        loggedIn: false
                    });
                }
                return responseJson;
            })
    }

    render() {
        this.state.participantId = this.props.navigation.state.params.id;
        this.state.tgId = this.props.navigation.state.params.tgId;

        const {buttonArea, container, outerContainer, errorMessage} = styles;
        if (this.state.loading) {
            return <Loader size='large'/>;
        }
        return (
            <View style={outerContainer}>
                <View style={container}>
                    <ScrollView>
                        {
                            this.state.questions.map((item, index) => {
                                return (
                                    <View key={index} style={buttonArea}>
                                        <Text>
                                            {`${item.questionId}`}. {`${item.questionName}`}
                                        </Text>
                                        {this.renderIf(item, index)}
                                    </View>
                                )
                            })
                        }
                        <View style={buttonArea}>
                            {this.renderLoader()}
                        </View>
                        <Text style={errorMessage}>
                            {this.state.error}
                        </Text>

                    </ScrollView>
                </View>
            </View>
        );
    }
}