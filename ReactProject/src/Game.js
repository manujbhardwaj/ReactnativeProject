import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, Alert, FlatList} from 'react-native';
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
        ques: false,
        loading: false,
        error: '',
    };

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
                    console.log("ques:"+ this.state.questions);
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
                    <FlatList
                        data={this.state.questions}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) =>
                            <Text>
                                {`${item.responseType}`}
                            </Text>}
                    />
                </View>
            </View>
        );
    }
}