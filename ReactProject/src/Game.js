import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, FlatList, ScrollView} from 'react-native';
import CheckBox from 'react-native-check-box'
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
});

export default class Game extends Component{

    state = {
        tgId: '',
        id:'',
        questions: [],
        checked: [],
        ques: false,
        loading: false,
        error: '',
    };

    renderIf(item, index) {
        if (item.responseType === 'Categorical') {
            return (
                <View>
                    <CheckBox
                        leftText={item.startLabel}
                        isChecked={this.state.checked[index] === item.startLabel}
                        onClick={() =>{
                            console.log("a:"+JSON.stringify(this.state.checked));
                            console.log("b:"+this.state.checked[index]);
                            console.log("b:"+typeof (this.state.checked[index]));
                            console.log("c:"+item.startLabel);
                            console.log("b:"+typeof (item.startLabel));
                            console.log("d:"+this.state.checked[index] === item.startLabel);
                            let a = this.state.checked;
                            a[index] = item.startLabel;
                            this.setState({
                                checked: a
                            });
                            console.log("d:"+this.state.checked[index] === item.startLabel);
                            console.log(JSON.stringify(this.state.checked));
                        }}
                    />
                    <CheckBox
                        leftText={item.endLabel}
                        isChecked={this.state.checked[index] === item.endLabel}
                        onClick={() =>{
                            console.log("d:"+JSON.stringify(this.state.checked));
                            console.log("e:"+this.state.checked[index]);
                            console.log("e:"+typeof (this.state.checked[index]));
                            console.log("f:"+item.endLabel);
                            console.log("f:"+typeof(item.endLabel));

                            console.log("d:"+this.state.checked[index] === item.endLabel);
                            let a = this.state.checked;
                            a[index] = item.endLabel;
                            this.setState({
                                checked: a
                            });
                            console.log("d:"+this.state.checked[index] === item.endLabel);
                            console.log(JSON.stringify(this.state.checked));
                        }}
                    />
                    <Text>
                        {`${item.startLabel}`}
                    </Text>
                    <Text>
                        {`${item.endLabel}`}
                    </Text>
                </View>
            );
        } else {
            return null;
        }
    }

    componentDidMount() {

        this.setState({error: '', loading: true});

        fetch('http://ec2-18-191-227-95.us-east-2.compute.amazonaws.com:8080/Psych-1/question?targetGroupId='+this.state.tgId+'&source=android', {
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
                        loading: false,
                        ques: true,
                        error: ''
                    });
                    var a = [];
                    for(var i = 0; i < this.state.questions.length; i++){
                        a.push(this.state.questions[i].startLabel);
                    }
                    this.setState({
                        checked: a
                    });
                    console.log(JSON.stringify(this.state.checked));
                }
                else {
                    this.setState({
                        loading: false,
                        ques: true,
                        error: 'Could not fetch questions.',
                    });
                }
            });
    }

    static navigationOptions = { title: 'Welcome', header: null };

    render(){
        this.state.id= this.props.navigation.state.params.id;
        this.state.tgId= this.props.navigation.state.params.tgId;

        const {buttonArea, container, outerContainer} = styles;
        const {navigate} = this.props.navigation;
        if (this.state.loading) {
            return <Loader size='large'/>;
        }
        return(
            <View style={outerContainer}>
                <View style={container}>
                    <ScrollView>
                        <FlatList
                            data={this.state.questions}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) =>
                                <View>
                                    <Text style={buttonArea}>
                                        {`${item.questionId}`}. {`${item.questionName}`}
                                    </Text>
                                    {this.renderIf(item, index)}
                                </View>
                            }
                        />
                    </ScrollView>
                </View>
            </View>
        );
    }
}