import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity} from 'react-native';
import Loader from "./Loader";

const styles = StyleSheet.create({
    buttonArea: {
        marginBottom: 20,
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

    constructor(){
        super();
        this.state = {
            tgId: '',
            id: '',
            questions: [],
            checked: [],
            loading: false,
            error: '',
        };

    }

    onUpdate(item, index){
        let a = this.state.checked;
        a[index] = item;
        this.setState({
            checked: a,
        });
    }
    renderIf(item, index) {
        console.log("manuj");
        if (item.responseType === 'Categorical') {
            return (
                <View>
                    <View style={styles.btn}>
                        {this.state.checked[index] == item.startLabel ?
                            <TouchableOpacity>
                                <Image style={styles.img} source={{uri: 'https://i.stack.imgur.com/OWcpX.png'}}/>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={ ()=>{this.onUpdate(item.startLabel, index)}}>
                                <Image style={styles.img} source={{uri: 'https://i.stack.imgur.com/Kn8zA.png'}}/>
                            </TouchableOpacity>}
                        <Text> {item.startLabel}</Text>
                    </View>
                    <View style={styles.btn}>
                        {this.state.checked[index] == item.endLabel ?
                            <TouchableOpacity>
                                <Image style={styles.img} source={{uri: 'https://i.stack.imgur.com/OWcpX.png'}}/>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={ ()=>{this.onUpdate(item.endLabel, index)}}>
                                <Image style={styles.img} source={{uri: 'https://i.stack.imgur.com/Kn8zA.png'}}/>
                            </TouchableOpacity>}
                        <Text> {item.endLabel}</Text>
                    </View>
                </View>
            );
        } else {
            return null;
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
                    for (var i = 0; i < this.state.questions.length; i++) {
                        a.push(this.state.questions[i].startLabel);
                    }
                    this.setState({
                        checked: a,
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

    render() {
        this.state.id = this.props.navigation.state.params.id;
        this.state.tgId = this.props.navigation.state.params.tgId;

        const {buttonArea, container, outerContainer} = styles;
        const {navigate} = this.props.navigation;
        if (this.state.loading) {
            return <Loader size='large'/>;
        }
        return (
            <View style={outerContainer}>
                <View style={container}>
                    <ScrollView>
                        {
                            this.state.questions.map((item, index)=>{
                                return(
                                    <View key={index} style={buttonArea}>
                                        <Text>
                                            {`${item.questionId}`}. {`${item.questionName}`}
                                        </Text>
                                        {this.renderIf(item, index)}
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}