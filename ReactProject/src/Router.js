import React from 'react';

import {createStackNavigator} from 'react-navigation';

import Login from './Login';
import Register from './Register';
import Home from './Home';
import Game from './Game';
import Images from './Images';

const Router = createStackNavigator({
    Login: {screen: Login},
    Register: {screen: Register},
    Home: {screen: Home},
    Game: {screen: Game},
    Images: {screen: Images},
});

export default Router;